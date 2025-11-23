import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { resources } from "@/lib/data";

export default function ResourcesPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Resources"
        title="Operator-grade playbooks"
        description="Research briefs, leasing frameworks, and capital stack templates for CRE teams."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <article key={resource.id} className="card flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
              <span>{resource.category}</span>
              <span className="text-slate-500">•</span>
              <span>Updated {resource.updatedAt}</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-50">{resource.title}</h3>
              <p className="text-sm text-slate-300">{resource.description}</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              {resource.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>By {resource.author}</span>
              <Link href={`/resources/${resource.id}`} className="text-primary hover:text-primary-dark">
                View detail
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
