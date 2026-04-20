// scripts/run-saved-search-alerts.mjs
//
// Runs nightly (Coolify scheduled task: `0 2 * * *`). Iterates over every
// enabled saved_search, finds new active jobs posted since the search's
// last_alerted_at that match the search's filters, writes an
// alert_deliveries row, and (unless DRY_RUN=1) sends an email via Resend.
//
// The previous version of this script referenced tables and columns
// that don't exist in this project's schema (email_subscribers.subscriber_id,
// saved_search_alerts.is_enabled, alert_runs.deliveries_created, etc),
// which is why nightly runs had been inserting a stuck "running"
// alert_runs row and then crashing for ~10 consecutive days.

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const APP_URL = (process.env.APP_URL || "https://hirecre.com").replace(/\/$/, "");
const DRY_RUN = String(process.env.DRY_RUN || "1") === "1";

// Transactional email provider (Resend). Optional: if unset, the script
// still records deliveries and logs what it would have sent.
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

function jobMatches(job, filters) {
  const company = norm(filters.company);
  const state = norm(filters.state);
  const source = norm(filters.source);
  const q = norm(filters.q);
  const remoteOnly = !!filters.remote_only;
  const payOnly = !!filters.pay_only;

  if (company) {
    if (!String(job.company || "").toLowerCase().includes(company.toLowerCase())) return false;
  }
  if (state) {
    const st = String(job.location_state || "").toUpperCase().trim();
    if (st !== state.toUpperCase()) return false;
  }
  if (source) {
    if (String(job.source || "").toLowerCase().trim() !== source.toLowerCase()) return false;
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

function buildHtml({ email, searchName, jobs }) {
  const manageUrl = `${APP_URL}/alerts`;

  const items = jobs.slice(0, 20).map((j) => {
    const loc =
      [j.location_city, j.location_state].filter(Boolean).join(", ") ||
      j.location_raw ||
      "—";
    const pay = j.pay_extracted || "";
    const slug = j.slug;
    const internal = slug ? `${APP_URL}/jobs/${slug}` : (j.url || APP_URL);
    return `
      <div style="padding:14px;border:1px solid #e5e7eb;border-radius:14px;margin:10px 0;background:#ffffff;">
        <div style="font-size:15px;font-weight:700;margin:0 0 6px;color:#0f172a;">
          <a href="${internal}" style="color:#0f172a;text-decoration:none;">${j.title || "Untitled role"}</a>
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
    body: JSON.stringify({ from: MAIL_FROM, to: [to], subject, html }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${txt}`);
  }
}

async function main() {
  // 1) Create a run record. alert_runs schema: started_at, finished_at,
  //    status, processed_searches, queued_deliveries, dry_run, notes.
  const { data: runRow, error: runErr } = await supabase
    .from("alert_runs")
    .insert({
      started_at: new Date().toISOString(),
      status: "running",
      dry_run: DRY_RUN,
    })
    .select("id")
    .single();

  if (runErr) throw runErr;
  const runId = runRow.id;

  // Helper to finalize the run row. We always call this on exit so
  // alert_runs never has another "stuck running" row.
  async function finalize({ status, notes, processed, queued }) {
    await supabase
      .from("alert_runs")
      .update({
        finished_at: new Date().toISOString(),
        status,
        notes: notes ?? null,
        processed_searches: processed ?? 0,
        queued_deliveries: queued ?? 0,
      })
      .eq("id", runId);
  }

  try {
    // 2) Pull enabled saved searches. saved_searches already has
    //    user_id + user_email + filters + last_alerted_at — no
    //    separate subscriber table is needed.
    const { data: searches, error: sErr } = await supabase
      .from("saved_searches")
      .select("id, name, filters, user_id, user_email, last_alerted_at")
      .eq("is_enabled", true);

    if (sErr) throw sErr;

    if (!searches || searches.length === 0) {
      console.log("No enabled saved_searches.");
      await finalize({ status: "succeeded", notes: "no enabled searches", processed: 0, queued: 0 });
      return;
    }

    // 3) Pull recent active jobs once (we filter per-search in JS).
    //    Limit is generous; production DB has ~1,500 active rows.
    const { data: jobs, error: jErr } = await supabase
      .from("jobs")
      .select(
        "id,slug,title,company,source,url,posted_at,location_city,location_state,location_raw,description,has_pay,pay_extracted"
      )
      .eq("is_active", true)
      .order("posted_at", { ascending: false })
      .limit(2000);

    if (jErr) throw jErr;

    let processed = 0;
    let queued = 0;

    for (const search of searches) {
      processed++;
      const email = (search.user_email || "").trim();
      if (!email) {
        console.log(`Skip search ${search.id}: no user_email`);
        continue;
      }

      const filters = search.filters || {};
      const since = search.last_alerted_at ? new Date(search.last_alerted_at).getTime() : 0;

      const matched = (jobs || [])
        .filter((job) => {
          // Only count jobs posted after the last alert for this search.
          const posted = job.posted_at ? new Date(job.posted_at).getTime() : 0;
          if (posted <= since) return false;
          return jobMatches(job, filters);
        })
        .slice(0, 50);

      if (matched.length === 0) continue;

      const subject = `HireCRE Alert: ${matched.length} new match${matched.length === 1 ? "" : "es"} (${search.name || "Saved search"})`;
      const html = buildHtml({
        email,
        searchName: search.name || "Saved search",
        jobs: matched,
      });

      // 4) Record the delivery. alert_deliveries columns:
      //    run_id, search_id, user_id, subscriber_email, matched_count,
      //    job_ids (uuid[]), status, sent_at, error, created_at.
      const deliveryRow = {
        run_id: runId,
        search_id: search.id,
        user_id: search.user_id,
        subscriber_email: email,
        matched_count: matched.length,
        job_ids: matched.map((j) => j.id),
        status: DRY_RUN ? "dry_run" : "queued",
      };

      let sendError = null;
      if (!DRY_RUN) {
        try {
          await sendWithResend({ to: email, subject, html });
          deliveryRow.status = "sent";
          deliveryRow.sent_at = new Date().toISOString();
        } catch (e) {
          sendError = e?.message ?? String(e);
          deliveryRow.status = "failed";
          deliveryRow.error = sendError;
        }
      }

      const { error: delErr } = await supabase.from("alert_deliveries").insert(deliveryRow);
      if (delErr) {
        console.error(`Failed to record delivery for ${email}:`, delErr.message);
      } else {
        queued++;
      }

      // Only advance last_alerted_at when a real (non-dry-run) send
      // succeeds, so dry-runs don't consume the same batch of jobs
      // that a later real run should send.
      if (!DRY_RUN && !sendError) {
        await supabase
          .from("saved_searches")
          .update({ last_alerted_at: new Date().toISOString() })
          .eq("id", search.id);
      }

      console.log(
        `${DRY_RUN ? "[DRY_RUN]" : ""} ${email} — ${matched.length} matches — ${deliveryRow.status}`
      );
    }

    await finalize({
      status: "succeeded",
      notes: DRY_RUN ? "dry-run" : null,
      processed,
      queued,
    });

    console.log(
      `Done. searches=${processed} deliveries=${queued} DRY_RUN=${DRY_RUN ? "1" : "0"}`
    );
  } catch (err) {
    const msg = err?.message ?? String(err);
    console.error("Run failed:", msg);
    await finalize({ status: "failed", notes: msg.slice(0, 500), processed: 0, queued: 0 });
    throw err;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
