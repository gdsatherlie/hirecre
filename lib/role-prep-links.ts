// Maps job-title keywords to interview-prep pages on HireCRE.
//
// Used by app/jobs/[slug]/page.tsx to show a curated "Preparing for
// this role?" section tailored to the job title. Turns each of the
// ~1,450 active job pages from pure scraped content into a page with
// original editorial cross-links, which both helps users and
// materially improves the site's content-depth signal to AdSense.

export type PrepLink = {
  title: string;
  href: string;
  note?: string;
};

type Matcher = {
  /** Case-insensitive substring patterns in the job title. */
  keywords: string[];
  /** Ordered by priority — most relevant first. */
  links: PrepLink[];
};

const MATCHERS: Matcher[] = [
  {
    keywords: ["acquisition"],
    links: [
      {
        title: "Acquisitions Interview Questions",
        href: "/interview-prep/acquisitions-interview-questions",
        note: "The 5-part answer structure and technical questions asked at REPE shops.",
      },
      {
        title: "Walk Me Through Your Underwriting",
        href: "/interview-prep/underwriting-walkthrough",
      },
      {
        title: "What Acquisitions Analysts Actually Do",
        href: "/blog/what-acquisitions-analysts-actually-do",
      },
      {
        title: "DSCR vs Debt Yield",
        href: "/interview-prep/dscr-vs-debt-yield",
      },
    ],
  },
  {
    keywords: ["asset manage", "asset manager"],
    links: [
      {
        title: "Asset Management Interview Questions",
        href: "/interview-prep/asset-management-interview-questions",
      },
      {
        title: "Rent Roll + T-12 Deep Dive",
        href: "/interview-prep/rent-roll-t12-deep-dive",
      },
      {
        title: "Cap Rate Explained",
        href: "/interview-prep/cap-rate-explained",
      },
    ],
  },
  {
    keywords: ["development", "developer", "construction"],
    links: [
      {
        title: "Development Interview Questions",
        href: "/interview-prep/development-interview-questions",
      },
      {
        title: "Construction Budget 101",
        href: "/interview-prep/construction-budget-101",
      },
      {
        title: "Development Returns (Yield on Cost)",
        href: "/interview-prep/development-returns-yoc",
      },
      {
        title: "Loan-to-Cost (LTC)",
        href: "/interview-prep/loan-to-cost-ltc",
      },
    ],
  },
  {
    keywords: ["credit", "underwrit", "loan officer", "originations", "bridge"],
    links: [
      {
        title: "Bridge Lending Interview Questions",
        href: "/interview-prep/bridge-lending-questions",
      },
      {
        title: "DSCR vs Debt Yield",
        href: "/interview-prep/dscr-vs-debt-yield",
      },
      {
        title: "Loan Sizing Cheat Sheet",
        href: "/interview-prep/loan-sizing-cheat-sheet",
      },
      {
        title: "Credit Memo Template",
        href: "/interview-prep/credit-memo-template",
      },
    ],
  },
  {
    keywords: ["leasing"],
    links: [
      {
        title: "Leasing Interview Questions",
        href: "/interview-prep/leasing-interview-questions",
      },
      {
        title: "Rent Roll + T-12 Deep Dive",
        href: "/interview-prep/rent-roll-t12-deep-dive",
      },
    ],
  },
  {
    keywords: ["broker", "capital markets", "investment sales"],
    links: [
      {
        title: "Brokerage Interview Questions",
        href: "/interview-prep/brokerage-interview-questions",
      },
      {
        title: "Cap Rate Explained",
        href: "/interview-prep/cap-rate-explained",
      },
      {
        title: "DSCR vs Debt Yield",
        href: "/interview-prep/dscr-vs-debt-yield",
      },
      {
        title: "Explain IRR in an Interview",
        href: "/interview-prep/explain-irr-interview",
      },
    ],
  },
  {
    keywords: ["property manage", "property manager"],
    links: [
      {
        title: "Property Management Interview Questions",
        href: "/interview-prep/property-management-interview-questions",
      },
      {
        title: "Rent Roll + T-12 Deep Dive",
        href: "/interview-prep/rent-roll-t12-deep-dive",
      },
    ],
  },
  {
    keywords: ["repe", "real estate private equity"],
    links: [
      {
        title: "REPE Interview Questions",
        href: "/interview-prep/repe-interview-questions",
      },
      {
        title: "REPE vs Debt Fund: Career Path",
        href: "/blog/repe-vs-debt-fund-career-paths",
      },
      {
        title: "Equity Waterfall Basics",
        href: "/interview-prep/equity-waterfall-basics",
      },
      {
        title: "Promote Structure",
        href: "/interview-prep/promote-structure",
      },
    ],
  },
  {
    keywords: ["analyst"],
    links: [
      {
        title: "Walk Me Through Your Underwriting",
        href: "/interview-prep/underwriting-walkthrough",
      },
      {
        title: "DSCR vs Debt Yield",
        href: "/interview-prep/dscr-vs-debt-yield",
      },
      {
        title: "Cap Rate Explained",
        href: "/interview-prep/cap-rate-explained",
      },
      {
        title: "Explain IRR in an Interview",
        href: "/interview-prep/explain-irr-interview",
      },
    ],
  },
  {
    keywords: ["associate"],
    links: [
      {
        title: "Walk Me Through Your Underwriting",
        href: "/interview-prep/underwriting-walkthrough",
      },
      {
        title: "Equity Waterfall Basics",
        href: "/interview-prep/equity-waterfall-basics",
      },
      {
        title: "DSCR vs Debt Yield",
        href: "/interview-prep/dscr-vs-debt-yield",
      },
    ],
  },
];

// Fallback when no keyword matches. Keeps every job page showing some
// editorial content.
const FALLBACK_LINKS: PrepLink[] = [
  {
    title: "Interview Prep Hub",
    href: "/interview-prep",
  },
  {
    title: "CRE Career Guide",
    href: "/commercial-real-estate-career-guide",
  },
  {
    title: "CRE Salary Calculator",
    href: "/tools/salary-calculator",
  },
  {
    title: "Negotiating CRE Compensation",
    href: "/blog/negotiating-cre-compensation",
  },
];

/**
 * Pick up to `limit` prep links matching a job title. Falls back to a
 * generic set if no keyword matches. De-dupes across multiple matching
 * buckets so (e.g.) an "acquisitions analyst" role doesn't show DSCR
 * twice.
 */
export function pickPrepLinks(
  jobTitle: string | null | undefined,
  limit = 4
): PrepLink[] {
  const t = (jobTitle || "").toLowerCase();
  if (!t) return FALLBACK_LINKS.slice(0, limit);

  const seen = new Set<string>();
  const out: PrepLink[] = [];

  for (const m of MATCHERS) {
    if (!m.keywords.some((kw) => t.includes(kw))) continue;
    for (const link of m.links) {
      if (seen.has(link.href)) continue;
      seen.add(link.href);
      out.push(link);
      if (out.length >= limit) return out;
    }
  }

  // Nothing matched — fall back.
  if (out.length === 0) return FALLBACK_LINKS.slice(0, limit);

  // Pad with fallback if we have some matches but not enough.
  for (const link of FALLBACK_LINKS) {
    if (out.length >= limit) break;
    if (seen.has(link.href)) continue;
    out.push(link);
  }
  return out;
}
