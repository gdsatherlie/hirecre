// app/interview-prep/promote-structure/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Promote in Real Estate: What It Is + 70/30 After 8% Pref Example (Interview Prep) | HireCRE",
  description:
    "Promote explained for CRE interviews: what promote is, how GP promote works in an equity waterfall, a simple 70/30 after 8% pref example, alignment/risk framing, and interview-ready language.",
  alternates: { canonical: "/interview-prep/promote-structure" },
  openGraph: {
    title: "What Is a Promote in Real Estate? (70/30 After 8% Pref Example) | Interview Prep",
    description:
      "Institutional promote explanation with a clean waterfall example and interview-ready phrasing.",
    url: "/interview-prep/promote-structure",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Promote Structure Explained (Interview Prep)",
    description: "What promote is, why it exists, and a 70/30 after 8% pref example you can repeat.",
  },
};

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
function formatPct(x: number) {
  return `${(x * 100).toFixed(1)}%`;
}

export default function Page() {
  // Simple one-year illustration of "70/30 after 8% pref" on LP capital
  const lpEquity = 10_000_000;
  const gpEquity = 0; // simplify: GP has no co-invest in this illustration (we address co-invest in text)
  const totalEquity = lpEquity + gpEquity;

  const prefRate = 0.08;
  const prefDue = lpEquity * prefRate; // 800k

  const distributableCash = 2_000_000; // cash available to equity (simplified)
  const afterPref = Math.max(0, distributableCash - prefDue); // 1.2mm

  // Promote split: 70% LP / 30% GP on the residual after pref
  const lpSplit = 0.7;
  const gpSplit = 0.3;

  const lpGets = Math.min(distributableCash, prefDue) + afterPref * lpSplit; // pref + 70% residual
  const gpGets = afterPref * gpSplit; // 30% residual (promote)

  const faqs = [
    {
      question: "What is a promote in real estate?",
      answer:
        "A promote is the sponsor/GP’s incentive compensation in the equity waterfall. After investors (LPs) receive priority distributions such as return of capital and/or a preferred return, incremental profits may be split more favorably to the GP (e.g., 70/30), which is the promote.",
    },
    {
      question: "How does a promote work in an equity waterfall?",
      answer:
        "A waterfall defines the order and splits of distributions. Commonly: (1) return capital, (2) pay LP preferred return, (3) optional GP catch-up, then (4) split remaining cash flow at promote tiers (e.g., 80/20, then 70/30, etc.) based on hurdles.",
    },
    {
      question: "Is promote the same as carried interest?",
      answer:
        "In real estate, promote is often used similarly to carried interest: an incentive allocation of profits to the sponsor. The mechanics are governed by the partnership agreement and can be expressed as split tiers, catch-ups, or IRR-based hurdles.",
    },
    {
      question: "Why do LPs agree to pay a promote?",
     answer:
        "Because it aligns incentives: the GP earns disproportionate upside only after delivering agreed LP economics. In theory, promote encourages value creation, disciplined execution, and strong decision-making because the GP’s payoff is tied to performance.",
    },
    {
      question: "What are common promote structures?",
      answer:
        "Simple single-tier splits (e.g., 70/30 after an 8% pref) are common for explanation, but institutional deals frequently use multi-tier waterfalls tied to IRR hurdles (e.g., 80/20 up to 12% IRR, then 70/30 above). Catch-up provisions can materially change the GP’s economics.",
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
            Promote Structure in Real Estate: What It Is + a Clean 70/30 Example
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            Promote is the sponsor’s incentive economics. Interviewers are testing whether you understand{" "}
            <span className="font-medium">when</span> the GP earns it,{" "}
            <span className="font-medium">what it’s paid on</span>, and{" "}
            <span className="font-medium">why it exists</span>.
          </p>
        </header>

        {/* Definition + concept placement */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Definition</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              The <span className="font-medium">promote</span> is an incentive allocation of profits to the GP/sponsor inside the
              equity waterfall. After the LP receives priority economics (often return of capital and a preferred return), the GP may
              participate in remaining profits at an enhanced split (e.g., 70/30).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">What It’s Testing (Interview Lens)</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>• Do you understand distribution ordering (waterfall)?</li>
              <li>• Do you know the difference between pref, hurdle, and promote?</li>
              <li>• Can you explain alignment and the risk the GP is being paid to take?</li>
            </ul>
          </div>
        </section>

        {/* Simple waterfall example */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Simple Waterfall Example: “70/30 After an 8% Pref”
          </h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">Assumptions (Simple on Purpose)</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">LP Equity</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(lpEquity)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Preferred Return Rate</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatPct(prefRate)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Cash Available to Equity</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(distributableCash)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Pref Due to LP</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(prefDue)}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm leading-6 text-slate-700">
                  Step 1: Pay the pref to LP (if cash is available). Remaining cash ={" "}
                  <span className="font-medium">{formatUSD(afterPref)}</span>.
                </p>

                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Step 2: Split remaining cash 70% LP / 30% GP (promote)
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-600">LP total (pref + 70% residual)</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(lpGets)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-600">GP promote (30% residual)</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(gpGets)}</p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-600">
                  This is intentionally simplified. Real documents may include return of capital first, multi-tier hurdles, GP catch-up,
                  and GP co-invest that earns pro-rata distributions in addition to promote.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Promote vs Co-Invest</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                In institutional deals, the GP often has two economic streams:
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>
                  • <span className="font-medium">Co-invest</span>: GP’s capital earns pro-rata like the LP.
                </li>
                <li>
                  • <span className="font-medium">Promote</span>: GP earns incremental upside after hurdles.
                </li>
              </ul>
              <p className="mt-3 text-xs leading-5 text-slate-600">
                Interviewers like when you separate “GP as investor” from “GP as sponsor.”
              </p>
            </div>
          </div>
        </section>

        {/* GP incentive + alignment + risk-adjusted framing */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why Promote Exists (Alignment)</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Value Creation Incentive</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Promote pays the sponsor for executing a business plan that creates value beyond a baseline return.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">LP Priority Economics</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                LP gets paid first (capital/pref), reducing scenarios where the GP earns outsized economics without LP outcomes.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Risk-Adjusted Framing</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The GP is being compensated for execution risk: leasing, construction, capital markets, and downside decisions.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              <span className="font-medium">Senior lens:</span> A “big promote” is not automatically “good” or “bad.” It must be
              evaluated against the strategy’s risk, the sponsor’s role, co-invest, fee load, and whether the hurdle structure actually
              protects LP outcomes.
            </p>
          </div>
        </section>

        {/* Interview language */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to Say It in an Interview</h2>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-700">
              Define promote, place it in the waterfall, then show nuance (tiers/catch-up/co-invest).
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">
                <span className="font-semibold">Interview answer (clean):</span>{" "}
                “The promote is the GP’s incentive economics in the equity waterfall. After the LP gets priority distributions—often
                return of capital and a preferred return—the remaining profits may split more favorably to the GP, like 70/30. In
                institutional structures, it’s often tiered off IRR hurdles and may include a GP catch-up, so I’d confirm the exact
                mechanics in the partnership agreement.”
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If pushed: <span className="font-medium">“I separate GP co-invest (pro-rata) from promote (incentive).”</span>
            </p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Common Mistakes</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 1: Calling Pref the Promote</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Pref is a priority return to LP; promote is the GP’s enhanced split after hurdles. They are different concepts.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 2: Ignoring Catch-Up</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Catch-up can materially shift economics. Saying “70/30 after 8%” without acknowledging catch-up is incomplete.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 3: No Risk/Alignment Framing</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Sponsors earn promote for delivering outcomes under execution risk. Saying “it’s just extra comp” sounds junior.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Mistake 4: Not Stating the Hurdle Basis</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Many waterfalls are IRR-based. “Promote kicks in at X” is meaningless unless you name the hurdle and tier logic.
              </p>
            </div>
          </div>
        </section>

        {/* Senior takeaway */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Senior Takeaway</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              Promote is the mechanism that pays the sponsor for outperforming a baseline LP outcome. In interviews, show you understand
              (i) the ordering of distributions, (ii) the hurdle concept, and (iii) the nuance that catch-up and tiers can materially
              change “headline splits.”
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
              href="/interview-prep/preferred-return"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Preferred Return</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                What an 8% pref means, how it accrues, and how it’s discussed in interviews.
              </p>
            </Link>

            <Link
              href="/interview-prep/equity-waterfall-basics"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Equity Waterfall Basics</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Distribution ordering, catch-up mechanics, and tiered promote structures.
              </p>
            </Link>

            <Link
              href="/interview-prep/explain-irr-interview"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">How to Explain IRR in an Interview</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Time value, cash flow timing, and when IRR can be misleading.
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
                <p className="text-sm font-semibold text-slate-900">Want to speak fluently about equity economics?</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Build your full toolkit across waterfalls, promote, preferred return, and IRR—so you can answer with conviction.
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
