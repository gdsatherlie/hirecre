import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, MiniMath, BottomCtas, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Development Returns (Yield-on-Cost) | HireCRE",
  description:
    "Development returns explained: yield-on-cost, spread to market cap rate, development margin, and what makes a project financeable.",
};

export default function DevelopmentReturnsYoc() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Development Returns (Yield-on-Cost)"
      description="How developers talk returns: yield-on-cost and spread to market cap. Simple, interview-friendly explanations."
    >
      <Section title="The 20-second explanation">
        <Callout title="Say this">
          <>
            “Yield-on-cost is stabilized NOI divided by total project cost. I compare it to the market cap rate.
            The spread tells me whether I’m being compensated for development risk. If the spread is thin, the deal is fragile.”
          </>
        </Callout>
      </Section>

      <Section title="Simple example">
        <MiniMath
          label="YOC example"
          rows={[
            ["Stabilized NOI", "$4.0mm"],
            ["Total project cost", "$60.0mm"],
            ["Yield-on-cost", "6.67%"],
          ]}
          note="Then compare to market cap (ex: 5.5%) → spread ~117 bps."
        />
      </Section>

      <Section title="What makes a project financeable">
        <Card
          title="Financeability"
          description="Lenders care about de-risking: entitlements, presales/preleasing, cost certainty, and schedule realism."
        />
        <Callout title="Good line to close">
          <>
            “If costs rise or the timeline slips, returns compress quickly—so I want contingency, buffers, and a clear path to stabilization.”
          </>
        </Callout>
      </Section>

      <RelatedLinks
  items={[
    { title: "Development Interview Questions", href: "/interview-prep/development-interview-questions" },
    { title: "Construction Budget 101", href: "/interview-prep/construction-budget-101" },
    { title: "Equity Returns 101 (IRR vs MOIC)", href: "/interview-prep/equity-returns-101" },
  ]}
/>
      <BottomCtas />
    </PageShell>
  );
}
