export const metadata = {
  title: "Contact | HireCRE",
  description: "Contact HireCRE for corrections, submissions, or partnerships.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Corrections, role submissions, partnerships — send it here.
        </p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-neutral-800 leading-relaxed">
            Email us at{" "}
            <a
              className="underline underline-offset-4"
              href="mailto:hirecre@a26cos.com"
            >
              hirecre@a26cos.com
            </a>
            .
          </p>

          <div className="text-sm text-neutral-700">
            <p className="font-medium text-neutral-900">Best reasons to reach out:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>A job link is broken or expired</li>
              <li>A role is miscategorized or irrelevant</li>
              <li>You want your company included/excluded</li>
              <li>You want to submit a CRE role</li>
              <li>Interested in sponsor / featured roles</li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href="mailto:hirecre@a26cos.com?subject=HireCRE%20-%20Hello"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
            >
              Email HireCRE
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
