import type { MetadataRoute } from "next";

const SITE_URL = "https://hirecre.com";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_PAGES: Entry[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },

  // Core
  { path: "/jobs", changeFrequency: "hourly", priority: 1.0 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.7 },

  // Interview hub + sitemap
  { path: "/interview-prep", changeFrequency: "weekly", priority: 0.9 },
  { path: "/interview-prep/sitemap", changeFrequency: "weekly", priority: 0.8 },

  // Debt & credit
  { path: "/interview-prep/bridge-lending-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/dscr-vs-debt-yield", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/loan-to-cost-ltc", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/debt-yield-explained", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/underwriting-walkthrough", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/sponsor-risk-analysis", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/exit-underwriting", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/risk-and-structure", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/loan-sizing-cheat-sheet", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/broker-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/credit-memo-template", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/common-mistakes", changeFrequency: "monthly", priority: 0.6 },

  // Equity
  { path: "/interview-prep/repe-interview-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/equity-returns-101", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/equity-waterfall-basics", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/preferred-return", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/promote-structure", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/cap-rate-explained", changeFrequency: "monthly", priority: 0.7 },

  // Acquisitions / AM
  { path: "/interview-prep/acquisitions-interview-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/asset-management-interview-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/rent-roll-t12-deep-dive", changeFrequency: "monthly", priority: 0.7 },

  // Development
  { path: "/interview-prep/development-interview-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/construction-budget-101", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/development-returns-yoc", changeFrequency: "monthly", priority: 0.7 },

  // Leasing / Brokerage / Ops
  { path: "/interview-prep/leasing-interview-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/brokerage-interview-questions", changeFrequency: "monthly", priority: 0.7 },
  { path: "/interview-prep/property-management-interview-questions", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
