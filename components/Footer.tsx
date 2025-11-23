import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-sm text-slate-400 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 lg:flex-row lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-100">HireCRE</p>
          <p className="mt-2 max-w-xl text-slate-400">
            A curated hub for commercial real estate careers, market intelligence,
            and employer brand storytelling.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <Link href="/jobs" className="hover:text-primary">
            Jobs
          </Link>
          <Link href="/resources" className="hover:text-primary">
            Resources
          </Link>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          <Link href="/dashboard/employer" className="hover:text-primary">
            Employer Dashboard
          </Link>
          <Link href="/dashboard/candidate" className="hover:text-primary">
            Candidate Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
