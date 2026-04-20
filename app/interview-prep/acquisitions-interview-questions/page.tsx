import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Acquisitions Interview Questions (with Answer Frameworks) | HireCRE",
  description:
    "The real questions CRE acquisitions interviews ask, plus practitioner-written answer frameworks for thesis, underwriting, downside, pricing, and decision-making.",
  alternates: { canonical: "/interview-prep/acquisitions-interview-questions" },
};

export default function AcquisitionsInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Acquisitions Interview Questions"
      description="Acquisitions interviews test one thing: can you form a thesis, underwrite conservatively, and make a decision with conviction. Here's how the questions actually get asked, what interviewers are looking for, and the answer framework that works at institutional sponsors."
    >
      <Section title="What acquisitions interviews are really testing">
        <div className="prose prose-neutral max-w-none">
          <p>
            The surface-level questions in an acquisitions interview sound like
            technical tests — underwriting, model mechanics, cap rate moves.
            The actual evaluation is different. Hiring managers are screening
            for three behaviors:
          </p>
          <ol>
            <li>
              <strong>Can you form a view?</strong> An analyst who can only
              describe what the pro forma says, without a point of view on
              whether it&apos;s realistic, doesn&apos;t scale. Interviewers
              are listening for a <em>thesis</em> — a one-sentence reason this
              deal wins — every time you describe a deal.
            </li>
            <li>
              <strong>Are you conservative by default?</strong> Junior
              acquisitions pros who anchor to broker assumptions get their
              shops into bad deals. Interviewers probe by asking what you
              haircut and why.
            </li>
            <li>
              <strong>Will you say no?</strong> The valuable analyst is the
              one who walks away from deals that don&apos;t work, not the
              one who pushes every deal forward. Interviewers test this with
              "would you buy it at that price?" and listen for whether you
              have the conviction to say no.
            </li>
          </ol>
          <p>
            Your answer structure should explicitly cover all three. Even
            technical questions are evaluated through this lens.
          </p>
        </div>
      </Section>

      <Section title="The five-part acquisitions answer structure">
        <Callout title="Use this order for any deal question">
          <List
            items={[
              <>Thesis (why this asset wins in this market)</>,
              <>Underwriting (what you haircut vs pro forma)</>,
              <>Downside (what breaks + how you protect)</>,
              <>Pricing (what you&apos;d pay and why)</>,
              <>Decision (do it / don&apos;t / do it with conditions)</>,
            ]}
          />
        </Callout>
        <div className="prose prose-neutral max-w-none mt-4">
          <p>
            Each of the five has a specific purpose:
          </p>
          <ul>
            <li>
              <strong>Thesis</strong> — the compression of your view into one
              sentence. "A B+ multifamily deal in a rent-controlled market
              where the sponsor&apos;s operational story doesn&apos;t hold up"
              is a thesis. "It&apos;s a multifamily deal with upside" is not.
            </li>
            <li>
              <strong>Underwriting</strong> — the specific assumptions you
              took down from the offering memorandum. "Broker is at 4%
              growth in years 1–3; I haircut to 3% because their comp set
              doesn&apos;t reflect the concession environment in submarket X"
              is good. "I cut rent growth" is not.
            </li>
            <li>
              <strong>Downside</strong> — what specifically breaks the deal.
              If you can&apos;t name two or three variables that would blow
              through the debt coverage, you haven&apos;t stress-tested.
            </li>
            <li>
              <strong>Pricing</strong> — the number you&apos;d pay, with a
              reason tied to the return hurdles of your theoretical fund.
              "I&apos;d pay $180/unit versus the $200 ask because the
              debt-yield at $200 doesn&apos;t clear 9% at our LTV target"
              is better than "I&apos;d pay less."
            </li>
            <li>
              <strong>Decision</strong> — explicit. Don&apos;t say "it
              depends." Say "yes at $180, no at $200, yes at $200 if the
              seller seller-carries 20% of the equity."
            </li>
          </ul>
        </div>
      </Section>

      <Section title="Common questions by category">
        <Grid>
          <Card title="Thesis + market">
            <List
              items={[
                <>
                  <strong>Why this market?</strong> — Answer with the demand
                  driver, supply picture, and a specific catalyst tied to
                  the next 24–36 months.
                </>,
                <>
                  <strong>What&apos;s the demand driver?</strong> — Name it
                  specifically: logistics absorption tied to Amazon network,
                  life-sci demand tied to a biotech cluster, etc.
                </>,
                <>
                  <strong>What&apos;s the competitive set?</strong> — List 2–3
                  comparable assets, explain how this one wins on location,
                  quality, or price per foot.
                </>,
              ]}
            />
          </Card>
          <Card title="Underwriting">
            <List
              items={[
                <>
                  <strong>What assumptions did you haircut?</strong> — Usually
                  3–5 of: rent growth, vacancy, expense growth, exit cap,
                  lease-up timing.
                </>,
                <>
                  <strong>What&apos;s your sensitivity?</strong> — Which
                  input moves IRR the most? Cap rate at exit &gt; rent
                  growth &gt; financing cost &gt; vacancy, usually.
                </>,
                <>
                  <strong>What&apos;s the biggest driver?</strong> — Be
                  decisive. Pick the one variable most exposed to the
                  thesis being wrong.
                </>,
              ]}
            />
          </Card>
          <Card title="Decision">
            <List
              items={[
                <>
                  <strong>Would you buy it today?</strong> — Yes/no. Then
                  defend.
                </>,
                <>
                  <strong>At what price?</strong> — A specific number. Tie it
                  to debt yield or DSCR clearing a threshold.
                </>,
                <>
                  <strong>What would make you walk?</strong> — A specific
                  variable moving a specific amount: "cap rate expands 75
                  bps," "seller won&apos;t cap capex," "we can&apos;t get
                  the debt at 65% LTV."
                </>,
              ]}
            />
          </Card>
        </Grid>
      </Section>

      <Section title="Technical questions you'll get asked">
        <div className="prose prose-neutral max-w-none">
          <p>
            Expect at least a few technical prompts mixed into the deal
            discussion. The most common:
          </p>
          <h3>"Walk me through how you would underwrite this."</h3>
          <p>
            This is the core question. Your answer should flow: gather the
            data (rent roll, T12, market comps), build the pro forma with
            your own assumptions (not the seller&apos;s), apply a debt
            structure that matches the thesis, compute returns (IRR,
            multiple, cash-on-cash), stress-test the key variables, and
            arrive at a price. The{" "}
            <Link href="/interview-prep/underwriting-walkthrough">
              full underwriting walkthrough
            </Link>{" "}
            covers the entire sequence.
          </p>
          <h3>"What&apos;s a good IRR for this deal?"</h3>
          <p>
            Don&apos;t answer with a number first. Answer with "what&apos;s
            the risk profile?" Core = 8–10%. Core-plus = 10–12%. Value-add
            = 13–17%. Opportunistic = 18%+. Then give the number that fits.
            If you skip the risk framing, the interviewer will assume you
            memorized ranges rather than understanding the risk-return
            relationship.
          </p>
          <h3>"What&apos;s more important, IRR or multiple?"</h3>
          <p>
            Neither in isolation. IRR rewards short holds; multiple rewards
            long holds. A 25% IRR on a 2-year flip generates less absolute
            profit than a 15% IRR on a 7-year hold. LPs usually focus on
            multiple for long-dated funds; sponsors focus on IRR because
            that&apos;s how promotes crystallize. Answer with the
            trade-off, not a pick.
          </p>
          <h3>"How does DSCR vs debt yield bind on this deal?"</h3>
          <p>
            Usually one metric binds at a given rate environment. In low-rate
            environments, debt yield binds (lenders can hit coverage easily,
            but they want a minimum unlevered return). In high-rate
            environments, DSCR binds (debt service eats cash flow before
            coverage clears). Know which one binds on your deal and why.
            See{" "}
            <Link href="/interview-prep/dscr-vs-debt-yield">
              DSCR vs Debt Yield
            </Link>{" "}
            for the full framework.
          </p>
        </div>
      </Section>

      <Section title="How to prepare a deal for the interview">
        <div className="prose prose-neutral max-w-none">
          <p>
            Bring one deal you&apos;ve actually underwritten, or one you can
            describe in enough detail to make the thesis real. "I looked at
            a 240-unit multifamily deal in Raleigh where..." is better than
            hypothetical answers.
          </p>
          <ol>
            <li>
              Pick an asset type you know. Don&apos;t try to sound
              impressive by picking something you&apos;ve never underwritten.
            </li>
            <li>
              Remember the rent roll. If you say "the rent roll looked
              underpriced," an interviewer will ask by how much and why. Be
              ready with specifics.
            </li>
            <li>
              Have a point of view on the seller. Institutional seller?
              Family office? Distressed? Who&apos;s selling shapes what
              matters in the diligence.
            </li>
            <li>
              Know the financing. What lender class, what LTV, what coverage
              terms, what rate. This is almost always the follow-up
              question.
            </li>
            <li>
              Have a post-close business plan. What would you do with this
              asset for three years? Which tenants do you push? What capex?
              What&apos;s the exit thesis?
            </li>
          </ol>
        </div>
      </Section>

      <Section title="Red flags interviewers listen for">
        <div className="prose prose-neutral max-w-none">
          <ul>
            <li>
              <strong>Anchoring to the broker.</strong> If every one of your
              numbers matches the OM, the interviewer assumes you didn&apos;t
              actually underwrite.
            </li>
            <li>
              <strong>False precision.</strong> "This returns a 17.3% IRR"
              without being able to describe the ±200 bps sensitivity means
              you&apos;re presenting one number from a model you don&apos;t
              understand.
            </li>
            <li>
              <strong>No downside.</strong> The phrase "there&apos;s no
              real downside" is a disqualifier.
            </li>
            <li>
              <strong>Can&apos;t walk away.</strong> Candidates who want every
              deal to work are a liability. Interviewers test this by
              presenting a deal with clear disqualifiers and listening for
              whether you pick them up or talk yourself into it.
            </li>
          </ul>
        </div>
      </Section>

      <RelatedLinks
        items={[
          { title: "Walk Me Through Your Underwriting", href: "/interview-prep/underwriting-walkthrough" },
          { title: "DSCR vs Debt Yield (With Example)", href: "/interview-prep/dscr-vs-debt-yield" },
          { title: "Equity Waterfall Basics", href: "/interview-prep/equity-waterfall-basics" },
          { title: "REPE Interview Questions", href: "/interview-prep/repe-interview-questions" },
          { title: "What Acquisitions Analysts Actually Do", href: "/blog/what-acquisitions-analysts-actually-do" },
        ]}
      />

      <BottomCtas />
    </PageShell>
  );
}
