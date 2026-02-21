export const metadata = {
  title: "Resources | HireCRE",
  description:
    "Curated commercial real estate career resources: foundational books and recommended learning.",
};

type Resource = {
  title: string;
  description: string;
  href: string;
  cta: string;
  badge?: string;
};

const BOOKS: Resource[] = [
  {
    title: "The Real Estate Game",
    description:
      "A behind-the-scenes look at how major real estate deals actually get done—smart, practical, and timeless.",
    href: "https://www.amazon.com/dp/068485550X?tag=hirecre-20",
    cta: "View on Amazon",
    badge: "Classic",
  },
  {
    title: "Real Estate Finance and Investments",
    description:
      "A technical backbone for real estate underwriting: cash flows, valuation, risk, and capital structure.",
    href: "https://www.amazon.com/dp/B0D49YF7LK?tag=hirecre-20",
    cta: "View on Amazon",
    badge: "Finance",
  },
  {
    title: "Commercial Real Estate Analysis & Investments",
    description:
      "The technical CRE bible: valuation, leases, pro formas, risk, and institutional-grade analysis.",
    href: "https://www.amazon.com/dp/0324305486?tag=hirecre-20",
    cta: "View on Amazon",
    badge: "Technical",
  },
  {
    title: "Real Estate Market Analysis",
    description:
      "Market, submarket, and demand analysis—how to think about location, drivers, and absorption like a pro.",
    href: "https://www.amazon.com/dp/0874204283?tag=hirecre-20",
    cta: "View on Amazon",
    badge: "Markets",
  },
  {
    title: "Best Ever Apartment Syndication Book",
    description:
      "Practical guide to multifamily syndication, deal structure, and raising capital—highly actionable.",
    href: "https://www.amazon.com/dp/0997454326?tag=hirecre-20",
    cta: "View on Amazon",
    badge: "Multifamily",
  },
  {
    title: "Anatomy of Mortgage Loan Documents",
    description:
      "Key commercial loan docs explained: terms, negotiation points, and what actually matters in the paper.",
    href: "https://www.amazon.com/dp/1639051120?tag=hirecre-20",
    cta: "View on Amazon",
    badge: "Loan Docs",
  },
];

function ResourceCard({ r }: { r: Resource }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-base font-semibold text-slate-900">{r.title}</div>
        {r.badge ? (
          <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
            {r.badge}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">{r.description}</p>

      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
        {r.cta}
        <span aria-hidden className="transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* HERO */}
      <header className="mb-10">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
          Career resources
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Resources used by top CRE professionals
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          A curated list of foundational reading. These are practical, high-signal
          recommendations for anyone recruiting, interviewing, or leveling up in
          commercial real estate.
        </p>
      </header>

      {/* BOOKS */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">Foundational Books</h2>
          <p className="mt-1 text-sm text-slate-600">
            Start here. These cover how deals work, how underwriting works, and how
            capital gets assembled.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKS.map((r) => (
            <ResourceCard key={r.title} r={r} />
          ))}
        </div>
      </section>

      {/* DISCLOSURE */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs leading-5 text-slate-500">
          Disclosure: Some links on this page are affiliate links. HireCRE may earn
          a commission at no additional cost to you.
        </p>
      </div>
    </main>
  );
}
