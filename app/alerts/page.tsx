"use client";

import React, { useEffect, useState } from "react";
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
  filters: any | null; // jsonb
  is_enabled: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

function fmtFilters(filters: any) {
  if (!filters || typeof filters !== "object") return "—";
  const parts: string[] = [];

  if (filters.q) parts.push(`q="${filters.q}"`);
  if (filters.state && filters.state !== "ALL") parts.push(`state=${filters.state}`);
  if (filters.company && filters.company !== "ALL") parts.push(`company=${filters.company}`);
  if (filters.source && filters.source !== "ALL") parts.push(`source=${filters.source}`);
  if (filters.remoteOnly) parts.push("remoteOnly");
  if (filters.payOnly) parts.push("payOnly");

  return parts.length ? parts.join(" • ") : "No filters";
}

export default function AlertsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<SavedSearch[]>([]);
  const [msg, setMsg] = useState<string>("");

  async function requireAuth() {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user?.id) {
      router.push("/login");
      return null;
    }
    return user;
  }

  async function load() {
    setLoading(true);
    setMsg("");

    const user = await requireAuth();
    if (!user) return;

    const { data, error } = await supabase
      .from("saved_searches")
      .select("id,user_id,user_email,name,filters,is_enabled,created_at,updated_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMsg(error.message || "Failed to load saved searches.");
      setRows([]);
    } else {
      setRows((data ?? []) as SavedSearch[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleEnabled(id: string, next: boolean) {
    setMsg("");
    const user = await requireAuth();
    if (!user) return;

    // optimistic UI
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, is_enabled: next } : r)));

    const { error } = await supabase
      .from("saved_searches")
      .update({ is_enabled: next })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      // revert if failed
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, is_enabled: !next } : r)));
      setMsg(error.message || "Update failed.");
    }
  }

  async function deleteSearch(id: string) {
    setMsg("");
    const user = await requireAuth();
    if (!user) return;

    const ok = window.confirm("Delete this saved search? This cannot be undone.");
    if (!ok) return;

    // optimistic UI
    const before = rows;
    setRows((prev) => prev.filter((r) => r.id !== id));

    const { error } = await supabase
      .from("saved_searches")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      setRows(before);
      setMsg(error.message || "Delete failed.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your saved searches and turn email alerts on/off.
            </p>
          </div>

          <button
            onClick={() => router.push("/board")}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Back to Jobs
          </button>
        </div>

        {msg ? (
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700">
            {msg}
          </div>
        ) : null}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">
            Saved searches
          </div>

          {loading ? (
            <div className="px-4 py-6 text-sm text-gray-600">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-600">
              No saved searches yet. Go to Jobs and click “Save this search”.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {rows.map((r) => (
                <div key={r.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {r.name || "My search"}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {fmtFilters(r.filters)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={Boolean(r.is_enabled)}
                        onChange={(e) => toggleEnabled(r.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      Enabled
                    </label>

                    <button
                      onClick={() => deleteSearch(r.id)}
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

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
          Next step: wire the nightly script to read only <span className="font-semibold">enabled</span> searches,
          find new matching jobs since last_run_at, send emails, then update last_run_at.
        </div>
      </div>
    </div>
  );
}
