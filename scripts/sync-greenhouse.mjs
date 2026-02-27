#!/usr/bin/env node
/**
 * scripts/sync-greenhouse.mjs
 *
 * Reads scripts/greenhouse_sources.txt
 *   - supports either:
 *       1) slug-or-url per line
 *       2) TSV: "Company Name<TAB>slug-or-url" per line
 *
 * Pulls jobs from Greenhouse JSON endpoint, filters out unwanted titles,
 * upserts into Supabase, marks stale jobs inactive per company,
 * AND enforces allowlist (deactivates companies removed from sources file).
 *
 * Required env:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { extractPayFromText } from "./pay-utils.mjs";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing env vars. Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/* ===============================
   TITLE EXCLUSIONS
================================= */

const EXCLUDE_TITLE_KEYWORDS = [
  "facilities","facility","maintenance","maintenance technician","property maintenance",
  "janitor","janitorial","porter","grounds","groundskeeper","landscaping",
  "landscape","housekeeper","housekeeping","custodian","cleaner","cleaning",
  "security guard","security officer","concierge","valet","service technician",
  "front desk","front-desk","bellman","cook","server","bartender",
  "warehouse","driver","delivery","runner","linen","grounds crew",
  "licensed real estate agent","real estate agent",
];

function normalize(s) {
  return (s || "").toString().trim();
}

function shouldExcludeTitle(title) {
  const t = normalize(title).toLowerCase();
  if (!t) return false;
  return EXCLUDE_TITLE_KEYWORDS.some((kw) => t.includes(kw.toLowerCase()));
}

/**
 * Keep fingerprint stable across runs/sources.
 * Your existing scheme was `${source}::${source_job_id || url}`
 * We'll keep that EXACTLY to avoid breaking existing upserts.
 */
function buildFingerprint({ source, source_job_id, url }) {
  return `${normalize(source)}::${normalize(source_job_id) || normalize(url)}`;
}

/* ===============================
   SOURCES
================================= */

function sourcesFilePath() {
  return path.join(process.cwd(), "scripts", "greenhouse_sources.txt");
}

/**
 * Accepts any of these:
 *  - berkadia
 *  - https://boards.greenhouse.io/berkadia
 *  - https://job-boards.greenhouse.io/berkadia
 *  - boards.greenhouse.io/berkadia
 *  - job-boards.greenhouse.io/berkadia
 *  - https://boards-api.greenhouse.io/v1/boards/berkadia/jobs
 *
 * Returns "berkadia".
 */
function cleanGreenhouseSlug(input) {
  const raw = normalize(input);
  if (!raw) return null;

  let s = raw
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/^job-boards\.greenhouse\.io\//i, "")
    .replace(/^boards\.greenhouse\.io\//i, "")
    .replace(/^boards-api\.greenhouse\.io\/v1\/boards\//i, "");

  // strip trailing paths, queries, hashes
  s = s.split("?")[0].split("#")[0].split("/")[0];

  // keep only common slug characters
  s = s.toLowerCase().replace(/[^a-z0-9_-]/g, "");

  return s || null;
}

/**
 * Supports:
 *  - slug-or-url per line
 *  - TSV: "Company Name<TAB>slug-or-url"
 *
 * Returns:
 *  [{ slug: "berkadia", companyName: "Berkadia" }, ...]
 */
function readSources() {
  const file = sourcesFilePath();
  if (!fs.existsSync(file)) {
    console.error(`Sources file missing: ${file}`);
    process.exit(1);
  }

  const txt = fs.readFileSync(file, "utf8");

  const rawLines = txt
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  const out = [];
  for (const line of rawLines) {
    const parts = line.split("\t").map((p) => p.trim()).filter(Boolean);

    // TSV: Company Name<TAB>slug-or-url
    const companyName = parts.length >= 2 ? parts[0] : null;
    const slugOrUrl = parts.length >= 2 ? parts[1] : parts[0];

    const slug = cleanGreenhouseSlug(slugOrUrl);
    if (!slug) continue;

    out.push({
      slug,
      companyName: companyName || slug, // fallback pretty name
    });
  }

  // de-dupe by slug while preserving first-seen companyName
  const seen = new Set();
  return out.filter((x) => (seen.has(x.slug) ? false : (seen.add(x.slug), true)));
}

/* ===============================
   GREENHOUSE FETCH
================================= */

async function fetchGreenhouseJobs(companySlug) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(companySlug)}/jobs?content=true`;

  const res = await fetch(url, {
    headers: { "user-agent": "hirecre/greenhouse-sync" },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} :: ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  return Array.isArray(data?.jobs) ? data.jobs : [];
}

async function upsertJobs(rows) {
  if (!rows.length) return;

  const { error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "fingerprint" });

  if (error) throw error;
}

async function markStaleInactive(companySlug, runIso) {
  // Anything not touched in this run becomes inactive
  const { error } = await supabase
    .from("jobs")
    .update({ is_active: false })
    .eq("source", "greenhouse")
    .eq("source_company", companySlug)
    .lt("last_seen_at", runIso);

  if (error) throw error;
}

/* ===============================
   ALLOWLIST ENFORCEMENT
================================= */

async function enforceAllowlist(allowedSlugs) {
  if (!allowedSlugs?.length) return;

  const { error } = await supabase.rpc(
    "deactivate_removed_greenhouse_sources",
    { allowed_sources: allowedSlugs }
  );

  if (error) throw error;
  console.log("Allowlist enforcement complete.");
}

/* ===============================
   MAIN
================================= */

async function main() {
  const runIso = new Date().toISOString();
  const sources = readSources();

  console.log(`Loaded ${sources.length} Greenhouse sources.`);

  let totalUpserted = 0;
  let totalKept = 0;
  let totalExcluded = 0;
  let totalErrors = 0;

  for (const src of sources) {
    const companySlug = src.slug;
    const companyName = src.companyName;

    try {
      const jobs = await fetchGreenhouseJobs(companySlug);

      const rows = [];
      for (const j of jobs) {
        const title = normalize(j?.title);
        const jobUrl = normalize(j?.absolute_url);
        const sourceJobId = j?.id != null ? String(j.id) : null;

        if (!title || !jobUrl) continue;

        totalKept += 1;

        if (shouldExcludeTitle(title)) {
          totalExcluded += 1;
          continue;
        }

const descriptionHtml = normalize(j?.content) || null;
const descriptionText = descriptionHtml ? descriptionHtml.replace(/<[^>]+>/g, " ") : "";
const pay = extractPayFromText(descriptionText);

        rows.push({
          source: "greenhouse",
          source_job_id: sourceJobId,
          source_company: companySlug, // slug (sync key)

          title,
          company: companyName,        // ✅ human display name
          url: jobUrl,

          description: descriptionHtml,

          // Pay fields (IDENTICAL logic across sources)
          has_pay: pay.has_pay,
          pay_extracted: pay.pay_extracted,

          posted_at: j?.updated_at ? new Date(j.updated_at).toISOString() : null,

          fingerprint: buildFingerprint({
            source: "greenhouse",
            source_job_id: sourceJobId,
            url: jobUrl,
          }),

          is_active: true,
          last_seen_at: runIso,
        });
      }

      await upsertJobs(rows);
      totalUpserted += rows.length;

      await markStaleInactive(companySlug, runIso);

      console.log(`[DONE] ${companySlug}: ${rows.length} active jobs.`);
    } catch (e) {
      totalErrors += 1;
      console.log(`[ERR] ${companySlug}: ${e.message}`);
    }
  }

  // Enforce GitHub allowlist globally (slugs only)
  await enforceAllowlist(sources.map((s) => s.slug));

  console.log("---- Summary ----");
  console.log(`Processed (raw):   ${totalKept}`);
  console.log(`Excluded titles:   ${totalExcluded}`);
  console.log(`Upserted active:   ${totalUpserted}`);
  console.log(`Errors:            ${totalErrors}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
