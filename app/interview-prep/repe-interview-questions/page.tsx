import type { Metadata } from "next";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "REPE Interview Questions | HireCRE",
  description:
    "Real estate private equity interview questions and how to answer: deal judgment, IC thinking, downside, conviction, and returns.",
};

export default function RepeInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="REPE Interview Questions"
      description="What REPE interviews actually test: judgment, clarity, and whether you can think like an investor—not just run a model."
    >
      <Section title="How to answer like an investor (not a spreadsheet)">
        <Callout title="The REPE answer order">
          <List
            items={[
              <>Deal thesis (why this works)</>,
              <>Downside (what breaks, how bad, and why you’re still ok)</>,
              <>Return drivers (NOI growth, cap rate, leverage, timing)</>,
              <>Edge (why you win this deal)</>,
              <>Decision (would you do it? at what price?)</>,
            ]}
          />
        </Callout>
      </Section>

      <Section title="High-frequency questions">
        <Grid>
          <Card title="Deal judgment">
            <List items={[<>Would you do this deal? Why?</>, <>What’s the #1 risk?</>, <>What’s your downside case?</>]} />
          </Card>
          <Card title="Returns & value">
            <List items={[<>What drives the IRR here?</>, <>What happens if exit cap widens 50–100 bps?</>, <>What’s your underwriting haircut?</>]} />
          </Card>
          <Card title="IC thinking">
            <List items={[<>What would IC push back on?</>, <>What diligence item matters most?</>, <>What would make you walk?</>]} />
          </Card>
        </Grid>
      </Section>

      <Section title="A senior-sounding close">
        <Callout title="Use this line">
          <>
            “If the thesis is clear, the downside is survivable, and returns are driven by controllable execution
            (not multiple expansion), I’m interested. If the deal only works with perfect timing, I’m out—or I reprice.”
          </>
        </Callout>
      </Section>
<RelatedLinks
  items={[
    { title: "Equity Returns 101 (IRR vs MOIC)", href: "/interview-prep/equity-returns-101" },
    { title: "Equity Waterfall Basics", href: "/interview-prep/equity-waterfall-basics" },
    { title: "Acquisitions Interview Questions", href: "/interview-prep/acquisitions-interview-questions" },
  ]}
/>
      
      <BottomCtas />
    </PageShell>
  );
}
