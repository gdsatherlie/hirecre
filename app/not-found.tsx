import Link from "next/link";

export const metadata = {
  title: "Page not found — HireCRE",
  description:
    "The page you were looking for doesn't exist. Browse our CRE job board or interview prep library instead.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          404
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 text-base text-gray-600">
          The link may be broken, or the page may have moved. Try one of these
          instead.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go home
          </Link>
          <Link
            href="/board"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Browse jobs
          </Link>
          <Link
            href="/interview-prep"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Interview prep
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <div className="text-sm font-semibold text-gray-900">Popular pages</div>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <Link
                href="/commercial-real-estate-career-guide"
                className="text-blue-700 hover:underline"
              >
                CRE Career Guide
              </Link>
            </li>
            <li>
              <Link
                href="/commercial-real-estate-salary-guide"
                className="text-blue-700 hover:underline"
              >
                CRE Salary Guide
              </Link>
            </li>
            <li>
              <Link
                href="/cre-interview-questions"
                className="text-blue-700 hover:underline"
              >
                CRE Interview Questions
              </Link>
            </li>
            <li>
              <Link
                href="/acquisitions-analyst-real-estate"
                className="text-blue-700 hover:underline"
              >
                Acquisitions Analyst Guide
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
