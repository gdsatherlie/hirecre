import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About HireCRE | Commercial Real Estate Careers Resource",
  description:
    "HireCRE is a curated commercial real estate and proptech job board plus editorial resources on CRE careers, interview prep, and compensation. Our mission, sourcing methodology, editorial standards, and how we make money.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About HireCRE",
    description:
      "A curated CRE job board plus editorial resources on careers, interviews, and compensation.",
    url: "https://hirecre.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">About</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          About HireCRE
        </h1>
        <p className="mt-3 text-base text-gray-600">
          A curated commercial real estate job board, paired with editorial
          resources on CRE careers, interview preparation, and compensation.
        </p>
      </header>

      <div className="prose prose-neutral max-w-none prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-h2:font-semibold prose-h3:mt-6 prose-h3:text-lg prose-h3:font-semibold prose-a:text-blue-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline">
        <h2>What HireCRE is</h2>
        <p>
          HireCRE is a resource for commercial real estate (CRE) and proptech
          professionals evaluating their careers. The site has two sides: an{" "}
          <Link href="/board">aggregated job feed</Link> that pulls active
          roles from employer career sites every six hours, and an editorial
          library covering the concepts, roles, and compensation patterns
          that shape CRE careers.
        </p>
        <p>
          We built HireCRE because existing CRE job surfaces are either
          general-purpose sites with shallow coverage (Indeed, LinkedIn,
          ZipRecruiter) or industry publications that treat jobs as an
          afterthought. Neither does the core task — organizing
          CRE-specific opportunities alongside the context candidates need
          to evaluate them — well. HireCRE does both in one place.
        </p>

        <h2>How we source jobs</h2>
        <p>
          Every active role on HireCRE comes from one of three public
          sources:
        </p>
        <ul>
          <li>
            <strong>Greenhouse</strong> — used by institutional sponsors,
            REITs, and proptech companies to publish open roles on their
            career sites.
          </li>
          <li>
            <strong>Lever</strong> — same category of employers, different
            ATS.
          </li>
          <li>
            <strong>iCIMS</strong> — used by several larger brokerage and
            operator platforms.
          </li>
        </ul>
        <p>
          Our scrapers poll each source company&apos;s published career
          page every six hours, capture active roles, and normalize fields
          (title, company, location, pay when disclosed, posted date) so
          they&apos;re searchable alongside each other. When a role stops
          appearing on the employer&apos;s site, we mark it inactive within
          hours — you won&apos;t be sent to dead listings.
        </p>
        <p>
          We do not post jobs on behalf of employers. We do not run a
          recruiting service. We do not sell placements. Every application
          goes directly to the employer&apos;s official careers system.
        </p>

        <h2>What we add beyond the listing</h2>
        <p>
          Aggregation alone isn&apos;t enough. For every job detail page we
          generate an <em>Opportunity Snapshot</em>: an extracted summary,
          key requirements, and key responsibilities derived from the
          employer&apos;s own posting language. It&apos;s a triage tool —
          it doesn&apos;t replace reading the full listing, but it lets you
          shortlist 30 roles in the time it would take to read 5 deeply.
        </p>
        <p>
          Alongside the feed we publish:
        </p>
        <ul>
          <li>
            A{" "}
            <Link href="/commercial-real-estate-career-guide">
              CRE Career Guide
            </Link>{" "}
            mapping roles to the capital stack and deal cycle.
          </li>
          <li>
            A{" "}
            <Link href="/commercial-real-estate-salary-guide">
              CRE Salary Guide
            </Link>{" "}
            with compensation ranges and context by seat.
          </li>
          <li>
            An <Link href="/interview-prep">Interview Prep hub</Link> with
            30+ concept explainers covering DSCR, debt yield, cap rates,
            equity waterfalls, and question banks for common seat types.
          </li>
          <li>
            A <Link href="/blog">blog</Link> with original market
            commentary, role deep-dives, and hiring-market reports using
            the real data from our feed.
          </li>
          <li>
            A free{" "}
            <Link href="/tools/salary-calculator">CRE Salary Calculator</Link>{" "}
            that estimates 2026 total compensation by role, seat type,
            geography, and years of experience.
          </li>
        </ul>

        <h2>Editorial standards</h2>
        <p>
          Every article in the editorial library is written from a
          practitioner perspective, not a copy-for-SEO template. Our
          content goals, in order:
        </p>
        <ol>
          <li>
            <strong>Be specific.</strong> Name the seats, the firms, the
            numbers. A post about CRE compensation that doesn&apos;t
            reference actual base ranges isn&apos;t useful; neither is a
            post about underwriting that doesn&apos;t walk through a
            concrete example.
          </li>
          <li>
            <strong>Be honest about trade-offs.</strong> Every CRE career
            path has upside and downside. A guide that only talks about
            upside isn&apos;t a guide, it&apos;s recruiting copy. We try
            to be explicit about where the downside is for each path.
          </li>
          <li>
            <strong>Link forward.</strong> Articles cross-reference the
            prep concepts, guides, and live roles they reference. Readers
            should be able to go deeper on any term without leaving the
            site.
          </li>
        </ol>
        <p>
          We update articles when the market moves. When conditions change
          meaningfully — Fed rate moves, a sector rotation, comp bands
          shifting — we flag affected articles and revise rather than
          leaving stale content at the top of search results.
        </p>

        <h2>How we make money</h2>
        <p>
          HireCRE is funded by display advertising through Google AdSense.
          Ads are clearly labeled and never mixed with editorial
          recommendations. We do not accept sponsored job postings, and
          the ordering of the job board is never influenced by
          advertising relationships.
        </p>
        <p>
          We may experiment with additional revenue sources over time —
          affiliate relationships with CRE training programs, a premium
          subscription tier for enhanced search, or partnerships with
          specific employers. If any launch, we&apos;ll disclose the
          relationship on the relevant page. Transparency about who is
          paying for what content is non-negotiable.
        </p>

        <h2>Corrections and takedowns</h2>
        <p>
          We make mistakes. If you see an error — a wrong location on a
          listing, an expired role still showing, a factual error in an
          article — email us at{" "}
          <a
            className="font-semibold text-blue-700 hover:underline"
            href="mailto:hirecre@a26cos.com"
          >
            hirecre@a26cos.com
          </a>{" "}
          and we&apos;ll fix or remove it within a business day.
        </p>
        <p>
          If you&apos;re an employer and want your company&apos;s listings
          removed from the feed, email the same address. We&apos;ll honor
          the request and add the company to our exclusion list so new
          roles don&apos;t re-appear on the next scrape.
        </p>
        <p>
          If you&apos;re a candidate featured (explicitly or implicitly)
          in an article and want a correction or removal, the same address
          works.
        </p>

        <h2>Who&apos;s behind this</h2>
        <p>
          HireCRE is operated by active commercial real estate practitioners
          who were frustrated with the lack of a single place to see open CRE
          roles alongside the career context needed to evaluate them. All
          editorial content is written in-house by this team; we do not run
          AI-generated filler or accept sponsored coverage.
        </p>

        <h3>The HireCRE Editorial team</h3>
        <p>
          Articles and concept explainers are published under the{" "}
          <strong>HireCRE Editorial</strong> byline. Our contributors have
          collective experience across:
        </p>
        <ul>
          <li>Institutional acquisitions and asset management seats</li>
          <li>Bank CRE credit and debt-fund origination</li>
          <li>Investment sales and capital markets brokerage</li>
          <li>Development and construction management</li>
          <li>CRE analytics and proptech product</li>
        </ul>
        <p>
          We publish under a collective byline rather than individual names
          because our contributors maintain active CRE careers at third-party
          firms. Individual attribution would create professional conflicts
          and constrain the candor readers come to HireCRE for. This is the
          same pattern many industry publications use when their contributors
          work in the industry they cover.
        </p>
        <p>
          What that means in practice:
        </p>
        <ul>
          <li>
            Every article is written by someone who has worked in the role,
            market, or function they&apos;re writing about.
          </li>
          <li>
            We do not accept paid coverage. Employers cannot pay to have
            their roles featured, nor can training programs pay to be
            recommended. Anything that ever becomes a paid relationship will
            be disclosed inline on the relevant page.
          </li>
          <li>
            When we reference a firm, rate, or dataset, we aim to be
            specific enough that a reader can verify it independently.
          </li>
        </ul>

        <h3>How we write and review</h3>
        <ol>
          <li>
            <strong>Draft.</strong> A contributor with direct experience in
            the relevant seat drafts the article.
          </li>
          <li>
            <strong>Fact-check.</strong> Numbers and named firms are checked
            against public sources or the contributor&apos;s direct
            experience.
          </li>
          <li>
            <strong>Review.</strong> A second editor reviews for accuracy,
            tone, and whether the piece actually helps a job-seeker make a
            decision.
          </li>
          <li>
            <strong>Update.</strong> When market conditions change
            meaningfully — Fed rate moves, sector rotations, comp bands
            shifting — we revise affected articles rather than leaving
            stale content at the top of search results.
          </li>
        </ol>

        <h3>Corrections and press</h3>
        <p>
          Factual errors, corrections, takedown requests, press inquiries,
          or partnership questions all go to the same address:{" "}
          <a
            className="font-semibold text-blue-700 hover:underline"
            href="mailto:hirecre@a26cos.com"
          >
            hirecre@a26cos.com
          </a>
          . We respond within a business day.
        </p>

        <h2>What we cover</h2>
        <p>
          HireCRE focuses on commercial real estate roles and proptech
          roles that serve CRE. Specific categories we index and write
          about:
        </p>
        <ul>
          <li>
            Capital markets, debt origination, investment sales, and
            mortgage banking.
          </li>
          <li>
            Acquisitions, asset management, and portfolio management at
            institutional sponsors (REPE), public REITs, and family
            offices.
          </li>
          <li>
            Credit and underwriting at banks, debt funds, mortgage REITs,
            and CMBS platforms.
          </li>
          <li>
            Development, construction, and entitlement work at sponsors
            and vertically-integrated developers.
          </li>
          <li>
            Property management, leasing, and operations at institutional
            owners and managers.
          </li>
          <li>
            Research, analytics, and proptech roles that directly serve
            CRE workflows (data platforms, lease management tools, CRE
            analytics).
          </li>
        </ul>
        <p>
          Residential real estate sales (single-family brokerage,
          residential mortgage) is out of scope — we do not index those
          roles.
        </p>

        <h2>Contact</h2>
        <p>
          General inquiries, corrections, employer requests:{" "}
          <a
            className="font-semibold text-blue-700 hover:underline"
            href="mailto:hirecre@a26cos.com"
          >
            hirecre@a26cos.com
          </a>
          .
        </p>
        <p>
          See also{" "}
          <Link href="/privacy">Privacy</Link>,{" "}
          <Link href="/terms">Terms</Link>, and the{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </main>
  );
}
