#!/usr/bin/env node
/**
 * scripts/sync-greenhouse.mjs
 *
 * Reads scripts/greenhouse_sources.txt (one Greenhouse board slug per line),
 * pulls jobs from Greenhouse JSON endpoint, filters out unwanted titles,
 * upserts into Supabase, and marks stale jobs inactive per company.
 *
 * Required env:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Optional env:
 *   GREENHOUSE_SOURCES_FILE (default: scripts/greenhouse_sources.txt)
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing env vars. Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  );
  process.exit(1);
}

function stripHtml(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPayFromText(text = "") {
  const t = String(text);

  // common salary/range patterns
  const patterns = [
    /\$\s?\d{2,3}(?:,\d{3})?(?:\.\d{2})?\s?(?:-|–|to)\s?\$\s?\d{2,3}(?:,\d{3})?(?:\.\d{2})?\s?(?:\/year|\/yr|per year|yr|annum)?/i,
    /\$\s?\d{2,3}(?:,\d{3})+(?:\.\d{2})?\s?(?:\/year|\/yr|per year|yr|annum)/i,
    /\$\s?\d+(?:,\d{3})*\s?(?:\/hour|\/hr|per hour|hr)/i,
    /\b(OTE|On[-\s]?target earnings)\b.*?\$\s?\d/i,
    /\b(base salary|salary range|compensation|pay range)\b.*?\$\s?\d/i,
  ];

  for (const re of patterns) {
    const m = t.match(re);
    if (m?.[0]) return m[0].replace(/\s+/g, " ").trim();
  }

  // fallback: if there’s a $ and “salary/compensation” nearby, still capture it
  if (/\$/.test(t) && /(salary|compensation|pay|hour|year|ote)/i.test(t)) {
    return "Pay mentioned (see listing)";
  }

  return null;
}

function computePayFields({ title, location, content, description }) {
  const combined = `${title ?? ""}\n${location ?? ""}\n${content ?? ""}\n${description ?? ""}`;
  const plain = stripHtml(combined);
  const pay = extractPayFromText(plain);
  return { has_pay: Boolean(pay), pay_extracted: pay };
}


const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ---- EXCLUSIONS: edit these any time (title-based) ----
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
  "it",
  "information technology",
  "helpdesk",
  "desktop support",
  "network",
  "licensed real estate agent",
  "real estate agent",
];

// ---- Helpers ----
function normalize(s) {
  return (s || "").toString().trim();
}

function shouldExcludeTitle(title) {
  const t = normalize(title).toLowerCase();
  if (!t) return false;
  return EXCLUDE_TITLE_KEYWORDS.some((kw) => t.includes(kw.toLowerCase()));
}

function parseCityState(locationRaw) {
  // Handles:
  // "Chicago, IL"
  // "New York, NY, United States"
  // "Remote - US"
  // If can't parse, returns { city: null, state: null }
  const raw = normalize(locationRaw);
  if (!raw) return { city: null, state: null };

  // Common "City, ST" pattern
  const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) {
    const city = parts[0] || null;
    const stateCandidate = parts[1] || "";
    const state = stateCandidate.length <= 3 ? stateCandidate : null;
    return { city, state };
  }

  return { city: null, state: null };
}

function cleanLocation(s) {
  return normalize(s).replace(/\.+$/, "").trim(); // remove trailing periods like "Santa Monica."
}

function scoreLocation(s) {
  if (!s) return 0;
  let score = 0;

  if (/,/.test(s)) score += 3;                        // "City, ST" or "..., City, ST"
  if (/\b[A-Z]{2}\b/.test(s)) score += 4;             // state code present
  if (/\b(United States|USA)\b/i.test(s)) score += 1;  // bonus for full geo
  if (/\d/.test(s)) score += 1;                       // address-ish (sometimes useful)
  score += Math.min(s.length, 80) / 80;               // slight preference for more info

  return score;
}

function bestLocation(...candidates) {
  const cleaned = candidates.map(cleanLocation).filter(Boolean);
  if (!cleaned.length) return null;

  cleaned.sort((a, b) => scoreLocation(b) - scoreLocation(a));
  return cleaned[0];
}


function sourcesFilePath() {
  const fromEnv = process.env.GREENHOUSE_SOURCES_FILE;
  if (fromEnv) return fromEnv;
  return path.join(process.cwd(), "scripts", "greenhouse_sources.txt");
}

function readSources() {
  const file = sourcesFilePath();
  const txt = fs.readFileSync(file, "utf8");
  return txt
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

async function fetchGreenhouseJobs(companySlug) {
  // Greenhouse job board JSON endpoint (public)
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(
    companySlug
  )}/jobs?content=true`;

  const res = await fetch(url, {
    headers: { "user-agent": "hirecre/greenhouse-sync" },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} :: ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  const jobs = Array.isArray(data?.jobs) ? data.jobs : [];
  return jobs;
}

function buildFingerprint({ source, source_job_id, url }) {
  // Keep it stable. Prefer source_job_id.
  const a = normalize(source);
  const b = normalize(source_job_id);
  const c = normalize(url);
  return `${a}::${b || c}`;
}

async function upsertJobs(rows) {
  if (!rows.length) return { upserted: 0 };

  // IMPORTANT:
  // This assumes you have a UNIQUE constraint on "fingerprint"
  // (your earlier SQL included: fingerprint text unique)
  const { error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "fingerprint" });

  if (error) throw error;
  return { upserted: rows.length };
}

async function markStaleInactive(companySlug, runIso) {
  // Anything from this company not updated during this run becomes inactive
  const { error } = await supabase
    .from("jobs")
    .update({ is_active: false })
    .eq("source", "greenhouse")
    .eq("source_company", companySlug)
    .lt("last_seen_at", runIso);

  if (error) throw error;
}

// ---- Main ----
async function main() {
  const runIso = new Date().toISOString();
  const sources = readSources();

  console.log(`Loaded ${sources.length} Greenhouse sources from ${sourcesFilePath()}`);

  let totalUpserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const companySlug of sources) {
    try {
      const jobs = await fetchGreenhouseJobs(companySlug);

      // Build rows for Supabase
      const rows = [];
      for (const j of jobs) {
        const title = normalize(j?.title);
        const jobUrl = normalize(j?.absolute_url);
        const sourceJobId = j?.id != null ? String(j.id) : null;

        if (!title || !jobUrl) continue;

        if (shouldExcludeTitle(title)) {
          totalSkipped += 1;
          continue;
        }

const locationRaw = bestLocation(
  j?.location?.location,
  j?.location?.name
);


 const STATE_NAME_TO_CODE = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS",
  Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD", Massachusetts: "MA",
  Michigan: "MI", Minnesota: "MN", Mississippi: "MS", Missouri: "MO", Montana: "MT",
  Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
  Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA",
  "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
  Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT", Virginia: "VA",
  Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
  "District of Columbia": "DC",
};
       

function parseCityState(locationRaw) {
  const raw = cleanLocation(locationRaw);
  if (!raw) return { city: null, state: null };

  // don't guess remote
  if (/remote/i.test(raw)) return { city: null, state: null };

  // If it's "City ST" (no comma)
  const mNoComma = raw.match(/^(.+?)\s+([A-Z]{2})$/);
  if (mNoComma) return { city: mNoComma[1].trim(), state: mNoComma[2].toUpperCase() };

  const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);

  // find a state code anywhere
  let state = null;
  let statePartIndex = -1;

  for (let i = 0; i < parts.length; i++) {
    const m = parts[i].match(/\b([A-Z]{2})\b/);
    if (m) {
      state = m[1].toUpperCase();
      statePartIndex = i;
      break;
    }
  }

  if (!state) return { city: null, state: null };

  // choose a "city" token to the left of the state token
  // (skip tokens that look like address lines)
  const isAddressy = (s) =>
    /\d/.test(s) || /\b(suite|ste|unit|floor|bldg|building|#)\b/i.test(s);

  let city = null;

  // Prefer the closest non-address token to the left
  for (let i = statePartIndex - 1; i >= 0; i--) {
    if (!isAddressy(parts[i])) {
      city = parts[i];
      break;
    }
  }

  // If we still didn't find a city, and we only had "Address, ST 12345"
  // then we *can't* reliably infer city from that string.
  return { city: city || null, state };
}




	// ---- Pay extraction (creates boolean + extracted snippet) ----
	const payFields = computePayFields({
	  title,
	  location: locationRaw ?? "",
	  content: j?.content ?? "",
	  description: "", // we already pass content; keep this blank
	});

        const fingerprint = buildFingerprint({
          source: "greenhouse",
          source_job_id: sourceJobId,
          url: jobUrl,
        });

       

	 rows.push({
          source: "greenhouse",
          source_job_id: sourceJobId,
          source_company: companySlug,

       title,
  company: companySlug,
  location_raw: locationRaw,
  location_city: city,
  location_state: state,
  
  employment_type: null,
  job_type: null,

  url: jobUrl,
  description: normalize(j?.content) || null,
  posted_at: j?.updated_at ? new Date(j.updated_at).toISOString() : null,

  // ✅ add these
  has_pay,
  pay_extracted,



          fingerprint,

          // cleanup support
          is_active: true,
          last_seen_at: runIso,
        });
      }

      if (!rows.length) {
        console.log(`[DONE] ${companySlug}: 0 jobs (or all filtered). Marking stale inactive...`);
        await markStaleInactive(companySlug, runIso);
        continue;
      }

      await upsertJobs(rows);
      totalUpserted += rows.length;

      // mark stale inactive after upsert
      await markStaleInactive(companySlug, runIso);

      console.log(`[DONE] ${companySlug}: upserted ${rows.length}, filtered ${jobs.length - rows.length}`);
    } catch (e) {
      totalErrors += 1;

      const msg = (e && e.message) ? e.message : String(e);
      // Common cases:
      // - 404 means "not a greenhouse board slug"
      // - HTML returned means slug isn't boards-api compatible (or blocked)
      if (msg.includes("HTTP 404")) {
        console.log(`[SKIP] ${companySlug} -> HTTP 404 (not a Greenhouse board slug)`);
      } else if (msg.includes("Unexpected token") || msg.includes("not valid JSON")) {
        console.log(`[ERR]  ${companySlug}: returned non-JSON (likely not a valid boards-api slug)`);
      } else {
        console.log(`[ERR]  ${companySlug}: ${msg}`);
      }
    }
  }

  console.log("---- Summary ----");
  console.log(`Upserted: ${totalUpserted}`);
  console.log(`Filtered: ${totalSkipped}`);
  console.log(`Errors:   ${totalErrors}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
