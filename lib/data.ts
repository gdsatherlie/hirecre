import type { BlogPost, Job, Resource } from "@/lib/types";

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Asset Manager",
    company: "NorthBridge Partners",
    location: "New York, NY",
    type: "Full-time",
    salary: "$170k - $210k + bonus",
    postedAt: "2 days ago",
    summary:
      "Oversee a national industrial portfolio with value-add business plans and joint-venture partners.",
    responsibilities: [
      "Lead quarterly asset reviews and refresh hold/sell analysis",
      "Coordinate leasing, capex, and lender reporting across 8M sq. ft.",
      "Partner with acquisitions on underwriting assumptions and exit scenarios"
    ],
    requirements: [
      "8+ years in industrial or logistics asset management",
      "Advanced Excel/Argus skills with JV waterfall exposure",
      "Comfort presenting to investment committee and LPs"
    ],
    tags: ["Industrial", "Value-add", "Portfolio"],
    contactEmail: "talent@northbridge.com"
  },
  {
    id: "2",
    title: "Development Associate",
    company: "Harbor Street Capital",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $135k + bonus",
    postedAt: "4 days ago",
    summary:
      "Support mixed-use developments from entitlements through delivery with a lean deal team.",
    responsibilities: [
      "Build and maintain predevelopment budgets and schedules",
      "Coordinate consultants, municipalities, and community stakeholders",
      "Create investment committee memos and lender packages"
    ],
    requirements: [
      "3-5 years in ground-up development or capital markets",
      "Ability to read site plans and manage permitting workflows",
      "Clear, concise writing and stakeholder communication"
    ],
    tags: ["Mixed-use", "Development", "Sunbelt"],
    contactEmail: "careers@harborstreet.co"
  },
  {
    id: "3",
    title: "Capital Markets Analyst",
    company: "Atlas Realty Advisors",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85k - $100k + bonus",
    postedAt: "1 week ago",
    summary:
      "Model equity and debt scenarios for office-to-residential conversions across the Midwest.",
    responsibilities: [
      "Maintain DCFs and sensitivity dashboards for live deals",
      "Prepare offering memoranda and investor pitch materials",
      "Track lender term sheets and map capital stack options"
    ],
    requirements: [
      "2+ years in CRE finance or brokerage",
      "Strong modeling and data visualization skills",
      "Understanding of adaptive reuse and construction draw processes"
    ],
    tags: ["Capital markets", "Adaptive reuse", "Finance"],
    contactEmail: "analyst@atlasadvisors.com"
  }
];

export const resources: Resource[] = [
  {
    id: "market-pulse",
    title: "Q2 Sunbelt Industrial Market Pulse",
    description:
      "Absorption trends, rent growth, and cap rate movement across major Sunbelt distribution hubs.",
    category: "Report",
    link: "https://hirecre.com/resources/market-pulse",
    author: "Research Lab",
    updatedAt: "May 2024",
    highlights: [
      "Heat maps for lease-up velocity in Dallas, Atlanta, Phoenix",
      "Construction pipeline risk scoring and lender sentiment",
      "Takeaways for merchant builders and long-term holders"
    ]
  },
  {
    id: "leasing-playbook",
    title: "Leasing Ops Playbook for Value-Add Office",
    description:
      "Step-by-step outreach cadences, broker incentives, and amenity stacks to reposition older assets.",
    category: "Guide",
    link: "https://hirecre.com/resources/leasing-playbook",
    author: "Platform Team",
    updatedAt: "April 2024",
    highlights: [
      "Tenant experience checklist for hybrid work patterns",
      "Sample marketing calendar and budget",
      "Broker scorecard templates to track touring activity"
    ]
  },
  {
    id: "waterfall-template",
    title: "JV Waterfall Template for Industrial Developments",
    description:
      "Fully linked equity waterfall with promote hurdles, catch-up mechanics, and IRR lookbacks.",
    category: "Template",
    link: "https://hirecre.com/resources/waterfall-template",
    author: "Capital Markets Desk",
    updatedAt: "March 2024",
    highlights: [
      "LP/GP cash flow dashboard with scenario toggles",
      "Construction draw schedule with equity/loan sources",
      "Sensitivity tables for exit cap, rent growth, and LTC"
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "brokerage-to-operator",
    title: "From Brokerage to Operator: Building Repeatable CRE Skills",
    description:
      "Tactics for translating transaction speed into long-term portfolio discipline across asset classes.",
    author: "Priya Rao",
    publishedAt: "May 8, 2024",
    readingTime: "6 min",
    tags: ["Careers", "Operations", "Leadership"],
    content: [
      "The best operators pair deal urgency with a systems mindset. Start with weekly cadences that force clarity around pipeline, capital, and on-the-ground execution.",
      "Treat every leasing and construction update as a small post-mortem. Capture what changed, who owned it, and what you would do differently next time.",
      "Finally, over-communicate with partners. Write the memo you want your LPs to forward — concise, visual, and anchored to outcomes."
    ]
  },
  {
    slug: "capital-stack-playbook",
    title: "Capital Stack Playbook for Transitional Assets",
    description:
      "Structuring bridge, mezz, and pref to unlock business plans in volatile rate environments.",
    author: "Marcus Nguyen",
    publishedAt: "April 22, 2024",
    readingTime: "5 min",
    tags: ["Capital Markets", "Strategy"],
    content: [
      "Transitional assets demand optionality. Lock in flexibility on extension mechanics and carve-outs while protecting downside with tighter covenants.",
      "Model DSCR breakpoints by month, not year. It surfaces how construction draws and leasing ramps change risk for lenders and investors.",
      "Bring your operating partners into the capital conversations early. Their intel on timing, specs, and tenant objections can tighten spreads."
    ]
  },
  {
    slug: "field-notes-flex",
    title: "Field Notes: Flex Conversion Wins",
    description:
      "What our teams learned repositioning legacy flex into modern lab and creative space in tier-two markets.",
    author: "Research Lab",
    publishedAt: "April 4, 2024",
    readingTime: "4 min",
    tags: ["Adaptive Reuse", "Case Study"],
    content: [
      "Look for assets with generous bay depths and clear heights that can adapt to different user types.",
      "Layer in amenity pods instead of full gut renovations to control budget and speed to lease.",
      "Activate local brokerage early with spec suites and transparent TI allowances to drive tours."
    ]
  }
];
