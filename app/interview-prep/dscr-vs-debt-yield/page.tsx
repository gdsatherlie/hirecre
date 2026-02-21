export const metadata = {
  title: "DSCR vs Debt Yield (With Example) | HireCRE",
  description:
    "Learn the difference between DSCR and debt yield with clear examples, how lenders use each metric, and how to explain it in a CRE interview.",
};

const FAQS = [
  {
    q: "Which matters more: DSCR or debt yield?",
    a: "It depends on the lender and the deal. Many bridge lenders lean on debt yield for sizing because it’s rate-independent, while takeout/refi underwriting often stresses DSCR at a takeout rate. In interviews, say you size to both and explain which constraint binds and why.",
  },
  {
    q: "Why do bridge lenders like debt yield?",
    a: "Debt yield is less sensitive to interest rates. It’s basically an unlevered return to the lender on Day 1 NOI. It gives a quick check on basis and downside if the exit is delayed or cap rates back up.",
  },
  {
    q: "What NOI should you use for debt yield?",
    a: "Use a conservative, in-place NOI. In interviews, explicitly state whether you’re using in-place vs stabilized NOI and why—then show how sizing changes under each.",
  },
  {
    q: "What’s a “good” debt yield?",
    a: "There isn’t one universal number, but many lenders like to see a stronger debt yield on riskier deals and will accept lower debt yield for core, stable cash flow. Don’t quote a single number as gospel—explain how it tightens/loosens by asset type, risk, and market.",
  },
];

function jsonLdFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

function Related({
  items,
}: {
  items: { title: string; href: string; description?: string }[];
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">Related</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="font-semibold text-slate-900">{item.title}</div>
            {item.description ? (
              <div className="mt-2 text-sm text-slate-600">
                {item.description}
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const faqLd = jsonLdFaq();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* FAQ schema for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          DSCR vs Debt Yield (With Example)
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Two metrics that come up constantly in CRE debt interviews. The trick
          is explaining them clearly, sizing to both, and stating which one
          actually binds.
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="DSCR (Debt Service Coverage Ratio)">
          Measures cash flow coverage of debt service.
          <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
            <div className="font-semibold">Formula</div>
            <div className="mt-1 text-sm">
              DSCR = NOI / Annual Debt Service
            </div>
          </div>
        </Card>

        <Card title="Debt Yield">
          Measures unlevered NOI as a percent of loan amount. Rate-independent.
          <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
            <div className="font-semibold">Formula</div>
            <div className="mt-1 text-sm">
              Debt Yield = NOI / Loan Amount
            </div>
          </div>
        </Card>

        <Card title="How to say it in an interview">
          “I size to DSCR, debt yield, and LTV. Then I explain which constraint
          binds and why—rate sensitivity vs basis vs exit risk.”
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          The key difference (in plain English)
        </h2>
        <div className="mt-3 text-sm text-slate-600">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold text-slate-900">DSCR</span> changes
              when interest rates change (because debt service changes).
            </li>
            <li>
              <span className="font-semibold text-slate-900">Debt yield</span>{" "}
              doesn’t care about the interest rate—only NOI vs loan basis.
            </li>
            <li>
              In volatile rate environments, debt yield is a quick way to avoid
              “loan too big for the cash flow.”
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          Worked example (numbers you can repeat in an interview)
        </h2>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Card title="Assumptions">
            <ul className="list-disc pl-5 space-y-2">
              <li>In-place NOI: $1,000,000</li>
              <li>Loan amount: $10,000,000</li>
              <li>Interest-only rate (scenario A): 8.0%</li>
              <li>Interest-only rate (scenario B): 10.0%</li>
            </ul>
          </Card>

          <Card title="Results">
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                <div className="font-semibold">Debt Yield</div>
                <div className="mt-1 text-sm">
                  $1,000,000 / $10,000,000 = <span className="font-semibold">10.0%</span>
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Same in both rate scenarios.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                <div className="font-semibold">DSCR @ 8.0% IO</div>
                <div className="mt-1 text-sm">
                  Debt service = $10,000,000 × 8.0% = $800,000 → DSCR =
                  $1,000,000 / $800,000 ={" "}
                  <span className="font-semibold">1.25x</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                <div className="font-semibold">DSCR @ 10.0% IO</div>
                <div className="mt-1 text-sm">
                  Debt service = $10,000,000 × 10.0% = $1,000,000 → DSCR =
                  $1,000,000 / $1,000,000 ={" "}
                  <span className="font-semibold">1.00x</span>
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  DSCR compresses as rates rise.
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="font-semibold text-slate-900">
            The “senior” takeaway to say out loud
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Debt yield tells you whether the loan basis makes sense against
            in-place cash flow. DSCR tells you how rate-sensitive the deal is.
            If DSCR is tight at a stressed takeout rate, exit/refi risk is real
            even if the day-1 debt yield looks fine.
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          How lenders actually use them (interview framing)
        </h2>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Card title="Where DSCR shows up">
            <ul className="list-disc pl-5 space-y-2">
              <li>Permanent takeout / refinance underwriting</li>
              <li>Stressed rate sensitivity (can the deal refi?)</li>
              <li>Amortizing debt (agency / bank term debt)</li>
            </ul>
          </Card>

          <Card title="Where debt yield shows up">
            <ul className="list-disc pl-5 space-y-2">
              <li>Bridge loan sizing (quick cash-flow-to-basis check)</li>
              <li>Downside check when cap rates back up</li>
              <li>Deals with uncertainty on exit timing</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {FAQS.map((f) => (
            <Card key={f.q} title={f.q}>
              {f.a}
            </Card>
          ))}
        </div>
      </section>

      <Related
        items={[
          {
            title: "Loan Sizing Cheat Sheet",
            href: "/interview-prep/loan-sizing-cheat-sheet",
            description: "Size to DSCR, debt yield, and LTV — then explain what binds.",
          },
          {
            title: "Debt Yield Explained (With Example)",
            href: "/interview-prep/debt-yield-explained",
            description: "What NOI to use, why it matters, and how lenders think about it.",
          },
          {
            title: "Exit Underwriting (Refi + Sale)",
            href: "/interview-prep/exit-underwriting",
            description: "How to underwrite takeout DSCR, stressed exit caps, and proceeds.",
          },
        ]}
      />

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="font-semibold text-slate-900">Want weekly roles + prep?</div>
        <div className="mt-2 text-sm text-slate-600">
          Get top jobs and short technical prompts delivered weekly.
        </div>
        <a
          href="/alerts"
          className="mt-4 inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          Subscribe to Alerts
        </a>
      </div>
    </main>
  );
}
