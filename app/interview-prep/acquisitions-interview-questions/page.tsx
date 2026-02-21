import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Acquisitions Interview Questions | HireCRE",
  description:
    "Acquisitions interview questions and how to answer: thesis, underwriting, comps, downside cases, and decision-making.",
};

export default function AcquisitionsInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Acquisitions Interview Questions"
      description="Acquisitions interviews test: can you form a thesis, underwrite conservatively, and make a decision with conviction."
    >
      <Section title="The acquisitions answer structure">
        <Callout title="Use this order">
          <List
            items={[
              <>Thesis (why this asset wins in this market)</>,
              <>Underwriting (what you haircut vs pro forma)</>,
              <>Downside (what breaks + how you protect)</>,
              <>Pricing (what you’d pay and why)</>,
              <>Decision (do it / don’t / do it with conditions)</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="Common questions">
        <Grid>
          <Card title="Thesis + market">
            <List items={[<>Why this market?</>, <>What’s the demand driver?</>, <>What’s the competitive set?</>]} />
          </Card>
          <Card title="Underwriting">
            <List items={[<>What assumptions did you haircut?</>, <>What’s your sensitivity?</>, <>What’s the biggest driver?</>]} />
          </Card>
          <Card title="Decision">
            <List items={[<>Would you buy it today?</>, <>At what price?</>, <>What would make you walk?</>]} />
          </Card>
        </Grid>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
