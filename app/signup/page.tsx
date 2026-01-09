'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      if (error) throw error;

      setMsg('Account created. If email confirmation is enabled, check your inbox. Then log in.');
      router.push('/login');
    } catch (e: any) {
      setErr(e?.message || 'Signup failed');
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
            <Link href="/login" className="hc-navlink">Login</Link>
          </nav>
        </div>
      </header>

      <main className="hc-main" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="hc-card" style={{ width: 'min(520px, 100%)' }}>
          <h1 style={{ margin: 0, fontSize: 22, letterSpacing: '-0.02em' }}>Create account</h1>
          <p className="hc-muted" style={{ marginTop: 6 }}>Optional now — useful later for saved jobs and alerts.</p>

          <form onSubmit={onSubmit} style={{ marginTop: 14, display: 'grid', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Email</label>
              <input className="hc-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>Password</label>
              <input className="hc-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
              <div className="hc-muted" style={{ fontSize: 12, marginTop: 6 }}>
                Use at least 8 characters.
              </div>
            </div>

            {err ? <div style={{ color: '#b91c1c', fontWeight: 600 }}>{err}</div> : null}
            {msg ? <div style={{ color: '#065f46', fontWeight: 600 }}>{msg}</div> : null}

            <button className="hc-btn" disabled={busy || !email || password.length < 8} type="submit">
              {busy ? 'Creating…' : 'Create account'}
            </button>

            <div className="hc-muted" style={{ fontSize: 13 }}>
              Already have an account? <Link href="/login" style={{ color: 'var(--brand)', fontWeight: 700 }}>Log in</Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="hc-footer">
        <div className="hc-footer-inner">
          <span>HireCRE • Job board MVP</span>
          <span className="hc-muted">Auth: Supabase</span>
        </div>
      </footer>
    </div>
  );
}
