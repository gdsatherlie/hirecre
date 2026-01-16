"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type SavedSearch = {
  id: string;
  user_id: string | null;

  q: string | null;
  state: string | null;
  company: string | null;
  source: string | null;

  remote_only: boolean | null;
  pay_only: boolean | null;
  is_enabled: boolean | null;

  created_at: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function labelFor(row: SavedSearch) {
  const parts: string[] = [];
  if (row.q) parts.push(`"${row.q}"`);
  if (row.company) parts.push(row.company);
  if (row.state) parts.push(row.state);
  if (row.source) parts.push(row.source);
  if (row.remote_only) parts.push("Remote");
  if (row.pay_only) parts.push("Pay");
  return parts.length ? parts.join(" • ") : "All jobs";
}

export default function AlertsPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<SavedSearch[]>([]);
  const [err, setErr] = useState<string>("");

  // 1) auth gate
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session?.user?.email ?? null;
      const uid = data.session?.user?.id ?? null;

      if (!email || !uid) {
        router.push("/login");
        return;
      }

      setUserEmail(email);
      setUserId(uid);
    })();
  }, [router]);

  // 2) load saved searches
  async function load(uid: string) {
    setLoading(true);
    setErr("");
    try {
      const { data, error } = await supabase
        .from("saved_searches")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRows((data ?? []) as SavedSearch[]);
    } catch (e: any) {
      setRows([]);
      setErr(e?.message ?? "Failed to load saved searches.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userId) return;
    load(userId);
  }, [userId]);

  // 3) toggle enabled
  async function toggleEnabled(id: string, next: boolean) {
    setErr("");

    // optimistic UI
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, is_enabled: next } : r)));

    const { error } = await supabase
      .from("saved_searches")
      .update({ is_enabled: next })
      .eq("id", id);

    if (error) {
      // rollback
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, is_enabled: !next } : r)));
      setErr(error.message || "Failed to update.");
    }
  }

  // 4) delete search
  async function deleteRow(id: string) {
    const ok = window.confirm("Delete this saved search?");
    if (!ok) return;

    setErr("");
    const before = rows;
    setRows((prev) => prev.filter((r) => r.id !== id));

    const { error } = await supabase.from("saved_searches").delete().eq("id", id);

    if (error) {
      setRows(before);
      setErr(error.message || "Failed to delete.");
    }
  }

  const enabledCount = useMemo(() => rows.filter((r) => !!r.is_enabled).length, [rows]);

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
            <div className="mt-1 text-sm text-gray-600">
              Signed in as <span className="font-medium">{userEmail ?? "…"}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{enabledCount}</span> enabled
          </div>
        </div>

        {err ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4">
            <div className="text-sm font-semibold text-gray-900">Your saved searches</div>
            <div className="mt-1 text-sm text-gray-600">
              Toggle alerts on/off. (Email sending comes next.)
            </div>
          </div>

          {loading ? (
            <div className="p-5 text-sm text-gray-600">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="p-5 text-sm text-gray-600">
              No saved searches yet. Go to <span className="font-semibold">Jobs</span> and click{" "}
              <span className="font-semibold">Save this search</span>.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {rows.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-gray-900">
                      {labelFor(r)}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {r.created_at ? `Saved ${new Date(r.created_at).toLocaleDateString()}` : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={!!r.is_enabled}
                        onChange={(e) => toggleEnabled(r.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      Enabled
                    </label>

                    <button
                      onClick={() => deleteRow(r.id)}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Next step: a nightly job reads enabled searches and emails matches.
        </div>
      </div>
    </div>
  );
}
