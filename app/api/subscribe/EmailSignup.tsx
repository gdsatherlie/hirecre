"use client";
import { useState } from "react";

export default function EmailSignup({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit() {
    setStatus("loading");
    setMsg("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.ok) {
      setStatus("done");
      setMsg("You’re in. Weekly alerts coming soon.");
      setEmail("");
      return;
    }
    setStatus("error");
    setMsg(data?.error || "Something went wrong.");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">Job Alerts</div>
      <div className="mt-1 text-sm text-slate-600">
        Get a weekly email with the best CRE + proptech roles.
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={submit}
          disabled={status === "loading"}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {status === "loading" ? "Adding…" : "Get alerts"}
        </button>
      </div>
      {msg ? (
        <div className={`mt-2 text-sm ${status === "error" ? "text-red-600" : "text-slate-600"}`}>
          {msg}
        </div>
      ) : null}
    </div>
  );
}
