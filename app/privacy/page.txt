export const metadata = {
  title: "Privacy | HireCRE",
  description: "HireCRE privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
        </p>
      </header>

      <article className="prose prose-neutral max-w-none">
        <p>
          HireCRE is a job board. We keep this simple: collect as little data as
          possible, use it responsibly, and don’t sell your personal info.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account info:</strong> if you create an account, we store your
            email and basic authentication data so you can log in.
          </li>
          <li>
            <strong>Usage data:</strong> like most websites, we may collect basic
            analytics (e.g., page views) to understand what’s working.
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To operate the site (login, access control, basic functionality).</li>
          <li>To improve the product (performance, relevance, usability).</li>
          <li>To communicate with you if you email us directly.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We may use cookies or similar technologies for authentication and basic
          analytics. You can control cookies via your browser settings.
        </p>

        <h2>Job listings</h2>
        <p>
          Job data displayed on HireCRE comes from publicly available postings
          where employers publish open roles. HireCRE is not affiliated with the
          employers unless explicitly stated.
        </p>

        <h2>Data sharing</h2>
        <p>
          We do not sell your personal information. We may share limited data
          with service providers that help run the site (hosting, database,
          analytics) strictly to operate HireCRE.
        </p>

        <h2>Security</h2>
        <p>
          We take reasonable measures to protect your information, but no system
          is perfectly secure. Use a strong password and keep your account secure.
        </p>

        <h2>Contact</h2>
        <p>
          Questions or requests? Email{" "}
          <a href="mailto:hirecre@a26cos.com">hirecre@a26cos.com</a>.
        </p>
      </article>
    </main>
  );
}
