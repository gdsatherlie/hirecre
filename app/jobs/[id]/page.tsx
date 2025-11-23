import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { jobs } from "@/lib/data";

interface JobPageProps {
  params: { id: string };
}

export default function JobDetailPage({ params }: JobPageProps) {
  const job = jobs.find((item) => item.id === params.id);

  if (!job) {
    return notFound();
  }

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Job Detail"
        title={job.title}
        description={`${job.company} • ${job.location} • ${job.type}`}
        actions={
          <div className="flex gap-3">
            <Link href="/jobs" className="button-ghost">
              Back to jobs
            </Link>
            <a className="button-primary" href={`mailto:${job.contactEmail}`}>
              Refer a candidate
            </a>
          </div>
        }
      />

      <div className="card grid gap-8 p-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="badge">{job.salary}</span>
            <span className="badge">{job.postedAt}</span>
            {job.tags.map((tag) => (
              <span key={tag} className="badge bg-slate-800/60">
                {tag}
              </span>
            ))}
          </div>
          <div className="space-y-4 text-slate-200">
            <h3 className="text-lg font-semibold text-slate-50">Role Summary</h3>
            <p className="leading-relaxed text-slate-200">{job.summary}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-50">Responsibilities</h3>
            <ul className="space-y-2 text-slate-300">
              {job.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-50">Requirements</h3>
            <ul className="space-y-2 text-slate-300">
              {job.requirements.map((requirement) => (
                <li key={requirement} className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-200">
          <p className="text-base font-semibold text-slate-50">Hiring Contact</p>
          <p className="text-slate-300">{job.company}</p>
          <a className="text-primary hover:text-primary-dark" href={`mailto:${job.contactEmail}`}>
            {job.contactEmail}
          </a>
          <div className="space-y-3 pt-4">
            <p className="text-base font-semibold text-slate-50">Why this team</p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Flat team with direct exposure to partners and IC.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Capitalized pipeline with near-term closes.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Operator-first culture with transparent reporting.</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
