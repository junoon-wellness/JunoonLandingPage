'use client'

import Image from 'next/image'
import Link from 'next/link'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { SCREENS, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/lib/screens'

/**
 * The band between the scroll story and the offer (spec §B6): one line, one
 * strong CTA, and a fanned strip of three frames so the link reads as leading
 * somewhere rather than as another button.
 */
const STRIP = [SCREENS.planTab, SCREENS.coachPicks, SCREENS.breathworkSession]

/** Desktop width. Below 768px the CSS overrides `--teaser-frame-w`. */
const FRAME_W = 104

export default function WalkthroughTeaser() {
  return (
    <section className="jn-teaser">
      <RevealGroup style={{ position: 'relative', zIndex: 1 }}>
        <RevealItem className="eyebrow" style={{ marginBottom: '18px' }}>
          The full tour
        </RevealItem>

        <RevealItem
          as="h2"
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(28px, 3.2vw, 42px)',
            fontWeight: 400,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: 'var(--jn-text)',
            marginBottom: '16px',
          }}
        >
          Walk through the whole app,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>
            before it launches.
          </em>
        </RevealItem>

        <RevealItem
          as="p"
          style={{
            fontSize: '15px',
            fontWeight: 300,
            color: 'var(--jn-text-dim)',
            lineHeight: 1.75,
            maxWidth: '440px',
            marginBottom: '28px',
          }}
        >
          Every screen, in order, at your own pace. No signup, no download, nothing to install.
        </RevealItem>

        <RevealItem>
          <Link href="/tour" className="jn-tour-cta">
            <span>Take the tour</span>
            <span className="jn-tour-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </RevealItem>
      </RevealGroup>

      <Reveal className="jn-teaser-strip" y={26} delay={0.12} amount={0.3}>
        {STRIP.map(s => (
          <div
            key={s.src}
            className="jn-teaser-frame"
            /*
              Read as a var with the desktop size as the FALLBACK — never
              set inline. Three fixed 104px frames plus two gaps is 328px,
              which does not fit a 320px screen; declaring the property
              inline would make that unfixable from CSS. See the note in
              PhoneFrame.tsx.
            */
            style={{
              width: `var(--teaser-frame-w, ${FRAME_W}px)`,
              aspectRatio: `${SCREEN_WIDTH} / ${SCREEN_HEIGHT}`,
            }}
          >
            <Image
              src={s.src}
              alt=""
              aria-hidden="true"
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              sizes="110px"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </Reveal>
    </section>
  )
}
