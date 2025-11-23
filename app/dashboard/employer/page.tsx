import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { jobs } from "@/lib/data";

export default function EmployerDashboard() {
  const activeSearches = jobs.slice(0, 2);

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Employer Dashboard"
        title="Run your CRE searches with clarity"
        description="Track live roles, share briefs, and show candidates why your platform wins."
        actions={
          <div className="flex gap-3">
            <Link href="/jobs" className="button-primary">
              Post new role
            </Link>
            <Link href="/resources" className="button-ghost">
              Request market intel
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-base font-semibold text-slate-100">Active searches</p>
            <Link href="/jobs" className="text-sm text-primary hover:text-primary-dark">
              View pipeline
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {activeSearches.map((job) => (
              <div key={job.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm text-slate-400">{job.company}</p>
                <p className="text-lg font-semibold text-slate-50">{job.title}</p>
                <p className="text-sm text-slate-300">{job.location}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="badge">{job.type}</span>
                  <span className="badge">{job.salary}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>{job.postedAt}</span>
                  <Link href={`/jobs/${job.id}`} className="text-primary hover:text-primary-dark">
                    Brief
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <p className="text-base font-semibold text-slate-100">Brand moments</p>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-slate-50">Portfolio spotlight</p>
              <p className="text-slate-400">Add a new case study or leasing story to your profile.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-slate-50">Interview trail</p>
              <p className="text-slate-400">Share process clarity and who candidates will meet.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-slate-50">Market intel</p>
              <p className="text-slate-400">Request comps, salary bands, or talent maps for your search.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
