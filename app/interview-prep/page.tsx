export const metadata = {
  title: "CRE Interview Prep | HireCRE",
  description:
    "Commercial real estate interview prep: technical questions, underwriting concepts, key formulas, and how to think in a CRE interview.",
};

type QA = {
  q: string;
  a: string;
  bullets?: string[];
};

const TECH_QA: QA[] = [
  {
    q: "Walk me through underwriting a commercial real estate deal.",
    a: "Give a structured, repeatable process. Interviewers want to see how you think: assumptions → NOI → cap rates/DCF → financing → returns → sensitivity → risks.",
    bullets: [
      "Market & thesis: submarket, supply/demand, rent growth, exit liquidity",
      "In-place cash flow: rent roll, reimbursements, recoveries, concessions",
      "Operating assumptions: expenses, taxes, insurance, capex, reserves",
      "NOI & unlevered value: cap rate and/or DCF; sanity-check comps",
      "Debt: proceeds, rate, DSCR, debt yield, covenants, amortization",
      "Levered returns: cash-on-cash, IRR, equity multiple",
      "Sensitivity: exit cap, rent growth, vacancy, capex, rate",
      "Risks & mitigants: leasing, rollover, sponsor execution, basis, refi",
    ],
  },
  {
    q: "Cap rate: what is it, and how does it move?",
    a: "Cap rate = NOI / Value. Higher cap rate means lower value (all else equal). Caps generally expand when rates rise, risk rises, or growth expectations fall.",
    bullets: [
      "Value = NOI / Cap Rate (quick math is expected)",
      "Cap rates reflect: risk-free rate, credit/spread, growth, liquidity",
      "Growing NOI can offset cap expansion (sometimes)",
    ],
  },
  {
    q: "IRR vs equity multiple vs cash-on-cash — when do they matter?",
    a: "IRR is time-weighted (timing matters). Equity multiple is total dollars back. Cash-on-cash is near-term yield. The right metric depends on strategy.",
    bullets: [
      "IRR can be ‘gamed’ by early distributions or quick sales",
      "Equity multiple is simple but ignores time",
      "Cash-on-cash is useful for stabilized assets and income focus",
    ],
  },
  {
    q: "Debt yield: what is it and why do lenders care?",
    a: "Debt yield = NOI / Loan Amount. It’s a lender’s 'unlevered yield' on their basis and doesn’t rely on cap rates or amortization assumptions.",
    bullets: [
      "Higher debt yield = more lender cushion",
      "Common in bridge/permanent sizing discussions",
      "Pairs well with DSCR for a full picture",
    ],
  },
  {
    q: "DSCR: what is it, and what’s a ‘good’ DSCR?",
    a: "DSCR = NOI / Debt Service. 'Good' depends on asset type, volatility, lease term, and lender. Stabilized assets tend to support lower DSCR than volatile ones.",
    bullets: [
      "Lenders size to DSCR and/or debt yield and/or LTV",
      "Watch IO periods: DSCR can look fine until amortization starts",
    ],
  },
  {
    q: "How do you think about exit cap rate in a model?",
    a: "Be conservative: use a spread over entry cap or apply a higher cap if rates/risk are rising. You should justify it with comps, rate environment, and liquidity.",
    bullets: [
      "Common approach: exit cap = entry cap + 25–75 bps (context matters)",
      "Exit cap is one of the biggest sensitivity drivers",
    ],
  },
];

const MODELING_SKILLS: { title: string; bullets: string[] }[] = [
  {
    title: "What you should be able to do in Excel (baseline)",
    bullets: [
      "Build a simple pro forma: rent → EGI → NOI → cash flow",
      "Model debt: loan sizing, IO vs amortization, DSCR, debt yield",
      "Calculate returns: IRR, equity multiple, cash-on-cash",
      "Create sensitivities: exit cap, rent growth, vacancy, rate",
      "Use core Excel tools: SUMIFS, XLOOKUP, IF, NPV/IRR, data tables",
    ],
  },
  {
    title: "Common modeling test traps",
    bullets: [
      "Hardcoding numbers instead of referencing assumptions",
      "Mixing annual and monthly periods incorrectly",
      "Forgetting lease-up downtime / free rent / TI/LC timing",
      "Exit math errors: using NOI with the wrong year or not annualized",
    ],
  },
];

const QUICK_FORMULAS: { label: string; formula: string; note?: string }[] = [
  { label: "Cap Rate", formula: "Cap Rate = NOI / Value" },
  { label: "Value", formula: "Value = NOI / Cap Rate" },
  { label: "Debt Yield", formula: "Debt Yield = NOI / Loan Amount" },
  { label: "DSCR", formula: "DSCR = NOI / Debt Service" },
  { label: "LTV", formula: "LTV = Loan Amount / Value" },
  { label: "Cash-on-Cash", formula: "CoC = Annual Cash Flow / Equity Invested" },
];

export default function InterviewPrepPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
          Interview prep
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          CRE Technical Interview Prep
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          A practical, no-fluff guide to the concepts and questions that show up
          in commercial real estate interviews — underwriting, valuation, debt,
          and returns.
        </p>
      </header>

      {/* Quick formulas */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Quick Formulas</h2>
        <p className="mt-1 text-sm text-slate-600">
          You should be able to say these out loud and do quick math on a whiteboard.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_FORMULAS.map((f) => (
            <div
              key={f.label}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-sm font-semibold text-slate-900">{f.label}</div>
              <div className="mt-1 font-mono text-sm text-slate-800">{f.formula}</div>
              {f.note ? (
                <div className="mt-1 text-xs text-slate-500">{f.note}</div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Q&A */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">High-Frequency Technical Questions</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Answer in a structured way. Interviewers don’t only care about the “right answer” —
          they care about whether your thinking is organized and defensible.
        </p>

        <div className="mt-6 space-y-5">
          {TECH_QA.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-base font-semibold text-slate-900">{item.q}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{item.a}</div>
              {item.bullets?.length ? (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Modeling skills */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Modeling Skills Checklist</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {MODELING_SKILLS.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-base font-semibold text-slate-900">{block.title}</div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {block.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Want this expanded?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Next additions that are worth doing: sample mini-case, lease rollover exercise,
          a simple DCF walkthrough, and a lender sizing example (DSCR + debt yield).
        </p>
      </section>
    </main>
  );
}
