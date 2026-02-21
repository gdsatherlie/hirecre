import type { Metadata } from "next";
import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Commercial Real Estate Jobs & Career Resources | HireCRE",
  description:
    "Browse commercial real estate jobs across acquisitions, asset management, development, lending, and proptech. HireCRE is a curated CRE job board and career resource hub built for serious operators.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Commercial Real Estate Jobs & Career Resources | HireCRE",
    description:
      "A curated commercial real estate job board plus interview prep and career resources for CRE professionals.",
    url: "https://hirecre.com",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Commercial Real Estate Jobs & Career Resources | HireCRE",
    description:
      "Curated CRE jobs + interview prep + career resources for commercial real estate professionals.",
  },
};

export default function HomePage() {
  const faqs = [
    {
      q: "What is HireCRE?",
      a: "HireCRE is a curated commercial real estate job board and career resource hub. We organize CRE and proptech roles into a clean, searchable feed and publish interview prep and underwriting explainers built for institutional workflows.",
    },
    {
      q: "What types of commercial real estate jobs are on HireCRE?",
      a: "Roles commonly include acquisitions, asset management, development, lending/credit, capital markets, brokerage, research, and proptech—across multiple markets and experience levels.",
    },
    {
      q: "Is HireCRE only for job listings?",
      a: "No. In addition to the job feed, HireCRE includes interview prep and concept pages (e.g., DSCR, debt yield, cap rates, waterfalls) so candidates can learn how to explain the fundamentals clearly in interviews.",
    },
    {
      q: "How do job alerts work?",
      a: "You can sign up to receive job alerts and updates. Alerts are designed to surface relevant roles and resources without overwhelming your inbox.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-[calc(100vh-120px)] bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Hero */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Commercial real estate jobs — curated for serious operators
            </h1>

            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              HireCRE is a commercial real estate job board and career platform.
              We curate roles across acquisitions, asset management, development,
              lending, capital markets, and proptech — then organize them in a way
              that actually helps you evaluate opportunities faster.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/board"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse jobs
              </Link>

              <Link
                href="/login?signup=1"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Create account
              </Link>

              <Link
                href="/interview-prep"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Interview prep
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-sm font-semibold text-gray-900">Focused filters</div>
                <div className="mt-1 text-sm text-gray-600">
                  Company, market, role type, experience level, and remote-only.
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-sm font-semibold text-gray-900">Built for CRE roles</div>
                <div className="mt-1 text-sm text-gray-600">
                  Acquisitions, asset management, development, lending, capital markets, brokerage, and proptech.
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-sm font-semibold text-gray-900">Career resources</div>
                <div className="mt-1 text-sm text-gray-600">
                  Interview prep, underwriting concepts, and practical explainers.
                </div>
              </div>
            </div>
          </div>

          {/* Email signup */}
          <div className="mt-8">
            <EmailSignup source="home" />
          </div>

          {/* Popular roles (light SEO coverage, not spammy) */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Popular CRE job categories</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Common searches across HireCRE. Use these as starting points when you’re exploring the market.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Acquisitions",
                "Asset Management",
                "Development",
                "Debt / Credit",
                "Capital Markets",
                "Investment Sales",
                "Property Management",
                "Research",
                "PropTech",
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Popular resources (internal links) */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Popular interview prep resources</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Institutional explainers written for interviews — concise, precise, and built around real underwriting language.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link
                href="/interview-prep/dscr-vs-debt-yield"
                className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">DSCR vs Debt Yield (With Example)</div>
                <div className="mt-1 text-sm text-gray-600">
                  When each metric binds and how to explain it cleanly in interviews.
                </div>
              </Link>

              <Link
                href="/interview-prep/loan-to-cost-ltc"
                className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">Loan-to-Cost (LTC) (With Example)</div>
                <div className="mt-1 text-sm text-gray-600">
                  Purchase + renovation LTC math, LTC vs LTV, and why lenders care.
                </div>
              </Link>

              <Link
                href="/interview-prep/cap-rate-explained"
                className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">Cap Rate Explained (With Example)</div>
                <div className="mt-1 text-sm text-gray-600">
                  Value sensitivity, compression vs expansion, and interview framing.
                </div>
              </Link>
            </div>

            <div className="mt-5">
              <Link href="/interview-prep" className="text-sm font-semibold text-blue-700 hover:underline">
                View the Interview Prep Hub →
              </Link>
            </div>
          </div>

          {/* Positioning */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">More than a job board</h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              HireCRE is designed to be a centralized resource for commercial real estate careers — not just a feed of listings.
              In addition to curated job opportunities, we publish interview preparation guides, underwriting breakdowns,
              and concept explainers that help you think and speak like an institutional operator.
            </p>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Whether you’re targeting acquisitions roles, private equity, debt funds, mortgage REITs, development shops,
              or brokerage platforms, HireCRE gives you both the opportunities and the context to compete.
            </p>
          </div>

          {/* FAQ (on-page) */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>

            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="rounded-xl border border-gray-200 bg-white p-5">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
