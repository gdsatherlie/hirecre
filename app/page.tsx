import Link from "next/link";
import { blogPosts, jobs, resources } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

export default function HomePage() {
  const featuredJobs = jobs.slice(0, 2);
  const featuredResources = resources.slice(0, 2);
  const featuredPosts = blogPosts.slice(0, 2);

  return (
    <div className="space-y-16">
      <section className="card relative overflow-hidden px-8 py-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">HireCRE</p>
            <h1 className="text-4xl font-bold leading-tight text-slate-50 md:text-5xl">
              CRE talent, insights, and story-telling in one hub.
            </h1>
            <p className="text-lg text-slate-200">
              Browse curated commercial real estate roles, actionable playbooks, and
              fresh research designed for builders, owners, and candidates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="button-primary" href="/jobs">
                Explore Jobs
              </Link>
              <Link className="button-ghost" href="/resources">
                View Resources
              </Link>
            </div>
          </div>
          <div className="card border-primary/30 bg-slate-900/60">
            <div className="space-y-4 border-b border-slate-800 p-6">
              <p className="text-sm font-semibold text-primary">Live Searches</p>
              <div className="space-y-3">
                {featuredJobs.map((job) => (
                  <div key={job.id} className="rounded-xl border border-slate-800/70 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">{job.company}</p>
                    <p className="text-lg font-semibold text-slate-50">{job.title}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                      <span>{job.location}</span>
                      <span>• {job.type}</span>
                      <span>• {job.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-800 text-center text-sm text-slate-300">
              <div className="p-4">
                <p className="text-2xl font-semibold text-slate-50">120+</p>
                <p>Curated employer relationships</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-semibold text-slate-50">30k</p>
                <p>CRE professionals in our network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Jobs"
          title="Featured CRE roles"
          description="Roles across asset management, development, and capital markets with vetted sponsors."
          actions={
            <Link href="/jobs" className="button-ghost">
              View all jobs
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredJobs.map((job) => (
            <div key={job.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{job.company}</p>
                  <h3 className="text-xl font-semibold text-slate-50">{job.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{job.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="badge">{job.location}</span>
                    <span className="badge">{job.type}</span>
                    <span className="badge">{job.salary}</span>
                  </div>
                </div>
                <Link href={`/jobs/${job.id}`} className="button-primary">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Resources"
          title="Operator playbooks"
          description="Market pulses, leasing frameworks, and capital stack tools tailored to CRE teams."
          actions={
            <Link href="/resources" className="button-ghost">
              Browse resources
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredResources.map((resource) => (
            <div key={resource.id} className="card p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
                <span>{resource.category}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-50">{resource.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{resource.description}</p>
              <div className="mt-3 space-y-2 text-sm text-slate-400">
                {resource.highlights.slice(0, 2).map((highlight) => (
                  <p key={highlight}>• {highlight}</p>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>Updated {resource.updatedAt}</span>
                <Link href={`/resources/${resource.id}`} className="text-primary hover:text-primary-dark">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Blog"
          title="Signals from the field"
          description="Perspectives from operators, investors, and researchers across CRE."
          actions={
            <Link href="/blog" className="button-ghost">
              View blog
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <div key={post.slug} className="card p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="badge">{post.tags[0]}</span>
                <span>{post.publishedAt}</span>
                <span>• {post.readingTime}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-slate-50">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{post.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>By {post.author}</span>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:text-primary-dark">
                  Read article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
