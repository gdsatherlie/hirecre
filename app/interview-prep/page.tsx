import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Prep | HireCRE",
  description:
    "Practical, technical CRE interview prep for debt, acquisitions, asset management, and underwriting.",
};

const ITEMS = [
  {
    title: "Bridge Lending Interview Questions",
    href: "/interview-prep/bridge-lending-questions",
    desc: "Sizing, structure, refinance risk, sponsor questions, and how to answer like a pro.",
    tag: "Debt / Originations",
  },
  {
    title: "Debt Yield Explained (With Example)",
    href: "/interview-prep/debt-yield-explained",
    desc: "What debt yield is, why it matters, and how lenders actually use it.",
    tag: "Core Concepts",
  },
  {
    title: "Walk Me Through Your Underwriting",
    href: "/interview-prep/underwriting-walkthrough",
    desc: "A clean, confident script for the most common technical interview prompt.",
    tag: "Underwriting",
  },
  {
    title: "Evaluating Sponsor Risk",
    href: "/interview-prep/sponsor-risk-analysis",
    desc: "What makes a sponsor institutional and the red flags interviewers listen for.",
    tag: "Credit / Risk",
  },
  {
    title: "CRE Mini Case Practice",
    href: "/interview-prep/mini-case-practice",
    desc: "A short mock deal + how to talk through it like a VP.",
    tag: "Case Practice",
  },
];

export default function InterviewPrepHub() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      {/* Top */}
      <div className="mb-10">
        <p className="text-sm text-gray-500 mb-3">
          <Link href="/resources" className="hover:underline">
            Resources
          </Link>{" "}
          <span className="mx-2">/</span>
          <span>Interview Prep</span>
        </p>

        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          Interview Prep
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl">
          Practical, technical prep for commercial real estate interviews — debt,
          acquisitions, underwriting, and risk. Built to help you answer like
          you’ve done the job.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
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
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border bg-white p-6 hover:shadow-sm transition"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold leading-snug">
                {item.title}
              </h2>
              <span className="text-xs text-gray-500 border rounded-full px-2 py-1 whitespace-nowrap">
                {item.tag}
              </span>
            </div>
            <p className="mt-3 text-gray-600">{item.desc}</p>
            <p className="mt-5 text-sm font-medium text-gray-900 group-hover:underline">
              Read →
            </p>
          </Link>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="mt-12 rounded-2xl border bg-gray-50 p-7">
        <h3 className="text-xl font-semibold mb-2">
          Want new roles + prep in one email?
        </h3>
        <p className="text-gray-600 mb-5">
          Get the HireCRE weekly — top jobs, interview prompts, and what’s hiring.
        </p>
        <Link
          href="/alerts"
          className="inline-flex rounded-lg bg-black text-white px-5 py-3 text-sm hover:opacity-90 transition"
        >
          Subscribe to Alerts
        </Link>
      </section>
    </main>
  );
}
