"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Job = {
  id: string;
  title: string | null;
  company: string | null;
  location_raw: string | null;
  location_city: string | null;
  location_state: string | null;
  posted_at: string | null;
  url: string | null;
  source: string | null;
  pay: string | null;
  pay_text: string | null;
  salary: string | null;
  compensation: string | null;
  has_pay: boolean | null;
};

const PAGE_SIZE = 25;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

function badge(text: string) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
      {text}
    </span>
  );
}

function fmtDate(d: string | null) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function fmtLocation(job: Job) {
  const city = (job.location_city ?? "").trim();
  const state = (job.location_state ?? "").trim();
  const raw = (job.location_raw ?? "").trim();

  if (city && state) return `${city}, ${state}`;
  if (city) return city;
  if (state) return state;
  if (raw) return raw;
  return "—";
}

function getPay(job: Job) {
  const direct =
    (job.pay ?? "").toString().trim() ||
    (job.pay_text ?? "").toString().trim() ||
    (job.salary ?? "").toString().trim() ||
    (job.compensation ?? "").toString().trim();

  return direct || "";
}

export default function BoardPage() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [count, setCount] = useState(0);

  const [q, setQ] = useState("");
  const [company, setCompany] = useState("ALL");
  const [state, setState] = useState("ALL");
  const [source, setSource] = useState("ALL");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [payOnly, setPayOnly] = useState(false);

  const [companies, setCompanies] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session?.user?.email ?? null;
      if (!email) {
        router.push("/login");
        return;
      }
      setUserEmail(email);
    })();
  }, [router]);

  // Load dropdown values (best-effort)
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("company, location_state, source")
          .limit(5000);

        if (error) return;

        const cs = new Set<string>();
        const ss = new Set<string>();
        const src = new Set<string>();

        (data ?? []).forEach((r: any) => {
          if (r.company) cs.add(String(r.company));
          if (r.location_state) ss.add(String(r.location_state));
          if (r.source) src.add(String(r.source).toLowerCase());
        });

        setCompanies(Array.from(cs).sort());
        setStates(Array.from(ss).sort());
        setSources(Array.from(src).sort());
      } catch {
        // ignore
      }
    })();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [q, company, state, source, remoteOnly, payOnly]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
        }

        let query = supabase
          .from("jobs")
          .select("*", { count: "exact" })
          .order("posted_at", { ascending: false });

        const text = q.trim();
        if (text) {
          const escaped = text.replace(/,/g, "\\,");
          query = query.or(
            [
              `title.ilike.%${escaped}%`,
              `company.ilike.%${escaped}%`,
              `location_raw.ilike.%${escaped}%`,
              `location_city.ilike.%${escaped}%`,
              `location_state.ilike.%${escaped}%`,
            ].join(",")
          );
        }

        if (company !== "ALL") query = query.ilike("company", `%${company}%`);

        if (state !== "ALL") {
          query = query.or(
            [`location_state.ilike.%${state}%`, `location_raw.ilike.%${state}%`].join(",")
          );
        }

        if (source !== "ALL") query = query.eq("source", source);

        if (remoteOnly) {
          query = query.or(
            [
              "location_raw.ilike.%remote%",
              "location_city.ilike.%remote%",
              "location_state.ilike.%remote%",
            ].join(",")
          );
        }

        if (payOnly) {
          // Use DB boolean if present
          query = query.eq("has_pay", true);
        }

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error, count: c } = await query.range(from, to);
        if (error) throw error;

        setJobs((data ?? []) as Job[]);
        setCount(c ?? 0);
      } catch {
        setJobs([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    })();
  }, [q, company, state, source, remoteOnly, payOnly, page]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
    [count]
  );

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
            <div className="mt-1 text-sm text-gray-600">
              Signed in as <span className="font-medium">{userEmail ?? "…"}</span>
              <button
                onClick={signOut}
                className="ml-3 text-sm font-semibold text-blue-700 hover:underline"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{count.toLocaleString()}</span> jobs
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-12">
            <div className="md:col-span-5">
              <label className="mb-1 block text-xs font-semibold text-gray-700">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, company, location…"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-3">
              <label className="mb-1 block text-xs font-semibold text-gray-700">Company</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
              >
                <option value="ALL">All companies</option>
                {companies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-gray-700">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
              >
                <option value="ALL">All states</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-gray-700">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
              >
                <option value="ALL">All sources</option>
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-12 flex items-center gap-4 pt-1">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Remote only
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={payOnly}
                  onChange={(e) => setPayOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Pay shown
              </label>

              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setCompany("ALL");
                  setState("ALL");
                  setSource("ALL");
                  setRemoteOnly(false);
                  setPayOnly(false);
                }}
                className="text-sm font-semibold text-gray-700 hover:underline"
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6">
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
              Loading…
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
              No jobs match your filters.
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => {
                const loc = fmtLocation(job);
                const date = fmtDate(job.posted_at);
                const hay = `${job.location_raw ?? ""} ${job.location_city ?? ""} ${job.location_state ?? ""}`.toLowerCase();
                const isRemote = hay.includes("remote");
                const pay = getPay(job);
                const src = (job.source ?? "unknown").toLowerCase();

                return (
                  <div key={job.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="text-lg font-semibold text-gray-900">
                          {job.url ? (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                            >
                              {job.title ?? "Untitled role"}
                            </a>
                          ) : (
                            job.title ?? "Untitled role"
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <div className="text-base font-semibold text-gray-900">{job.company ?? "—"}</div>
                          <span className="text-gray-300">•</span>
                          <div className="text-sm text-gray-700">{loc}</div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {isRemote ? badge("Remote") : null}
                          {badge(src)}
                          {pay ? badge(`Pay: ${pay}`) : null}
                        </div>

                        <div className="mt-3 text-xs text-gray-500">{date ? `Posted ${date}` : ""}</div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                          >
                            View job
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
              <span className="font-semibold text-gray-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-10 text-xs text-gray-500">
            Tip: If the board ever shows “no jobs” unexpectedly, it’s usually auth/RLS. Log out and
            log back in, or confirm your `jobs_read_authenticated` policy is still enabled.
          </div>
        </div>
      </div>
    </div>
  );
}
