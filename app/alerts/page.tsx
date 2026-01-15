"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type SavedSearch = {
  id: string;
  subscriber_email: string;
  q: string | null;
  state: string | null;
  company: string | null;
  source: string | null;
  remote_only: boolean;
  pay_only: boolean;
  is_enabled: boolean;
  last_checked_at: string | null;
  last_sent_at: string | null;
  created_at: string;
};

type Delivery = {
  id: string;
  subscriber_email: string;
  matched_count: number;
  status: string;
  created_at: string;
  sent_at: string | null;
  error: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function fmt(d?: string | null) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d;
  }
}

export default function AlertsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const userEmail = data.session?.user?.email ?? null;
      if (!userEmail) {
        router.push("/login");
        return;
      }
      setEmail(userEmail);

      await refresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function refresh() {
    setLoading(true);

    const { data: s, error: sErr } = await supabase
      .from("saved_searches")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (!sErr) setSearches((s ?? []) as SavedSearch[]);

    const { data: d, error: dErr } = await supabase
      .from("alert_deliveries")
      .select("id,subscriber_email,matched_count,status,created_at,sent_at,error")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!dErr) setDeliveries((d ?? []) as Delivery[]);

    setLoading(false);
  }

  async function toggleSearch(id: string, next: boolean) {
    setBusyId(id);
    const { error } = await supabase
      .from("saved_searches")
      .update({ is_enabled: next })
      .eq("id", id);

    setBusyId(null);
    if (!error) refresh();
  }

  async function deleteSearch(id: string) {
    if (!confirm("Delete this saved search?")) return;
    setBusyId(id);
    const { error } = await supabase.from("saved_searches").delete().eq("id", id);
    setBusyId(null);
    if (!error) refresh();
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
        <p className="mt-1 text-sm text-gray-600">
          Signed in as <span className="font-medium">{email ?? "…"}</span>
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">Saved Searches</div>
              <button
                onClick={refresh}
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="mt-4 text-sm text-gray-600">Loading…</div>
            ) : searches.length === 0 ? (
              <div className="mt-4 text-sm text-gray-600">
                No saved searches yet (you’ll add “Save this search” next).
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {searches.map((s) => (
                  <div key={s.id} className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900">
                          {s.state || "Any state"} • {s.company || "Any company"}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          q: {s.q || "—"} • source: {s.source || "—"} • remote:{" "}
                          {s.remote_only ? "yes" : "no"} • pay: {s.pay_only ? "yes" : "no"}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          last checked: {fmt(s.last_checked_at)} • last sent: {fmt(s.last_sent_at)}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <button
                          disabled={busyId === s.id}
                          onClick={() => toggleSearch(s.id, !s.is_enabled)}
                          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 disabled:opacity-50"
                        >
                          {s.is_enabled ? "Disable" : "Enable"}
                        </button>
                        <button
                          disabled={busyId === s.id}
                          onClick={() => deleteSearch(s.id)}
                          className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">Recent Deliveries</div>
            {loading ? (
              <div className="mt-4 text-sm text-gray-600">Loading…</div>
            ) : deliveries.length === 0 ? (
              <div className="mt-4 text-sm text-gray-600">No deliveries yet.</div>
            ) : (
              <div className="mt-4 space-y-3">
                {deliveries.map((d) => (
                  <div key={d.id} className="rounded-xl border border-gray-200 p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      {d.matched_count} jobs • {d.status}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">{d.subscriber_email}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      queued: {fmt(d.created_at)} • sent: {fmt(d.sent_at)}
                    </div>
                    {d.error ? (
                      <div className="mt-2 text-xs text-red-600">error: {d.error}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500">
          Next: we’ll add the “Save this search” button on the Jobs board so these populate automatically.
        </div>
      </div>
    </div>
  );
}
