#!/usr/bin/env node
/**
 * scripts/sync-lever.mjs
 *
 * Reads scripts/lever_sources.txt (TSV):
 *   Pretty Company Name<TAB>lever-slug-or-url
 *
 * Pulls Lever jobs via:
 *   https://api.lever.co/v0/postings/{slug}?mode=json
 *
 * Upserts into Supabase table: jobs
 *
 * Uses your schema:
 * - is_active
 * - fingerprint (kept, but NOT used as conflict key anymore)
 * - source_company, last_seen_at
 * - has_pay, pay_extracted
 * - posted_at ✅
 *
 * IMPORTANT:
 * Your DB now enforces UNIQUE(source, source_job_id)
 * so we upsert onConflict: "source,source_job_id"
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { extractPayFromText } from "./pay-utils.mjs";

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
      if (parts.length >= 2) return { companyPretty: parts[0], slug: extractSlug(parts[1]) };
      const slug = extractSlug(parts[0]);
      return { companyPretty: slug, slug };
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

function stripHtml(html) {
  if (!html) return "";
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function pickLocationParts(posting) {
  const raw = posting?.categories?.location || posting?.location || null;
  if (!raw || typeof raw !== "string") {
    return { location_raw: null, location_city: null, location_state: null };
  }
  const txt = raw.trim();
  const parts = txt.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    return { location_raw: txt, location_city: parts[0] || null, location_state: parts[1] || null };
  }
  return { location_raw: txt, location_city: txt || null, location_state: null };
}

// ✅ Lever posted time: listedAt preferred, createdAt fallback (epoch ms)
function leverPostedAt(p) {
  const ms = p?.listedAt ?? p?.createdAt ?? null;
  if (typeof ms !== "number" || !ms) return null;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

async function upsertJobs(rows) {
  if (!rows.length) return;

  // ✅ IMPORTANT: conflict on (source, source_job_id)
  const { error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "source,source_job_id" });

  if (error) throw error;
}

async function markStaleInactive(sourceCompanySlug, runIso) {
  // ✅ Anything not touched in this run becomes inactive.
  // This is faster/cleaner than building a giant IN(...) list.
  const { error } = await supabase
    .from("jobs")
    .update({ is_active: false })
    .eq("source", "lever")
    .eq("source_company", sourceCompanySlug)
    .lt("last_seen_at", runIso);

  if (error) throw error;
}

async function main() {
  const abs = path.resolve(process.cwd(), SOURCES_FILE);
  if (!fs.existsSync(abs)) {
    console.error(`Sources file not found: ${abs}`);
    process.exit(1);
  }

  const sources = parseSources(fs.readFileSync(abs, "utf8"));
  console.log(`Lever sources: ${sources.length}`);
  console.log(`SYNC-LEVER VERSION: conflict key = (source, source_job_id) ✅`);

  for (const { companyPretty, slug } of sources) {
    console.log(`\n== ${companyPretty} (${slug}) ==`);

    const postings = await fetchLever(slug);
    const runIso = new Date().toISOString();

    let skippedMissingId = 0;

    const rows = [];
    for (const p of postings) {
      if (!p?.id) {
        skippedMissingId += 1;
        continue;
      }

      const source_job_id = String(p.id);
      const fingerprint = `lever:${slug}:${source_job_id}`;

      const { location_raw, location_city, location_state } = pickLocationParts(p);

      const descriptionHtml = p.description || "";
      const descriptionText = p.descriptionPlain || stripHtml(descriptionHtml);

      const pay = extractPayFromText(descriptionText);

      rows.push({
        source: "lever",
        source_job_id,
        fingerprint,

        company: companyPretty,
        source_company: slug,

        title: p.text || null,
        url: p.hostedUrl || p.applyUrl || null,

        location_raw,
        location_city,
        location_state,

        posted_at: leverPostedAt(p),

        description: descriptionHtml || descriptionText || null,
        has_pay: pay.has_pay,
        pay_extracted: pay.pay_extracted,

        is_active: true,
        last_seen_at: runIso,

        job_type: p.categories?.commitment || null,
        employment_type: p.categories?.commitment || null,
      });
    }

    // 🔥 DEBUG so you can SEE production is running this code
    const sample = rows.slice(0, 3).map((r, i) => ({
      i,
      title: r.title,
      source_job_id: r.source_job_id,
      posted_at: r.posted_at,
    }));
    const withPosted = rows.filter((r) => r.posted_at).length;

    console.log(`Postings fetched: ${postings.length}`);
    console.log(`Skipped missing id: ${skippedMissingId}`);
    console.log(`Rows with posted_at: ${withPosted}/${rows.length}`);
    console.log(`Sample posted_at values:`, sample);

    await upsertJobs(rows);
    await markStaleInactive(slug, runIso);

    console.log(`Upserted active: ${rows.length}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("sync-lever failed:", err?.message || err);
  process.exit(1);
});
