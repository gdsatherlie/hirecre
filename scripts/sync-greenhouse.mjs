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
  console.error("Missing env vars. Need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
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

// -------------------- helpers --------------------
function normalize(s) {
  return (s || "").toString().trim();
}

function shouldExcludeTitle(title) {
  const t = normalize(title).toLowerCase();
  if (!t) return false;
  return EXCLUDE_TITLE_KEYWORDS.some((kw) => t.includes(kw.toLowerCase()));
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

function buildFingerprint({ source, source_job_id, url }) {
  const a = normalize(source);
  const b = normalize(source_job_id);
  const c = normalize(url);
  return `${a}::${b || c}`;
}

// -------------------- location parsing --------------------
const STATE_ABBRS = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
]);

const STATE_NAME_TO_ABBR = new Map(Object.entries({
  "alabama":"AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA",
  "colorado":"CO","connecticut":"CT","delaware":"DE","florida":"FL","georgia":"GA",
  "hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS",
  "kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA",
  "michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT",
  "nebraska":"NE","nevada":"NV","new hampshire":"NH","new jersey":"NJ","new mexico":"NM",
  "new york":"NY","north carolina":"NC","north dakota":"ND","ohio":"OH","oklahoma":"OK",
  "oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD",
  "tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA",
  "west virginia":"WV","wisconsin":"WI","wyoming":"WY","district of columbia":"DC",
}));

function looksLikeStreetAddress(s) {
  // If it starts with a number OR contains "Suite/Ste/Apt/#" etc, it’s probably an address.
  const v = normalize(s);
  if (!v) return false;
  if (/^\d{1,6}\s/.test(v)) return true;
  if (/\b(suite|ste\.?|apt\.?|unit|#)\b/i.test(v)) return true;
  return false;
}

function parseLocationUS(locationRaw) {
  // Goal: return { city, state } where state is 2-letter, and city is a city-ish string.
  // Handles:
  // - "Chicago, IL"
  // - "Phoenix, Arizona, United States"
  // - "10777 Westheimer Road, Suite 400, Houston, Texas 77042"
  // - "Boca Raton" (no state)
  // - "Remote - US" / "Remote" / "United States"
  const raw = normalize(locationRaw);
  if (!raw) return { city: null, state: null };

  const lower = raw.toLowerCase();

  // Remote handling
  if (lower.includes("remote")) {
    return { city: "Remote", state: null };
  }

  // 1) Try to extract a 2-letter state abbreviation anywhere near the end or before ZIP
  // Examples: ", TX" or ", TX 78728" or " Houston, TX" etc.
  const abbrMatch = raw.match(/\b([A-Z]{2})\b(?:\s+\d{5}(?:-\d{4})?)?$/);
  let state = abbrMatch?.[1] && STATE_ABBRS.has(abbrMatch[1]) ? abbrMatch[1] : null;

  // 2) If not found, try full state name anywhere
  if (!state) {
    // Look for the longest state name match (e.g., "new york")
    let found = null;
    for (const [name, abbr] of STATE_NAME_TO_ABBR.entries()) {
      if (lower.includes(name)) found = abbr;
    }
    state = found;
  }

  // 3) City extraction rules
  // Prefer patterns like: "... , City, ST" or "... , City, StateName"
  // For address strings, the city is typically the token before the state token.
  let city = null;

  // Split by commas (most GH locations are comma-delimited)
  const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);

  if (parts.length >= 2) {
    // If we have a known state, find which part contains it (abbr or name), then city is the part before it.
    if (state) {
      // find state index by abbreviation token
      let stateIdx = -1;

      // try exact abbr in parts
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (new RegExp(`\\b${state}\\b`).test(p)) {
          stateIdx = i;
          break;
        }
      }

      // if not found by abbr, try by state name
      if (stateIdx === -1) {
        for (let i = 0; i < parts.length; i++) {
          const pl = parts[i].toLowerCase();
          for (const [name, abbr] of STATE_NAME_TO_ABBR.entries()) {
            if (abbr === state && pl.includes(name)) {
              stateIdx = i;
              break;
            }
          }
          if (stateIdx !== -1) break;
        }
      }

      // city is the part right before the state part (common for addresses)
      if (stateIdx > 0) {
        const candidate = parts[stateIdx - 1];
        if (candidate && !looksLikeStreetAddress(candidate) && candidate.toLowerCase() !== "united states") {
          city = candidate;
        }
      }

      // fallback: if format is "City, ST" the first part is city
      if (!city && parts.length >= 2) {
        const candidate = parts[0];
        if (candidate && !looksLikeStreetAddress(candidate) && candidate.toLowerCase() !== "united states") {
          city = candidate;
        }
      }
    } else {
      // No state available — maybe "City, Country" etc. Keep city if it doesn’t look like an address.
      const candidate = parts[0];
      if (candidate && !looksLikeStreetAddress(candidate) && candidate.toLowerCase() !== "united states") {
        city = candidate;
      }
    }
  } else {
    // Single token location like "Boca Raton" or "United States"
    if (raw.toLowerCase() !== "united states" && !looksLikeStreetAddress(raw)) {
      city = raw;
    }
  }

  return { city: city || null, state: state || null };
}

// -------------------- sources + greenhouse --------------------
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
  if (!rows.length) return { upserted: 0 };

  const { error } = await supabase.from("jobs").upsert(rows, { onConflict: "fingerprint" });
  if (error) throw error;

  return { upserted: rows.length };
}

async function markStaleInactive(companySlug, runIso) {
  const { error } = await supabase
    .from("jobs")
    .update({ is_active: false })
    .eq("source", "greenhouse")
    .eq("source_company", companySlug)
    .lt("last_seen_at", runIso);

  if (error) throw error;
}

// -------------------- main --------------------
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

        const locationRaw = normalize(j?.location?.name) || normalize(j?.location?.location) || null;

        const { city, state } = parseLocationUS(locationRaw);

        const { has_pay, pay_extracted } = computePayFields({
          title,
          location: locationRaw ?? "",
          content: j?.content ?? "",
          description: "",
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

          has_pay,
          pay_extracted,

          fingerprint,

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

      await markStaleInactive(companySlug, runIso);

      console.log(`[DONE] ${companySlug}: upserted ${rows.length}, filtered ${jobs.length - rows.length}`);
    } catch (e) {
      totalErrors += 1;
      const msg = e?.message ? e.message : String(e);

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
