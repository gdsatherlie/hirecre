import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export function Header() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-slate-950 font-black shadow-lg">
            HC
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight">HireCRE</p>
            <p className="text-xs text-slate-400">CRE careers & insights</p>
          </div>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
