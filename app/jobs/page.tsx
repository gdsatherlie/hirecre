"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { jobs } from "@/lib/data";
import type { Job } from "@/lib/types";
import { SectionHeader } from "@/components/SectionHeader";

function filterJobs(list: Job[], search: string, location: string, type: string) {
  return list.filter((job) => {
    const matchesSearch = `${job.title} ${job.company} ${job.summary}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLocation = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
    const matchesType = type ? job.type === type : true;
    return matchesSearch && matchesLocation && matchesType;
  });
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const results = useMemo(() => filterJobs(jobs, search, location, type), [search, location, type]);

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Jobs"
        title="CRE roles ready to interview"
        description="Filter by market, workstyle, and focus area to find your next move."
      />

      <div className="card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Search</span>
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-50 focus:border-primary focus:outline-none"
              placeholder="Title, company, keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Location</span>
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-50 focus:border-primary focus:outline-none"
              placeholder="City or region"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-200">
            <span>Workstyle</span>
            <select
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-50 focus:border-primary focus:outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {results.map((job) => (
          <article key={job.id} className="card flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{job.company}</p>
                <h3 className="text-xl font-semibold text-slate-50">{job.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{job.summary}</p>
              </div>
              <Link href={`/jobs/${job.id}`} className="button-primary whitespace-nowrap">
                View role
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="badge">{job.location}</span>
              <span className="badge">{job.type}</span>
              <span className="badge">{job.salary}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              {job.tags.map((tag) => (
                <span key={tag} className="badge bg-slate-800/60">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Posted {job.postedAt}</span>
              <a className="text-primary hover:text-primary-dark" href={`mailto:${job.contactEmail}`}>
                Refer a candidate
              </a>
            </div>
          </article>
        ))}
        {results.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-800 p-10 text-center text-slate-400">
            No roles found. Adjust filters to see more opportunities.
          </div>
        ) : null}
      </div>
    </div>
  );
}
