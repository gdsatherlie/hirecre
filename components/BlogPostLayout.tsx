import Link from "next/link";
import type { ReactNode } from "react";
import { getBlogPost, getRelatedBlogPosts } from "@/lib/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";
const TAG_LABELS: Record<string, string> = {
  careers: "Careers",
  interview: "Interview Prep",
  compensation: "Compensation",
  market: "Market",
  skills: "Skills",
};

export default function BlogPostLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const post = getBlogPost(slug);
  const related = getRelatedBlogPosts(slug);

  if (!post) {
    // Shouldn't happen — kept as a guard for typos during authoring.
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-gray-600">
        Post metadata not registered.
      </div>
    );
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "HireCRE" },
    publisher: {
      "@type": "Organization",
      name: "HireCRE",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{TAG_LABELS[post.tag]}</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-800">
              {TAG_LABELS[post.tag]}
            </span>
            <span>{post.readingMinutes} min read</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base text-gray-600">{post.description}</p>
          <p className="mt-3 text-xs text-gray-500">
            By{" "}
            <Link
              href="/about"
              className="font-semibold text-gray-700 hover:underline"
            >
              HireCRE Editorial
            </Link>{" "}
            — active CRE practitioners writing under a collective byline
            to preserve independence. See our{" "}
            <Link
              href="/about"
              className="font-semibold text-gray-700 hover:underline"
            >
              editorial standards
            </Link>
            .
          </p>
        </header>

        <div className="prose prose-neutral max-w-none prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-h2:font-semibold prose-h3:mt-6 prose-h3:text-lg prose-h3:font-semibold prose-a:text-blue-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline">
          {children}
        </div>

        {related.length > 0 ? (
          <section className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              More from the HireCRE blog
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li
                  key={r.slug}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="text-xs font-semibold text-blue-700">
                    {TAG_LABELS[r.tag]}
                  </div>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="mt-1 block text-base font-semibold text-gray-900 hover:underline"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </article>
  );
}
