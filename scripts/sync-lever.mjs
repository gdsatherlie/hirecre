#!/usr/bin/env node
/**
 * scripts/sync-lever.mjs
 *
 * Reads scripts/lever_sources.txt (TSV):
 *   Pretty Company Name<TAB>lever-slug-or-url
 *
 * Upserts into public.jobs (table: "jobs")
 * Uses:
 *   - source = 'lever'
 *   - source_job_id = Lever job id
 *   - company = pretty name (ALWAYS)
 *   - source_company = lever slug (for debugging/grouping)
 *   - fingerprint = lever:<slug>:<id>  (unique key)
 *   - is_active = true/false
 *   - last_seen_at = now()
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

function parseSources(text) {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((line) => {
      const parts = line.split("\t").map((p) => p.trim()).filter(Boolean);
      if (parts.length < 2) {
        // allow single-column slug lines if needed
        const slug = extractSlug(parts[0]);
        return { companyPretty: slug, slug };
      }
      return { companyPretty: parts[0], slug: extractSlug(parts[1]) };
    })
    .filter((x) => x.slug);
}

async function fetchLever(slug) {
  const url = `https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Lever fetch failed ${res.status} for ${slug}: ${body.slice(0, 160)}`);
  }
  return await res.json();
}

function pickLocationParts(posting) {
  // Lever often returns "City, State" (or "Remote") in categories.location
  const raw =
    posting?.categories?.location ||
    posting?.location ||
    null;

  if (!raw || typeof raw !== "string") return { location_raw: null, location_city: null, location_state: null };

  const txt = raw.trim();
  // naive split for "City, ST"
  const parts = txt.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    return { location_raw: txt, location_city: parts[0] || null, location_state: parts[1] || null };
  }
  return { location_raw: txt, location_city: txt || null, location_state: null };
}

async function main() {
  const abs = path.resolve(process.cwd(), SOURCES_FILE);
  if (!fs.existsSync(abs)) {
    console.error(`Sources file not found: ${abs}`);
    process.exit(1);
  }

  const sources = parseSources(fs.readFileSync(abs, "utf8"));
  console.log(`Lever sources: ${sources.length}`);

  for (const { companyPretty, slug } of sources) {
    console.log(`\n== ${companyPretty} (${slug}) ==`);

    const postings = await fetchLever(slug);
    const seenFingerprints = [];

    const nowIso = new Date().toISOString();

    const rows = postings.map((p) => {
      const source_job_id = String(p.id);
      const fingerprint = `lever:${slug}:${source_job_id}`;
      seenFingerprints.push(fingerprint);

      const { location_raw, location_city, location_state } = pickLocationParts(p);

      return {
        source: "lever",
        source_job_id,
        fingerprint,

        // ✅ pretty name always
        company: companyPretty,

        // useful for grouping/debugging
        source_company: slug,

        title: p.text || null,
        url: p.hostedUrl || p.applyUrl || null,

        location_raw,
        location_city,
        location_state,

        // optional fields (safe to store if present)
        job_type: p.categories?.commitment || null,
        employment_type: p.categories?.commitment || null,

        // IMPORTANT: your table uses is_active (not active)
        is_active: true,
        last_seen_at: nowIso,
      };
    });

    if (rows.length) {
      const { error } = await supabase
        .from("jobs")
        .upsert(rows, { onConflict: "fingerprint" }); // uses your fingerprint as the unique key

      if (error) throw error;
    }

    // Deactivate stale Lever jobs for this company slug
    // (anything previously seen for this slug not present in this run)
    if (seenFingerprints.length) {
      const inList = `(${seenFingerprints.map((f) => `"${f.replaceAll('"', '\\"')}"`).join(",")})`;

      const { error: staleErr } = await supabase
        .from("jobs")
        .update({ is_active: false })
        .eq("source", "lever")
        .eq("source_company", slug)
        .not("fingerprint", "in", inList);

      if (staleErr) throw staleErr;
    }

    console.log(`Fetched: ${postings.length} | Upserted: ${rows.length}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("sync-lever failed:", err?.message || err);
  process.exit(1);
});
