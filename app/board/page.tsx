"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Job = {
  id: string;
  source?: string | null;
  source_job_id?: string | null;
  title: string;
  company: string;
  location_city?: string | null;
  location_state?: string | null;
  location_raw?: string | null;
  job_type?: string | null;
  employment_type?: string | null;
  url?: string | null;
  posted_at?: string | null;
  created_at?: string | null;
  description?: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fix ugly slugs -> display names (add more anytime)
const COMPANY_OVERRIDES: Record<string, string> = {
  bgeinc: "BGE, Inc.",
  homelight: "HomeLight",
  figure: "FIGURE",
};

const US_STATE_TO_ABBR: Record<string, string> = {
  "alabama": "AL","alaska":"AK","arizona":"AZ","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT",
  "delaware":"DE","district of columbia":"DC","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL",
  "indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA",
  "michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV",
  "new hampshire":"NH","new jersey":"NJ","new mexico":"NM","new york":"NY","north carolina":"NC","north dakota":"ND",
  "ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhode island":"RI","south carolina":"SC","south dakota":"SD",
  "tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","west virginia":"WV",
  "wisconsin":"WI","wyoming":"WY",
};

function titleCaseLoose(input: string) {
  const s = input.replace(/[_-]+/g, " ").trim();
  return s
    .split(/\s+/)
    .map((w) => {
      if (!w) return w;
      if (w.length <= 4 && w === w.toUpperCase()) return w; // keep acronyms
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

function formatCompany(company: string) {
  const key = company.trim().toLowerCase();
  if (COMPANY_OVERRIDES[key]) return COMPANY_OVERRIDES[key];

  // If it's a slug with no spaces and all lowercase, title-case it
  if (!company.includes(" ") && company === company.toLowerCase()) {
    return titleCaseLoose(company);
  }

  return titleCaseLoose(company);
}

function normalizeState(state?: string | null) {
  if (!state) return null;
  const s = state.trim();
  if (!s) return null;
  if (s.length === 2) return s.toUpperCase();
  const lower = s.toLowerCase();
  return US_STATE_TO_ABBR[lower] || s; // fallback for non-US / unknown
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

function isRemote(j: Job) {
  const loc = `${j.location_raw || ""} ${j.location_city || ""} ${j.location_state || ""}`.toLowerCase();
  return loc.includes("remote");
}

function fmtLocation(j: Job) {
  const city = (j.location_city || "").trim();
  const st = normalizeState(j.location_state);
  const raw = (j.location_raw || "").trim();

  if (city && st) return `${city}, ${st}`;
  if (raw) return raw;
  if (st) return st;
  return "—";
}

// Best-effort salary extraction from description text (no DB changes needed)
function payFromDescription(desc?: string | null): string | null {
  if (!desc) return null;
  const t = desc.replace(/\s+/g, " ");

  const range =
    t.match(/(\$|£|€)\s?\d[\d,\.]*\s?(k|m)?\s?[-–]\s?(\$|£|€)?\s?\d[\d,\.]*\s?(k|m)?\s?(\/\s?(year|yr|hour|hr))?/i) ||
    t.match(/\b\d{2,3}\s?(k|K)\s?[-–]\s?\d{2,3}\s?(k|K)\b/);

  if (range?.[0]) return range[0].replace(/\s+/g, " ").trim();

  const single =
    t.match(/(\$|£|€)\s?\d[\d,\.]*\s?(k|m)?\s?(\/\s?(year|yr|hour|hr))?/i) ||
    t.match(/\b\d{2,3}\s?(k|K)\b/);

  if (single?.[0]) return single[0].replace(/\s+/g, " ").trim();

  return null;
}

export default function BoardPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Filters
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("ALL");
  const [state, setState] = useState("ALL");
  const [source, setSource] = useState("ALL");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 30;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: auth } = await supabase.auth.getUser();
        setUserEmail(auth.user?.email ?? null);

        // Only select columns we KNOW exist (avoid breaking on missing salary columns)
        const { data, error } = await supabase
          .from("jobs")
          .select("id, source, source_job_id, title, company, location_city, location_state, location_raw, job_type, employment_type, url, posted_at, created_at, description")
          .order("posted_at", { ascending: false, nullsFirst: false })
          .limit(5000);

        if (error) throw error;
        setJobs((data as Job[]) || []);
      } catch (e: any) {
        setError(e?.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const companyOptions = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(formatCompany(j.company || "").trim()));
    return ["ALL", ...Array.from(set).filter(Boolean).sort((a, b) => a.localeCompare(b))];
  }, [jobs]);

  const stateOptions = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      const st = normalizeState(j.location_state);
      if (st) set.add(st);
    });
    return ["ALL", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [jobs]);

  const sourceOptions = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      const s = (j.source || "").trim();
      if (s) set.add(s);
    });
    return ["ALL", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return jobs.filter((j) => {
      const companyNice = formatCompany(j.company || "");
      const st = normalizeState(j.location_state);

      if (company !== "ALL" && companyNice !== company) return false;
      if (state !== "ALL" && st !== state) return false;
      if (source !== "ALL" && (j.source || "") !== source) return false;
      if (remoteOnly && !isRemote(j)) return false;

      if (!q) return true;

      const hay = [
        j.title || "",
        companyNice,
        j.location_city || "",
        st || "",
        j.location_raw || "",
        j.job_type || "",
        j.employment_type || "",
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [jobs, query, company, state, source, remoteOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);

  const pageItems = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageSafe]);

  useEffect(() => {
    setPage(1);
  }, [query, company, state, source, remoteOnly]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>
        <p className="mt-1 text-sm text-slate-600">
          {userEmail ? `Signed in as ${userEmail}` : "Not signed in"}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="grid gap-3 border-b border-slate-200 p-4 md:grid-cols-5">
          <input
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100 md:col-span-2"
            placeholder="Search title, company, location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            {companyOptions.map((c) => (
              <option key={c} value={c}>
                {c === "ALL" ? "All companies" : c}
              </option>
            ))}
          </select>

          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {stateOptions.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All states" : s}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              {sourceOptions.map((s) => (
                <option key={s} value={s}>
                  {s === "ALL" ? "All sources" : s}
                </option>
              ))}
            </select>

            <label className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
              Remote
            </label>
          </div>
        </div>

        {/* KPI */}
        <div className="flex items-center justify-between px-4 pt-3 text-xs text-slate-600">
          <div>{loading ? "Loading…" : `${filtered.length.toLocaleString()} jobs`}</div>
          <div>{!loading && filtered.length > 0 ? `Page ${pageSafe} of ${totalPages}` : ""}</div>
        </div>

        {/* List */}
        <div className="grid gap-3 p-4">
          {error && <div className="text-sm text-red-600">{error}</div>}
          {!loading && filtered.length === 0 && (
            <div className="text-sm text-slate-600">No jobs match your filters.</div>
          )}

          {pageItems.map((j) => {
            const companyNice = formatCompany(j.company || "");
            const loc = fmtLocation(j);
            const src = (j.source || "").trim() || "—";
            const date = fmtDate(j.posted_at || j.created_at);
            const pay = payFromDescription(j.description);

            return (
              <div
                key={j.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-semibold leading-snug text-slate-900">
                      {j.title}
                    </div>

                    {/* Company bigger + stands out */}
                    <div className="mt-1 text-sm font-bold text-slate-900">
                      {companyNice}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex h-7 items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700">
                        {loc}
                      </span>

                      {isRemote(j) && (
                        <span className="inline-flex h-7 items-center rounded-full border border-blue-200 bg-blue-50 px-3 text-xs font-medium text-blue-700">
                          Remote
                        </span>
                      )}

                      <span className="inline-flex h-7 items-center rounded-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700">
                        {src}
                      </span>

                      {pay && (
                        <span className="inline-flex h-7 items-center rounded-full border border-blue-200 bg-blue-50 px-3 text-xs font-medium text-blue-700">
                          Pay: {pay}
                        </span>
                      )}
                    </div>
                  </div>

                  {j.url ? (
                    <a
                      href={j.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                    >
                      View
                    </a>
                  ) : null}
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-600">
                  <div>{date ? `Posted ${date}` : ""}</div>
                  <div className="text-right">
                    {j.job_type ? j.job_type : ""}
                    {j.job_type && j.employment_type ? " • " : ""}
                    {j.employment_type ? j.employment_type : ""}
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && filtered.length > PAGE_SIZE && (
            <div className="mt-2 flex justify-center gap-2">
              <button
                className="h-9 rounded-xl border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pageSafe <= 1}
              >
                Prev
              </button>
              <button
                className="h-9 rounded-xl border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={pageSafe >= totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

