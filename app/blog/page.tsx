import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

export const metadata: Metadata = {
  title: "Commercial Real Estate Careers & Market Commentary | HireCRE Blog",
  description:
    "Original writing on CRE careers, compensation, interview prep, and the hiring market — from the HireCRE team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "CRE Careers & Market Commentary | HireCRE Blog",
    description:
      "Original writing on CRE careers, compensation, interview prep, and the hiring market.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const TAG_LABELS: Record<string, string> = {
  careers: "Careers",
  interview: "Interview Prep",
  compensation: "Compensation",
  market: "Market",
  skills: "Skills",
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">Blog</span>
        </nav>

        <header>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            HireCRE Blog
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Writing from CRE practitioners on careers, compensation, interview
            prep, and what we&apos;re seeing in the hiring market.
          </p>
        </header>

        <ul className="mt-10 grid gap-5">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-800">
                  {TAG_LABELS[p.tag]}
                </span>
                <span>{p.readingMinutes} min read</span>
                <span>·</span>
                <time dateTime={p.publishedAt}>
                  {new Date(p.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-gray-900">
                <Link
                  href={`/blog/${p.slug}`}
                  className="hover:underline"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {p.description}
              </p>
              <Link
                href={`/blog/${p.slug}`}
                className="mt-3 inline-flex items-center text-sm font-semibold text-blue-700 hover:underline"
              >
                Read the post →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
