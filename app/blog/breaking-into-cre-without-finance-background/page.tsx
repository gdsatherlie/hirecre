import type { Metadata } from "next";
import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";

const SLUG = "breaking-into-cre-without-finance-background";

export const metadata: Metadata = {
  title: "Breaking Into CRE Without a Finance Background | HireCRE Blog",
  description:
    "Four realistic paths into commercial real estate if you didn't come from banking or finance, plus the underwriting skills you have to build no matter which path you take.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Breaking Into CRE Without a Finance Background",
    description:
      "Four realistic paths into CRE if you didn't come from banking or finance.",
    url: `https://hirecre.com/blog/${SLUG}`,
    type: "article",
  },
};

export default function Post() {
  return (
    <BlogPostLayout slug={SLUG}>
      <p>
        Commercial real estate has an insider reputation — most of the
        institutional seats at private equity real estate shops and debt
        funds recruit from investment banking analyst programs. If you
        didn&apos;t take that path, it&apos;s easy to assume the door is
        closed. It isn&apos;t, but you need to be honest about which path is
        realistic for you and what skills you have to build along the way.
      </p>
      <p>
        Here are the four paths that actually work, what each looks like in
        practice, and the underwriting competencies you need regardless.
      </p>

      <h2>Path 1: Brokerage</h2>
      <p>
        Investment sales, capital markets, and leasing at CBRE, JLL, Cushman
        &amp; Wakefield, Marcus &amp; Millichap, and Newmark. These shops
        hire out of undergrad without a finance background — the bar is work
        ethic, relationship skills, and a willingness to grind. Analyst
        programs at the major brokerages give you a formal underwriting
        foundation on institutional assets; brokerage teams at mid-size firms
        put you directly into pitching and executing deals.
      </p>
      <p>
        The trade-off: brokerage comp is mostly variable. In good markets
        you can out-earn your investment banking peers; in bad markets you
        can make almost nothing. Exits to principal roles (acquisitions at
        sponsors, capital markets seats at REITs) are real — brokerage
        teaches you to see a lot of deals quickly, which is a skill
        acquisitions leaders explicitly hire for.
      </p>

      <h2>Path 2: Bank CRE credit</h2>
      <p>
        Regional banks (KeyBank, PNC, BMO, Wells, etc.) and community banks
        run large commercial real estate lending books. They hire credit
        analysts directly out of college or into 1–2 year credit training
        programs. The work is underwriting loans — the same concept as
        equity underwriting but from the lender side of the capital stack.
      </p>
      <p>
        This path teaches you the most about what actually protects a deal,
        because lenders care about downside more than upside. You&apos;ll
        internalize{" "}
        <Link href="/interview-prep/dscr-vs-debt-yield">
          DSCR, debt yield, and debt service coverage
        </Link>{" "}
        deeply. Bank credit is the most common feeder into debt fund roles
        and a very reasonable feeder into sponsor acquisitions.
      </p>
      <p>
        The trade-off: base-heavy comp with modest bonus, slower pace than
        investment banking, and the exit to equity sponsor roles requires
        you to explicitly learn sponsor economics on your own time (since
        bank credit doesn&apos;t cover equity returns, waterfalls, or
        carry).
      </p>

      <h2>Path 3: Property operations / asset management</h2>
      <p>
        Property management, leasing, and on-the-ground asset management at
        sponsors and REITs. This is the most under-rated path for people
        without a finance background, because it teaches you things your
        finance-background peers will never learn: what actually drives
        NOI, how tenant relationships really work, why expenses overrun
        budgets, and what operational improvements are realistic vs
        aspirational.
      </p>
      <p>
        Several institutional CRE firms specifically hire acquisitions
        associates out of strong asset management groups — the theory being
        that someone who has actually managed an asset knows whether an
        acquisitions underwriting is realistic. The{" "}
        <Link href="/jobs/role/asset-management">
          asset management seats we see on HireCRE
        </Link>{" "}
        span institutional REITs, private sponsors, and multifamily
        operators.
      </p>

      <h2>Path 4: Development</h2>
      <p>
        Development associate roles at sponsors and private developers.
        Often hire from architecture, engineering, or construction
        backgrounds rather than finance — the reasoning being that
        development is a construction + entitlement + capital-raising
        discipline, and the finance piece is learnable on the job.
      </p>
      <p>
        If you&apos;re coming from an architecture or construction
        background, development is the most natural path. It teaches you
        hard-cost budgeting, draws and retainage, and the full construction
        financing stack — skills that are legible at every sponsor and REIT.
      </p>

      <h2>What you have to build regardless</h2>
      <p>
        Whichever path you pick, you need to build the underwriting
        fundamentals on your own time, because your interviewer will assume
        you have them. Minimum foundation:
      </p>
      <ul>
        <li>
          <Link href="/interview-prep/cap-rate-explained">
            Cap rates and how they compress and expand
          </Link>{" "}
          — the valuation primitive in CRE.
        </li>
        <li>
          <Link href="/interview-prep/dscr-vs-debt-yield">
            DSCR vs Debt Yield
          </Link>{" "}
          — lender-side sizing.
        </li>
        <li>
          <Link href="/interview-prep/equity-waterfall-basics">
            Equity waterfalls and promote structures
          </Link>{" "}
          — how sponsor economics actually work.
        </li>
        <li>
          <Link href="/interview-prep/explain-irr-interview">
            IRR vs multiple vs cash-on-cash
          </Link>{" "}
          — the return metrics.
        </li>
        <li>
          Modeling a basic CRE deal — rent roll, T12, pro forma, hold-period,
          exit, IRR. You should be able to do this from a blank page in an
          interview setting.
        </li>
      </ul>

      <h2>The move that compounds</h2>
      <p>
        Pick the realistic path, build the underwriting foundation in parallel,
        and keep a running thesis about a property type or market you
        actually know. Interviewers can tell within two minutes whether
        someone has real opinions about a market or is just reciting cap
        rates from a textbook. The person with a thesis, even if it&apos;s
        wrong in places, is more hireable than the person with perfect
        technicals and no point of view.
      </p>

      <p>
        Browse{" "}
        <Link href="/board">live CRE roles across all the paths above</Link>
        , or dig into the{" "}
        <Link href="/interview-prep">full interview prep hub</Link> if
        you&apos;re interviewing soon.
      </p>
    </BlogPostLayout>
  );
}
