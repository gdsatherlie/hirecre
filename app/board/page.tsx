"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import EmailSignup from "@/components/EmailSignup";
import { createClient } from "@supabase/supabase-js";

type Job = {
  id: string;

  // core
  source: string | null;
  title: string | null;
  company: string | null;

  // location
  location_city?: string | null;
  location_state?: string | null;
  location_raw?: string | null;

  // tags
  job_type?: string | null;
  employment_type?: string | null;

  // link/content
  url: string | null;
  posted_at?: string | null;
  description?: string | null;

  // pay (DB fields you actually use)
  has_pay: boolean | null;
  pay_extracted: string | null;

  // optional legacy fields (ok if null / not present)
  pay?: string | null;
  pay_text?: string | null;
  salary?: string | null;
  compensation?: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// If you want to hard-fix some “slugs” into display names:
// If you want to hard-fix some “slugs” into display names:
const COMPANY_OVERRIDES: Record<string, string> = {
  bgeinc: "BGE, Inc.",
  homelight: "HomeLight",

  // add more overrides here as you notice them
  thesciongroupllc: "The Scion Group",
  oldsecondnationalbank: "Old Second National Bank",
};

// US state full name -> abbreviation
const US_STATES: Record<string, string> = {
  ALABAMA: "AL",
  ALASKA: "AK",
  ARIZONA: "AZ",
  ARKANSAS: "AR",
  CALIFORNIA: "CA",
  COLORADO: "CO",
  CONNECTICUT: "CT",
  DELAWARE: "DE",
  FLORIDA: "FL",
  GEORGIA: "GA",
  HAWAII: "HI",
  IDAHO: "ID",
  ILLINOIS: "IL",
  INDIANA: "IN",
  IOWA: "IA",
  KANSAS: "KS",
  KENTUCKY: "KY",
  LOUISIANA: "LA",
  MAINE: "ME",
  MARYLAND: "MD",
  MASSACHUSETTS: "MA",
  MICHIGAN: "MI",
  MINNESOTA: "MN",
  MISSISSIPPI: "MS",
  MISSOURI: "MO",
  MONTANA: "MT",
  NEBRASKA: "NE",
  NEVADA: "NV",
  "NEW HAMPSHIRE": "NH",
  "NEW JERSEY": "NJ",
  "NEW MEXICO": "NM",
  "NEW YORK": "NY",
  "NORTH CAROLINA": "NC",
  "NORTH DAKOTA": "ND",
  OHIO: "OH",
  OKLAHOMA: "OK",
  OREGON: "OR",
  PENNSYLVANIA: "PA",
  "RHODE ISLAND": "RI",
  "SOUTH CAROLINA": "SC",
  "SOUTH DAKOTA": "SD",
  TENNESSEE: "TN",
  TEXAS: "TX",
  UTAH: "UT",
  VERMONT: "VT",
  VIRGINIA: "VA",
  WASHINGTON: "WA",
  "WEST VIRGINIA": "WV",
  WISCONSIN: "WI",
  WYOMING: "WY",
  "DISTRICT OF COLUMBIA": "DC",
};

function unslugCompany(input: string): string {
  let s = (input || "").trim();
  if (!s) return s;

  // Already has spaces? leave it
  if (/\s/.test(s)) return s;

  // Convert separators to spaces if present
  s = s.replace(/[-_]+/g, " ");

  // Pull common suffixes off the end (thesciongroupllc -> thesciongroup llc)
  s = s.replace(/(.*?)(llc|inc|ltd|lp|llp|reit|plc)$/i, "$1 $2").trim();

  // If still no spaces, do a light dictionary-based split
  if (!/\s/.test(s)) {
    const words = [
      "national",
      "bank",
      "capital",
      "group",
      "partners",
      "properties",
      "property",
      "real",
      "estate",
      "investments",
      "investment",
      "management",
      "advisors",
      "services",
      "financial",
      "holdings",
      "solutions",
      "development",
      "commercial",
      "mortgage",
      "lending",
      "trust",
      "credit",
    ];

    let lower = s.toLowerCase();
    for (const w of words) {
      lower = lower.replace(new RegExp(w, "g"), ` ${w} `);
    }
    s = lower.replace(/\s+/g, " ").trim();
  }

  return s;
}

function titleCaseCompany(input: string): string {
  const trimmed = (input || "").trim();
  if (!trimmed) return trimmed;

  // Overrides first
  const key = trimmed.toLowerCase().replace(/\s+/g, "");
  if (COMPANY_OVERRIDES[key]) return COMPANY_OVERRIDES[key];

  const cleaned = unslugCompany(trimmed);

  // If already mixed case, keep it (after unslug)
  const hasUpper = /[A-Z]/.test(cleaned);
  const hasLower = /[a-z]/.test(cleaned);
  if (hasUpper && hasLower) return cleaned;

  const acronyms = new Set(["LLC", "LP", "LLP", "REIT", "CRE", "USA", "US", "IT"]);
  return cleaned
    .toLowerCase()
    .split(/[\s/.-]+/)
    .map((w) => {
      if (!w) return w;
      const up = w.toUpperCase();
      if (acronyms.has(up)) return up;
      if (w.length <= 2) return up;
      return w[0].toUpperCase() + w.slice(1);
    })
    .join(" ");
}

  // ✅ use overrides FIRST (works for any special cases)
  const overrideKey = trimmed.toLowerCase().replace(/\s+/g, "");
  if (COMPANY_OVERRIDES[overrideKey]) return COMPANY_OVERRIDES[overrideKey];

const COMPANY_OVERRIDES: Record<string, string> = {
  bgeinc: "BGE, Inc.",
  homelight: "HomeLight",

  // ✅ add these
  thesciongroupllc: "The Scion Group",
  oldsecondnationalbank: "Old Second National Bank",



  // ✅ try to “unslug” if no spaces
  const deSlugged = unslugCompany(trimmed);

  // If it has upper+lower already, keep as-is (after unslug)
  const hasUpper = /[A-Z]/.test(deSlugged);
  const hasLower = /[a-z]/.test(deSlugged);
  if (hasUpper && hasLower) return deSlugged;



  const acronyms = new Set(["LLC", "LP", "LLP", "REIT", "CRE", "USA", "US", "IT"]);
  return deSlugged
    .toLowerCase()
    .split(/[\s/.-]+/)
    .map((w) => {
      if (!w) return w;
      const up = w.toUpperCase();
      if (acronyms.has(up)) return up;
      if (w.length <= 2) return up;
      return w[0].toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function normalizeState(input?: string | null): string {
  if (!input) return "";
  const s = input.trim();
  if (!s) return "";
  if (s.length === 2) return s.toUpperCase();

  const key = s.toUpperCase();
  if (US_STATES[key]) return US_STATES[key];

  const first = key.split(",")[0]?.trim() ?? key;
  if (US_STATES[first]) return US_STATES[first];

  return s;
}

function fmtDate(d?: string | null) {
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

function isRemote(job: Job): boolean {
  const hay = `${job.location_raw ?? ""} ${job.location_city ?? ""} ${job.location_state ?? ""}`.toLowerCase();
  return hay.includes("remote");
}

function employmentTag(job: Job): string | null {
  const raw = `${job.title ?? ""}\n${job.description ?? ""}`;
  const t = raw
    .toLowerCase()
    .replace(/\u00a0/g, " ")
    .replace(/[\u2010-\u2015\u2212\u00ad]/g, "-");

  if (t.includes("part-time") || t.includes("part time")) return "Part-time";
  if (t.includes("full-time") || t.includes("full time")) return "Full-time";
  if (t.includes("contract")) return "Contract";
  if (t.includes("intern")) return "Internship";
  return null;
}

function fmtLocation(job: Job): string {
  const city = (job.location_city ?? "").trim();
  const state = normalizeState(job.location_state);
  const raw = (job.location_raw ?? "").trim();

  if (city && state) return `${city}, ${state}`;
  if (city) return city;
  if (state) return state;
  if (raw) return raw;
  return "—";
}

function extractPay(job: Job): string | null {
  const direct =
    (job.pay ?? "").trim() ||
    (job.salary ?? "").trim() ||
    (job.compensation ?? "").trim() ||
    (job.pay_text ?? "").trim() ||
    (job.pay_extracted ?? "").trim();

  if (direct) return direct;

  const text = `${job.description ?? ""}\n${job.location_raw ?? ""}`;
  const m =
    text.match(/\$\s?\d{2,3}(?:,\d{3})?(?:\.\d{2})?\s?(?:-|–|to)\s?\$\s?\d{2,3}(?:,\d{3})?(?:\.\d{2})?\s?(?:\/year|\/yr|per year|yr|annum)?/i) ||
    text.match(/\$\s?\d{2,3}(?:,\d{3})+(?:\.\d{2})?\s?(?:\/year|\/yr|per year|yr|annum)/i) ||
    text.match(/\$\s?\d+(?:,\d{3})*\s?(?:\/hour|\/hr|per hour|hr)/i);

  return m ? m[0].replace(/\s+/g, " ").trim() : null;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}

export default function BoardPage() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [count, setCount] = useState<number>(0);

  // Facets
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [sourceOptions, setSourceOptions] = useState<string[]>([]);

  // Filters
  const [q, setQ] = useState("");
  const [company, setCompany] = useState<string>("ALL");
  const [state, setState] = useState<string>("ALL"); // <-- dropdown uses this
  const [source, setSource] = useState<string>("ALL");
  const [remoteOnly, setRemoteOnly] = useState<boolean>(false);
  const [payOnly, setPayOnly] = useState(false);

  // Paging
  const PAGE_SIZE = 25;
  const [page, setPage] = useState<number>(1);

  // ----- Auth gate -----
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

  // ----- Load facet options once -----
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("company, location_state, source")
          .eq("is_active", true)
          .limit(5000);

        if (error) throw error;

        const rows = (data ?? []) as Pick<Job, "company" | "location_state" | "source">[];

        const companies = new Set<string>();
        const states = new Set<string>();
        const sources = new Set<string>();

        for (const r of rows) {
          if (r.company) companies.add(titleCaseCompany(r.company));
          const st = normalizeState(r.location_state);
          if (st && st.length === 2) states.add(st); // keep only proper abbreviations
          if (r.source) sources.add(String(r.source).toLowerCase());
        }

        setCompanyOptions(Array.from(companies).sort((a, b) => a.localeCompare(b)));
        setStateOptions(Array.from(states).sort((a, b) => a.localeCompare(b)));
        setSourceOptions(Array.from(sources).sort((a, b) => a.localeCompare(b)));
      } catch {
        // ignore
      }
    })();
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [q, company, state, source, remoteOnly, payOnly]);

  // ----- Fetch jobs -----
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        let query = supabase
          .from("jobs")
          .select("*", { count: "exact" })
          .eq("is_active", true)
          .order("posted_at", { ascending: false });

        const qq = q.trim();
        if (qq) {
          // use ilike search across fields, but DO NOT let this break state filtering
          const esc = qq.replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/,/g, "\\,");
          query = query.or(
            [
              `title.ilike.%${esc}%`,
              `company.ilike.%${esc}%`,
              `location_raw.ilike.%${esc}%`,
              `location_city.ilike.%${esc}%`,
              `location_state.ilike.%${esc}%`,
              `job_type.ilike.%${esc}%`,
            ].join(",")
          );
        }

        if (company !== "ALL") {
          query = query.ilike("company", `%${company}%`);
        }

        // ✅✅✅ FIXED STATE FILTER:
        // Only filter using the normalized 2-letter abbreviation stored in location_state.
        // No OR. No location_raw. No ilike.
        if (state !== "ALL") {
          query = query.eq("location_state", state);
        }

        if (source !== "ALL") {
          query = query.eq("source", source);
        }

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
          // Use DB boolean first (fast + consistent)
          query = query.eq("has_pay", true);
        }

        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        // Keep your payOnly special-mode pagination if you want,
        // but it’s no longer needed now that has_pay is used.
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

  const totalPages = useMemo(() => Math.max(1, Math.ceil(count / PAGE_SIZE)), [count]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-6 w-full">
              <EmailSignup source="board" />
            </div>

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
                {companyOptions.map((c) => (
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
                {stateOptions.map((s) => (
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
                {sourceOptions.map((s) => (
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
                const companyName = titleCaseCompany(job.company ?? "");
                const location = fmtLocation(job);
                const posted = fmtDate(job.posted_at);
                const remote = isRemote(job);
                const emp = employmentTag(job);

                const pay =
                  (job.pay ?? "").toString().trim() ||
                  (job.pay_text ?? "").toString().trim() ||
                  (job.salary ?? "").toString().trim() ||
                  (job.compensation ?? "").toString().trim() ||
                  (job.pay_extracted ?? "").toString().trim() ||
                  extractPay(job);

                const sourceLabel = (job.source ?? "unknown").toLowerCase();

                return (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
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
                          <div className="text-base font-semibold text-gray-900">
                            {companyName || "—"}
                          </div>
                          <span className="text-gray-300">•</span>
                          <div className="text-sm text-gray-700">{location}</div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {remote && <Pill>Remote</Pill>}
                          {emp && <Pill>{emp}</Pill>}
                          {job.job_type && <Pill>{job.job_type}</Pill>}
                          {job.employment_type && <Pill>{job.employment_type}</Pill>}
                          <Pill>{sourceLabel}</Pill>
                          {pay ? <Pill>Pay: {pay}</Pill> : null}
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          {posted ? `Posted ${posted}` : ""}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {job.url && (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                          >
                            View job
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

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
  );
}
