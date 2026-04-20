import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

export const metadata: Metadata = {
  title: "Free CRE Tools | HireCRE",
  description:
    "Free commercial real estate career tools — salary calculator, interview prep hub, and resources for CRE job-seekers.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free CRE Tools | HireCRE",
    description: "Free tools for CRE job-seekers.",
    url: `${SITE_URL}/tools`,
    type: "website",
  },
};

export default function ToolsIndex() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Tools</span>
        </nav>

        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Free CRE tools
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            A growing library of free tools built for commercial real estate
            job-seekers. Use them, share them, link to them.
          </p>
        </header>

        <div className="mt-10 grid gap-5">
          <Link
            href="/tools/salary-calculator"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:bg-gray-50"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Compensation
            </div>
            <div className="mt-2 text-xl font-semibold text-gray-900">
              CRE Salary Calculator (2026)
            </div>
            <div className="mt-2 text-sm text-gray-700">
              Estimate 2026 CRE total compensation — base, target bonus, and
              expected annual carry — by role, seat type, years of
              experience, and geography. Covers REPE, debt funds, bank
              credit, brokerage, REITs, asset management, and development.
            </div>
          </Link>

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
            More tools coming — interview question generator, deal sizing
            calculator, CRE career path explorer.
          </div>
        </div>
      </div>
    </div>
  );
}
