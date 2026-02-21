import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Development Interview Questions | HireCRE",
  description:
    "Development interview prep: feasibility, entitlements, budgets, timelines, financing, and risk management.",
};

export default function DevelopmentInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Development Interview Questions"
      description="Development interviews test feasibility judgment: can you manage timelines, budgets, entitlement risk, and capital?"
    >
      <Section title="The development lens">
        <Callout title="Say this early">
          <>
            “Development is a timeline and budget business. Most losses come from delays, cost overruns,
            and capital market moves—so I focus on feasibility, contingency, and de-risking milestones.”
          </>
        </Callout>
      </Section>

      <Section title="Common questions">
        <Grid>
          <Card title="Feasibility">
            <List items={[<>How do you decide to build?</>, <>What assumptions are most sensitive?</>, <>What’s the downside case?</>]} />
          </Card>
          <Card title="Entitlements">
            <List items={[<>Biggest entitlement risk?</>, <>How do you de-risk approvals?</>, <>Timeline buffers?</>]} />
          </Card>
          <Card title="Financing">
            <List items={[<>How do you finance the project?</>, <>What breaks the capital stack?</>, <>When do you recap vs sell?</>]} />
          </Card>
        </Grid>
      </Section>


  <RelatedLinks
  items={[
    { title: "Construction Budget 101", href: "/interview-prep/construction-budget-101" },
    { title: "Development Returns (Yield-on-Cost)", href: "/interview-prep/development-returns-yoc" },
    { title: "Risk & Structure Playbook", href: "/interview-prep/risk-and-structure" },
  ]}
/>
      
      <BottomCtas />
    </PageShell>
  );
}
