"use client";

import { nav } from "@/content";

/**
 * Simple, text-only nav. Transparent and fixed. On desktop it spans the
 * scrollable right panel (over the cream background) so the links read in
 * bark/clay. Hidden on mobile — the CTA panel carries the brand there.
 */
export default function NavBar() {
  return (
    <header className="pointer-events-none fixed right-0 top-0 z-40 hidden w-3/5 lg:block">
      <nav className="pointer-events-auto flex items-center justify-end gap-8 px-10 py-6">
        {nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-sans text-sm text-soil transition-colors duration-200 hover:text-clay"
          >
            {link.label}
          </a>
        ))}
        <a
          href={nav.cta.href}
          className="rounded-md border border-clay px-4 py-2 font-sans text-sm font-medium text-clay transition-colors duration-200 hover:bg-clay hover:text-ivory"
        >
          {nav.cta.label}
        </a>
      </nav>
    </header>
  );
}
