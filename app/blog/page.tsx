import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Blog"
        title="Signals from the CRE field"
        description="Operator voices, capital markets POVs, and on-the-ground stories."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="card flex flex-col gap-4 p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-slate-50">{post.title}</h3>
            <p className="text-sm text-slate-300">{post.description}</p>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>
                {post.publishedAt} • {post.readingTime}
              </span>
              <Link href={`/blog/${post.slug}`} className="text-primary hover:text-primary-dark">
                Read
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
