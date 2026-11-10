import Image from 'next/image'
import Link from 'next/link'
import { FOOTER_LEGAL } from '@/lib/landing-copy'

/**
 * THE ONE FOOTER for every page (rework of Mon 9 Nov 2026), moved out of the
 * home page so About, Pricing, Library and the articles share it. Styles:
 * app/home.css (`.jh .k-footer`), loaded for every page by the root layout.
 */
const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/junoonwellness/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@junoonwellness',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.5 3c.3 2.3 1.7 3.9 4 4.1v3.2c-1.5 0-2.8-.4-4-1.2v6.1c0 3.6-2.6 5.8-5.6 5.8-3.1 0-5.4-2.4-5.4-5.4 0-3.3 2.8-5.7 6.3-5.3v3.3c-1.6-.4-3.1.6-3.1 2.1 0 1.2 1 2.2 2.2 2.2 1.4 0 2.4-.9 2.4-2.8V3h3.2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/junoon-wellness/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="5" r="2.2" />
        <path d="M10 9h3.8v1.7c.6-1 1.9-2 3.9-2 3.2 0 4.3 2 4.3 5.3V21h-4v-6.2c0-1.6-.3-2.8-1.9-2.8-1.7 0-2.1 1.2-2.1 2.8V21h-4z" />
      </svg>
    ),
  },
]

export default function SiteFooter() {
  return (
    <div className="jh">
    <footer className="k-s k-footer">
      <div className="swrap k-foot">
        <div>
          <p>{FOOTER_LEGAL}</p>
        </div>
        <div className="k-fl">
          <Image className="brand-icon" src="/brand/junoon-icon-96.png" alt="" aria-hidden="true" width={96} height={96} sizes="36px" />
          <div className="k-soc">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          {/* /privacy, /terms and /contact are required: App Store review
              and the app's support URL point at them. About and Library stay
              here too (Kush's yes, Mon 9 Nov 5:05 PM). */}
          <nav className="k-flinks" aria-label="More pages, legal and contact">
            <Link href="/about">About</Link>
            <Link href="/library">Library</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://www.instagram.com/junoonwellness/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
    </div>
  )
}
