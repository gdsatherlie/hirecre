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
  title: "Debt Yield Explained | HireCRE",
  description:
    "Debt yield explained with examples: how lenders use it, which NOI to use, how to size to it, and how it connects to exit risk and refinance viability.",
};

export default function DebtYieldExplained() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Debt Yield Explained"
      description="Debt yield is a lender’s basis check. Interviews use it to test whether you can size to downside and connect the dots to refinance risk."
    >
      <Section title="Interview-ready explanation (20 seconds)">
        <Callout title="Use this 5-step structure">
          <List
            items={[
              <>
                Define it: <b>NOI / Loan Amount</b>
              </>,
              <>State which NOI you’re using (in-place vs haircut-stabilized)</>,
              <>Use it for sizing (minimum downside DY)</>,
              <>Cross-check DSCR at stressed rates</>,
              <>Confirm exit with stressed cap + realistic takeout rate</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="1) Definition: what it is (and isn’t)">
        <Card
          title="What they’re testing"
          description="That you can define debt yield in one sentence and explain why it matters without mixing it up with DSCR or LTV."
        />

        <Callout title="Clean definition">
          <>
            <b>Debt yield</b> = <b>NOI / Loan Amount</b>. It’s an “income on basis”
            check: if the business plan stalls, what income does the asset generate
            relative to the lender’s basis?
          </>
        </Callout>

        <Grid>
          <Card title="What it captures">
            <List
              items={[
                <>Downside protection and lender basis</>,
                <>Less sensitive to rate swings than DSCR</>,
                <>A quick asset-quality check in bridge lending</>,
              ]}
            />
          </Card>

          <Card title="What it doesn’t capture">
            <List
              items={[
                <>Actual debt service coverage (that’s DSCR)</>,
                <>Capex/leasing timing risk by itself</>,
                <>Exit proceeds (you still need exit underwriting)</>,
              ]}
            />
          </Card>
        </Grid>
      </Section>

      <Section title="2) How lenders actually use it for sizing">
        <Card
          title="What they’re testing"
          description="That you pick a conservative NOI (in-place or haircut-stabilized), size to a minimum DY, then cross-check DSCR and exit."
        />

        <MiniMath
          label="Sizing example"
          rows={[
            ["Conservative NOI", "$2.4mm"],
            ["Target debt yield", "8.0%"],
            ["Max loan (NOI / DY)", "$30.0mm"],
          ]}
          note="Then say: ‘I’ll cross-check DSCR at stressed rates and confirm takeout clears at a realistic cap/rate.’"
        />

        <Callout title="Senior-sounding line">
          <>
            “Debt yield tells me the basis. DSCR tells me survivability. In bridge,
            I want both — but I size to the metric that protects me if execution is delayed.”
          </>
        </Callout>
      </Section>

      <Section title="3) The NOI definition trap (in-place vs stabilized)">
        <Card
          title="What they’re testing"
          description="That you’re disciplined about the NOI definition. Strong candidates explicitly quote both downside and business plan versions."
        />

        <Callout title="Say this out loud">
          <>
            “Debt yield depends on the NOI definition. I’ll quote <b>in-place DY</b> for
            downside and <b>stabilized DY</b> for the business plan — and make sure the
            loan is still ‘money-good’ on the downside case.”
          </>
        </Callout>

        <Grid>
          <Card title="In-place NOI">
            <List items={[<>Today’s reality; best for downside sizing</>]} />
          </Card>
          <Card title="Haircut-stabilized NOI">
            <List items={[<>Underwritten; conservative view of stabilization</>]} />
          </Card>
          <Card title="Stabilized NOI">
            <List items={[<>Business plan outcome; not the basis for downside</>]} />
          </Card>
        </Grid>
      </Section>

      <Section title="4) How debt yield connects to exit risk (the real point)">
        <Card
          title="What they’re testing"
          description="That you connect thin debt yield to reliance on a perfect exit environment — and you underwrite takeout at stressed assumptions."
        />

        <Callout title="Simple connection (powerful in interviews)">
          <>
            “A thin debt yield means I’m tight on basis. If NOI misses or cap rates widen,
            exit proceeds compress — which is why I underwrite takeout at a <b>stressed cap</b>
            and a <b>realistic takeout rate</b>.”
          </>
        </Callout>

        <MiniMath
          label="Quick exit sanity check"
          rows={[
            ["Stabilized NOI", "$3.2mm"],
            ["Exit cap (stressed)", "6.50%"],
            ["Implied value", "~$49.2mm"],
          ]}
          note="Then compare value vs loan basis + costs to describe refinance margin."
        />
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
