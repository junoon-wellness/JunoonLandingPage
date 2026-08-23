'use client'

import Image from 'next/image'
import Lotus from '@/components/brand/Lotus'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import AppStoreBadge from './AppStoreBadge'

/**
 * Scroll-aware chrome (spec §B1). Airy over the hero, tighter and more opaque
 * once you leave it, with a hairline that draws itself across the bottom.
 * Both states live in globals.css under `.v2-nav[data-scrolled]`; this
 * component only owns the boolean.
 *
 * LV5-005: also owns the site's primary navigation (Home / Pricing / Library
 * / About) and the <768px hamburger -> full-height sheet. /pricing, /library
 * and /about are built by their own tickets and do not exist yet on this
 * branch — the links are real `<Link>`s and will 404 on this preview until
 * those ship.
 */
const THRESHOLD = 24

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Library', href: '/library' },
  { label: 'About', href: '/about' },
] as const

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Read once on mount too: a reload partway down the page should open in
    // the scrolled state rather than waiting for the first scroll event.
    const update = () => setScrolled(window.scrollY > THRESHOLD)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Close the sheet on route change. Also covers same-page anchor navigation
  // (#join) since pathname alone doesn't change for a hash jump, but the
  // click handler on each link closes the sheet directly for that case.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll while the sheet is open, and restore whatever the page
  // had on unmount rather than assuming it was empty.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  // Escape closes the sheet.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
    <nav className="v2-nav" data-scrolled={scrolled}>
      <a href="#top" className="v2-link v2-nav-brand">
        {/* The badge carries "JUNOON" inside it, but at this size that text is
            illegible, so it reads as a tree emblem. The wordmark beside it does
            the naming work.

            96px source rather than the 2000x2000 original: this slot is 34px,
            and shipping a 2000px PNG for it was pure weight. */}
        <Image
          className="v2-nav-logo"
          src="/logo-clay-text-96.png"
          alt=""
          aria-hidden="true"
          width={96}
          height={96}
          sizes="34px"
          loading="eager"
          fetchPriority="high"
        />
        {/* The second word drops below 768px. At 375 the full wordmark plus the
            Join button overruns the bar and the two overlap.
            Live text, not baked into the logo image — already set in ivory
            (--jn-text) against --jn-bg, which is why it isn't switched here:
            it already clears the 4.5:1 floor by a wide margin (LV5-005 gate). */}
        <span className="v2-wordmark">
          Junoon<span className="v2-wordmark-tail"> Wellness</span>
        </span>
      </a>

      <div className="v2-nav-links" aria-label="Primary">
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="v2-link v2-nav-link jn-mono"
            data-active={isActive(link.href)}
            aria-current={isActive(link.href) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* LV5-002: the App Store badge replaces the "Pre-launch · 2026"
            pill + "Join waitlist" button that used to live here. */}
        <div className="v2-nav-cta">
          <AppStoreBadge size="nav" />
        </div>

        <button
          type="button"
          className="v2-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="v2-nav-sheet"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className="v2-nav-toggle-bars" data-open={menuOpen} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </nav>

    {/* LV5-030: was rendered INSIDE <nav>, which carries backdrop-filter
        (globals.css .v2-nav). A backdrop-filter ancestor becomes the
        containing block for fixed descendants, so this sheet's
        `position: fixed; inset: 0` resolved against the ~64px nav bar
        instead of the viewport - its dark background only ever painted
        that strip, and the links/badge overflowed uncovered down the page.
        Rendered as a sibling of <nav> now, so its containing block is the
        viewport again. State/props are unchanged; only its position in the
        tree moved. */}
    <div
      id="v2-nav-sheet"
      className="v2-nav-sheet"
      data-open={menuOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      // Kept mounted (not conditionally rendered) so the slide/fade
      // transition can play in both directions; inert when closed so its
      // links aren't tab-reachable behind the page.
      inert={!menuOpen}
    >
      <div className="v2-nav-sheet-links">
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="v2-link v2-nav-sheet-link"
            data-active={isActive(link.href)}
            aria-current={isActive(link.href) ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="v2-nav-sheet-cta">
        {/* Kush, 2026-08-23: a sage lotus closes the phone menu above the badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <Lotus size={22} />
        </div>
        <AppStoreBadge full size="nav" onClick={() => setMenuOpen(false)} />
      </div>
    </div>
    </>
  )
}
