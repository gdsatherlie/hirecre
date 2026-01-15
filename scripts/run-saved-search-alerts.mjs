// scripts/run-saved-search-alerts.mjs
import { createClient } from "@supabase/supabase-js";

function mustEnv(...keys) {
  for (const k of keys) {
    const v = process.env[k];
    if (v && String(v).trim()) return String(v).trim();
  }
  throw new Error(`Missing env var. Set one of: ${keys.join(" OR ")}`);
}

const SUPABASE_URL = mustEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = mustEnv("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function norm2(s) {
  if (!s) return null;
  const t = String(s).trim().toUpperCase();
  return t.length ? t : null;
}

async function main() {
  console.log("✅ alerts runner starting");

  // 1) create run row
  const { data: runRow, error: runErr } = await supabase
    .from("alert_runs")
    .insert({ status: "running" })
    .select("id")
    .single();

  if (runErr) throw new Error(`Could not create alert_runs row: ${runErr.message}`);
  const runId = runRow.id;

  let processed = 0;
  let queued = 0;

  try {
    // 2) load enabled searches
    const { data: searches, error: searchErr } = await supabase
      .from("saved_searches")
      .select("*")
      .eq("is_enabled", true)
      .limit(5000);

    if (searchErr) throw new Error(`saved_searches read failed: ${searchErr.message}`);

    if (!searches || searches.length === 0) {
      console.log("ℹ️ No enabled saved searches.");
      await supabase.from("alert_runs").update({
        status: "ok",
        finished_at: new Date().toISOString(),
        processed_searches: 0,
        queued_deliveries: 0,
        notes: "No enabled searches",
      }).eq("id", runId);
      return;
    }

    console.log(`Found ${searches.length} enabled saved searches`);

    for (const s of searches) {
      processed++;

      const userId = s.user_id;
      const email = s.subscriber_email;

      const q = (s.q ?? "").toString().trim();
      const state = norm2(s.state);
      const company = (s.company ?? "").toString().trim();
      const source = (s.source ?? "").toString().trim();
      const remoteOnly = Boolean(s.remote_only);
      const payOnly = Boolean(s.pay_only);

      const since =
        s.last_checked_at ||
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      let jobQuery = supabase
        .from("jobs")
        .select("id", { count: "exact" })
        .eq("is_active", true)
        .gt("posted_at", since)
        .order("posted_at", { ascending: false })
        .limit(50);

      if (state && state !== "ALL") jobQuery = jobQuery.eq("location_state", state);
      if (company && company !== "ALL") jobQuery = jobQuery.ilike("company", `%${company}%`);
      if (source && source !== "ALL") jobQuery = jobQuery.eq("source", source);
      if (payOnly) jobQuery = jobQuery.eq("has_pay", true);

      if (remoteOnly) {
        jobQuery = jobQuery.or(
          ["location_raw.ilike.%remote%", "location_city.ilike.%remote%", "location_state.ilike.%remote%"].join(",")
        );
      }

      if (q) {
        const esc = q.replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/,/g, "\\,");
        jobQuery = jobQuery.or(
          [`title.ilike.%${esc}%`, `company.ilike.%${esc}%`, `location_city.ilike.%${esc}%`, `location_state.ilike.%${esc}%`].join(",")
        );
      }

      const { data: jobs, error: jobsErr } = await jobQuery;
      if (jobsErr) {
        console.log(`⚠️ Search ${s.id} job query failed: ${jobsErr.message}`);
        // still advance last_checked_at so we don’t repeatedly hit a broken query window
        await supabase.from("saved_searches").update({ last_checked_at: new Date().toISOString() }).eq("id", s.id);
        continue;
      }

      const jobIds = (jobs ?? []).map((j) => j.id);
      const matchedCount = jobIds.length;

      // Always update last_checked_at so “since” moves forward
      await supabase.from("saved_searches").update({ last_checked_at: new Date().toISOString() }).eq("id", s.id);

      if (matchedCount === 0) {
        console.log(`No new jobs for ${email} (search ${s.id})`);
        continue;
      }

      // Insert a queued delivery row
      const { error: insErr } = await supabase.from("alert_deliveries").insert({
        run_id: runId,
        search_id: s.id,
        user_id: userId,
        subscriber_email: email,
        matched_count: matchedCount,
        job_ids: jobIds,
        status: "queued",
      });

      if (insErr) {
        console.log(`⚠️ Could not queue delivery for search ${s.id}: ${insErr.message}`);
        continue;
      }

      queued++;
      console.log(`✅ queued ${matchedCount} jobs for ${email} (search ${s.id})`);
    }

    // 3) finish run row
    await supabase.from("alert_runs").update({
      status: "ok",
      finished_at: new Date().toISOString(),
      processed_searches: processed,
      queued_deliveries: queued,
      notes: "Queued deliveries successfully",
    }).eq("id", runId);

    console.log("✅ alerts runner finished", { processed, queued });
  } catch (e) {
    await supabase.from("alert_runs").update({
      status: "failed",
      finished_at: new Date().toISOString(),
      processed_searches: processed,
      queued_deliveries: queued,
      notes: String(e?.message || e),
    }).eq("id", runId);

    throw e;
  }
}

main().catch((e) => {
  console.error("❌ Script crashed:", e?.message || e);
  process.exit(1);
});
