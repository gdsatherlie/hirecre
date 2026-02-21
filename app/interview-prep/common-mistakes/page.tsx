export const metadata = {
  title: "Interview Prep | HireCRE",
  description:
    "Lender-grade commercial real estate interview prep: bridge lending, debt yield, underwriting walkthroughs, sponsor risk, and mini-case practice.",
};

type PrepCard = {
  title: string;
  description: string;
  href: string;
};

const PREP_CARDS: PrepCard[] = [
  {
    title: "Bridge Lending Interview Questions",
    description:
      "Real prompts + what they’re testing: sizing, exit risk, sponsor evaluation, and structure.",
    href: "/interview-prep/bridge-lending-questions",
  },
  {
    title: "Debt Yield Explained (With Example)",
    description:
      "How lenders actually use debt yield for sizing, what NOI to use, and how it ties to exit risk.",
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
      "A practical scorecard: liquidity vs exposure, track record, ops bench, concentration, and red flags.",
    href: "/interview-prep/sponsor-risk-analysis",
  },
  {
    title: "CRE Mini Case Practice",
    description:
      "A mock deal + a 60–90 second model answer that sounds senior and credit-focused.",
    href: "/interview-prep/mini-case-practice",
  },

  // ✅ new pages
  {
    title: "Loan Sizing Cheat Sheet",
    description:
      "A one-page way to size to debt yield, DSCR, and LTV — and explain which constraint binds.",
    href: "/interview-prep/loan-sizing-cheat-sheet",
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
    title: "Debt Origination Questions (Broker Call)",
    description:
      "The exact questions to ask a broker: business plan, economics, sponsor, diligence, and timing.",
    href: "/interview-prep/broker-questions",
  },
  {
    title: "Credit Memo Template (1 Page)",
    description:
      "A simple lender-style writeup format you can use in interviews or take-home cases.",
    href: "/interview-prep/credit-memo-template",
  },
  {
    title: "Common Mistakes (and How to Avoid Them)",
    description:
      "The interview traps: mixing NOI definitions, sloppy exit caps, ignoring timing risk, and more.",
    href: "/interview-prep/common-mistakes",
  },
];

function PrepSection({ title, items }: { title: string; items: PrepCard[] }) {
  return (
    <section className="mt-12">
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
          Lender-grade interview prep for commercial real estate roles — focused on
          bridge lending, underwriting judgment, sponsor risk, and how to talk through
          deals clearly under pressure.
        </p>
      </header>

      <PrepSection title="🧠 Interview Prep Hub" items={PREP_CARDS} />

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="font-semibold text-slate-900">Want weekly CRE roles + prep?</div>
        <div className="mt-2 text-sm text-slate-600">
          Get top jobs and short technical prompts delivered weekly.
        </div>
        <a
          href="/alerts"
          className="mt-4 inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          Subscribe to Alerts
        </a>
      </div>

      <div className="mt-12 text-xs text-slate-500">
        Note: This content is educational and general in nature. Always tailor your
        answers to the role, asset type, and the firm’s strategy.
      </div>
    </main>
  );
}
