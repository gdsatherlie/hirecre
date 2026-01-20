import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const parser = new Parser({
  timeout: 20000,
  headers: { "User-Agent": "HireCRE-MarketSignals/1.0" }
});

const DEBUG = process.env.DEBUG === "1";

// --- RSS FEEDS (focus on CRE + research) ---
const SOURCES = [
  { source: "Bisnow", urls: ["https://www.bisnow.com/rss"] },
  { source: "Commercial Observer", urls: ["https://commercialobserver.com/feed/"] },
  { source: "ConnectCRE", urls: ["https://www.connectcre.com/feed/"] },
  { source: "REjournals", urls: ["https://rejournals.com/feed/"] },
  { source: "Moody's CRE", urls: ["https://www.moodyscre.com/insights-and-research/feed/"] },

  // Keep these listed but they may fail; script will skip gracefully
  { source: "Trepp", urls: ["https://www.trepp.com/blog/rss.xml", "https://www.trepp.com/rss.xml"] },
  { source: "NAR (generic RSS)", urls: ["https://www.nar.realtor/rss"] },
  { source: "NAIOP (guess)", urls: ["https://www.naiop.org/rss/", "https://www.naiop.org/research-and-publications/rss/"] }
];

// -----------------------
// Helpers: CRE relevance + macro scoring
// -----------------------

function normalize(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function isCreRelevant(text) {
  const t = text.toLowerCase();

  // must contain at least one CRE-ish anchor term
  const hasCreAnchor =
    /(commercial real estate|cre\b|office|industrial|multifamily|retail|hotel|hospitality|self-storage|data center|life sciences|student housing|logistics|warehouse|cap rate|leasing|rent|vacancy|absorption|construction|development|zoning|tenant)/.test(
      t
    );

  if (!hasCreAnchor) return false;

  // exclude obvious residential / consumer housing
  if (/(single-family|home sales|existing home|mortgage rates|realtor\.com|zillow|housing market\b|first-time home|homebuyer)/.test(t)) {
    return false;
  }

  return true;
}

// We want macro/trend shaping pieces, not “$X loan for Y property” noise.
// The scoring below rewards: research/indices/outlooks, sector trends, marketwide stats, distress/credit cycle,
// and penalizes: single-asset deals, “provided $X loan”, “leased X SF to Y”, etc.
function scoreMacro(text) {
  const t = text.toLowerCase();
  let score = 0;

  // Strong macro/research signals
  if (/(report|outlook|forecast|survey|index|cpi|pce|fed|rates|sofr|treasury|spread|basis points|bp\b|cap rates|vacancy|absorption|rent growth|delinquen|special servicing|cmbs|maturity wall|refinanc|distress|workout|defaults)/.test(t)) {
    score += 8;
  }

  // Sector-level / market-level wording
  if (/(market|national|nationwide|across the u\.s\.|u\.s\.|global|regional|pipeline|cycle|trend|momentum|recovery|headwind|tailwind)/.test(t)) {
    score += 5;
  }

  // Asset class + macro framing
  if (/(office|industrial|multifamily|retail|data center|hotel|hospitality|self-storage|life sciences)/.test(t)) {
    score += 3;
  }

  // Firm expansions / platform moves / layoffs (still macro-ish)
  if (/(expansion|opens|launches|new office|platform|strategy shift|restructur|layoff|cuts|bankruptcy|chapter 11|wind down)/.test(t)) {
    score += 2;
  }

  // Penalties: single-deal noise
  if (/(provides|lends|arranges|secures)\s+\$?\d+/.test(t)) score -= 8;
  if (/\$\d+(\.\d+)?\s*(m|mm|million|b|bb|billion)\b/.test(t)) score -= 4; // money alone is often deal noise
  if (/(buys|acquires|sells|sale|purchases)\s+\d+/.test(t)) score -= 5; // “buys 123 Main St” type
  if (/(leased|lease|tenant|snags|takes|signs)\s+\d+/.test(t)) score -= 6; // leasing announcements
  if (/(100k sf|50k sf|\d+\s*sf\b)/.test(t)) score -= 6;

  // Extra penalty: people moves / hires
  if (/(appoints|hires|joins as|named|promoted|chief .* officer|ceo|cfo|coo)/.test(t)) score -= 12;

  return score;
}

function classify(text) {
  const t = text.toLowerCase();

  // Macro/trend bucket should catch most of what we want
  if (/(report|outlook|forecast|survey|index|cap rates|vacancy|absorption|rent growth|distress|cmbs|delinquen|special servicing|maturity wall|refinanc|credit|lending|rates|sofr|treasury|spread|basis points|bp\b)/.test(t)) {
    return "macro";
  }

  // Secondary tags (still included in same newsletter section later)
  if (/(raise|fund|capital|financing|closes|raises|raises \$|fundraising)/.test(t)) return "capital";
  if (/(expand|launch|open|new office|platform)/.test(t)) return "expansion";
  if (/(surge|demand|growth|outperform|rebound|recovery|improving|tightening)/.test(t)) return "momentum";
  if (/(layoff|cuts|retrench|wind down|bankruptcy|chapter 11|restructur)/.test(t)) return "contraction";

  return null;
}

async function parseFirstWorkingUrl(sourceName, urls) {
  for (const url of urls) {
    try {
      if (DEBUG) console.log(`Trying feed: ${sourceName} -> ${url}`);
      const parsed = await parser.parseURL(url);
      if (DEBUG) console.log(`✅ Parsed ${parsed.items?.length || 0} items from ${sourceName} (${url})`);
      return { url, parsed };
    } catch (e) {
      const msg = e?.message || String(e);
      if (DEBUG) console.log(`  ❌ Failed: ${url} :: ${msg}`);
    }
  }
  return null;
}

async function upsertSignal(row) {
  // Uses your unique index on source_url
  return supabase
    .from("market_signals")
    .upsert(row, { onConflict: "source_url" });
}

async function main() {
  let inserted = 0;
  const skippedSources = [];

  for (const src of SOURCES) {
    const result = await parseFirstWorkingUrl(src.source, src.urls);

    if (!result) {
      skippedSources.push(src.source);
      if (DEBUG) console.log(`🚫 Skipping entire source: ${src.source}`);
      continue;
    }

    const { parsed, url: workingUrl } = result;

    // Score + pick top candidates for debugging
    const scored = (parsed.items || [])
      .slice(0, 30)
      .map((item) => {
        const title = normalize(item.title);
        const snippet = normalize(item.contentSnippet || item.content || "");
        const text = `${title} ${snippet}`.trim();

        const category = classify(text);
        const creOk = isCreRelevant(text);
        const score = scoreMacro(text);

        return {
          item,
          title,
          snippet,
          text,
          category,
          creOk,
          score
        };
      })
      .sort((a, b) => b.score - a.score);

    if (DEBUG) {
      console.log(`Top candidates for ${src.source} (from ${workingUrl}):`);
      for (const c of scored.slice(0, 3)) {
        console.log(`  score=${c.score} category=${c.category} creOk=${c.creOk} :: ${c.title}`);
      }
    }

    for (const c of scored) {
      // Must be CRE and must be macro-ish
      if (!c.creOk) continue;
      if (!c.category) continue;

      // Threshold: tune this if too few items.
      // Macro scoring is harsh on deal-noise by design.
      if (c.score < 8) continue;

      const link = c.item.link || null;
      if (!link) continue;

      const row = {
        // IMPORTANT: satisfy your existing NOT NULL "title" column
        title: c.title,

        // Also store our richer fields (if columns exist)
        headline: c.title,
        summary: c.snippet || c.title,
        category: c.category,
        score: c.score,
        source: src.source,
        source_url: link,
        published_at: c.item.pubDate ? new Date(c.item.pubDate).toISOString() : null
      };

      const { error } = await upsertSignal(row);

      if (error) {
        if (DEBUG) console.log(`  upsert error for ${link}: ${error.message || error}`);
        continue;
      }

      inserted++;
    }
  }

  console.log(`✅ Inserted ${inserted} market signals`);
  if (skippedSources.length) console.log(`⚠️ Sources skipped: ${skippedSources.join(", ")}`);
}

main().catch((e) => {
  console.error("❌ fetch-market-signals failed:", e);
  process.exit(1);
});
