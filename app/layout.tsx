import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HireCRE | Commercial Real Estate Jobs',
  description: 'Discover and apply to commercial real estate jobs curated from across the web.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-slate-50 text-slate-900`}>
        <header className="border-b bg-white/80 backdrop-blur">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-semibold text-primary">
              HireCRE
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <Link href="/jobs" className="hover:text-primary">
                Jobs
              </Link>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t bg-white/80">
          <div className="container py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} HireCRE. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
