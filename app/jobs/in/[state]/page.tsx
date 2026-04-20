// Programmatic landing page: /jobs/in/[state]
//
// Server-rendered index of every active CRE job in a given US state.
// Creates ~50 long-tail SEO targets like "cre jobs in california",
// "commercial real estate jobs in new york", etc.

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getStateBySlug, US_STATES } from "@/lib/us-states";
import { getStateMarket } from "@/lib/state-market-content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";
const JOBS_PER_PAGE = 50;
const MIN_JOBS_TO_INDEX = 5;

type JobRow = {
  id: string;
  slug: string | null;
  title: string | null;
  company: string | null;
  location_city: string | null;
  location_raw: string | null;
  posted_at: string | null;
  has_pay: boolean | null;
  pay_extracted: string | null;
};

// The jobs table stores state as either "CA" or "CALIFORNIA" etc.
// Match both forms so every active job with a state shows up.
async function getJobsForState(abbrev: string, fullName: string): Promise<JobRow[]> {
  const { data, error } = await supabaseAdmin()
    .from("jobs")
    .select(
      "id,slug,title,company,location_city,location_raw,posted_at,has_pay,pay_extracted"
    )
    .eq("is_active", true)
    .not("slug", "is", null)
    .or(
      [
        `location_state.eq.${abbrev}`,
        `location_state.ilike.${fullName}`,
      ].join(",")
    )
    .order("posted_at", { ascending: false })
    .limit(JOBS_PER_PAGE);

  if (error) throw error;
  return (data ?? []) as JobRow[];
}

export async function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) {
    return { title: "Not found | HireCRE", robots: { index: false, follow: false } };
  }

  const title = `Commercial Real Estate Jobs in ${s.name} | HireCRE`;
  const description = `Browse active commercial real estate and proptech jobs in ${s.name}. Updated regularly from Greenhouse, Lever, and iCIMS. Curated for CRE professionals.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/in/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/jobs/in/${s.slug}`,
      type: "website",
    },
  };
}

function formatPostedDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function StateJobsPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return notFound();

  const jobs = await getJobsForState(s.abbrev, s.name);
  const indexable = jobs.length >= MIN_JOBS_TO_INDEX;
  const market = getStateMarket(s.abbrev);

  // Top employers with active roles in this state — derived from jobs.
  const employerCounts = new Map<string, number>();
  for (const j of jobs) {
    if (!j.company) continue;
    employerCounts.set(j.company, (employerCounts.get(j.company) ?? 0) + 1);
  }
  const topEmployers = Array.from(employerCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Jobs", item: `${SITE_URL}/board` },
      {
        "@type": "ListItem",
        position: 3,
        name: `Jobs in ${s.name}`,
        item: `${SITE_URL}/jobs/in/${s.slug}`,
      },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Commercial Real Estate Jobs in ${s.name}`,
    description: `Active CRE and proptech jobs based in ${s.name}.`,
    url: `${SITE_URL}/jobs/in/${s.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: jobs.length,
      itemListElement: jobs.slice(0, 25).map((j, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: j.slug ? `${SITE_URL}/jobs/${j.slug}` : undefined,
        name: j.title ?? undefined,
      })),
    },
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Breadcrumbs (visible) */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/board" className="hover:underline">Jobs</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{s.name}</span>
        </nav>

        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Commercial real estate jobs in {s.name}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-gray-600">
            {jobs.length > 0
              ? `${jobs.length} active commercial real estate and proptech role${jobs.length === 1 ? "" : "s"} in ${s.name}${market ? ` — ${market.tagline}` : ""}.`
              : `We don't currently have active CRE roles listed in ${s.name}. Check back as new roles are added every few hours.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link
              href="/board"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              See all jobs
            </Link>
            <Link
              href="/jobs/in"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-900 hover:bg-gray-50"
            >
              Browse by state
            </Link>
          </div>
        </header>

        {/* Market overview — only for curated states. Provides unique,
            editorial content above the scraped job list, which is
            what AdSense / Google reward on an aggregator site. */}
        {market ? (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              {s.name} CRE market overview
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-gray-700">
              {market.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Key metros
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                  {market.keyMetros.map((m) => (
                    <li
                      key={m}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Employer types active here
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {market.employerSegments.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Compensation context
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {market.compensationNote}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Common {s.name} CRE roles
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                {market.commonRoles.map((r) => (
                  <li
                    key={r}
                    className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Top employers in this state (data-driven). */}
        {topEmployers.length > 0 ? (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Top CRE employers hiring in {s.name}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Companies with the most active listings on HireCRE right now.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {topEmployers.map(([name, count]) => (
                <li
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm"
                >
                  <span className="font-semibold text-gray-900">{name}</span>
                  <span className="text-xs text-gray-500">
                    {count} {count === 1 ? "role" : "roles"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Interview prep tie-in — drives users into the editorial
            content hub and adds SEO-friendly internal linking. */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Prepping for a CRE interview in {s.name}?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Our interview prep hub covers the concepts that come up repeatedly
            in CRE debt, equity, and acquisitions interviews — including the
            ones most often tested at the institutional seats above.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
            <li>
              <Link
                href="/interview-prep/dscr-vs-debt-yield"
                className="text-blue-700 hover:underline"
              >
                DSCR vs Debt Yield (with example)
              </Link>
            </li>
            <li>
              <Link
                href="/interview-prep/cap-rate-explained"
                className="text-blue-700 hover:underline"
              >
                Cap Rate Explained (with example)
              </Link>
            </li>
            <li>
              <Link
                href="/interview-prep/equity-waterfall-basics"
                className="text-blue-700 hover:underline"
              >
                Equity Waterfall Basics
              </Link>
            </li>
            <li>
              <Link
                href="/interview-prep/underwriting-walkthrough"
                className="text-blue-700 hover:underline"
              >
                Walk Me Through Your Underwriting
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <Link
              href="/interview-prep"
              className="text-sm font-semibold text-blue-700 hover:underline"
            >
              View the full Interview Prep hub →
            </Link>
          </div>
        </section>

        {!indexable ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            This page is visible but not indexed until we have at least{" "}
            {MIN_JOBS_TO_INDEX} active roles in {s.name}.
          </div>
        ) : null}

        {/* Job list */}
        {jobs.length > 0 ? (
          <ul className="mt-8 grid gap-4">
            {jobs.map((j) => (
              <li
                key={j.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-gray-900">
                      {j.slug ? (
                        <Link href={`/jobs/${j.slug}`} className="hover:underline">
                          {j.title ?? "Untitled role"}
                        </Link>
                      ) : (
                        <span>{j.title ?? "Untitled role"}</span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      <span className="font-medium">{j.company ?? "—"}</span>
                      {j.location_city ? (
                        <>
                          <span className="mx-1 text-gray-400">•</span>
                          <span>{j.location_city}, {s.abbrev}</span>
                        </>
                      ) : j.location_raw ? (
                        <>
                          <span className="mx-1 text-gray-400">•</span>
                          <span>{j.location_raw}</span>
                        </>
                      ) : null}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {formatPostedDate(j.posted_at)}
                      {j.has_pay && j.pay_extracted ? (
                        <> · Pay: {j.pay_extracted}</>
                      ) : null}
                    </div>
                  </div>
                  {j.slug ? (
                    <Link
                      href={`/jobs/${j.slug}`}
                      className="mt-3 inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 sm:mt-0"
                    >
                      View job
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Cross-link to other states with inventory */}
        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Browse jobs by state</h2>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm sm:grid-cols-4">
            {US_STATES.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/jobs/in/${other.slug}`}
                  className={
                    other.slug === s.slug
                      ? "font-semibold text-gray-900"
                      : "text-blue-700 hover:underline"
                  }
                >
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
        />
      </div>
    </div>
  );
}
