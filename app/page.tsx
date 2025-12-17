import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">HireCRE</p>
      <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl">
        Curated commercial real estate jobs without the noise.
      </h1>
      <p className="text-lg text-slate-700">
        Explore handpicked roles across acquisitions, asset management, development, leasing, capital markets, and more. Updated directly from our Google Sheet source.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="/jobs"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800"
        >
          View open roles
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-primary hover:border-primary"
        >
          About HireCRE
        </Link>
      </div>
    </section>
  );
}
