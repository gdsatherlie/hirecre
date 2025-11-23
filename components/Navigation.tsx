import Link from "next/link";

const links = [
  { href: "/jobs", label: "Jobs" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard/employer", label: "Employer" },
  { href: "/dashboard/candidate", label: "Candidate" }
];

export function Navigation() {
  return (
    <nav className="flex items-center gap-4 text-sm font-semibold text-slate-100">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full px-4 py-2 transition hover:bg-slate-800/60 hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/jobs"
        className="button-primary hidden sm:inline-flex shadow-lg shadow-primary/30"
      >
        View Jobs
      </Link>
    </nav>
  );
}
