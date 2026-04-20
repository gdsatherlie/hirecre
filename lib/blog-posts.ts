// Registry of blog posts. Each post has its own page at
// app/blog/[slug]/page.tsx and registers itself here so the index,
// sitemap, and related-posts rail can list it.
//
// To add a post:
//   1. Create app/blog/<slug>/page.tsx
//   2. Add its metadata to BLOG_POSTS below
//   3. Commit.

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  tag: "careers" | "interview" | "compensation" | "market" | "skills";
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-acquisitions-analysts-actually-do",
    title: "What Acquisitions Analysts Actually Do (Beyond the Model)",
    description:
      "A practitioner's walkthrough of the real work at a CRE acquisitions desk — sourcing, underwriting, IC prep, and the judgment calls that decide which deals move forward.",
    publishedAt: "2026-04-20",
    readingMinutes: 8,
    tag: "careers",
  },
  {
    slug: "breaking-into-cre-without-finance-background",
    title: "Breaking Into CRE Without a Finance Background",
    description:
      "Four realistic paths into commercial real estate if you didn't come from banking or finance — what each path actually looks like, and which underwriting skills you have to build no matter which you take.",
    publishedAt: "2026-04-20",
    readingMinutes: 9,
    tag: "careers",
  },
  {
    slug: "repe-vs-debt-fund-career-paths",
    title: "REPE vs Debt Fund: Which CRE Career Path Pays More?",
    description:
      "Private equity real estate and debt funds look similar from the outside — both sit in institutional CRE, both hire from banking. The day-to-day, the exit paths, and the comp structures differ meaningfully. Here's how they compare.",
    publishedAt: "2026-04-20",
    readingMinutes: 10,
    tag: "compensation",
  },
  {
    slug: "2026-cre-hiring-market-report",
    title: "The 2026 CRE Hiring Market: What HireCRE Is Seeing",
    description:
      "Data from 1,451 active commercial real estate roles aggregated from company career sites: where companies are hiring, which roles dominate, how often pay is disclosed, and what the patterns say about the market.",
    publishedAt: "2026-04-20",
    readingMinutes: 7,
    tag: "market",
  },
  {
    slug: "negotiating-cre-compensation",
    title: "Negotiating CRE Compensation: Base, Bonus, and Carry",
    description:
      "CRE comp is a three-component package at the institutional seats and a two-component at the operational seats. What each piece actually means, how to compare offers, and where the leverage is when negotiating.",
    publishedAt: "2026-04-20",
    readingMinutes: 11,
    tag: "compensation",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return [];
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const sameTag = (p: BlogPost) => (p.tag === current.tag ? 0 : 1);
      return sameTag(a) - sameTag(b);
    })
    .slice(0, limit);
}
