export const metadata = {
  title: "Interview Prep Sitemap | HireCRE",
  description:
    "A complete index of HireCRE's commercial real estate interview prep pages across debt, equity, acquisitions, asset management, development, leasing, and property operations.",
};

type LinkItem = {
  title: string;
  description: string;
  href: string;
};

const DEBT: LinkItem[] = [
  {
    title: "Bridge Lending Interview Questions",
    description: "Real prompts + what they’re testing: sizing, exit risk, sponsor evaluation, and structure.",
    href: "/interview-prep/bridge-lending-questions",
  },
  {
  title: "DSCR vs Debt Yield (With Example)",
  description: "Clear explanation + interview-ready example you can repeat.",
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
    description: "How lenders use debt yield for sizing, which NOI to use, and how it ties to exit risk.",
    href: "/interview-prep/debt-yield-explained",
  },
  
  {
    title: "Walk Me Through Your Underwriting",
    description: "A lender-grade script: deal story → NOI build → sizing → exit → risks → structure.",
    href: "/interview-prep/underwriting-walkthrough",
  },
  {
    title: "Evaluating Sponsor Risk",
    description: "A practical scorecard: liquidity vs exposure, track record, ops bench, concentration, red flags.",
    href: "/interview-prep/sponsor-risk-analysis",
  },
  {
    title: "Exit Underwriting (Refi + Sale)",
    description: "How to underwrite the takeout: stressed cap rates, takeout DSCR, and refinance proceeds.",
    href: "/interview-prep/exit-underwriting",
  },
  {
    title: "Risk & Structure Playbook",
    description: "Match the risk to the protection: reserves, cash management, milestones, covenants, guarantees.",
    href: "/interview-prep/risk-and-structure",
  },
  {
    title: "Loan Sizing Cheat Sheet",
    description: "Size to debt yield, DSCR, and LTV — and explain which constraint binds.",
    href: "/interview-prep/loan-sizing-cheat-sheet",
  },
  {
    title: "Debt Origination Questions (Broker Call)",
    description: "The exact questions to ask: business plan, economics, sponsor, diligence, timing.",
    href: "/interview-prep/broker-questions",
  },
  {
    title: "Credit Memo Template (1 Page)",
    description: "A clean lender-style writeup you can use in interviews or take-home cases.",
    href: "/interview-prep/credit-memo-template",
  },
  {
    title: "Common Mistakes (and How to Avoid Them)",
    description: "Interview traps: NOI definitions, exit caps, timing risk, generic structure.",
    href: "/interview-prep/common-mistakes",
  },
];

const EQUITY: LinkItem[] = [
  {
    title: "REPE Interview Questions",
    description: "Deal judgment, IC thinking, downside cases, and how to communicate conviction.",
    href: "/interview-prep/repe-interview-questions",
  },
  {
    title: "Equity Returns 101 (IRR vs MOIC)",
    description: "How to explain returns like a human: time, risk, and what drives value.",
    href: "/interview-prep/equity-returns-101",
  },
  {
    title: "Equity Waterfall Basics",
    description: "Preferred return, catch-up, promote tiers — explained clearly.",
    href: "/interview-prep/equity-waterfall-basics",
  },
  {
  title: "Preferred Return (With 8% Example)",
  description:
    "What an 8% pref actually means, how it works in the waterfall, and how to explain it cleanly in interviews.",
  href: "/interview-prep/preferred-return",
},
];

const AM: LinkItem[] = [
  {
    title: "Acquisitions Interview Questions",
    description: "Thesis, underwriting haircuts, downside, pricing, and decision-making.",
    href: "/interview-prep/acquisitions-interview-questions",
  },
  {
    title: "Asset Management Interview Questions",
    description: "NOI bridges, leasing plans, KPIs, variance analysis, and execution.",
    href: "/interview-prep/asset-management-interview-questions",
  },
  {
    title: "Rent Roll + T-12 Deep Dive",
    description: "What to scan first: rollover risk, concessions, bad debt, and expense normalization.",
    href: "/interview-prep/rent-roll-t12-deep-dive",
  },
];

const DEV: LinkItem[] = [
  {
    title: "Development Interview Questions",
    description: "Feasibility, entitlements, budgets, timelines, financing, and risk management.",
    href: "/interview-prep/development-interview-questions",
  },
  {
    title: "Construction Budget 101",
    description: "Hard vs soft costs, contingency, GMP, change orders, and draws.",
    href: "/interview-prep/construction-budget-101",
  },
  {
    title: "Development Returns (Yield-on-Cost)",
    description: "Yield-on-cost, spread to market cap, margin, and financeability.",
    href: "/interview-prep/development-returns-yoc",
  },
];

const LEASING_OPS: LinkItem[] = [
  {
    title: "Leasing Interview Questions",
    description: "Pipeline, comps, concessions, tenant strategy, and negotiation.",
    href: "/interview-prep/leasing-interview-questions",
  },
  {
    title: "Brokerage Interview Questions",
    description: "Sourcing, relationships, market knowledge, and deal execution.",
    href: "/interview-prep/brokerage-interview-questions",
  },
  {
    title: "Property Management Interview Questions",
    description: "Operations + NOI drivers: collections, expenses, vendors, and reporting.",
    href: "/interview-prep/property-management-interview-questions",
  },
];

function Section({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.href}
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

export default function InterviewPrepSitemapPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Interview Prep Sitemap
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          A complete index of HireCRE interview prep pages, organized by role track.
          Use this to browse, bookmark, or share.
        </p>
      </header>

      <Section title="🏦 Debt & Credit" items={DEBT} />
      <Section title="📈 Equity & Investments" items={EQUITY} />
      <Section title="🏢 Acquisitions & Asset Management" items={AM} />
      <Section title="🏗️ Development & Construction" items={DEV} />
      <Section title="🤝 Leasing, Brokerage & Property Ops" items={LEASING_OPS} />

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="font-semibold text-slate-900">Back to the hub</div>
        <div className="mt-2 text-sm text-slate-600">
          Prefer the curated hub experience?
        </div>
        <a
          href="/interview-prep"
          className="mt-4 inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          Go to Interview Prep Hub
        </a>
      </div>
    </main>
  );
}
