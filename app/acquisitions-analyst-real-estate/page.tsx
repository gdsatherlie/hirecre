import Link from "next/link";

export const metadata = {
  title: "Acquisitions Analyst Real Estate Guide | HireCRE",
  description:
    "Learn what acquisitions analysts actually do: underwriting, judgment, and investment storytelling.",
};

const toc = [
  ["Day in the life", "day-in-the-life"],
  ["Underwriting expectations", "underwriting-expectations"],
  ["Common mistakes", "common-mistakes"],
  ["What to show in interviews", "what-to-show"],
  ["90-day development plan", "development-plan"],
  ["FAQ", "faq"],
];

export default function AcquisitionsAnalystRealEstatePage() {
  return (
    <main className="bg-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Role Guide</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Acquisitions analysts win by combining underwriting discipline with investment storytelling.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            The job is not “just modeling.” Your real job is translating messy market reality into an
            investable narrative that a committee can act on with confidence.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>Acquisitions performance depends on judgment quality, not template quality alone.</li>
            <li>The analyst role blends process execution, market synthesis, and recommendation clarity.</li>
            <li>Strong underwriting identifies fragile assumptions before committee does.</li>
            <li>Your value rises when you communicate risk in decision-ready language.</li>
            <li>Interview success comes from showing how you think, not reciting metrics.</li>
            <li>Early habits in memo writing and sensitivity design compound quickly.</li>
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
          <section id="day-in-the-life" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) Day in the life: underwriting is central, but not isolated</h2>
            <p>
              A typical day rotates between inbound opportunities, live diligence, portfolio context, and
              internal communication. The key is switching from detail mode to decision mode without losing
              accuracy or narrative coherence.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Morning priorities</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Triage broker packages and reject obvious misfits quickly.</li>
                  <li>Update key assumptions for active deals from latest diligence inputs.</li>
                  <li>Prepare talking points for team check-ins and investment committee prep.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Afternoon priorities</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Run sensitivities and test fragility in rent, capex, and exit assumptions.</li>
                  <li>Coordinate with debt teams, third parties, and internal legal workflows.</li>
                  <li>Translate analysis into concise recommendation language for seniors.</li>
                </ul>
              </div>
            </div>
            <p>
              The practical lesson: execution speed matters, but only if paired with contextual thinking.
              Senior teams notice analysts who can prioritize under time pressure and still preserve decision
              quality.
            </p>
          </section>

          <section id="underwriting-expectations" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) Underwriting expectations: precision, skepticism, and synthesis</h2>
            <p>
              Firms expect analysts to produce clean, auditable work. But “clean” is only table stakes.
              Real differentiation comes from identifying assumption risk early and communicating why it
              matters to both downside protection and upside potential.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Build transparent cash-flow logic with clear bridges from in-place performance to stabilized
                expectations.
              </li>
              <li>
                Underwrite debt capacity with conservative buffers and understand refinance constraints.
              </li>
              <li>
                Design sensitivities around real decision variables, not cosmetic parameter changes.
              </li>
              <li>
                Align your recommendation with hold-period strategy, not just headline IRR.
              </li>
            </ul>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Checklist: what seniors expect to hear</h3>
              <ul className="mt-3 space-y-1">
                <li>□ What assumption can break first?</li>
                <li>□ What is our mitigation if that happens?</li>
                <li>□ What must be true for this deal to outperform?</li>
                <li>□ Is this a basis edge, execution edge, or structure edge?</li>
              </ul>
            </div>
          </section>

          <section id="common-mistakes" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) Common mistakes that cap analyst growth</h2>
            <p>
              Most early mistakes are not technical. They are communication and prioritization failures that
              create avoidable confusion for decision makers.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Frequent mistakes</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Overfitting models to match target returns.</li>
                  <li>Hiding uncertainty instead of labeling it directly.</li>
                  <li>Presenting outputs without decision context.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Higher-value habits</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Flag assumptions you distrust before being asked.</li>
                  <li>Use one-page summaries that highlight tradeoffs.</li>
                  <li>Track post-close outcomes to refine future underwriting.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="what-to-show" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) What to show in interviews: prove you can underwrite and persuade</h2>
            <p>
              Hiring managers are testing whether you can be trusted in live deal environments. The winning
              signal is not maximum complexity; it is clarity under uncertainty.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Interview evidence stack</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-6">
                <li>Walk through one deal with thesis, assumptions, and decision logic.</li>
                <li>Explain one assumption you changed and why.</li>
                <li>Show one downside scenario and mitigation playbook.</li>
                <li>Summarize your final recommendation in three sentences.</li>
              </ol>
            </div>
            <p>
              If you can do this consistently, you signal readiness for real responsibility. Teams can train
              software shortcuts quickly; they cannot quickly train judgment and communication discipline.
            </p>
          </section>

          <section id="development-plan" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5) 90-day development plan for new acquisitions analysts</h2>
            <p>
              Your first 90 days should prioritize reliability, speed with accuracy, and improved investment
              communication. Think in three phases: absorb, execute, and synthesize.
            </p>
            <div className="rounded-xl border border-slate-200 p-5">
              <ul className="space-y-2">
                <li>□ Days 1–30: Learn templates, process maps, and internal decision standards.</li>
                <li>□ Days 31–60: Own defined underwriting modules and run first-pass sensitivities.</li>
                <li>□ Days 61–90: Draft memo sections and present recommendation-ready summaries.</li>
                <li>□ Weekly: Track one lesson from deals that passed and one from deals declined.</li>
              </ul>
            </div>
            <p>
              This progression helps you become useful quickly while building the deeper pattern recognition
              that differentiates top analysts over time.
            </p>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["Do I need perfect technical skills before starting?", "No. You need strong fundamentals and a habit of validating assumptions. Precision improves rapidly on the job."],
                ["How much of the role is modeling versus communication?", "Both matter. Modeling creates clarity; communication turns clarity into decisions."],
                ["What is the fastest way to improve underwriting quality?", "Review past deals against realized outcomes and identify where assumptions drifted from reality."],
                ["Should I specialize by asset class early?", "Build broad pattern recognition first, then specialize when you understand where you have true edge."],
                ["How do I handle conflicting feedback from seniors?", "Clarify decision objective, summarize tradeoffs, and document the agreed path forward."],
                ["What makes an analyst promotion-ready?", "Consistent accuracy, proactive risk flagging, and the ability to communicate recommendations clearly."],
                ["How can I stand out in a competitive interview process?", "Bring a concise deal walkthrough that shows your reasoning, not just your output."],
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
          <p className="mt-2 leading-7">Explore deeper resources, focused interview prep, and active opportunities.</p>
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
