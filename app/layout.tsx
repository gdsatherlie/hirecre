import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Script from "next/script";
import Analytics from "@/components/analytics";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const GA_ID = process.env.NEXT_PUBLIC_GTAG_ID;

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

        {/* AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-8663179222160693" />

        {/* AdSense script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8663179222160693"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
      </head>

      <body className={`${inter.className} page-shell text-slate-900 antialiased`}>
        <SiteHeader />
        {GA_ID ? <Analytics gaId={GA_ID} /> : null}

        <main className="container py-10">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
