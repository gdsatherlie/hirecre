-- Add covering indexes for foreign-key constraints flagged by the
-- Supabase performance advisor. Foreign-key columns without a
-- covering index force sequential scans on JOINs and cascading
-- updates/deletes. Low-cost writes, big read-side win at scale.

create index if not exists alert_deliveries_run_id_idx
  on public.alert_deliveries (run_id);

create index if not exists alert_deliveries_search_id_idx
  on public.alert_deliveries (search_id);

create index if not exists saved_search_alerts_job_id_idx
  on public.saved_search_alerts (job_id);
