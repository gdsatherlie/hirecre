export const metadata = {
  title: "Terms | HireCRE",
  description: "HireCRE terms of service.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
        </p>
      </header>

      <article className="prose prose-neutral max-w-none">
        <p>
          HireCRE provides a curated job board. By accessing or using HireCRE,
          you agree to these Terms.
        </p>

        <h2>Use of the site</h2>
        <ul>
          <li>You agree not to misuse the site or attempt to disrupt it.</li>
          <li>You agree not to scrape HireCRE or copy large portions of data.</li>
          <li>You are responsible for your account and login credentials.</li>
        </ul>

        <h2>Job listings &amp; third-party links</h2>
        <p>
          HireCRE displays job listings and links to third-party sites. We do not
          control those sites and are not responsible for their content,
          policies, or hiring decisions. Always verify details directly with the
          employer.
        </p>

        <h2>No guarantees</h2>
        <p>
          We aim for accuracy, but job listings can change quickly. HireCRE is
          provided “as is” without warranties of any kind.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, HireCRE and its operators will
          not be liable for any indirect, incidental, special, or consequential
          damages arising from use of the site.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these Terms from time to time. Continued use of HireCRE
          after changes means you accept the updated Terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email{" "}
          <a href="mailto:hirecre@a26cos.com">hirecre@a26cos.com</a>.
        </p>
      </article>
    </main>
  );
}
