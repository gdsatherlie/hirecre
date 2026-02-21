import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Walk Me Through Your Underwriting | HireCRE",
  description:
    "A lender-grade underwriting walkthrough: the exact structure to answer interviews with clarity—NOI build, sizing, exit, risks, and structure.",
};

export default function UnderwritingWalkthrough() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <p className="text-sm text-gray-500 mb-6">
        <Link href="/interview-prep" className="hover:underline">
          Interview Prep
        </Link>{" "}
        <span className="mx-2">/</span>
        <span>Underwriting Walkthrough</span>
      </p>

      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        “Walk Me Through Your Underwriting” (A Script That Sounds Senior)
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        This question is testing structure, judgment, and priorities. The goal is
        to tell a clean story, size to downside, confirm the exit, then explain the
        risks you’d protect with structure.
      </p>

      <QuickFramework />

      <Section title="1) Start with the deal story (10 seconds)">
        <WhatTheyTest>
          Whether you can summarize the deal in plain English and identify the business plan.
        </WhatTheyTest>

        <Callout title="Say it like this">
          “It’s a transitional [asset] in [market]. The business plan is [lease-up/renovation/re-tenanting]
          over ~[X] months, targeting NOI from ~$[A] to ~$[B]. My underwriting focuses on downside stability,
          execution timing, and refinance viability.”
        </Callout>
      </Section>

      <Section title="2) Build NOI the right way (and state assumptions)">
        <WhatTheyTest>
          Whether you’re disciplined about drivers: occupancy, rent, concessions, expenses, and timing.
        </WhatTheyTest>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Revenue (what you mention)">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>In-place rent roll & occupancy</li>
              <li>Market rent comps (with a haircut)</li>
              <li>Lease-up velocity / downtime assumptions</li>
              <li>Other income (be conservative)</li>
            </ul>
          </Card>
          <Card title="Expenses (what you mention)">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Taxes (reassessment risk)</li>
              <li>Insurance trend</li>
              <li>Payroll/repairs/utilities sensitivity</li>
              <li>Mgmt fee and reserves</li>
            </ul>
          </Card>
        </div>

        <Callout title="The line that separates pros from amateurs">
          “I underwrite to a conservative stabilized NOI, then I run a downside case where lease-up is
          delayed and rents are lower, because timing risk is usually what kills bridge deals.”
        </Callout>
      </Section>

      <Section title="3) Size the loan (downside first)">
        <WhatTheyTest>
          Whether you size to a binding constraint and can explain why (debt yield, DSCR, LTV).
        </WhatTheyTest>

        <Callout title="A clean sizing sequence">
          <ol className="list-decimal pl-6 space-y-2">
            <li>Size to minimum <b>downside debt yield</b> on conservative NOI</li>
            <li>Cross-check <b>DSCR</b> at stressed rates / cap cost</li>
            <li>Confirm <b>LTV</b> vs as-is and stabilized value (haircut)</li>
          </ol>
        </Callout>

        <MiniMath
          label="Mini example (keep numbers round)"
          rows={[
            ["Downside NOI", "$2.0mm"],
            ["Target debt yield", "8.5%"],
            ["Max loan", "~$23.5mm"],
          ]}
          note="Then say: ‘I’d confirm DSCR at stressed SOFR and verify the exit works.’"
        />
      </Section>

      <Section title="4) Underwrite the exit (this is where deals break)">
        <WhatTheyTest>
          Whether you underwrite takeout realistically: rate, cap, and lender appetite.
        </WhatTheyTest>

        <Callout title="Say this out loud">
          “I underwrite the refi at a realistic takeout rate and stressed exit cap, not a best-case.
          If the takeout doesn’t clear with reasonable assumptions, I either lower proceeds, add structure,
          or pass.”
        </Callout>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Exit cap: stressed vs market comps</li>
          <li>Takeout DSCR: lender requirement</li>
          <li>Timing risk: does stabilization happen before maturity?</li>
        </ul>
      </Section>

      <Section title="5) Name the risks (and how you’d protect the loan)">
        <WhatTheyTest>
          Whether you can identify the real loss drivers and match protections to risks.
        </WhatTheyTest>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Top risks (examples)">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Lease-up delay / tenant credit</li>
              <li>Capex overruns / construction timing</li>
              <li>Expense growth (taxes/insurance)</li>
              <li>Market move (cap rates / liquidity)</li>
            </ul>
          </Card>
          <Card title="Protections (examples)">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Interest + capex reserves</li>
              <li>Cash management triggers</li>
              <li>Milestones / covenants</li>
              <li>Guarantees where warranted</li>
            </ul>
          </Card>
        </div>

        <Callout title="How to finish your answer">
          “Net, I’m comfortable if downside debt yield holds, exit clears at realistic assumptions,
          and structure covers timing risk. If any one of those fails, I’ll adjust proceeds or pass.”
        </Callout>
      </Section>

      <BottomNav />
    </main>
  );
}

/* ---------- helpers ---------- */

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
      <h2 className="text-xl font-semibold mb-2">The answer structure (memorize this)</h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-800">
        <li>Deal story + business plan</li>
        <li>NOI build (key assumptions)</li>
        <li>Size the loan (downside first)</li>
        <li>Exit underwriting (cap + takeout rate)</li>
        <li>Risks + protections (structure)</li>
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
