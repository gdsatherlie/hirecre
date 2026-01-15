// scripts/run-saved-search-alerts.mjs
import { createClient } from "@supabase/supabase-js";

/**
 * This script is run by Coolify Scheduled Tasks.
 * It should NOT rely on dotenv (you don't have dotenv installed).
 * It reads env vars from the container environment (Coolify Variables).
 */

function mustEnv(...keys) {
  for (const k of keys) {
    const v = process.env[k];
    if (v && String(v).trim().length > 0) return String(v).trim();
  }
  throw new Error(
    `Missing environment variable. Set one of: ${keys.join(" OR ")}`
  );
}

const SUPABASE_URL = mustEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = mustEnv(
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SERVICE_KEY"
);

// If you aren’t actually sending emails yet, you can leave this unset.
// We'll just log what would have been sent.
// If you *do* want to send later, we’ll wire in MailerLite/MailerSend next.
const ALERTS_ENABLED = String(process.env.ALERTS_ENABLED ?? "false") === "true";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function normalizeState(s) {
  if (!s) return null;
  const t = String(s).trim().toUpperCase();
  if (t.length === 2) return t;
  return t;
}

async function main() {
  console.log("✅ run-saved-search-alerts starting");
  console.log("SUPABASE_URL:", SUPABASE_URL);
  console.log("ALERTS_ENABLED:", ALERTS_ENABLED);

  // 1) Load saved searches
  // If the table doesn't exist yet, we exit cleanly.
  const { data: searches, error: searchErr } = await supabase
    .from("saved_searches")
    .select("*")
    .limit(5000);

  if (searchErr) {
    console.log("⚠️ saved_searches not ready or not accessible:", searchErr.message);
    console.log("✅ Exiting without failure (cron will not break).");
    return;
  }

  if (!searches || searches.length === 0) {
    console.log("ℹ️ No saved searches found.");
    return;
  }

  console.log(`Found ${searches.length} saved searches`);

  // 2) For each saved search, find matching NEW jobs
  for (const s of searches) {
    const email =
      s.email || s.user_email || s.subscriber_email || null;

    // If you haven't decided how to associate searches to subscribers yet, skip safely:
    if (!email) {
      console.log(`Skipping search ${s.id}: no email column found on row`);
      continue;
    }

    const state = normalizeState(s.state || s.location_state || null);
    const company = (s.company || null)?.toString().trim();
    const source = (s.source || null)?.toString().trim();
    const q = (s.q || s.query || null)?.toString().trim();
    const remoteOnly = Boolean(s.remote_only ?? s.remoteOnly ?? false);
    const payOnly = Boolean(s.pay_only ?? s.payOnly ?? false);

    // Use last_sent_at if present; otherwise use last 24h
    const since =
      s.last_sent_at ||
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    let jobQuery = supabase
      .from("jobs")
      .select("id,title,company,location_city,location_state,url,posted_at,source", { count: "exact" })
      .eq("is_active", true)
      .gt("posted_at", since)
      .order("posted_at", { ascending: false })
      .limit(20);

    if (state && state !== "ALL") jobQuery = jobQuery.eq("location_state", state);

    if (company && company !== "ALL") jobQuery = jobQuery.ilike("company", `%${company}%`);

    if (source && source !== "ALL") jobQuery = jobQuery.eq("source", source);

    if (remoteOnly) {
      jobQuery = jobQuery.or(
        [
          "location_raw.ilike.%remote%",
          "location_city.ilike.%remote%",
          "location_state.ilike.%remote%",
        ].join(",")
      );
    }

    if (payOnly) jobQuery = jobQuery.eq("has_pay", true);

    if (q && q.length > 0) {
      const esc = q.replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/,/g, "\\,");
      jobQuery = jobQuery.or(
        [
          `title.ilike.%${esc}%`,
          `company.ilike.%${esc}%`,
          `location_city.ilike.%${esc}%`,
          `location_state.ilike.%${esc}%`,
        ].join(",")
      );
    }

    const { data: jobs, error: jobsErr, count } = await jobQuery;

    if (jobsErr) {
      console.log(`⚠️ Search ${s.id} job query failed:`, jobsErr.message);
      continue;
    }

    if (!jobs || jobs.length === 0) {
      console.log(`No new jobs for ${email} (search ${s.id})`);
      continue;
    }

    console.log(
      `✅ ${jobs.length} new jobs for ${email} (search ${s.id}). Example:`,
      jobs[0]?.title,
      "-",
      jobs[0]?.company
    );

    // 3) Mark last_sent_at so we don't re-send the same jobs next run
    const { error: updErr } = await supabase
      .from("saved_searches")
      .update({ last_sent_at: new Date().toISOString() })
      .eq("id", s.id);

    if (updErr) {
      console.log(`⚠️ Could not update last_sent_at for search ${s.id}:`, updErr.message);
    }

    // 4) Email sending will be wired next (MailerLite / MailerSend).
    // For now, don't crash the cron.
    if (ALERTS_ENABLED) {
      console.log("ALERTS_ENABLED=true, but email sending not yet wired.");
    }
  }

  console.log("✅ run-saved-search-alerts finished cleanly");
}

main().catch((e) => {
  console.error("❌ Script crashed:", e?.message || e);
  process.exit(1);
});
