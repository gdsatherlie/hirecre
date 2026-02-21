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
  title: "Sponsor Risk Analysis | HireCRE",
  description:
    "How lenders evaluate sponsor risk: liquidity, net worth, track record, operational capability, concentration, and red flags—and how it changes structure.",
};

export default function SponsorRiskAnalysis() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Evaluating Sponsor Risk"
      description="Sponsor risk is not ‘big net worth = good.’ It’s repeatability, liquidity, operational execution, and behavior under stress."
    >
      <Section title="How to answer sponsor questions (15 seconds)">
        <Callout title="The sponsor lens">
          <List
            items={[
              <>Same-deal track record (same asset + same business plan)</>,
              <>Liquidity vs exposure (carry + capex + cushion)</>,
              <>Ops bench (PM/leasing/construction capability)</>,
              <>Concentration + maturity schedule</>,
              <>Red flags → structure or lower proceeds</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="1) The sponsor scorecard">
        <Card
          title="What they’re testing"
          description="That you prioritize the right categories and describe what ‘good’ looks like: execution ability + supportability."
        />

        <Grid>
          <Card title="Ability to execute">
            <List
              items={[
                <>Same asset class + similar business plan experience</>,
                <>Local market presence and vendor/PM bench</>,
                <>Evidence of execution under stress</>,
              ]}
            />
          </Card>

          <Card title="Ability to support the deal">
            <List
              items={[
                <>Liquidity relative to carry + capex</>,
                <>Net worth relative to guarantees (where applicable)</>,
                <>Real equity at risk (not “thin”)</>,
              ]}
            />
          </Card>
        </Grid>

        <Callout title="Senior framing">
          <>
            “I separate ability to execute from ability to support the deal. Both matter —
            but liquidity is usually the shock absorber in bridge when timing slips.”
          </>
        </Callout>
      </Section>

      <Section title="2) Liquidity: the real shock absorber">
        <Card
          title="What they’re testing"
          description="That you treat liquidity as what prevents a maturity issue from becoming a loss—especially in transitional deals."
        />

        <Callout title="How to talk about liquidity">
          <>
            “I compare liquidity to the deal’s likely cash needs: carry, reserves, capex,
            and overruns. If liquidity is thin relative to exposure, I assume extensions become harder.”
          </>
        </Callout>

        <MiniMath
          label="Quick supportability check (round numbers)"
          rows={[
            ["Annual carry (rough)", "$1.5mm"],
            ["Capex / TI exposure", "$3.0mm"],
            ["Needed cushion", "~$4–6mm+"],
          ]}
          note="This isn’t exact math. It shows judgment about what matters."
        />
      </Section>

      <Section title="3) Track record: ask for ‘same deal’ experience">
        <Card
          title="What they’re testing"
          description="That you can distinguish ‘owns real estate’ from ‘has executed this plan’—and you ask questions that reveal execution quality."
        />

        <Callout title="The question that sounds like a lender">
          <>
            “Walk me through your last 2–3 deals that look like this — what went wrong,
            and what did you do when timing slipped or NOI underperformed?”
          </>
        </Callout>

        <Callout title="What you’re listening for">
          <List
            items={[
              <>Concrete examples (not vague “we crushed it”)</>,
              <>Lessons learned and process improvements</>,
              <>Ability to manage vendors/PM/leasing</>,
              <>Honest discussion of mistakes</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="4) Hidden killers: concentration and bandwidth">
        <Card
          title="What they’re testing"
          description="That you recognize ‘too many projects / thin team’ as a real default driver and you look at maturities and platform leverage."
        />

        <Grid>
          <Card title="Concentration red flags">
            <List
              items={[
                <>Multiple deals maturing in the same window</>,
                <>High exposure to one market or tenant type</>,
                <>Heavy reliance on one equity partner</>,
              ]}
            />
          </Card>

          <Card title="Bandwidth red flags">
            <List
              items={[
                <>Small team managing heavy capex/lease-up</>,
                <>Outsourced leasing without strong oversight</>,
                <>Key-person risk (one operator runs everything)</>,
              ]}
            />
          </Card>
        </Grid>
      </Section>

      <Section title="5) Red flags → how it changes structure (or kills the deal)">
        <Card
          title="What they’re testing"
          description="That you translate sponsor risk into lender actions: lower proceeds, more reserves, tighter control, stronger guarantees, or pass."
        />

        <Callout title="Red flags and what you do">
          <List
            items={[
              <>
                <b>Thin liquidity</b> → lower proceeds, larger interest reserve, tighter cash management
              </>,
              <>
                <b>Limited track record</b> → milestones, reporting, stronger controls (and guarantees where warranted)
              </>,
              <>
                <b>Aggressive plan</b> → haircut NOI, stress timeline, reduce leverage
              </>,
            ]}
          />
        </Callout>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
