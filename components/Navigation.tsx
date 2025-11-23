'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/dashboard/candidate', label: 'Candidate' },
  { href: '/dashboard/employer', label: 'Employer' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActive
                ? 'bg-white text-black shadow'
                : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
