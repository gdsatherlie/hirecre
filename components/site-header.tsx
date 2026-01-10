"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "rounded-lg px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-white hover:text-slate-900",
      ].join(" ")}
    >
      {label}
    </Link>
  );
};

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
          <NavLink href="/board" label="Jobs" />
          <NavLink href="/about" label="About" />
          <NavLink href="/contact" label="Contact" />
          <NavLink href="/login" label="Login" />
        </nav>
      </div>
    </header>
  );
}

