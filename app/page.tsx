import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Commercial real estate jobs — in one clean feed
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            HireCRE aggregates CRE and proptech roles from sources like Greenhouse,
            then adds filters that actually help you find the right job faster.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/board"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Browse jobs
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              href="/login?signup=1"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Create account
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">Clean filters</div>
              <div className="mt-1 text-sm text-gray-600">
                Company, state, category, source, and remote-only.
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">Fast scanning</div>
              <div className="mt-1 text-sm text-gray-600">
                Readable cards and quick “View job” actions.
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm font-semibold text-gray-900">Pay guidance</div>
              <div className="mt-1 text-sm text-gray-600">
                If salary appears in the listing, we surface it on the card.
              </div>
            </div>
          </div>
        </div>
	
	<div className="mt-8">
 	 <EmailSignup source="home" />
	</div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">What is this?</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            HireCRE is a job board focused on commercial real estate and proptech.
            We pull roles from public job boards we’re allowed to access (starting with Greenhouse),
            then present them in a cleaner, searchable experience.
          </p>
        </div>
      </div>
    </div>
  );
}
