import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const parser = new Parser();

// --- RSS FEEDS (CRE ONLY) ---
const FEEDS = [
  { source: "Bisnow", url: "https://www.bisnow.com/rss" },
  { source: "Commercial Observer", url: "https://commercialobserver.com/feed/" },
  { source: "GlobeSt", url: "https://www.globest.com/feed/" }
];

// --- helpers ---
function scoreArticle(text) {
  let score = 0;
  const t = text.toLowerCase();

  if (/\$\d+|\bmillion\b|\bbillion\b/.test(t)) score += 4;
  if (/portfolio|multiple|nationwide|across/.test(t)) score += 3;
  if (/debt|credit|distress|recap|bridge/.test(t)) score += 3;
  if (/office|industrial|retail|multifamily|storage|data center/.test(t)) score += 2;

  if (/appoints|hires|joins as/.test(t)) score -= 6;
  if (/housing|home sales|mortgage rates/.test(t)) score -= 10;

  return score;
}

function classify(text) {
  const t = text.toLowerCase();

  if (/raise|fund|capital|financing|close/.test(t)) return "capital";
  if (/expand|launch|open|new office/.test(t)) return "expansion";
  if (/surge|demand|growth|outperform/.test(t)) return "momentum";
  if (/layoff|cuts|retrench|wind down/.test(t)) return "contraction";

  return null;
}

async function main() {
  let inserted = 0;

  for (const feed of FEEDS) {
    const parsed = await parser.parseURL(feed.url);

    for (const item of parsed.items.slice(0, 20)) {
      const text = `${item.title} ${item.contentSnippet || ""}`;
      const category = classify(text);
      if (!category) continue;

      const score = scoreArticle(text);
      if (score < 5) continue;

      const summary = item.title
        .replace(/\.$/, "") + ".";

      const { error } = await supabase.from("market_signals").insert({
        headline: item.title,
        summary,
        category,
        score,
        source: feed.source,
        source_url: item.link,
        published_at: item.pubDate
      });

      if (!error) inserted++;
    }
  }

  console.log(`✅ Inserted ${inserted} market signals`);
}

main().catch((e) => {
  console.error("❌ fetch-market-signals failed:", e);
  process.exit(1);
});
