export const metadata = {
  title: "Resources | HireCRE",
  description:
    "Commercial real estate career resources: modeling courses, certifications, and foundational books.",
};

export default function ResourcesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Advance Your Career in Commercial Real Estate
        </h1>
        <p className="text-lg text-gray-600">
          The tools, training, and resources top CRE professionals actually use.
        </p>
      </header>

      {/* Financial Modeling */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6">Financial Modeling Courses</h2>

        <div className="space-y-8">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Adventures in CRE</h3>
            <p className="text-gray-600 mb-4">
              Industry-standard CRE modeling training built by real estate private equity
              professionals. Highly practical for acquisitions, development, and debt roles.
            </p>
            <a
              href="YOUR_AICRE_AFFILIATE_LINK"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center font-medium"
            >
              Explore →
            </a>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Wall Street Prep</h3>
            <p className="text-gray-600 mb-4">
              Institutional modeling platform used by investment banks and real estate firms.
              Strong foundation for structured finance and REPE recruiting.
            </p>
            <a
              href="YOUR_WSP_AFFILIATE_LINK"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center font-medium"
            >
              Explore →
            </a>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6">
          Certifications &amp; Designations
        </h2>

        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">CCIM</h3>
          <p className="text-gray-600 mb-4">
            One of the most respected designations in commercial real estate—especially
            valuable for brokerage and investment sales, and helpful for long-term credibility.
          </p>
          <a
            href="YOUR_CCIM_LINK"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center font-medium"
          >
            Learn more →
          </a>
        </div>
      </section>

      {/* Books */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold mb-6">Foundational Books</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold mb-2">The Real Estate Game</h3>
            <p className="text-gray-600 mb-4">
              A behind-the-scenes look at how major real estate deals actually get done.
            </p>
            <a
              href="YOUR_AMAZON_LINK_1"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center font-medium"
            >
              View →
            </a>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Real Estate Finance and Investments</h3>
            <p className="text-gray-600 mb-4">
              The technical backbone of real estate finance. Dense, but foundational.
            </p>
            <a
              href="YOUR_AMAZON_LINK_2"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center font-medium"
            >
              View →
            </a>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Best Ever Apartment Syndication Book</h3>
            <p className="text-gray-600 mb-4">
              Practical breakdown of multifamily syndication and capital structuring.
            </p>
            <a
              href="YOUR_AMAZON_LINK_3"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center font-medium"
            >
              View →
            </a>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <p className="text-sm text-gray-400">
        Some links on this page are affiliate links. HireCRE may earn a commission at no
        additional cost to you.
      </p>
    </main>
  );
}
