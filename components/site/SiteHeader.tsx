import Link from 'next/link'
import { APP_STORE_URL } from '@/lib/constants'
import { NAV_CTA } from '@/lib/landing-copy'
import ScrollState from '@/components/site/ScrollState'

/**
 * THE ONE TOP BAR for every page (rework of Mon 9 Nov 2026: "redo the other
 * three pages accordingly, so it fits all in one theme"). It is the home
 * page's bar: the app's icon (the white banyan), "Junoon", four links and the
 * clay "Get the app" pill. Styles: app/home.css (`.jh .nav`), which the root
 * layout loads for every page.
 *
 * On phones the links fold into a small "Menu" (a native <details>, no
 * script), so About, Library and Pricing are one tap away on every page.
 *
 * Round 2 (Kush, Fri 13 Nov 2026: "header updated to feel premium like the new
 * hero"): sticky, frosted once the page scrolls (ScrollState), links in the
 * true centre with a small turmeric dot under the page you are on, and the
 * button. Dark only (Arnav, Sat 14 Nov 2026), so there is no theme switch. Styles: app/theme.css.
 */
const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
] as const

export default function SiteHeader({ current }: { current?: '/' | '/pricing' | '/about' | '/library' }) {
  return (
    <div className="jh jh-bar">
      <header className="swrap nav">
        <Link href="/" className="brand" aria-label="Junoon, home">
          {/* The banyan alone, no tile behind it (Kush, 6:54 PM Fri 13 Nov: "remove
              brown background so its just the tree transparent background all
              across"). Drawn as a mask so it takes the theme's ink (ivory). Styles: .brand-mark in app/theme.css. */}
          <span className="brand-mark" aria-hidden="true" />
          Junoon
        </Link>
        <nav className="links" aria-label="Primary">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} aria-current={current === l.href ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-end">
          <a href={APP_STORE_URL} className="cta">
            {NAV_CTA}
          </a>
          <details className="nav-menu">
            <summary aria-label="Menu">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </summary>
            <nav aria-label="Menu">
              {LINKS.map(l => (
                <Link key={l.href} href={l.href} aria-current={current === l.href ? 'page' : undefined}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <ScrollState />
    </div>
  )
}
