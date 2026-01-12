import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Script from "next/script";

const GA_ID = "G-21RSXD1LLC";

export const metadata: Metadata = {
  title: "HireCRE — Commercial Real Estate Jobs",
  description:
    "A clean, curated feed of commercial real estate and proptech jobs (starting with Greenhouse sources).",
  metadataBase: new URL("https://hirecre.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
<head>
  {GA_ID ? (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `,
        }}
      />
    </>
  ) : null}
</head>

      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
