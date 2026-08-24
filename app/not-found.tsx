import Link from 'next/link'
import NavV2 from '@/components/waitlist/NavV2'
import FooterV2 from '@/components/waitlist/FooterV2'
import Lotus from '@/components/brand/Lotus'

/**
 * LV5-048 — branded 404. Next renders this for any route that resolves to
 * nothing (or calls notFound()), replacing Next's stark white default —
 * the site's dark jaali layout wrapped that default page but never
 * restyled it, so a wrong URL still landed on a plain white error screen.
 *
 * Server component, no metadata export: Next already marks the generated
 * 404 response noindex itself (VERIFIED live on the old default page), so
 * there's nothing extra to set here.
 *
 * Headline copy below is a DRAFT, not final — one line, written in the
 * site's voice. Flag for Kush's review rather than treat as locked.
 */
export default function NotFound() {
  return (
    <div id="top">
      <NavV2 />

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '560px',
          margin: '0 auto',
          padding: '160px 24px 140px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Lotus size={28} />

        <div
          className="jn-mono"
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--jn-text-faint)',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(30px, 4vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: 'var(--jn-text)',
            margin: 0,
          }}
        >
          This page wandered off.
        </h1>

        <p
          style={{
            fontSize: '15px',
            fontWeight: 300,
            color: 'var(--jn-text-soft)',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          The address you followed doesn&apos;t match anything here — try one of these instead.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '28px',
            marginTop: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link href="/" className="v2-link lb-app-link">
            ← Back home
          </Link>
          <Link href="/library" className="v2-link lb-app-link">
            Browse the Library →
          </Link>
        </div>
      </main>

      <FooterV2 />
    </div>
  )
}
