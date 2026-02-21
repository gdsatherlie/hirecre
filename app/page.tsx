import type { Metadata } from "next";
import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Commercial Real Estate Jobs & Career Resources | HireCRE",
  description:
    "Browse commercial real estate jobs across acquisitions, asset management, development, lending, and proptech. HireCRE is a curated CRE job board plus interview prep and underwriting resources.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Commercial Real Estate Jobs & Career Resources | HireCRE",
    description:
      "A curated commercial real estate job board plus interview prep and underwriting resources for CRE professionals.",
    url: "https://hirecre.com",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Commercial Real Estate Jobs & Career Resources | HireCRE",
    description:
      "Curated CRE jobs + interview prep + underwriting resources for commercial real estate professionals.",
  },
};

export default function HomePage() {
  const faqs = [
    {
      q: "What is HireCRE?",
      a: "HireCRE is a commercial real estate job board and career resource hub. We organize CRE and proptech roles into a clean, searchable feed and publish interview prep and underwriting explainers built for real-world CRE workflows.",
    },
    {
      q: "What types of commercial real estate jobs are on HireCRE?",
      a: "Roles commonly include acquisitions, asset management, development, lending/credit, capital markets, investment sales, research, property management, and proptech—across multiple markets and experience levels.",
    },
    {
      q: "Is HireCRE only for job listings?",
      a: "No. In addition to the job feed, HireCRE includes interview prep and concept pages (e.g., DSCR, debt yield, cap rates, waterfalls) so candidates can explain fundamentals clearly and interview at an institutional level.",
    },
    {
      q: "How do job alerts work?",
      a: "You can sign up for alerts to receive relevant roles and new resources. Alerts are designed to be useful and targeted rather than noisy.",
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

  // WebSite + SearchAction helps Google understand you have a searchable job inventory.
  // Uses /board?q= search pattern. If your board uses a different query param, change it here.
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HireCRE",
    url: "https://hirecre.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hirecre.com/board?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // Organization schema strengthens entity/brand signals.
  // If you have a real logo URL, replace /favicon.png with your logo asset.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HireCRE",
    url: "https://hirecre.com",
    logo: "https://hirecre.com/favicon.png",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
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
              Commercial real estate jobs — plus interview prep and career resources
            </h1>

            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              HireCRE combines a curated CRE job board with an interview prep and underwriting hub.
              Find roles across acquisitions, asset management, development, lending, capital markets, and proptech —
              and sharpen the concepts you need to explain in interviews.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/board"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse jobs
              </Link>

              <Link
                href="/interview-prep"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Interview prep
              </Link>

              <Link
                href="/login?signup=1"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Create account
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-sm font-semibold text-gray-900">Clean discovery</div>
                <div className="mt-1 text-sm text-gray-600">
                  A readable feed designed for fast scanning and decision-making.
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-sm font-semibold text-gray-900">Built around CRE roles</div>
                <div className="mt-1 text-sm text-gray-600">
                  Acquisitions, asset management, development, lending/credit, capital markets, and more.
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="text-sm font-semibold text-gray-900">Interview-ready resources</div>
                <div className="mt-1 text-sm text-gray-600">
                  Concept explainers and interview framing written in institutional language.
                </div>
              </div>
            </div>
          </div>

          {/* Email signup */}
          <div className="mt-8">
            <EmailSignup source="home" />
          </div>

          {/* Popular resources (internal links = crawl depth + authority) */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Start with these interview prep essentials</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              The concepts that show up constantly in CRE debt and equity interviews.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link
                href="/interview-prep/dscr-vs-debt-yield"
                className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-gray-50"
              >
                <div className="text-sm font-semibold text-gray-900">DSCR vs Debt Yield (With Example)</div>
                <div className="mt-1 text-sm text-gray-600">
                  When each metric binds, how rates change DSCR, and how to explain it cleanly.
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
                  Value = NOI / cap rate, plus compression vs expansion interview framing.
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
              In addition to curated opportunities, we publish interview preparation guides, underwriting breakdowns,
              and concept explainers that help candidates communicate like institutional practitioners.
            </p>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              If you’re targeting acquisitions, private equity, debt funds, mortgage REITs, development shops, or brokerage platforms,
              HireCRE gives you both the opportunities and the context to compete.
            </p>
          </div>

          {/* FAQ (on-page) */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>

            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="rounded-xl border border-gray-200 bg-white p-5">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-900">{f.q}</summary>
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
