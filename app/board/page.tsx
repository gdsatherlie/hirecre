"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Job = {
  id: string;
  title: string;
  company: string;
  location_city: string | null;
  location_state: string | null;
  location_raw: string | null;
  job_type: string | null;
  employment_type: string | null;
  url: string | null;
  posted_at: string | null;
  created_at: string;
  source?: string | null;
};

function fmtLocation(j: Job) {
  if (j.location_city && j.location_state) return `${j.location_city}, ${j.location_state}`;
  if (j.location_raw) return j.location_raw;
  return "—";
}

function fmtDate(d: string | null) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default function BoardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // UI filters
  const [q, setQ] = useState("");
  const [company, setCompany] = useState<string>("All");
  const [state, setState] = useState<string>("All");
  const [remoteOnly, setRemoteOnly] = useState(false);

  // pagination
  const PAGE_SIZE = 25;
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        // auth check
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const session = sessionData.session;
        if (!session) {
          router.push("/login");
          return;
        }
        setUserEmail(session.user.email ?? null);

        // Try to load only active jobs if the column exists.
        // If your DB doesn't have is_active yet, we fall back automatically.
        const baseSelect =
          "id,title,company,location_city,location_state,location_raw,job_type,employment_type,url,posted_at,created_at,source";

        // Attempt with is_active filter
        let res = await supabase
          .from("jobs")
          .select(baseSelect)
          // If you added is_active, this keeps the board clean.
          // If not, we’ll catch and retry without it.
          .eq("is_active", true as any)
          .order("posted_at", { ascending: false, nullsFirst: false })
          .limit(750);

        if (res.error) {
          // Retry without is_active filter (older schema)
          res = await supabase
            .from("jobs")
            .select(baseSelect)
            .order("posted_at", { ascending: false, nullsFirst: false })
            .limit(750);
        }

        if (res.error) throw res.error;

        setJobs((res.data ?? []) as Job[]);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const companies = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) {
      const c = (j.company ?? "").trim();
      if (c) set.add(c);
    }
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [jobs]);

  const states = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) {
      const s = (j.location_state ?? "").trim();
      if (s) set.add(s);
    }
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [jobs]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    const out = jobs.filter((j) => {
      if (company !== "All" && j.company !== company) return false;
      if (state !== "All" && (j.location_state ?? "") !== state) return false;

      if (remoteOnly) {
        const raw = (j.location_raw ?? "").toLowerCase();
        const city = (j.location_city ?? "").toLowerCase();
        if (!raw.includes("remote") && !city.includes("remote")) return false;
      }

      if (!query) return true;

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

      return hay.includes(query);
    });

    return out;
  }, [jobs, q, company, state, remoteOnly]);

  // reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [q, company, state, remoteOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);

  const paged = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageSafe]);

  return (
    <div className="page">
      <div className="boardHeader">
        <div className="boardHeaderTop">
          <div>
            <div className="pageTitle">Jobs</div>
            <div className="subTitle">
              Signed in as <span className="mono">{userEmail ?? "—"}</span>
            </div>
          </div>

          <div className="row" style={{ gap: 10 }}>
            <button className="btn secondary" onClick={() => window.location.reload()}>
              Refresh
            </button>
            <button className="btn secondary" onClick={logout}>
              Log out
            </button>
          </div>
        </div>

        <div className="toolbar">
          <div className="toolbarRow">
            <input
              className="input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, company, location…"
            />

            <select className="select" value={company} onChange={(e) => setCompany(e.target.value)}>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All companies" : c}
                </option>
              ))}
            </select>

            <select className="select" value={state} onChange={(e) => setState(e.target.value)}>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All states" : s}
                </option>
              ))}
            </select>

            <label className="check">
              <input type="checkbox" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} />
              Remote only
            </label>

            <div className="pill">
              {loading ? "Loading…" : `${filtered.length.toLocaleString()} jobs`}
            </div>
          </div>

          {error ? (
            <div className="errorBox">
              <div className="errorTitle">Couldn’t load jobs</div>
              <div className="errorText">{error}</div>
              <div className="errorText">
                If this is new setup: confirm Supabase env vars + that the `jobs` table exists.
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="jobGrid">
        {loading ? (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="jobCard skeleton" />
            ))}
          </>
        ) : paged.length === 0 ? (
          <div className="emptyCard">
            <div className="emptyTitle">No results</div>
            <div className="emptyText">Try clearing filters or searching different keywords.</div>
          </div>
        ) : (
          paged.map((j) => (
            <div key={j.id} className="jobCard">
              <div className="jobTop">
                <div className="jobTitle">{j.title}</div>
                <div className="jobMeta">
                  <span className="tag">{j.company}</span>
                  <span className="tag">{fmtLocation(j)}</span>
                  {j.job_type ? <span className="tag subtle">{j.job_type}</span> : null}
                  {j.employment_type ? <span className="tag subtle">{j.employment_type}</span> : null}
                  {j.source ? <span className="tag subtle">{j.source}</span> : null}
                </div>
              </div>

              <div className="jobBottom">
                <div className="small">Posted {fmtDate(j.posted_at || j.created_at)}</div>
                {j.url ? (
                  <a className="applyBtn" href={j.url} target="_blank" rel="noreferrer">
                    Apply →
                  </a>
                ) : (
                  <span className="small">No link</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && filtered.length > 0 ? (
        <div className="pagination">
          <button className="btn secondary" disabled={pageSafe <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            ← Prev
          </button>

          <div className="small">
            Page <span className="mono">{pageSafe}</span> of <span className="mono">{totalPages}</span>
          </div>

          <button
            className="btn secondary"
            disabled={pageSafe >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next →
          </button>
        </div>
      ) : null}
    </div>
  );
}
