export const metadata = {
  title: "Resources | HireCRE",
  description:
    "Commercial real estate career resources: modeling courses, certifications, and foundational books.",
};

function Card({
  title,
  body,
  href,
  cta = "Explore",
}: {
  title: string;
  body: string;
  href: string;
  cta?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>

      <div className="mt-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
        >
          {cta} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
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
          A short, curated list of training and reading that actually helps with recruiting,
          interviews, and on-the-job performance in commercial real estate.
        </p>
      </header>

      {/* SECTION: COURSES */}
      <section className="mb-12">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Financial Modeling Courses
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Best for acquisitions, development, and debt roles.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="Adventures in CRE"
            body="Industry-standard CRE modeling training built by real estate private equity professionals. Practical and role-relevant."
            href="YOUR_AICRE_AFFILIATE_LINK"
            cta="Explore"
          />

          <Card
            title="Wall Street Prep"
            body="Institutional modeling platform used by investment banks and real estate firms. Great if you're targeting more structured finance roles."
            href="YOUR_WSP_AFFILIATE_LINK"
            cta="Explore"
          />
        </div>
      </section>

      {/* SECTION: CERTIFICATIONS */}
      <section className="mb-12">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Certifications & Designations
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Credibility builders (especially relevant for brokerage and investment sales).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="CCIM"
            body="One of the most respected designations in commercial real estate—useful for long-term credibility and technical foundation."
            href="YOUR_CCIM_LINK"
            cta="Learn more"
          />
        </div>
      </section>

      {/* SECTION: BOOKS */}
      <section className="mb-10">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">Foundational Books</h2>
          <p className="mt-1 text-sm text-slate-600">
            The short list: practical + foundational.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="The Real Estate Game"
            body="A behind-the-scenes look at how major real estate deals actually get done."
            href="YOUR_AMAZON_LINK_1"
            cta="View"
          />
          <Card
            title="Real Estate Finance and Investments"
            body="The technical backbone of real estate finance. Dense, but foundational."
            href="YOUR_AMAZON_LINK_2"
            cta="View"
          />
          <Card
            title="Best Ever Apartment Syndication Book"
            body="Practical breakdown of multifamily syndication and capital structuring."
            href="YOUR_AMAZON_LINK_3"
            cta="View"
          />
        </div>
      </section>

      {/* DISCLOSURE */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs leading-5 text-slate-500">
          Some links on this page are affiliate links. HireCRE may earn a commission at no
          additional cost to you.
        </p>
      </div>
    </main>
  );
}
