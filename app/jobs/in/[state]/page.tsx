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
              ? `${jobs.length} active commercial real estate and proptech role${jobs.length === 1 ? "" : "s"} in ${s.name}, aggregated from company career sites.`
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
