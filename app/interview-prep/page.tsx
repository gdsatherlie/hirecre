export const metadata = {
  title: "Interview Prep | HireCRE",
  description:
    "Commercial real estate interview prep across debt, equity, acquisitions, asset management, development, leasing, brokerage, and property operations.",
};

type PrepCard = {
  title: string;
  description: string;
  href: string;
};

const DEBT: PrepCard[] = [
  {
    title: "Bridge Lending Interview Questions",
    description:
      "Real prompts + what they’re testing: sizing, exit risk, sponsor evaluation, and structure.",
    href: "/interview-prep/bridge-lending-questions",
  },
  {
  title: "DSCR vs Debt Yield (With Example)",
  description:
    "When each metric binds, how rates change DSCR, and how to explain it cleanly in interviews.",
  href: "/interview-prep/dscr-vs-debt-yield",
},
  {
  title: "Loan-to-Cost (LTC) (With Example)",
  description:
    "Cost-based leverage metric used in bridge and construction lending. Includes LTC vs LTV + purchase/reno example.",
  href: "/interview-prep/loan-to-cost-ltc",
},
  {
    title: "Debt Yield Explained (With Example)",
    description:
      "How lenders use debt yield for sizing, which NOI to use, and how it ties to exit risk.",
    href: "/interview-prep/debt-yield-explained",
  },
  {
    title: "Walk Me Through Your Underwriting",
    description:
      "A lender-grade script: deal story → NOI build → sizing → exit → risks → structure.",
    href: "/interview-prep/underwriting-walkthrough",
  },
  {
    title: "Evaluating Sponsor Risk",
    description:
      "A practical scorecard: liquidity vs exposure, track record, ops bench, concentration, red flags.",
    href: "/interview-prep/sponsor-risk-analysis",
  },
  {
    title: "Exit Underwriting (Refi + Sale)",
    description:
      "How to underwrite the takeout: stressed cap rates, takeout DSCR, and refinance proceeds.",
    href: "/interview-prep/exit-underwriting",
  },
  {
    title: "Risk & Structure Playbook",
    description:
      "Match the risk to the protection: reserves, cash management, milestones, covenants, guarantees.",
    href: "/interview-prep/risk-and-structure",
  },
  {
    title: "Loan Sizing Cheat Sheet",
    description:
      "Size to debt yield, DSCR, and LTV — and explain which constraint binds.",
    href: "/interview-prep/loan-sizing-cheat-sheet",
  },
  {
    title: "Debt Origination Questions (Broker Call)",
    description:
      "The exact questions to ask: business plan, economics, sponsor, diligence, timing.",
    href: "/interview-prep/broker-questions",
  },
  {
    title: "Credit Memo Template (1 Page)",
    description:
      "A clean lender-style writeup you can use in interviews or take-home cases.",
    href: "/interview-prep/credit-memo-template",
  },
  {
    title: "Common Mistakes (and How to Avoid Them)",
    description:
      "Interview traps: NOI definitions, exit caps, timing risk, generic structure.",
    href: "/interview-prep/common-mistakes",
  },
];

const EQUITY: PrepCard[] = [
  {
    title: "REPE Interview Questions",
    description:
      "Real estate private equity prompts: deal judgment, returns, IC thinking, and risk framing.",
    href: "/interview-prep/repe-interview-questions",
  },
  {
    title: "Equity Returns 101 (IRR vs MOIC)",
    description:
      "How to explain IRR, MOIC, cash-on-cash, and what they mean in practice.",
    href: "/interview-prep/equity-returns-101",
  },
  {
    title: "Equity Waterfall Basics",
    description:
      "Preferred return, promote, catch-up — explained clearly without spreadsheet vomit.",
    href: "/interview-prep/equity-waterfall-basics",
  },
  {
  title: "Preferred Return (With 8% Example)",
  description:
    "What an 8% pref actually means, how it works in the waterfall, and how to explain it cleanly in interviews.",
  href: "/interview-prep/preferred-return",
},
];

const AM: PrepCard[] = [
  {
    title: "Acquisitions Interview Questions",
    description:
      "How acquisitions teams think: story, underwriting, downside, comps, and conviction.",
    href: "/interview-prep/acquisitions-interview-questions",
  },
  {
    title: "Asset Management Interview Questions",
    description:
      "NOI bridges, leasing plans, KPIs, and how you actually manage value-add execution.",
    href: "/interview-prep/asset-management-interview-questions",
  },
  {
    title: "Rent Roll + T-12 Deep Dive",
    description:
      "What to look for fast: concessions, rollover risk, bad debt, expenses, and normalization.",
    href: "/interview-prep/rent-roll-t12-deep-dive",
  },
];

const DEV: PrepCard[] = [
  {
    title: "Development Interview Questions",
    description:
      "Entitlements, budgets, timelines, feasibility, and how developers talk returns.",
    href: "/interview-prep/development-interview-questions",
  },
  {
    title: "Construction Budget 101",
    description:
      "Hard vs soft costs, contingency, GMP, and the stuff that actually blows up deals.",
    href: "/interview-prep/construction-budget-101",
  },
  {
    title: "Development Returns (Yield-on-Cost)",
    description:
      "Yield-on-cost, spread to market cap, margin, and when a project is actually financeable.",
    href: "/interview-prep/development-returns-yoc",
  },
];

const LEASING_OPS: PrepCard[] = [
  {
    title: "Leasing Interview Questions",
    description:
      "Office/retail/industrial leasing prompts: pipeline, comps, concessions, and tenant strategy.",
    href: "/interview-prep/leasing-interview-questions",
  },
  {
    title: "Brokerage Interview Questions",
    description:
      "How to answer around sourcing, relationships, market knowledge, and deal execution.",
    href: "/interview-prep/brokerage-interview-questions",
  },
  {
    title: "Property Management Interview Questions",
    description:
      "Operations + NOI drivers: delinquencies, expenses, service levels, and reporting.",
    href: "/interview-prep/property-management-interview-questions",
  },
];

function TrackChips() {
  const chips = [
    { label: "Debt & Credit", href: "#debt" },
    { label: "Equity & Investments", href: "#equity" },
    { label: "Acquisitions & AM", href: "#am" },
    { label: "Development", href: "#dev" },
    { label: "Leasing / Brokerage / Ops", href: "#leasing" },
  ];

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {chips.map((c) => (
        <a
          key={c.href}
          href={c.href}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {c.label}
        </a>
      ))}
    </div>
  );
}

function PrepSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: PrepCard[];
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="font-semibold text-slate-900">{item.title}</div>
            <div className="mt-2 text-sm text-slate-600">{item.description}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function InterviewPrepHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          CRE Interview Prep
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Interview prep across the entire commercial real estate industry — debt,
          equity, acquisitions, asset management, development, leasing, brokerage,
          and property operations.
        </p>

        <TrackChips />
      </header>

      <PrepSection id="debt" title="🏦 Debt & Credit" items={DEBT} />
      <PrepSection id="equity" title="📈 Equity & Investments" items={EQUITY} />
      <PrepSection id="am" title="🏢 Acquisitions & Asset Management" items={AM} />
      <PrepSection id="dev" title="🏗️ Development & Construction" items={DEV} />
      <PrepSection
        id="leasing"
        title="🤝 Leasing, Brokerage & Property Ops"
        items={LEASING_OPS}
      />

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="font-semibold text-slate-900">
          Want weekly CRE roles + prep?
        </div>
        <div className="mt-2 text-sm text-slate-600">
          Get top jobs and short technical prompts delivered weekly.
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/alerts"
            className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Subscribe to Alerts
          </a>

          <a
            href="/interview-prep/sitemap"
            className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            View Interview Prep Sitemap
          </a>
        </div>
      </div>
    </main>
  );
}
