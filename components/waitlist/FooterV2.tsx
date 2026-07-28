/**
 * ⚠️ The legal + contact links below are NOT optional decoration.
 *
 * /privacy and /terms are required for App Store review and privacy
 * compliance, and /contact is registered as the app's App Store support URL.
 * The previous version of this page carried all three; do not drop them.
 */
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

const linkStyle: React.CSSProperties = {
  fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
}

export default function FooterV2() {
  return (
    <footer
      className="v2-footer"
      style={{ position: 'relative', zIndex: 2, background: '#1C1410' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#D4A96A',
          }}
        >
          Junoon Wellness
        </span>
        <span
          style={{
            fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: '#93826F',
          }}
        >
          © {new Date().getFullYear()} Junoon Wellness. All rights reserved.
        </span>
      </div>

      <div
        className="v2-footer-right"
        style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
      >
        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
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
