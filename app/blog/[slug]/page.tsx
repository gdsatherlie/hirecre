import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { blogPosts } from "@/lib/data";

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Blog"
        title={post.title}
        description={post.description}
        actions={
          <Link href="/blog" className="button-ghost">
            Back to blog
          </Link>
        }
      />

      <div className="card space-y-6 p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          {post.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
          <span>
            {post.publishedAt} • {post.readingTime}
          </span>
          <span>• By {post.author}</span>
        </div>
        <div className="space-y-4 text-slate-200">
          {post.content.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-slate-200">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
