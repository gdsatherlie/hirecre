// app/interview-prep/preferred-return/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preferred Return in Real Estate: What an 8% Pref Means + Waterfall Example (Interview Prep) | HireCRE",
  description:
    "Preferred return (pref) explained for CRE interviews: definition, how it works in equity waterfalls, an 8% pref worked example, what happens if the pref isn’t met, pref vs IRR hurdle, and interview-ready phrasing.",
  alternates: { canonical: "/interview-prep/preferred-return" },
  openGraph: {
    title: "What Is a Preferred Return? (8% Pref Example + Waterfall) | Interview Prep",
    description:
      "Institutional explanation of preferred return (pref) with a worked 8% example, waterfall mechanics, pref vs IRR hurdle, and interview language.",
    url: "/interview-prep/preferred-return",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Preferred Return (Pref) Explained (Interview Prep)",
    description: "8% pref meaning, waterfall mechanics, and interview-ready framing.",
  },
};

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatPct(x: number) {
  return `${(x * 100).toFixed(1)}%`;
}

export default function Page() {
  // Worked example: 8% pref, simple annual distribution illustration
  const lpEquity = 10_000_000;
  const prefRate = 0.08;
  const year1CashAvailable = 600_000; // below pref
  const year2CashAvailable = 1_100_000; // catches up (illustrative)

  const prefAccruedY1 = lpEquity * prefRate; // 800k
  const unpaidPrefCarryIntoY2 = Math.max(0, prefAccruedY1 - year1CashAvailable); // 200k

  const prefAccruedY2 = lpEquity * prefRate; // 800k
  const prefDueY2Total = unpaidPrefCarryIntoY2 + prefAccruedY2; // 1.0mm
  const prefPaidY2 = Math.min(year2CashAvailable, prefDueY2Total); // 1.0mm
  const remainingAfterPrefY2 = Math.max(0, year2CashAvailable - prefPaidY2); // 100k

  const faqs = [
    {
      question: "What is a preferred return in real estate?",
      answer:
        "A preferred return (pref) is a priority return paid to investors (typically LPs) before the sponsor (GP) participates in profits beyond their pro-rata share. It’s usually stated as an annual percentage (e.g., 8%) applied to contributed capital and is a feature of the equity waterfall.",
    },
    {
      question: "What does an “8% pref” actually mean?",
      answer:
        "It means LPs are entitled to receive an 8% annual return on their invested capital (subject to available distributable cash) before the GP earns promote or incentive distributions. Whether it is cumulative and compounding depends on the operating agreement.",
    },
    {
      question: "What happens if the preferred return is not met?",
      answer:
        "If the pref is cumulative, any unpaid pref typically accrues and must be paid in future periods or at exit before promote distributions occur. If it is non-cumulative, missed pref is generally not carried forward, which is less common in institutional real estate waterfalls.",
    },
    {
      question: "Is preferred return the same as an IRR hurdle?",
      answer:
        "No. A pref is a distribution priority expressed as a rate on invested capital. An IRR hurdle is a performance threshold based on timing of cash flows (time value of money) that must be achieved before higher promote tiers activate. Many deals include both concepts, but they are not interchangeable.",
    },
    {
      question: "Why do LPs care about preferred return?",
      answer:
        "It improves alignment and downside protection by ensuring LPs receive a baseline return before the sponsor participates in asymmetric upside. It also creates discipline around the business plan and reduces situations where GP earns outsized compensation without delivering competitive LP outcomes.",
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
            Preferred Return (Pref): What It Means, How It Works, and How to Explain It in an Interview
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
            A preferred return is not “marketing language” — it’s a contractual distribution priority inside the equity waterfall.
            Interviewers use it to test whether you understand how LP/GP economics actually get paid.
          </p>
        </header>

        {/* Definition + where it lives */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Definition</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              A <span className="font-medium">preferred return (“pref”)</span> is a{" "}
              <span className="font-medium">priority return</span> owed to investors (typically the LP) before the sponsor (GP)
              earns promote/incentive distributions. It’s commonly expressed as an annual percentage (e.g., 8%) applied to{" "}
              <span className="font-medium">contributed capital</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Where It Sits (Waterfall)</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              The pref is typically part of an equity waterfall sequence such as:
            </p>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <ol className="space-y-2 text-sm leading-6 text-slate-700">
                <li>
                  <span className="font-medium">1) Return of capital</span> (often first, but not always)
                </li>
                <li>
                  <span className="font-medium">2) Preferred return</span> to LP
                </li>
                <li>
                  <span className="font-medium">3) Catch-up</span> (optional, benefits GP)
                </li>
                <li>
                  <span className="font-medium">4) Promote tiers</span> (split changes after hurdles)
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 8% pref worked example */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">8% Preferred Return Worked Example</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <h3 className="text-base font-semibold text-slate-900">Assumptions (Simple, Interview-Friendly)</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">LP Equity</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatUSD(lpEquity)}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-600">Preferred Return Rate</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{formatPct(prefRate)}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm leading-6 text-slate-700">
                  Annual pref owed (ignoring compounding and day count for interview simplicity):
                </p>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-900">
                    Pref owed each year ≈ {formatUSD(lpEquity)} × {formatPct(prefRate)} ={" "}
                    {formatUSD(prefAccruedY1)}
                  </p>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Year 1</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Cash available to distribute: <span className="font-medium">{formatUSD(year1CashAvailable)}</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Pref owed: <span className="font-medium">{formatUSD(prefAccruedY1)}</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Unpaid pref (if cumulative):{" "}
                      <span className="font-medium">{formatUSD(unpaidPrefCarryIntoY2)}</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Year 2</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Cash available to distribute: <span className="font-medium">{formatUSD(year2CashAvailable)}</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Pref due (current + unpaid):{" "}
                      <span className="font-medium">{formatUSD(prefDueY2Total)}</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Remaining after pref: <span className="font-medium">{formatUSD(remainingAfterPrefY2)}</span>
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-600">
                  Note: Real documents specify whether the pref is cumulative, compounding, and how timing is measured.
                  In interviews, keep the math clean and state the assumptions.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">What “8% Pref” Is (and Isn’t)</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>
                  • <span className="font-medium">Is:</span> a priority return paid before promote.
                </li>
                <li>
                  • <span className="font-medium">Is:</span> often measured on invested capital.
                </li>
                <li>
                  • <span className="font-medium">Isn’t:</span> a guaranteed return (depends on distributable cash).
                </li>
                <li>
                  • <span className="font-medium">Isn’t:</span> the same as an IRR hurdle.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pref not met + pref vs IRR */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What Happens If the Pref Isn’t Met?</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Cumulative Pref (Most Institutional Structures)</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                If distributable cash is insufficient, the unpaid pref typically{" "}
                <span className="font-medium">accrues</span> and must be satisfied in future periods or at exit before promote
                distributions occur.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Interview line: <span className="font-medium">“If it’s cumulative, it carries and sits ahead of promote.”</span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Non-Cumulative Pref (Less Common)</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Missed pref is typically not carried forward. If the deal underperforms early, the sponsor may still reach promote
                tiers later depending on the waterfall design (less LP-friendly).
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Interview line: <span className="font-medium">“Non-cumulative is more sponsor-friendly; you’d confirm the doc.”</span>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-base font-semibold text-slate-900">Preferred Return vs IRR Hurdle</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              A pref is usually a <span className="font-medium">distribution priority</span> stated as a rate on capital. An IRR hurdle
              is a <span className="font-medium">performance gate</span> based on the time value of money that determines when higher
              promote splits activate. They can coexist, but they are different tools.
            </p>
          </div>
        </section>

        {/* Why LPs care */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why LPs Care (Institutional Lens)</h2>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Alignment</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The sponsor earns meaningful upside only after delivering a baseline return to investors, reducing “heads I win” optics.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Downside Protection</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                In underperformance scenarios, the pref forces economics to prioritize LP recovery before asymmetric GP compensation.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Incentive Discipline</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                It helps ensure the GP is paid for true value creation rather than simply for deploying capital.
              </p>
            </div>
          </div>
        </section>

        {/* Interview framing */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to Say It in an Interview</h2>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-slate-700">
              Keep it tight: define it, place it in the waterfall, then mention one nuance (cumulative / compounding / catch-up).
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">
                <span className="font-semibold">Interview answer (clean):</span>{" "}
                “A preferred return is a priority return to the LP—often something like 8% on invested capital—that gets paid before the
                sponsor earns promote. If it’s cumulative, any unpaid pref accrues and has to be satisfied before promote tiers activate.
                It’s a way to align incentives and protect LP economics in downside scenarios.”
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              If pushed: <span className="font-medium">“I’d confirm whether it’s cumulative and whether there’s a GP catch-up.”</span>
            </p>
          </div>
        </section>

        {/* Senior takeaway */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Senior Takeaway</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-6 text-slate-700">
              The preferred return is best understood as <span className="font-medium">a priority of distributions</span>, not a promise.
              In institutional waterfalls, it’s a core alignment feature: LPs receive a baseline return before promote economics reward the GP.
              In interviews, show you know where it sits in the waterfall and state the key document nuances (cumulative/compounding/catch-up).
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
              href="/interview-prep/equity-waterfall-basics"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Equity Waterfall Basics</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Distribution ordering, catch-up mechanics, and how promote tiers actually work.
              </p>
            </Link>

            <Link
              href="/interview-prep/promote-structure"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">Promote Structure</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                GP incentive economics with a simple 70/30 after 8% pref walkthrough.
              </p>
            </Link>

            <Link
              href="/interview-prep/repe-interview-questions"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">REPE Interview Questions</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The prompts you’ll actually get across underwriting, returns, and deal judgment.
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
                <p className="text-sm font-semibold text-slate-900">Want the full equity economics toolkit?</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Build fluency across waterfalls, promote, IRR, and exit math—so your interview answers sound like real deal work.
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
