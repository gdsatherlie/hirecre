'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-white">Hire</span>
          <span className="text-indigo-400">CRE</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
