// Server-rendered wrapper for the interactive job board.
//
// Why this exists: the full board UI (filters, paging, search) is a
// client component that renders an empty <div> to bots. AdSense
// reviewers and Googlebot need real content to see in the HTML on
// a page we want indexed. This server component fetches the 25
// most recent active jobs and renders them as static HTML above
// the interactive <BoardClient />. Once React hydrates, the client
// UI takes over and the SSR section is hidden to avoid duplicate
// content in the user's view.

import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import BoardClient from "./BoardClient";

type PreviewJob = {
  id: string;
  slug: string | null;
  title: string | null;
  company: string | null;
  location_city: string | null;
  location_state: string | null;
  location_raw: string | null;
  posted_at: string | null;
  has_pay: boolean | null;
  pay_extracted: string | null;
};

const SSR_PREVIEW_COUNT = 25;

async function getRecentActiveJobs(): Promise<PreviewJob[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("jobs")
      .select(
        "id,slug,title,company,location_city,location_state,location_raw,posted_at,has_pay,pay_extracted"
      )
      .eq("is_active", true)
      .not("slug", "is", null)
      .order("posted_at", { ascending: false })
      .limit(SSR_PREVIEW_COUNT);
    if (error) return [];
    return (data ?? []) as PreviewJob[];
  } catch {
    return [];
  }
}

function fmtLocation(job: PreviewJob): string {
  const city = (job.location_city ?? "").trim();
  const state = (job.location_state ?? "").trim();
  const raw = (job.location_raw ?? "").trim();
  if (city && state) return `${city}, ${state}`;
  if (city) return city;
  if (state) return state;
  if (raw) return raw;
  return "";
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BoardPage() {
  const jobs = await getRecentActiveJobs();

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Most recent commercial real estate jobs on HireCRE",
    numberOfItems: jobs.length,
    itemListElement: jobs.slice(0, 25).map((j, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: j.slug ? `https://hirecre.com/jobs/${j.slug}` : undefined,
      name: j.title ?? undefined,
    })),
  };

  return (
    <>
      {/* Server-rendered job snapshot. Googlebot + AdSense see this.
          Hidden from users with JS enabled via the noscript-friendly
          'ssr-snapshot' class — the client component below is what
          users actually interact with. */}
      <section
        id="ssr-snapshot"
        className="mx-auto max-w-6xl px-4 pt-6"
        aria-hidden="true"
      >
        <h2 className="sr-only">Recent commercial real estate jobs</h2>
        <noscript>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Enable JavaScript for filters, search, and pagination. The most
            recent {jobs.length} active roles are listed below.
          </div>
        </noscript>
        <ul className="grid gap-3">
          {jobs.map((j) => {
            const href = j.slug ? `/jobs/${j.slug}` : null;
            const loc = fmtLocation(j);
            const posted = fmtDate(j.posted_at);
            const pay = j.has_pay && j.pay_extracted ? j.pay_extracted : null;
            return (
              <li
                key={j.id}
                className="rounded-xl border border-gray-200 bg-white p-4 text-sm"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900">
                      {href ? (
                        <Link href={href} className="hover:underline">
                          {j.title ?? "Untitled role"}
                        </Link>
                      ) : (
                        j.title ?? "Untitled role"
                      )}
                    </div>
                    <div className="mt-0.5 text-gray-700">
                      <span className="font-medium">{j.company ?? "—"}</span>
                      {loc ? (
                        <>
                          <span className="mx-1 text-gray-400">•</span>
                          <span>{loc}</span>
                        </>
                      ) : null}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">
                      {posted ? `Posted ${posted}` : ""}
                      {pay ? ` · Pay: ${pay}` : ""}
                    </div>
                  </div>
                  {href ? (
                    <Link
                      href={href}
                      className="mt-2 inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-50 sm:mt-0"
                    >
                      View
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Interactive client board with filters + pagination */}
      <BoardClient />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <style>{`
        /* Hide the server snapshot once JS has hydrated the interactive
           board; until then, Googlebot/AdSense + no-JS browsers see it. */
        :root:has(#hirecre-board-root) #ssr-snapshot { display: none; }
      `}</style>
    </>
  );
}
