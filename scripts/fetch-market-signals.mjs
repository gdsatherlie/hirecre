import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// rss-parser + headers to reduce “blocked by bot protection” weirdness
const parser = new Parser({
  timeout: 25000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; HireCREBot/1.0; +https://hirecre.com)",
    Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.7",
  },
});

// --- RSS FEEDS (CRE ONLY) ---
// NOTE: GlobeSt feed URL changed (the /feed/ you had was 404)
const FEEDS = [
  { source: "Bisnow", urls: ["https://www.bisnow.com/rss"] },
  { source: "Commercial Observer", urls: ["https://commercialobserver.com/feed/"] },

  // GlobeSt: try a few variants; any failure should NOT crash the script
  { source: "GlobeSt", urls: ["https://www.globest.com/rss", "https://www.globest.com/feed/"] },
];

// --- helpers ---
function scoreArticle(text) {
  let score = 0;
  const t = text.toLowerCase();

  // positive signals
  if (/\$\s?\d[\d,]*\s?(m|mm|million|b|bb|billion)\b/.test(t)) score += 5;
  if (/\b(million|billion)\b/.test(t)) score += 3;
  if (/portfolio|platform|strategy|vehicle|fund|fundraise|raise|closing|committed|anchor/.test(t)) score += 3;
  if (/debt|credit|distress|recap|bridge|mezz|preferred equity|refi|refinance|lender|loan/.test(t)) score += 3;
  if (/office|industrial|retail|multifamily|apartments|self-storage|storage|data center|life science|hotel/.test(t)) score += 2;

  // negative signals (your “don’t make it hiring-announcement spam” filter)
  if (/appoints|hires|joins as|named|promotes|ceo|cfo|coo|president|managing director/.test(t)) score -= 8;
  if (/housing|home sales|homebuilder|single-family|mortgage rates|condo sales|existing-home/.test(t)) score -= 20;

  return score;
}

function classify(text) {
  const t = text.toLowerCase();

  if (/raise|fundraise|fund|vehicle|capital raise|closing|close(d)?|commit(ted)?|financing|capital/.test(t)) return "capital";
  if (/expand|expansion|launch|open|opening|new office|enters? (the )?market|grow footprint/.test(t)) return "expansion";
  if (/surge|demand|growth|outperform|record|strong momentum|tailwind|accelerat/.test(t)) return "momentum";
  if (/layoff|cuts|retrench|wind down|pause|freeze|shut(ting)? down|bankrupt|restructur/.test(t)) return "layoffs";

  return null;
}

function isCommercialRealEstate(text) {
  const t = text.toLowerCase();

  // hard exclude residential / consumer housing
  if (/housing|home sales|homebuilder|single-family|mortgage rates|condo sales|existing-home/.test(t)) return false;

  // require at least one CRE-ish token
  return /commercial real estate|cre\b|office|industrial|retail|multifamily|apartments|self-storage|storage|data center|life science|hotel|warehouse|logistics/.test(
    t
  );
}

function pickPublishedAt(item) {
  return item.isoDate || item.pubDate || item.published || item.updated || null;
}

async function parseWithFallbacks(feed) {
  let lastErr = null;

  for (const url of feed.urls) {
    try {
      console.log(`Trying feed: ${feed.source} -> ${url}`);
      const parsed = await parser.parseURL(url);
      return { parsed, urlUsed: url };
    } catch (err) {
      lastErr = err;
      console.error(`  ❌ Failed: ${url} :: ${err?.message || err}`);
    }
  }

  throw lastErr || new Error(`All feed URLs failed for ${feed.source}`);
}

async function main() {
  let inserted = 0;
  let skippedFeeds = 0;

  for (const feed of FEEDS) {
    let parsed;
    let urlUsed;

    try {
      const res = await parseWithFallbacks(feed);
      parsed = res.parsed;
      urlUsed = res.urlUsed;
    } catch (err) {
      skippedFeeds++;
      console.error(`🚫 Skipping entire feed: ${feed.source}`);
      continue; // IMPORTANT: don't crash the whole job
    }

    const items = Array.isArray(parsed.items) ? parsed.items.slice(0, 25) : [];
    console.log(`✅ Parsed ${items.length} items from ${feed.source} (${urlUsed})`);

    for (const item of items) {
      const title = (item.title || "").trim();
      const link = (item.link || "").trim();
      const snippet = (item.contentSnippet || item.content || "").toString();

      if (!title || !link) continue;

      const text = `${title} ${snippet}`;
      if (!isCommercialRealEstate(text)) continue;

      const category = classify(text);
      if (!category) continue;

      const score = scoreArticle(text);
      if (score < 5) continue;

      const summary = title.replace(/\.$/, "") + ".";

      const { error } = await supabase.from("market_signals").insert({
        headline: title,
        summary,
        category,
        score,
        source: feed.source,
        source_url: link,
        published_at: pickPublishedAt(item),
      });

      if (!error) inserted++;
    }
  }

  console.log(`✅ Inserted ${inserted} market signals`);
  console.log(`⚠️ Feeds skipped: ${skippedFeeds}`);
}

main().catch((e) => {
  console.error("❌ fetch-market-signals failed:", e);
  process.exit(1);
});
