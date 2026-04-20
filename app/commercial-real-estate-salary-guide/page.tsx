import Link from "next/link";

export const metadata = {
  title: "Commercial Real Estate Salary Guide | HireCRE",
  description:
    "Understand CRE compensation by role, risk, and platform so you can negotiate with context.",
  alternates: { canonical: "/commercial-real-estate-salary-guide" },
};

const toc = [
  ["Compensation table", "comp-table"],
  ["What drives comp", "what-drives-comp"],
  ["How to use ranges in negotiation", "ranges-negotiation"],
  ["Negotiation checklist", "negotiation-checklist"],
  ["FAQ", "faq"],
];

export default function CommercialRealEstateSalaryGuidePage() {
  return (
    <main className="bg-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Salary Guide</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            CRE compensation is a function of seat, risk, and platform.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            Salary discussions feel opaque because candidates compare titles, not economics. A better approach
            is to map compensation to risk position, revenue model, and platform maturity.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>Total comp matters more than base, especially as responsibility scales.</li>
            <li>Higher-risk seats often have wider bonus dispersion, not guaranteed upside.</li>
            <li>Platform type changes payout timing: banks are steadier, principal shops are more variable.</li>
            <li>Market location and asset class specialization can materially shift ranges.</li>
            <li>Comp is negotiated best when tied to role scope and measurable output.</li>
            <li>Use salary ranges to anchor expectations, then customize for your context.</li>
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
          <section id="comp-table" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) Compensation table: role-level ranges for informed negotiation</h2>
            <p>
              These ranges are directional and reflect common U.S. market outcomes for major metros. Actual
              compensation varies by deal flow, manager quality, fund performance, and whether carry or
              coinvest opportunities are present.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Base Salary</th>
                    <th className="px-4 py-3">Bonus Range</th>
                    <th className="px-4 py-3">Typical Total Comp</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Analyst (Debt / Banking)", "$80k–$120k", "20%–60%", "$96k–$190k"],
                    ["Analyst (Acquisitions)", "$90k–$130k", "30%–100%", "$117k–$260k"],
                    ["Associate (Debt / Credit)", "$120k–$170k", "30%–90%", "$156k–$323k"],
                    ["Associate (Acquisitions)", "$130k–$190k", "40%–130%", "$182k–$437k"],
                    ["Asset Manager", "$110k–$180k", "25%–100%", "$138k–$360k"],
                    ["Development Manager", "$120k–$200k", "25%–125%", "$150k–$450k"],
                    ["VP / Director", "$180k–$300k", "50%–200%+", "$270k–$900k+"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-slate-200">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Notice how bonus bands widen as judgment risk rises. That is the central pattern in CRE comp:
              the more your decisions influence returns, the more variable your pay becomes.
            </p>
          </section>

          <section id="what-drives-comp" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) What drives comp: seat, risk, and platform economics</h2>
            <p>
              Two analysts with the same title can earn very different pay if their firms monetize risk
              differently. Compensation should be interpreted as a reflection of platform economics,
              organizational leverage, and role criticality.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Seat and risk</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Debt roles typically have steadier pay and narrower variance.</li>
                  <li>Equity roles usually have wider bonus outcomes tied to performance.</li>
                  <li>Development adds execution risk and longer payout cycles.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Platform factors</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Institutional platforms may pay less cash early but offer brand leverage.</li>
                  <li>Lean entrepreneurial shops may offer more scope and faster upside.</li>
                  <li>Carry eligibility timing changes long-term earnings dramatically.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="ranges-negotiation" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) How to use ranges intelligently in negotiation</h2>
            <p>
              Salary ranges are not scripts; they are context. The strongest negotiation posture ties your
              request to role scope, expected output, and business impact during the first year.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Anchor to the market band, then justify where you belong in the band using evidence from your
                track record and relevant deal exposure.
              </li>
              <li>
                Separate fixed and variable comp in the discussion so tradeoffs are explicit.
              </li>
              <li>
                Ask clarifying questions about bonus mechanics: discretion, formula inputs, and payout timing.
              </li>
              <li>
                If base is fixed, negotiate alternative value: sign-on, review timing, title scope, or carry path.
              </li>
            </ul>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Avoid this common mistake</h3>
              <p className="mt-2 text-sm leading-6">
                Candidates often negotiate as if every firm shares the same bonus philosophy. It does not.
                Always ask how performance is measured and who controls payout decisions.
              </p>
            </div>
          </section>

          <section id="negotiation-checklist" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) Negotiation checklist for CRE candidates</h2>
            <div className="rounded-xl border border-slate-200 p-5">
              <ul className="space-y-2">
                <li>□ I defined my target base, acceptable floor, and walk-away point.</li>
                <li>□ I can explain my compensation ask using role scope and expected impact.</li>
                <li>□ I asked how bonus is calculated and how often top-end payouts happen.</li>
                <li>□ I clarified promotion timeline and what outcomes trigger advancement.</li>
                <li>□ I asked about carry eligibility, vesting schedule, and dilution considerations.</li>
                <li>□ I confirmed in-office expectations, travel load, and resource support.</li>
              </ul>
            </div>
            <p>
              This checklist keeps the conversation professional and data-driven. It protects you from
              optimizing for headline cash while missing structural details that shape long-term earnings.
            </p>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["Is a higher base always better?", "Not always. A lower base with predictable upside, better mentorship, and stronger platform trajectory can dominate over time."],
                ["How should I compare two offers?", "Normalize expected total comp, risk of payout, learning scope, and promotion velocity over a 2–3 year horizon."],
                ["Do smaller shops always pay less?", "No. Some pay more for high-leverage talent, but variability and role breadth are typically higher."],
                ["When should I bring up compensation?", "After role scope is clear and mutual fit is established, usually after first-round technical validation."],
                ["How do I ask about carry without sounding premature?", "Ask as part of long-term pathing: timeline, eligibility criteria, and role expectations."],
                ["What if the firm says bonus is discretionary?", "Request historical ranges by level and examples of what drove strong versus weak payouts."],
                ["Can I renegotiate after accepting?", "Only in unusual circumstances. It is better to resolve key terms before signing."],
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
          <p className="mt-2 leading-7">Explore practical guides, interview drills, and current openings.</p>
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
