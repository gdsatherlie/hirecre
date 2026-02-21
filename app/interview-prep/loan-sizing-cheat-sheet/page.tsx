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
  title: "Loan Sizing Cheat Sheet | HireCRE",
  description:
    "How to size a CRE loan in interviews: debt yield, DSCR, and LTV—how to pick the binding constraint and explain it clearly.",
};

export default function LoanSizingCheatSheet() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Loan Sizing Cheat Sheet"
      description="A simple, lender-style way to size deals fast and explain which constraint binds (debt yield, DSCR, or LTV)."
    >
      <Section title="The 20-second sizing answer">
        <Callout title="Use this script">
          <>
            “I size to the most conservative constraint first—typically downside debt yield on conservative NOI—then
            cross-check DSCR at stressed rates and confirm LTV versus as-is and haircut-stabilized value. I finish by
            underwriting the exit to confirm takeout clears at a realistic cap and refi rate.”
          </>
        </Callout>
      </Section>

      <Section title="1) Debt yield sizing (basis check)">
        <Card
          title="What it is"
          description="Debt yield = NOI / Loan. Use conservative NOI (in-place or haircut-stabilized) to size downside."
        />
        <MiniMath
          label="Example"
          rows={[
            ["Conservative NOI", "$2.4mm"],
            ["Target DY", "8.0%"],
            ["Max loan", "$30.0mm"],
          ]}
        />
      </Section>

      <Section title="2) DSCR sizing (survivability check)">
        <Card
          title="What it is"
          description="DSCR = NOI / Debt Service. In bridge, stress the rate (or include cap cost) and don’t rely on reserves to fake coverage."
        />
        <Callout title="Interview-friendly DSCR line">
          <>
            “I treat DSCR as survivability. In bridge, I stress the rate and confirm the deal can live through
            volatility—then I rely on structure (reserves/cash management) for timing risk.”
          </>
        </Callout>
      </Section>

      <Section title="3) LTV sizing (value check)">
        <Card
          title="What it is"
          description="Use the lesser of as-is, haircut-stabilized value, or cost. Avoid ‘best-case stabilized value’ sizing."
        />
        <Callout title="One sentence that sounds senior">
          <>
            “I’m not sizing off optimistic stabilized value—I’ll haircut stabilization and ensure lender basis is still
            money-good on a downside case.”
          </>
        </Callout>
      </Section>

      <Section title="Putting it together (which constraint binds?)">
        <Grid>
          <Card title="When debt yield binds">
            <List items={[<>Volatile cash flow, transitional plan, uncertain NOI</>]} />
          </Card>
          <Card title="When DSCR binds">
            <List items={[<>Higher rates, thin cash flow, limited ability to carry</>]} />
          </Card>
          <Card title="When LTV binds">
            <List items={[<>Questionable valuation, weaker market liquidity, heavy capex</>]} />
          </Card>
        </Grid>
      </Section>

      <BottomCtas />
    </PageShell>
  );
}
