import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="card space-y-4 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Not Found</p>
        <h1 className="text-3xl font-semibold text-slate-50">This page isn&apos;t available</h1>
        <p className="text-slate-300">
          We couldn&apos;t find the content you were looking for. Check the URL or go back to the
          home screen to browse jobs, resources, and articles.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="button-primary">
            Back home
          </Link>
          <Link href="/jobs" className="button-ghost">
            View jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
