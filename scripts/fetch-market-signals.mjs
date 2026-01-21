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

// rss-parser can choke on some feeds if they return weird HTML.
// customFields helps, and headers sometimes reduce 403s.
const parser = new Parser({
  timeout: 20000,
  headers: {
    "User-Agent": "HireCREBot/1.0 (+https://hirecre.com)",
    Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.7",
  },
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
      ["dc:creator", "creator"],
    ],
  },
});

// --- RSS FEEDS (macro-ish CRE sources; keep expanding) ---
const SOURCES = [
  { source: "Moody's CRE", urls: ["https://www.moodyscre.com/insights-and-research/feed/"] },
  { source: "Commercial Observer", urls: ["https://commercialobserver.com/feed/"] },
  { source: "REjournals", urls: ["https://rejournals.com/feed/"] },
  { source: "Bisnow", urls: ["https://www.bisnow.com/rss"] },
  { source: "ConnectCRE", urls: ["https://www.connectcre.com/feed/"] },
];

// ---------- Helpers: CRE-only gating + noise filtering ----------

function norm(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

function toText(item) {
  const title = norm(item.title);
  const snippet = norm(item.contentSnippet || item.summary || "");
  const content = norm(item.contentEncoded || "");
  return `${title} ${snippet} ${content}`.slice(0, 10000);
}

function looksLikeCommercialRealEstate(text) {
  const t = text.toLowerCase();

  // HARD EXCLUDES: residential / mortgages / homebuyer / etc.
  const hardBad = [
    "mortgage rate",
    "mortgage rates",
    "home sales",
    "housing market",
    "single-family",
    "single family",
    "homebuilder",
    "zillow",
    "realtor.com",
    "first-time home",
    "refinance rate",
    "fha",
    "va loan",
  ];
  if (hardBad.some((k) => t.includes(k))) return false;

  // HARD EXCLUDES: generic politics / non-CRE business unless CRE is present
  const genericNonCre = [
    "crypto",
    "bitcoin",
    "tesla",
    "ai stock",
    "apple earnings",
    "super bowl",
  ];
  // don't immediately reject; just needs CRE terms too
  const creTerms = [
    "commercial real estate",
    "cre ",
    "office",
    "industrial",
    "multifamily",
    "apartment",
    "retail",
    "hotel",
    "lodging",
    "self-storage",
    "self storage",
    "data center",
    "datacenter",
    "warehouse",
    "logistics",
    "cap rate",
    "leasing",
    "rent",
    "vacancy",
    "absorption",
    "net operating income",
    "noi",
    "tenant",
    "landlord",
    "development",
    "construction",
    "zoning",
    "entitlements",
    "cmbs",
    "maturity",
    "refinancing",
    "distress",
    "default",
    "workout",
  ];

  const hasCRE = creTerms.some((k) => t.includes(k));
  if (!hasCRE) return false;

  // if it's generic business/politics, require stronger CRE presence
  if (genericNonCre.some((k) => t.includes(k))) {
    const strongCreTerms = ["cap rate", "vacancy", "leasing", "cmbs", "maturity", "distress", "refinancing"];
    if (!strongCreTerms.some((k) => t.includes(k))) return false;
  }

  return true;
}

// “Deal blotter” = one-off transactions (noise) unless it clearly ties to a macro theme
function looksLikeDealBlotter(text) {
  const t = text.toLowerCase();

  const dealWords = [
    "provides $",
    "provides a $",
    "lands $",
    "secures $",
    "scores $",
    "closes $",
    "refi",
    "refinancing for",
    "construction loan for",
    "acquires",
    "buys",
    "sells",
    "sale of",
    "purchased",
    "transaction",
    "deal closes",
    "financing for",
  ];

  const hasDollar = /\$\s?\d/.test(t) || /\b\d+(\.\d+)?\s?(m|mm|million|b|bn|billion)\b/.test(t);

  // If it’s “$X for Y property” it’s usually blotter
  if (hasDollar && dealWords.some((w) => t.includes(w))) return true;

  // Also block pure “loan to borrower/property” patterns
  const propertySpecific = [
    " at ",
    " for ",
    " on ",
  ];
  if (hasDollar && propertySpecific.some((w) => t.includes(w)) && t.includes("loan")) return true;

  return false;
}

// identify “macro” / “trend” / “research” style
function looksMacro(text) {
  const t = text.toLowerCase();
  const macroSignals = [
    "report:",
    "report",
    "index",
    "survey",
    "outlook",
    "forecast",
    "trend",
    "headwinds",
    "tailwinds",
    "cap rates",
    "vacancy",
    "absorption",
    "rent growth",
    "leasing",
    "pipeline",
    "construction starts",
    "delinquenc",
    "maturity wave",
    "distress",
    "defaults",
    "workouts",
    "restructur",
    "higher-for-longer",
    "rates",
    "fed",
  ];
  return macroSignals.some((k) => t.includes(k));
}

// Map to your “signal_type” column.
// You wanted expansions/capital/momentum/layoffs combined later in newsletter,
// but here we still tag them for sorting.
function classifySignalType(text) {
  const t = text.toLowerCase();

  if (/layoff|cuts|retrench|wind down|bankruptcy|default|distress|delinquen|special servicing/.test(t)) {
    return "contraction";
  }
  if (/raise|fund|capital|financing|debt|credit|refinanc|cmbs|maturity|loan/.test(t)) {
    return "capital";
  }
  if (/expand|expansion|launch|open|new office|hiring surge|headcount growth/.test(t)) {
    return "expansion";
  }
  if (/momentum|surge|demand|growth|outperform|rebound|stabiliz|tightening vacancy/.test(t)) {
    return "momentum";
  }
  if (looksMacro(text)) return "macro";

  // If it’s CRE but not clearly typed, still allow “macro” bucket (safer for your combined section)
  return "macro";
}

// Score: macro-heavy, CRE-only, downweight deals
function scoreItem(text) {
  const t = text.toLowerCase();
  let score = 0;

  // Macro/research boosters
  if (looksMacro(text)) score += 8;
  if (/report|index|survey|outlook|forecast/.test(t)) score += 6;

  // CRE asset class mentions (good signal)
  if (/office|industrial|multifamily|apartments|retail|hotel|self-storage|data center|warehouse|logistics/.test(t)) score += 3;

  // Market metrics (good)
  if (/cap rate|vacancy|absorption|rent growth|leasing|delinquenc|special servicing|maturity/.test(t)) score += 6;

  // Capital markets but CRE-specific
  if (/cmbs|bridge loan|construction loan|refinanc|workout|restructur/.test(t)) score += 4;

  // Penalize “deal blotter”
  const blotter = looksLikeDealBlotter(text);
  if (blotter) score -= 10;

  // Penalize “people news”
  if (/appoints|hires|joins as|named|promoted|chief (executive|financial|operating) officer|ceo|cfo|coo/.test(t)) score -= 8;

  // Penalize generic finance / non-CRE
  if (/stock|earnings|crypto|consumer spending|gdp/.test(t)) score -= 4;

  return score;
}

function bestDate(item) {
  // rss feeds vary; normalize to ISO if possible.
  const raw = item.isoDate || item.pubDate || item.published || item.updated;
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

async function upsertMarketSignal(row) {
  // Prefer using source_url unique index if you created it.
  // If you didn't, this still works but may insert duplicates unless table constraints exist.
  const { error } = await supabase
    .from("market_signals")
    .upsert(row, { onConflict: "source_url" });

  return error;
}

async function parseAny(url) {
  return await parser.parseURL(url);
}

async function main() {
  let inserted = 0;
  const skippedSources = [];

  for (const src of SOURCES) {
    let parsed = null;

    for (const url of src.urls) {
      try {
        console.log(`Trying feed: ${src.source} -> ${url}`);
        parsed = await parseAny(url);
        console.log(`✅ Parsed ${parsed.items?.length ?? 0} items from ${src.source} (${url})`);
        break;
      } catch (e) {
        console.log(`  ❌ Failed: ${url} :: ${e?.message || e}`);
      }
    }

    if (!parsed) {
      console.log(`🚫 Skipping entire source: ${src.source}`);
      skippedSources.push(src.source);
      continue;
    }

    // Evaluate candidates
    const candidates = [];
    for (const item of (parsed.items || []).slice(0, 30)) {
      const title = norm(item.title);
      const link = norm(item.link);

      if (!title || !link) continue;

      const text = toText(item);

      // hard CRE gate
      const creOk = looksLikeCommercialRealEstate(text);
      if (!creOk) {
        if (DEBUG) console.log(`- [${src.source}] ${title}\n  => NOT_CRE`);
        continue;
      }

      const signal_type = classifySignalType(text);
      const score = scoreItem(text);

      // Eligibility: must be “macro enough”
      // - baseline threshold
      // - allow deal blotter only if it scores VERY high (rare)
      const blotter = looksLikeDealBlotter(text);

      let newsletter_eligible = false;
      if (score >= 12) newsletter_eligible = true;
      if (blotter && score < 16) newsletter_eligible = false; // strong block for one-off deals

      // Save candidates for debug + inserting
      candidates.push({
        title,
        source: src.source,
        source_url: link,
        signal_type,
        score,
        summary: norm(item.contentSnippet || item.summary || "").slice(0, 280) || null,
        published_at: bestDate(item),
        newsletter_eligible,
        _debug: { blotter },
      });
    }

    // Debug top items
    if (DEBUG) {
      const top = [...candidates].sort((a, b) => b.score - a.score).slice(0, 3);
      console.log(`Top candidates for ${src.source}:`);
      for (const t of top) {
        console.log(
          `  score=${t.score} type=${t.signal_type} eligible=${t.newsletter_eligible} blotter=${t._debug.blotter} :: ${t.title}`
        );
      }
    }

    // Insert only eligibles (and only up to 20 per source to avoid spam)
    const toInsert = candidates
      .filter((c) => c.newsletter_eligible)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    for (const row of toInsert) {
      const { _debug, ...dbRow } = row;

      const error = await upsertMarketSignal(dbRow);
      if (error) {
        if (DEBUG) console.log(`  upsert error for ${row.source_url}: ${error.message}`);
        continue;
      }
      inserted++;
    }
  }

  console.log(`✅ Inserted/Upserted ${inserted} market signals`);
  if (skippedSources.length) console.log(`⚠️ Sources skipped: ${skippedSources.join(", ")}`);
}

main().catch((e) => {
  console.error("❌ fetch-market-signals failed:", e?.message ?? e);
  process.exit(1);
});
