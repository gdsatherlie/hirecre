// app/interview-prep/cap-rate-explained/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cap Rate Explained: Formula, Value Impact, Compression vs Expansion (Interview Prep) | HireCRE",
  description:
    "Cap rate explained for CRE interviews: definition, formula, a worked numeric example, how cap rates drive value, cap rate compression vs expansion, risk interpretation, and interview-ready phrasing.",
  alternates: { canonical: "/interview-prep/cap-rate-explained" },
  openGraph: {
    title: "Cap Rate Explained for Interviews (With Example)",
    description:
      "Institutional cap rate explanation with a clean example, compression vs expansion, valuation impact, and interview framing.",
    url: "/interview-prep/cap-rate-explained",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Cap Rate Explained (Interview Prep)",
    description: "Definition, formula, valuation impact, compression vs expansion, and interview-ready language.",
  },
};

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
function formatPct(n: number) {
  return `${(n * 100).toFixed(2)}%`;
}

export default function Page() {
  // Worked example
  const noi = 1_500_000;
  const capA = 0.055; // 5.50%
  const capB = 0.065; // 6.50%
  const valueAtA = noi / capA;
  const valueAtB = noi / capB;
  const valueChange = valueAtA - valueAtB;

  const faqs = [
    {
      question: "What is cap rate in real estate?",
      answer:
        "Cap rate (capitalization rate) is a valuation metric defined as a property’s stabilized net operating income (NOI) divided by its value (or purchase price). It’s commonly used to compare pricing across assets and markets and to translate NOI into an implied value.",
    },
    {
      question: "What is the cap rate formula?",
      answer:
        "Cap Rate = NOI ÷ Value. Rearranged: Value = NOI ÷ Cap Rate. The key is using an appropriate, stabilized NOI definition consistent with the market and underwriting.",
    },
    {
      question: "What does cap rate compression mean?",
      answer:
        "Cap rate compression means cap rates move lower. Holding NOI constant, lower cap rates imply higher values. Compression often reflects lower perceived risk, lower interest rates, stronger liquidity, or more aggressive market pricing.",
    },
    {
      question: "What does cap rate expansion mean?",
      answer:
        "Cap rate expansion means cap rates move higher. Holding NOI constant, higher cap rates imply lower values. Expansion often reflects higher rates, wider risk premiums, weaker growth expectations, or higher uncertainty.",
    },
    {
      question: "Is cap rate the same as IRR?",
      answer:
        "No. Cap rate is a one-period unlevered yield/valuation snapshot based on NOI and value. IRR is a multi-period return metric that incorporates timing of cash flows, leverage, growth, and exit assumptions.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/interview-prep"
            className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            ← Back to Interview Prep Hub
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Cap Rate Explained for Interviews (With Examples You Can Repeat)
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            Cap rate is a pricing and risk shorthand — but it’s only as good as the NOI definition behind it. In interviews, the goal
            is to explain cap rate as a <span className="font-medium">valuation relationship</span>, then tie it to{" "}
            <span className="font-medium">risk</span>, <span className="font-medium">rates</span>, and{" "}
            <span className="font-medium">growth expectations</span>.
          </p>
        </header>

        {/* Definition + formula */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Definition</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              <span className="font-medium">Cap rate</span> is the ratio of a property’s{" "}
              <span className="font-medium">stabilized NOI</span> to its{" "}
              <span className="font-medium">value</span> (or purchase price). It’s often used to translate an NOI stream into an
              implied value and to compare pricing across assets/markets.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Formula Box</h2>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">Cap Rate = NOI ÷ Value</p>
              <p className="mt-2 text-sm font-medium text-slate-900">Value = NOI ÷ Cap Rate</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Interview nuance: “NOI” should be stabilized and consistent (not a one-time spike/valley, and not mixing in CapEx).
              </p>
            </div>
          </div>
        </section>

        {/* Numeric example */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Worked Numeric Example: How Cap Rates Drive Value</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">Assumptions</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Stabilized NOI</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(noi)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Cap Rate (Scenario A)</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatPct(capA)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Cap Rate (Scenario B)</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatPct(capB)}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm leading-6 text-slate-700">
                  Value at {formatPct(capA)}: <span className="font-medium">{formatUSD(valueAtA)}</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Value at {formatPct(capB)}: <span className="font-medium">{formatUSD(valueAtB)}</span>
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Same NOI, wider cap rate → lower value. In this example, moving from {formatPct(capA)} to {formatPct(capB)} changes
                  value by about <span className="font-medium">{formatUSD(valueChange)}</span>.
                </p>

                <p className="mt-4 text-xs leading-5 text-slate-600">
                  This is why interviews often turn into: “What happens to value when cap rates move 50–100 bps?” It’s a direct
                  valuation sensitivity, not a philosophy question.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Quick Interpretation</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>
                  • Lower cap rate generally implies <span className="font-medium">higher value</span> (all else equal).
                </li>
                <li>
                  • Higher cap rate generally implies <span className="font-medium">lower value</span>.
                </li>
                <li>
                  • “All else equal” rarely holds — the interview win is to name what changes: rates, growth, risk, liquidity.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Compression vs expansion */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Cap Rate Compression vs Expansion</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Compression (Cap Rates Down)</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Compression means buyers are willing to pay more for the same NOI stream (lower implied yield). Often associated with
                lower interest rates, stronger expected rent growth, tighter credit, or higher conviction in the cash flows.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Plain line: <span className="font-medium">“Lower cap rate implies higher value, holding NOI constant.”</span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Expansion (Cap Rates Up)</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Expansion means buyers demand a higher yield for the same NOI stream, often due to higher rates, higher perceived risk,
                weaker growth expectations, or lower liquidity in the market.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Plain line: <span className="font-medium">“Higher cap rate implies lower value, holding NOI constant.”</span>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              <span className="font-medium">Senior nuance:</span> Cap rates aren’t “set” by rates alone. They’re a market-clearing
              price that reflects the relationship between the risk-free rate, credit spreads, illiquidity, growth expectations, and
              asset-specific risk (tenant quality, lease term, rollover, location, capex).
            </p>
          </div>
        </section>

        {/* Risk interpretation */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What Cap Rate Signals About Risk</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Cash Flow Durability</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Longer, safer cash flows (credit tenant, long WALT, strong market) typically price at lower cap rates.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Growth vs Stability</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                High-growth stories may trade on forward NOI assumptions; the “cap rate” can be noisy if NOI is not stabilized yet.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Capital Expenditure Risk</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                If NOI is understated by upcoming CapEx or rollover risk, the headline cap rate can mislead. Underwrite the true
                stabilized run-rate.
              </p>
            </div>
          </div>
        </section>

        {/* Interview framing */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to Say It in an Interview</h2>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-700">
              Give a definition + the value relationship, then show you understand why cap rates move.
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">
                <span className="font-semibold">Interview answer (clean):</span>{" "}
                “Cap rate is NOI divided by value. It’s a pricing shorthand — holding NOI constant, lower cap rates imply higher values
                and higher cap rates imply lower values. In practice, cap rates move based on the risk-free rate, risk premiums,
                liquidity, and expectations for NOI growth and durability, so I’m always careful to anchor on a stabilized NOI
                definition.”
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If pushed: <span className="font-medium">“Value = NOI / cap rate — so a 50–100 bps move can swing value materially.”</span>
            </p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Common Mistakes</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 1: Using Unstabilized NOI</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                If NOI is not stabilized, cap rate becomes a moving target. Say what NOI basis you’re using (in-place vs forward).
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 2: Treating Cap Rate as “Return”</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Cap rate is not IRR. It’s a one-period unlevered yield snapshot. Total return depends on growth, leverage, and exit.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 3: Ignoring Lease Structure</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The same NOI can carry different risk based on WALT, tenant credit, rollover timing, and expense pass-throughs.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 4: No Sensitivity Intuition</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Interviewers like quick math. Know that value is inversely related to cap rate — small moves matter.
              </p>
            </div>
          </div>
        </section>

        {/* Senior takeaway */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Senior Takeaway</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              Cap rate is a market pricing shorthand: it links stabilized NOI to value and embeds risk, rates, and growth expectations.
              In interviews, define it cleanly, do one quick value sensitivity example, and emphasize that the NOI definition must be
              stabilized and consistent.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10" aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-semibold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">{f.question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related (Build the Cluster)</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/interview-prep/exit-underwriting"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Exit Underwriting</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                How to frame exit cap assumptions, downside cases, and takeout risk.
              </p>
            </Link>

            <Link
              href="/interview-prep/development-returns-yoc"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Development Returns (Yield on Cost)</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Linking cost basis to stabilized NOI and why spread-to-cap matters.
              </p>
            </Link>

            <Link
              href="/interview-prep/acquisitions-interview-questions"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Acquisitions Interview Questions</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The prompts behind pricing, risk, underwriting judgment, and market narrative.
              </p>
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="/interview-prep"
              className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
            >
              View all Interview Prep topics →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Want to sound sharp on pricing and valuation?</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Build the full cluster across cap rates, exits, IRR, and waterfalls—so your answers connect the dots.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/interview-prep"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  Go to Interview Prep Hub
                </Link>
                <Link
                  href="/board"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  Browse CRE Jobs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
