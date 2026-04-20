import type { Metadata } from "next";

// The board page is a client component (needs interactivity for filters,
// paging, search) and can't export metadata directly. This layout
// provides the canonical URL and OG tags, and also strips query-param
// duplicates from Google's index.
export const metadata: Metadata = {
  title: "Commercial Real Estate Jobs | HireCRE",
  description:
    "Browse commercial real estate and proptech jobs. Filter by company, state, source, remote, and pay. Updated every 6 hours from Greenhouse, Lever, and iCIMS.",
  alternates: { canonical: "/board" },
  openGraph: {
    title: "Commercial Real Estate Jobs | HireCRE",
    description:
      "Browse commercial real estate and proptech jobs. Filter by company, state, source, remote, and pay.",
    url: "https://hirecre.com/board",
    type: "website",
  },
};

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
