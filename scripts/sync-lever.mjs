#!/usr/bin/env node
/**
 * sync-lever.mjs
 * - Reads scripts/lever_sources.txt (TSV: Pretty Company Name<TAB>lever-slug-or-url)
 * - Pulls from Lever API
 * - Upserts into public.jobs
 * - Deactivates stale Lever jobs per company
 *
 * Required env:
 *  SUPABASE_URL
 *  SUPABASE_SERVICE_ROLE_KEY
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

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const SOURCES_FILE = process.env.LEVER_SOURCES_FILE || "scripts/lever_sources.txt";

function extractSlug(input) {
  const s = (input || "").trim();
  if (!s) return "";
  const m = s.match(/jobs\.lever\.co\/([^/]+)/i);
  return (m ? m[1] : s).trim();
}

function parseSources(tsvText) {
  return tsvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((line) => {
      const parts = line.split("\t").map((p) => p.trim()).filter(Boolean);
      if (parts.length === 1) {
        const slug = extractSlug(parts[0]);
        return { company: slug, slug };
      }
      return { company: parts[0], slug: extractSlug(parts[1]) };
    })
    .filter((x) => x.slug);
}

async function fetchLever(slug) {
  const url = `https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Lever fetch failed ${res.status} for ${slug}: ${body.slice(0, 120)}`);
  }
  return await res.json();
}

async function upsertJobsForCompany(companyPretty, slug) {
  const postings = await fetchLever(slug);

  const seen = [];

  // Build rows for bulk upsert
  const rows = postings.map((p) => {
    const source_job_id = String(p.id);
    seen.push(source_job_id);

    const location_city =
      p.categories?.location ||
      p.categories?.locations ||
      p.location ||
      null;

    return {
      source: "lever",
      source_job_id,
      title: p.text || "",
      company: companyPretty,       // ✅ pretty name ALWAYS
      location_city: location_city ? String(location_city) : null,
      active: true,
    };
  });

  if (rows.length) {
    const { error } = await supabase
      .from("jobs")
      .upsert(rows, { onConflict: "source,source_job_id" });

    if (error) throw error;
  }

  // Deactivate stale Lever jobs for this company
  // (jobs that exist in DB for this company but were NOT in this run)
  if (seen.length) {
    const inList = `(${seen.map((id) => `"${id.replaceAll('"', '\\"')}"`).join(",")})`;

    const { error: staleErr } = await supabase
      .from("jobs")
      .update({ active: false })
      .eq("source", "lever")
      .eq("company", companyPretty)
      .not("source_job_id", "in", inList);

    if (staleErr) throw staleErr;
  }

  return { fetched: postings.length, kept: rows.length };
}

async function main() {
  const abs = path.resolve(process.cwd(), SOURCES_FILE);
  if (!fs.existsSync(abs)) {
    console.error(`Sources file not found: ${abs}`);
    process.exit(1);
  }

  const sourcesText = fs.readFileSync(abs, "utf8");
  const sources = parseSources(sourcesText);

  console.log(`Lever sources: ${sources.length}`);

  for (const s of sources) {
    console.log(`\n== ${s.company} (${s.slug}) ==`);
    const result = await upsertJobsForCompany(s.company, s.slug);
    console.log(`Fetched: ${result.fetched} | Upserted: ${result.kept}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("sync-lever failed:", err?.message || err);
  process.exit(1);
});
