// app/interview-prep/explain-irr-interview/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Explain IRR in an Interview: IRR vs MOIC + Timeline Example (Real Estate) | HireCRE",
  description:
    "Explain IRR clearly in CRE interviews: plain-English definition, why timing matters, a simple cash flow timeline example, IRR vs MOIC, when IRR misleads, and interview-ready phrasing.",
  alternates: { canonical: "/interview-prep/explain-irr-interview" },
  openGraph: {
    title: "How to Explain IRR in an Interview (Real Estate)",
    description:
      "Institutional IRR explanation with a timeline example, IRR vs MOIC, and interview-ready language.",
    url: "/interview-prep/explain-irr-interview",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "How to Explain IRR in an Interview (CRE)",
    description: "Plain-English IRR + timeline example, IRR vs MOIC, and clean interview phrasing.",
  },
};

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Page() {
  // Simple cash flow timeline (interview-friendly)
  // Year 0: -10.0, Year 1: +1.0, Year 2: +1.0, Year 3: +12.0
  const investment = 10_000_000;
  const timeline = [
    { period: "Year 0", cashFlow: -investment, note: "Equity invested" },
    { period: "Year 1", cashFlow: 1_000_000, note: "Distribution" },
    { period: "Year 2", cashFlow: 1_000_000, note: "Distribution" },
    { period: "Year 3", cashFlow: 12_000_000, note: "Sale + final distribution" },
  ];

  const totalCashBack = timeline.reduce((s, x) => (x.cashFlow > 0 ? s + x.cashFlow : s), 0);
  const moic = totalCashBack / investment; // 14 / 10 = 1.4x

  const faqs = [
    {
      question: "What is IRR in real estate?",
      answer:
        "IRR (internal rate of return) is the discount rate that sets the net present value (NPV) of a series of cash flows to zero. In real estate, it measures a multi-period return that accounts for timing of distributions and the exit.",
    },
    {
      question: "How do you explain IRR in plain English?",
      answer:
        "IRR is an annualized return that depends on when you get your money back. Faster cash back generally means higher IRR, even if total dollars returned are similar, because money received sooner is more valuable than money received later.",
    },
    {
      question: "What’s the difference between IRR and MOIC?",
      answer:
        "MOIC is total cash returned divided by cash invested (e.g., 1.8x). IRR is an annualized rate driven by timing. A fast 1.5x can have a higher IRR than a slow 2.0x.",
    },
    {
      question: "When can IRR be misleading?",
      answer:
        "IRR can be distorted by short hold periods, early partial returns, or the reinvestment assumption implied by the math. That’s why institutional underwriting typically evaluates IRR alongside MOIC, cash-on-cash, and downside cases.",
    },
    {
      question: "Is IRR levered or unlevered?",
      answer:
        "It can be either. Unlevered IRR uses property-level cash flows before debt. Levered IRR uses equity cash flows after debt service and financing proceeds. In interviews, specify which one you mean.",
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
            How to Explain IRR in an Interview (Real Estate)
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            The interviewer isn’t looking for the NPV definition. They want to see if you understand{" "}
            <span className="font-medium">time value</span>, can compare IRR to other return metrics, and can describe when IRR can
            mislead decision-making.
          </p>
        </header>

        {/* Definition + plain English */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Plain-English Definition</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              <span className="font-medium">IRR is the annualized return implied by the timing of cash flows.</span> If you get cash
              back sooner, IRR usually goes up. If cash comes back later, IRR usually goes down — even if total profit is similar.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Formal definition (one sentence): IRR is the discount rate that makes NPV equal zero.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Why Timing Matters (What They’re Testing)</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>• Returning capital early boosts IRR even if total dollars don’t change much.</li>
              <li>• IRR penalizes long hold periods with back-ended profits.</li>
              <li>• You should always pair IRR with MOIC and downside cases for a real decision.</li>
            </ul>
          </div>
        </section>

        {/* Timeline example */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Example Cash Flow Timeline (Interview-Friendly)</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">Assumptions</h3>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {timeline.map((row) => (
                    <div key={row.period} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-600">{row.period}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(row.cashFlow)}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-600">{row.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm leading-6 text-slate-700">
                  Total cash back = <span className="font-medium">{formatUSD(totalCashBack)}</span> on{" "}
                  <span className="font-medium">{formatUSD(investment)}</span> invested.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  That’s a <span className="font-medium">{moic.toFixed(2)}x MOIC</span>.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  The IRR is the annualized rate that makes those timed cash flows “break even” in present value terms. If you shift
                  the Year 3 sale earlier, IRR rises; if you push it later, IRR falls.
                </p>
                <p className="mt-4 text-xs leading-5 text-slate-600">
                  In interviews, you don’t need to calculate the exact IRR by hand. You need timing intuition and the ability to talk
                  through tradeoffs.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">IRR vs MOIC (Quick Contrast)</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>
                  • <span className="font-medium">MOIC</span> = “How many dollars back?”
                </li>
                <li>
                  • <span className="font-medium">IRR</span> = “How fast did you get them back?”
                </li>
              </ul>
              <p className="mt-3 text-xs leading-5 text-slate-600">
                Strong answers name both. Institutional decisions rarely rely on a single metric.
              </p>
            </div>
          </div>
        </section>

        {/* When IRR misleads */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">When IRR Can Mislead (Institutional Lens)</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Short Hold / Quick Flip Bias</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                A short hold can show a very high IRR even if the total dollars earned are modest. That can cause teams to overweight
                “fast” deals versus “big” deals.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Early Partial Distributions</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Returning capital early (refi proceeds, one-time distributions) can boost IRR meaningfully, even if the remaining asset
                risk is still substantial.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Reinvestment Assumption</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                IRR math implicitly assumes interim cash flows can be reinvested at the same rate, which is rarely true in practice.
                This matters most when deals generate large early cash flows.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Multiple IRRs / Non-Standard Cash Flows</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Certain cash flow patterns can produce multiple IRRs or weird results. That’s another reason to always pair IRR with
                MOIC and a cash flow narrative.
              </p>
            </div>
          </div>
        </section>

        {/* How to say it */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to Say It in an Interview</h2>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-700">
              The strongest answer is short, then adds one mature nuance:
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">
                <span className="font-semibold">Interview answer (clean):</span>{" "}
                “IRR is the annualized return implied by the timing of cash flows — it’s the discount rate that makes NPV equal zero.
                A deal that returns cash sooner will generally have a higher IRR, even if the total dollars are similar. I like to pair
                IRR with MOIC because IRR is timing-sensitive and can be distorted by short holds or early capital returns.”
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If pushed: <span className="font-medium">“I’ll specify levered vs unlevered IRR based on whether we’re looking at property or equity cash flows.”</span>
            </p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Common Mistakes</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 1: Defining IRR Only as “NPV = 0”</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                That definition is correct but incomplete. Interviewers want timing intuition and a capital markets mindset.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 2: Not Mentioning MOIC</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                A credible answer pairs IRR with dollars and multiple. IRR alone can hide the magnitude of outcomes.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 3: Not Saying Levered vs Unlevered</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Real estate uses both. Clarify whether the cash flows are before debt or after debt.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 4: Treating IRR as a “single truth”</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Institutional underwriting is scenario-based. A strong answer references base/downside and the driver narrative.
              </p>
            </div>
          </div>
        </section>

        {/* Senior takeaway */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Senior Takeaway</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              IRR is best understood as a timing-weighted, annualized return metric. It’s powerful for comparing deals with different
              cash flow shapes, but it can over-reward speed and understate the importance of total dollars. In interviews, define it
              cleanly, anchor on timing intuition, and pair it with MOIC and levered/unlevered clarity.
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
              href="/interview-prep/equity-returns-101"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Equity Returns 101</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The core return outputs (IRR, MOIC, cash-on-cash) and how they connect.
              </p>
            </Link>

            <Link
              href="/interview-prep/preferred-return"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Preferred Return</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                What an 8% pref actually means and how it affects GP/LP economics.
              </p>
            </Link>

            <Link
              href="/interview-prep/promote-structure"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Promote Structure</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                GP incentive economics and how tiers/catch-up can change the headline split.
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
                <p className="text-sm font-semibold text-slate-900">Want to sound institutional on returns?</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Build fluency across IRR, MOIC, waterfalls, promote, and exits so your answer has both math and judgment.
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
