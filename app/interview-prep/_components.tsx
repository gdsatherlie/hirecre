import Link from "next/link";

export function PageShell({
  title,
  description,
  crumb,
  children,
}: {
  title: string;
  description?: string;
  crumb?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header>
        {crumb ? (
          <div className="mb-3 text-xs text-slate-500">
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>{" "}
            <span className="mx-2">/</span>
            <span className="text-slate-600">{title}</span>
          </div>
        ) : null}

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 max-w-2xl text-base text-slate-600">{description}</p>
        ) : null}
      </header>

      {children}
    </main>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export function Grid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

// ✅ Exact Resources card style
export function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="font-semibold text-slate-900">{title}</div>
      {description ? (
        <div className="mt-2 text-sm text-slate-600">{description}</div>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

// ✅ Exact Resources "hover card" style for link cards
export function LinkCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{description}</div>
    </a>
  );
}

export function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{children}</div>
    </div>
  );
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

export function MiniMath({
  label,
  rows,
  note,
}: {
  label: string;
  rows: [string, string][];
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="font-semibold text-slate-900">{label}</div>
      <div className="mt-3 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-600">{k}</span>
            <span className="text-sm font-semibold text-slate-900">{v}</span>
          </div>
        ))}
      </div>
      {note ? <div className="mt-3 text-xs text-slate-500">{note}</div> : null}
    </div>
  );
}

export function BottomCtas() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2">
      <a
        href="/board"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="font-semibold text-slate-900">Browse Jobs</div>
        <div className="mt-2 text-sm text-slate-600">
          Explore the latest CRE roles across debt, equity, and development.
        </div>
      </a>

      <a
        href="/alerts"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="font-semibold text-slate-900">Get Weekly Alerts</div>
        <div className="mt-2 text-sm text-slate-600">
          Top jobs + short technical prompts delivered weekly.
        </div>
      </a>
    </div>
  );
}
