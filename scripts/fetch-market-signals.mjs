import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const DEBUG = process.env.DEBUG === "1";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// rss-parser can be picky with some feeds; keep it simple.
const parser = new Parser({
  timeout: 20000,
  headers: {
    "User-Agent": "HireCRE/1.0 (+https://hirecre.com)",
    Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.7",
  },
});

/**
 * SOURCES
 * - Some sites don't publish RSS (or it's blocked). For those, we list "attempt" URLs.
 * - The script will try each URL, and skip the source if none work.
 *
 * Note: ConnectCRE RSS endpoints are from their own RSS page.
 */
const SOURCES = [
  {
    source: "Bisnow",
    urls: ["https://www.bisnow.com/rss"],
  },
  {
    source: "Commercial Observer",
    urls: ["https://commercialobserver.com/feed/"],
  },
  {
    source: "ConnectCRE",
    // from their RSS page
    urls: [
      "https://www.connectcre.com/feed/",
      "https://www.connectcre.com/feed/rss/",
      "https://www.connectcre.com/feed/atom/",
    ],
  },

  // --- “attempts” (may or may not exist / may block bots) ---
  // If these fail, we’ll later switch to HTML-scraping or another aggregator source.
  { source: "REjournals", urls: ["https://rejournals.com/feed/", "https://rejournals.com/rss/"] },
  { source: "Trepp", urls: ["https://www.trepp.com/blog/rss.xml", "https://www.trepp.com/rss.xml"] },
  { source: "NAR Commercial", urls: ["https://www.nar.realtor/rss", "https://www.nar.realtor/taxonomy/term/??/feed"] },
  { source: "Moody's CRE", urls: ["https://www.moodyscre.com/insights-and-research/feed/"] },
  { source: "NAIOP Research", urls: ["https://www.naiop.org/rss/", "https://www.naiop.org/research-and-publications/rss/"] },
];

/**
 * HARD FILTERS
 * We want COMMERCIAL real estate (not residential/mortgage-rate consumer news).
 */
function isProbablyCRE(text) {
  const t = (text || "").toLowerCase();

  // Strong commercial indicators
  const hasCommercial =
    /\b(commercial real estate|cre)\b/.test(t) ||
    /\b(multifamily|industrial|office|retail|hotel|hospitality|self-storage|datacenter|data center|life science|medical office)\b/.test(t) ||
    /\b(tenant|leasing|lease|cap rate|noi|vacancy|absorption|rent growth)\b/.test(t) ||
    /\b(cmbs|mbs|delinquen|special servicing|debt fund|bridge loan|refinanc|maturity wall)\b/.test(t);

  // Residential / consumer indicators (exclude)
  const isResidentialNoise =
    /\b(single-family|single family|home sales|housing market|mortgage rates|realtor\.com|zillow)\b/.test(t) ||
    /\b(first-time home|first time home|homebuyer|housing starts)\b/.test(t);

  // If it screams residential, drop it.
  if (isResidentialNoise) return false;

  // Otherwise require at least some commercial signal.
  return hasCommercial;
}

/**
 * SCORING
 * Goal: boost macro & trend; punish transaction blotter headlines.
 */
function scoreArticle(text) {
  const t = (text || "").toLowerCase();
  let score = 0;

  // --- MACRO / TREND BOOSTERS ---
  if (/\b(outlook|forecast|guidance|scenario|baseline|headwinds|tailwinds)\b/.test(t)) score += 6;
  if (/\b(cap rates?|valuation|pricing|liquidity|bid-ask|spreads?)\b/.test(t)) score += 6;
  if (/\b(vacancy|absorption|rent growth|asking rents?)\b/.test(t)) score += 6;
  if (/\b(maturity wall|refinanc|extensions?|loan workouts?)\b/.test(t)) score += 6;
  if (/\b(cmbs|special servicing|delinquenc|distress|defaults?)\b/.test(t)) score += 6;
  if (/\b(fed|rates?|sofr|treasur(y|ies)|inflation)\b/.test(t)) score += 3; // lower weight; can be generic

  // CRE sectors (small boost)
  if (/\b(multifamily|industrial|office|retail|hotel|data center|datacenter|self-storage|life science)\b/.test(t))
    score += 2;

  // --- DEAL-BLOTTER PENALTIES (what you called “noise”) ---
  // Penalize specific financings / acquisitions unless they also contain macro words above.
  if (/\b(provides?|provided|lends?|loan|construction loan|acquisition financing)\b/.test(t)) score -= 6;
  if (/\b(buys?|acquires?|sold for|purchased for)\b/.test(t)) score -= 6;

  // Dollar amounts are often transaction blotter
  if (/\$\s?\d/.test(t) || /\b\d+(\.\d+)?\s?(million|billion)\b/.test(t)) score -= 4;

  // Address / very specific property indicator (often a one-off deal)
  if (/\b\d{2,5}\s+\w+(\s+\w+){0,3}\s+(street|st|avenue|ave|road|rd|boulevard|blvd)\b/.test(t)) score -= 6;

  // “Hires / appoints / joins” is HR gossip, not market signal
  if (/\b(appoints?|hired|hires?|joins?|named|promoted)\b/.test(t)) score -= 8;

  return score;
}

/**
 * CLASSIFICATION
 * You said you want:
 * expansions + capital/fundraising + asset-class momentum + layoffs
 * ...but combined into ONE section in the newsletter.
 *
 * We’ll still store a category for filtering later, but this is broader and macro-friendly.
 */
function classify(text) {
  const t = (text || "").toLowerCase();

  if (/\b(layoffs?|job cuts?|retrench|hiring freeze|bankrupt|chapter 11|restructur)\b/.test(t)) return "contraction";
  if (/\b(fundraise|raises?|raises? \d|closes? \d|closed|capital raise|new fund|final close)\b/.test(t)) return "capital";
  if (/\b(expands?|expansion|opens?|opening|launches?|new market|new office)\b/.test(t)) return "expansion";
  if (/\b(momentum|surge|accelerat|rebounds?|outperform|record (year|quarter)|strong demand)\b/.test(t)) return "momentum";

  // Macro “market signal” bucket
  if (/\b(outlook|forecast|cap rates?|vacancy|absorption|rent growth|delinquenc|special servicing|maturity wall)\b/.test(t))
    return "macro";

  return null;
}

function pickPublishedAt(item) {
  return item.isoDate || item.pubDate || item.published || null;
}

async function tryParseFeed(url) {
  const parsed = await parser.parseURL(url);
  return parsed;
}

async function upsertSignal(row) {
  // If you have a unique constraint on (source_url), this will prevent duplicates.
  // If you don't, it will still work but may insert dupes.
  const { error } = await supabase
    .from("market_signals")
    .upsert(row, { onConflict: "source_url" });

  return error;
}

async function main() {
  let inserted = 0;
  const skippedSources = [];

  for (const s of SOURCES) {
    let parsed = null;
    let usedUrl = null;

    for (const url of s.urls) {
      try {
        console.log(`Trying feed: ${s.source} -> ${url}`);
        parsed = await tryParseFeed(url);
        usedUrl = url;
        console.log(`✅ Parsed ${parsed.items?.length ?? 0} items from ${s.source} (${url})`);
        break;
      } catch (e) {
        console.log(`  ❌ Failed: ${url} :: ${e?.message ?? e}`);
      }
    }

    if (!parsed) {
      console.log(`🚫 Skipping entire source: ${s.source}`);
      skippedSources.push(s.source);
      continue;
    }

    // Score candidates
    const candidates = (parsed.items || [])
      .slice(0, 40)
      .map((item) => {
        const text = `${item.title || ""} ${item.contentSnippet || ""} ${item.content || ""}`;
        const category = classify(text);
        const score = scoreArticle(text);
        const creOk = isProbablyCRE(text);

        return { item, text, category, score, creOk };
      })
      .filter((x) => x.creOk && x.category) // must be CRE-ish and classifiable
      .sort((a, b) => b.score - a.score);

    // Threshold: higher = more macro, less noise
    const THRESHOLD = 8;

    // Insert a limited number per source to keep noise down
    const toInsert = candidates
      .filter((x) => x.score >= THRESHOLD)
      .slice(0, 10);

    if (DEBUG) {
      console.log(`Top candidates for ${s.source} (from ${usedUrl}):`);
      for (const c of candidates.slice(0, 8)) {
        console.log(
          `  score=${c.score} category=${c.category} creOk=${c.creOk} :: ${c.item.title}`
        );
      }
      if (!toInsert.length) console.log(`  (none met threshold ${THRESHOLD})`);
    }

    for (const c of toInsert) {
      const item = c.item;

      const headline = (item.title || "").trim();
      const source_url = item.link || item.guid || null;
      if (!headline || !source_url) continue;

      const published_at = pickPublishedAt(item);

      // Keep summary short; your email template can rewrite it later if needed.
      const summary = headline.replace(/\.$/, "") + ".";

      const row = {
        headline,
        summary,
        category: c.category,
        score: c.score,
        source: s.source,
        source_url,
        published_at,
      };

      const err = await upsertSignal(row);
      if (!err) inserted++;
      else if (DEBUG) console.log(`  upsert error for ${source_url}: ${err.message}`);
    }
  }

  console.log(`✅ Inserted ${inserted} market signals`);
  if (skippedSources.length) console.log(`⚠️ Sources skipped: ${skippedSources.join(", ")}`);
}

main().catch((e) => {
  console.error("❌ fetch-market-signals failed:", e?.message ?? e);
  process.exit(1);
});
