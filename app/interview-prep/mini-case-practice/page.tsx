import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Card,
  Callout,
  List,
  MiniMath,
  BottomCtas,
  Grid,
} from "../_components";

export const metadata: Metadata = {
  title: "CRE Mini Case Practice | HireCRE",
  description:
    "A short CRE mini-case with a lender-style model answer: sizing, downside constraints, exit underwriting, key risks, and structure.",
};

export default function MiniCasePractice() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="CRE Mini Case Practice"
      description="Practice a 60–90 second answer. The goal: size to downside, confirm the exit, and map structure to risks."
    >
      <Section title="The mini-case framework">
        <Callout title="Answer order (60–90 seconds)">
          <List
            items={[
              <>Deal story + business plan</>,
              <>Downside sizing (debt yield)</>,
              <>Exit underwriting (stressed cap + realistic takeout rate)</>,
              <>2–3 key risks (timing / NOI / market)</>,
              <>Protections (reserves / cash mgmt / milestones)</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="The mini-case">
        <Card
          title="Deal summary"
          description="Read this once, then practice speaking your answer out loud."
        >
          <List
            items={[
              <>
                <b>Asset:</b> 220-unit multifamily, suburban major metro
              </>,
              <>
                <b>Occupancy:</b> 87% today (target 94%)
              </>,
              <>
                <b>In-place NOI:</b> ~$2.8mm
              </>,
              <>
                <b>Business plan:</b> $6.0mm capex to renovate units + improve leasing
              </>,
              <>
                <b>Stabilized NOI:</b> ~$3.6mm (sponsor view)
              </>,
              <>
                <b>Request:</b> $40mm senior bridge, 30-month term, IO
              </>,
              <>
                <b>Sponsor:</b> 6 deals completed, but only 1 in this exact market
              </>,
            ]}
          />
        </Card>
      </Section>

      <Section title="What the interviewer asks">
        <Card
          title="What they’re testing"
          description="Can you size quickly, identify what breaks the deal, and protect the lender with structure."
        />

        <Grid>
          <Card title="Prompts">
            <List
              items={[
                <>How would you size the loan?</>,
                <>What’s the biggest risk?</>,
                <>How do you underwrite the exit?</>,
                <>What structure would you require?</>,
              ]}
            />
          </Card>

          <Card title="What a strong answer includes">
            <List
              items={[
                <>Downside constraint (DY / DSCR)</>,
                <>Exit at stressed cap + realistic takeout rate</>,
                <>Timing + market + NOI risk</>,
                <>Protections mapped to each risk</>,
              ]}
            />
          </Card>
        </Grid>
      </Section>

      <Section title="Model answer (copy this style)">
        <Callout title="A lender-style answer">
          <>
            “This is a transitional MF deal with a clear capex and lease-up plan. I’d size to a downside
            debt yield using conservative NOI (closer to in-place plus partial credit, not full stabilization),
            then cross-check DSCR at stressed rates and confirm takeout clears at a realistic cap and refi rate.
            The key risks are timing (lease-up takes longer) and market (cap rates / takeout tighten), so I’d want
            an interest reserve sized to the timeline, capex controls, and springing cash management with leasing
            milestones. If the exit doesn’t clear under stress, I’d reduce proceeds or pass.”
          </>
        </Callout>

        <MiniMath
          label="Show numbers (lightly)"
          rows={[
            ["In-place NOI", "$2.8mm"],
            ["Target downside DY", "8.5%"],
            ["Implied max loan", "~$33mm"],
          ]}
          note="Then say: ‘I’d verify refi proceeds at stressed cap/rate clear the loan.’"
        />
      </Section>

      <Section title="Follow-up questions that sound senior">
        <Callout title="Ask these (or use them in your write-up)">
          <List
            items={[
              <>What’s the critical path item (permits, unit turns, leasing velocity)?</>,
              <>What’s Plan B if stabilization slips past maturity?</>,
              <>What concessions and renewal assumptions are in the pro forma?</>,
              <>What is the sponsor’s track record on this exact plan?</>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
