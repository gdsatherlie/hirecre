'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

type Job = {
  id: string;
  title: string;
  company: string;
  location_city?: string | null;
  location_state?: string | null;
  location_raw?: string | null;
  job_type?: string | null;
  employment_type?: string | null;
  url: string;
  posted_at?: string | null;
  created_at?: string | null;
  source?: string | null;
  description?: string | null;
  pay?: string | null; // optional if you later add a DB column
};

const PAGE_SIZE = 25;

// ---- State name -> abbreviation (includes DC) ----
const STATE_TO_ABBR: Record<string, string> = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

function normalizeSpace(s: string) {
  return s.replace(/\s+/g, ' ').trim();
}

function stripHtml(html: string) {
  return normalizeSpace(html.replace(/<[^>]*>/g, ' '));
}

function toTitleCase(input: string) {
  const s = normalizeSpace(input.toLowerCase());
  // Keep common small words lower unless first
  const small = new Set(['and', 'or', 'the', 'of', 'to', 'in', 'at', 'for', 'a', 'an']);
  return s
    .split(' ')
    .map((w, i) => {
      if (!w) return w;
      if (i !== 0 && small.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

const COMPANY_OVERRIDES: Record<string, string> = {
  bgeinc: 'BGE, Inc.',
  homelight: 'HomeLight',
  figure: 'FIGURE',
  extenteam: 'ExtenTeam',
  // add more overrides as you see weird ones
};

function formatCompany(raw: string) {
  const key = normalizeSpace(raw).toLowerCase().replace(/[^a-z0-9]/g, '');
  if (COMPANY_OVERRIDES[key]) return COMPANY_OVERRIDES[key];

  // If it looks like a slug (no spaces), try to title-case it anyway
  const cleaned = normalizeSpace(raw);

  // Preserve acronyms
  const words = cleaned
    .replace(/[_-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => {
      const up = w.toUpperCase();
      if (up === 'LLC' || up === 'LP' || up === 'LLP' || up === 'INC' || up === 'CO' || up === 'REIT') return up;
      if (w.length <= 3 && w === up) return up; // short acronyms
      // If the word is all-caps and longer, keep it (e.g. "JLL")
      if (w === up && w.length <= 5) return up;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });

  return words.join(' ');
}

function normalizeStateToAbbr(state: string | null | undefined): string | null {
  if (!state) return null;
  const s = normalizeSpace(state);

  // Already 2-letter?
  if (/^[A-Za-z]{2}$/.test(s)) return s.toUpperCase();

  // Common cases like "CA " or "California "
  const asAbbr = STATE_TO_ABBR[s];
  if (asAbbr) return asAbbr;

  // Sometimes stored as lowercase
  const match = Object.keys(STATE_TO_ABBR).find((k) => k.toLowerCase() === s.toLowerCase());
  if (match) return STATE_TO_ABBR[match];

  return s; // fallback (won’t break UI)
}

function isRemote(job: Job) {
  const raw = (job.location_raw || '').toLowerCase();
  const city = (job.location_city || '').toLowerCase();
  const state = (job.location_state || '').toLowerCase();
  return raw.includes('remote') || city.includes('remote') || state.includes('remote');
}

function fmtLocation(job: Job) {
  if (isRemote(job)) return 'Remote';
  const city = job.location_city ? normalizeSpace(job.location_city) : '';
  const st = normalizeStateToAbbr(job.location_state);
  if (city && st) return `${city}, ${st}`;
  if (job.location_raw) return normalizeSpace(job.location_raw);
  return '—';
}

function fmtDate(d: string | null | undefined) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

// Try to extract pay guidance if not stored in a column
function extractPay(job: Job): string | null {
  if (job.pay && normalizeSpace(job.pay)) return normalizeSpace(job.pay);

  const text = job.description ? stripHtml(job.description) : '';
  if (!text) return null;

  // Patterns like "Pay: $150,000-$180,000" or "$150,000 - $180,000"
  const payLabel = text.match(/(?:Pay|Salary|Compensation)\s*:\s*([^\n\r]{3,80})/i);
  if (payLabel?.[1]) return normalizeSpace(payLabel[1]).slice(0, 80);

  const range = text.match(/\$\s?\d{2,3}(?:,\d{3})+(?:\s?(?:–|-)\s?\$\s?\d{2,3}(?:,\d{3})+)?(?:\s?\/\s?(?:yr|year|hr|hour))?/i);
  if (range?.[0]) return normalizeSpace(range[0]).slice(0, 80);

  // “401k” etc is not pay guidance; ignore
  return null;
}

export default function BoardPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [q, setQ] = useState('');
  const [company, setCompany] = useState('ALL');
  const [stateAbbr, setStateAbbr] = useState('ALL');
  const [category, setCategory] = useState('ALL');
  const [source, setSource] = useState('ALL');
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anon) {
      setError('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
      setLoading(false);
      return;
    }

    const supabase = createClient(url, anon);

    (async () => {
      setLoading(true);
      setError(null);
      try {
        // Pull a big batch for client-side filtering (simple + reliable)
        const { data, error: qErr } = await supabase
          .from('jobs')
          .select(
            'id,title,company,location_city,location_state,location_raw,job_type,employment_type,url,posted_at,created_at,source,description,pay'
          )
          .order('posted_at', { ascending: false })
          .range(0, 4999);

        if (qErr) throw qErr;
        setJobs((data || []) as Job[]);
      } catch (e: any) {
        setError(e?.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Build dropdown options from all jobs (not filtered)
  const companyOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) if (j.company) set.add(formatCompany(j.company));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const stateOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) {
      const ab = normalizeStateToAbbr(j.location_state);
      if (ab && /^[A-Z]{2}$/.test(ab)) set.add(ab);
    }
    return Array.from(set).sort();
  }, [jobs]);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) if (j.job_type) set.add(normalizeSpace(j.job_type));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const sourceOptions = useMemo(() => {
    const set = new Set<string>();
    for (const j of jobs) if (j.source) set.add(normalizeSpace(j.source));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const filtered = useMemo(() => {
    const query = normalizeSpace(q).toLowerCase();

    const matchesText = (j: Job) => {
      if (!query) return true;
      const hay = [
        j.title,
        j.company ? formatCompany(j.company) : '',
        j.location_city || '',
        normalizeStateToAbbr(j.location_state) || '',
        j.location_raw || '',
        j.job_type || '',
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(query);
    };

    const matchesCompany = (j: Job) => {
      if (company === 'ALL') return true;
      return formatCompany(j.company || '') === company;
    };

    const matchesState = (j: Job) => {
      if (stateAbbr === 'ALL') return true;
      const ab = normalizeStateToAbbr(j.location_state);
      return ab === stateAbbr;
    };

    const matchesCategory = (j: Job) => {
      if (category === 'ALL') return true;
      return normalizeSpace(j.job_type || '') === category;
    };

    const matchesSource = (j: Job) => {
      if (source === 'ALL') return true;
      return normalizeSpace(j.source || '') === source;
    };

    const matchesRemote = (j: Job) => {
      if (!remoteOnly) return true;
      return isRemote(j);
    };

    const out = jobs.filter(
      (j) =>
        matchesText(j) && matchesCompany(j) && matchesState(j) && matchesCategory(j) && matchesSource(j) && matchesRemote(j)
    );

    return out;
  }, [jobs, q, company, stateAbbr, category, source, remoteOnly]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);

  useEffect(() => {
    // If filters shrink results, snap to page 1
    setPage(1);
  }, [q, company, stateAbbr, category, source, remoteOnly]);

  const pageJobs = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  return (
    <div className="hc-page">
      <header className="hc-header">
        <div className="hc-header-inner">
          <Link href="/" className="hc-logo">
            HireCRE <span className="hc-pill">MVP</span>
          </Link>
          <nav className="hc-nav">
            <Link href="/" className="hc-navlink">
              Home
            </Link>
            <Link href="/board" className="hc-navlink hc-navlink-active">
              Jobs
            </Link>
          </nav>
        </div>
      </header>

      <main className="hc-main">
        <section className="hc-hero">
          <h1>Find a job in commercial real estate</h1>
          <p>
            Search across curated sources (starting with Greenhouse). Clean filters. Fast scanning. No fluff.
          </p>

          <div className="hc-filters">
            <div className="hc-filter">
              <label>What</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, company, location…"
                className="hc-input"
              />
            </div>

            <div className="hc-filter">
              <label>Company</label>
              <select value={company} onChange={(e) => setCompany(e.target.value)} className="hc-select">
                <option value="ALL">All companies</option>
                {companyOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="hc-filter">
              <label>State</label>
              <select value={stateAbbr} onChange={(e) => setStateAbbr(e.target.value)} className="hc-select">
                <option value="ALL">All states</option>
                {stateOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="hc-filter">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="hc-select">
                <option value="ALL">All categories</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="hc-filter">
              <label>Source</label>
              <select value={source} onChange={(e) => setSource(e.target.value)} className="hc-select">
                <option value="ALL">All sources</option>
                {sourceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="hc-filter hc-filter-remote">
              <label>&nbsp;</label>
              <label className="hc-check">
                <input type="checkbox" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} />
                Remote only
              </label>
            </div>
          </div>

          <div className="hc-stats">
            {loading ? (
              <span>Loading…</span>
            ) : error ? (
              <span className="hc-error">{error}</span>
            ) : (
              <span>
                Showing <strong>{filtered.length.toLocaleString()}</strong> jobs
              </span>
            )}
          </div>
        </section>

        <section className="hc-results">
          {pageJobs.map((j) => {
            const pay = extractPay(j);
            return (
              <article key={j.id} className="hc-card">
                <div className="hc-card-top">
                  <div className="hc-card-title">
                    <a href={j.url} target="_blank" rel="noreferrer" className="hc-titlelink">
                      {j.title}
                    </a>
                    <div className="hc-company">{formatCompany(j.company)}</div>
                  </div>

                  <div className="hc-badges">
                    {pay ? <span className="hc-badge hc-badge-pay">{pay}</span> : null}
                    {isRemote(j) ? <span className="hc-badge">Remote</span> : null}
                    {j.source ? <span className="hc-badge">{normalizeSpace(j.source)}</span> : null}
                  </div>
                </div>

                <div className="hc-meta">
                  <span>{fmtLocation(j)}</span>
                  {j.job_type ? <span>• {normalizeSpace(j.job_type)}</span> : null}
                  {(j.posted_at || j.created_at) ? <span>• Posted {fmtDate(j.posted_at || j.created_at)}</span> : null}
                </div>

                <div className="hc-card-actions">
                  <a className="hc-btn" href={j.url} target="_blank" rel="noreferrer">
                    View job
                  </a>
                </div>
              </article>
            );
          })}

          {!loading && !error && filtered.length === 0 ? (
            <div className="hc-empty">No jobs match these filters.</div>
          ) : null}

          {!loading && !error && filtered.length > 0 ? (
            <div className="hc-pagination">
              <button className="hc-pagebtn" onClick={() => setPage(1)} disabled={safePage === 1}>
                « First
              </button>
              <button className="hc-pagebtn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}>
                ‹ Prev
              </button>

              <span className="hc-pages">
                Page <strong>{safePage}</strong> of <strong>{pageCount}</strong>
              </span>

              <button
                className="hc-pagebtn"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={safePage === pageCount}
              >
                Next ›
              </button>
              <button className="hc-pagebtn" onClick={() => setPage(pageCount)} disabled={safePage === pageCount}>
                Last »
              </button>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="hc-footer">
        <div className="hc-footer-inner">
          <span>HireCRE • Job board MVP</span>
          <span className="hc-muted">Sources: Greenhouse (for now)</span>
        </div>
      </footer>
    </div>
  );
}
