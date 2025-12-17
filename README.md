# HireCRE

Next.js App Router project for HireCRE (hirecre.com). This site lists commercial real estate roles sourced from a Google Sheet published as CSV.

## Tech stack
- Next.js (App Router, TypeScript)
- React 18
- Tailwind CSS

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the Google Sheet CSV URL in your environment:
   ```bash
   echo "JOBS_SHEET_URL=<https://your-sheet-url>" > .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Available scripts
- `npm run dev` – Start the development server.
- `npm run build` – Create a production build.
- `npm run start` – Start the production server.
- `npm run lint` – Lint the project.

## Deployment
Vercel will read the `JOBS_SHEET_URL` environment variable at build/runtime and fetch the latest active jobs directly from the published CSV.
