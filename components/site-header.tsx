import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-base font-semibold text-gray-900">HireCRE</div>
            <div className="mt-1 text-sm text-gray-600">
              A clean, curated CRE job feed (starting with Greenhouse sources).
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Contact:{" "}
              <a className="underline" href="mailto:hirecre@a26cos.com">
                hirecre@a26cos.com
              </a>
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <Link className="text-gray-700 hover:underline" href="/about">
              About
            </Link>
            <Link className="text-gray-700 hover:underline" href="/contact">
              Contact
            </Link>
            <Link className="text-gray-700 hover:underline" href="/privacy">
              Privacy
            </Link>
            <Link className="text-gray-700 hover:underline" href="/terms">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          © {new Date().getFullYear()} HireCRE
        </div>
      </div>
    </footer>
  );
}
