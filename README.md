# HireCRE MVP

Minimal Next.js + Supabase Auth job board.

## Environment variables (set in Coolify)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Routes
- `/` landing page
- `/signup`
- `/login`
- `/board` (requires login; pulls rows from `public.jobs`)
