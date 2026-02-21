import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Card,
  Callout,
  List,
  MiniMath,
  BottomCtas,
  Grid,
} from "../_components";

export const metadata: Metadata = {
  title: "Underwriting Walkthrough | HireCRE",
  description:
    "A lender-grade underwriting walkthrough: how to answer 'walk me through your underwriting' with clarity—NOI build, sizing, exit, risks, and structure.",
};

export default function UnderwritingWalkthrough() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Walk Me Through Your Underwriting"
      description="This question tests structure, judgment, and priorities. Use this script to walk through a deal like a lender."
    >
      <Section title="The answer structure (memorize this)">
        <Callout title="If you follow this order, you’ll sound senior">
          <List
            items={[
              <>Deal story + business plan (what’s changing, timeline)</>,
              <>NOI build (assumptions you actually believe)</>,
              <>Size the loan (downside first)</>,
              <>Exit underwriting (cap + takeout rate)</>,
              <>Risks + protections (structure mapped to failure modes)</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="1) Deal story (10 seconds)">
        <Card
          title="What they’re testing"
          description="That you can summarize the deal in plain English and identify the business plan, timeline, and the one thing that must go right."
        />

        <Callout title="Say it like this">
          <>
            “It’s a transitional <b>[asset]</b> in <b>[market]</b>. The plan is
            <b> [lease-up/renovation/re-tenanting]</b> over ~<b>[X]</b> months,
            targeting NOI from ~$<b>[A]</b> to ~$<b>[B]</b>. I focus on downside stability,
            timing risk, and refinance viability.”
          </>
        </Callout>
      </Section>

      <Section title="2) NOI build (what you mention and why)">
        <Card
          title="What they’re testing"
          description="That you know the real drivers: occupancy, rent, concessions, expenses, and timing—and you haircut assumptions instead of parroting the pro forma."
        />

        <Grid>
          <Card title="Revenue assumptions">
            <List
              items={[
                <>In-place rent roll and occupancy</>,
                <>Market rent comps (with a haircut)</>,
                <>Lease-up velocity / downtime assumptions</>,
                <>Other income (conservative)</>,
              ]}
            />
          </Card>

          <Card title="Expense assumptions">
            <List
              items={[
                <>Taxes (reassessment risk)</>,
                <>Insurance trend</>,
                <>Payroll/repairs/utilities sensitivity</>,
                <>Mgmt fee + replacement reserves</>,
              ]}
            />
          </Card>
        </Grid>

        <Callout title="The line that separates pros from amateurs">
          <>
            “I underwrite a conservative stabilized NOI, then I run a downside case where
            lease-up is delayed and rents are lower — because timing risk is what kills bridge deals.”
          </>
        </Callout>
      </Section>

      <Section title="3) Size the loan (downside first)">
        <Card
          title="What they’re testing"
          description="That you size to a binding constraint and can explain tradeoffs. Strong candidates size to downside debt yield, then cross-check DSCR and LTV."
        />

        <Callout title="Sizing sequence">
          <List
            items={[
              <>
                Size to <b>downside debt yield</b> on conservative NOI
              </>,
              <>
                Cross-check <b>DSCR</b> at stressed rates / cap cost
              </>,
              <>
                Confirm <b>LTV</b> using the lesser of as-is, haircut-stabilized value, or cost
              </>,
            ]}
          />
        </Callout>

        <MiniMath
          label="Mini example"
          rows={[
            ["Downside NOI", "$2.0mm"],
            ["Target DY", "8.5%"],
            ["Max loan", "~$23.5mm"],
          ]}
          note="Then say: ‘I’ll confirm DSCR at stressed SOFR and verify the exit clears.’"
        />
      </Section>

      <Section title="4) Exit underwriting (where deals break)">
        <Card
          title="What they’re testing"
          description="That you underwrite takeout realistically: takeout rate, stressed cap, lender appetite, and what happens if stabilization slips."
        />

        <Callout title="Say this out loud">
          <>
            “I underwrite the refi at a <b>realistic takeout rate</b> and a <b>stressed exit cap</b>.
            If takeout doesn’t clear with reasonable assumptions, I reduce proceeds, add structure, or pass.”
          </>
        </Callout>

        <Callout title="Quick checklist">
          <List
            items={[
              <>Exit cap: stressed vs comps</>,
              <>Takeout DSCR: what perm lenders require</>,
              <>Timing: does stabilization happen before maturity?</>,
              <>Margin: is there cushion if NOI misses?</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="5) Risks + protections (match structure to failure modes)">
        <Card
          title="What they’re testing"
          description="That you can identify the real loss drivers and map protections to them—reserves and controls for timing risk, triggers for cash flow risk."
        />

        <Grid>
          <Card title="Key risks">
            <List
              items={[
                <>Lease-up delay / tenant credit</>,
                <>Capex overruns / construction timing</>,
                <>Expense growth (taxes/insurance)</>,
                <>Market move (cap rates / liquidity)</>,
              ]}
            />
          </Card>

          <Card title="Protections">
            <List
              items={[
                <>Interest + capex reserves</>,
                <>Springing cash management</>,
                <>Milestones / covenants</>,
                <>Guarantees where warranted</>,
              ]}
            />
          </Card>
        </Grid>

        <Callout title="How to finish your answer">
          <>
            “I’m comfortable if downside debt yield holds, the exit clears at realistic assumptions,
            and structure covers timing risk. If any of those fail, I adjust proceeds or pass.”
          </>
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
