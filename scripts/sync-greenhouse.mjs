// scripts/import-greenhouse.mjs
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ---- THIS IS WHERE YOU ADD YOUR EXCLUSIONS (Step 2 #1) ----
const EXCLUDE_TITLE_KEYWORDS = [
  "janitor",
  "cleaning",
  "property maintenance",
  "maintenance",
  "maintenance technician",
  "facilities",
  "facilities manager",
  "regional facilities",
  "engineering",
  "engineer",
  "it ",
  "information technology",
  "helpdesk",
  "desktop support",
  "network",
  "licensed real estate agent",
  "real estate agent",
];

// Optional: if you want exclusions to be ONLY title-based, leave as-is.
// If you want to exclude by department later, we can add that too.

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing env vars. Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const SOURCES_FILE =
  process.env.GREENHOUSE_SOURCES_FILE ||
  path.join(process.cwd(), "scripts", "greenhouse_sources.txt");

function normalizeSourceLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;

  // allow either:
  // - "airbnb"
  // - "https://boards.greenhouse.io/airbnb"
  // - "boards.greenhouse.io/airbnb"
  // We will convert to slug "airbnb"
  const m = trimmed.match(/boards\.greenhouse\.io\/([^\/\s]+)/i);
  if (m?.[1]) return m[1].toLowerCase();

  // if they just gave a slug
  return trimmed.toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

function shouldExclude(title) {
  const t = (title || "").toLowerCase();
  return EXCLUDE_TITLE_KEYWORDS.some((kw) => t.includes(kw));
}

function parseCityState(locationName) {
  if (!locationName) return { city: null, state: null, raw: null };
  const raw = locationName.trim();

  // Common pattern: "City, ST"
  const m = raw.match(/^([^,]+),\s*([A-Z]{2})$/);
  if (m) return { city: m[1].trim(), state: m[2].trim(), raw };

  return { city: null, state: null, raw };
}

async function fetchGreenhouseJobs(companySlug) {
  // This is Greenhouse’s public board JSON
  const url = `https://boards.greenhouse.io/${companySlug}?format=json`;

  const res = await fetch(url, {
    headers: { "user-agent": "hirecre-importer/1.0" },
  });

  if (!res.ok) {
    // many slugs will 404 if they moved; we just skip
    return { ok: false, status: res.status, jobs: [] };
  }

  const data = await res.json();

  // JSON structure varies slightly; "jobs" is usually present
  const jobs = Array.isArray(data?.jobs) ? data.jobs : [];
  return { ok: true, status: 200, jobs };
}

async function upsertJobs(rows) {
  if (!rows.length) return;

  // fingerprint is unique key to prevent duplicates
  const { error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "fingerprint" });

  if (error) throw error;
}

async function main() {
  const raw = fs.readFileSync(SOURCES_FILE, "utf8");
  const slugs = raw
    .split(/\r?\n/)
    .map(normalizeSourceLine)
    .filter(Boolean);

  console.log(`Loaded ${slugs.length} Greenhouse sources from ${SOURCES_FILE}`);

  let totalInsertedOrUpdated = 0;
  let totalSkippedByFilter = 0;

  for (const slug of slugs) {
    try {
      const { ok, status, jobs } = await fetchGreenhouseJobs(slug);

      if (!ok) {
        console.log(`[SKIP] ${slug} -> HTTP ${status}`);
        continue;
      }

      const rows = [];
      for (const j of jobs) {
        const title = j?.title || "";
        if (shouldExclude(title)) {
          totalSkippedByFilter++;
          continue;
        }

        const locName = j?.location?.name || "";
        const loc = parseCityState(locName);

        const sourceJobId = String(j?.id ?? "");
        const jobUrl =
          j?.absolute_url ||
          `https://boards.greenhouse.io/${slug}/jobs/${sourceJobId}`;

        const dept =
          Array.isArray(j?.departments) && j.departments.length
            ? j.departments[0]?.name
            : null;

        const fingerprint = `greenhouse:${slug}:${sourceJobId}`;

        rows.push({
          source: "greenhouse",
          source_job_id: sourceJobId,
          title,
          company: slug, // we store slug as company for now; we can map to display names later
          location_city: loc.city,
          location_state: loc.state,
          location_raw: loc.raw,
          job_type: dept,
          employment_type: null,
          url: jobUrl,
          posted_at: j?.updated_at ? new Date(j.updated_at).toISOString() : null,
          description: null, // keep null to avoid copying full descriptions (safer)
          fingerprint,
        });
      }

      if (rows.length) {
        await upsertJobs(rows);
        totalInsertedOrUpdated += rows.length;
      }

      console.log(
        `[OK] ${slug}: fetched ${jobs.length}, kept ${rows.length}, filtered ${jobs.length - rows.length}`
      );
    } catch (e) {
      console.log(`[ERR] ${slug}: ${e?.message || e}`);
    }
  }

  console.log(`DONE. Upserted ~${totalInsertedOrUpdated} rows.`);
  console.log(`Filtered out ${totalSkippedByFilter} jobs by title keywords.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
