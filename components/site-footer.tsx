import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2">
        {/* LEFT: Brand + contact */}
        <div>
          <div className="text-base font-extrabold tracking-tight">HireCRE</div>
          <p className="mt-2 text-sm text-slate-600">
            A clean feed of commercial real estate roles aggregated from public job
            boards (starting with Greenhouse).
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
          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} HireCRE
          </p>
        </div>

        {/* RIGHT: Pages */}
        <div className="sm:text-right">
          <div className="text-sm font-semibold text-slate-900">Pages</div>
          <ul className="mt-3 space-y-2 text-sm sm:ml-auto sm:inline-block">
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/board">
                Jobs
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
