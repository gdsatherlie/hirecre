import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Section, Card, Callout, List, BottomCtas, Grid, RelatedLinks } from "../_components";

export const metadata: Metadata = {
  title: "Leasing Interview Questions (Office, Retail, Industrial) | HireCRE",
  description:
    "Practitioner-written leasing interview question guide covering pipeline, comps, concessions, TI/LC structuring, renewals, and negotiation across office, retail, and industrial.",
  alternates: { canonical: "/interview-prep/leasing-interview-questions" },
};

export default function LeasingInterviewQuestions() {
  return (
    <PageShell
      crumb={{ label: "Interview Prep", href: "/interview-prep" }}
      title="Leasing Interview Questions"
      description="Leasing interviews test market knowledge and execution: comps, pipeline, concessions, and how you actually get deals done. Here's what gets asked and how to answer it."
    >
      <Section title="What leasing interviews are testing">
        <div className="prose prose-neutral max-w-none">
          <p>
            Leasing is an execution-heavy seat — every week is a mix of
            broker calls, tenant reps, tour coordination, comp pulls,
            proposal structuring, and lease review. Interviewers are
            looking for three things that map to how leasing pros actually
            get hired and promoted:
          </p>
          <ol>
            <li>
              <strong>Do you know the market?</strong> Not "office is
              weak." Specifically: what are effective rents in your
              submarket, what&apos;s the concession package clearing deals,
              who just moved, who&apos;s in the market looking.
            </li>
            <li>
              <strong>Can you build and work a pipeline?</strong> Leasing
              without an active pipeline of 20+ prospects at various stages
              is just marketing. Interviewers probe for your qualification
              process and conversion discipline.
            </li>
            <li>
              <strong>Can you structure a deal and close it?</strong> TI,
              free rent, caps on escalators, termination rights, renewal
              options — any of these can make or break the economics.
              Interviewers want to see you understand the trade-offs.
            </li>
          </ol>
        </div>
      </Section>

      <Section title="The four-part leasing answer structure">
        <Callout title="Frame every deal story this way">
          <List
            items={[
              <>Market read (what effective rents + concessions are doing)</>,
              <>Tenant story (who they are, what they need, why they moved)</>,
              <>Economics (face rent, concessions, TI, term, escalators)</>,
              <>Outcome (close, stall, walk — and why)</>,
            ]}
          />
        </Callout>
        <div className="prose prose-neutral max-w-none mt-4">
          <p>
            Leasing is often described in face-rent terms, but deals clear on
            effective rent (face rent net of concessions and TI amortized
            over the term). A senior hiring manager will assume you can
            think in effective rent; if you can&apos;t, it&apos;s an early
            filter.
          </p>
        </div>
      </Section>

      <Section title="Common questions by category">
        <Grid>
          <Card title="Market + comps">
            <List
              items={[
                <>
                  <strong>What are effective rents doing?</strong> — Not
                  face rent. Include concessions (free rent, TI) amortized
                  over the term.
                </>,
                <>
                  <strong>Where are concessions trending?</strong> — Months
                  of free rent, TI per square foot, cap on operating
                  expenses. Specific numbers beat directional language.
                </>,
                <>
                  <strong>Who&apos;s winning tenants and why?</strong> —
                  Name the specific buildings / owners who are taking
                  share. Usually a function of location, parking, building
                  amenities, or ownership&apos;s willingness to do deals.
                </>,
              ]}
            />
          </Card>
          <Card title="Pipeline">
            <List
              items={[
                <>
                  <strong>How do you build pipeline?</strong> — Named
                  sources: tenant reps you have relationships with,
                  industry events, inbound from marketing, cold outreach
                  to specific categories of tenants (e.g., life-sci
                  expansions).
                </>,
                <>
                  <strong>How do you qualify leads?</strong> — Have a 4–5
                  point checklist. Requirement size, timing, budget,
                  decision-maker identified, competitive set they&apos;re
                  evaluating.
                </>,
                <>
                  <strong>How do you manage conversion?</strong> —
                  Structured follow-up cadence, clear next steps at every
                  interaction, active management of the 20–30 deals in
                  your pipeline with a tracking system.
                </>,
              ]}
            />
          </Card>
          <Card title="Negotiation">
            <List
              items={[
                <>
                  <strong>How do you structure TI/LC?</strong> — Base TI
                  allowance, incremental for long terms, amortized into
                  rent for anything above standard. Cap on rent abatement
                  if exercised with cotenancy.
                </>,
                <>
                  <strong>What&apos;s your approach to renewals?</strong>{" "}
                  — Start 12–18 months before expiration, anchor on
                  effective rent at the time of discussion, use capex
                  avoidance as the owner&apos;s leverage.
                </>,
                <>
                  <strong>Biggest deal you closed and why it worked?</strong>{" "}
                  — Name tenant, SF, term, and the 1–2 moves that made
                  the deal close (TI package, expansion option, escalator
                  cap, buildout flexibility).
                </>,
              ]}
            />
          </Card>
        </Grid>
      </Section>

      <Section title="Technical questions you'll get asked">
        <div className="prose prose-neutral max-w-none">
          <h3>"Walk me through how you&apos;d underwrite a new lease."</h3>
          <p>
            Start with the tenant credit — public credit, private with
            strong financials, small private with guarantor, or weak with
            LC backup. Credit drives what terms you&apos;ll accept. Then:
            face rent (comparable to market), term (long enough to
            amortize TI but not so long you&apos;re locked at
            below-market), escalations (fixed vs CPI, 2–3% fixed is
            standard), TI allowance (new tenant: higher; renewal: lower),
            free rent (months of abatement upfront), options (expansion,
            termination, renewal at what rent).
          </p>
          <h3>"What&apos;s the effective rent on this deal?"</h3>
          <p>
            Effective rent = face rent across the term, minus concessions
            (free rent value + TI allowance), divided by the total term.
            Example: $40 face rent, 10 year term, 6 months free rent, $80
            TI allowance = face gross revenue ($400/sf over 10 years)
            minus $20 free rent value minus $80 TI = $300/sf over 10 years
            = $30/sf effective rent. Know the formula cold.
          </p>
          <h3>"What&apos;s the difference between gross and triple-net?"</h3>
          <p>
            Gross (or full-service gross): landlord pays operating
            expenses; rent is higher. Triple-net (NNN): tenant pays its
            pro-rata share of taxes, insurance, and operating expenses
            (CAM) on top of base rent. The economics can be equivalent but
            the risk allocation is different — NNN shifts expense
            inflation risk to the tenant; gross keeps it with the
            landlord. Office and retail use various middle-ground
            structures (modified gross, NN); industrial is usually NNN.
          </p>
          <h3>"How do you think about cotenancy provisions?"</h3>
          <p>
            In retail, cotenancy tied to anchor tenants gives the smaller
            tenant rent relief (or termination rights) if the anchor
            closes. It&apos;s high-stakes in weak retail environments —
            a single anchor closure can cascade to 30% of the GLA
            exercising cotenancy. As an owner, you want the trigger tight
            (specific named tenants only, clear replacement windows) and
            the relief capped. As a tenant rep, you want the trigger
            loose and the relief permanent until cured.
          </p>
        </div>
      </Section>

      <Section title="Red flags interviewers listen for">
        <div className="prose prose-neutral max-w-none">
          <ul>
            <li>
              <strong>Face-rent-only thinking.</strong> Candidates who talk
              about rent without referencing concessions or effective rent
              are pre-associate-level. Get to effective rent early in
              every answer.
            </li>
            <li>
              <strong>No market specifics.</strong> "Office is weak" is
              not a market read. "Effective rents in my submarket are
              down 15% from 2022 peaks, concessions are at 18 months free
              on 10-year terms, tenants are right-sizing 30%" is.
            </li>
            <li>
              <strong>No post-close view.</strong> Candidates who treat
              the signed lease as the end of the deal miss that leasing
              continues through operating: CAM reconciliation disputes,
              tenant expansion, early renewal conversations. Senior
              leasing people manage the full arc.
            </li>
          </ul>
        </div>
      </Section>

      <RelatedLinks
        items={[
          { title: "Brokerage Interview Questions", href: "/interview-prep/brokerage-interview-questions" },
          { title: "Asset Management Interview Questions", href: "/interview-prep/asset-management-interview-questions" },
          { title: "Rent Roll + T-12 Deep Dive", href: "/interview-prep/rent-roll-t12-deep-dive" },
          { title: "Property Management Interview Questions", href: "/interview-prep/property-management-interview-questions" },
        ]}
      />

      <BottomCtas />
    </PageShell>
  );
}
