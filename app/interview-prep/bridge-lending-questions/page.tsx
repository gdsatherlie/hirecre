import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridge Lending Interview Questions | HireCRE",
  description:
    "Real bridge lending interview questions (and how to answer): sizing, debt yield, DSCR, exit assumptions, sponsor risk, structure, and downside cases.",
};

export default function BridgeLendingQuestions() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <p className="text-sm text-gray-500 mb-6">
        <Link href="/interview-prep" className="hover:underline">
          Interview Prep
        </Link>{" "}
        <span className="mx-2">/</span>
        <span>Bridge Lending Questions</span>
      </p>

      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        Bridge Lending Interview Questions (That Actually Matter)
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Bridge lending interviews aren’t about reciting formulas — they test
        whether you can size a loan in a downside case, protect the position
        with structure, and underwrite a realistic exit. Below are the prompts
        you’ll hear in real debt origination / credit interviews, plus what the
        interviewer is actually testing.
      </p>

      <QuickFramework />

      <Section title="1) Loan sizing: “How would you size this loan?”">
        <WhatTheyTest>
          Whether you size to a *constraint* (debt yield / DSCR / LTV) and can
          articulate the tradeoffs. Bonus points if you size to downside first
          and then confirm the exit.
        </WhatTheyTest>

        <Callout title="A clean, credible answer structure">
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <b>Start with the story:</b> transitional vs stabilized, business
              plan duration, key execution items.
            </li>
            <li>
              <b>Size to downside debt yield</b> on in-place or conservatively
              stabilized NOI.
            </li>
            <li>
              <b>Cross-check DSCR</b> at stressed rate / cap (or rate cap).
            </li>
            <li>
              <b>Back into LTV</b> using the lesser of (as-is value, stabilized
              value with haircut, or cost).
            </li>
            <li>
              <b>Confirm the exit:</b> refinance proceeds at a realistic
              takeout rate and cap.
            </li>
          </ol>
        </Callout>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-6">
          <li>
            “What metric is primary for you: debt yield, DSCR, or LTV — and why?”
          </li>
          <li>
            “What NOI are you using for sizing: in-place, partial, or stabilized?”
          </li>
          <li>
            “What downside case do you underwrite before you talk structure?”
          </li>
        </ul>
      </Section>

      <Section title="2) Debt yield: “What’s your minimum debt yield and why?”">
        <WhatTheyTest>
          Whether you understand debt yield as a *basis / asset-quality check*,
          not a magic number — and whether you can explain why it matters more
          in transitional deals.
        </WhatTheyTest>

        <Callout title="How to answer without sounding canned">
          <p className="text-gray-800">
            “I treat debt yield as the first-principles downside check: if the
            business plan stalls, what’s the lender’s basis relative to the
            asset’s income? I size to a minimum on a conservative NOI (often
            closer to in-place or haircut-stabilized), then verify DSCR at a
            stressed rate and ensure the exit refi works at a realistic takeout
            rate and cap.”
          </p>
        </Callout>

        <MiniMath
          label="Example (keep it simple)"
          rows={[
            ["Conservative NOI", "$2.0mm"],
            ["Loan amount", "$25.0mm"],
            ["Debt yield", "8.0%"],
          ]}
          note="Then say what 8% implies: you’re not relying on perfect execution to be protected."
        />

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-6">
          <li>“Do you size to in-place or stabilized debt yield?”</li>
          <li>“What happens to your sizing if cap rates move +50 to +100 bps?”</li>
          <li>“When does DSCR become the binding constraint instead?”</li>
        </ul>
      </Section>

      <Section title="3) Exit underwriting: “How do you underwrite the takeout?”">
        <WhatTheyTest>
          Whether you underwrite the exit like a skeptic: takeout rates, lender
          appetite, cap rate assumptions, and time-to-stabilize. This is where
          most candidates get exposed.
        </WhatTheyTest>

        <Callout title="The words interviewers want to hear">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              “I underwrite the exit to a <b>realistic takeout rate</b>, not the
              current in-place coupon.”
            </li>
            <li>
              “I assume a <b>stressed exit cap</b> relative to today’s comps,
              especially on longer duration.”
            </li>
            <li>
              “I confirm the refi works at both <b>NOI underperformance</b> and{" "}
              <b>cap rate widening</b>.”
            </li>
          </ul>
        </Callout>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-6">
          <li>“What exit cap do you use and how do you justify it?”</li>
          <li>“What’s the takeout DSCR assumption?”</li>
          <li>“What happens if leasing is 6–12 months behind plan?”</li>
        </ul>
      </Section>

      <Section title="4) Structure: “What protections would you require?”">
        <WhatTheyTest>
          Whether you understand structure as “insurance” against the two real
          failure modes: (1) business plan delays and (2) operating shortfall.
        </WhatTheyTest>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Cash & operating protections">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Interest reserve (and how you size it)</li>
              <li>TI/LC or capex reserve tied to scope</li>
              <li>Springing cash management</li>
              <li>Performance triggers (NOI / occupancy)</li>
            </ul>
          </Card>

          <Card title="Control & credit protections">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Covenants (DSCR / DY tests, reporting)</li>
              <li>Milestones (leases signed, permits, etc.)</li>
              <li>Completion / carry guarantees (where relevant)</li>
              <li>Bad boy carveouts + recourse nuances</li>
            </ul>
          </Card>
        </div>

        <Callout title="Good interviewer follow-up">
          “Which protection matters most depends on the risk: for a heavy
          capex/reposition, I care about scope/timing controls; for a lease-up,
          I care about cash management and leasing milestones.”
        </Callout>
      </Section>

      <Section title="5) Sponsor: “What makes this sponsor lendable?”">
        <WhatTheyTest>
          Whether you know sponsor quality is more than net worth. They want to
          hear: repeatability, liquidity, and execution on the exact business
          plan you’re underwriting.
        </WhatTheyTest>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Green flags">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Direct experience in the same asset + market</li>
              <li>Liquidity relative to carry + capex</li>
              <li>Evidence of operational capability (PM/leasing)</li>
              <li>Clear capital stack & real equity at risk</li>
            </ul>
          </Card>

          <Card title="Red flags">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>“Spreadsheet pro forma” with weak operating plan</li>
              <li>Thin liquidity / multiple projects in flight</li>
              <li>Over-reliance on refi timing</li>
              <li>History of extensions / maturity stress</li>
            </ul>
          </Card>
        </div>

        <Callout title="The sponsor question to ask that sounds senior">
          “Walk me through your last 2–3 deals that look like this — what went
          wrong, and what did you do when the plan didn’t go perfectly?”
        </Callout>
      </Section>

      <Section title="6) The downside case: “What breaks the deal?”">
        <WhatTheyTest>
          Whether you can identify the single biggest driver of loss and explain
          how you’d reduce it (lower leverage, more structure, different exit).
        </WhatTheyTest>

        <Callout title="The 3 most common break-points">
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <b>Execution delay:</b> renovations/leasing take longer → burn
              reserve → forced extension.
            </li>
            <li>
              <b>NOI miss:</b> rent growth doesn’t show up → debt yield falls →
              exit proceeds shrink.
            </li>
            <li>
              <b>Market move:</b> cap rates widen / takeout proceeds compress →
              refi doesn’t clear.
            </li>
          </ol>
        </Callout>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-6">
          <li>“What’s your extension strategy and what triggers it?”</li>
          <li>“How do you think about rate caps vs floating exposure?”</li>
          <li>“If the takeout market is shut, what’s Plan B?”</li>
        </ul>
      </Section>

      <BottomNav />
    </main>
  );
}

/* ---------- components ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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

function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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
      <h2 className="text-xl font-semibold mb-2">A 30-second answer framework</h2>
      <p className="text-gray-700 mb-4">
        If you get stuck in an interview, use this sequence:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-800">
        <li>Deal story + business plan</li>
        <li>Downside sizing (debt yield first)</li>
        <li>Exit underwriting (takeout rate + cap)</li>
        <li>Key risks (execution / NOI / market)</li>
        <li>Structure to protect the lender</li>
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
