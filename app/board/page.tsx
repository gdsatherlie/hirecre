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

  // Optional pay fields (if you ever add them later, UI will automatically pick them up)
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  salary_period?: string | null; // "year" | "hour" etc
  salary_text?: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Hand-tune ugly slugs -> correct company names
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
  // Handles "philippinesgreenhouse" poorly; this is for human-ish words.
  // We'll first try overrides; otherwise, space-split and capitalize.
  const s = input.replace(/[_-]+/g, " ").trim();
  return s
    .split(/\s+/)
    .map((w) => {
      if (!w) return w;
      // keep acronyms
      if (w.length <= 4 && w === w.toUpperCase()) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

function formatCompany(company: string) {
  const key = company.trim().toLowerCase();
  if (COMPANY_OVERRIDES[key]) return COMPANY_OVERRIDES[key];

  // If it's a single lowercase slug (no spaces) we title-case it.
  // Example: "extenteam" -> "Extenteam" (better than all lower)
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
  if (US_STATE_TO_ABBR[lower]) return US_STATE_TO_ABBR[lower];
  return s; // fallback (international / unknown)
}

function fmtDate(d?: string | null) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
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

function isRemote(j: Job) {
  const loc = `${j.location_raw || ""} ${j.location_city || ""} ${j.location_state || ""}`.toLowerCase();
  return loc.includes("remote");
}

// Try to display pay if possible (DB fields OR extracted from description)
function payFromFields(j: Job): string | null {
  if (j.salary_text && j.salary_text.trim()) return j.salary_text.trim();
  const min = j.salary_min ?? null;
  const max = j.salary_max ?? null;
  const cur = (j.salary_currency || "USD").toUpperCase();
  const period = j.salary_period ? `/${j.salary_period}` : "";

  const symbol = cur === "USD" ? "$" : cur === "EUR" ? "€" : cur === "GBP" ? "£" : `${cur} `;

  const fmt = (n: number) => {
    // 120000 -> 120k
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${Math.round(n / 1000)}k`;
    return `${n}`;
  };

  if (min && max) return `${symbol}${fmt(min)}–${fmt(max)}${period}`;
  if (min && !max) return `${symbol}${fmt(min)}+${period}`;
  if (!min && max) return `Up to ${symbol}${fmt(max)}${period}`;
  return null;
}

function payFromDescription(desc?: string | null): string | null {
  if (!desc) return null;
  const t = desc.replace(/\s+/g, " ");

  // Common ranges: "$120,000 - $150,000", "$60/hr", "£80k–£100k", "120k - 150k"
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

        // Fetch recent jobs (client-side filters will handle for now)
        const { data, error } = await supabase
          .from("jobs")
          .select(
            "id, source, source_job_id, title, company, location_city, location_state, location_raw, job_type, employment_type, url, posted_at, created_at, description, salary_min, salary_max, salary_currency, salary_period, salary_text"
          )
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

  // Dropdown options
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

  // Reset to page 1 on filter change
  useEffect(() => {
    setPage(1);
  }, [query, company, state, source, remoteOnly]);

  return (
    <div className="container">
      <h1 className="pageTitle">Jobs</h1>
      <p className="subTitle">
        {userEmail ? `Signed in as ${userEmail}` : "Not signed in"}
      </p>

      <div className="panel">
        <div className="filters">
          <input
            className="input"
            placeholder="Search title, company, location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select className="select" value={company} onChange={(e) => setCompany(e.target.value)}>
            {companyOptions.map((c) => (
              <option key={c} value={c}>
                {c === "ALL" ? "All companies" : c}
              </option>
            ))}
          </select>

          <select className="select" value={state} onChange={(e) => setState(e.target.value)}>
            {stateOptions.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All states" : s}
              </option>
            ))}
          </select>

          <select className="select" value={source} onChange={(e) => setSource(e.target.value)}>
            {sourceOptions.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All sources" : s}
              </option>
            ))}
          </select>

          <label className="checkboxRow">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
            />
            Remote
          </label>
        </div>

        <div className="kpiRow">
          <div>{loading ? "Loading…" : `${filtered.length.toLocaleString()} jobs`}</div>
          <div>{!loading && filtered.length > 0 ? `Page ${pageSafe} of ${totalPages}` : ""}</div>
        </div>

        <div className="list">
          {error && <div className="muted">{error}</div>}
          {!loading && filtered.length === 0 && <div className="muted">No jobs match your filters.</div>}

          {pageItems.map((j) => {
            const companyNice = formatCompany(j.company || "");
            const loc = fmtLocation(j);
            const src = (j.source || "").trim() || "—";
            const date = fmtDate(j.posted_at || j.created_at);
            const pay = payFromFields(j) || payFromDescription(j.description);

            return (
              <div className="card" key={j.id}>
                <div className="cardTop">
                  <div>
                    <h3 className="jobTitle">{j.title}</h3>
                    <div className="company">{companyNice}</div>

                    <div className="metaRow">
                      <span className="chip">{loc}</span>
                      {isRemote(j) && <span className="chip chipBrand">Remote</span>}
                      {src && <span className="chip">{src}</span>}
                      {pay && <span className="chip chipBrand">Pay: {pay}</span>}
                    </div>
                  </div>

                  {j.url ? (
                    <a className="button" href={j.url} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : null}
                </div>

                <div className="cardBottom">
                  <div className="small">{date ? `Posted ${date}` : ""}</div>
                  <div className="small">
                    {j.job_type ? j.job_type : ""}
                    {j.job_type && j.employment_type ? " • " : ""}
                    {j.employment_type ? j.employment_type : ""}
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && filtered.length > PAGE_SIZE && (
            <div className="pagination">
              <button className="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={pageSafe <= 1}>
                Prev
              </button>
              <button className="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={pageSafe >= totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

