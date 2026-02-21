import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Property Management Interview Questions | HireCRE",
  description:
    "Property management interview prep: NOI drivers, operations, delinquencies, vendor management, resident/tenant experience, and reporting.",
};

export default function PropertyManagementInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Property Management Interview Questions"
      description="PM interviews test operational competence: service levels, collections, expenses, vendors, and clean reporting."
    >
      <Section title="The NOI lens for operations">
        <Callout title="PM answer structure">
          <List
            items={[
              <>What KPI is off (occupancy, collections, expenses)?</>,
              <>Root cause (process, vendor, staffing, seasonality)</>,
              <>Fix plan (30/60/90 days)</>,
              <>How you measure success + report it</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="Common questions">
        <Grid>
          <Card title="Collections + bad debt">
            <List items={[<>How do you reduce delinquency?</>, <>What’s your escalation path?</>, <>How do you prevent bad debt?</>]} />
          </Card>
          <Card title="Expenses">
            <List items={[<>What line items move most?</>, <>How do you audit vendors?</>, <>How do you manage overtime/payroll?</>]} />
          </Card>
          <Card title="Service levels">
            <List items={[<>How do you handle resident/tenant complaints?</>, <>How do you prioritize work orders?</>, <>How do you train staff?</>]} />
          </Card>
        </Grid>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
