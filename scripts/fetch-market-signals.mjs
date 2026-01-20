import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const parser = new Parser({ timeout: 20000 });

const FEEDS = [
  { source: "Bisnow", urls: ["https://www.bisnow.com/rss"] },
  { source: "Commercial Observer", urls: ["https://commercialobserver.com/feed/"] },
];

const DEBUG = process.env.DEBUG === "1";
const DEBUG_MAX_PER_FEED = Number(process.env.DEBUG_MAX_PER_FEED || "10");

function normalizeText(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function looksLikeFeed(xmlText) {
  const t = (xmlText || "").slice(0, 2000).toLowerCase();
  return t.includes("<rss") || t.includes("<feed") || t.includes("<rdf:rdf");
}

function isProbablyCRE(text) {
  const t = text.toLowerCase();

  // hard excludes
  if (/home sales|single-family|single family|mortgage rate|housing market|realtor\.com|zillow|redfin|mls\b|condo sales/.test(t)) {
    return false;
  }

  // anchors
  return /commercial real estate|\bcre\b|multifamily|industrial|office|retail|self-storage|self storage|data center|life sciences|hotel|hospitality|leasing|tenant|landlord|cap rate|noi|ground lease|construction loan|bridge loan|mezz|preferred equity|recapital|distress|foreclosure|cmbs|refinanc|acquisition|development|pipeline|sublease/.test(
    t
  );
}

function scoreArticle(text) {
  let score = 0;
  const t = text.toLowerCase();

  if (/\$\s?\d+(\.\d+)?\s?(m|mm|million|b|bb|billion)\b/.test(t)) score += 5;
  if (/\b(million|billion)\b/.test(t)) score += 2;
  if (/portfolio|platform|nationwide|across|multiple markets|expansion|opens? (in|at)|new location/.test(t)) score += 3;
  if (/debt|credit|distress|recap|bridge|refinanc|construction loan|mezz|preferred equity|cmbs|lender|loan/.test(t)) score += 3;
  if (/office|industrial|retail|multifamily|storage|data center|life sciences|hospitality|hotel/.test(t)) score += 2;
  if (/layoff|cuts|retrench|bankrupt|chapter 11|default/.test(t)) score += 3;

  // hiring/personnel negatives
  if (/appoints|hires|joins as|named|promoted|promotion|new ceo|new cfo|new president/.test(t)) score -= 8;

  // residential negative
  if (/housing|home sales|mortgage rates|single-family|single family/.test(t)) score -= 20;

  return score;
}

function classify(text) {
  const t = text.toLowerCase();

  // broadened patterns (this is probably why you got 0)
  if (/raise|raises|fund|fundraise|capital|financing|financed|funding|investment|secures|secured|closes? on|closes? a|closes? the|debt facility|credit facility/.test(t))
    return "capital";

  if (/expand|expands|expansion|launch|launches|open|opens|opening|new office|enters? (a|the) market|adds? (a|new) market|relocat|headquarters|hq/.test(t))
    return "expansion";

  if (/surge|demand|growth|outperform|record leasing|momentum|tailwinds|occupancy|rent growth|absorption/.test(t))
    return "momentum";

  if (/layoff|layoffs|cuts|retrench|wind down|shut(ting)? down|bankrupt|chapter 11|default|foreclosure/.test(t))
    return "contraction";

  return null;
}

function safeDate(item) {
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

      if (!looksLikeFeed(text)) throw new Error("Does not look like RSS/Atom (likely HTML or blocked)");

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
  const payload = {
    headline: row.headline,
    summary: row.summary,
    category: row.category,
    score: row.score,
    source: row.source,
    source_url: row.source_url,
    published_at: row.published_at,
  };

  const { error: upsertError } = await supabase
    .from("market_signals")
    .upsert(payload, { onConflict: "source_url", ignoreDuplicates: true });

  if (!upsertError) return true;

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
    const debugCount = DEBUG ? Math.min(DEBUG_MAX_PER_FEED, items.length) : 0;

    // collect candidates for quick visibility
    const candidates = [];

    for (const item of items.slice(0, 30)) {
      const title = normalizeText(item.title);
      const snippet = normalizeText(item.contentSnippet || item.content || "");
      const link = normalizeText(item.link);

      if (!title || !link) continue;

      const text = `${title} ${snippet}`;
      const creOk = isProbablyCRE(text);
      const category = classify(text);
      const score = scoreArticle(text);

      candidates.push({ title, category, score, creOk, link });

      // DEBUG: print first N items with why they fail
      if (DEBUG && candidates.length <= debugCount) {
        const reasons = [];
        if (!creOk) reasons.push("NOT_CRE");
        if (!category) reasons.push("NO_CATEGORY_MATCH");
        if (score < 5) reasons.push(`LOW_SCORE(${score})`);
        if (reasons.length === 0) reasons.push("WOULD_INSERT");
        console.log(`- [${feed.source}] ${title}`);
        console.log(`  category=${category} score=${score} creOk=${creOk} => ${reasons.join(", ")}`);
      }

      // actual insert rules
      if (!creOk) continue;
      if (!category) continue;
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

    if (DEBUG) {
      console.log(`\nTop 5 candidates by score for ${feed.source}:`);
      candidates
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 5)
        .forEach((c) => {
          console.log(`  score=${c.score} category=${c.category} creOk=${c.creOk} :: ${c.title}`);
        });
      console.log("");
    }
  }

  console.log(`✅ Inserted ${inserted} market signals`);
  if (skippedFeeds > 0) console.log(`⚠️ Feeds skipped: ${skippedFeeds}`);
}

main().catch((e) => {
  console.error("❌ fetch-market-signals failed:", e?.message ?? e);
  process.exit(1);
});
