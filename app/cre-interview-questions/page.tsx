import Link from "next/link";

export const metadata = {
  title: "CRE Interview Questions Guide | HireCRE",
  description:
    "Prepare for CRE interviews by linking numbers to decisions, like writing a concise investment memo.",
  alternates: { canonical: "/cre-interview-questions" },
};

const sections = [
  ["What interviewers are actually testing", "what-testing"],
  ["Market and thesis questions", "market-thesis"],
  ["Underwriting and structure questions", "underwriting-structure"],
  ["Execution and asset management questions", "execution-am"],
  ["Behavioral and communication questions", "behavioral"],
  ["FAQ", "faq"],
];

export default function CREInterviewQuestionsPage() {
  return (
    <main className="bg-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Interview Prep</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Most candidates fail CRE interviews because they quote numbers but miss the decision.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            Strong interview prep should look like a short investment memo. Your answer should define the
            opportunity, identify key risks, pressure-test assumptions, and end with a recommendation.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>Interviewers evaluate judgment quality, not memorization of formulas.</li>
            <li>Every technical answer should end with “so what” and a decision implication.</li>
            <li>Frame responses with thesis, evidence, risk, and recommendation.</li>
            <li>Good candidates connect debt terms to equity outcomes and vice versa.</li>
            <li>Behavioral questions test communication under pressure as much as culture fit.</li>
            <li>Short, structured answers outperform long unstructured monologues.</li>
          </ul>
        </section>

        <nav className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Question map</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {sections.map(([label, id]) => (
              <li key={id}>
                <a className="text-blue-700 hover:text-blue-800 hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-10 space-y-10 leading-7">
          <section id="what-testing" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) What interviewers are actually testing</h2>
            <p>
              Most hiring teams are asking one hidden question: “Can this candidate make better decisions
              after seeing imperfect information?” That is why candidates who memorize terms still struggle.
              They answer definitions but do not show prioritization, skepticism, or recommendation quality.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Use this answer structure every time</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-6">
                <li>State the objective and the decision in one sentence.</li>
                <li>Name the 2–3 variables that matter most.</li>
                <li>Explain downside, mitigation, and what could change your view.</li>
                <li>Close with a clear recommendation and confidence level.</li>
              </ol>
            </div>
          </section>

          <section id="market-thesis" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) Market and thesis questions</h2>
            <p>
              These questions test whether you can form an investment point of view instead of repeating
              headlines. Good answers connect local supply-demand dynamics to asset-level strategy.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Common prompts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Which property type looks most mispriced today, and why?</li>
                  <li>How would higher-for-longer rates change cap-rate expectations?</li>
                  <li>What market would you avoid despite strong recent rent growth?</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">A good answer demonstrates</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Ability to separate cyclical noise from structural shifts.</li>
                  <li>A habit of triangulating data, not relying on one narrative.</li>
                  <li>Comfort making decisions with incomplete information.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="underwriting-structure" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) Underwriting and structure questions</h2>
            <p>
              This category exposes the biggest gap in candidates: they know metrics but cannot explain how
              those metrics alter the investment decision. Interviewers care less about perfect recall and
              more about your ability to diagnose fragility.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>“Walk me through your underwriting process.”</strong> Strong candidates prioritize
                rent assumptions, expense normalization, capex, debt constraints, then exit sensitivity.
              </li>
              <li>
                <strong>“What matters more, DSCR or debt yield?”</strong> Strong candidates explain context,
                lender perspective, and why debt yield can anchor downside in uncertain NOI periods.
              </li>
              <li>
                <strong>“How do you set exit cap rates?”</strong> Strong candidates tie terminal assumptions
                to durability of NOI, capital markets liquidity, and refinancing probability.
              </li>
              <li>
                <strong>“Would you pay up for lower capex risk?”</strong> Strong candidates quantify risk
                transfer value and compare it to basis spread and hold-period objectives.
              </li>
            </ul>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Checklist before giving a technical answer</h3>
              <ul className="mt-3 space-y-1">
                <li>□ I defined the decision, not just the metric.</li>
                <li>□ I identified what assumption is most fragile.</li>
                <li>□ I gave one downside scenario and one mitigation.</li>
              </ul>
            </div>
          </section>

          <section id="execution-am" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) Execution and asset management questions</h2>
            <p>
              Many candidates forget that closing is the beginning, not the finish line. Execution questions
              test whether you can manage process risk, while asset management questions test if you can drive
              outcomes when assumptions break.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Execution prompts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>What would kill a deal during diligence?</li>
                  <li>How do you prioritize third-party reports under timeline pressure?</li>
                  <li>How would you handle appraisal or lender retrade risk?</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Asset management prompts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>What KPI would you track weekly post-close?</li>
                  <li>How do you respond if rent growth stalls two quarters in a row?</li>
                  <li>When do you hold, refinance, or sell ahead of plan?</li>
                </ul>
              </div>
            </div>
            <p>
              A good answer demonstrates operational realism. You should show that you understand teams,
              timelines, and accountability mechanics, not just spreadsheet outcomes.
            </p>
          </section>

          <section id="behavioral" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5) Behavioral and communication questions</h2>
            <p>
              Behavioral rounds are often where final decisions are made. Firms want analysts who can handle
              disagreement, communicate bad news early, and remain precise when stakes rise.
            </p>
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">What a strong behavioral answer demonstrates</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Ownership language: “I noticed, I flagged, I proposed, I followed through.”</li>
                <li>Evidence of prioritization when deadlines conflict.</li>
                <li>Ability to disagree without drama and escalate with context.</li>
                <li>Reflection: what changed in your process after the experience.</li>
              </ul>
            </div>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["How many questions should I practice deeply?", "Start with 30 to 40 high-frequency prompts and master structured, concise responses before adding edge cases."],
                ["Should I memorize full scripts?", "Memorize structure, not scripts. Scripted answers sound brittle under follow-up pressure."],
                ["How technical should I get in first rounds?", "Technical enough to show judgment. Keep detail proportional to interviewer seniority and role scope."],
                ["What if I do not know the exact formula?", "State the concept, give directional logic, and explain the decision impact. Then acknowledge what you would verify."],
                ["How do I prepare for case studies?", "Practice memo-style synthesis: thesis, key assumptions, sensitivity, risk controls, recommendation."],
                ["How long should answers be?", "Target 45 to 90 seconds for most questions unless asked to go deeper."],
                ["What closes an interview well?", "Ask role-specific questions about decision process, IC cadence, and what success looks like in the first 90 days."],
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
          <p className="mt-2 leading-7">Keep sharpening your process with focused tools and live opportunities.</p>
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
