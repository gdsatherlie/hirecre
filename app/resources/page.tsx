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

      <div className="mt-12 text-xs text-slate-500">
        Disclosure: Some links on this page are affiliate links. HireCRE may earn
        a commission at no additional cost to you. As an Amazon Associate, HireCRE
        earns from qualifying purchases.
      </div>
    </main>
  );
}
