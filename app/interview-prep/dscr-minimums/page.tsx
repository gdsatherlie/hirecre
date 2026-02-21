// app/interview-prep/dscr-minimums/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DSCR Minimums: What Commercial Lenders Actually Look For (Bridge + Term) | HireCRE",
  description:
    "DSCR minimums explained for CRE interviews: why requirements vary by lender and asset, rate sensitivity, risk tiers, stressed DSCR, and interview-ready phrasing lenders actually use.",
  alternates: { canonical: "/interview-prep/dscr-minimums" },
  openGraph: {
    title: "DSCR Minimums: What Lenders Actually Look For",
    description:
      "Institutional DSCR minimums: why they vary, rate sensitivity, stressed DSCR, and interview-ready language.",
    url: "/interview-prep/dscr-minimums",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "DSCR Minimums (Commercial Loans)",
    description: "Why DSCR minimums vary, stressed DSCR, risk tiers, and interview-ready phrasing.",
  },
};

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Page() {
  // Rate sensitivity example (simple, interview-friendly)
  // NOI = 1.2mm; Debt = 12.0mm interest-only; Rate moves 7% -> 9%
  const noi = 1_200_000;
  const debt = 12_000_000;

  const rateLow = 0.07;
  const rateHigh = 0.09;

  const annualDebtServiceLow = debt * rateLow;
  const annualDebtServiceHigh = debt * rateHigh;

  const dscrLow = noi / annualDebtServiceLow;
  const dscrHigh = noi / annualDebtServiceHigh;

  const faqs = [
    {
      question: "What is a typical minimum DSCR for a commercial loan?",
      answer:
        "There is no single minimum. Many term lenders target DSCRs around 1.20x–1.30x (or higher) for stabilized assets, while bridge lenders may underwrite to lower in-place DSCR if there is a credible path to stabilization and other metrics (like debt yield and sponsor strength) support the risk.",
    },
    {
      question: "Why do DSCR minimums vary so much by lender?",
      answer:
        "Because the acceptable DSCR depends on the lender’s mandate and risk tolerance (bank vs debt fund), the asset’s cash flow durability, lease rollover, market liquidity, and how the lender expects to be repaid (term hold vs short bridge takeout).",
    },
    {
      question: "How do interest rates affect DSCR?",
      answer:
        "DSCR is NOI divided by debt service. If rates increase (especially on floating-rate loans), debt service rises and DSCR falls unless NOI grows. That’s why lenders focus on debt service sensitivity and stressed DSCR under higher rate scenarios.",
    },
    {
      question: "What is stressed DSCR?",
      answer:
        "Stressed DSCR is DSCR calculated under conservative assumptions—such as higher interest rates, lower NOI, higher vacancies, or higher expenses—to measure how much cushion the loan has in a downside scenario.",
    },
    {
      question: "Do bridge lenders require DSCR?",
      answer:
        "Yes, but it’s often evaluated alongside other constraints like debt yield, LTV/LTC, sponsor liquidity, and the business plan. Some bridge loans are sized to a stabilized DSCR or a stressed interest rate even if the in-place DSCR is temporarily weak.",
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
            DSCR Minimums: What Lenders Actually Look For
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            “What’s a good DSCR?” is not a single-number question. Lenders use DSCR as a{" "}
            <span className="font-medium">cash flow cushion metric</span>, but minimums move with lender type, asset stability,
            interest rates, and the repayment story (term hold vs bridge takeout).
          </p>
        </header>

        {/* Definition + why it varies */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">DSCR Definition (One Line)</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              <span className="font-medium">DSCR = NOI ÷ Debt Service</span>. It measures how much NOI “covers” required debt payments.
            </p>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">DSCR = Net Operating Income ÷ Annual Debt Service</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Keep it consistent: use the lender’s NOI definition and the correct debt service (IO vs amortizing, current vs stressed
                rate, etc.).
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Why Minimums Vary</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>• Lender type: bank / life co / agency vs debt fund vs CMBS</li>
              <li>• Asset stability: stabilized vs transitional</li>
              <li>• Lease risk: rollover concentration, tenant credit, WALT</li>
              <li>• Rate structure: fixed vs floating; hedging; refinance risk</li>
              <li>• Repayment story: “term hold” vs “bridge to takeout”</li>
            </ul>
          </div>
        </section>

        {/* Risk tiers */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Risk Tiers: How Lenders Think About DSCR</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Stabilized Term Debt</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Typically higher DSCR expectations because the loan is underwritten to “hold” risk. Stronger DSCR also supports
                refinance resilience and covenant headroom.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Bridge / Transitional</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                In-place DSCR can be weaker if the business plan is credible, sponsor is strong, and other constraints (debt yield,
                leverage, liquidity) control downside. Bridge lenders often focus on sizing to a stabilized or stressed DSCR.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Higher Volatility Assets</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Hotels, certain retail, or heavy rollover profiles can require more cushion, tighter leverage, or stronger sponsorship
                because NOI durability is less predictable.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              <span className="font-medium">Senior lens:</span> DSCR is rarely evaluated in isolation. A “low DSCR” deal can still be
              financeable if the lender is paid to take the risk (spread), has strong structural protections, and the takeout story is
              real. Conversely, a “good DSCR” can still be a bad loan if NOI is fragile or the exit is speculative.
            </p>
          </div>
        </section>

        {/* Rate sensitivity */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Rate Sensitivity: Why DSCR Moves Fast</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">Worked Example (Interest-Only Debt)</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">NOI</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(noi)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Loan Amount</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(debt)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Structure</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">Interest-only</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">At 7.0% rate</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Annual debt service: <span className="font-medium">{formatUSD(annualDebtServiceLow)}</span>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    DSCR: <span className="font-medium">{dscrLow.toFixed(2)}x</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">At 9.0% rate</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Annual debt service: <span className="font-medium">{formatUSD(annualDebtServiceHigh)}</span>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    DSCR: <span className="font-medium">{dscrHigh.toFixed(2)}x</span>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-600">
                This is why floating-rate underwriting focuses on hedging, stressed rates, and takeout risk. DSCR can compress quickly
                when rates move, even if NOI is flat.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Stressed DSCR (What It Means)</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Lenders often size to a <span className="font-medium">stressed debt service</span> (higher rate) and/or{" "}
                <span className="font-medium">stressed NOI</span> (higher vacancy, higher expenses) to test resilience.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Interview line: <span className="font-medium">“Current DSCR is a snapshot; stressed DSCR drives risk decisions.”</span>
              </p>
            </div>
          </div>
        </section>

        {/* What lenders actually look for */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            What Lenders Actually Look For (Beyond the Headline Minimum)
          </h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">NOI Quality</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Is NOI durable and repeatable? Underwritten rents, concessions, rollover, expense normalization, and capital needs all
                matter. A “high DSCR” on fragile NOI is not comfort.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Takeout / Exit Risk</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                For bridge, the question is: what refinance DSCR will the stabilized loan support, at what cap rate, at what interest
                rate, and at what leverage? If the takeout math is thin, DSCR “today” doesn’t save the loan.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Structure & Covenants</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Reserves, cash management, amortization, IO periods, leasing covenants, and extension tests often matter more than the
                “minimum DSCR” number on a term sheet.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Sponsor Strength</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Liquidity, execution track record, and business plan credibility determine whether a lender tolerates thinner DSCR in a
                transitional deal.
              </p>
            </div>
          </div>
        </section>

        {/* Interview framing */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to Say It in an Interview</h2>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-700">
              The best answer acknowledges that DSCR minimums depend on lender type and the repayment story, then adds one real
              underwriting nuance (stressed rate, takeout, NOI quality).
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">
                <span className="font-semibold">Interview answer (clean):</span>{" "}
                “Minimum DSCR depends on the lender and the asset. For stabilized term debt, lenders usually want more cushion because
                they’re holding the credit. For bridge, in-place DSCR can be thinner if there’s a credible stabilization plan, but the
                loan is often sized to a stressed rate and a realistic takeout DSCR. I always look at DSCR alongside debt yield,
                leverage, and the exit story.”
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If pushed: <span className="font-medium">“I care more about stressed DSCR and takeout math than the headline minimum.”</span>
            </p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Common Mistakes</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 1: Quoting One “Standard” Minimum</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                There isn’t one. A credible answer explains why minimums differ by lender, asset stability, and rates.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 2: Ignoring Rate Sensitivity</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Floating-rate loans can experience DSCR compression quickly. Mention hedging and stressed DSCR.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 3: Not Discussing NOI Quality</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                A high DSCR on bad NOI (one-time income, unrealistic rents, hidden CapEx) is not safety.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 4: Forgetting the Takeout Story</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Bridge lenders get paid back by refinance or sale. If the stabilized DSCR can’t support takeout proceeds, the loan is
                structurally weak.
              </p>
            </div>
          </div>
        </section>

        {/* Senior takeaway */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Senior Takeaway</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              DSCR minimums are not a rule-of-thumb; they’re a function of risk. The institutional answer is to frame DSCR as a cushion
              metric, explain why minimums vary, and emphasize stressed DSCR + takeout math. That sounds like real underwriting.
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
              href="/interview-prep/dscr-vs-debt-yield"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">DSCR vs Debt Yield (With Example)</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                When each metric binds, how rates change DSCR, and how to explain it cleanly.
              </p>
            </Link>

            <Link
              href="/interview-prep/loan-sizing-cheat-sheet"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Loan Sizing Cheat Sheet</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The constraints lenders actually size to: DSCR, debt yield, leverage, and proceeds.
              </p>
            </Link>

            <Link
              href="/interview-prep/exit-underwriting"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Exit Underwriting</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Takeout math, refinance sensitivity, and why exit assumptions drive credit decisions.
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
                <p className="text-sm font-semibold text-slate-900">Want lender-grade interview answers?</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Build the debt toolkit across DSCR, debt yield, sizing, and exits so you can talk in real underwriting terms.
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
