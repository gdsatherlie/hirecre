import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Debt Origination Broker Questions | HireCRE",
  description:
    "The exact questions to ask on a broker call for a CRE debt deal: business plan, economics, sponsor, diligence, and timing.",
};

export default function BrokerQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Debt Origination Questions (Broker Call)"
      description="A lender-style question list you can use in interviews or real broker calls. It’s designed to surface the real risks fast."
    >
      <Section title="What interviewers are testing">
        <Card
          title="The real goal"
          description="Can you run a tight diligence call and quickly identify what matters: the business plan, the exit, and who’s actually capable of executing?"
        />
      </Section>

      <Section title="1) Deal story + business plan">
        <Callout title="Ask these first">
          <List
            items={[
              <>What is changing in this deal (why bridge)?</>,
              <>What’s the timeline and critical path item?</>,
              <>What are the top 2 execution risks?</>,
              <>What has been done to date (permits, scope, leasing)?</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="2) Economics + sizing inputs">
        <Grid>
          <Card title="Income / NOI">
            <List
              items={[
                <>In-place NOI vs underwritten vs stabilized</>,
                <>Rent comps and concessions assumptions</>,
                <>Major lease expirations / rollover risk</>,
              ]}
            />
          </Card>
          <Card title="Capex / scope">
            <List
              items={[
                <>Detailed scope + budget + contingency</>,
                <>Who is GC / PM and what’s the track record?</>,
                <>What happens if costs run 10–15% higher?</>,
              ]}
            />
          </Card>
          <Card title="Exit assumptions">
            <List
              items={[
                <>What takeout lender is the sponsor targeting?</>,
                <>What takeout rate/cap are you assuming?</>,
                <>What happens if takeout is 100 bps worse?</>,
              ]}
            />
          </Card>
        </Grid>
      </Section>

      <Section title="3) Sponsor (this is where you win)">
        <Callout title="Ask the question most candidates avoid">
          <>
            “Walk me through your last 2–3 deals that look like this — what went wrong, and what did you do
            when the plan didn’t go perfectly?”
          </>
        </Callout>

        <Callout title="Plus the basics">
          <List
            items={[
              <>Liquidity relative to carry + capex exposure</>,
              <>Deal count in this exact market + plan</>,
              <>Current pipeline and maturities (bandwidth)</>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
