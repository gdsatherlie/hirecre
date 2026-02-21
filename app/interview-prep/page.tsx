import Link from "next/link";

export default function InterviewPrepHub() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">
        Commercial Real Estate Interview Prep Hub
      </h1>

      <p className="text-lg text-gray-600 mb-12">
        Practical, technical breakdowns of what actually gets tested in
        commercial real estate interviews — debt, equity, acquisitions,
        asset management, and bridge lending roles.
      </p>

      <div className="space-y-8">
        <HubCard
          title="Bridge Lending Interview Questions"
          href="/interview-prep/bridge-lending-questions"
          description="Real technical questions debt originations teams ask — sizing, risk, sponsor quality, and structure."
        />

        <HubCard
          title="Debt Yield Explained (With Example)"
          href="/interview-prep/debt-yield-explained"
          description="Why debt yield matters more than DSCR in transitional deals."
        />

        <HubCard
          title="Walk Me Through Your Underwriting"
          href="/interview-prep/underwriting-walkthrough"
          description="How to answer the most common technical question clearly and confidently."
        />

        <HubCard
          title="Evaluating Sponsor Risk"
          href="/interview-prep/sponsor-risk-analysis"
          description="What makes a sponsor institutional — and what red flags interviewers listen for."
        />

        <HubCard
          title="CRE Mini Case Practice"
          href="/interview-prep/mini-case-practice"
          description="A short mock deal and how to talk through it like a VP."
        />
      </div>

      <div className="mt-16 p-6 bg-gray-100 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">
          Want weekly CRE career insights?
        </h3>
        <p className="text-gray-600 mb-4">
          Get top roles + interview prep delivered weekly.
        </p>
        <Link
          href="/alerts"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Get Weekly Alerts
        </Link>
      </div>
    </div>
  );
}

function HubCard({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 border rounded-xl hover:shadow-lg transition"
    >
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
