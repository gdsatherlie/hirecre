#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SUPABASE_URL = mustEnv("SUPABASE_URL", ["NEXT_PUBLIC_SUPABASE_URL"]);
const SUPABASE_SERVICE_ROLE_KEY = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
const MAILERLITE_API_TOKEN = mustEnv("MAILERLITE_API_TOKEN");

const APP_BASE_URL = process.env.APP_BASE_URL || "https://YOUR_DOMAIN.com"; // set this in env if you want

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!MAILERSEND_API_KEY || !ALERT_FROM_EMAIL) {
  console.error("Missing MAILERSEND_API_KEY / ALERT_FROM_EMAIL");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});


function mustEnv(name, fallbacks = []) {
  const keys = [name, ...fallbacks];
  for (const k of keys) {
    const v = process.env[k];
    if (v && String(v).trim()) return String(v).trim();
  }
  throw new Error(`Missing required env var: ${keys.join(" or ")}`);
}


function buildBoardLink(filters) {
  const p = new URLSearchParams();
  if (filters?.q) p.set("q", filters.q);
  if (filters?.company && filters.company !== "ALL") p.set("company", filters.company);
  if (filters?.state && filters.state !== "ALL") p.set("state", filters.state);
  if (filters?.source && filters.source !== "ALL") p.set("source", filters.source);
  if (filters?.remoteOnly) p.set("remoteOnly", "1");
  if (filters?.payOnly) p.set("payOnly", "1");
  return `${APP_BASE_URL}/board?${p.toString()}`;
}

async function sendEmail({ toEmail, subject, html, text }) {
  // MailerSend: POST https://api.mailersend.com/v1/email :contentReference[oaicite:1]{index=1}
  const res = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: ALERT_FROM_EMAIL, name: ALERT_FROM_NAME },
      to: [{ email: toEmail }],
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`MailerSend error ${res.status}: ${body.slice(0, 300)}`);
  }
}

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function main() {
  const now = new Date();
  const nowIso = now.toISOString();

  // 1) load enabled searches
  const { data: searches, error: sErr } = await supabase
    .from("saved_searches")
    .select("*")
    .eq("is_enabled", true);

  if (sErr) throw sErr;
  if (!searches?.length) {
    console.log("No saved searches enabled. Done.");
    return;
  }

  console.log(`Loaded ${searches.length} saved searches`);

  for (const s of searches) {
    try {
      const filters = s.filters || {};
      const since = s.last_run_at ? new Date(s.last_run_at) : new Date(Date.now() - 24 * 60 * 60 * 1000);
      const sinceIso = since.toISOString();

      // 2) build job query (server-side)
      let q = supabase
        .from("jobs")
        .select("id,title,company,location_city,location_state,url,posted_at", { count: "exact" })
        .eq("is_active", true)
        .gte("posted_at", sinceIso)
        .order("posted_at", { ascending: false })
        .limit(50);

      // Apply the same logic your board uses
      if (filters.q && String(filters.q).trim()) {
        const esc = String(filters.q).trim().replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/,/g, "\\,");
        q = q.or(
          [
            `title.ilike.%${esc}%`,
            `company.ilike.%${esc}%`,
            `location_raw.ilike.%${esc}%`,
            `location_city.ilike.%${esc}%`,
            `location_state.ilike.%${esc}%`,
          ].join(",")
        );
      }

      if (filters.company && filters.company !== "ALL") {
        q = q.ilike("company", `%${filters.company}%`);
      }

      if (filters.state && filters.state !== "ALL") {
        // IMPORTANT: strict state matching
        q = q.eq("location_state", filters.state);
      }

      if (filters.source && filters.source !== "ALL") {
        q = q.eq("source", filters.source);
      }

      if (filters.remoteOnly) {
        q = q.or(
          ["location_raw.ilike.%remote%", "location_city.ilike.%remote%", "location_state.ilike.%remote%"].join(",")
        );
      }

      if (filters.payOnly) {
        q = q.eq("has_pay", true);
      }

      const { data: jobs, error: jErr } = await q;
      if (jErr) throw jErr;

      if (!jobs?.length) {
        // still advance last_run_at
        await supabase.from("saved_searches").update({ last_run_at: nowIso }).eq("id", s.id);
        console.log(`[${s.name}] no new jobs`);
        continue;
      }

      // 3) dedupe via saved_search_alerts
      const inserts = jobs.map((job) => ({ saved_search_id: s.id, job_id: job.id }));
      const { data: inserted, error: aErr } = await supabase
        .from("saved_search_alerts")
        .insert(inserts, { defaultToNull: false })
        .select("job_id"); // returns only rows that were inserted

      // If duplicates exist, Supabase may error unless we handle it:
      // We'll just ignore conflict by inserting one-by-one fallback.
      let newJobIds = [];
      if (!aErr) {
        newJobIds = (inserted || []).map((x) => x.job_id);
      } else {
        // Fallback: insert individually and keep successes
        newJobIds = [];
        for (const row of inserts) {
          const { data: one, error: oneErr } = await supabase
            .from("saved_search_alerts")
            .insert(row)
            .select("job_id")
            .maybeSingle();
          if (!oneErr && one?.job_id) newJobIds.push(one.job_id);
        }
      }

      const newJobs = jobs.filter((j) => newJobIds.includes(j.id));
      if (!newJobs.length) {
        await supabase.from("saved_searches").update({ last_run_at: nowIso }).eq("id", s.id);
        console.log(`[${s.name}] jobs found but none were new after dedupe`);
        continue;
      }

      // 4) email
      const boardLink = buildBoardLink(filters);

      const linesText = newJobs
        .slice(0, 20)
        .map((j) => {
          const loc = [j.location_city, j.location_state].filter(Boolean).join(", ");
          return `- ${j.title || "Role"} @ ${j.company || "Company"} (${loc || "—"})\n  ${j.url || ""}`;
        })
        .join("\n\n");

      const itemsHtml = newJobs
        .slice(0, 20)
        .map((j) => {
          const loc = [j.location_city, j.location_state].filter(Boolean).join(", ");
          return `<li style="margin: 0 0 10px 0;">
            <div><b>${escapeHtml(j.title || "Role")}</b> — ${escapeHtml(j.company || "Company")}</div>
            <div style="color:#555;">${escapeHtml(loc || "—")}</div>
            <div><a href="${escapeHtml(j.url || boardLink)}" target="_blank" rel="noreferrer">View</a></div>
          </li>`;
        })
        .join("");

      const subject = `HireCRE Alerts: ${newJobs.length} new job(s) for “${s.name}”`;
      const html = `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;">
          <h2 style="margin:0 0 8px 0;">New jobs for “${escapeHtml(s.name)}”</h2>
          <p style="margin:0 0 14px 0;">We found <b>${newJobs.length}</b> new job(s) since your last alert.</p>
          <p style="margin:0 0 14px 0;"><a href="${escapeHtml(boardLink)}">Open this search</a></p>
          <ul style="padding-left:18px; margin:0;">${itemsHtml}</ul>
          <p style="margin:18px 0 0 0; color:#777; font-size:12px;">You can disable alerts later (coming next).</p>
        </div>
      `;
      const text = `New jobs for "${s.name}"\n\nOpen this search: ${boardLink}\n\n${linesText}`;

      await sendEmail({
        toEmail: s.user_email,
        subject,
        html,
        text,
      });

      // 5) advance last_run_at
      await supabase.from("saved_searches").update({ last_run_at: nowIso }).eq("id", s.id);

      console.log(`[${s.name}] emailed ${s.user_email}: ${newJobs.length} new jobs`);
    } catch (e) {
      console.log(`[ERR] saved_search ${s?.id} (${s?.name}): ${e?.message || e}`);
      // do not crash the whole run; move to next search
    }
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
