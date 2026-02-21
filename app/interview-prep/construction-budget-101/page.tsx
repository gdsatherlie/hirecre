import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Construction Budget 101 | HireCRE",
  description:
    "Construction budget basics: hard vs soft costs, contingency, GMP, change orders, draws, and common blowups.",
};

export default function ConstructionBudget101() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Construction Budget 101"
      description="A clear breakdown of hard vs soft costs, contingency, GMP, and the real-world reasons budgets blow up."
    >
      <Section title="What interviewers are testing">
        <Card
          title="Do you understand where risk hides?"
          description="They want to see you understand contingency, scope gaps, and change-order dynamics—not perfect cost codes."
        />
      </Section>

      <Section title="Hard vs soft costs (simple)">
        <Grid>
          <Card title="Hard costs">
            <List items={[<>Site work, shell, interiors</>, <>MEP, elevators</>, <>GC general conditions</>]} />
          </Card>
          <Card title="Soft costs">
            <List items={[<>Architecture/engineering</>, <>Permits/fees, legal</>, <>Financing, insurance, leasing</>]} />
          </Card>
          <Card title="Contingency">
            <List items={[<>Covers unknowns and scope gaps</>, <>Typically higher early, lower when de-risked</>]} />
          </Card>
        </Grid>
      </Section>

      <Section title="GMP, change orders, and draws">
        <Callout title="Key lines to use">
          <List
            items={[
              <>“GMP reduces pricing uncertainty, but scope clarity is everything.”</>,
              <>“Change orders usually come from drawings, site surprises, or schedule pressure.”</>,
              <>“Draws require tight documentation and lender controls.”</>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
