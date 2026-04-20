// Original editorial content for state-level CRE market landing pages.
// Written to give each /jobs/in/[state] page substantive, unique copy
// beyond just the auto-generated job list — improves user value and
// addresses AdSense "low value content" concerns for states where
// HireCRE has meaningful inventory.
//
// States without a curated entry fall back to the shared generic
// intro; adding a state here promotes it to full editorial treatment.

export type StateMarket = {
  /** Short descriptor used in <h1> and meta fallbacks. */
  tagline: string;
  /** 1–2 paragraphs of market overview. */
  overview: string[];
  /** Major metros worth calling out for job-seekers. */
  keyMetros: string[];
  /**
   * Representative employer segments — sales/brokerage, institutional
   * investors, debt funds, REITs, etc. Free-form labels.
   */
  employerSegments: string[];
  /** One paragraph about compensation context in this state. */
  compensationNote: string;
  /** Two to four roles that tend to be over-represented here. */
  commonRoles: string[];
};

export const STATE_MARKET_CONTENT: Record<string, StateMarket> = {
  CA: {
    tagline: "the largest CRE market in the Western US",
    overview: [
      "California is the deepest commercial real estate market on the West Coast, anchored by Los Angeles, the San Francisco Bay Area, San Diego, and Orange County. The state blends institutional ownership of trophy office and multifamily assets with an unusually large base of venture-backed proptech and life-science real estate.",
      "Hiring in California leans toward acquisitions and asset management at institutional sponsors, investment sales and capital markets at the major brokerages, and credit underwriting at banks with active CRE books. The proptech ecosystem adds non-traditional CRE roles in product, data, and operations.",
    ],
    keyMetros: [
      "Los Angeles",
      "San Francisco / Bay Area",
      "San Diego",
      "Orange County",
      "Sacramento",
    ],
    employerSegments: [
      "Investment sales and brokerage",
      "Institutional investment managers",
      "Private credit and debt funds",
      "Life sciences and lab REITs",
      "Proptech and CRE data platforms",
    ],
    compensationNote:
      "Compensation in the Bay Area and coastal Southern California skews higher than the national CRE median, particularly for acquisitions and asset management roles with carried-interest or bonus upside. Back-office and property management roles track closer to national medians.",
    commonRoles: [
      "Acquisitions associate",
      "Asset manager",
      "Investment sales analyst",
      "Credit analyst (bank CRE)",
    ],
  },

  NY: {
    tagline: "the deepest institutional CRE market in the country",
    overview: [
      "New York is the center of institutional commercial real estate in the US: the largest concentration of private equity real estate, mortgage REITs, debt funds, public REITs, and investment banks with active CRE coverage. Manhattan office remains the defining asset class, but New York capital deploys across every property type nationally.",
      "Job seekers in New York see the highest volume of capital markets, credit, and investment management roles in the country. The city is also a hub for CRE research, rating agency coverage, and proptech funding.",
    ],
    keyMetros: ["Manhattan", "Brooklyn", "Long Island", "Westchester"],
    employerSegments: [
      "Private equity real estate and REPE",
      "Debt funds and mortgage REITs",
      "Public REITs and asset managers",
      "Investment banks and rating agencies",
      "Institutional brokerage and capital markets",
    ],
    compensationNote:
      "New York CRE compensation is the national benchmark. Associate and VP roles at REPE shops, debt funds, and investment banks carry meaningful bonus and carried-interest components; total compensation can exceed $250k at the mid-level for institutional seats.",
    commonRoles: [
      "REPE associate",
      "Debt fund analyst",
      "Credit / underwriting analyst",
      "Investment sales associate",
    ],
  },

  TX: {
    tagline: "the most active Sunbelt CRE market",
    overview: [
      "Texas has been one of the fastest-growing CRE markets in the US, driven by population migration, industrial build-out, and favorable tax treatment for sponsors and investors. Dallas–Fort Worth, Houston, and Austin are the three primary hubs, each with distinct specialties: DFW for industrial and corporate headquarters, Houston for energy-linked office and healthcare, Austin for tech-driven office and multifamily.",
      "Hiring in Texas leans heavily into investment sales, mortgage brokerage, and development. Many national sponsors have expanded or relocated Texas offices to be closer to deal flow.",
    ],
    keyMetros: [
      "Dallas–Fort Worth",
      "Houston",
      "Austin",
      "San Antonio",
    ],
    employerSegments: [
      "Investment sales and brokerage",
      "Mortgage banking",
      "Private development sponsors",
      "Industrial and multifamily sponsors",
    ],
    compensationNote:
      "Texas CRE compensation is below NY/Bay Area but cost of living differences often leave take-home in line or ahead. Brokerage and mortgage banking roles have higher variable compensation; institutional seats are fewer than in NY.",
    commonRoles: [
      "Investment sales associate",
      "Mortgage originations analyst",
      "Development analyst",
      "Acquisitions analyst",
    ],
  },

  WA: {
    tagline: "a Pacific Northwest CRE market driven by tech and industrial",
    overview: [
      "Washington's CRE market is concentrated in the Seattle metro (Seattle, Bellevue, Redmond) with tech-tenant office as the defining asset class and a fast-growing industrial sector serving Amazon, Microsoft, and the broader logistics network. The Puget Sound industrial base and the Portland–Seattle–Vancouver BC corridor drive demand for warehouse and flex product.",
      "Hiring is weighted toward middle-market lending, investment sales, and institutional multifamily — with some of the most competitive bank CRE teams in the country headquartered in the region.",
    ],
    keyMetros: ["Seattle", "Bellevue", "Tacoma", "Spokane"],
    employerSegments: [
      "Regional and community banks",
      "Investment sales and brokerage",
      "Industrial developers",
      "Institutional multifamily sponsors",
    ],
    compensationNote:
      "Seattle metro compensation for CRE roles is between NY and secondary markets — strong for bank credit and CRE debt roles, moderate for institutional acquisitions seats.",
    commonRoles: [
      "Commercial banker / CRE relationship manager",
      "Credit analyst",
      "Multifamily acquisitions analyst",
      "Industrial development associate",
    ],
  },

  IL: {
    tagline: "the Midwest's institutional CRE hub",
    overview: [
      "Illinois — effectively the Chicago metro — is the largest institutional CRE market in the Midwest. Chicago is home to several major public REITs, institutional investment managers, and the country's largest student-housing and alternative-real-estate platforms, plus substantial mortgage banking and CMBS coverage.",
      "Job flow in Illinois is heaviest in institutional asset management, alternative real estate (student housing, medical office, data centers), and CMBS / CRE CLO credit.",
    ],
    keyMetros: ["Chicago", "Naperville / West Suburbs"],
    employerSegments: [
      "Institutional investment managers",
      "Alternative real estate sponsors",
      "Public REITs",
      "Mortgage banking and CMBS",
    ],
    compensationNote:
      "Chicago CRE compensation is strong at the institutional and alternative-asset sponsors, and competitive on a cost-of-living basis versus the coasts. Capital markets roles can match NY comp at the senior level.",
    commonRoles: [
      "Asset manager",
      "Acquisitions associate",
      "CMBS credit analyst",
      "Alternative-sector investment associate",
    ],
  },

  FL: {
    tagline: "a high-growth Southeast CRE market",
    overview: [
      "Florida's CRE market has expanded rapidly with net population migration, driving multifamily development, hospitality investment, and Sunbelt industrial. Miami has become a secondary institutional hub, with several alternative-asset managers and family offices relocating their CRE teams; Tampa, Orlando, and Jacksonville add strong middle-market activity.",
      "Hiring concentrates in investment sales, multifamily sponsorship, and hospitality. Institutional seats are growing but still fewer than NY, Chicago, or the Bay Area.",
    ],
    keyMetros: ["Miami", "Tampa", "Orlando", "Jacksonville", "Fort Lauderdale"],
    employerSegments: [
      "Multifamily sponsors",
      "Hospitality investors",
      "Investment sales and brokerage",
      "Family offices and boutique sponsors",
    ],
    compensationNote:
      "Florida CRE comp is moderate; brokerage and investment sales roles have high variable upside. No state income tax is a real-dollar factor versus NY/CA comparisons.",
    commonRoles: [
      "Investment sales associate",
      "Multifamily acquisitions analyst",
      "Hospitality asset manager",
      "Development associate",
    ],
  },

  AZ: {
    tagline: "a fast-growing Southwest CRE market",
    overview: [
      "Arizona — driven by Phoenix and Scottsdale — has been one of the top Sunbelt growth stories, benefiting from population migration, industrial build-out, and a deep single-family and multifamily development pipeline. Several institutional sponsors have opened or expanded Phoenix offices; the market is particularly active in multifamily and industrial.",
      "Hiring concentrates in investment sales, multifamily sponsorship, and middle-market development.",
    ],
    keyMetros: ["Phoenix", "Scottsdale", "Tempe", "Tucson"],
    employerSegments: [
      "Multifamily and industrial sponsors",
      "Investment sales and brokerage",
      "Private development firms",
    ],
    compensationNote:
      "Phoenix CRE comp is in line with secondary Sunbelt markets. Brokerage has high variable upside; institutional seats are fewer than in the top-tier markets.",
    commonRoles: [
      "Multifamily acquisitions associate",
      "Investment sales analyst",
      "Development associate",
    ],
  },

  GA: {
    tagline: "the Southeast's primary CRE hub",
    overview: [
      "Georgia's CRE market is anchored by Atlanta, the largest metro in the Southeast and one of the top industrial markets in the US. The region blends national logistics investment, institutional multifamily, and a growing creative-office segment, with Delta Airlines and numerous Fortune 500 corporate tenants driving demand.",
      "Hiring leans toward industrial investment, multifamily, and institutional asset management. Atlanta also has a meaningful CRE analytics and proptech presence.",
    ],
    keyMetros: ["Atlanta", "Savannah", "Augusta"],
    employerSegments: [
      "Industrial sponsors and developers",
      "Multifamily institutional investors",
      "Investment sales and brokerage",
      "Proptech and CRE data platforms",
    ],
    compensationNote:
      "Atlanta CRE comp is competitive on a cost-of-living basis — strong for industrial and multifamily acquisitions, moderate for back-office and PM seats.",
    commonRoles: [
      "Industrial acquisitions associate",
      "Multifamily asset manager",
      "Investment sales analyst",
      "Development associate",
    ],
  },
};

export function getStateMarket(abbrev: string): StateMarket | undefined {
  return STATE_MARKET_CONTENT[abbrev.toUpperCase()];
}
