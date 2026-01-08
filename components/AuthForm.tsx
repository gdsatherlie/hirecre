"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setMessage("Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in hosting.");
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Check your email to confirm your account, then log in.");
        router.push("/login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/board");
      }
    } catch (err: any) {
      setMessage(err?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ maxWidth: 520 }}>
      <div style={{ fontWeight: 800, fontSize: 20 }}>
        {mode === "signup" ? "Create your account" : "Log in"}
      </div>
      <div className="spacer" />

      <label className="label">Email</label>
      <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" type="email" required />

      <div className="spacer" />

      <label className="label">Password</label>
      <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" required />

      <div className="spacer" />

      <button className="btn" disabled={loading}>
        {loading ? "Working..." : mode === "signup" ? "Sign up" : "Login"}
      </button>

      <div className="spacer" />

      {message ? <div className="small">{message}</div> : null}

      <hr className="hr" />
      <div className="small">
        {mode === "signup" ? (
          <>Already have an account? <a className="badge" href="/login">Login</a></>
        ) : (
          <>New here? <a className="badge" href="/signup">Create an account</a></>
        )}
      </div>
    </form>
  );
}
