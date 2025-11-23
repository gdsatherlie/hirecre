import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { resources } from "@/lib/data";

interface ResourcePageProps {
  params: { id: string };
}

export default function ResourceDetailPage({ params }: ResourcePageProps) {
  const resource = resources.find((item) => item.id === params.id);

  if (!resource) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={resource.category}
        title={resource.title}
        description={resource.description}
        actions={
          <div className="flex gap-3">
            <Link href="/resources" className="button-ghost">
              Back to resources
            </Link>
            <a href={resource.link} className="button-primary" target="_blank" rel="noreferrer">
              Open external link
            </a>
          </div>
        }
      />

      <div className="card grid gap-8 p-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 text-slate-200">
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="badge">Updated {resource.updatedAt}</span>
            <span className="badge">{resource.author}</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-50">Highlights</h3>
            <ul className="space-y-2 text-slate-300">
              {resource.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-200">
          <p className="text-base font-semibold text-slate-50">Resource info</p>
          <p className="text-slate-300">Category: {resource.category}</p>
          <p className="text-slate-300">Author: {resource.author}</p>
          <p className="text-slate-300">Updated: {resource.updatedAt}</p>
          <a href={resource.link} className="button-primary block text-center" target="_blank" rel="noreferrer">
            View resource
          </a>
        </aside>
      </div>
    </div>
  );
}
