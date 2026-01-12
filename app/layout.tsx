import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Script from "next/script";

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;

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
  {GTAG_ID ? (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTAG_ID}');
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

