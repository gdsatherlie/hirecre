-- Security hardening applied against the live database on 2026-04-20.
-- These statements were executed directly; this file records them so
-- the changes are version-controlled and can be re-applied to any
-- future Supabase environment.
--
-- Covers Supabase linter findings:
--   - rls_policy_always_true (email_subscribers UPDATE)
--   - rls_disabled_in_public (sources, job_exclusion_rules)
--   - security_definer_view (most_clicked_jobs_7d*)
--   - duplicate_index (jobs_slug_uidx)
--   - plus manual cleanup of an overlapping jobs SELECT policy.

-- 1. Remove the anon UPDATE policy on email_subscribers.
-- The previous policy USING (true) WITH CHECK (true) let any anon
-- client overwrite any row. Writes should happen server-side via
-- the service role.
drop policy if exists public_update_email_subscribers on public.email_subscribers;

-- 2. Enable RLS on two tables that were exposed to PostgREST without
-- row security. No policies are added => zero API access for anon /
-- authenticated roles; service_role (ETL scripts) still reads/writes.
alter table public.sources enable row level security;
alter table public.job_exclusion_rules enable row level security;

-- 3. Views that aggregated click counts were SECURITY DEFINER, which
-- bypasses RLS. Recreate as SECURITY INVOKER so future RLS changes
-- on click_events / jobs are respected.
alter view public.most_clicked_jobs_7d set (security_invoker = on);
alter view public.most_clicked_jobs_7d_details set (security_invoker = on);

-- 4. Drop the overly broad jobs SELECT policy for authenticated users.
-- The remaining "Public can read active jobs" policy (is_active = true)
-- applies to both anon and authenticated and is the intended behavior.
drop policy if exists jobs_read_authenticated on public.jobs;

-- 5. Drop the duplicate unique index on jobs.slug. jobs_slug_unique
-- is retained. jobs_slug_uidx was functionally identical.
drop index if exists public.jobs_slug_uidx;
