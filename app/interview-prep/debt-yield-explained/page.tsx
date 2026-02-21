import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Yield Explained | HireCRE",
  description:
    "Debt yield explained with examples: why lenders use it, how to size to it, and how it connects to exit risk and refinance viability.",
};

export default function DebtYieldExplained() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <p className="text-sm text-gray-500 mb-6">
        <Link href="/interview-prep" className="hover:underline">
          Interview Prep
        </Link>{" "}
        <span className="mx-2">/</span>
        <span>Debt Yield Explained</span>
      </p>

      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        Debt Yield Explained (The Way Lenders Actually Use It)
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Debt yield is one of the fastest ways to communicate lender basis and downside
        protection — especially in bridge lending. Interviews use it as a shortcut to
        test whether you think like a lender (not a spreadsheet).
      </p>

      <QuickFramework />

      <Section title="1) Definition: what debt yield is (and isn’t)">
        <WhatTheyTest>
          Whether you can define debt yield in one sentence and explain why it matters,
          without confusing it with DSCR or LTV.
        </WhatTheyTest>

        <Callout title="Clean definition">
          <p className="text-gray-800">
            <b>Debt yield</b> = <b>NOI / Loan Amount</b>. It’s a lender’s “income-on-basis”
            check: if the plan stalls, what income does the collateral generate relative
            to our loan basis?
          </p>
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="What it captures">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Basis / asset income relative to loan</li>
              <li>Downside protection if NOI disappoints</li>
              <li>Less sensitive to rate changes than DSCR</li>
            </ul>
          </Card>

          <Card title="What it doesn’t capture">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Actual cash flow coverage of debt service</li>
              <li>Capex / leasing timing risk by itself</li>
              <li>Exit proceeds (you still need exit underwriting)</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="2) How lenders use it in sizing">
        <WhatTheyTest>
          Whether you can describe debt yield as a sizing constraint and choose a conservative NOI
          (in-place or haircut-stabilized), then cross-check DSCR and exit.
        </WhatTheyTest>

        <Callout title="Sizing logic (say this in interviews)">
          “I size to a minimum debt yield on a conservative NOI — often in-place or haircut-stabilized —
          then cross-check DSCR at stressed rates and confirm the takeout works at a realistic exit cap
          and refinance rate.”
        </Callout>

        <MiniMath
          label="Sizing example"
          rows={[
            ["Conservative NOI", "$2.4mm"],
            ["Target debt yield", "8.0%"],
            ["Max loan (NOI / DY)", "$30.0mm"],
          ]}
          note="Then add: ‘I’ll cross-check DSCR at stressed SOFR/spread and verify exit proceeds clear.’"
        />
      </Section>

      <Section title="3) Debt yield vs DSCR (when each matters)">
        <WhatTheyTest>
          Whether you understand why DSCR can look “fine” because of reserves/rate caps or temporary interest
          reserves, while debt yield still tells you your basis is tight.
        </WhatTheyTest>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Debt yield is strongest when…">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Transitional cash flow is volatile</li>
              <li>Debt service is temporarily managed (reserves)</li>
              <li>Rates are moving and DSCR swings</li>
            </ul>
          </Card>
          <Card title="DSCR is strongest when…">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Cash flow is stable and recurring</li>
              <li>You’re underwriting permanent takeout</li>
              <li>Amortization / fixed rates matter</li>
            </ul>
          </Card>
        </div>

        <Callout title="A senior-sounding line">
          “Debt yield tells me the basis. DSCR tells me survivability. In bridge, I want both —
          but I size to the one that protects me if execution is delayed.”
        </Callout>
      </Section>

      <Section title="4) The interview trap: mixing NOI definitions">
        <WhatTheyTest>
          Whether you’re disciplined about which NOI you’re using (in-place, underwritten, stabilized).
          Strong candidates explicitly state it.
        </WhatTheyTest>

        <Callout title="Say this out loud">
          “My debt yield depends on the NOI definition. I’ll quote both: in-place DY for downside and
          stabilized DY for the business plan — and I’ll make sure the loan is still ‘money-good’ on
          the downside case.”
        </Callout>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><b>In-place NOI:</b> downside / today’s reality</li>
          <li><b>Underwritten NOI:</b> haircut of assumptions</li>
          <li><b>Stabilized NOI:</b> business plan outcome</li>
        </ul>
      </Section>

      <Section title="5) How it ties to exit risk (the real point)">
        <WhatTheyTest>
          Whether you connect the dots: if debt yield is thin, you’re relying on a perfect exit environment.
        </WhatTheyTest>

        <Callout title="Exit connection (simple and powerful)">
          “A thin debt yield means I’m tight on basis. If cap rates widen or NOI misses, exit proceeds compress —
          which is why I underwrite the takeout at a stressed cap and rate.”
        </Callout>

        <MiniMath
          label="Quick exit reality check (conceptual)"
          rows={[
            ["Stabilized NOI", "$3.2mm"],
            ["Exit cap (stressed)", "6.50%"],
            ["Implied value", "~$49.2mm"],
          ]}
          note="Then compare value vs loan + costs and explain refinance margin."
        />
      </Section>

      <BottomNav />
    </main>
  );
}

/* ---------- shared UI helpers ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function WhatTheyTest({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm font-semibold text-gray-900 mb-2">What they’re testing</p>
      <p className="text-gray-700">{children}</p>
    </div>
  );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-gray-50 p-5">
      <p className="text-sm font-semibold text-gray-900 mb-2">{title}</p>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm font-semibold text-gray-900 mb-3">{title}</p>
      {children}
    </div>
  );
}

function MiniMath({
  label,
  rows,
  note,
}: {
  label: string;
  rows: [string, string][];
  note?: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm font-semibold text-gray-900 mb-3">{label}</p>
      <div className="space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4">
            <span className="text-gray-700">{k}</span>
            <span className="font-semibold text-gray-900">{v}</span>
          </div>
        ))}
      </div>
      {note ? <p className="mt-3 text-sm text-gray-600">{note}</p> : null}
    </div>
  );
}

function QuickFramework() {
  return (
    <div className="rounded-2xl border bg-gray-50 p-6">
      <h2 className="text-xl font-semibold mb-2">Interview-ready explanation (20 seconds)</h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-800">
        <li>Define it (NOI / Loan)</li>
        <li>State which NOI you’re using (in-place vs stabilized)</li>
        <li>Use it for sizing (minimum DY)</li>
        <li>Cross-check DSCR</li>
        <li>Confirm exit with stressed cap/rate</li>
      </ol>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="mt-14 flex flex-wrap gap-3">
      <Link
        href="/interview-prep"
        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
      >
        Back to Hub
      </Link>
      <Link
        href="/board"
        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
      >
        Browse Jobs
      </Link>
      <Link
        href="/alerts"
        className="rounded-lg bg-black text-white px-4 py-2 text-sm hover:opacity-90 transition"
      >
        Get Weekly Alerts
      </Link>
    </div>
  );
}
