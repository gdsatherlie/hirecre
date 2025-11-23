import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "HireCRE | Commercial Real Estate Careers & Insights",
  description:
    "Discover commercial real estate jobs, insights, and resources for employers and candidates on HireCRE."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-50">
      <body className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
