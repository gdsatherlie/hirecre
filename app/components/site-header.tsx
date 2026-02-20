"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/board", label: "Jobs" },
  { href: "/alerts", label: "Alerts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
  { href: "/resources", label: "Resources" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-slate-900"
        >
          HireCRE
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-3 py-1.5 font-medium transition",
                  "border border-transparent",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
