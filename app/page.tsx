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
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
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
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">
                Focused filters
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Company, market, role type, experience level, and remote-only.
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">
                Built for CRE roles
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Acquisitions, asset management, development, lending,
                capital markets, brokerage, and proptech.
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">
                Career resources
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Interview prep, underwriting concepts, and career insights
                for commercial real estate professionals.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <EmailSignup source="home" />
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            More than a job board
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            HireCRE is designed to be a centralized resource for commercial real
            estate careers — not just a feed of listings. In addition to curated
            job opportunities, we publish interview preparation guides,
            underwriting breakdowns, and concept explainers that help you think
            and speak like an institutional operator.
          </p>

          <p className="mt-4 text-sm leading-6 text-gray-600">
            Whether you are targeting acquisitions roles, private equity,
            mortgage REITs, development shops, or brokerage platforms,
            HireCRE gives you both the opportunities and the context to compete.
          </p>
        </div>
      </div>
    </div>
  );
}
