import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Asset Management Interview Questions | HireCRE",
  description:
    "Asset management interview prep: NOI bridge thinking, leasing plans, KPIs, variance analysis, and execution under a business plan.",
};

export default function AssetManagementInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Asset Management Interview Questions"
      description="AM interviews test if you can run the business plan: diagnose NOI, set priorities, and drive execution with PM/leasing/ownership."
    >
      <Section title="How to answer AM questions">
        <Callout title="AM answer order">
          <List
            items={[
              <>What the plan is (and what changed)</>,
              <>What KPI is off (occupancy, rent, expenses, bad debt)</>,
              <>Root cause (what’s driving it)</>,
              <>Actions (what you’d do in 30/60/90 days)</>,
              <>Reporting (how you’d communicate to ownership)</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="High-frequency questions">
        <Grid>
          <Card title="NOI bridges">
            <List items={[<>Walk me through a variance.</>, <>What’s controllable vs not?</>, <>What do you fix first?</>]} />
          </Card>
          <Card title="Leasing">
            <List items={[<>How do you drive absorption?</>, <>How do you think about concessions?</>, <>When do you push rents?</>]} />
          </Card>
          <Card title="Expenses">
            <List items={[<>What expenses do you audit?</>, <>How do you manage vendors?</>, <>Taxes/insurance surprises?</>]} />
          </Card>
        </Grid>
      </Section>

      <RelatedLinks
  items={[
    { title: "Rent Roll + T-12 Deep Dive", href: "/interview-prep/rent-roll-t12-deep-dive" },
    { title: "Leasing Interview Questions", href: "/interview-prep/leasing-interview-questions" },
    { title: "Acquisitions Interview Questions", href: "/interview-prep/acquisitions-interview-questions" },
  ]}
/>
      
      <BottomCtas />
    </PageShell>
  );
}
