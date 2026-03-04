#!/usr/bin/env node
/**
 * scripts/sync-icims.mjs
 *
 * Reads scripts/icims_sources.txt (TSV):
 *   Pretty Company Name<TAB>icims-board-url
 *
 * Pulls iCIMS job lists from public HTML pages:
 *   - /jobs/intro  (links to search)
 *   - /jobs/search (contains the listing + pagination)
 *
 * Then fetches each job detail page:
 *   /jobs/{id}/.../job
 *
 * Upserts into Supabase table: jobs
 *
 * Fields used:
 * - source, source_company, source_job_id, fingerprint
 * - title, company, url, description
 * - location_raw, location_city, location_state
 * - posted_at (if detectable)
 * - has_pay, pay_extracted
 * - is_active, last_seen_at
 *
 * IMPORTANT:
 * DB enforces UNIQUE(source, source_job_id)
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

const SOURCES_FILE = process.env.ICIMS_SOURCES_FILE || "scripts/icims_sources.txt";

const USER_AGENT =
  process.env.ICIMS_USER_AGENT ||
  "HireCREBot/1.0 (+https://hirecre.com; jobs aggregator)";

const REQUEST_DELAY_MS = Number(process.env.ICIMS_DELAY_MS || 250);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseSources(text) {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((line) => {
      const parts = line.split("\t").map((p) => p.trim()).filter(Boolean);
      if (parts.length < 2) return null;
      return { companyPretty: parts[0], boardUrl: parts[1] };
    })
    .filter(Boolean);
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `iCIMS fetch failed ${res.status} for ${url}: ${body.slice(0, 160)}`
    );
  }
  return await res.text();
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

function getSourceCompanyKey(boardUrl) {
  const u = new URL(boardUrl);
  // e.g. careers-greenstreet.icims.com -> careers-greenstreet
  return u.hostname.split(".")[0].toLowerCase();
}

function normalizeBoardToSearchUrl(boardUrl) {
  const u = new URL(boardUrl);
  // if they gave /jobs/intro, convert to /jobs/search
  if (u.pathname.endsWith("/jobs/intro")) {
    u.pathname = "/jobs/search";
    u.search = "";
    return u.toString();
  }
  return u.toString();
}

function absoluteUrl(origin, href) {
  try {
    return new URL(href, origin).toString();
  } catch {
    return null;
  }
}

/**
 * Extract job links from an iCIMS search HTML page.
 * We look for href="/jobs/{id}/.../job"
 */
function extractJobLinksFromSearchHtml(html, origin) {
  const links = new Map(); // jobId -> url
  const re = /href="([^"]*\/jobs\/(\d+)\/[^"]*\/job[^"]*)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    const jobId = m[2];
    const full = absoluteUrl(origin, href);
    if (jobId && full) links.set(jobId, full);
  }
  return Array.from(links.entries()).map(([jobId, url]) => ({ jobId, url }));
}

/**
 * Pagination:
 * many iCIMS boards use ?pr=0, ?pr=1, ... for pages.
 * We'll try pr=0..N until we stop finding new jobs.
 */
async function crawlSearchPages(searchUrl) {
  const u = new URL(searchUrl);
  const origin = u.origin;

  const all = new Map(); // jobId -> url
  const maxPages = Number(process.env.ICIMS_MAX_PAGES || 25);

  for (let page = 0; page < maxPages; page++) {
    const pageUrl = new URL(searchUrl);

    pageUrl.searchParams.set("pr", String(page));

    const html = await fetchHtml(pageUrl.toString());
    const found = extractJobLinksFromSearchHtml(html, origin);

    if (found.length === 0) break;

    let newCount = 0;
    for (const f of found) {
      if (!all.has(f.jobId)) {
        all.set(f.jobId, f.url);
        newCount++;
      }
    }

    if (newCount === 0) break;

    await sleep(REQUEST_DELAY_MS);
  }

  return Array.from(all.entries()).map(([jobId, url]) => ({ jobId, url }));
}

function parseJsonLdDatePosted(html) {
  const blocks = [];
  const re =
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1]);
  }

  for (const raw of blocks) {
    const text = raw.trim();
    if (!text) continue;
    try {
      const obj = JSON.parse(text);
      const candidates = Array.isArray(obj) ? obj : [obj];
      for (const c of candidates) {
        const t = c?.["@type"];
        const dp = c?.datePosted;
        if (
          (t === "JobPosting" || (Array.isArray(t) && t.includes("JobPosting"))) &&
          dp
        ) {
          const d = new Date(dp);
          if (!Number.isNaN(d.getTime())) return d.toISOString();
        }
      }
    } catch {
      // ignore
    }
  }
  return null;
}

function parseTitle(html) {
  const h1 = html.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/i);
  if (h1) return stripHtml(h1[1]);

  const t = html.match(/<title[^>]*>\s*([\s\S]*?)\s*<\/title>/i);
  if (t) return stripHtml(t[1]).replace(/\s+\|\s+Careers.*$/i, "").trim();

  return null;
}

function parseLocationLine(html) {
  const m = html.match(/Location\s+([A-Z]{2}-[A-Z]{2}-[A-Za-z0-9 .'-]+)/i);
  if (m) return m[1].trim();

  const m2 = html.match(
    />\s*Location\s*<\/[^>]+>\s*<[^>]+>\s*([\s\S]*?)\s*</i
  );
  if (m2) return stripHtml(m2[1]);

  return null;
}

function splitCityStateFromLocationRaw(locationRaw) {
  if (!locationRaw) return { location_city: null, location_state: null };

  const m = locationRaw.match(/^[A-Z]{2}-([A-Z]{2})-(.+)$/);
  if (m) return { location_state: m[1], location_city: m[2].trim() };

  const m2 = locationRaw.match(/^(.+?),\s*([A-Z]{2})$/);
  if (m2) return { location_city: m2[1].trim(), location_state: m2[2] };

  return { location_city: null, location_state: null };
}

function parseDescription(html) {
  const text = stripHtml(html);
  return text.length > 50000 ? text.slice(0, 50000) : text;
}

async function fetchJobDetail(jobUrl) {
  const html = await fetchHtml(jobUrl);

  const title = parseTitle(html);
  const location_raw = parseLocationLine(html);

  const { location_city, location_state } =
    splitCityStateFromLocationRaw(location_raw);

  const posted_at = parseJsonLdDatePosted(html);
  const descriptionText = parseDescription(html);
  const pay = extractPayFromText(descriptionText);

  return {
    title,
    location_raw: location_raw || null,
    location_city,
    location_state,
    posted_at,
    description: descriptionText || null,
    has_pay: pay.has_pay,
    pay_extracted: pay.pay_extracted,
  };
}

async function upsertJobs(rows) {
  if (!rows.length) return;

  const { error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "source,source_job_id" });

  if (error) throw error;
}

async function markStaleInactive(sourceCompanyKey, runIso) {
  const { error } = await supabase
    .from("jobs")
    .update({ is_active: false })
    .eq("source", "icims")
    .eq("source_company", sourceCompanyKey)
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
  console.log(`iCIMS sources: ${sources.length}`);
  console.log(`SYNC-ICIMS VERSION: conflict key = (source, source_job_id) ✅`);

  for (const { companyPretty, boardUrl } of sources) {
    const source_company = getSourceCompanyKey(boardUrl);
    const searchUrl = normalizeBoardToSearchUrl(boardUrl);

    console.log(`\n== ${companyPretty} (${source_company}) ==`);
    console.log(`Search URL: ${searchUrl}`);

    const runIso = new Date().toISOString();

    // 1) Crawl job listing links
    const jobs = await crawlSearchPages(searchUrl);
    console.log(`Found job links: ${jobs.length}`);

    const rows = [];

    // 2) Fetch each job detail page
    const maxJobs = Number(process.env.ICIMS_MAX_JOBS_PER_COMPANY || 400);
    const slice = jobs.slice(0, maxJobs);

    let skippedMissingId = 0;
    let detailErrors = 0;

    for (let i = 0; i < slice.length; i++) {
      const { jobId, url } = slice[i];

      if (!jobId) {
        skippedMissingId += 1;
        continue;
      }

      const source_job_id = String(jobId);
      const fingerprint = `icims:${source_company}:${source_job_id}`;

      let detail;
      try {
        detail = await fetchJobDetail(url);
      } catch (e) {
        detailErrors += 1;
        console.warn(
          `Detail fetch failed for ${companyPretty} job ${jobId}:`,
          e?.message || e
        );
        await sleep(REQUEST_DELAY_MS);
        continue;
      }

      rows.push({
        source: "icims",
        source_company,
        source_job_id,
        fingerprint,

        company: companyPretty,
        url: url || null,

        title: detail.title || null,

        location_raw: detail.location_raw,
        location_city: detail.location_city,
        location_state: detail.location_state,

        posted_at: detail.posted_at,

        description: detail.description,
        has_pay: detail.has_pay,
        pay_extracted: detail.pay_extracted,

        is_active: true,
        last_seen_at: runIso,

        job_type: null,
        employment_type: null,
      });

      if ((i + 1) % 25 === 0) {
        console.log(`...processed ${i + 1}/${slice.length}`);
      }

      await sleep(REQUEST_DELAY_MS);
    }

    // 3) Upsert
    await upsertJobs(rows);

    // 4) Deactivate stale jobs for this iCIMS company
    await markStaleInactive(source_company, runIso);

    const withPosted = rows.filter((r) => r.posted_at).length;
    console.log(
      `Upserted: ${rows.length} | posted_at present: ${withPosted}/${rows.length} | skipped missing id: ${skippedMissingId} | detail errors: ${detailErrors}`
    );
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("sync-icims failed:", err?.message || err);
  process.exit(1);
});
