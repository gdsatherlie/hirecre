# HireCRE

Next.js 14 + Supabase application powering [hirecre.com](https://hirecre.com).

HireCRE is a curated commercial real estate and proptech job board, plus a library of interview prep and underwriting resources written for institutional CRE candidates.

---

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript + React 18
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Postgres 17, Auth, Storage not used)
- **Email**: MailerLite (subscriber list), MailerSend (transactional sends)
- **Hosting**: Coolify (single-node VPS, Traefik, Let's Encrypt)
- **Analytics**: Google Tag Manager, Google AdSense

---

## Routes

### Public pages

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/board` | Job board (public, anon reads `public.jobs`) |
| `/jobs/[slug]` | Individual job detail page (SEO) |
| `/interview-prep` | Interview prep hub + 30+ concept explainers |
| `/resources` | Curated CRE resources |
| `/commercial-real-estate-career-guide` | Long-form SEO guide |
| `/commercial-real-estate-salary-guide` | Long-form SEO guide |
| `/cre-interview-questions` | Long-form SEO guide |
| `/acquisitions-analyst-real-estate` | Long-form SEO guide |
| `/about`, `/contact`, `/privacy`, `/terms` | Standard content pages |

### Auth-gated pages

| Route | Purpose |
|---|---|
| `/alerts` | Saved-search management (redirects to `/login` if signed out) |
| `/login`, `/signup` | Email + password auth via Supabase |

### API & redirects

| Route | Purpose |
|---|---|
| `/api/subscribe` | Newsletter signup → Supabase + MailerLite |
| `/api/track-click` | Click tracking (jobs, articles) |
| `/api/alerts` | Saved-search alert internals |
| `/api/mailerlite/subscribe-alerts` | Alerts opt-in → MailerLite group |
| `/r/a/[token]` | Short-link redirector for newsletter article links |

### Generated

- `/sitemap.xml` — built from active jobs via `app/sitemap.ts`
- `/jobs/sitemap.xml` — job-specific sitemap
- `/robots.txt` — via `app/robots.ts`

---

## ETL & scheduled jobs

All ETL runs as Coolify scheduled tasks (not inside the web container on boot). Each script is in `/scripts` and uses the `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` env vars.

| Script | Schedule | Status |
|---|---|---|
| `scripts/sync-greenhouse.mjs` | every 6h | ✓ |
| `scripts/sync-lever.mjs` | every 6h | ✓ |
| `scripts/sync-icims.mjs` | every 6h | ✓ |
| `scripts/fetch-market-signals.mjs` | daily 06:00 UTC | ✓ |
| `scripts/build-newsletter.mjs` + `send-newsletter.mjs` | Mondays 07:00 UTC | ⚠ currently failing |
| `scripts/run-saved-search-alerts.mjs` | daily 02:00 UTC | ⚠ currently failing |

The job scrapers read from plain-text allowlists in `/scripts`: `greenhouse_sources.txt`, `lever_sources.txt`, `icims_sources.txt`.

---

## Development

### Prerequisites

- Node 20+
- npm 10+
- A Supabase project (for local dev you can point at the production project using the anon key — writes are gated by RLS)

### Setup

```bash
git clone https://github.com/gdsatherlie/hirecre.git
cd hirecre
npm install
cp .env.example .env.local
# Fill in the Supabase URL + anon key at minimum.
npm run dev
```

### Useful scripts

```bash
npm run dev              # next dev on :3000
npm run build            # production build (standalone output)
npm run start            # next start on :3000
npm run lint             # next lint
npm run sync:greenhouse  # manually trigger the Greenhouse scrape
npm run alerts:run       # manually trigger saved-search alerts
```

---

## Deployment (Coolify)

This repo auto-deploys to `hirecre.com` on every push to `main` via a webhook from GitHub to the Coolify instance.

- **Build pack**: nixpacks (will migrate to a Dockerfile using `output: 'standalone'` — already set in `next.config.mjs`)
- **Port**: container exposes 3000
- **Healthcheck**: configured for `/` → 200
- **Env vars**: set in Coolify → Application → Environment Variables (see `.env.example` for the full list of keys)

### Scheduled tasks

Configure each ETL script as a Coolify scheduled task with the command `node scripts/<name>.mjs` and the schedule from the table above. Logs are visible per-task in the Coolify UI.

### Manual redeploy

From Coolify → Application page → **Redeploy**.

---

## Database

- Supabase migrations live in `/supabase/migrations`. Historical schema was created via the Supabase dashboard; today's snapshot plus forward-going changes are version-controlled SQL files.
- Row Level Security is enabled on all public tables.
- `pg_graphql`, `pgcrypto`, `uuid-ossp`, `pg_stat_statements`, and `supabase_vault` are the installed extensions.

---

## Project layout

```
app/              Routes (App Router)
  api/            Route handlers (server)
  board/          Job board page
  interview-prep/ Prep hub + 30+ concept pages
  jobs/           Individual job pages
  r/a/[token]/    Short-link redirector
components/       Shared React components
lib/
  supabaseClient.ts   Anon/public-key client (browser + public server reads)
  supabaseAdmin.ts    Service-role client (server-only, bypasses RLS)
newsletters/      Archived weekly newsletter HTML
public/           Static assets + ads.txt
scripts/          ETL + newsletter build/send + alerts
supabase/
  migrations/     Version-controlled schema changes
templates/        Newsletter HTML templates
```

---

## License

Private. Not for redistribution.
