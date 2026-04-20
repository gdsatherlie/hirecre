-- Pin the search_path on every public function the Supabase linter
-- flagged as having a role-mutable search_path. Leaving it unset
-- opens a minor attack surface where a crafted schema-spoofing object
-- could intercept a call. Applied live on 2026-04-20.

alter function public.strip_html set search_path = public, extensions;
alter function public.set_updated_at set search_path = public, extensions;
alter function public.make_job_slug set search_path = public, extensions;
alter function public.set_job_slug set search_path = public, extensions;
alter function public.deactivate_removed_greenhouse_sources set search_path = public, extensions;
alter function public.slugify set search_path = public, extensions;
alter function public.event_trigger_fn set search_path = public, extensions;
