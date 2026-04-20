import type { Metadata } from "next";
import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";

const SLUG = "what-acquisitions-analysts-actually-do";

export const metadata: Metadata = {
  title:
    "What Acquisitions Analysts Actually Do (Beyond the Model) | HireCRE Blog",
  description:
    "A practitioner's walkthrough of the real work at a CRE acquisitions desk — sourcing, underwriting, IC prep, and the judgment calls that decide which deals move forward.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "What Acquisitions Analysts Actually Do (Beyond the Model)",
    description:
      "The real work at a CRE acquisitions desk — sourcing, underwriting, IC prep, and judgment calls.",
    url: `https://hirecre.com/blog/${SLUG}`,
    type: "article",
  },
};

export default function Post() {
  return (
    <BlogPostLayout slug={SLUG}>
      <p>
        Most candidates walking into an acquisitions analyst interview have a
        clean mental model of the job: you open Excel, pull in a rent roll and
        a T12, build an underwriting model, and hand it to a senior person
        who decides whether to pursue the deal. That model is about 30% right
        and 70% wrong. The modeling is real, but it&apos;s not the center of
        gravity of the role — the judgment is.
      </p>

      <p>
        This post is a practitioner&apos;s walkthrough of what an acquisitions
        analyst at an institutional sponsor actually spends their time on,
        where the real leverage is, and what separates the analysts who get
        promoted from the ones who don&apos;t.
      </p>

      <h2>1. Sourcing lives at the top of the funnel</h2>
      <p>
        Before a deal reaches the model, someone has to bring it in. At
        mid-sized sponsors, the analyst is often the person maintaining the
        broker relationships — reading every offering memorandum (OM) that
        crosses the inbox, triaging which ones fit the firm&apos;s thesis,
        and building the first-pass assumptions that go back to the principal.
      </p>
      <p>
        The work is repetitive but directly tied to deal flow: if you triage
        100 OMs and surface five serious candidates, you are operating at the
        level the senior team needs. If you forward everything with no
        filtering, you are asking them to do your job. Analysts who develop
        a reputation for disciplined triage get more deals sent their way,
        which compounds into more promotion opportunities.
      </p>

      <h2>2. Underwriting is 40% modeling, 60% inputs</h2>
      <p>
        Every underwriting is a stack of assumptions — market rent, rent
        growth, vacancy, expense growth, exit cap rate, financing terms.
        The analyst who is best at their job is the one who can defend each
        assumption in one sentence, with a source. The one who is worst at
        their job is the one who tunes a model to hit a target return.
      </p>
      <p>
        Two concepts you will be asked about constantly:{" "}
        <Link href="/interview-prep/dscr-vs-debt-yield">
          DSCR and debt yield
        </Link>
        . Sponsors care about debt yield because it&apos;s the lender&apos;s
        primary sizing constraint for most institutional deals. You should be
        able to explain when each metric binds on sizing, and how a 100 bps
        rate move hits DSCR vs debt yield differently. If you can&apos;t, you
        will lose credibility in IC.
      </p>

      <h2>3. Investment Committee prep is the job</h2>
      <p>
        Every serious sponsor has an Investment Committee (IC). Deals move
        from "interesting" to "approved" through a memo + oral defense. The
        analyst writes the first draft of the memo, pulls the supporting
        exhibits, and builds the return sensitivity tables. The senior person
        edits and presents.
      </p>
      <p>
        The memo is where the work compounds. A good IC memo:
      </p>
      <ul>
        <li>
          States the thesis in one sentence — why this deal, why now, why us.
        </li>
        <li>
          Walks through the downside case before the base case. If you can&apos;t
          survive the downside, the base case doesn&apos;t matter.
        </li>
        <li>
          Surfaces the two or three most-sensitive assumptions and shows
          what breaks them.
        </li>
        <li>
          Names the specific risks and the mitigants — never "market risk"
          without specifics.
        </li>
      </ul>
      <p>
        Analysts who write clean memos get their names in front of IC. That
        visibility is what gets you to associate.
      </p>

      <h2>4. Due diligence is underrated</h2>
      <p>
        Post-LOI, you move from underwriting to diligence: third-party
        reports (appraisal, environmental, engineering, zoning), lease-level
        reviews, tenant credit, title. The analyst runs the schedule, flags
        issues, and writes the diligence summary.
      </p>
      <p>
        What separates strong analysts here is closing the loop back to the
        underwriting. If the environmental report surfaces a $300k remediation
        cost, do you actually update the model? If an estoppel reveals a
        tenant early-termination right you missed, do you re-run the downside?
        Every diligence finding is a chance to be either the person who
        catches it or the person who explains the write-down three years later.
      </p>

      <h2>5. Asset management handoff — if you&apos;re at a sponsor</h2>
      <p>
        At most sponsors, acquisitions analysts don&apos;t asset-manage, but
        you do the handoff. You build the business plan, the budget, the
        lease-up schedule, and the hold-period model that the asset manager
        will be accountable to. If the handoff is sloppy, asset management
        inherits assumptions they didn&apos;t sign up for and the deal
        underperforms. If it&apos;s clean, the deal is set up to execute.
      </p>

      <h2>The judgment part — where the role compounds</h2>
      <p>
        Everything above is craft. The thing that makes acquisitions analysts
        valuable beyond the craft is developing judgment: knowing which deals
        to push on, which to let go, where the market is mispricing risk,
        and how to negotiate the narrow-spread deals that nobody else wants
        to touch.
      </p>
      <p>
        You build that judgment by seeing a lot of deals, listening carefully
        in IC, and internalizing the patterns of what works and what
        doesn&apos;t. The modeling is table stakes. The judgment is why the
        senior partners still have their jobs after 20 years.
      </p>

      <h2>If you&apos;re preparing for an acquisitions interview</h2>
      <p>
        The best prep isn&apos;t reading about underwriting — it&apos;s
        walking through a deal end-to-end and being able to defend each
        assumption. Our{" "}
        <Link href="/interview-prep/underwriting-walkthrough">
          underwriting walkthrough guide
        </Link>{" "}
        covers the full sequence, and the{" "}
        <Link href="/interview-prep/equity-waterfall-basics">
          equity waterfall primer
        </Link>{" "}
        is essential for understanding how the deal returns actually flow to
        sponsors and LPs. If you&apos;re targeting specific seats, the{" "}
        <Link href="/interview-prep/acquisitions-interview-questions">
          acquisitions interview question bank
        </Link>{" "}
        has practitioner-written prompts and what interviewers are actually
        testing with each one.
      </p>

      <p>
        Ready to look at live acquisitions roles?{" "}
        <Link href="/board">Browse active CRE jobs on HireCRE</Link> — filter
        for acquisitions, analyst, or associate to see what&apos;s posted
        today.
      </p>
    </BlogPostLayout>
  );
}
