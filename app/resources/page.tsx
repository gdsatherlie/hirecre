import Link from "next/link";

export const metadata = {
  title: "Resources | HireCRE",
  description:
    "Commercial real estate books, technical tools, certifications, research, and career resources.",
};

type Resource = {
  title: string;
  description: string;
  href: string;
  affiliate?: boolean;
};

const INTERVIEW: Resource[] = [
  {
    title: "CRE Interview Prep Hub",
    description:
      "Role-based prep across debt, equity, acquisitions, asset management, development, leasing, and operations.",
    href: "/interview-prep",
  },
];

const BOOKS: Resource[] = [
  {
    title: "The Real Estate Game",
    description:
      "A behind-the-scenes look at how major real estate deals actually get done.",
    href: "https://www.amazon.com/dp/068485550X?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Real Estate Finance and Investments",
    description:
      "Foundational CRE finance: underwriting, valuation, capital structure.",
    href: "https://www.amazon.com/dp/B0D49YF7LK?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Commercial Real Estate Analysis & Investments",
    description:
      "Institutional-grade analysis of leases, pro formas, risk, and valuation.",
    href: "https://www.amazon.com/dp/0324305486?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Real Estate Market Analysis",
    description:
      "Market-level analysis and demand modeling for CRE professionals.",
    href: "https://www.amazon.com/dp/0874204283?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Best Ever Apartment Syndication Book",
    description: "Practical multifamily deal structuring and capital raising.",
    href: "https://www.amazon.com/dp/0997454326?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "Anatomy of Mortgage Loan Documents",
    description:
      "Understanding and negotiating key commercial loan documents.",
    href: "https://www.amazon.com/dp/1639051120?tag=hirecre-20",
    affiliate: true,
  },

  // Debt / Credit
  {
    title: "Commercial Mortgages 101",
    description:
      "Straightforward overview of commercial mortgages and how deals get financed.",
    href: "https://www.amazon.com/Commercial-Mortgages-101-Everything-Winning/dp/0814415075?tag=hirecre-20",
    affiliate: true,
  },
  {
    title: "The Handbook of Mortgage-Backed Securities",
    description: "Deep dive into MBS/CMBS structure, cashflows, and risk.",
    href: "https://www.amazon.com/Handbook-Mortgage-Backed-Securities-Frank-Fabozzi/dp/0071460748?tag=hirecre-20",
    affiliate: true,
  },

  // Investing / PE
  {
    title: "Real Estate Finance & Investments (Brueggeman/Fisher) – Print",
    description: "The classic. Strong interview foundation and reference book.",
    href: "https://www.amazon.com/dp/007365809X/?tag=hirecre-20",
    affiliate: true,
  },
];

const MODELING: Resource[] = [
  {
    title: "Adventures in CRE (A.CRE)",
    description: "Free institutional-quality Excel models and technical tutorials.",
    href: "https://www.adventuresincre.com/",
  },
  {
    title: "REFM Real Estate Modeling",
    description: "Professional real estate financial modeling training.",
    href: "https://www.refm.com/",
  },
  {
    title: "Break Into CRE",
    description: "Technical interview prep and modeling courses.",
    href: "https://breakintocre.com/",
  },
  {
    title: "Wall Street Prep – Real Estate Modeling",
    description: "Institutional real estate financial modeling certification.",
    href: "https://www.wallstreetprep.com/",
  },
  {
    title: "ARGUS Enterprise",
    description: "Industry-standard commercial real estate underwriting software.",
    href: "https://www.altusgroup.com/argus/",
  },
];

const CERTIFICATIONS: Resource[] = [
  {
    title: "CCIM Institute",
    description: "Commercial real estate investment designation.",
    href: "https://www.ccim.com/",
  },
  {
    title: "NAIOP Education",
    description: "Commercial real estate development & investment programs.",
    href: "https://www.naiop.org/",
  },
  {
    title: "Urban Land Institute (ULI)",
    description: "Global real estate development and land use organization.",
    href: "https://uli.org/",
  },
];

const RESEARCH: Resource[] = [
  {
    title: "NAREIT",
    description: "Public REIT data, performance metrics, and research.",
    href: "https://www.reit.com/",
  },
  {
    title: "CBRE Research",
    description: "Global commercial real estate research reports.",
    href: "https://www.cbre.com/insights",
  },
  {
    title: "JLL Research",
    description: "Commercial property market research and analysis.",
    href: "https://www.us.jll.com/en/trends-and-insights/research",
  },
  {
    title: "Trepp",
    description: "CMBS data, debt analytics, and credit performance.",
    href: "https://www.trepp.com/",
  },
];


const CAREER_ARTICLE_TOC = [
  ["Capital stack map", "capital-stack-map"],
  ["Deal cycle map", "deal-cycle-map"],
  ["Role selection framework", "role-selection-framework"],
  ["What to learn first", "what-to-learn-first"],
  ["How to interview", "how-to-interview"],
  ["FAQ", "faq"],
];

const INTERVIEW_ARTICLE_SECTIONS = [
  ["What interviewers are actually testing", "what-testing"],
  ["Market and thesis questions", "market-thesis"],
  ["Underwriting and structure questions", "underwriting-structure"],
  ["Execution and asset management questions", "execution-am"],
  ["Behavioral and communication questions", "behavioral"],
  ["FAQ", "faq"],
];

const SALARY_ARTICLE_TOC = [
  ["Compensation table", "comp-table"],
  ["What drives comp", "what-drives-comp"],
  ["How to use ranges in negotiation", "ranges-negotiation"],
  ["Negotiation checklist", "negotiation-checklist"],
  ["FAQ", "faq"],
];

const ACQUISITIONS_ARTICLE_TOC = [
  ["Day in the life", "day-in-the-life"],
  ["Underwriting expectations", "underwriting-expectations"],
  ["Common mistakes", "common-mistakes"],
  ["What to show in interviews", "what-to-show"],
  ["90-day development plan", "development-plan"],
  ["FAQ", "faq"],
];

type DetailedResource = {
  title: string;
  description: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string[];
};

const CAREER_GUIDES: DetailedResource[] = [
  {
    title: "Interview Prep Hub: Start Here for Role-Specific Prep",
    description:
      "Use this as your anchor page if you are deciding between acquisitions, debt originations, asset management, and development. It helps you map technical expectations by seat so you can stop studying random topics and focus on what your target teams actually test.",
    href: "/interview-prep",
  },
  {
    title: "Resources Library: Build a 6-Week CRE Learning Stack",
    description:
      "This page works best as your operating checklist for books, modeling resources, certifications, and market research feeds. It is useful for candidates who want one place to sequence study blocks and avoid duplicative material.",
    href: "/resources",
  },
  {
    title: "Interview Prep for Debt Originations Candidates",
    description:
      "Prioritize this path when targeting bridge, balance-sheet, or debt fund roles. Focus your prep on loan sizing, debt yield, DSCR, sponsor quality, and downside collateral analysis so your interview answers match lender decision criteria.",
    href: "/interview-prep",
  },
  {
    title: "Interview Prep for Acquisitions Analysts and Associates",
    description:
      "Use this guide track to sharpen entry and exit assumptions, sensitivity framing, and investment committee storytelling. It is designed for candidates who need to explain both numbers and investment judgment under time pressure.",
    href: "/interview-prep",
  },
  {
    title: "Interview Prep for Asset Management Career Switchers",
    description:
      "This route emphasizes business plan execution, variance-to-budget analysis, tenant retention strategy, and hold-sell decisions. It is particularly useful if you are moving from brokerage or lending into owner-operator roles.",
    href: "/interview-prep",
  },
  {
    title: "Interview Prep for Development Analysts",
    description:
      "Target this sequence if your interviews involve entitlement risk, construction draws, lease-up pacing, and contingency planning. It helps you frame development risk in lender and equity terms, not just project management terms.",
    href: "/interview-prep",
  },
  {
    title: "Resources for Building Better Debt and Equity Market Context",
    description:
      "Use this track when your technical skills are fine but your market commentary sounds shallow. It directs you toward recurring research habits so you can speak credibly about cap rates, spreads, refinancing risk, and liquidity conditions.",
    href: "/resources",
  },
  {
    title: "Resources for Modeling Practice and Timed Case Work",
    description:
      "This is for candidates preparing for one-hour or take-home modeling tests. Build a deliberate cadence across templates, assumptions, and QA so your outputs are clean, auditable, and easy to defend in review.",
    href: "/resources",
  },
  {
    title: "Resources for Certification Planning (CCIM, ULI, NAIOP)",
    description:
      "Use this if you are deciding whether to add credentials while working full time. It helps you pair education paths with your role goals so credentials support outcomes like better underwriting judgment or stronger market relationships.",
    href: "/resources",
  },
  {
    title: "Interview Prep for Credit and Underwriting Team Roles",
    description:
      "This version emphasizes covenant structure, borrower quality, tenancy risk, and scenario downside. It is best for professionals targeting credit seats where consistency, risk controls, and memo quality matter as much as speed.",
    href: "/interview-prep",
  },
  {
    title: "Resources for Weekly CRE Study Planning",
    description:
      "Use this page as your recurring weekly dashboard and not a one-time reading list. It is designed for candidates who want to combine market reading, technical drills, and interview rehearsal into one repeatable routine.",
    href: "/resources",
  },
  {
    title: "Interview Prep for Mixed Role Recruiting Cycles",
    description:
      "If you are interviewing across debt, acquisitions, and asset management simultaneously, this track helps you avoid fragmented prep. It shows how to keep one core underwriting story while tailoring details for each team mandate.",
    href: "/interview-prep",
  },
];

const NEWS_AND_READING: DetailedResource[] = [
  {
    title: "Federal Reserve FOMC and Economic Projections",
    description:
      "Use this for primary-source rate policy context when discussing cap rates, debt costs, and refinance windows. The statement language and SEP updates help you form macro scenarios instead of repeating headlines.",
    href: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
  },
  {
    title: "Bureau of Labor Statistics (BLS) Employment Data",
    description:
      "Track labor market strength to pressure-test office demand, multifamily absorption assumptions, and tenant credit trends. Monthly payroll and unemployment releases are useful for investment committee market commentary.",
    href: "https://www.bls.gov/",
  },
  {
    title: "Bureau of Economic Analysis (BEA)",
    description:
      "Review GDP and personal income trends to calibrate demand assumptions across property types. BEA tables help connect macro growth with local leasing momentum and retailer expansion appetite.",
    href: "https://www.bea.gov/",
  },
  {
    title: "Mortgage Bankers Association Research",
    description:
      "Useful for tracking commercial mortgage originations, refinancing pressure, and lending volume shifts. MBA survey output gives practical debt-market context for underwriting capital availability.",
    href: "https://www.mba.org/news-and-research/research-and-economics",
  },
  {
    title: "Trepp Insights",
    description:
      "Follow this for CMBS delinquency trends, special servicing movements, and structured debt signals. It is especially useful for debt originations and credit professionals building downside views by asset class.",
    href: "https://www.trepp.com/treppwire",
  },
  {
    title: "Fitch Ratings Structured Finance",
    description:
      "Read this for surveillance commentary on CMBS pools, maturities, and sector credit quality. It helps candidates explain why credit spreads and underwriting terms tighten or loosen over a cycle.",
    href: "https://www.fitchratings.com/research/structured-finance",
  },
  {
    title: "S&P Global Ratings Research",
    description:
      "Use S&P publications to understand real-time rating agency risk themes by property type and region. This is practical for interview discussions on refinancing cliffs and DSCR deterioration.",
    href: "https://www.spglobal.com/ratings/en/research-insights",
  },
  {
    title: "Moody's Research and Insights",
    description:
      "Helpful for integrating credit-cycle and default-risk perspectives into underwriting assumptions. The research library supports stronger narratives around tenant credit, rent resilience, and capital market liquidity.",
    href: "https://www.moodys.com/web/en/us/insights.html",
  },
  {
    title: "CBRE Research",
    description:
      "Use CBRE market reports to benchmark vacancy, net absorption, construction pipeline, and rent growth assumptions. This is one of the most practical sources for city-level underwriting inputs.",
    href: "https://www.cbre.com/insights",
  },
  {
    title: "JLL Research",
    description:
      "JLL reports are useful for comparing office, industrial, retail, and multifamily trends across major metros. Great for validating assumptions before a modeling test or investment memo draft.",
    href: "https://www.us.jll.com/en/trends-and-insights/research",
  },
  {
    title: "Cushman & Wakefield Insights",
    description:
      "Track this for leasing velocity, sublease dynamics, and occupier behavior across key markets. The data helps asset management candidates discuss operational strategy with market evidence.",
    href: "https://www.cushmanwakefield.com/en/insights",
  },
  {
    title: "Colliers Research",
    description:
      "Use Colliers dashboards to cross-check local vacancy and asking rent trends, especially in secondary markets. It is useful when triangulating broker opinions with quantitative market snapshots.",
    href: "https://www.colliers.com/en/research",
  },
  {
    title: "Marcus & Millichap Research Services",
    description:
      "Helpful for transaction-market framing, investor sentiment, and cap rate movement by sector. Their reports are practical for acquisition candidates preparing investment committee-style talking points.",
    href: "https://www.marcusmillichap.com/research",
  },
  {
    title: "NAIOP Research Foundation",
    description:
      "Use this for development pipeline context, industrial demand trends, and office market analytics. Strong source for professionals focused on ground-up and value-add development strategy.",
    href: "https://www.naiop.org/research-and-publications/",
  },
  {
    title: "Urban Land Institute Research",
    description:
      "ULI publications are useful for land-use trends, capital flows, and long-term city development themes. Great for connecting project-level decisions with broader planning and demographic shifts.",
    href: "https://uli.org/research/",
  },
  {
    title: "NAREIT REIT Data and Research",
    description:
      "Use this for listed real estate performance data, sector allocation trends, and valuation context. It helps candidates bridge private-market underwriting with public-market signals.",
    href: "https://www.reit.com/data-research",
  },
  {
    title: "National Multifamily Housing Council Research",
    description:
      "Track this for apartment market conditions, supply risk, and policy developments affecting multifamily operations. Useful for both acquisitions and asset management interview preparation.",
    href: "https://www.nmhc.org/research-insight/",
  },
  {
    title: "National Apartment Association Resources",
    description:
      "Useful operational reading for rent collections, resident retention, and property-level execution trends. Helps candidates translate underwriting assumptions into day-to-day portfolio realities.",
    href: "https://www.naahq.org/news-publications",
  },
  {
    title: "CoStar News",
    description:
      "Use CoStar for local market intel on leasing comps, pipeline updates, and major transaction announcements. This is particularly helpful for city-specific interview prep in brokerage and acquisitions.",
    href: "https://www.costar.com/news",
  },
  {
    title: "Commercial Observer",
    description:
      "Good for lender sentiment, debt fund activity, and transaction narrative around major markets. It can help debt candidates build awareness of active capital providers and current deal structures.",
    href: "https://commercialobserver.com/",
  },
  {
    title: "Bisnow",
    description:
      "Use this to monitor development starts, recapitalizations, and local market events in near real time. It is useful for identifying which sponsors and lenders are actively deploying capital.",
    href: "https://www.bisnow.com/",
  },
  {
    title: "Commercial Property Executive",
    description:
      "Helpful for tracking construction pipeline, portfolio transactions, and sector-specific operating trends. This supports underwriting assumptions around supply, demand, and asset positioning.",
    href: "https://www.commercialsearch.com/news/",
  },
  {
    title: "Propmodo",
    description:
      "Read Propmodo for proptech adoption trends, building operations innovation, and technology-enabled efficiency themes. Useful for candidates covering office repositioning or smart-building strategies.",
    href: "https://www.propmodo.com/",
  },
];

const JOB_SEARCH_TACTICAL: DetailedResource[] = [
  {
    title: "Build a Target Firm List by Strategy, Not Brand Name",
    description:
      "Create a spreadsheet of 40-60 firms and tag each by property type, check size, geography, and hold period. This prevents random applications and keeps your outreach aligned with the deals you want to underwrite.",
    href: "https://www.reit.com/data-research",
  },
  {
    title: "Map Capital Stack Focus Before You Apply",
    description:
      "For debt roles, classify firms by senior, mezz, bridge, construction, or preferred equity focus and note current deployment pace. You can pull clues from lender press releases, deal news, and portfolio disclosures.",
    href: "https://commercialobserver.com/",
  },
  {
    title: "Use ULI Member Directories and Event Rosters Strategically",
    description:
      "ULI events help you identify active developers, debt providers, and operating partners in your market. Build a post-event follow-up list within 24 hours and connect each contact to a specific deal theme.",
    href: "https://uli.org/",
  },
  {
    title: "Use NAIOP Chapters to Prioritize Development-Focused Employers",
    description:
      "Local NAIOP chapter content often signals who is actually building, leasing, and financing projects now. Use chapter programs to shortlist firms that match your target product type and market.",
    href: "https://www.naiop.org/",
  },
  {
    title: "Leverage CCIM Networks for Brokerage-to-Investment Transitions",
    description:
      "If you are moving from brokerage into principal-side roles, CCIM relationships can surface hidden analyst openings. Ask for introductions tied to live mandates, not generic career advice.",
    href: "https://www.ccim.com/",
  },
  {
    title: "Set a Weekly Pipeline: 10 Outreach Messages, 3 Calls, 2 Follow-Ups",
    description:
      "Run your search like a sales funnel with a minimum weekly activity target. Track message sent date, reply status, next step, and technical prep topic linked to each conversation.",
    href: "/resources",
  },
  {
    title: "Reverse-Engineer Job Descriptions into Skill Gaps",
    description:
      "Highlight every technical verb in the posting: underwrite, size debt, build waterfalls, review leases, or prepare IC memos. Then map each item to one concrete proof point from your experience or projects.",
    href: "/interview-prep",
  },
  {
    title: "Track Employer Deal Activity Before Interviews",
    description:
      "Review the last 6-12 months of transactions, financings, and dispositions so your questions sound informed. Candidates who reference live portfolio moves generally stand out versus generic fit responses.",
    href: "https://www.costar.com/news",
  },
  {
    title: "Prepare a Market Thesis by Submarket, Not Just by Property Type",
    description:
      "Interviewers value candidates who can discuss why one submarket outperforms another under different rate scenarios. Pull rent growth, vacancy, and supply data to support your view with evidence.",
    href: "https://www.cbre.com/insights",
  },
  {
    title: "Use Broker Research Hubs to Validate Assumptions Quickly",
    description:
      "Keep a short list of broker research pages and compare assumptions across at least two sources before finalizing your viewpoint. This reduces overreliance on one data provider and improves underwriting credibility.",
    href: "https://www.us.jll.com/en/trends-and-insights/research",
  },
  {
    title: "Create Role-Specific Deal Sheets",
    description:
      "Build separate deal sheets for debt, acquisitions, and asset management interviews so you can emphasize the right metrics. For debt, highlight basis, debt yield, and covenants; for equity, highlight IRR drivers and business plan execution.",
    href: "/interview-prep",
  },
  {
    title: "Use Informational Calls to Test Team Operating Style",
    description:
      "Ask how decisions are made, who owns underwriting assumptions, and how junior staff interact with IC processes. This helps you avoid joining teams where training and feedback are too limited for your growth stage.",
    href: "/interview-prep",
  },
  {
    title: "Audit Your Modeling Speed with Timed Rebuilds",
    description:
      "Run timed sessions rebuilding a simple acquisition model from a blank sheet and log your bottlenecks. Recruiters often infer readiness from how quickly and cleanly you can move from assumptions to defensible outputs.",
    href: "/resources",
  },
  {
    title: "Maintain a Recruiting CRM with Decision Dates",
    description:
      "Track each application stage, expected hiring timeline, interview panel composition, and required take-home exercises. A CRM approach keeps opportunities from stalling and improves follow-up precision.",
    href: "/resources",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "How should I choose between debt and equity roles early in my CRE career?",
    answer: [
      "Debt roles are usually best if you enjoy downside analysis, structure discipline, and repeatable credit frameworks. Equity roles often fit people who like business plan upside, leasing strategy, and operational variability across assets.",
      "A practical test is to compare which case studies energize you more: loan sizing and covenant protection or value creation through capex, rent growth, and exit timing. If possible, run one informational call in each path and ask what a strong first-year analyst actually does every week.",
      "You can still move later, but your first seat shapes the language you become fluent in. Pick the path whose daily decisions you can explain clearly and confidently right now.",
    ],
  },
  {
    question: "What is debt yield and why do interviewers care about it?",
    answer: [
      "Debt yield is net operating income divided by the loan amount, and it gives lenders a leverage-adjusted return metric before debt service assumptions. It is useful because it does not depend on interest rate or amortization structure like DSCR does.",
      "Interviewers ask about debt yield to test whether you understand collateral risk and loan sizing discipline. In volatile rate environments, it is a quick way to compare the risk profile of different loans with fewer moving parts.",
      "When discussing a deal, explain debt yield alongside DSCR and LTV rather than as a standalone metric. That shows you understand how credit committees triangulate risk.",
    ],
  },
  {
    question: "What underwriting fundamentals should I master before applying?",
    answer: [
      "At minimum, be able to build and audit NOI from rent roll and expense assumptions, not just plug values into a template. You should also understand cap rate valuation, discounted cash flow basics, and debt sizing constraints.",
      "Beyond mechanics, know how to stress test vacancy, rent growth, and exit cap assumptions with clear rationale. Hiring teams care about whether you can defend assumptions under pressure, not only whether the model balances.",
      "Practice summarizing your underwriting conclusion in three sentences: key upside, key risk, and mitigation plan. That communication skill is often the separator in interviews.",
    ],
  },
  {
    question: "When should I start learning ARGUS if I want acquisitions or asset management roles?",
    answer: [
      "Start once you are comfortable with Excel-based underwriting logic so ARGUS becomes an accelerator instead of a black box. Most candidates benefit from beginning 8-12 weeks before active interviewing.",
      "Focus first on lease-level cash flow logic, market leasing assumptions, and recovery structures. Recruiters do not expect every junior hire to be an ARGUS expert, but they do value familiarity with workflow and outputs.",
      "If your target market is office or retail heavy, ARGUS readiness is often more important. For multifamily-heavy roles, Excel depth may carry more weight, but ARGUS awareness still helps.",
    ],
  },
  {
    question: "How do I prepare for a CRE modeling test efficiently?",
    answer: [
      "Use timed practice blocks that simulate real interview constraints: one clean workbook, limited assumptions, and a short memo summary. This trains both technical speed and decision clarity.",
      "Build a standard quality-control checklist covering units, signs, circular references, and exit sensitivity integrity. Many candidates fail because they skip QA, not because they lack modeling knowledge.",
      "After each practice test, write down exactly where time was lost and fix that bottleneck in your next session. Iterative improvement beats long but unfocused study sessions.",
    ],
  },
  {
    question: "What do recruiters in CRE usually screen for first?",
    answer: [
      "Recruiters typically screen for deal relevance, technical baseline, and communication polish before anything else. They want evidence you can contribute quickly with manageable ramp time.",
      "Your resume should make transaction context clear: product type, role, capital structure, and your specific contribution. Vague bullet points make it hard for recruiters to position you with hiring managers.",
      "They also look for consistency between your target role and your story. If your narrative jumps across unrelated functions without explanation, expect more skepticism.",
    ],
  },
  {
    question: "What are strong questions to ask during informational calls?",
    answer: [
      "Ask about recent deals, decision-making cadence, and what differentiates high-performing junior staff on that team. These questions generate actionable insight rather than generic advice.",
      "You should also ask how teams source assumptions, handle downside cases, and structure feedback loops for analysts. That helps you evaluate training quality and culture.",
      "End by asking for one practical step you should take in the next 30 days. This often leads to better follow-up and stronger referrals.",
    ],
  },
  {
    question: "How can I interpret a CRE job post without over-reading buzzwords?",
    answer: [
      "Translate each requirement into expected weekly tasks and required output quality. For example, 'support acquisitions' may really mean first-pass underwriting, market comp gathering, and memo drafting under tight timelines.",
      "Look for clues on decision exposure: mentions of investment committee materials, lender presentations, or portfolio reporting usually indicate broader responsibility. Also note whether software requirements are mandatory or preferred.",
      "If the posting is vague, use networking calls to clarify what analysts actually own. Role reality can differ materially from the description.",
    ],
  },
  {
    question: "How should I structure a weekly study plan while working full time?",
    answer: [
      "A practical structure is three technical sessions and two market-reading sessions per week. Keep sessions short and specific so consistency is realistic after work hours.",
      "For example, do 45 minutes of underwriting drills on Tuesday and Thursday, 30 minutes of market research on Monday and Wednesday, and a 60-minute interview rehearsal on Saturday. Track completion with a simple checklist so progress is measurable.",
      "The goal is repeatability, not intensity spikes. Most candidates improve faster with disciplined weekly volume than with occasional marathon study days.",
    ],
  },
  {
    question: "What is the best way to discuss deals if my direct transaction experience is limited?",
    answer: [
      "Use one real project and explain it through the lens of risk, return, and execution decisions. Even if your role was limited, you can still demonstrate structured thinking and ownership of specific workstreams.",
      "Supplement with a self-built underwriting case tied to a real market. That shows initiative and lets you discuss assumptions in detail with confidence.",
      "Be transparent about scope while emphasizing what you learned and how you improved your process. Credible humility is better than overstating involvement.",
    ],
  },
  {
    question: "How important is market specialization versus being a generalist early on?",
    answer: [
      "Early specialization can accelerate depth if you know your target lane, such as multifamily debt or industrial acquisitions. Generalist exposure can be valuable if you are still deciding where your strengths align.",
      "A balanced approach is to build one clear specialty while maintaining working fluency across adjacent sectors. That preserves flexibility without diluting your positioning.",
      "In interviews, clarity matters more than claiming to cover everything. Explain why your chosen focus matches market opportunity and your skill set.",
    ],
  },
  {
    question: "How do I evaluate whether a firm is actually deploying capital right now?",
    answer: [
      "Look for recent acquisitions, financings, joint ventures, and lender mandate announcements over the last two quarters. Public deal flow is one of the best indicators of near-term hiring durability.",
      "Cross-check transaction news with firm-level commentary and any available fundraise or portfolio updates. A polished website does not guarantee active deployment.",
      "During interviews, ask what constraints currently kill deals on their desk. The answer reveals how active and selective the platform really is.",
    ],
  },
  {
    question: "What should I do if I keep reaching final rounds but do not get offers?",
    answer: [
      "Run a post-mortem after each process and isolate whether the gap is technical depth, deal communication, or role fit narrative. Generic self-critique is less useful than pinpointing one failure mode.",
      "Ask trusted contacts for direct feedback on your case presentation and interview pacing. Small adjustments in structure and clarity often drive better outcomes than studying new topics.",
      "Then redesign your prep sprint around that specific gap for two weeks before the next interview cycle. Targeted iteration usually outperforms broad review.",
    ],
  },
  {
    question: "How can I use HireCRE effectively instead of browsing passively?",
    answer: [
      "Start with the interview prep content for your target role, then use the resources page to build a weekly training stack. Treat each page as an action list with defined outputs, not just reading material.",
      "Pair internal study with external market sources so your technical answers reflect current conditions. For example, combine modeling drills with current rent, vacancy, and lending trend updates.",
      "Revisit your plan every Sunday and adjust next week's focus based on upcoming interviews. This turns content into a repeatable execution system.",
    ],
  },
  {
    question: "What is a realistic timeline to become interview-ready for CRE analyst roles?",
    answer: [
      "Most candidates can become meaningfully interview-ready in 8-12 weeks with consistent weekly execution. The timeline depends on your starting familiarity with accounting, Excel, and market terminology.",
      "A practical benchmark is comfort explaining one full underwriting case, discussing current market drivers, and handling role-specific technical questions without scripts. If those three areas are weak, extend your timeline rather than rushing applications.",
      "Quality of preparation matters more than calendar speed. Hiring teams quickly identify candidates who rushed technical foundations.",
    ],
  },
];

function ResourceGridSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: DetailedResource[];
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isInternal =
            item.href.startsWith("/") || item.href.startsWith("#");

          return (
            <a
              key={item.title}
              href={item.href}
              target={isInternal ? undefined : "_blank"}
              rel={isInternal ? undefined : "noopener noreferrer"}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="font-semibold text-slate-900">{item.title}</div>
              <div className="mt-2 text-sm text-slate-600">{item.description}</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Section({ title, items }: { title: string; items: Resource[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isInternal =
            item.href.startsWith("/") || item.href.startsWith("#");

          return (
            <a
              key={item.title}
              href={item.href}
              target={isInternal ? undefined : "_blank"}
              rel={
                isInternal
                  ? undefined
                  : item.affiliate
                  ? "noopener noreferrer nofollow"
                  : "noopener noreferrer"
              }
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="font-semibold text-slate-900">{item.title}</div>
              <div className="mt-2 text-sm text-slate-600">
                {item.description}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Commercial Real Estate Resources
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Books, modeling tools, certifications, research, and career
          preparation resources for commercial real estate professionals.
        </p>
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Table of Contents</h2>
          <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <li>
              <a className="hover:text-slate-900 hover:underline" href="#how-to-use">
                How to Use These Resources (Fast Track)
              </a>
            </li>
            <li>
              <a className="hover:text-slate-900 hover:underline" href="#career-guides">
                Commercial Real Estate Career Guides
              </a>
            </li>
            <li>
              <a
                className="hover:text-slate-900 hover:underline"
                href="#newsletters-podcasts"
              >
                CRE Newsletters, Podcasts, and Industry Reading
              </a>
            </li>
            <li>
              <a
                className="hover:text-slate-900 hover:underline"
                href="#job-search-tactical"
              >
                Job Search in CRE (Tactical)
              </a>
            </li>
            <li>
              <a className="hover:text-slate-900 hover:underline" href="#faq">
                Commercial Real Estate Career FAQ
              </a>
            </li>
          </ul>
        </section>
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Guides</h2>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700">
            <li><a className="hover:text-slate-900 hover:underline" href="#career-guide">Commercial Real Estate Career Guide</a></li>
            <li><a className="hover:text-slate-900 hover:underline" href="#interview-questions">CRE Interview Questions</a></li>
            <li><a className="hover:text-slate-900 hover:underline" href="#salary-guide">Commercial Real Estate Salary Guide</a></li>
            <li><a className="hover:text-slate-900 hover:underline" href="#acquisitions-analyst">Acquisitions Analyst (Real Estate)</a></li>
          </ul>
        </section>
      </header>

      <Section title="📝 Interview & Career Prep" items={INTERVIEW} />
      <Section title="📚 Books (Foundational + Debt + Investing)" items={BOOKS} />
      <Section title="🧮 Modeling & Technical Training" items={MODELING} />
      <Section title="🎓 Certifications & Education" items={CERTIFICATIONS} />
      <Section title="📊 Research & Market Data" items={RESEARCH} />

      <section id="how-to-use" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold text-slate-900">
          How to Use These Resources (Fast Track)
        </h2>
        <ul className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
          <li>
            If you are targeting debt originations, spend 45 minutes reviewing current lending and delinquency data, then 30 minutes rehearsing loan sizing logic (LTV, DSCR, debt yield) with one sample deal before work.
          </li>
          <li>
            If you are moving into credit underwriting, run a 60-minute downside-case session twice weekly where you stress NOI, exit cap, and refinance proceeds, then write a five-bullet credit conclusion.
          </li>
          <li>
            For acquisitions paths, do a 45-minute underwriting sprint and a 30-minute investment memo summary in the same sitting so you practice both analysis and decision communication.
          </li>
          <li>
            For asset management interviews, spend 30 minutes on market rent and vacancy updates, then 45 minutes on variance-to-budget analysis and business plan adjustments for one owned or hypothetical asset.
          </li>
          <li>
            For development roles, split your block into 40 minutes on construction and lease-up assumptions plus 35 minutes on contingency, draw schedule, and stabilization risk framing.
          </li>
          <li>
            Use Monday through Thursday for role-specific technical prep, then use Friday for a cross-functional review so you can still interview across debt, equity, and operations roles if needed.
          </li>
          <li>
            Build one reusable market dashboard for your target city with rent growth, vacancy, supply pipeline, and recent financing trends; refresh it weekly and use it in informational calls.
          </li>
          <li>
            Before any interview, run a 20-minute firm audit: recent deals, capital partners, product focus, and geographic concentration. Tailor your examples to the firm's actual strategy.
          </li>
          <li>
            Keep a model QA checklist and run it every session: sign convention, units, circular references, debt-service integrity, and exit sensitivity sanity checks.
          </li>
          <li>
            Rotate between internal HireCRE interview guides and external market data so your technical answers stay current with real conditions rather than textbook assumptions.
          </li>
          <li>
            Use a weekly cadence of two timed drills, two market reading sessions, and one mock interview; this structure is sustainable for full-time professionals and compounds faster than ad hoc cramming.
          </li>
          <li>
            Maintain a running question bank of terms and concepts you miss in prep sessions, then clear five items each weekend to close knowledge gaps systematically.
          </li>
        </ul>
      </section>

      <ResourceGridSection
        id="career-guides"
        title="Commercial Real Estate Career Guides"
        items={CAREER_GUIDES}
      />

      <ResourceGridSection
        id="newsletters-podcasts"
        title="CRE Newsletters, Podcasts, and Industry Reading"
        items={NEWS_AND_READING}
      />

      <ResourceGridSection
        id="job-search-tactical"
        title="Job Search in CRE (Tactical)"
        items={JOB_SEARCH_TACTICAL}
      />

      <section id="faq" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold text-slate-900">
          Commercial Real Estate Career FAQ
        </h2>
        <div className="mt-5 grid gap-5">
          {FAQS.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>


      <section id="career-guide" className="mt-16 scroll-mt-24">
<div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Career Guide</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            The clearest way to choose a CRE career: start with the capital stack and the deal cycle.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            Most people pick a title first and ask questions later. That is backwards. In commercial real
            estate, your long-term fit is mostly defined by two things: where you sit in the capital stack
            and which part of the deal cycle you spend your week in.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>CRE roles make more sense when you map them to risk position, not job titles.</li>
            <li>Senior debt, mezz, preferred equity, and common equity each attract different temperaments.</li>
            <li>Origination, underwriting, execution, and asset management are distinct daily workflows.</li>
            <li>A role can sound exciting but still be a mismatch if your preferred cadence is different.</li>
            <li>Early-career comp upside follows judgment, not spreadsheet speed alone.</li>
            <li>Interview preparation should demonstrate how you process uncertainty and make decisions.</li>
          </ul>
        </section>

        <nav className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">In this guide</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {CAREER_ARTICLE_TOC.map(([label, id]) => (
              <li key={id}>
                <a className="text-blue-700 hover:text-blue-800 hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-10 space-y-10 leading-7">
          <section id="capital-stack-map" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) Capital stack map: your risk seat defines your mindset</h2>
            <p>
              A fast way to reduce career confusion is to ask, “What happens to me when a deal goes wrong?”
              If the answer is “I get paid first,” you are likely debt-oriented. If the answer is “I only
              win after everyone else is covered,” you are likely in common equity.
            </p>
            <p>
              This is not just a legal distinction. It shapes every conversation you have, every model you
              build, and every blind spot you must manage. Debt professionals obsess over downside coverage.
              Equity professionals spend more time on upside creation and business-plan conviction.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Lower risk seats</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Senior lender underwriting: DSCR, debt yield, collateral quality.</li>
                  <li>Bank credit roles: policy discipline, downside scenarios, covenants.</li>
                  <li>Agency lending execution: process rigor and documentation precision.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Higher risk seats</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Acquisitions equity: entry basis, value-creation plan, exit optionality.</li>
                  <li>Development: entitlement, construction, lease-up, capital markets timing.</li>
                  <li>Opportunistic funds: thesis quality under uncertainty and volatility.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="deal-cycle-map" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) Deal cycle map: workflow preference beats prestige</h2>
            <p>
              A second filter is cadence. Some people love sourcing and relationship building. Others want
              structured analysis. Others enjoy post-close execution where real operators create value.
              All are valid, but they require different energy and communication styles.
            </p>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Checklist: where do you do your best work?</h3>
              <ul className="mt-3 space-y-2">
                <li>□ I like ambiguity and outbound hustle → sourcing / originations.</li>
                <li>□ I like controlled analysis and memos → underwriting / acquisitions.</li>
                <li>□ I like execution and accountability → asset management.</li>
                <li>□ I like long cycles and coordination → development management.</li>
              </ul>
            </div>
            <p>
              Candidates often misread the glamour of deals. The real question is not whether a platform is
              “top tier,” but whether your weekly tasks align with your temperament. Sustained excellence is
              usually boredom-resistant consistency in the right workflow.
            </p>
          </section>

          <section id="role-selection-framework" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) Role selection framework: match risk appetite to daily operating rhythm</h2>
            <p>
              Use a simple scorecard before recruiting. Rate yourself from 1 to 5 on risk tolerance, desire
              for client interaction, patience for process, and preference for long versus short feedback
              loops. Then compare that profile with actual role demands, not role descriptions.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Debt underwriting seat:</strong> best for structured thinkers who enjoy precision,
                policy discipline, and downside-first argumentation.
              </li>
              <li>
                <strong>Acquisitions seat:</strong> best for people who can combine analytical rigor with
                conviction under imperfect information.
              </li>
              <li>
                <strong>Asset management seat:</strong> best for pragmatic operators who like post-close
                accountability and cross-functional coordination.
              </li>
              <li>
                <strong>Development seat:</strong> best for builders who tolerate long timelines, high
                uncertainty, and multi-stakeholder complexity.
              </li>
            </ul>
            <p>
              This framework also clarifies exits. A debt analyst can move to credit funds or structured
              finance. An acquisitions analyst can move to principal investing or portfolio strategy. The key
              is understanding which judgment muscles you are actually building.
            </p>
          </section>

          <section id="what-to-learn-first" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) What to learn first: sequence matters more than volume</h2>
            <p>
              Early-career candidates over-collect technical topics. A better strategy is to learn in an
              order that compounds: property cash flow mechanics first, financing constraints second,
              investment committee logic third.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Foundation stack</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>NOI bridge, rent roll, T-12, and capex framing.</li>
                  <li>Debt sizing: DSCR, debt yield, LTV, amortization impacts.</li>
                  <li>Core returns: cash-on-cash, IRR, equity multiple.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Decision stack</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>What can break this deal first?</li>
                  <li>Which assumptions are fragile versus defensible?</li>
                  <li>What is the no-regret action if uncertainty persists?</li>
                </ul>
              </div>
            </div>
            <p>
              If you can articulate this sequence clearly, employers infer coachability. They trust that you
              will not only learn faster but also prioritize what matters under deadlines.
            </p>
          </section>

          <section id="how-to-interview" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5) How to interview: present yourself as a decision maker in training</h2>
            <p>
              Interviews in CRE reward candidates who translate raw numbers into a clear recommendation.
              Don’t just answer formulas. Explain why a metric changes your level of comfort and what action
              you would take next.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Mini interview script</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-6">
                <li>State the deal objective in one sentence.</li>
                <li>Identify the two assumptions that drive most of the return.</li>
                <li>Describe one downside scenario and one mitigation.</li>
                <li>Make a recommendation and define what could change your view.</li>
              </ol>
            </div>
            <p>
              That structure works across lending, acquisitions, and development. It signals that you can
              communicate with senior people who care about speed, clarity, and calibrated judgment.
            </p>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["Is acquisitions always the best starting role?", "No. It is excellent for broad investing exposure, but debt or asset management can build stronger downside and operating judgment early on."],
                ["Can I move from banking to equity later?", "Yes. Many candidates move after proving they can underwrite risk and communicate an investment view, not just process transactions."],
                ["Do I need Argus before interviewing?", "Helpful but not mandatory for every seat. Understand cash flow logic first, then layer software skills."],
                ["What matters more: market knowledge or modeling speed?", "Judgment. Modeling is a tool; hiring teams look for candidates who know what assumptions deserve skepticism."],
                ["Is brokerage experience useful for principal-side roles?", "Very. Sourcing reps and market pulse can be a major edge if paired with disciplined underwriting."],
                ["How do I stand out without direct CRE experience?", "Use a deal memo format in interviews and show how you reason through risk, structure, and execution tradeoffs."],
                ["Should I optimize for title or platform quality?", "Platform quality and manager quality usually matter more in the first five years than title optimization."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-lg border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900">{q}</h3>
                  <p className="mt-1 text-sm leading-6">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Continue on HireCRE</h2>
          <p className="mt-2 leading-7">
            Keep building your edge with practical resources, interview drills, and open roles.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/resources">
              Explore Resources
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/interview-prep">
              Practice Interview Prep
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/jobs">
              Browse Jobs
            </Link>
          </div>
        </section>
      </div>
      </section>


      <section id="interview-questions" className="mt-16 scroll-mt-24">
<div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Interview Prep</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Most candidates fail CRE interviews because they quote numbers but miss the decision.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            Strong interview prep should look like a short investment memo. Your answer should define the
            opportunity, identify key risks, pressure-test assumptions, and end with a recommendation.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>Interviewers evaluate judgment quality, not memorization of formulas.</li>
            <li>Every technical answer should end with “so what” and a decision implication.</li>
            <li>Frame responses with thesis, evidence, risk, and recommendation.</li>
            <li>Good candidates connect debt terms to equity outcomes and vice versa.</li>
            <li>Behavioral questions test communication under pressure as much as culture fit.</li>
            <li>Short, structured answers outperform long unstructured monologues.</li>
          </ul>
        </section>

        <nav className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Question map</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {INTERVIEW_ARTICLE_SECTIONS.map(([label, id]) => (
              <li key={id}>
                <a className="text-blue-700 hover:text-blue-800 hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-10 space-y-10 leading-7">
          <section id="what-testing" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) What interviewers are actually testing</h2>
            <p>
              Most hiring teams are asking one hidden question: “Can this candidate make better decisions
              after seeing imperfect information?” That is why candidates who memorize terms still struggle.
              They answer definitions but do not show prioritization, skepticism, or recommendation quality.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Use this answer structure every time</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-6">
                <li>State the objective and the decision in one sentence.</li>
                <li>Name the 2–3 variables that matter most.</li>
                <li>Explain downside, mitigation, and what could change your view.</li>
                <li>Close with a clear recommendation and confidence level.</li>
              </ol>
            </div>
          </section>

          <section id="market-thesis" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) Market and thesis questions</h2>
            <p>
              These questions test whether you can form an investment point of view instead of repeating
              headlines. Good answers connect local supply-demand dynamics to asset-level strategy.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Common prompts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Which property type looks most mispriced today, and why?</li>
                  <li>How would higher-for-longer rates change cap-rate expectations?</li>
                  <li>What market would you avoid despite strong recent rent growth?</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">A good answer demonstrates</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Ability to separate cyclical noise from structural shifts.</li>
                  <li>A habit of triangulating data, not relying on one narrative.</li>
                  <li>Comfort making decisions with incomplete information.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="underwriting-structure" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) Underwriting and structure questions</h2>
            <p>
              This category exposes the biggest gap in candidates: they know metrics but cannot explain how
              those metrics alter the investment decision. Interviewers care less about perfect recall and
              more about your ability to diagnose fragility.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>“Walk me through your underwriting process.”</strong> Strong candidates prioritize
                rent assumptions, expense normalization, capex, debt constraints, then exit sensitivity.
              </li>
              <li>
                <strong>“What matters more, DSCR or debt yield?”</strong> Strong candidates explain context,
                lender perspective, and why debt yield can anchor downside in uncertain NOI periods.
              </li>
              <li>
                <strong>“How do you set exit cap rates?”</strong> Strong candidates tie terminal assumptions
                to durability of NOI, capital markets liquidity, and refinancing probability.
              </li>
              <li>
                <strong>“Would you pay up for lower capex risk?”</strong> Strong candidates quantify risk
                transfer value and compare it to basis spread and hold-period objectives.
              </li>
            </ul>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Checklist before giving a technical answer</h3>
              <ul className="mt-3 space-y-1">
                <li>□ I defined the decision, not just the metric.</li>
                <li>□ I identified what assumption is most fragile.</li>
                <li>□ I gave one downside scenario and one mitigation.</li>
              </ul>
            </div>
          </section>

          <section id="execution-am" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) Execution and asset management questions</h2>
            <p>
              Many candidates forget that closing is the beginning, not the finish line. Execution questions
              test whether you can manage process risk, while asset management questions test if you can drive
              outcomes when assumptions break.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Execution prompts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>What would kill a deal during diligence?</li>
                  <li>How do you prioritize third-party reports under timeline pressure?</li>
                  <li>How would you handle appraisal or lender retrade risk?</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Asset management prompts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>What KPI would you track weekly post-close?</li>
                  <li>How do you respond if rent growth stalls two quarters in a row?</li>
                  <li>When do you hold, refinance, or sell ahead of plan?</li>
                </ul>
              </div>
            </div>
            <p>
              A good answer demonstrates operational realism. You should show that you understand teams,
              timelines, and accountability mechanics, not just spreadsheet outcomes.
            </p>
          </section>

          <section id="behavioral" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5) Behavioral and communication questions</h2>
            <p>
              Behavioral rounds are often where final decisions are made. Firms want analysts who can handle
              disagreement, communicate bad news early, and remain precise when stakes rise.
            </p>
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">What a strong behavioral answer demonstrates</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Ownership language: “I noticed, I flagged, I proposed, I followed through.”</li>
                <li>Evidence of prioritization when deadlines conflict.</li>
                <li>Ability to disagree without drama and escalate with context.</li>
                <li>Reflection: what changed in your process after the experience.</li>
              </ul>
            </div>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["How many questions should I practice deeply?", "Start with 30 to 40 high-frequency prompts and master structured, concise responses before adding edge cases."],
                ["Should I memorize full scripts?", "Memorize structure, not scripts. Scripted answers sound brittle under follow-up pressure."],
                ["How technical should I get in first rounds?", "Technical enough to show judgment. Keep detail proportional to interviewer seniority and role scope."],
                ["What if I do not know the exact formula?", "State the concept, give directional logic, and explain the decision impact. Then acknowledge what you would verify."],
                ["How do I prepare for case studies?", "Practice memo-style synthesis: thesis, key assumptions, sensitivity, risk controls, recommendation."],
                ["How long should answers be?", "Target 45 to 90 seconds for most questions unless asked to go deeper."],
                ["What closes an interview well?", "Ask role-specific questions about decision process, IC cadence, and what success looks like in the first 90 days."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-lg border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900">{q}</h3>
                  <p className="mt-1 text-sm leading-6">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Continue on HireCRE</h2>
          <p className="mt-2 leading-7">Keep sharpening your process with focused tools and live opportunities.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/resources">
              Explore Resources
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/interview-prep">
              Practice Interview Prep
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/jobs">
              Browse Jobs
            </Link>
          </div>
        </section>
      </div>
      </section>


      <section id="salary-guide" className="mt-16 scroll-mt-24">
<div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Salary Guide</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            CRE compensation is a function of seat, risk, and platform.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            Salary discussions feel opaque because candidates compare titles, not economics. A better approach
            is to map compensation to risk position, revenue model, and platform maturity.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>Total comp matters more than base, especially as responsibility scales.</li>
            <li>Higher-risk seats often have wider bonus dispersion, not guaranteed upside.</li>
            <li>Platform type changes payout timing: banks are steadier, principal shops are more variable.</li>
            <li>Market location and asset class specialization can materially shift ranges.</li>
            <li>Comp is negotiated best when tied to role scope and measurable output.</li>
            <li>Use salary ranges to anchor expectations, then customize for your context.</li>
          </ul>
        </section>

        <nav className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">In this guide</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {SALARY_ARTICLE_TOC.map(([label, id]) => (
              <li key={id}>
                <a className="text-blue-700 hover:text-blue-800 hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-10 space-y-10 leading-7">
          <section id="comp-table" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) Compensation table: role-level ranges for informed negotiation</h2>
            <p>
              These ranges are directional and reflect common U.S. market outcomes for major metros. Actual
              compensation varies by deal flow, manager quality, fund performance, and whether carry or
              coinvest opportunities are present.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Base Salary</th>
                    <th className="px-4 py-3">Bonus Range</th>
                    <th className="px-4 py-3">Typical Total Comp</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Analyst (Debt / Banking)", "$80k–$120k", "20%–60%", "$96k–$190k"],
                    ["Analyst (Acquisitions)", "$90k–$130k", "30%–100%", "$117k–$260k"],
                    ["Associate (Debt / Credit)", "$120k–$170k", "30%–90%", "$156k–$323k"],
                    ["Associate (Acquisitions)", "$130k–$190k", "40%–130%", "$182k–$437k"],
                    ["Asset Manager", "$110k–$180k", "25%–100%", "$138k–$360k"],
                    ["Development Manager", "$120k–$200k", "25%–125%", "$150k–$450k"],
                    ["VP / Director", "$180k–$300k", "50%–200%+", "$270k–$900k+"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-slate-200">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Notice how bonus bands widen as judgment risk rises. That is the central pattern in CRE comp:
              the more your decisions influence returns, the more variable your pay becomes.
            </p>
          </section>

          <section id="what-drives-comp" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) What drives comp: seat, risk, and platform economics</h2>
            <p>
              Two analysts with the same title can earn very different pay if their firms monetize risk
              differently. Compensation should be interpreted as a reflection of platform economics,
              organizational leverage, and role criticality.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Seat and risk</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Debt roles typically have steadier pay and narrower variance.</li>
                  <li>Equity roles usually have wider bonus outcomes tied to performance.</li>
                  <li>Development adds execution risk and longer payout cycles.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Platform factors</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Institutional platforms may pay less cash early but offer brand leverage.</li>
                  <li>Lean entrepreneurial shops may offer more scope and faster upside.</li>
                  <li>Carry eligibility timing changes long-term earnings dramatically.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="ranges-negotiation" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) How to use ranges intelligently in negotiation</h2>
            <p>
              Salary ranges are not scripts; they are context. The strongest negotiation posture ties your
              request to role scope, expected output, and business impact during the first year.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Anchor to the market band, then justify where you belong in the band using evidence from your
                track record and relevant deal exposure.
              </li>
              <li>
                Separate fixed and variable comp in the discussion so tradeoffs are explicit.
              </li>
              <li>
                Ask clarifying questions about bonus mechanics: discretion, formula inputs, and payout timing.
              </li>
              <li>
                If base is fixed, negotiate alternative value: sign-on, review timing, title scope, or carry path.
              </li>
            </ul>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Avoid this common mistake</h3>
              <p className="mt-2 text-sm leading-6">
                Candidates often negotiate as if every firm shares the same bonus philosophy. It does not.
                Always ask how performance is measured and who controls payout decisions.
              </p>
            </div>
          </section>

          <section id="negotiation-checklist" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) Negotiation checklist for CRE candidates</h2>
            <div className="rounded-xl border border-slate-200 p-5">
              <ul className="space-y-2">
                <li>□ I defined my target base, acceptable floor, and walk-away point.</li>
                <li>□ I can explain my compensation ask using role scope and expected impact.</li>
                <li>□ I asked how bonus is calculated and how often top-end payouts happen.</li>
                <li>□ I clarified promotion timeline and what outcomes trigger advancement.</li>
                <li>□ I asked about carry eligibility, vesting schedule, and dilution considerations.</li>
                <li>□ I confirmed in-office expectations, travel load, and resource support.</li>
              </ul>
            </div>
            <p>
              This checklist keeps the conversation professional and data-driven. It protects you from
              optimizing for headline cash while missing structural details that shape long-term earnings.
            </p>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["Is a higher base always better?", "Not always. A lower base with predictable upside, better mentorship, and stronger platform trajectory can dominate over time."],
                ["How should I compare two offers?", "Normalize expected total comp, risk of payout, learning scope, and promotion velocity over a 2–3 year horizon."],
                ["Do smaller shops always pay less?", "No. Some pay more for high-leverage talent, but variability and role breadth are typically higher."],
                ["When should I bring up compensation?", "After role scope is clear and mutual fit is established, usually after first-round technical validation."],
                ["How do I ask about carry without sounding premature?", "Ask as part of long-term pathing: timeline, eligibility criteria, and role expectations."],
                ["What if the firm says bonus is discretionary?", "Request historical ranges by level and examples of what drove strong versus weak payouts."],
                ["Can I renegotiate after accepting?", "Only in unusual circumstances. It is better to resolve key terms before signing."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-lg border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900">{q}</h3>
                  <p className="mt-1 text-sm leading-6">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Continue on HireCRE</h2>
          <p className="mt-2 leading-7">Explore practical guides, interview drills, and current openings.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/resources">
              Explore Resources
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/interview-prep">
              Practice Interview Prep
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/jobs">
              Browse Jobs
            </Link>
          </div>
        </section>
      </div>
      </section>


      <section id="acquisitions-analyst" className="mt-16 scroll-mt-24">
<div className="mx-auto max-w-3xl text-slate-700">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Role Guide</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Acquisitions analysts win by combining underwriting discipline with investment storytelling.
          </h1>
          <p className="text-lg leading-7 text-slate-600">
            The job is not “just modeling.” Your real job is translating messy market reality into an
            investable narrative that a committee can act on with confidence.
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Key Takeaways</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
            <li>Acquisitions performance depends on judgment quality, not template quality alone.</li>
            <li>The analyst role blends process execution, market synthesis, and recommendation clarity.</li>
            <li>Strong underwriting identifies fragile assumptions before committee does.</li>
            <li>Your value rises when you communicate risk in decision-ready language.</li>
            <li>Interview success comes from showing how you think, not reciting metrics.</li>
            <li>Early habits in memo writing and sensitivity design compound quickly.</li>
          </ul>
        </section>

        <nav className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">In this guide</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {ACQUISITIONS_ARTICLE_TOC.map(([label, id]) => (
              <li key={id}>
                <a className="text-blue-700 hover:text-blue-800 hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-10 space-y-10 leading-7">
          <section id="day-in-the-life" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1) Day in the life: underwriting is central, but not isolated</h2>
            <p>
              A typical day rotates between inbound opportunities, live diligence, portfolio context, and
              internal communication. The key is switching from detail mode to decision mode without losing
              accuracy or narrative coherence.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Morning priorities</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Triage broker packages and reject obvious misfits quickly.</li>
                  <li>Update key assumptions for active deals from latest diligence inputs.</li>
                  <li>Prepare talking points for team check-ins and investment committee prep.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Afternoon priorities</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Run sensitivities and test fragility in rent, capex, and exit assumptions.</li>
                  <li>Coordinate with debt teams, third parties, and internal legal workflows.</li>
                  <li>Translate analysis into concise recommendation language for seniors.</li>
                </ul>
              </div>
            </div>
            <p>
              The practical lesson: execution speed matters, but only if paired with contextual thinking.
              Senior teams notice analysts who can prioritize under time pressure and still preserve decision
              quality.
            </p>
          </section>

          <section id="underwriting-expectations" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2) Underwriting expectations: precision, skepticism, and synthesis</h2>
            <p>
              Firms expect analysts to produce clean, auditable work. But “clean” is only table stakes.
              Real differentiation comes from identifying assumption risk early and communicating why it
              matters to both downside protection and upside potential.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Build transparent cash-flow logic with clear bridges from in-place performance to stabilized
                expectations.
              </li>
              <li>
                Underwrite debt capacity with conservative buffers and understand refinance constraints.
              </li>
              <li>
                Design sensitivities around real decision variables, not cosmetic parameter changes.
              </li>
              <li>
                Align your recommendation with hold-period strategy, not just headline IRR.
              </li>
            </ul>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-slate-900">Checklist: what seniors expect to hear</h3>
              <ul className="mt-3 space-y-1">
                <li>□ What assumption can break first?</li>
                <li>□ What is our mitigation if that happens?</li>
                <li>□ What must be true for this deal to outperform?</li>
                <li>□ Is this a basis edge, execution edge, or structure edge?</li>
              </ul>
            </div>
          </section>

          <section id="common-mistakes" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3) Common mistakes that cap analyst growth</h2>
            <p>
              Most early mistakes are not technical. They are communication and prioritization failures that
              create avoidable confusion for decision makers.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Frequent mistakes</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Overfitting models to match target returns.</li>
                  <li>Hiding uncertainty instead of labeling it directly.</li>
                  <li>Presenting outputs without decision context.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">Higher-value habits</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  <li>Flag assumptions you distrust before being asked.</li>
                  <li>Use one-page summaries that highlight tradeoffs.</li>
                  <li>Track post-close outcomes to refine future underwriting.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="what-to-show" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">4) What to show in interviews: prove you can underwrite and persuade</h2>
            <p>
              Hiring managers are testing whether you can be trusted in live deal environments. The winning
              signal is not maximum complexity; it is clarity under uncertainty.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Interview evidence stack</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-6">
                <li>Walk through one deal with thesis, assumptions, and decision logic.</li>
                <li>Explain one assumption you changed and why.</li>
                <li>Show one downside scenario and mitigation playbook.</li>
                <li>Summarize your final recommendation in three sentences.</li>
              </ol>
            </div>
            <p>
              If you can do this consistently, you signal readiness for real responsibility. Teams can train
              software shortcuts quickly; they cannot quickly train judgment and communication discipline.
            </p>
          </section>

          <section id="development-plan" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">5) 90-day development plan for new acquisitions analysts</h2>
            <p>
              Your first 90 days should prioritize reliability, speed with accuracy, and improved investment
              communication. Think in three phases: absorb, execute, and synthesize.
            </p>
            <div className="rounded-xl border border-slate-200 p-5">
              <ul className="space-y-2">
                <li>□ Days 1–30: Learn templates, process maps, and internal decision standards.</li>
                <li>□ Days 31–60: Own defined underwriting modules and run first-pass sensitivities.</li>
                <li>□ Days 61–90: Draft memo sections and present recommendation-ready summaries.</li>
                <li>□ Weekly: Track one lesson from deals that passed and one from deals declined.</li>
              </ul>
            </div>
            <p>
              This progression helps you become useful quickly while building the deeper pattern recognition
              that differentiates top analysts over time.
            </p>
          </section>

          <section id="faq" className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
            <div className="space-y-3">
              {[
                ["Do I need perfect technical skills before starting?", "No. You need strong fundamentals and a habit of validating assumptions. Precision improves rapidly on the job."],
                ["How much of the role is modeling versus communication?", "Both matter. Modeling creates clarity; communication turns clarity into decisions."],
                ["What is the fastest way to improve underwriting quality?", "Review past deals against realized outcomes and identify where assumptions drifted from reality."],
                ["Should I specialize by asset class early?", "Build broad pattern recognition first, then specialize when you understand where you have true edge."],
                ["How do I handle conflicting feedback from seniors?", "Clarify decision objective, summarize tradeoffs, and document the agreed path forward."],
                ["What makes an analyst promotion-ready?", "Consistent accuracy, proactive risk flagging, and the ability to communicate recommendations clearly."],
                ["How can I stand out in a competitive interview process?", "Bring a concise deal walkthrough that shows your reasoning, not just your output."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-lg border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900">{q}</h3>
                  <p className="mt-1 text-sm leading-6">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Continue on HireCRE</h2>
          <p className="mt-2 leading-7">Explore deeper resources, focused interview prep, and active opportunities.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/resources">
              Explore Resources
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/interview-prep">
              Practice Interview Prep
            </Link>
            <Link className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/jobs">
              Browse Jobs
            </Link>
          </div>
        </section>
      </div>
      </section>


      <div className="mt-12 text-xs text-slate-500">
        Disclosure: Some links on this page are affiliate links. HireCRE may earn
        a commission at no additional cost to you. As an Amazon Associate, HireCRE
        earns from qualifying purchases.
      </div>
    </main>
  );
}
