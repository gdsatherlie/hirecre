import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { blogPosts, jobs, resources } from "@/lib/data";

export default function CandidateDashboard() {
  const savedJobs = jobs.slice(0, 2);
  const savedResources = resources.slice(0, 1);
  const latestArticles = blogPosts.slice(0, 2);

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Candidate Dashboard"
        title="Stay interview-ready"
        description="Keep tabs on roles, intel, and storylines that strengthen your search."
        actions={
          <div className="flex gap-3">
            <Link href="/jobs" className="button-primary">
              Discover roles
            </Link>
            <Link href="/resources" className="button-ghost">
              Prep with resources
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-base font-semibold text-slate-100">Saved jobs</p>
            <Link href="/jobs" className="text-sm text-primary hover:text-primary-dark">
              Manage alerts
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {savedJobs.map((job) => (
              <div key={job.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm text-slate-400">{job.company}</p>
                <p className="text-lg font-semibold text-slate-50">{job.title}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="badge">{job.location}</span>
                  <span className="badge">{job.type}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>Updated {job.postedAt}</span>
                  <Link href={`/jobs/${job.id}`} className="text-primary hover:text-primary-dark">
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <p className="text-base font-semibold text-slate-100">Prep stack</p>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
            <p className="text-slate-50">{savedResources[0].title}</p>
            <p className="text-slate-400">{savedResources[0].description}</p>
            <Link
              href={`/resources/${savedResources[0].id}`}
              className="mt-3 inline-flex text-primary hover:text-primary-dark"
            >
              View playbook
            </Link>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="text-slate-50">Latest articles</p>
            {latestArticles.map((article) => (
              <div key={article.slug} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{article.tags[0]}</p>
                <p className="text-slate-50">{article.title}</p>
                <p className="text-slate-400">{article.description}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-2 inline-flex text-primary hover:text-primary-dark"
                >
                  Read
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
