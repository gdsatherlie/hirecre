create table if not exists public.email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

alter table public.email_subscribers enable row level security;

drop policy if exists "email_subscribers_insert_public" on public.email_subscribers;

create policy "email_subscribers_insert_public"
on public.email_subscribers
for insert
to anon, authenticated
with check (true);
