import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid } from "../_components";

export const metadata: Metadata = {
  title: "Common CRE Interview Mistakes | HireCRE",
  description:
    "Common CRE debt interview mistakes: mixing NOI definitions, sloppy exit caps, ignoring timing risk, and generic structure—plus how to fix them.",
};

export default function CommonMistakes() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Common Mistakes (and How to Avoid Them)"
      description="The traps that make candidates sound junior — and the simple fixes that make you sound like a lender."
    >
      <Section title="The big traps">
        <Grid>
          <Card
            title="Mixing NOI definitions"
            description="Quoting debt yield on stabilized NOI without stating it. Fix: always specify in-place vs haircut-stabilized."
          />
          <Card
            title="Over-optimistic exit caps"
            description="Using today’s tight cap rates forever. Fix: stress the exit cap and explain why."
          />
          <Card
            title="Ignoring timing risk"
            description="Bridge deals fail on timeline, not spreadsheets. Fix: speak to critical path + reserves + milestones."
          />
          <Card
            title="Generic ‘structure’"
            description="Listing covenants randomly. Fix: match protections to the risk you just identified."
          />
          <Card
            title="No downside case"
            description="Only discussing the base case. Fix: show one downside and what you’d change (proceeds/structure/pass)."
          />
          <Card
            title="Hand-waving sponsor risk"
            description="Only net worth talk. Fix: liquidity vs exposure + same-deal track record + bandwidth."
          />
        </Grid>
      </Section>

      <Section title="How to fix 80% of mistakes instantly">
        <Callout title="Use these three sentences">
          <List
            items={[
              <>
                “On sizing, I’m using <b>conservative NOI</b> (in-place or haircut-stabilized) for downside debt yield.”
              </>,
              <>
                “On exit, I’m underwriting a <b>stressed cap</b> and a <b>realistic takeout rate</b> to confirm refi clears.”
              </>,
              <>
                “The key risk is <b>[timing/NOI/market]</b>, so I’d protect with <b>[reserve/cash mgmt/milestones]</b>.”
              </>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
