// scripts/run-saved-search-alerts.mjs
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const APP_URL = (process.env.APP_URL || "https://hirecre.com").replace(/\/$/, "");
const DRY_RUN = String(process.env.DRY_RUN || "1") === "1";

// Optional transactional sender (recommended for alerts)
// If you don't set these, the script will still run (and log) in DRY_RUN.
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const MAIL_FROM = process.env.MAIL_FROM || "HireCRE <hirecre@a26cos.com>";

if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function norm(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s ? s : null;
}

function jobMatches(job, f) {
  const company = norm(f.company);
  const state = norm(f.state);
  const source = norm(f.source);
  const q = norm(f.q);

  const remoteOnly = !!f.remote_only;
  const payOnly = !!f.pay_only;

  if (company) {
    const hay = String(job.company || "").toLowerCase();
    if (!hay.includes(company.toLowerCase())) return false;
  }

  if (state) {
    const st = String(job.location_state || "").toUpperCase().trim();
    if (st !== state.toUpperCase()) return false;
  }

  if (source) {
    const src = String(job.source || "").toLowerCase().trim();
    if (src !== source.toLowerCase()) return false;
  }

  if (remoteOnly) {
    const hay = `${job.location_raw || ""} ${job.location_city || ""} ${job.location_state || ""}`.toLowerCase();
    if (!hay.includes("remote")) return false;
  }

  if (payOnly) {
    if (!job.has_pay) return false;
  }

  if (q) {
    const hay = `${job.title || ""} ${job.company || ""} ${job.location_raw || ""} ${job.location_city || ""} ${job.location_state || ""} ${job.description || ""}`.toLowerCase();
    if (!hay.includes(q.toLowerCase())) return false;
  }

  return true;
}

function buildHtml(email, searchName, jobs) {
  const manageUrl = `${APP_URL}/alerts`;

  const items = jobs.slice(0, 20).map((j) => {
    const loc =
      [j.location_city, j.location_state].filter(Boolean).join(", ") ||
      j.location_raw ||
      "—";
    const pay = j.pay_extracted || "";
    return `
      <div style="padding:14px;border:1px solid #e5e7eb;border-radius:14px;margin:10px 0;background:#ffffff;">
        <div style="font-size:15px;font-weight:700;margin:0 0 6px;color:#0f172a;">
          <a href="${j.url || j.job_url || "#"}" style="color:#0f172a;text-decoration:none;">${j.title || "Untitled role"}</a>
        </div>
        <div style="font-size:13px;color:#334155;margin:0 0 6px;">
          <strong>${j.company || "—"}</strong> • ${loc}
        </div>
        <div style="font-size:12px;color:#64748b;">
          ${j.source ? String(j.source).toLowerCase() : "unknown"}${pay ? ` • Pay: ${pay}` : ""}
        </div>
      </div>
    `;
  }).join("");

  return `
  <div style="background:#f8fafc;padding:28px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:720px;margin:0 auto;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <a href="${APP_URL}" style="text-decoration:none;color:#0f172a;">
          <span style="font-weight:800;font-size:18px;letter-spacing:-0.02em;">HireCRE</span>
        </a>
        <a href="${manageUrl}" style="font-size:12px;color:#2563eb;text-decoration:none;">Manage alerts</a>
      </div>

      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:18px;padding:20px;">
        <div style="font-size:18px;font-weight:900;color:#0f172a;margin:0 0 6px;">
          HireCRE alert: ${searchName}
        </div>
        <div style="font-size:13px;color:#64748b;margin:0 0 14px;">
          New jobs matching your saved search (${email})
        </div>

        ${items}

        <div style="margin-top:18px;padding-top:14px;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;">
          <a href="${manageUrl}" style="color:#2563eb;text-decoration:none;">Manage alerts</a>
          &nbsp;•&nbsp;
          <a href="${APP_URL}" style="color:#2563eb;text-decoration:none;">Visit HireCRE</a>
        </div>
      </div>
    </div>
  </div>
  `;
}

async function sendWithResend({ to, subject, html }) {
  if (!RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${txt}`);
  }
}

async function main() {
  // 0) create a run record
  const { data: runRow, error: runErr } = await supabase
    .from("alert_runs")
    .insert({ started_at: new Date().toISOString(), dry_run: DRY_RUN })
    .select("id")
    .single();

  if (runErr) throw runErr;
  const runId = runRow.id;

  // 1) load active alert subscriptions
  // IMPORTANT: this assumes saved_search_alerts links to saved_searches + email_subscribers via FK relations.
  // If your FK names differ, we can adjust, but this is the standard Supabase pattern.
  const { data: subs, error: subErr } = await supabase
    .from("saved_search_alerts")
    .select(`
      id,
      is_enabled,
      saved_search_id,
      subscriber_id,
      saved_searches ( id, name, filters, is_enabled ),
      email_subscribers ( id, email )
    `)
    .eq("is_enabled", true);

  if (subErr) throw subErr;

  const enabledSubs = (subs || []).filter((s) => s.saved_searches?.is_enabled);
  if (enabledSubs.length === 0) {
    console.log("No enabled saved_search_alerts found.");
    await supabase.from("alert_runs").update({ finished_at: new Date().toISOString() }).eq("id", runId);
    return;
  }

  // 2) pull recent jobs once
  const { data: jobs, error: jErr } = await supabase
    .from("jobs")
    .select("id,title,company,source,url,job_url,posted_at,location_city,location_state,location_raw,description,has_pay,pay_extracted,is_active")
    .eq("is_active", true)
    .order("posted_at", { ascending: false })
    .limit(700);

  if (jErr) throw jErr;

  let deliveriesCreated = 0;
  let emailsProcessed = 0;

  for (const sub of enabledSubs) {
    const email = sub.email_subscribers?.email;
    const search = sub.saved_searches;

    if (!email || !search) continue;

    const filters = search.filters || {};
    const matched = (jobs || []).filter((job) => jobMatches(job, filters)).slice(0, 50);
    if (matched.length === 0) continue;

    const subject = `HireCRE Alert: ${matched.length} new match${matched.length === 1 ? "" : "es"} (${search.name || "Saved search"})`;
    const html = buildHtml(email, search.name || "Saved search", matched);

    // Write deliveries (dedupe happens at your DB level if you’ve set it up)
    // Store one delivery row per (subscription) run.
    const { error: delErr } = await supabase.from("alert_deliveries").insert({
      run_id: runId,
      saved_search_alert_id: sub.id,
      subscriber_email: email,
      matched_count: matched.length,
      status: DRY_RUN ? "dry_run" : "sent",
      subject,
    });

    if (delErr) throw delErr;
    deliveriesCreated++;

    if (DRY_RUN) {
      console.log(`[DRY_RUN] Would send to ${email}: ${subject}`);
      emailsProcessed++;
    } else {
      // Send via transactional sender
      await sendWithResend({ to: email, subject, html });
      console.log(`Sent to ${email}: ${subject}`);
      emailsProcessed++;
    }
  }

  await supabase
    .from("alert_runs")
    .update({
      finished_at: new Date().toISOString(),
      deliveries_created: deliveriesCreated,
      emails_processed: emailsProcessed,
    })
    .eq("id", runId);

  console.log(`Done. deliveries=${deliveriesCreated} emails=${emailsProcessed} DRY_RUN=${DRY_RUN ? "1" : "0"}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
