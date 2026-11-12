import Image from 'next/image'
import Link from 'next/link'
import { APP_STORE_URL } from '@/lib/constants'
import { NAV_CTA } from '@/lib/landing-copy'

/**
 * THE ONE TOP BAR for every page (rework of Mon 9 Nov 2026: "redo the other
 * three pages accordingly, so it fits all in one theme"). It is the home
 * page's bar: the app's icon (the white banyan), "Junoon", four links and the
 * clay "Get the app" pill. Styles: app/home.css (`.jh .nav`), which the root
 * layout loads for every page.
 *
 * On phones the links fold into a small "Menu" (a native <details>, no
 * script), so About, Library and Pricing are one tap away on every page.
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
    </div>
  )
}
