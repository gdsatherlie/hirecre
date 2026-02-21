import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Risk & Structure Playbook | HireCRE",
  description:
    "A lender-style risk and structure playbook: match risk to protection—reserves, cash management, milestones, covenants, and guarantees.",
};

export default function RiskAndStructure() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Risk & Structure Playbook"
      description="Structure is insurance. Interviews test whether you can match the risk to the protection, not just list random covenants."
    >
      <Section title="The lender principle">
        <Callout title="The line that wins interviews">
          <>
            “I don’t start with structure. I start with what breaks the deal—timing, NOI, or market—and then I
            structure protections to reduce loss severity and preserve control.”
          </>
        </Callout>
      </Section>

      <Section title="Risk → Protection mapping">
        <Grid>
          <Card title="Timing / execution risk">
            <List
              items={[
                <>Interest reserve sized to realistic timeline</>,
                <>Milestones (leases signed, permits, delivery)</>,
                <>Capex controls tied to scope</>,
              ]}
            />
          </Card>

          <Card title="Cash flow / NOI risk">
            <List
              items={[
                <>Springing cash management</>,
                <>Performance triggers (NOI / occupancy)</>,
                <>DSCR/DY tests + reporting</>,
              ]}
            />
          </Card>

          <Card title="Market / exit risk">
            <List
              items={[
                <>Lower leverage / more equity</>,
                <>Extension terms + fees clearly defined</>,
                <>Rate caps / hedging requirements</>,
              ]}
            />
          </Card>
        </Grid>
      </Section>

      <Section title="How to talk about structure (without sounding generic)">
        <Callout title="Use this phrasing">
          <List
            items={[
              <>
                “Because the main risk is <b>timing</b>, I want reserves and milestones.”
              </>,
              <>
                “Because the main risk is <b>NOI volatility</b>, I want cash management and triggers.”
              </>,
              <>
                “Because the main risk is <b>exit liquidity</b>, I want lower proceeds and clear extension mechanics.”
              </>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
