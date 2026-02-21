import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Leasing Interview Questions | HireCRE",
  description:
    "Leasing interview questions for office/retail/industrial: pipeline, comps, concessions, tenant strategy, and negotiation.",
};

export default function LeasingInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Leasing Interview Questions"
      description="Leasing interviews test market knowledge and execution: comps, pipeline, concessions, and how you get deals done."
    >
      <Section title="Common questions">
        <Grid>
          <Card title="Market + comps">
            <List items={[<>What are effective rents doing?</>, <>Where are concessions trending?</>, <>Who’s winning tenants and why?</>]} />
          </Card>
          <Card title="Pipeline">
            <List items={[<>How do you build pipeline?</>, <>How do you qualify leads?</>, <>How do you manage conversion?</>]} />
          </Card>
          <Card title="Negotiation">
            <List items={[<>How do you structure TI/LC?</>, <>What’s your approach to renewals?</>, <>Biggest deal you closed and why it worked?</>]} />
          </Card>
        </Grid>
      </Section>

      <RelatedLinks
  items={[
    { title: "Brokerage Interview Questions", href: "/interview-prep/brokerage-interview-questions" },
    { title: "Asset Management Interview Questions", href: "/interview-prep/asset-management-interview-questions" },
    { title: "Rent Roll + T-12 Deep Dive", href: "/interview-prep/rent-roll-t12-deep-dive" },
  ]}
/>
      <BottomCtas />
    </PageShell>
  );
}
