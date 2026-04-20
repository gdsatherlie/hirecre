import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | HireCRE",
  description:
    "How HireCRE collects, uses, and protects your information — including details on Google AdSense and Google Analytics, cookies, and your rights under GDPR and CCPA.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">Privacy</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Last updated: April 20, 2026
        </p>
      </header>

      <article className="prose prose-neutral max-w-none prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-h2:font-semibold prose-h3:mt-6 prose-h3:text-base prose-h3:font-semibold prose-a:text-blue-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline">
        <p>
          This Privacy Policy explains how HireCRE (&quot;HireCRE,&quot;
          &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
          discloses, and protects information when you use{" "}
          <strong>hirecre.com</strong>. We aim to collect as little personal
          data as possible, use it only for purposes you would expect, and
          never sell your personal information.
        </p>

        <h2>Summary</h2>
        <ul>
          <li>
            We operate a commercial real estate job board and editorial site.
          </li>
          <li>
            We collect basic usage analytics via Google Analytics, and we
            serve display ads via Google AdSense. Both use cookies.
          </li>
          <li>
            If you create an account, we store your email address and
            authentication data via Supabase.
          </li>
          <li>
            We do not sell your personal information.
          </li>
          <li>
            You can opt out of personalized ads and analytics at any time —
            details below.
          </li>
          <li>
            Questions: email{" "}
            <a href="mailto:hirecre@a26cos.com">hirecre@a26cos.com</a>.
          </li>
        </ul>

        <h2>Information we collect</h2>

        <h3>Information you provide</h3>
        <ul>
          <li>
            <strong>Account information.</strong> If you create an account, we
            store your email address and a hashed password via Supabase Auth.
          </li>
          <li>
            <strong>Newsletter subscriptions.</strong> If you sign up for the
            newsletter or job alerts, we store the email address you provide
            and mirror it to our email sending platform (MailerLite /
            MailerSend) so we can deliver the emails.
          </li>
          <li>
            <strong>Saved searches.</strong> If you save a job search, we
            store the search filters you selected, linked to your account.
          </li>
          <li>
            <strong>Messages you send us.</strong> If you email us, we retain
            the message for as long as needed to respond and for our records.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Log data.</strong> Like most websites, our hosting
            infrastructure (Coolify) records basic access logs including IP
            address, user agent, pages visited, and timestamps.
          </li>
          <li>
            <strong>Click events.</strong> When you click a job listing on
            our board, we record that the click happened (job ID, source,
            and a hashed IP address) so we can measure which roles are most
            viewed. We do not tie click events to your personal identity.
          </li>
          <li>
            <strong>Analytics.</strong> Google Analytics tracks aggregate
            usage: sessions, pages viewed, rough geography, browser, device.
            See the <a href="#ads-and-analytics">Ads and Analytics</a>{" "}
            section below for opt-out options.
          </li>
          <li>
            <strong>Advertising signals.</strong> Google AdSense may set
            cookies and collect information about your browsing for the
            purpose of serving and measuring ads.
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>
            To operate the site — authentication, saved searches, newsletter
            delivery.
          </li>
          <li>
            To understand how the site is used and improve the product —
            which pages are popular, where users come from, which content
            needs to be expanded.
          </li>
          <li>
            To display relevant ads via Google AdSense, which helps fund the
            site.
          </li>
          <li>To respond to your inquiries when you email us.</li>
          <li>
            To comply with legal obligations and protect our rights and
            those of our users.
          </li>
        </ul>

        <h2>Cookies and similar technologies</h2>
        <p>
          We and our service providers use cookies and similar technologies
          (local storage, pixels) for several purposes:
        </p>
        <ul>
          <li>
            <strong>Necessary cookies.</strong> Required for authentication
            and to remember your session.
          </li>
          <li>
            <strong>Analytics cookies.</strong> Set by Google Analytics to
            collect aggregate usage data. Identifiers are pseudonymous.
          </li>
          <li>
            <strong>Advertising cookies.</strong> Set by Google AdSense and
            its advertising partners to serve and measure ads. These cookies
            may be used to build a profile of your interests across sites.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings (block,
          delete, limit third-party cookies) and through the individual
          opt-out controls below.
        </p>

        <h2 id="ads-and-analytics">Ads and Analytics — third parties</h2>

        <h3>Google AdSense</h3>
        <p>
          We use Google AdSense to serve display ads. Google, as a third-party
          vendor, uses cookies to serve ads based on your prior visits to
          this and other websites. Google&apos;s use of advertising cookies
          enables it and its partners to serve ads based on your visits.
        </p>
        <p>
          You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noreferrer"
          >
            Google Ads Settings
          </a>
          . You may also opt out of many third-party vendors&apos; use of
          cookies for personalized ads at{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noreferrer"
          >
            aboutads.info
          </a>{" "}
          or{" "}
          <a
            href="https://youronlinechoices.eu"
            target="_blank"
            rel="noreferrer"
          >
            youronlinechoices.eu
          </a>{" "}
          (for EU visitors).
        </p>
        <p>
          For more on how Google uses data, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
          >
            how Google uses information from sites or apps that use their
            services
          </a>
          .
        </p>

        <h3>Google Analytics</h3>
        <p>
          We use Google Analytics to understand aggregate usage. Google
          Analytics collects information such as your IP address (anonymized
          where possible), device, browser, and pages visited. You can opt
          out by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noreferrer"
          >
            Google Analytics Opt-Out Browser Add-on
          </a>
          .
        </p>

        <h3>Supabase</h3>
        <p>
          We use Supabase (Postgres database + Auth) as our backend
          infrastructure. If you have an account, Supabase stores your email
          and authentication data on our behalf. See{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Supabase&apos;s privacy policy
          </a>{" "}
          for how they process data as our processor.
        </p>

        <h3>MailerLite / MailerSend</h3>
        <p>
          If you sign up for the newsletter or job alerts, we send the email
          you provided to MailerLite (newsletter list management) and
          MailerSend (transactional sending). Both operate under their own
          privacy policies.
        </p>

        <h2>Data sharing and disclosure</h2>
        <ul>
          <li>
            <strong>Service providers.</strong> We share limited data with
            vendors that operate the site (Supabase, MailerLite, MailerSend,
            Google Analytics, Google AdSense, Coolify hosting). They access
            data only to perform their services for us.
          </li>
          <li>
            <strong>Legal compliance.</strong> We may disclose information
            when required by law, subpoena, or court order, or to protect
            our rights and those of our users.
          </li>
          <li>
            <strong>We do not sell your personal information.</strong>
          </li>
        </ul>

        <h2>Your rights</h2>

        <h3>EU / EEA residents (GDPR)</h3>
        <p>
          If you are in the European Union or the European Economic Area,
          you have rights under the General Data Protection Regulation
          including: access, rectification, erasure, restriction of
          processing, data portability, and objection to processing. You may
          also withdraw consent at any time and lodge a complaint with your
          local data protection authority.
        </p>

        <h3>California residents (CCPA / CPRA)</h3>
        <p>
          If you are a California resident, you have rights under the
          California Consumer Privacy Act and California Privacy Rights Act
          including: right to know what personal information we collect,
          right to delete, right to correct, and right to opt out of the
          sale or sharing of personal information. As stated above, we do
          not sell your personal information.
        </p>

        <h3>How to exercise your rights</h3>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:hirecre@a26cos.com">hirecre@a26cos.com</a> with
          your request. We will verify your identity (typically by
          confirming the request from the email address on file) and respond
          within the timeframe required by applicable law.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain data only as long as needed for the purposes described
          above, typically:
        </p>
        <ul>
          <li>
            <strong>Account data:</strong> for as long as your account is
            active, plus a short retention period after deletion.
          </li>
          <li>
            <strong>Newsletter subscriptions:</strong> until you unsubscribe.
          </li>
          <li>
            <strong>Click events:</strong> aggregate storage; hashed IPs are
            not tied to an account.
          </li>
          <li>
            <strong>Analytics:</strong> Google Analytics retention defaults
            (typically 14 months for user-level data, longer for aggregate).
          </li>
        </ul>

        <h2>Security</h2>
        <p>
          We take reasonable technical and organizational measures to
          protect your information — encryption in transit (TLS), hashed
          passwords via Supabase Auth, row-level security on our database,
          and restricted access to production credentials. No system is
          perfectly secure; please use a strong, unique password.
        </p>

        <h2>Children</h2>
        <p>
          HireCRE is intended for professionals and is not directed at
          children under 16. We do not knowingly collect personal
          information from children. If you believe a child has provided us
          information, email{" "}
          <a href="mailto:hirecre@a26cos.com">hirecre@a26cos.com</a> and we
          will delete it.
        </p>

        <h2>International transfers</h2>
        <p>
          Our infrastructure is located in the United States. If you access
          HireCRE from outside the US, your information will be transferred
          to and processed in the US.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes
          will be reflected in the &quot;Last updated&quot; date at the top
          of this page. Continued use of HireCRE after an update constitutes
          acceptance of the revised policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions, rights requests, or privacy concerns: email{" "}
          <a href="mailto:hirecre@a26cos.com">hirecre@a26cos.com</a>.
        </p>
      </article>
    </main>
  );
}
