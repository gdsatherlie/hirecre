export const metadata = {
  title: "About | HireCRE",
  description: "A simple, curated job board for commercial real estate and proptech.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">About HireCRE</h1>
        <p className="mt-2 text-sm text-neutral-600">
          A clean, curated job board for commercial real estate + proptech.
        </p>
      </header>

      <section className="space-y-4 text-neutral-800 leading-relaxed">
        <p>
          HireCRE is a simple job board focused on commercial real estate roles
          across capital markets, acquisitions, asset management, development,
          and the broader proptech ecosystem.
        </p>

        <p>
          We pull listings from public job boards where employers intentionally
          publish open roles, then organize them into one place so you can
          search faster and miss fewer opportunities.
        </p>

        <p>
          The site updates regularly. If you see something off (wrong location,
          expired link, role mismatch), tell us and we’ll fix it.
        </p>

        <p>
          Want your company included (or excluded), or want to submit a role?
          Email{" "}
          <a
            className="underline underline-offset-4"
            href="mailto:hirecre@a26cos.com"
          >
            hirecre@a26cos.com
          </a>
          .
        </p>
      </section>

      <hr className="my-10 border-neutral-200" />

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">What shows up here?</h2>
        <p className="mt-2 text-sm text-neutral-700">
          The goal is “CRE careers that move the needle.” We actively avoid
          unrelated categories and spammy duplicates.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-800">
          <li>Capital Markets / Debt &amp; Equity</li>
          <li>Acquisitions / Investments</li>
          <li>Asset Management</li>
          <li>Development / Construction (deal-side)</li>
          <li>Research / Analytics</li>
          <li>Proptech roles that serve the CRE industry</li>
        </ul>
      </section>
    </main>
  );
}
