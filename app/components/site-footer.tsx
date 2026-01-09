import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold text-slate-900">HireCRE</div>
            <p className="mt-2 text-sm text-slate-600">
              A clean feed of commercial real estate roles aggregated from public job boards (starting with Greenhouse).
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Pages</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-slate-700 hover:text-slate-900" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-slate-900" href="/board">
                  Jobs
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-slate-900" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-slate-700 hover:text-slate-900" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Contact</div>
            <p className="mt-3 text-sm text-slate-700">
              Email:{" "}
              <a className="underline hover:text-slate-900" href="mailto:hirecre@a26cos.com">
                hirecre@a26cos.com
              </a>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              © {new Date().getFullYear()} HireCRE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
