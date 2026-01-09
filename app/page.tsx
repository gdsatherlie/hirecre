'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return;

    const supabase = createClient(url, anon);
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data?.user?.email ?? null);
    })();
  }, []);

  return (
    <div className="hc-page">
      <header className="hc-header">
        <div className="hc-header-inner">
          <Link href="/" className="hc-logo">
            HireCRE <span className="hc-pill">MVP</span>
          </Link>
          <nav className="hc-nav">
            <Link href="/" className="hc-navlink hc-navlink-active">Home</Link>
            <Link href="/board" className="hc-navlink">Jobs</Link>
            <Link href="/login" className="hc-navlink">Login</Link>
          </nav>
        </div>
      </header>

      <main className="hc-main">
        <section className="hc-hero">
          <h1>Commercial real estate jobs — in one clean feed</h1>
          <p>
            A simple CRE job board that aggregates roles from sources like Greenhouse. Filters that actually help.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
            <Link className="hc-btn" href="/board">Browse jobs</Link>
            <Link className="hc-pagebtn" href="/login">Login</Link>
            <Link className="hc-pagebtn" href="/signup">Create account</Link>
          </div>

          <div className="hc-stats" style={{ marginTop: 14 }}>
            {email ? (
              <span>You’re signed in as <strong>{email}</strong>. Go to <Link href="/board" style={{ color: 'var(--brand)', fontWeight: 700 }}>Jobs</Link>.</span>
            ) : (
              <span className="hc-muted">Login is optional for now (we can enforce it later if you want).</span>
            )}
          </div>
        </section>

        <section style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div className="hc-card">
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Clean filters</div>
            <div className="hc-muted">Company, state, category, source, and remote-only.</div>
          </div>
          <div className="hc-card">
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Fast scanning</div>
            <div className="hc-muted">Readable cards and quick “View job” actions.</div>
          </div>
          <div className="hc-card">
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Pay guidance</div>
            <div className="hc-muted">If salary appears in the listing, we surface it on the card.</div>
          </div>
        </section>
      </main>

      <footer className="hc-footer">
        <div className="hc-footer-inner">
          <span>HireCRE • Job board MVP</span>
          <span className="hc-muted">Built for: hirecre.com</span>
        </div>
      </footer>
    </div>
  );
}
