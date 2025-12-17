import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | HireCRE',
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-primary">About HireCRE</h1>
      <p className="text-slate-700">
        HireCRE is a curated hub for commercial real estate talent. We aggregate roles from across the web and highlight the ones worth your time. This site is powered entirely by a Google Sheet that feeds the listings you see here.
      </p>
      <p className="text-slate-700">
        Check back often as we continue to refine the experience, add more categories, and expand into new markets. If you have feedback or want to partner, drop us a note—we would love to hear from you.
      </p>
    </article>
  );
}
