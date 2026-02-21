import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, MiniMath, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Equity Returns 101 (IRR vs MOIC) | HireCRE",
  description:
    "Explain equity returns in interviews: IRR vs MOIC (equity multiple), cash-on-cash, and what actually matters by strategy and hold period.",
};

export default function EquityReturns101() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Equity Returns 101 (IRR vs MOIC)"
      description="Interviews don’t want formulas—they want intuition: time, risk, and what’s driving value."
    >
      <Section title="The 15-second explanation">
        <Callout title="Say it like this">
          <>
            “MOIC tells me how much money I make. IRR tells me how fast I make it. Shorter holds boost IRR.
            High leverage can boost IRR—but also increases risk. I care about what’s driving the return.”
          </>
        </Callout>
      </Section>

      <Section title="Quick examples (simple numbers)">
        <Grid>
          <MiniMath
            label="MOIC example"
            rows={[
              ["Invest $10", ""],
              ["Get back $20", ""],
              ["MOIC", "2.0x"],
            ]}
            note="MOIC is magnitude, not time."
          />
          <MiniMath
            label="Why IRR changes"
            rows={[
              ["2.0x in 3 years", "Higher IRR"],
              ["2.0x in 7 years", "Lower IRR"],
            ]}
            note="Same multiple. Different speed."
          />
        </Grid>
      </Section>

      <Section title="What returns matter by strategy">
        <Grid>
          <Card title="Core / Core+">
            <List items={[<>Stability, downside, cash yield</>, <>Lower leverage, steady CoC</>]} />
          </Card>
          <Card title="Value-add">
            <List items={[<>Execution + timing</>, <>NOI growth + refi / sale</>]} />
          </Card>
          <Card title="Opportunistic / development">
            <List items={[<>Binary risk, capital at risk</>, <>Higher target IRR, longer duration</>]} />
          </Card>
        </Grid>
      </Section>

      <RelatedLinks
  items={[
    { title: "Equity Waterfall Basics", href: "/interview-prep/equity-waterfall-basics" },
    { title: "REPE Interview Questions", href: "/interview-prep/repe-interview-questions" },
    { title: "Exit Underwriting (Refi + Sale)", href: "/interview-prep/exit-underwriting" },
  ]}
/>
      
      <BottomCtas />
    </PageShell>
  );
}
