/**
 * ⚠️ The legal + contact links below are NOT optional decoration.
 *
 * /privacy and /terms are required for App Store review and privacy
 * compliance, and /contact is registered as the app's App Store support URL.
 * The previous version of this page carried all three; do not drop them.
 */
import Link from 'next/link'

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/junoonwellness/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@junoonwellness' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/junoon-wellness/' },
]

// LV5-074: the footer links are plain sentence-case text now; the tiny
// spaced capitals in the code font were one of the scope's "reads like a
// template" items. 44px tap height kept.
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
}

export default function FooterV2() {
  return (
    <footer className="v2-footer">
      {/* LV5-074: the toran divider that sat above every footer is retired
          (Kush, 27 Sep: "August picks: Retire all four"). */}
      <div className="v2-footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          className="v2-footer-wordmark"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: 'var(--font-cormorant), serif',
          }}
        >
          Junoon Wellness
        </span>
        {/* LV5-073: the company is a Delaware LLC (confirmed by Arjav, 26 Sep). */}
        <span className="v2-footer-fine">
          © {new Date().getFullYear()} Junoon Wellness LLC. All rights reserved.
        </span>
        {/* LV5-002: the ways to keep up with Junoon now that signing up isn't
            the only route in. */}
        <span className="v2-footer-fine">
          Follow along on{' '}
          <a
            href="https://www.instagram.com/junoonwellness/"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-link v2-footer-link"
          >
            Instagram
          </a>{' '}
          or{' '}
          <Link href="/library#join" className="v2-link v2-footer-link">
            join the newsletter
          </Link>
        </span>
      </div>

      <div
        className="v2-footer-right v2-footer-nav"
        style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
      >
        <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {legalLinks.map(l => (
            <a key={l.label} href={l.href} className="v2-link v2-footer-link" style={linkStyle}>
              {l.label}
            </a>
          ))}
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="v2-link v2-footer-link"
              style={linkStyle}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
