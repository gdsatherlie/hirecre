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
 * Upserts into Supabase table: public.jobs (use .from("jobs"))
 *
 * Key behavior:
 * - company = pretty name ALWAYS (from TSV)
 * - source_company = lever slug (for grouping/debugging)
 * - fingerprint = lever:<slug>:<jobId> (unique key for upsert)
 * - is_active true for seen jobs, false for stale jobs per slug
 * - last_seen_at updated each run
 * - description stored
 * - has_pay + pay_extracted computed using shared pay parser (IDENTICAL across sources)
 *
 * Required env:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional env:
 *   LEVER_SOURCES_FILE (default: scripts/lever_sources.txt)
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

const SOURCES_FILE =
  process.env.LEVER_SOURCES_FILE || "scripts/lever_sources.txt";

/* ----------------------------- helpers ----------------------------- */

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
      if (parts.length >= 2) {
        return { companyPretty: parts[0], slug: extractSlug(parts[1]) };
      }
      const slug = extractSlug(parts[0]);
      return { companyPretty: slug, slug };
    })
    .filter((x) => x.slug);
}

async function fetchLever(slug) {
  const url = `https://api.lever.co/v0/postings/${encodeURIComponent(
    slug
  )}?mode=json`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Lever fetch failed ${res.status} for ${slug}: ${body.slice(0, 160)}`
    );
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
    return {
      location_raw: txt,
      location_city: parts[0] || null,
      location_state: parts[1] || null,
    };
  }

  return {
    location_raw: txt,
    location_city: txt || null,
    location_state: null,
  };
}

/* ------------------------------ main ------------------------------ */

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
    const nowIso = new Date().toISOString();

    const seenFingerprints = [];

    const rows = postings.map((p) => {
      const source_job_id = String(p.id);
      const fingerprint = `lever:${slug}:${source_job_id}`;
      seenFingerprints.push(fingerprint);

      const { location_raw, location_city, location_state } =
        pickLocationParts(p);

      // Lever: description is usually HTML; sometimes descriptionPlain exists
      const descriptionHtml = p.description || "";
      const descriptionText = p.descriptionPlain || stripHtml(descriptionHtml);

      // ✅ IDENTICAL pay parsing across sources
      const pay = extractPayFromText(descriptionText);

      return {
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

        description: descriptionHtml || descriptionText || null,
        has_pay: pay.has_pay,
        pay_extracted: pay.pay_extracted,

        is_active: true,
        last_seen_at: nowIso,

        job_type: p.categories?.commitment || null,
        employment_type: p.categories?.commitment || null,
      };
    });

    if (rows.length) {
      const { error } = await supabase
        .from("jobs")
        .upsert(rows, { onConflict: "fingerprint" });

      if (error) throw error;
    }

    if (seenFingerprints.length) {
      const inList = `(${seenFingerprints
        .map((f) => `"${f.replaceAll('"', '\\"')}"`)
        .join(",")})`;

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
