// app/interview-prep/loan-to-cost-ltc/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Loan-to-Cost (LTC) in Real Estate: Definition, Formula, Examples (Interview Prep) | HireCRE",
  description:
    "Loan-to-Cost (LTC) explained for commercial real estate interviews: definition, formula, worked purchase + renovation example, LTC vs LTV, why lenders care, where LTC matters (bridge/construction), and interview-ready language.",
  alternates: {
    canonical: "/interview-prep/loan-to-cost-ltc",
  },
  openGraph: {
    title: "What Is Loan-to-Cost (LTC)? (Real Estate Interview Prep)",
    description:
      "Institutional LTC explanation with formula + worked example, LTC vs LTV, lender rationale, bridge/construction context, and interview framing.",
    url: "/interview-prep/loan-to-cost-ltc",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Loan-to-Cost (LTC) Explained (Interview Prep)",
    description:
      "Definition, formula, numeric example, LTC vs LTV, and interview-ready framing.",
  },
};

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function Page() {
  // Worked example inputs (purchase + renovation)
  const purchasePrice = 10_000_000;
  const hardCosts = 2_000_000;
  const softCosts = 500_000;
  const totalCost = purchasePrice + hardCosts + softCosts; // 12.5mm

  const loanAmount = 8_750_000; // 70% LTC (illustrative)
  const ltc = loanAmount / totalCost; // 0.70

  const asIsValue = 11_000_000;
  const ltvAsIs = loanAmount / asIsValue;

  const arValue = 14_000_000;
  const ltvAR = loanAmount / arValue;

  const faqs = [
    {
      question: "What is loan-to-cost (LTC) in real estate?",
      answer:
        "Loan-to-cost (LTC) is the loan amount divided by total project cost. Total cost typically includes purchase price plus renovation and soft costs. LTC is a cost-based leverage metric used heavily in construction and value-add bridge lending.",
    },
    {
      question: "What’s the difference between LTC and LTV?",
      answer:
        "LTC uses total cost in the denominator; LTV uses property value (as-is or as-completed). LTC is anchored to what you’re spending; LTV is anchored to what the collateral is worth.",
    },
    {
      question: "Why do lenders care about LTC?",
      answer:
        "Lenders use LTC to ensure borrower equity is meaningfully at risk and to limit over-advance against a business plan. It’s also a practical way to size construction/bridge loans when value is uncertain or value creation is still in-progress.",
    },
    {
      question: "Is LTC used more in bridge loans or permanent loans?",
      answer:
        "LTC is most common in construction and value-add bridge loans where costs and draws are central to the structure. Permanent lenders typically focus more on stabilized metrics like DSCR and LTV, though they may still reference cost basis for context.",
    },
    {
      question: "What costs are included in total cost for LTC?",
      answer:
        "Usually: purchase price, hard costs, soft costs, and lender-required reserves (depending on the term sheet). Always confirm whether the lender includes interest reserve, TI/LC, working capital, and closing costs in the LTC denominator.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb / Hub link */}
        <div className="mb-6">
          <Link
            href="/interview-prep"
            className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            ← Back to Interview Prep Hub
          </Link>
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Loan-to-Cost (LTC): Definition, Formula, and Interview-Ready Explanation
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            LTC is a cost-based leverage metric lenders rely on when the business plan is still being executed—
            especially in bridge and construction lending. If you can explain <span className="font-medium">what it measures</span>,{" "}
            <span className="font-medium">why it matters</span>, and{" "}
            <span className="font-medium">how it differs from LTV</span>, you’ll sound like someone who has actually sized loans.
          </p>
        </header>

        {/* Key cards */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Definition</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              <span className="font-medium">Loan-to-Cost (LTC)</span> is the{" "}
              <span className="font-medium">loan amount</span> divided by the{" "}
              <span className="font-medium">total project cost</span> (purchase + capital plan + eligible soft costs/reserves per the term sheet).
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              It answers: <span className="font-medium">“How much of the check is the lender writing versus the borrower?”</span>
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Formula</h2>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">LTC = Loan Amount ÷ Total Cost</p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                “Total Cost” is deal-specific. In value-add bridge and construction, it usually includes purchase price + hard/soft costs + lender-required reserves (confirm inclusions).
              </p>
            </div>
          </div>
        </section>

        {/* Worked example */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Worked Example (Purchase + Renovation)</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">Assumptions</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Purchase Price</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(purchasePrice)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Hard Costs (Renovation)</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(hardCosts)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Soft Costs</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(softCosts)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Total Cost</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(totalCost)}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-700">
                  Suppose the lender offers a loan sized to <span className="font-medium">70% LTC</span>.
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs text-slate-600">Loan Amount</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(loanAmount)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs text-slate-600">LTC</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{Math.round(ltc * 1000) / 10}%</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-700">
                  Interpretation: the borrower is funding ~<span className="font-medium">{Math.round((1 - ltc) * 1000) / 10}%</span>{" "}
                  of total cost as equity (before any nuance like financing of fees, interest reserve, or eligible costs).
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Sanity Check vs LTV</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The same loan can look conservative on LTC but aggressive on LTV (or vice versa), depending on how value is defined.
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">As-Is Value (example)</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(asIsValue)}</p>
                  <p className="mt-2 text-xs text-slate-600">Implied As-Is LTV</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {Math.round(ltvAsIs * 1000) / 10}%
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">As-Completed / ARV (example)</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(arValue)}</p>
                  <p className="mt-2 text-xs text-slate-600">Implied AR LTV</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {Math.round(ltvAR * 1000) / 10}%
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-600">
                In interviews, say what value basis you mean (as-is vs as-completed). “LTV” without a value basis is incomplete.
              </p>
            </div>
          </div>
        </section>

        {/* LTC vs LTV */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Loan-to-Cost (LTC) vs Loan-to-Value (LTV)</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">LTC (Cost-Based)</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>
                  <span className="font-medium">Denominator:</span> total project cost
                </li>
                <li>
                  <span className="font-medium">Best for:</span> construction, value-add bridge, heavy CapEx
                </li>
                <li>
                  <span className="font-medium">What it controls:</span> over-advancing versus the business plan
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">LTV (Value-Based)</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>
                  <span className="font-medium">Denominator:</span> property value (as-is or as-completed)
                </li>
                <li>
                  <span className="font-medium">Best for:</span> stabilized loans, refis, permanent debt
                </li>
                <li>
                  <span className="font-medium">What it controls:</span> downside protection based on collateral value
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              <span className="font-medium">Interview-level takeaway:</span> LTC is a{" "}
              <span className="font-medium">budget discipline</span> metric; LTV is a{" "}
              <span className="font-medium">collateral valuation</span> metric. In bridge/construction, lenders often set both and size to the tighter constraint.
            </p>
          </div>
        </section>

        {/* Why lenders care + where it matters */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why Lenders Care About LTC</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Borrower “Skin in the Game”</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                A lower LTC generally means more borrower equity at risk. That alignment matters when execution risk is real (lease-up, renovations, repositioning).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Controls Business Plan Risk</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Cost is observable and tied to budgets/draws. Value can be uncertain during construction or early renovation phases.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Pairs With Structure</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                LTC interacts with covenants and reserves: interest reserve, CapEx escrow, TI/LC, and draw mechanics can effectively change true leverage.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Where LTC Matters Most (Bridge / Construction)</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
              <li>• Ground-up construction (draw-driven funding)</li>
              <li>• Heavy value-add renovations (business plan execution)</li>
              <li>• Transitional bridge loans (lease-up / re-tenanting)</li>
              <li>• Deals where as-is value is hard to anchor</li>
            </ul>
          </div>
        </section>

        {/* Interview framing */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to Say It in an Interview</h2>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-700">
              Use a tight definition, then show you understand why it’s used and how it differs from LTV:
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">
                <span className="font-semibold">Interview answer (clean):</span>{" "}
                “Loan-to-cost is the loan amount divided by total project cost—purchase plus the capital plan and eligible soft costs.
                It’s especially relevant in construction and value-add bridge lending because cost is observable and tied to draws,
                while value can be uncertain mid-execution. I’ll usually frame both LTC and LTV and size to whichever constraint is tighter.”
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If the interviewer pushes for nuance, add one sentence:
              <span className="font-medium">
                {" "}
                “The key is confirming what’s in ‘total cost’—some lenders include interest reserve and fees, others don’t.”
              </span>
            </p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Common Mistakes (That Cost Credibility)</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 1: Mixing LTC and LTV</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Saying “LTC is like LTV” without explaining the denominator signals you haven’t sized loans. Always state:{" "}
                <span className="font-medium">cost vs value</span>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 2: Ignoring Draw Mechanics</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                In construction/value-add, the loan may be funded over time. The “headline LTC” is less meaningful without understanding{" "}
                <span className="font-medium">initial funding</span>, <span className="font-medium">future funding</span>, and reserves.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 3: Not Defining “Total Cost”</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Different term sheets treat closing costs, interest reserve, TI/LC, and contingency differently. Don’t assume—confirm.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 4: Treating LTC as “Safety” Alone</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                LTC is leverage discipline, but lenders still underwrite to value, cash flow, and execution risk. A “good LTC” can still be a bad loan.
              </p>
            </div>
          </div>
        </section>

        {/* Senior takeaway */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Senior Takeaway</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              <span className="font-medium">LTC is the lender’s check as a % of the total budget.</span> It’s most important when value is being created (construction/value-add bridge). In real underwriting,
              LTC usually sits alongside LTV, DSCR, and debt yield, and the loan is sized to the tightest constraint—after accounting for reserves and draw structure.
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
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Related (Build the Cluster)</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/interview-prep/loan-sizing-cheat-sheet"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Loan Sizing Cheat Sheet</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Practical sizing constraints: LTV, LTC, DSCR, debt yield, and how they interact.
              </p>
            </Link>

            <Link
              href="/interview-prep/dscr-vs-debt-yield"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">DSCR vs Debt Yield</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Two lender lenses—cash flow coverage versus value-independent leverage.
              </p>
            </Link>

            <Link
              href="/interview-prep/bridge-lending-interview-questions"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Bridge Lending Interview Questions</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                How lenders underwrite transitional risk, reserves, and takeout assumptions.
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
                <p className="text-sm font-semibold text-slate-900">Want the full loan-sizing interview framework?</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Use the hub to build a complete, lender-grade explanation toolkit (not memorized buzzwords).
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
