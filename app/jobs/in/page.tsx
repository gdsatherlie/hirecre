// Index page for the programmatic state landing pages.
// /jobs/in - "Browse jobs by state"

import Link from "next/link";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { US_STATES } from "@/lib/us-states";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

export const metadata: Metadata = {
  title: "Commercial Real Estate Jobs by State | HireCRE",
  description:
    "Browse active commercial real estate and proptech jobs by US state. Fresh roles from Greenhouse, Lever, and iCIMS, updated every six hours.",
  alternates: { canonical: "/jobs/in" },
  openGraph: {
    title: "Commercial Real Estate Jobs by State | HireCRE",
    description:
      "Browse active commercial real estate and proptech jobs by US state.",
    url: `${SITE_URL}/jobs/in`,
    type: "website",
  },
};

type StateCount = { abbrev: string; full: string; n: number };

async function getCountsByState(): Promise<Map<string, number>> {
  // Pull every (id, state) pair for active jobs, then bucket client-side.
  // A simple GROUP BY via PostgREST isn't exposed; doing it in JS is fine
  // because the dataset is small (a few thousand rows at most).
  const { data, error } = await supabaseAdmin()
    .from("jobs")
    .select("location_state")
    .eq("is_active", true)
    .not("slug", "is", null)
    .limit(10000);

  if (error) throw error;

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const raw = String((row as { location_state: string | null }).location_state ?? "").trim();
    if (!raw) continue;

    // Normalize to the 2-letter abbrev by matching against US_STATES.
    const key = raw.toUpperCase();
    const match = US_STATES.find(
      (s) => s.abbrev === key || s.name.toUpperCase() === key
    );
    if (!match) continue;
    counts.set(match.abbrev, (counts.get(match.abbrev) ?? 0) + 1);
  }
  return counts;
}

export default async function StatesIndexPage() {
  const counts = await getCountsByState();

  const rows: StateCount[] = US_STATES.map((s) => ({
    abbrev: s.abbrev,
    full: s.name,
    n: counts.get(s.abbrev) ?? 0,
  }));

  const withJobs = rows.filter((r) => r.n > 0).sort((a, b) => b.n - a.n);
  const empty = rows.filter((r) => r.n === 0).sort((a, b) => a.full.localeCompare(b.full));

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Jobs", item: `${SITE_URL}/board` },
      { "@type": "ListItem", position: 3, name: "By state", item: `${SITE_URL}/jobs/in` },
    ],
  };

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/board" className="hover:underline">Jobs</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">By state</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Commercial real estate jobs by state
        </h1>
        <p className="mt-3 max-w-3xl text-base text-gray-600">
          Browse the active HireCRE feed by US state. We aggregate CRE and
          proptech roles from company career sites every few hours.
        </p>

        {withJobs.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              States with active roles
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {withJobs.map((r) => {
                const slug =
                  US_STATES.find((s) => s.abbrev === r.abbrev)?.slug ?? "";
                return (
                  <li key={r.abbrev}>
                    <Link
                      href={`/jobs/in/${slug}`}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                    >
                      <span>{r.full}</span>
                      <span className="text-xs font-semibold text-gray-500">
                        {r.n} {r.n === 1 ? "role" : "roles"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {empty.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              All states
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm sm:grid-cols-4">
              {empty.map((r) => {
                const slug =
                  US_STATES.find((s) => s.abbrev === r.abbrev)?.slug ?? "";
                return (
                  <li key={r.abbrev}>
                    <Link
                      href={`/jobs/in/${slug}`}
                      className="text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {r.full}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      </div>
    </div>
  );
}
