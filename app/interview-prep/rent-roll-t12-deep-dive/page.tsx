import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Rent Roll + T-12 Deep Dive | HireCRE",
  description:
    "How to review a rent roll and T-12 fast: concessions, rollover risk, bad debt, other income, expense normalization, and red flags.",
};

export default function RentRollT12DeepDive() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Rent Roll + T-12 Deep Dive"
      description="A fast, practical checklist: how to spot what matters in 5–10 minutes (and sound sharp in interviews)."
    >
      <Section title="Rent roll: what to scan first">
        <Grid>
          <Card title="Rollover + concentration">
            <List items={[<>Lease expirations by month/quarter</>, <>Top tenants (office/retail/industrial)</>, <>Credit + sales (retail)</>]} />
          </Card>
          <Card title="Effective rent reality">
            <List items={[<>Free rent + concessions</>, <>TI/LC obligations</>, <>Blended vs new/renewal spreads</>]} />
          </Card>
          <Card title="Collections">
            <List items={[<>Delinquencies</>, <>Bad debt trends</>, <>A/R aging</>]} />
          </Card>
        </Grid>
      </Section>

      <Section title="T-12: the red flags">
        <Callout title="What interviewers love to hear">
          <List
            items={[
              <>Normalize one-time repairs, legal, and non-recurring items</>,
              <>Watch taxes/insurance (trend + reassessment risk)</>,
              <>Check utilities and payroll inflation</>,
              <>Sanity-check “other income” and fee add-backs</>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
