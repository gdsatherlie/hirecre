'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      router.push('/board');
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="hc-page">
      <header className="hc-header">
        <div className="hc-header-inner">
          <Link href="/" className="hc-logo">HireCRE</Link>
          <nav className="hc-nav">
            <Link href="/" className="hc-navlink">Home</Link>
            <Link href="/board" className="hc-navlink">Jobs</Link>
            <Link href="/login" className="hc-navlink hc-navlink-active">Login</Link>
          </nav>
        </div>
      </header>

      <main className="hc-main" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="hc-card" style={{ width: 'min(520px, 100%)' }}>
          <h1 style={{ margin: 0, fontSize: 22, letterSpacing: '-0.02em' }}>Log in</h1>
          <p className="hc-muted" style={{ marginTop: 6 }}>Access saved features later. For now, it just keeps things tidy.</p>

          <form onSubmit={onSubmit} style={{ marginTop: 14, display: 'grid', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Email</label>
              <input className="hc-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Password</label>
              <input className="hc-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>

            {err ? <div style={{ color: '#b91c1c', fontWeight: 600 }}>{err}</div> : null}

            <button className="hc-btn" disabled={busy || !email || !password} type="submit">
              {busy ? 'Signing in…' : 'Sign in'}
            </button>

            <div className="hc-muted" style={{ fontSize: 13 }}>
              No account? <Link href="/signup" style={{ color: 'var(--brand)', fontWeight: 700 }}>Create one</Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="hc-footer">
        <div className="hc-footer-inner">
        </div>
      </footer>
    </div>
  );
}

