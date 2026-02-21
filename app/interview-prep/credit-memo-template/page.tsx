import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas } from "../_components";

export const metadata: Metadata = {
  title: "Credit Memo Template | HireCRE",
  description:
    "A one-page lender-style credit memo template: deal overview, collateral, sponsor, risks, mitigants, and key questions.",
};

export default function CreditMemoTemplate() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Credit Memo Template (1 Page)"
      description="Use this structure for take-home cases or to organize your interview answers. It’s the lender way: story, sizing, exit, risks, mitigants."
    >
      <Section title="The 1-page format">
        <Card
          title="Use these headings (copy/paste)"
          description="Keep it tight. Interviewers love clarity."
        />
        <Callout title="1) Deal overview (3–5 bullets)">
          <List
            items={[
              <>Asset + market + business plan + timeline</>,
              <>Loan request (proceeds, term, rate type) + sizing constraint</>,
              <>Key metrics: leverage, downside DY, DSCR check, exit assumptions</>,
            ]}
          />
        </Callout>

        <Callout title="2) Collateral summary (3–5 bullets)">
          <List
            items={[
              <>Asset quality + tenancy/occupancy (what matters)</>,
              <>Capex scope and execution plan</>,
              <>Market liquidity and comp set</>,
            ]}
          />
        </Callout>

        <Callout title="3) Sponsor summary (3–5 bullets)">
          <List
            items={[
              <>Same-deal track record</>,
              <>Liquidity vs exposure (carry + capex)</>,
              <>Ops bench (PM/leasing/GC)</>,
            ]}
          />
        </Callout>

        <Callout title="4) Risks + mitigants">
          <List
            items={[
              <>Risk #1 → mitigation (structure / proceeds / reserves)</>,
              <>Risk #2 → mitigation</>,
              <>Risk #3 → mitigation</>,
            ]}
          />
        </Callout>

        <Callout title="5) Key questions for the broker">
          <List
            items={[
              <>Critical path item and timing sensitivity</>,
              <>What breaks the exit (cap/rate/NOI)?</>,
              <>Sponsor liquidity and pipeline / maturities</>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
