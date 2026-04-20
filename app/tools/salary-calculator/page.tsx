import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculatorClient from "./SalaryCalculatorClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

export const metadata: Metadata = {
  title: "CRE Salary Calculator 2026 | HireCRE",
  description:
    "Estimate 2026 commercial real estate total compensation by role, seat type, years of experience, and geography. Covers base, target bonus, and expected carry for institutional seats.",
  alternates: { canonical: "/tools/salary-calculator" },
  openGraph: {
    title: "CRE Salary Calculator 2026 | HireCRE",
    description:
      "Free tool for estimating 2026 CRE base, bonus, and carry by role + seat + geography.",
    url: `${SITE_URL}/tools/salary-calculator`,
    type: "website",
  },
};

export default function SalaryCalculatorPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CRE Salary Calculator",
        item: `${SITE_URL}/tools/salary-calculator`,
      },
    ],
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">CRE Salary Calculator</span>
        </nav>

        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            CRE Salary Calculator (2026)
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Estimate 2026 commercial real estate total compensation — base,
            target bonus, and expected carry — for common CRE seats, adjusted
            for geography and years of experience.
          </p>
        </header>

        <div className="mt-8">
          <SalaryCalculatorClient />
        </div>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            About this calculator
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
            <p>
              The HireCRE Salary Calculator is a free tool built to help CRE
              job-seekers contextualize offers. The model estimates base,
              target bonus, and (for REPE and debt-fund seats) annual
              expected value of carry, based on 2026 market bands.
            </p>
            <p>
              Inputs: role level (Analyst → Principal), seat type (REPE, debt
              fund, bank CRE credit, brokerage, REIT/corporate, asset
              management, development), US state, and years of CRE
              experience. Base is scaled by a geography multiplier (NY/CA
              +15%, major metros baseline, secondary markets −15%). Years
              of experience nudges base up by up to 10% if you&apos;re above
              the role&apos;s typical experience floor.
            </p>
            <p>
              Carry estimates are annual expected value only, and only apply
              to REPE and debt fund seats once carry has vested (typically
              senior associate and above). At the junior levels,
              carry-equivalent is usually folded into the bonus rather than
              paid separately.
            </p>
            <p>
              This is a rough framework, not a benchmark dataset. Actual
              offers vary widely. Pair it with our{" "}
              <Link
                href="/commercial-real-estate-salary-guide"
                className="font-semibold text-blue-700 hover:underline"
              >
                CRE salary guide
              </Link>{" "}
              and{" "}
              <Link
                href="/blog/negotiating-cre-compensation"
                className="font-semibold text-blue-700 hover:underline"
              >
                negotiation guide
              </Link>{" "}
              for context on how to interpret and push on each component.
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/board"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:bg-gray-50"
          >
            <div className="text-sm font-semibold text-gray-900">
              Browse CRE jobs
            </div>
            <div className="mt-1 text-sm text-gray-600">
              See active roles with real disclosed pay ranges on HireCRE.
            </div>
          </Link>
          <Link
            href="/interview-prep"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:bg-gray-50"
          >
            <div className="text-sm font-semibold text-gray-900">
              Interview Prep
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Prep concepts and question banks for CRE acquisitions, credit,
              and capital markets interviews.
            </div>
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </div>
  );
}
