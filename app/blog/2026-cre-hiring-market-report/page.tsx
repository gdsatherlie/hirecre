import type { Metadata } from "next";
import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";

const SLUG = "2026-cre-hiring-market-report";

export const metadata: Metadata = {
  title:
    "The 2026 CRE Hiring Market: What HireCRE Is Seeing | HireCRE Blog",
  description:
    "Data from 1,451 active commercial real estate roles: where companies are hiring, which roles dominate, how often pay is disclosed, and what the patterns say about the market.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "The 2026 CRE Hiring Market: What HireCRE Is Seeing",
    description: "Aggregated data from 1,451 active CRE roles on HireCRE.",
    url: `https://hirecre.com/blog/${SLUG}`,
    type: "article",
  },
};

export default function Post() {
  return (
    <BlogPostLayout slug={SLUG}>
      <p>
        HireCRE aggregates active commercial real estate and proptech roles
        from company career sites every six hours. As of this writing we
        have 1,451 active roles indexed from 54 distinct CRE and proptech
        companies. This post is a mid-2026 read of what we&apos;re seeing in
        the aggregate data — treat it as a practitioner signal, not a
        statistical proof.
      </p>

      <h2>Volume and freshness</h2>
      <p>
        Across our sources, <strong>811 roles</strong> — about 56% of the
        active set — were first posted in the last 30 days. In the last 7
        days alone, <strong>375 new roles</strong> hit the feed. That&apos;s
        roughly 53 new CRE roles per day across the companies we track, and
        it&apos;s been a consistent tempo through Q1 2026 despite broader
        market choppiness.
      </p>
      <p>
        The read: institutional sponsors and banks are still actively hiring
        mid-level talent through market uncertainty. The tightness is at the
        senior acquisitions seat — fewer openings, more internal shuffling —
        not at the analyst and associate levels.
      </p>

      <h2>Compensation disclosure</h2>
      <p>
        Of the 1,451 active roles, <strong>1,130 (78%)</strong> include some
        form of disclosed pay, whether a range, a target, or an hourly band.
        That&apos;s substantially higher than it was even two years ago, and
        it reflects the growing pressure from pay-transparency laws in
        California, Colorado, Washington, and New York — which between them
        cover most of the institutional CRE headcount.
      </p>
      <p>
        For job-seekers this is genuinely useful: you can benchmark before
        the first call, and pay ranges on comparable roles at comparable
        sponsors give you clean negotiation anchors. See our{" "}
        <Link href="/commercial-real-estate-salary-guide">
          CRE salary guide
        </Link>{" "}
        for role-by-role compensation context.
      </p>

      <h2>Geography</h2>
      <p>
        The top states by active role count on HireCRE right now:
      </p>
      <ul>
        <li>
          <Link href="/jobs/in/california">California</Link> — ~143 active
          roles, with clusters in the Bay Area, LA, and San Diego.
          Dominated by Marcus &amp; Millichap, CIM, Banner Bank, and ICONIQ
          Capital.
        </li>
        <li>
          <Link href="/jobs/in/new-york">New York</Link> — ~96 active roles,
          Manhattan-heavy. Largest employers in our feed are Empire State
          Realty Trust, Kroll Bond Rating Agency, and Metropolitan
          Commercial Bank.
        </li>
        <li>
          <Link href="/jobs/in/texas">Texas</Link> — ~49 active roles,
          concentrated in DFW and Austin. Marcus &amp; Millichap and
          Bellwether Enterprise are the most active.
        </li>
        <li>
          <Link href="/jobs/in/washington">Washington</Link> — ~37 active
          roles, Banner Bank&apos;s Seattle footprint dominates; the
          institutional tech-office exposure here is a meaningful secondary
          cluster.
        </li>
        <li>
          <Link href="/jobs/in/illinois">Illinois</Link> — ~36 active roles,
          Chicago-centric, with Harrison Street Asset Management and The
          Scion Group carrying most of the volume.
        </li>
        <li>
          <Link href="/jobs/in/florida">Florida</Link>,{" "}
          <Link href="/jobs/in/arizona">Arizona</Link>, and{" "}
          <Link href="/jobs/in/georgia">Georgia</Link> round out the top
          eight, each with 20–35 active roles.
        </li>
      </ul>
      <p>
        The Sunbelt markets (TX, FL, AZ, GA, plus a few we don&apos;t have
        curated state pages for yet) have the fastest week-over-week growth
        in new posts. The coastal gateways have the largest absolute
        inventory.
      </p>

      <h2>Role mix</h2>
      <p>
        Rough bucketing of what&apos;s getting posted (active roles, not
        applications):
      </p>
      <ul>
        <li>
          <strong>Operating roles</strong> — property management, leasing,
          on-site operations, corporate functions at CRE operators — about
          60% of inventory. Brokerage firms like Marcus &amp; Millichap also
          hire heavily into leasing and support roles, which shows up here.
        </li>
        <li>
          <strong>Investment and capital markets</strong> — acquisitions,
          asset management, investment sales, credit — about 20%. This is
          the bucket most institutional-track candidates are targeting.
        </li>
        <li>
          <strong>Development and construction</strong> — ~8%.
        </li>
        <li>
          <strong>Finance / accounting / corporate</strong> — ~7%.
        </li>
        <li>
          <strong>Proptech / data / product</strong> — ~5%. Smaller in
          volume, but the roles concentrate at companies like Crexi, VTS,
          Compstak, Green Street, and Bisnow — every one of which is in our
          feed.
        </li>
      </ul>

      <h2>The pattern we&apos;re watching most closely</h2>
      <p>
        Bank CRE hiring has stayed strong while debt-fund origination-team
        hiring has been quieter than Q4 2025. That&apos;s consistent with
        banks leaning into the CRE-debt gap and debt funds waiting out the
        spread environment. If rates move and banks pull back, that
        dynamic flips — debt funds typically scale origination teams fast
        once the window opens. Candidates with bank CRE experience are
        well-positioned either way.
      </p>
      <p>
        On the equity side, acquisitions associate and VP hiring at
        institutional sponsors has been narrow. Roles are available, but
        sponsors are being picky — the bar has moved from "good technical"
        to "good technical plus a point of view on a specific thesis."
        Interviews are running longer and case-heavier than in 2022–2023.
      </p>

      <h2>How to use this</h2>
      <p>
        If you&apos;re actively looking, filter the{" "}
        <Link href="/board">job board</Link> by role type and state. If
        you&apos;re passively looking,{" "}
        <Link href="/alerts">set up job alerts</Link> and we&apos;ll email
        you matches when new roles in your target segment get posted. If
        you&apos;re interviewing, the{" "}
        <Link href="/interview-prep">interview prep hub</Link> has the
        underwriting and case frameworks that come up repeatedly in
        acquisitions and credit interviews — worth knowing cold before the
        first call.
      </p>

      <p>
        We&apos;ll post market reads like this quarterly as the data updates
        — bookmark the blog or grab the email alerts.
      </p>
    </BlogPostLayout>
  );
}
