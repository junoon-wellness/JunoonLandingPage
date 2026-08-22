import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

/**
 * The interactive app walkthrough (spec §B7).
 *
 * The artifact is a self-contained single-file export (inline CSS + JS) that
 * ships with three siblings it loads by relative path: `support.js`, the
 * `_ds/` bundle shim, and `assets/junoon-mark.png`. All four live under
 * `public/tour-embed/`, copied verbatim from
 *
 *   ~/Desktop/Junoon/Junoon App UI Rebrand/Junoon UI Overhaul V06_/
 *
 * ⚠️ COPIED, never edited. That folder is not version-controlled and the V05
 * sibling folder next to it is the outdated build. To update the tour, re-copy
 * from V06 rather than hand-patching public/tour-embed.
 *
 * It renders in an iframe rather than being inlined so its global CSS and its
 * own font loading cannot collide with the site's.
 */

export const metadata: Metadata = {
  title: 'Junoon - App Walkthrough',
  description: 'Walk through the Junoon app before it launches.',
  // Off the index until launch. This is Kush's call to lift at review time.
  robots: { index: false, follow: false },
}

export default function TourPage() {
  return (
    <div className="jn-tour-page">
      <header className="jn-tour-header">
        <Link
          href="/"
          className="v2-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/logo-clay-text-96.png"
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            sizes="28px"
            style={{ height: '28px', width: '28px' }}
            loading="eager"
          />
          <span className="v2-wordmark" style={{ fontSize: '15px' }}>
            Junoon Wellness
          </span>
        </Link>

        <Link
          href="/"
          className="v2-link jn-mono"
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--jn-mute)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
          }}
        >
          ← Back to junoonwellness.com
        </Link>
      </header>

      <iframe
        className="jn-tour-frame"
        src="/tour-embed/index.html"
        title="Junoon app walkthrough"
      />
    </div>
  )
}
