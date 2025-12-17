import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/jobsFromSheet';

export const revalidate = 0;

type JobDetailPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = await getJobById(params.id);
  if (!job || !job.isActive) {
    return { title: 'Job not found | HireCRE' };
  }

  return {
    title: `${job.title} at ${job.company} | HireCRE`,
    description: `${job.title} at ${job.company} in ${job.location || 'a great location'}`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = await getJobById(params.id);

  if (!job || !job.isActive) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-primary">
          {job.jobCategory || 'General'}
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {job.employmentType || 'Employment'}
        </span>
        {job.location ? (
          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">{job.location}</span>
        ) : null}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-600">{job.company}</p>
        <h1 className="text-3xl font-bold text-primary">{job.title}</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {job.sourceUrl ? (
          <a
            href={job.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
          >
            Apply on company site
          </a>
        ) : null}
        {job.source ? (
          <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
            Source: {job.source}
          </span>
        ) : null}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-primary hover:border-primary"
        >
          ← Back to jobs
        </Link>
      </div>

      <section className="space-y-3 whitespace-pre-line text-slate-700 leading-relaxed">
        {job.description || 'No description provided.'}
      </section>
    </article>
  );
}
