import Link from "next/link";

export const metadata = {
  title: "Commercial Real Estate Career Guide | HireCRE",
  description:
    "A practical CRE career guide that maps roles to the capital stack and deal cycle so you can choose the right seat.",
};

const toc = [
  ["Capital stack map", "capital-stack-map"],
  ["Deal cycle map", "deal-cycle-map"],
  ["Role selection framework", "role-selection-framework"],
  ["What to learn first", "what-to-learn-first"],
  ["How to interview", "how-to-interview"],
  ["FAQ", "faq"],
];

export default function CommercialRealEstateCareerGuidePage() {
  return (
    <main className="bg-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Career Guide</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            The clearest way to choose a CRE career: start with the capital stack and the deal cycle.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            Most people pick a title first and ask questions later. That is backwards. In commercial real
            estate, your long-term fit is mostly defined by two things: where you sit in the capital stack
            and which part of the deal cycle you spend your week in.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>CRE roles make more sense when you map them to risk position, not job titles.</li>
            <li>Senior debt, mezz, preferred equity, and common equity each attract different temperaments.</li>
            <li>Origination, underwriting, execution, and asset management are distinct daily workflows.</li>
            <li>A role can sound exciting but still be a mismatch if your preferred cadence is different.</li>
            <li>Early-career comp upside follows judgment, not spreadsheet speed alone.</li>
            <li>Interview preparation should demonstrate how you process uncertainty and make decisions.</li>
          </ul>
        </section>

        <nav className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">In this guide</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {toc.map(([label, id]) => (
              <li key={id}>
                <a className="text-blue-700 hover:text-blue-800 hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-10 space-y-10 leading-7">
          <section id="capital-stack-map" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) Capital stack map: your risk seat defines your mindset</h2>
            <p>
              A fast way to reduce career confusion is to ask, “What happens to me when a deal goes wrong?”
              If the answer is “I get paid first,” you are likely debt-oriented. If the answer is “I only
              win after everyone else is covered,” you are likely in common equity.
            </p>
            <p>
              This is not just a legal distinction. It shapes every conversation you have, every model you
              build, and every blind spot you must manage. Debt professionals obsess over downside coverage.
              Equity professionals spend more time on upside creation and business-plan conviction.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Lower risk seats</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Senior lender underwriting: DSCR, debt yield, collateral quality.</li>
                  <li>Bank credit roles: policy discipline, downside scenarios, covenants.</li>
                  <li>Agency lending execution: process rigor and documentation precision.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Higher risk seats</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Acquisitions equity: entry basis, value-creation plan, exit optionality.</li>
                  <li>Development: entitlement, construction, lease-up, capital markets timing.</li>
                  <li>Opportunistic funds: thesis quality under uncertainty and volatility.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="deal-cycle-map" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) Deal cycle map: workflow preference beats prestige</h2>
            <p>
              A second filter is cadence. Some people love sourcing and relationship building. Others want
              structured analysis. Others enjoy post-close execution where real operators create value.
              All are valid, but they require different energy and communication styles.
            </p>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Checklist: where do you do your best work?</h3>
              <ul className="mt-3 space-y-2">
                <li>□ I like ambiguity and outbound hustle → sourcing / originations.</li>
                <li>□ I like controlled analysis and memos → underwriting / acquisitions.</li>
                <li>□ I like execution and accountability → asset management.</li>
                <li>□ I like long cycles and coordination → development management.</li>
              </ul>
            </div>
            <p>
              Candidates often misread the glamour of deals. The real question is not whether a platform is
              “top tier,” but whether your weekly tasks align with your temperament. Sustained excellence is
              usually boredom-resistant consistency in the right workflow.
            </p>
          </section>

          <section id="role-selection-framework" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) Role selection framework: match risk appetite to daily operating rhythm</h2>
            <p>
              Use a simple scorecard before recruiting. Rate yourself from 1 to 5 on risk tolerance, desire
              for client interaction, patience for process, and preference for long versus short feedback
              loops. Then compare that profile with actual role demands, not role descriptions.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Debt underwriting seat:</strong> best for structured thinkers who enjoy precision,
                policy discipline, and downside-first argumentation.
              </li>
              <li>
                <strong>Acquisitions seat:</strong> best for people who can combine analytical rigor with
                conviction under imperfect information.
              </li>
              <li>
                <strong>Asset management seat:</strong> best for pragmatic operators who like post-close
                accountability and cross-functional coordination.
              </li>
              <li>
                <strong>Development seat:</strong> best for builders who tolerate long timelines, high
                uncertainty, and multi-stakeholder complexity.
              </li>
            </ul>
            <p>
              This framework also clarifies exits. A debt analyst can move to credit funds or structured
              finance. An acquisitions analyst can move to principal investing or portfolio strategy. The key
              is understanding which judgment muscles you are actually building.
            </p>
          </section>

          <section id="what-to-learn-first" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) What to learn first: sequence matters more than volume</h2>
            <p>
              Early-career candidates over-collect technical topics. A better strategy is to learn in an
              order that compounds: property cash flow mechanics first, financing constraints second,
              investment committee logic third.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Foundation stack</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>NOI bridge, rent roll, T-12, and capex framing.</li>
                  <li>Debt sizing: DSCR, debt yield, LTV, amortization impacts.</li>
                  <li>Core returns: cash-on-cash, IRR, equity multiple.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Decision stack</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>What can break this deal first?</li>
                  <li>Which assumptions are fragile versus defensible?</li>
                  <li>What is the no-regret action if uncertainty persists?</li>
                </ul>
              </div>
            </div>
            <p>
              If you can articulate this sequence clearly, employers infer coachability. They trust that you
              will not only learn faster but also prioritize what matters under deadlines.
            </p>
          </section>

          <section id="how-to-interview" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5) How to interview: present yourself as a decision maker in training</h2>
            <p>
              Interviews in CRE reward candidates who translate raw numbers into a clear recommendation.
              Don’t just answer formulas. Explain why a metric changes your level of comfort and what action
              you would take next.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Mini interview script</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-6">
                <li>State the deal objective in one sentence.</li>
                <li>Identify the two assumptions that drive most of the return.</li>
                <li>Describe one downside scenario and one mitigation.</li>
                <li>Make a recommendation and define what could change your view.</li>
              </ol>
            </div>
            <p>
              That structure works across lending, acquisitions, and development. It signals that you can
              communicate with senior people who care about speed, clarity, and calibrated judgment.
            </p>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["Is acquisitions always the best starting role?", "No. It is excellent for broad investing exposure, but debt or asset management can build stronger downside and operating judgment early on."],
                ["Can I move from banking to equity later?", "Yes. Many candidates move after proving they can underwrite risk and communicate an investment view, not just process transactions."],
                ["Do I need Argus before interviewing?", "Helpful but not mandatory for every seat. Understand cash flow logic first, then layer software skills."],
                ["What matters more: market knowledge or modeling speed?", "Judgment. Modeling is a tool; hiring teams look for candidates who know what assumptions deserve skepticism."],
                ["Is brokerage experience useful for principal-side roles?", "Very. Sourcing reps and market pulse can be a major edge if paired with disciplined underwriting."],
                ["How do I stand out without direct CRE experience?", "Use a deal memo format in interviews and show how you reason through risk, structure, and execution tradeoffs."],
                ["Should I optimize for title or platform quality?", "Platform quality and manager quality usually matter more in the first five years than title optimization."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-lg border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900">{q}</h3>
                  <p className="mt-1 text-sm leading-6">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Continue on HireCRE</h2>
          <p className="mt-2 leading-7">
            Keep building your edge with practical resources, interview drills, and open roles.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/resources">
              Explore Resources
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/interview-prep">
              Practice Interview Prep
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/jobs">
              Browse Jobs
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
