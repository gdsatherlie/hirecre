"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type SavedSearch = {
  id: string;
  user_id: string;
  user_email: string | null;
  name: string | null;
  filters: any; // jsonb
  remote_only: boolean | null;
  pay_only: boolean | null;
  is_enabled: boolean | null;
  last_run_at: string | null;
  created_at?: string | null;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}

function fmtDateTime(d?: string | null) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "—";
  }
}

export default function AlertsPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<SavedSearch[]>([]);
  const [msg, setMsg] = useState<string>("");

  async function load() {
    setLoading(true);
    setMsg("");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user?.id || !user?.email) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email);

      const { data, error } = await supabase
        .from("saved_searches")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRows((data ?? []) as SavedSearch[]);
    } catch (e: any) {
      setMsg(e?.message ?? "Failed to load alerts.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countEnabled = useMemo(
    () => rows.filter((r) => !!r.is_enabled).length,
    [rows]
  );

  async function toggleEnabled(id: string, nextVal: boolean) {
    if (!userId) return;

    setMsg("");
    const prev = rows;
    setRows((r) => r.map((x) => (x.id === id ? { ...x, is_enabled: nextVal } : x)));

    const { error } = await supabase
      .from("saved_searches")
      .update({ is_enabled: nextVal })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      setMsg(error.message || "Update failed.");
      setRows(prev);
    }
  }

  async function renameSearch(id: string) {
    if (!userId) return;

    const current = rows.find((r) => r.id === id)?.name ?? "My search";
    const name = window.prompt("Rename this search:", current || "My search");
    if (!name || !name.trim()) return;

    setMsg("");
    const prev = rows;
    setRows((r) => r.map((x) => (x.id === id ? { ...x, name: name.trim() } : x)));

    const { error } = await supabase
      .from("saved_searches")
      .update({ name: name.trim() })
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      setMsg(error.message || "Rename failed.");
      setRows(prev);
    }
  }

  async function deleteSearch(id: string) {
    if (!userId) return;

    const ok = window.confirm("Delete this saved search?");
    if (!ok) return;

    setMsg("");
    const prev = rows;
    setRows((r) => r.filter((x) => x.id !== id));

    const { error } = await supabase
      .from("saved_searches")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      setMsg(error.message || "Delete failed.");
      setRows(prev);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
            <div className="mt-1 text-sm text-gray-600">
              Signed in as <span className="font-medium">{userEmail ?? "…"}</span>
              <button
                onClick={signOut}
                className="ml-3 text-sm font-semibold text-blue-700 hover:underline"
              >
                Sign out
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Enabled: <span className="font-semibold text-gray-900">{countEnabled}</span> /{" "}
              <span className="font-semibold text-gray-900">{rows.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/board")}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Back to Jobs
            </button>
            <button
              onClick={load}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        </div>

        {msg ? <div className="mt-4 text-sm text-gray-700">{msg}</div> : null}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-sm text-gray-600">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">
              No saved searches yet. Go to the Jobs board and click “Save this search.”
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {rows.map((r) => {
                const f = r.filters ?? {};
                const q = f.q ?? null;
                const company = f.company ?? null;
                const state = f.state ?? null;
                const source = f.source ?? null;

                const remote = (r.remote_only ?? f.remote_only ?? false) as boolean;
                const pay = (r.pay_only ?? f.pay_only ?? false) as boolean;

                return (
                  <div key={r.id} className="p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="text-lg font-semibold text-gray-900">
                          {r.name || "Saved search"}
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {q ? <Pill>Query: {String(q)}</Pill> : <Pill>No query</Pill>}
                          {company ? <Pill>Company: {String(company)}</Pill> : <Pill>Any company</Pill>}
                          {state ? <Pill>State: {String(state)}</Pill> : <Pill>Any state</Pill>}
                          {source ? <Pill>Source: {String(source)}</Pill> : <Pill>Any source</Pill>}
                          {remote ? <Pill>Remote only</Pill> : <Pill>Remote: any</Pill>}
                          {pay ? <Pill>Pay shown</Pill> : <Pill>Pay: any</Pill>}
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          Last run: {fmtDateTime(r.last_run_at)}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={!!r.is_enabled}
                            onChange={(e) => toggleEnabled(r.id, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          Enabled
                        </label>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => renameSearch(r.id)}
                            className="text-sm font-semibold text-blue-700 hover:underline"
                          >
                            Rename
                          </button>
                          <button
                            onClick={() => deleteSearch(r.id)}
                            className="text-sm font-semibold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 text-xs text-gray-500">
          Next step after this: we’ll run a scheduled job that checks new postings and emails matches.
        </div>
      </div>
    </div>
  );
}
