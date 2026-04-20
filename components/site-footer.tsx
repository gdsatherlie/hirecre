import Link from "next/link";

type FooterLink = { href: string; label: string };

const PRODUCT_LINKS: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/board", label: "Jobs" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/blog", label: "Blog" },
  { href: "/tools/salary-calculator", label: "Salary Calculator" },
  { href: "/alerts", label: "Job Alerts" },
  { href: "/resources", label: "Resources" },
];

const GUIDE_LINKS: FooterLink[] = [
  { href: "/commercial-real-estate-career-guide", label: "CRE Career Guide" },
  { href: "/commercial-real-estate-salary-guide", label: "CRE Salary Guide" },
  { href: "/cre-interview-questions", label: "CRE Interview Questions" },
  { href: "/acquisitions-analyst-real-estate", label: "Acquisitions Analyst Guide" },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            className="text-slate-600 hover:text-slate-900 hover:underline"
            href={l.href}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-base font-extrabold tracking-tight">HireCRE</div>
            <p className="mt-2 text-sm text-slate-600">
              A curated commercial real estate job board, plus interview prep and
              underwriting resources for CRE professionals.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Contact:{" "}
              <a
                className="font-medium text-slate-900 hover:underline"
                href="mailto:hirecre@a26cos.com"
              >
                hirecre@a26cos.com
              </a>
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="text-sm font-semibold text-slate-900">Product</div>
            <LinkList links={PRODUCT_LINKS} />
          </div>

          {/* Guides */}
          <div>
            <div className="text-sm font-semibold text-slate-900">CRE Guides</div>
            <LinkList links={GUIDE_LINKS} />
          </div>

          {/* Company */}
          <div>
            <div className="text-sm font-semibold text-slate-900">Company</div>
            <LinkList links={LEGAL_LINKS} />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} HireCRE. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
