import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, MiniMath, BottomCtas } from "../_components";

export const metadata: Metadata = {
  title: "Exit Underwriting | HireCRE",
  description:
    "How to underwrite the exit in CRE interviews: stressed cap rates, realistic takeout rates, refi proceeds, and what happens if stabilization slips.",
};

export default function ExitUnderwriting() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Exit Underwriting (Refi + Sale)"
      description="The takeout is where bridge deals live or die. Interviews want to hear stressed caps, realistic takeout rates, and timing risk."
    >
      <Section title="What interviewers are testing">
        <Card
          title="The core test"
          description="Do you underwrite the exit like a skeptic—cap rates widen, NOI misses, and the timeline slips?"
        />
      </Section>

      <Section title="1) Refi underwriting (the basics)">
        <Callout title="Say this out loud">
          <>
            “I underwrite the refi at a realistic takeout rate and a stressed exit cap—not today’s market at peak optimism.
            If takeout doesn’t clear with reasonable assumptions, I reduce proceeds, add structure, or pass.”
          </>
        </Callout>

        <List
          items={[
            <>Takeout rate: what a perm lender will actually quote</>,
            <>Takeout DSCR: what the takeout lender will require</>,
            <>Exit cap: stressed relative to comps</>,
            <>Timing: does stabilization happen before maturity?</>,
          ]}
        />
      </Section>

      <Section title="2) Sale underwriting (sanity check)">
        <Card
          title="What it’s for"
          description="Even if the plan is a refi, a sale check shows you’re thinking about value sensitivity and liquidity."
        />
        <MiniMath
          label="Value from NOI"
          rows={[
            ["Stabilized NOI", "$3.2mm"],
            ["Exit cap (stressed)", "6.50%"],
            ["Implied value", "~$49.2mm"],
          ]}
        />
      </Section>

      <Section title="3) The three exit failure modes">
        <Callout title="Know these cold">
          <List
            items={[
              <>
                <b>NOI miss:</b> rents/occupancy underperform → proceeds shrink
              </>,
              <>
                <b>Cap widening:</b> value compresses → refi doesn’t clear
              </>,
              <>
                <b>Timing slip:</b> stabilization after maturity → extension risk
              </>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
