import Link from 'next/link';

export default function JobNotFound() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-center">
      <h1 className="text-2xl font-bold text-primary">Job not found</h1>
      <p className="text-slate-600">The role you are looking for may have expired or is no longer active.</p>
      <Link
        href="/jobs"
        className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Back to jobs
      </Link>
    </div>
  );
}
