"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

const COMPANY_OVERRIDES: Record<string, string> = {
  bgeinc: "BGE, Inc.",
  homelight: "HomeLight",
  rxr: "RXR",
  jll: "JLL",
  cbre: "CBRE",
};

const STATE_ABBR: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  "district of columbia": "DC",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
};

function toStateAbbr(raw: string | null | undefined) {
  const s = (raw ?? "").trim();
  if (!s) return "";
  if (/^[A-Za-z]{2}$/.test(s)) return s.toUpperCase();
  const key = s.toLowerCase();
  return STATE_ABBR[key] ?? s.toUpperCase();
}

function companyKey(raw: string | null | undefined) {
  return (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^\w]+/g, ""); // normalize for matching
}

function formatCompanyName(raw: string | null | undefined) {
  const s = (raw ?? "").trim();
  if (!s) return "";

  const key = companyKey(s);
  if (COMPANY_OVERRIDES[key]) return COMPANY_OVERRIDES[key];

  // If it's an acronym (2-6 letters), show uppercase.
  if (/^[A-Za-z]{2,6}$/.test(s)) return s.toUpperCase();

  const UPPER_WORDS = new Set(["LLC", "LP", "LLP", "REIT", "USA", "CRE", "II", "III", "IV"]);
  return s
    .split(/[\s\-]+/)
    .filter(Boolean)
    .map((w) => {
      const up = w.toUpperCase();
      if (UPPER_WORDS.has(up)) return up;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

function fmtDate(d: string | null | undefined) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function isRemote(job: Job) {
  const a = (job.location_raw ?? "").toLowerCase();
  const b = (job.title ?? "").toLowerCase();
  return a.includes("remote") || b.includes("remote");
}

function fmtLocation(job: Job) {
  const city = (job.location_city ?? "").trim();
  const st = toStateAbbr(job.location_state);
  if (city && st) return `${city}, ${st}`;
  if (city) return city;
  if (st) return st;
  return (job.location_raw ?? "").trim();
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs border"
      style={{ borderColor: "rgba(148,163,184,0.18)", color: "rgba(226,232,240,0.85)", background: "rgba(15,23,42,0.55)" }}
    >
      {children}
    </span>
  );
}

export default function BoardPage() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("ALL");
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedSource, setSelectedSource] = useState<string>("ALL");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;

  const mounted = useRef(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anon) {
      setError("Missing env vars: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY");
      setLoading(false);
      return;
    }

    const sb = createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });

    setSupabase(sb);
  }, []);

  // Load user (optional UI)
  useEffect(() => {
    if (!supabase) return;

    let unsub: { data: { subscription: { unsubscribe: () => void } } } | null = null;

    (async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);

      unsub = supabase.auth.onAuthStateChange((_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      });
    })();

    return () => {
      unsub?.data.subscription.unsubscribe();
    };
  }, [supabase]);

  // Fetch jobs
  useEffect(() => {
    if (!supabase) return;
    if (mounted.current) return;
    mounted.current = true;

    (async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("jobs")
        .select(
          "id,source,source_job_id,title,company,location_city,location_state,location_raw,job_type,employment_type,url,posted_at,created_at,description"
        )
        .order("posted_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setJobs((data ?? []) as Job[]);
      setLoading(false);
    })();
  }, [supabase]);

  const companyOptions = useMemo(() => {
    const map = new Map<string, string>(); // key -> label
    for (const j of jobs) {
      const key = companyKey(j.company);
      if (!key) continue;
      const label = formatCompanyName(j.company);
      if (!map.has(key)) map.set(key, label);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([key, label]) => ({ key, label }));
  }, [jobs]);

  const stateOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) {
      const ab = toStateAbbr(j.location_state);
      if (ab) set.add(ab);
    }
    return Array.from(set).sort();
  }, [jobs]);

  const sourceOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) {
      const s = (j.source ?? "").trim();
      if (s) set.add(s);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const companyKeySelected = selectedCompany;
    const stateSelected = selectedState;
    const sourceSelected = selectedSource;

    const out = jobs.filter((j) => {
      if (remoteOnly && !isRemote(j)) return false;

      if (companyKeySelected !== "ALL") {
        if (companyKey(j.company) !== companyKeySelected) return false;
      }

      if (stateSelected !== "ALL") {
        if (toStateAbbr(j.location_state) !== stateSelected) return false;
      }

      if (sourceSelected !== "ALL") {
        if ((j.source ?? "").trim() !== sourceSelected) return false;
      }

      if (!q) return true;

      const hay = [
        j.title,
        j.company,
        j.location_city ?? "",
        j.location_state ?? "",
        j.location_raw ?? "",
        j.job_type ?? "",
        j.employment_type ?? "",
        j.source ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });

    return out;
  }, [jobs, query, selectedCompany, selectedState, selectedSource, remoteOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filtered.slice(start, end);
  }, [filtered, page, totalPages]);

  // reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [query, selectedCompany, selectedState, selectedSource, remoteOnly]);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div
          className="rounded-3xl border p-6 md:p-8"
          style={{
            borderColor: "rgba(148,163,184,0.18)",
            background: "rgba(2,6,23,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-2xl md:text-3xl font-semibold tracking-tight">Jobs</div>
              <div className="mt-1 text-sm" style={{ color: "rgba(148,163,184,0.9)" }}>
                {userEmail ? `Signed in as ${userEmail}` : "Not signed in (some data may be restricted by RLS)."}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-sm border"
                style={{
                  borderColor: "rgba(148,163,184,0.18)",
                  background: "rgba(15,23,42,0.55)",
                  color: "rgba(226,232,240,0.9)",
                }}
              >
                {filtered.length.toLocaleString()} jobs
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="md:col-span-6">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, company, location..."
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={{
                  borderColor: "rgba(148,163,184,0.18)",
                  background: "rgba(15,23,42,0.55)",
                  color: "rgba(226,232,240,0.95)",
                }}
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full rounded-xl border px-3 py-3 text-sm outline-none"
                style={{
                  borderColor: "rgba(148,163,184,0.18)",
                  background: "rgba(15,23,42,0.55)",
                  color: "rgba(226,232,240,0.95)",
                }}
              >
                <option value="ALL">All companies</option>
                {companyOptions.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded-xl border px-3 py-3 text-sm outline-none"
                style={{
                  borderColor: "rgba(148,163,184,0.18)",
                  background: "rgba(15,23,42,0.55)",
                  color: "rgba(226,232,240,0.95)",
                }}
              >
                <option value="ALL">All states</option>
                {stateOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1 flex items-center gap-2">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm" style={{ color: "rgba(226,232,240,0.9)" }}>
                Remote
              </span>
            </div>

            <div className="md:col-span-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs" style={{ color: "rgba(148,163,184,0.9)" }}>
                  Source:
                </span>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="rounded-xl border px-3 py-2 text-sm outline-none"
                  style={{
                    borderColor: "rgba(148,163,184,0.18)",
                    background: "rgba(15,23,42,0.55)",
                    color: "rgba(226,232,240,0.95)",
                  }}
                >
                  <option value="ALL">All</option>
                  {sourceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6">
            {loading && <div style={{ color: "rgba(148,163,184,0.9)" }}>Loading jobs…</div>}
            {error && (
              <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(239,68,68,0.35)", color: "#fecaca" }}>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* List */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          {pageItems.map((j) => {
            const loc = fmtLocation(j);
            const posted = fmtDate(j.posted_at ?? j.created_at);
            const company = formatCompanyName(j.company);

            return (
              <a
                key={j.id}
                href={j.url ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="block rounded-3xl border p-5 md:p-6 transition"
                style={{
                  borderColor: "rgba(148,163,184,0.18)",
                  background: "rgba(2,6,23,0.35)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="text-lg md:text-xl font-semibold tracking-tight" style={{ color: "rgba(226,232,240,0.95)" }}>
                    {j.title}
                  </div>

                  {/* Company (bigger + stands out) */}
                  <div className="text-base md:text-lg font-semibold tracking-tight" style={{ color: "rgba(96,165,250,0.95)" }}>
                    {company}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {loc && <Badge>{loc}</Badge>}
                    {isRemote(j) && <Badge>Remote</Badge>}
                    {j.job_type && <Badge>{j.job_type}</Badge>}
                    {j.employment_type && <Badge>{j.employment_type}</Badge>}
                    {j.source && <Badge>{j.source}</Badge>}
                  </div>

                  <div className="text-sm" style={{ color: "rgba(148,163,184,0.9)" }}>
                    {posted ? `Posted ${posted}` : ""}
                  </div>
                </div>
              </a>
            );
          })}

          {!loading && !error && filtered.length === 0 && (
            <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(148,163,184,0.18)", color: "rgba(148,163,184,0.9)" }}>
              No jobs match your filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-sm" style={{ color: "rgba(148,163,184,0.9)" }}>
            Page {page} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
              style={{ borderColor: "rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.55)", color: "rgba(226,232,240,0.95)" }}
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
              style={{ borderColor: "rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.55)", color: "rgba(226,232,240,0.95)" }}
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-10 text-xs" style={{ color: "rgba(148,163,184,0.7)" }}>
          Tip: If any company shows wrong capitalization (like a slug), add it to <code>COMPANY_OVERRIDES</code> in this file.
        </div>
      </div>
    </div>
  );
}
