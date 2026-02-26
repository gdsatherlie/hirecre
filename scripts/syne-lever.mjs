#!/usr/bin/env node
/**
 * scripts/sync-lever.mjs
 *
 * Reads scripts/lever_sources.txt
 *   - supports either:
 *       1) slug-or-url per line
 *       2) TSV: "Company Name<TAB>slug-or-url" per line
 *
 * Pulls jobs from Lever Postings API, filters out unwanted titles,
 * upserts into Supabase, marks stale jobs inactive per company,
 * AND enforces allowlist (deactivates companies removed from sources file).
 *
 * Required env:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional env:
 *   LEVER_SOURCES_FILE (default: scripts/lever_sources.txt)
 *   JOBS_TABLE (default: jobs)
 *   COMPANIES_TABLE (default: companies)
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const LEVER_SOURCES_FILE =
  process.env.LEVER_SOURCES_FILE || "scripts/lever_sources.txt";

const JOBS_TABLE = process.env.JOBS_TABLE || "jobs";
const COMPANIES_TABLE = process.env.COMPANIES_TABLE || "companies";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Keep these aligned with your Greenhouse script filters (if you have them)
const TITLE_BLOCKLIST = [
  "intern",
  "internship",
  "temporary",
  "contract-to-hire",
];

function normalizeLine(line) {
  // supports:
  // - "Company<TAB>slug-or-url"
  // - "slug-or-url"
  const parts = line.split("\t").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 1) {
    const slug = extractSlug(parts[0]);
    return { company_name: slug, slug };
  }
  const company_name = parts[0];
  const slug = extractSlug(parts[1]);
  return { company_name, slug };
}

function extractSlug(input) {
  const s = input.trim();
  if (!s) return "";
  // Accept jobs.lever.co/<slug>
  // Or accept raw slug
  const m = s.match(/jobs\.lever\.co\/([^/]+)\/?/i);
  return (m ? m[1] : s).trim();
}

function isBlockedTitle(title) {
  const t = (title || "").toLowerCase();
  return TITLE_BLOCKLIST.some((bad) => t.includes(bad));
}

async function fetchLeverPostings(slug) {
  const url = `https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Lever fetch failed ${res.status} for ${slug}: ${body.slice(0, 120)}`);
  }
  return await res.json();
}

async function upsertCompany({ company_name, slug }) {
  // Minimal company record. Adjust field names if your schema differs.
  // Expected columns (recommended): name, source, source_slug, active
  const row = {
    name: company_name,
    source: "lever",
    source_slug: slug,
    active: true,
  };

  const { data, error } = await supabase
    .from(COMPANIES_TABLE)
    .upsert(row, { onConflict: "source,source_slug" })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

async function upsertJobs(companyId, slug, postings) {
  const seenExternalIds = new Set();

  // Convert Lever postings to your internal job model
  const rows = [];
  for (const p of postings) {
    const title = p.text || "";
    if (isBlockedTitle(title)) continue;

    const external_id = `lever:${slug}:${p.id}`;
    seenExternalIds.add(external_id);

    const location =
      p.categories?.location ||
      p.categories?.locations ||
      p.location ||
      "";

    const department =
      p.categories?.team ||
      p.categories?.department ||
      p.team ||
      "";

    rows.push({
      company_id: companyId,
      source: "lever",
      external_id,
      title,
      location,
      department,
      url: p.hostedUrl || p.applyUrl || null,
      posted_at: p.createdAt ? new Date(p.createdAt).toISOString() : null,
      updated_at: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
      active: true,
      // If you have a jsonb column for raw payload, uncomment and rename as needed:
      // raw: p,
    });
  }

  if (rows.length) {
    // Expected jobs unique constraint: (source, external_id) OR just external_id unique
    const { error } = await supabase
      .from(JOBS_TABLE)
      .upsert(rows, { onConflict: "source,external_id" });

    if (error) throw error;
  }

  return seenExternalIds;
}

async function deactivateStaleJobs(companyId, seenExternalIds) {
  // Mark jobs inactive for this company/source that were NOT seen in this run.
  // If your table is large, you can do this in batches, but this works fine for typical volumes.
  const { data: existing, error: readErr } = await supabase
    .from(JOBS_TABLE)
    .select("id, external_id")
    .eq("company_id", companyId)
    .eq("source", "lever")
    .eq("active", true);

  if (readErr) throw readErr;

  const staleIds = (existing || [])
    .filter((j) => !seenExternalIds.has(j.external_id))
    .map((j) => j.id);

  if (!staleIds.length) return 0;

  const { error: updErr } = await supabase
    .from(JOBS_TABLE)
    .update({ active: false })
    .in("id", staleIds);

  if (updErr) throw updErr;
  return staleIds.length;
}

async function enforceCompanyAllowlist(allowSlugsSet) {
  // Deactivate lever companies removed from lever_sources.txt
  const { data, error } = await supabase
    .from(COMPANIES_TABLE)
    .select("id, source_slug")
    .eq("source", "lever")
    .eq("active", true);

  if (error) throw error;

  const toDeactivate = (data || [])
    .filter((c) => !allowSlugsSet.has(c.source_slug))
    .map((c) => c.id);

  if (!toDeactivate.length) return 0;

  // Deactivate those companies
  const { error: cErr } = await supabase
    .from(COMPANIES_TABLE)
    .update({ active: false })
    .in("id", toDeactivate);

  if (cErr) throw cErr;

  // And deactivate their jobs too
  const { error: jErr } = await supabase
    .from(JOBS_TABLE)
    .update({ active: false })
    .in("company_id", toDeactivate)
    .eq("source", "lever");

  if (jErr) throw jErr;

  return toDeactivate.length;
}

async function main() {
  const abs = path.resolve(process.cwd(), LEVER_SOURCES_FILE);
  if (!fs.existsSync(abs)) {
    console.error(`Sources file not found: ${abs}`);
    process.exit(1);
  }

  const lines = fs
    .readFileSync(abs, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  const sources = lines.map(normalizeLine).filter((x) => x.slug);

  const allowSlugs = new Set(sources.map((s) => s.slug));

  console.log(`Lever sources: ${sources.length}`);

  let totalUpsertedCompanies = 0;
  let totalSeenJobs = 0;
  let totalStaleDeactivated = 0;

  for (const s of sources) {
    console.log(`\n== ${s.company_name} (${s.slug}) ==`);

    const companyId = await upsertCompany(s);
    totalUpsertedCompanies += 1;

    const postings = await fetchLeverPostings(s.slug);
    const seen = await upsertJobs(companyId, s.slug, postings);

    totalSeenJobs += seen.size;

    const staleCount = await deactivateStaleJobs(companyId, seen);
    totalStaleDeactivated += staleCount;

    console.log(`Jobs seen this run: ${seen.size} | stale deactivated: ${staleCount}`);
  }

  const allowlistDeactivated = await enforceCompanyAllowlist(allowSlugs);

  console.log("\nDone.");
  console.log(
    JSON.stringify(
      {
        companies_processed: totalUpsertedCompanies,
        jobs_seen: totalSeenJobs,
        stale_jobs_deactivated: totalStaleDeactivated,
        companies_deactivated_by_allowlist: allowlistDeactivated,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error("sync-lever failed:", err?.message || err);
  process.exit(1);
});
