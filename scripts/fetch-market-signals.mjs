import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// rss-parser options: keep it simple, but we parse from text ourselves
const parser = new Parser({
  timeout: 20000,
});

// --- RSS FEEDS (CRE ONLY) ---
// We keep multiple URLs per source so we can fall back if one breaks.
const FEEDS = [
  {
    source: "Bisnow",
    urls: ["https://www.bisnow.com/rss"],
  },
  {
    source: "Commercial Observer",
    urls: ["https://commercialobserver.com/feed/"],
  },

  // GlobeSt is intentionally removed for now because their endpoints return 404 or malformed/HTML.
  // If we later find a clean RSS endpoint, we can add it back safely here.
];

// --- helpers ---
function normalizeText(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
}

function looksLikeFeed(xmlText) {
  const t = (xmlText || "").slice(0, 2000).toLowerCase();
  // RSS or Atom
  return t.includes("<rss") || t.includes("<feed") || t.includes("<rdf:rdf");
}

function isProbablyCRE(text) {
  const t = text.toLowerCase();

  // Hard excludes (avoid residential + generic markets)
  if (
    /home sales|single-family|single family|mortgage rate|housing market|realtor\.com|zillow|redfin|mls\b|condo sales/.test(
      t
    )
  ) {
    return false;
  }

  // Require at least one CRE-ish anchor
  // (asset classes, transactions, financing, leasing, development, CRE terms)
  const anchors =
    /commercial real estate|\bcre\b|multifamily|industrial|office|retail|self-storage|self storage|data center|life sciences|hotel|hospitality|leasing|tenant|landlord|cap rate|noi|ground lease|construction loan|bridge loan|mezz|preferred equity|recapital|distress|foreclosure|cmbs|refinanc|acquisition|development|pipeline|sublease/.test(
      t
    );

  return anchors;
}

function scoreArticle(text) {
  let score = 0;
  const t = text.toLowerCase();

  // “Signal strength” positives
  if (/\$\s?\d+(\.\d+)?\s?(m|mm|million|b|bb|billion)\b/.test(t)) score += 5;
  if (/\b(million|billion)\b/.test(t)) score += 2;
  if (/portfolio|platform|nationwide|across|multiple markets|expansion/.test(t)) score += 3;
  if (/debt|credit|distress|recap|bridge|refinanc|construction loan|mezz|preferred equity|cmbs/.test(t))
    score += 3;
  if (/office|industrial|retail|multifamily|storage|data center|life sciences|hospitality|hotel/.test(t))
    score += 2;
  if (/layoff|cuts|retrench|bankrupt|chapter 11|default/.test(t)) score += 3;

  // Negatives (avoid “who got hired” content)
  if (/appoints|hires|joins as|named|promoted|promotion|new ceo|new cfo|new president/.test(t))
    score -= 8;

  // Strong negative if residential
  if (/housing|home sales|mortgage rates|single-family|single family/.test(t)) score -= 20;

  return score;
}

function classify(text) {
  const t = text.toLowerCase();

  // You said later you want these combined into one section in the newsletter,
  // but it’s still useful to tag them here for sorting.
  if (/raise|fund|capital|financing|closes? (a|the) fund|fundraise|raises? \$/i.test(text)) return "capital";
  if (/expand|launch|open|new office|enters? (the|a) market|adds? (a|new) market/.test(t)) return "expansion";
  if (/surge|demand|growth|outperform|record leasing|strong momentum|tailwinds/.test(t)) return "momentum";
  if (/layoff|cuts|retrench|wind down|shut(ting)? down|bankrupt|chapter 11/.test(t)) return "contraction";

  return null;
}

function safeDate(item) {
  // rss-parser may give pubDate or isoDate
  const d = item.isoDate || item.pubDate || null;
  if (!d) return null;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toISOString();
}

async function fetchText(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      // Some feeds block “empty UA”
      "User-Agent": "HireCREBot/1.0 (+https://hirecre.com)",
      Accept: "application/rss+xml, application/atom+xml, text/xml, application/xml;q=0.9, */*;q=0.8",
    },
  });

  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

async function parseFeedWithFallbacks(source, urls) {
  for (const url of urls) {
    try {
      console.log(`Trying feed: ${source} -> ${url}`);

      const { ok, status, text } = await fetchText(url);
      if (!ok) throw new Error(`Status code ${status}`);

      if (!looksLikeFeed(text)) {
        throw new Error("Does not look like RSS/Atom (likely HTML or blocked)");
      }

      const parsed = await parser.parseString(text);
      const count = parsed?.items?.length ?? 0;

      console.log(`✅ Parsed ${count} items from ${source} (${url})`);
      return { parsed, urlUsed: url };
    } catch (e) {
      console.log(`  ❌ Failed: ${url} :: ${e?.message || e}`);
    }
  }

  console.log(`🚫 Skipping entire feed: ${source}`);
  return { parsed: null, urlUsed: null };
}

async function insertSignal(row) {
  // Prefer upsert to avoid duplicates if you have a unique constraint on source_url.
  // If you don’t have one yet, this will still insert.
  const payload = {
    headline: row.headline,
    summary: row.summary,
    category: row.category,
    score: row.score,
    source: row.source,
    source_url: row.source_url,
    published_at: row.published_at,
  };

  // Try upsert first (best practice)
  const { error: upsertError } = await supabase
    .from("market_signals")
    .upsert(payload, { onConflict: "source_url", ignoreDuplicates: true });

  if (!upsertError) return true;

  // Fallback to insert if upsert config/constraint isn’t present
  const { error: insertError } = await supabase.from("market_signals").insert(payload);
  if (insertError) return false;

  return true;
}

async function main() {
  let inserted = 0;
  let skippedFeeds = 0;

  for (const feed of FEEDS) {
    const { parsed } = await parseFeedWithFallbacks(feed.source, feed.urls);
    if (!parsed) {
      skippedFeeds++;
      continue;
    }

    const items = parsed.items || [];
    for (const item of items.slice(0, 25)) {
      const title = normalizeText(item.title);
      const snippet = normalizeText(item.contentSnippet || item.content || "");
      const link = normalizeText(item.link);

      if (!title || !link) continue;

      const text = `${title} ${snippet}`;
      if (!isProbablyCRE(text)) continue;

      const category = classify(text);
      if (!category) continue;

      const score = scoreArticle(text);
      if (score < 5) continue;

      const summary = title.replace(/\.$/, "") + ".";

      const ok = await insertSignal({
        headline: title,
        summary,
        category,
        score,
        source: feed.source,
        source_url: link,
        published_at: safeDate(item),
      });

      if (ok) inserted++;
    }
  }

  console.log(`✅ Inserted ${inserted} market signals`);
  if (skippedFeeds > 0) console.log(`⚠️ Feeds skipped: ${skippedFeeds}`);
}

main().catch((e) => {
  console.error("❌ fetch-market-signals failed:", e?.message ?? e);
  process.exit(1);
});
