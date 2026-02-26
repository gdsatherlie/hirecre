export const metadata = {
  title: "Resources | HireCRE",
  description:
    "Commercial real estate books, technical tools, certifications, research, and career resources.",
};

type Resource = {
  title: string;
  description: string;
  href: string;
  affiliate?: boolean;
};

const INTERVIEW: Resource[] = [
  {
    title: "CRE Interview Prep Hub",
    description:
      "Role-based prep across debt, equity, acquisitions, asset management, development, leasing, and operations.",
    href: "/interview-prep",
  },
];

const BOOKS: Resource[] = [
  {
    title: "The Real Estate Game",
    description:
      "A behind-the-scenes look at how major real estate deals actually get done.",
    href: "https://www.amazon.com/dp/068485550X?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Real Estate Finance and Investments",
    description:
      "Foundational CRE finance: underwriting, valuation, capital structure.",
    href: "https://www.amazon.com/dp/B0D49YF7LK?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Commercial Real Estate Analysis & Investments",
    description:
      "Institutional-grade analysis of leases, pro formas, risk, and valuation.",
    href: "https://www.amazon.com/dp/0324305486?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Real Estate Market Analysis",
    description:
      "Market-level analysis and demand modeling for CRE professionals.",
    href: "https://www.amazon.com/dp/0874204283?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Best Ever Apartment Syndication Book",
    description:
      "Practical multifamily deal structuring and capital raising.",
    href: "https://www.amazon.com/dp/0997454326?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Anatomy of Mortgage Loan Documents",
    description:
      "Understanding and negotiating key commercial loan documents.",
    href: "https://www.amazon.com/dp/1639051120?tag=hirecre-20",
    affiliate: true,
  },
  const DEBT_AND_CREDIT: Resource[] = [
  {
    title: "Commercial Mortgages 101 (CREFC)",
    description: "Straightforward overview of CMBS and commercial mortgage markets.",
    href: "https://www.amazon.com/dp/0470521474?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "The Handbook of Mortgage-Backed Securities",
    description: "Deep dive into MBS/CMBS structure, cashflows, and risk.",
    href: "https://www.amazon.com/dp/0071594943?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "The 100 Most Important Things You Need to Know About the Real Estate Market",
    description: "Good macro + market intuition for interviews and investing.",
    href: "https://www.amazon.com/dp/0071802791?tag=hirecre-20",
    affiliate: true,
  },
];
const INVESTING_AND_PE: Resource[] = [
  {
    title: "Real Estate Finance & Investments (Brueggeman/Fisher) – Print",
    description: "The classic. Strong interview foundation and reference book.",
    href: "https://www.amazon.com/dp/1260473720?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "The Millionaire Real Estate Investor",
    description: "Practical framework for evaluating deals and building conviction.",
    href: "https://www.amazon.com/dp/0071446375?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "The Intelligent Investor",
    description: "Timeless investing principles; great for IRR/underwriting mindset.",
    href: "https://www.amazon.com/dp/0060555661?tag=hirecre-20",
    affiliate: true,
  },
];
const MODELING: Resource[] = [
  {
    title: "Adventures in CRE (A.CRE)",
    description:
      "Free institutional-quality Excel models and technical tutorials.",
    href: "https://www.adventuresincre.com/",
  },
  {
    title: "REFM Real Estate Modeling",
    description: "Professional real estate financial modeling training.",
    href: "https://www.refm.com/",
  },
  {
    title: "Break Into CRE",
    description: "Technical interview prep and modeling courses.",
    href: "https://breakintocre.com/",
  },
  {
    title: "Wall Street Prep – Real Estate Modeling",
    description: "Institutional real estate financial modeling certification.",
    href: "https://www.wallstreetprep.com/",
  },
  {
    title: "ARGUS Enterprise",
    description:
      "Industry-standard commercial real estate underwriting software.",
    href: "https://www.altusgroup.com/argus/",
  },
];

const CERTIFICATIONS: Resource[] = [
  {
    title: "CCIM Institute",
    description: "Commercial real estate investment designation.",
    href: "https://www.ccim.com/",
  },
  {
    title: "NAIOP Education",
    description: "Commercial real estate development & investment programs.",
    href: "https://www.naiop.org/",
  },
  {
    title: "Urban Land Institute (ULI)",
    description: "Global real estate development and land use organization.",
    href: "https://uli.org/",
  },
];

const RESEARCH: Resource[] = [
  {
    title: "NAREIT",
    description: "Public REIT data, performance metrics, and research.",
    href: "https://www.reit.com/",
  },
  {
    title: "CBRE Research",
    description: "Global commercial real estate research reports.",
    href: "https://www.cbre.com/insights",
  },
  {
    title: "JLL Research",
    description: "Commercial property market research and analysis.",
    href: "https://www.us.jll.com/en/trends-and-insights/research",
  },
  {
    title: "Trepp",
    description: "CMBS data, debt analytics, and credit performance.",
    href: "https://www.trepp.com/",
  },
];

function Section({ title, items }: { title: string; items: Resource[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isInternal =
            item.href.startsWith("/") || item.href.startsWith("#");

          return (
            <a
              key={item.title}
              href={item.href}
              target={isInternal ? undefined : "_blank"}
              rel={
                isInternal
                  ? undefined
                  : item.affiliate
                  ? "noopener noreferrer nofollow"
                  : "noopener noreferrer"
              }
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="font-semibold text-slate-900">{item.title}</div>
              <div className="mt-2 text-sm text-slate-600">
                {item.description}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Commercial Real Estate Resources
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Books, modeling tools, certifications, research, and career
          preparation resources for commercial real estate professionals.
        </p>
      </header>

       <Section title="📝 Interview & Career Prep" items={INTERVIEW} />
      <Section title="📚 Foundational Books" items={BOOKS} />
      <Section title="💳 CRE Debt & Credit" items={DEBT_AND_CREDIT} />
<Section title="🏢 Real Estate Investing & Private Equity" items={INVESTING_AND_PE} />
      <Section title="🧮 Modeling & Technical Training" items={MODELING} />
      <Section title="🎓 Certifications & Education" items={CERTIFICATIONS} />
      <Section title="📊 Research & Market Data" items={RESEARCH} />
    

      <div className="mt-12 text-xs text-slate-500">
        Disclosure: Some links on this page are affiliate links. HireCRE may
        earn a commission at no additional cost to you. As an Amazon Associate, HireCRE earns from qualifying purchases. 
      </div>
    </main>
  );
}
