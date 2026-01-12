import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-baseline gap-3">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            HireCRE
          </Link>
          <span className="hidden text-sm text-slate-500 sm:inline">
            Commercial real estate jobs in one clean feed.
          </span>
        </div>

        <nav className="flex items-center gap-1">
          <Link
            href="/board"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900"
          >
            Jobs
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
