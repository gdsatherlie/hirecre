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
};

function fmtLocation(j: Job) {
  if (j.location_city && j.location_state) return `${j.location_city}, ${j.location_state}`;
  if (j.location_raw) return j.location_raw;
  return "—";
}

export default function BoardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((j) =>
      [j.title, j.company, j.location_city ?? "", j.location_state ?? "", j.location_raw ?? "", j.job_type ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [jobs, query]);

  useEffect(() => {
    (async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const session = sessionData.session;
        if (!session) {
          router.push("/login");
          return;
        }
        setUserEmail(session.user.email ?? null);

        const { data, error } = await supabase
          .from("jobs")
          .select("id,title,company,location_city,location_state,location_raw,job_type,employment_type,url,posted_at,created_at")
          .order("posted_at", { ascending: false, nullsFirst: false })
          .limit(200);

        if (error) throw error;
        setJobs((data ?? []) as Job[]);
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

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>Job Board</div>
            <div className="small">Signed in as {userEmail ?? "—"}</div>
          </div>
          <div className="row">
            <button className="btn secondary" onClick={logout}>Log out</button>
          </div>
        </div>

        <div className="spacer" />

        <div className="row" style={{ gap: 10 }}>
          <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, company, location..." />
          <span className="badge">{filtered.length} jobs</span>
        </div>

        {error ? (
          <>
            <div className="spacer" />
            <div className="small">Error: {error}</div>
            <div className="spacer" />
            <div className="small">
              If this is your first time: make sure you created a user, confirmed email (if required), and added env vars in hosting.
            </div>
          </>
        ) : null}
      </div>

      <div className="card">
        {loading ? (
          <div className="small">Loading…</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "38%" }}>Role</th>
                <th style={{ width: "20%" }}>Company</th>
                <th style={{ width: "18%" }}>Location</th>
                <th style={{ width: "12%" }}>Type</th>
                <th style={{ width: "12%" }}>Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((j) => (
                <tr key={j.id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{j.title}</div>
                    <div className="small">{j.posted_at ? new Date(j.posted_at).toLocaleDateString() : ""}</div>
                  </td>
                  <td>{j.company}</td>
                  <td>{fmtLocation(j)}</td>
                  <td className="small">{j.job_type ?? j.employment_type ?? "—"}</td>
                  <td>
                    {j.url ? (
                      <a className="badge" href={j.url} target="_blank" rel="noreferrer">Apply</a>
                    ) : (
                      <span className="small">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="small">No jobs yet. Next step is adding an importer/scraper to fill the table.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
