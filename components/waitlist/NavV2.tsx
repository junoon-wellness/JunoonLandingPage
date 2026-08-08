'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * Scroll-aware chrome (spec §B1). Airy over the hero, tighter and more opaque
 * once you leave it, with a hairline that draws itself across the bottom.
 * Both states live in globals.css under `.v2-nav[data-scrolled]`; this
 * component only owns the boolean.
 */
const THRESHOLD = 24

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Read once on mount too: a reload partway down the page should open in
    // the scrolled state rather than waiting for the first scroll event.
    const update = () => setScrolled(window.scrollY > THRESHOLD)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <nav className="v2-nav" data-scrolled={scrolled}>
      <a href="#top" className="v2-link v2-nav-brand">
        {/* The badge carries "JUNOON" inside it, but at this size that text is
            illegible, so it reads as a tree emblem. The wordmark beside it does
            the naming work.

            96px source rather than the 2000x2000 original: this slot is 34px,
            and shipping a 2000px PNG for it was pure weight. */}
        <Image
          className="v2-nav-logo"
          src="/logo-turmeric-text-96.png"
          alt=""
          aria-hidden="true"
          width={96}
          height={96}
          sizes="34px"
          loading="eager"
          fetchPriority="high"
        />
        {/* The second word drops below 768px. At 375 the full wordmark plus the
            Join button overruns the bar and the two overlap. */}
        <span className="v2-wordmark">
          Junoon<span className="v2-wordmark-tail"> Wellness</span>
        </span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span
          className="nav-pill v2-pill jn-mono"
          style={{
            fontSize: '10px',
            letterSpacing: '0.14em',
            color: 'var(--jn-clay)',
            border: '0.5px solid rgba(181,82,42,0.35)',
            borderRadius: '100px',
            padding: '6px 14px',
            whiteSpace: 'nowrap',
          }}
        >
          Pre-launch · 2026
        </span>

        <a
          href="#join"
          className="v2-btn v2-link"
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 20px',
            minHeight: '38px',
            fontSize: '12px',
          }}
        >
          Join waitlist
        </a>
      </div>
    </nav>
  )
}
