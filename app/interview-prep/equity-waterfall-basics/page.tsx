import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, MiniMath, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Equity Waterfall Basics | HireCRE",
  description:
    "Equity waterfall basics for CRE interviews: preferred return, catch-up, promote, hurdles, and how to explain it clearly.",
};

export default function EquityWaterfallBasics() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Equity Waterfall Basics"
      description="A simple way to explain preferred return, catch-up, and promote without getting lost in jargon."
    >
      <Section title="The interview-safe explanation">
        <Callout title="Use this 4-part explanation">
          <List
            items={[
              <>1) Return capital to LP</>,
              <>2) Pay LP a preferred return</>,
              <>3) Catch-up (GP gets more until split hits target)</>,
              <>4) Split remaining cash at the promote tiers</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="What they’re testing">
        <Card
          title="They want clarity, not math"
          description="Can you explain alignment and incentives, and describe how waterfalls change behavior?"
        />
        <Callout title="Senior framing">
          <>
            “The waterfall aligns incentives: LP gets downside protection (pref), and GP earns promote if they create value.
            The more aggressive the promote tiers, the more the GP is incentivized to push for higher outcomes—sometimes with more risk.”
          </>
        </Callout>
      </Section>
<RelatedLinks
  items={[
    { title: "Equity Waterfall Basics", href: "/interview-prep/equity-waterfall-basics" },
    { title: "REPE Interview Questions", href: "/interview-prep/repe-interview-questions" },
    { title: "Exit Underwriting (Refi + Sale)", href: "/interview-prep/exit-underwriting" },
  ]}
/>
      <BottomCtas />
    </PageShell>
  );
}
