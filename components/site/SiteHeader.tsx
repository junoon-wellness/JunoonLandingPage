import Image from 'next/image'
import Link from 'next/link'
import { APP_STORE_URL } from '@/lib/constants'
import { NAV_CTA } from '@/lib/landing-copy'
import ScrollState from '@/components/site/ScrollState'
import ThemeToggle from '@/components/site/ThemeToggle'

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
 * Light / Dark switch (ThemeToggle) beside the button. Styles: app/theme.css.
 */
const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Library', href: '/library' },
] as const

export default function SiteHeader({ current }: { current?: '/' | '/pricing' | '/about' | '/library' }) {
  return (
    <div className="jh jh-bar">
      <header className="swrap nav">
        <Link href="/" className="brand" aria-label="Junoon, home">
          <Image
            className="brand-icon"
            src="/brand/junoon-icon-96.png"
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            sizes="40px"
            priority
          />
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
          <ThemeToggle />
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
              {/* On phones the Light / Dark switch lives here, so the bar
                  keeps room for the name and the button. */}
              <div className="nav-menu-theme">
                <ThemeToggle />
              </div>
            </nav>
          </details>
        </div>
      </header>
      <ScrollState />
    </div>
  )
}
