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
  title: "Bridge Lending Interview Questions | HireCRE",
  description:
    "Real bridge lending interview questions (and what they’re testing): sizing, exit risk, sponsor evaluation, structure, and downside cases.",
};

export default function BridgeLendingInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Bridge Lending Interview Questions"
      description="Real prompts + what they’re testing. Focused on sizing, exit risk, sponsor evaluation, and structure — the things lenders actually care about."
    >
      <Section title="A 30-second answer framework">
        <Callout title="If you get stuck, use this sequence">
          <List
            items={[
              <>Deal story + business plan (what’s changing, timeline)</>,
              <>Downside sizing (debt yield first, conservative NOI)</>,
              <>Exit underwriting (takeout rate + stressed cap)</>,
              <>Key risks (execution / NOI / market)</>,
              <>Structure to protect the lender (reserves / cash mgmt / milestones)</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="1) Loan sizing: “How would you size this loan?”">
        <Card
          title="What they’re testing"
          description="Whether you can size to a binding constraint (debt yield / DSCR / LTV), explain tradeoffs, and start with downside before you talk structure."
        />

        <Callout title="A clean, credible answer structure">
          <List
            items={[
              <>
                <b>Start with the story:</b> transitional vs stabilized, plan duration, critical path items
              </>,
              <>
                <b>Size to downside debt yield</b> on in-place or haircut-stabilized NOI
              </>,
              <>
                <b>Cross-check DSCR</b> at stressed rates (or with a rate cap assumption)
              </>,
              <>
                <b>Back into LTV</b> using the lesser of as-is, haircut-stabilized value, or cost
              </>,
              <>
                <b>Confirm the exit</b> with realistic takeout rate and cap
              </>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="2) Debt yield: “What’s your minimum and why?”">
        <Card
          title="What they’re testing"
          description="That you understand debt yield as a basis / asset-quality check. Strong candidates explicitly state which NOI definition they’re using."
        />

        <MiniMath
          label="Simple example"
          rows={[
            ["Conservative NOI", "$2.0mm"],
            ["Loan amount", "$25.0mm"],
            ["Debt yield", "8.0%"],
          ]}
          note="Then say what it implies: you’re not relying on perfect execution to be protected."
        />

        <Callout title="How to say it without sounding canned">
          <>
            “I treat debt yield as the first-principles downside check: if the plan stalls,
            what income does the collateral generate relative to our basis? I size to a minimum
            on conservative NOI, cross-check DSCR at stressed rates, then confirm the exit clears
            at a realistic takeout rate and stressed cap.”
          </>
        </Callout>
      </Section>

      <Section title="3) Exit underwriting: “How do you underwrite the takeout?”">
        <Card
          title="What they’re testing"
          description="That you underwrite like a skeptic: takeout rate, lender appetite, stressed cap rate, and what happens if timing slips 6–12 months."
        />

        <Callout title="The phrases interviewers want to hear">
          <List
            items={[
              <>
                “I underwrite the exit to a <b>realistic takeout rate</b>, not today’s in-place coupon.”
              </>,
              <>
                “I assume a <b>stressed exit cap</b> relative to comps (especially on longer duration).”
              </>,
              <>
                “I confirm refi works under both <b>NOI underperformance</b> and <b>cap rate widening</b>.”
              </>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="4) Structure: “What protections would you require?”">
        <Card
          title="What they’re testing"
          description="That you match protections to the real failure modes: business plan delay and operating shortfall."
        />

        <Grid>
          <Card title="Cash & operating protections">
            <List
              items={[
                <>Interest reserve (and how you’d size it)</>,
                <>TI/LC or capex reserve tied to scope</>,
                <>Springing cash management</>,
                <>Performance triggers (NOI / occupancy)</>,
              ]}
            />
          </Card>

          <Card title="Control & credit protections">
            <List
              items={[
                <>Milestones (leases signed, permits, delivery)</>,
                <>Covenants + reporting</>,
                <>Completion / carry guarantees (when warranted)</>,
                <>Bad boy carveouts + recourse nuances</>,
              ]}
            />
          </Card>
        </Grid>

        <Callout title="Good follow-up line">
          <>
            “Which protection matters most depends on the risk. Heavy capex deals need scope/timing controls.
            Lease-ups need cash management and leasing milestones.”
          </>
        </Callout>
      </Section>

      <Section title="5) Downside case: “What breaks the deal?”">
        <Card
          title="What they’re testing"
          description="Whether you can identify the single biggest driver of loss and explain how you’d reduce it (lower leverage, more structure, different exit)."
        />

        <Callout title="Most common break points">
          <List
            items={[
              <>
                <b>Execution delay:</b> renovations/leasing take longer → burn reserve → forced extension
              </>,
              <>
                <b>NOI miss:</b> rent growth doesn’t show → debt yield falls → exit proceeds compress
              </>,
              <>
                <b>Market move:</b> cap rates widen / takeout proceeds shrink → refi doesn’t clear
              </>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
