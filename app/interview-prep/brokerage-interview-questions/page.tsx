import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Brokerage Interview Questions | HireCRE",
  description:
    "Brokerage interview prep: sourcing, relationships, market knowledge, process, and how to talk about wins and pipeline.",
};

export default function BrokerageInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Brokerage Interview Questions"
      description="Brokerage interviews test hustle + market truth: sourcing strategy, relationships, and your ability to execute."
    >
      <Section title="What they ask (a lot)">
        <Grid>
          <Card title="Sourcing">
            <List items={[<>How do you build a book?</>, <>How do you prospect daily?</>, <>What’s your niche?</>]} />
          </Card>
          <Card title="Market knowledge">
            <List items={[<>What are current comps?</>, <>Who’s active and why?</>, <>What’s the biggest risk to the market?</>]} />
          </Card>
          <Card title="Execution">
            <List items={[<>Walk me through a deal you closed.</>, <>How do you manage a process?</>, <>How do you handle dead deals?</>]} />
          </Card>
        </Grid>
      </Section>

      <Section title="How to sound credible fast">
        <Callout title="Use this line">
          <>
            “I lead with market truth—pricing, comps, and who’s active—then I run a clean process and over-communicate.
            Most deals die from mispriced expectations and weak follow-through.”
          </>
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
