import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridge Lending Interview Questions | HireCRE",
  description:
    "Real bridge lending interview questions and how to answer them: sizing, debt yield, structure, refinance risk, and sponsor evaluation.",
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
        Bridge Lending Interview Questions
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Debt originations interviews test how you think about leverage, downside
        protection, and refinance risk — not just formulas. Use the prompts
        below, then answer in a tight structure.
      </p>

      <Section title="What bridge lenders actually care about">
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Downside debt yield and “money-good” basis</li>
          <li>Exit cap + refinance viability (not just stabilized NOI)</li>
          <li>Business plan credibility and timeline risk</li>
          <li>Sponsor track record, liquidity, and execution ability</li>
          <li>Structure: reserves, covenants, recourse, guarantees</li>
        </ul>
      </Section>

      <Section title="10 questions you will hear">
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>How do you size the loan?</li>
          <li>What minimum debt yield are you targeting and why?</li>
          <li>How do you underwrite the exit cap rate?</li>
          <li>What breaks this deal in a downside scenario?</li>
          <li>How do you think about rate caps and interest-rate risk?</li>
          <li>What reserves would you require and why?</li>
          <li>Where do you see execution risk in the business plan?</li>
          <li>How do you evaluate sponsor quality?</li>
          <li>What are the key covenants you’d push for?</li>
          <li>If the takeout market is shut, what’s Plan B?</li>
        </ul>
      </Section>

      <Section title="How to answer like a professional">
        <div className="rounded-2xl border bg-gray-50 p-5 text-gray-800">
          <p className="font-semibold mb-2">Use this 5-part structure:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Start with the story: asset, business plan, timeline</li>
            <li>Size to downside: debt yield + conservative NOI</li>
            <li>Confirm exit: refi or sale using realistic cap/rate</li>
            <li>Identify key risks: operations, leasing, capital, market</li>
            <li>Protect with structure: reserves, covenants, guarantees</li>
          </ol>
        </div>
      </Section>

      <div className="mt-12 flex gap-3">
        <Link
          href="/interview-prep"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
        >
          Back to Hub
        </Link>
        <Link
          href="/alerts"
          className="rounded-lg bg-black text-white px-4 py-2 text-sm hover:opacity-90 transition"
        >
          Get Weekly Alerts
        </Link>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
