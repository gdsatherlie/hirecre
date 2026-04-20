import type { Metadata } from "next";
import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";

const SLUG = "negotiating-cre-compensation";

export const metadata: Metadata = {
  title: "Negotiating CRE Compensation: Base, Bonus, and Carry | HireCRE Blog",
  description:
    "CRE comp is a two- or three-component package depending on the seat. What each piece means, how to compare offers, and where the leverage is when negotiating.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Negotiating CRE Compensation: Base, Bonus, and Carry",
    description:
      "How the CRE comp stack works and where to negotiate for the most value.",
    url: `https://hirecre.com/blog/${SLUG}`,
    type: "article",
  },
};

export default function Post() {
  return (
    <BlogPostLayout slug={SLUG}>
      <p>
        CRE compensation is more structured than it looks. At the
        institutional seats — REPE, debt funds, REITs, investment banks —
        the package is base, bonus, and carry (or a carry-equivalent). At
        operating seats and brokerage, it&apos;s base and variable.
        Understanding which lever does what lets you negotiate the right
        components instead of just pushing on base.
      </p>
      <p>
        This post breaks down each piece, how to compare offers across
        them, and where the negotiation leverage actually is.
      </p>

      <h2>Base salary</h2>
      <p>
        Base is the monthly-cash component. It&apos;s what you plan your life
        around, and at junior levels it&apos;s where most of the
        year-on-year raises happen. Ranges vary enormously by geography and
        seat — an acquisitions associate at an NY REPE shop in 2026 is
        typically $110–140k base; the same role at a secondary-market
        sponsor is $85–110k. See our{" "}
        <Link href="/commercial-real-estate-salary-guide">
          CRE salary guide
        </Link>{" "}
        for more granular benchmarks by role.
      </p>
      <p>
        Negotiation leverage on base is real but narrow. Most sponsors have
        internal bands — if you come in at the 75th percentile of the band,
        you&apos;re probably at the ceiling of what the firm will approve
        for that title. Aggressive base push can generate title creep
        instead of comp — they move you from associate to senior associate
        rather than just raising your number.
      </p>

      <h2>Bonus</h2>
      <p>
        The annual bonus is discretionary in theory, formulaic in practice.
        Most institutional CRE seats have a target bonus expressed as a
        percentage of base. Typical ranges:
      </p>
      <ul>
        <li>Analyst: 25–50% of base target, paid at end of fiscal year.</li>
        <li>Associate: 50–100% of base target.</li>
        <li>Senior associate / VP: 75–150% of base target.</li>
        <li>Principal / MD: 150%+ with meaningful variance by fund performance.</li>
      </ul>
      <p>
        When you negotiate, get two things on paper: the target bonus
        percentage <em>and</em> the range. "Target 80%, paid 60–120% based on
        individual and firm performance" is a very different offer than
        "target 80%, paid 0–80%." Both are called the same thing in casual
        conversation but produce dramatically different total comp in
        different years.
      </p>
      <p>
        At the associate level, first-year bonus is often pro-rated for the
        months you worked. Clarify whether any signing bonus is offsetting
        that pro-ration, or whether you get both cleanly.
      </p>

      <h2>Carry (and carry-equivalents)</h2>
      <p>
        Carry — carried interest — is the sponsor&apos;s share of the fund
        profits above the LP&apos;s preferred return. At institutional REPE
        shops, mid-level pros (usually senior associate and VP) start to
        receive carry points in active funds. The carry is where CRE comp
        actually gets large; it&apos;s also where the variance is widest.
      </p>
      <p>
        Five things to pin down when you&apos;re offered carry:
      </p>
      <ul>
        <li>
          <strong>How many points.</strong> Typically 5–50 bps of the fund
          carry pool at the associate level; more at VP.
        </li>
        <li>
          <strong>Vesting schedule.</strong> 4-year vesting is common;
          cliffs vary. Know what happens if you leave in year 2 vs year 5.
        </li>
        <li>
          <strong>Fund vs deal carry.</strong> Fund-level carry smooths
          deal-by-deal variance. Deal-level carry is lumpier but means
          individual deals you sourced can generate outsized payout.
        </li>
        <li>
          <strong>Catchup structure.</strong> Does the sponsor get a full
          100% catchup above the pref, or 50/50? This affects when carry
          starts paying out on a deal.
        </li>
        <li>
          <strong>GP commit / personal contribution.</strong> Some shops
          require you to write a check alongside your carry points. This is
          actually a good sign for alignment but meaningful at junior
          salaries.
        </li>
      </ul>
      <p>
        Understanding{" "}
        <Link href="/interview-prep/equity-waterfall-basics">
          equity waterfalls
        </Link>{" "}
        and{" "}
        <Link href="/interview-prep/promote-structure">
          promote structures
        </Link>{" "}
        is essential before you sign — if you can&apos;t model what your
        carry points are actually worth under base / upside / downside, you
        can&apos;t evaluate the offer.
      </p>

      <h2>Brokerage variable comp</h2>
      <p>
        Investment sales and mortgage brokerage seats pay on a
        commission-split model. Typical first-year analyst structures are a
        small base ($40–70k) plus a percentage of the team&apos;s commission
        pool. Splits ramp up with tenure and book-of-business.
      </p>
      <p>
        The leverage in brokerage negotiation is almost never on base. It&apos;s
        on: the split percentage, the draw (how much base you can count on
        even in slow months), co-brokerage credits (who gets credit on
        joint-team deals), and the senior broker&apos;s willingness to
        introduce you to their client relationships. That last one is worth
        more than most candidates realize — it determines whether you build
        a real book or bounce out of the industry after three years.
      </p>

      <h2>Operational seats</h2>
      <p>
        Property management, leasing, development associate, and corporate
        functions at CRE firms are typically base + bonus without carry.
        The leverage here is different: title, reporting line, and
        project/deal allocation matter more than comp structure because
        those determine how fast you can grow into a higher-paying seat.
      </p>
      <p>
        A development associate allocated to three ground-up projects in
        their first two years will be a much stronger principal candidate
        in year four than one allocated to one repositioning. That
        allocation is a negotiable part of the offer — ask explicitly.
      </p>

      <h2>Comparing offers across structures</h2>
      <p>
        Don&apos;t compare offers on base alone. The framework that works:
      </p>
      <ol>
        <li>
          Compute expected annual cash comp: base + target bonus.
        </li>
        <li>
          Add a risk-adjusted carry estimate. At institutional REPE, a
          reasonable expected value for associate-level carry is $0–25k/year
          in the first 3 years, ramping to $50–200k+ at senior associate
          and VP if you stay through fund realizations. Discount heavily if
          vesting is back-loaded.
        </li>
        <li>
          Factor in optionality: which offer gets you closer to the next
          seat you want? A lower-paying REPE role with a clear path to
          principal is worth more than a higher-paying operational seat
          that dead-ends.
        </li>
        <li>
          Cost-of-living normalize. An NY offer at $140k base with NY taxes
          and rent is often less take-home than a Chicago offer at $115k.
        </li>
      </ol>

      <h2>Where the leverage actually is</h2>
      <p>
        Most candidates push on base and lose on structure. The move that
        compounds is: accept a fair base, push hard on bonus target,
        structure, and carry participation timing. Those components grow
        with you; base re-sets at every job change.
      </p>
      <p>
        And: get it in writing. Verbal assurances about bonus ranges and
        carry timing don&apos;t survive leadership changes, fund
        restructurings, or your own principal leaving the firm.
      </p>

      <p>
        Browse{" "}
        <Link href="/board">active CRE roles on HireCRE</Link> to see
        disclosed pay on comparable roles — 78% of our current active feed
        includes pay bands, which gives you clean anchors for any
        negotiation.
      </p>
    </BlogPostLayout>
  );
}
