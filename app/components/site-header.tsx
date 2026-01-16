"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          HireCRE
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/board">
            Jobs
          </Link>

          <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/alerts">
            Alerts
          </Link>

          <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/about">
            About
          </Link>

          <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/contact">
            Contact
          </Link>

          <Link className="text-slate-600 hover:text-slate-900 hover:underline" href="/login">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
