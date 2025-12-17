import { JobsClient } from '@/components/JobsClient';
import { getJobFilterOptions, getJobsFromSheet } from '@/lib/jobsFromSheet';

export const revalidate = 0;

export default async function JobsPage() {
  const [jobs, filters] = await Promise.all([getJobsFromSheet(), getJobFilterOptions()]);
  const activeJobs = jobs.filter((job) => job.isActive);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Opportunities</p>
        <h1 className="text-3xl font-bold text-primary">Commercial real estate jobs</h1>
        <p className="max-w-3xl text-slate-700">
          Browse live roles sourced directly from our Google Sheet feed. Filter by company, location, employment type, or
          category, or search by keywords to find your next move.
        </p>
      </header>

      <JobsClient jobs={activeJobs} filters={filters} />
    </div>
  );
}
