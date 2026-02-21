import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRE Mini Case Practice | HireCRE",
  description:
    "A short CRE mini-case with a lender-style answer: sizing, downside, exit, key risks, and structure.",
};

export default function MiniCasePractice() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <p className="text-sm text-gray-500 mb-6">
        <Link href="/interview-prep" className="hover:underline">
          Interview Prep
        </Link>{" "}
        <span className="mx-2">/</span>
        <span>Mini Case Practice</span>
      </p>

      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        CRE Mini Case Practice (Bridge Lending Style)
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        This is the fastest way to get “interview sharp.” Read the case, then practice a
        60–90 second answer using the framework below.
      </p>

      <QuickFramework />

      <Section title="The mini-case">
        <CaseBlock />
      </Section>

      <Section title="Your task (what the interviewer asks)">
        <WhatTheyTest>
          Whether you can (1) size the loan, (2) identify what breaks the deal, and
          (3) protect the lender with structure — quickly and clearly.
        </WhatTheyTest>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Prompts">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>How would you size the loan?</li>
              <li>What’s the biggest risk?</li>
              <li>How do you underwrite the exit?</li>
              <li>What structure would you require?</li>
            </ul>
          </Card>

          <Card title="What a strong answer includes">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Downside constraint (debt yield / DSCR)</li>
              <li>Exit at stressed cap + takeout rate</li>
              <li>2–3 key risks (timing / NOI / market)</li>
              <li>Protections mapped to risks</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="A model answer (60–90 seconds)">
        <Callout title="Answer script">
          <p className="text-gray-800">
            “This is a transitional MF deal with a clear capex and lease-up plan. I’d start by
            sizing to a downside debt yield using a conservative NOI — closer to in-place plus some
            credit for improvements, not full stabilization. Then I’d cross-check DSCR at a stressed
            rate and confirm the exit works using a realistic takeout rate and a stressed exit cap.
            The two key risks are timing (lease-up takes longer) and market (cap rates / takeout tighten),
            so I’d want an interest reserve sized to the timeline, capex/LC controls, and springing cash
            management with leasing milestones. If the takeout doesn’t clear under stress, I lower proceeds
            or pass.”
          </p>
        </Callout>

        <MiniMath
          label="How to “show numbers” without overdoing it"
          rows={[
            ["In-place NOI", "$2.8mm"],
            ["Target downside DY", "8.5%"],
            ["Implied max loan", "~$33mm"],
          ]}
          note="Then say: ‘I’d verify refi proceeds at stressed cap/rate clear the loan.’"
        />
      </Section>

      <Section title="Follow-up questions that make you sound senior">
        <Callout title="Ask these back to the interviewer or broker">
          <ul className="list-disc pl-6 space-y-2">
            <li>What is the critical path item (permits, unit turns, leasing velocity)?</li>
            <li>What’s the sponsor’s track record on this exact business plan?</li>
            <li>What is Plan B if stabilization slips past maturity?</li>
            <li>What concessions or renewal assumptions are embedded in the pro forma?</li>
          </ul>
        </Callout>
      </Section>

      <BottomNav />
    </main>
  );
}

/* helpers */

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
      <h2 className="text-xl font-semibold mb-2">The mini-case framework</h2>
      <ol className="list-decimal pl-6 space-y-2 text-gray-800">
        <li>Deal story + business plan</li>
        <li>Downside sizing (debt yield)</li>
        <li>Exit underwriting (cap + takeout rate)</li>
        <li>Key risks (timing / NOI / market)</li>
        <li>Structure (reserves / cash mgmt / milestones)</li>
      </ol>
    </div>
  );
}

function CaseBlock() {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <p className="text-sm font-semibold text-gray-900 mb-3">Deal summary</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li><b>Asset:</b> 220-unit multifamily, suburban major metro</li>
        <li><b>Occupancy:</b> 87% today (target 94%)</li>
        <li><b>In-place NOI:</b> ~$2.8mm</li>
        <li><b>Business plan:</b> $6.0mm capex to renovate units + improve leasing</li>
        <li><b>Stabilized NOI:</b> ~$3.6mm (management’s view)</li>
        <li><b>Request:</b> $40mm senior bridge, 30-month term, IO</li>
        <li><b>Sponsor:</b> 6 deals completed, but only 1 in this exact market</li>
      </ul>
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
