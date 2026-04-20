import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service role key.
 *
 * This client bypasses Row Level Security. NEVER import this module
 * from a "use client" file — the service role key must not be shipped
 * to the browser.
 *
 * Use this only inside:
 *   - app/api/**     (route handlers)
 *   - Server Components / Server Actions
 *   - scripts/**     (if consolidating ETL helpers later)
 */

let _client: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "supabaseAdmin() must only be called from server contexts where these env vars are present."
    );
  }

  _client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return _client;
}
