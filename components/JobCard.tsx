import Link from 'next/link';
import { SheetJob } from '@/lib/jobsFromSheet';

type JobCardProps = {
  job: SheetJob;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-primary">{job.jobCategory || 'General'}</p>
        <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {job.employmentType || 'Unknown'}
        </p>
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
        <p className="text-sm font-medium text-slate-700">{job.company}</p>
        <p className="text-sm text-slate-500">{job.location || 'Location not specified'}</p>
      </div>
      <p className="text-sm text-slate-600">
        {job.description.length > 180 ? `${job.description.slice(0, 180)}...` : job.description}
      </p>
      <div className="text-sm font-semibold text-primary">View details →</div>
    </Link>
  );
}
