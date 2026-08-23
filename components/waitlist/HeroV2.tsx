'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, transform, useScroll, useTransform } from 'framer-motion'
import DeviceCarousel from './DeviceCarousel'
import Jaali from '@/components/brand/Jaali'

/**
 * LV5-021 (c). A jaali PANEL behind the phone, never a page texture.
 *
 * Kush chose solid dark pages (LV5-018 took the ambient ground radials back
 * off this hero), so the lattice is scoped to the device column and bleeds
 * only a little past it. Its vignette dissolves the panel's rectangular edges
 * into --jn-bg, which is why the lattice and the vignette are one decision
 * rather than two (poster spec D3).
 *
 * Set to false and the hero is exactly what LV5-018 shipped.
 */
const HERO_JAALI = true

interface HeroV2Props {
  source: string
  claimed: number
  isFlashing: boolean
  onSignupSuccess: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Entrance staircase, moved off the old `.fade-up .delay-N` CSS classes onto
 * framer variants (spec §B2). Same feel, tighter timings, and the delays are
 * now one number in one place instead of five hand-numbered classes.
 *
 * Reduced motion is neutralised by `.jn-reveal` in globals.css.
 */
const container = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.085, delayChildren: 0.05 } },
}

const step = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.66, ease: EASE } },
}

export default function HeroV2({ source, claimed, isFlashing, onSignupSuccess }: HeroV2Props) {
  const sectionRef = useRef<HTMLElement>(null)

  // Phone parallax: it travels slower than the copy as the hero leaves. A few
  // px only, enough to read as depth rather than as a moving element.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Function form, not the (value, inputRange, outputRange) form: see the
  // warning at the top of components/story/ScrollStory.tsx for why the array
  // form is not trustworthy for scroll-linked values in framer-motion 12.
  const phoneY = useTransform(scrollYProgress, transform([0, 1], [0, 64]))

  return (
    <section
      ref={sectionRef}
      // LV5-018 (Kush ruling, reversing LV5-001): the site goes to one flat
      // --jn-bg everywhere for consistency with /pricing, /about, /library —
      // `noise-bg drift-bg` (the ambient ground radials) came back off the
      // hero. `.v2-device-glow` behind the phone carousel is untouched; it's
      // the phone's own glow, not the page ground.
      className="v2-hero"
      style={{ overflow: 'hidden' }}
    >
      {/* Faint engineering grid replaces the old 720px yantra motif */}
      <div className="v2-grid" aria-hidden="true" />

      {/* ── Left: the pitch and the action ──
          On mobile this wrapper becomes `display: contents` so its children
          promote to grid items and the carousel can be ordered in between the
          paragraph and the form. See .v2-hero-copy in globals.css.

          `display: contents` is also why the stagger container has to be a
          plain div with variants rather than a motion wrapper with padding:
          it must not introduce a box of its own. */}
      <motion.div
        className="v2-hero-copy"
        style={{ position: 'relative', zIndex: 2, maxWidth: '560px' }}
        variants={container}
        initial="hidden"
        animate="shown"
      >
        <motion.div
          className="v2-hero-eyebrow eyebrow jn-reveal"
          style={{ marginBottom: '26px' }}
          variants={step}
        >
          Now on the App Store
        </motion.div>

        <motion.h1
          className="v2-hero-headline jn-reveal"
          variants={step}
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: '-0.015em',
            color: 'var(--jn-text)',
            marginBottom: '22px',
          }}
        >
          Wellness rooted in{' '}
          {/* The italic clause settles a beat after the line lands: it opens
              slightly tracked-out and closes to its resting letter-spacing. */}
          <motion.em
            className="jn-reveal"
            style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)', display: 'inline-block' }}
            initial={{ opacity: 0, letterSpacing: '0.08em' }}
            animate={{ opacity: 1, letterSpacing: '-0.015em' }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          >
            where you&apos;re from.
          </motion.em>
        </motion.h1>

        <motion.p
          className="v2-hero-sub jn-reveal"
          variants={step}
          style={{
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--jn-text-dim)',
            maxWidth: '460px',
            marginBottom: '32px',
          }}
        >
          A modern wellness platform built for the South Asian diaspora. Live classes, on-demand
          content, and an AI Coach that personalises your practice, grounded in the traditions you
          grew up around.
        </motion.p>

        {/* LV5-018: replaces the App Store badge + "500 founder spots ·
            first month free · see pricing" line. Kush's review on the first
            full preview: that empty space under the sub-copy should carry a
            condensed version of the offer band + founder quote instead, so
            the two full-width sections lower on the page (OfferBandV2,
            FounderBlockV2) could come out entirely. Same copy, same photo,
            same quote — just tight enough to sit in the hero. The App Store
            CTA itself isn't lost: the nav badge and the /pricing card both
            still carry it. */}
        <motion.div className="v2-hero-offer jn-reveal" variants={step}>
          <div className="eyebrow no-rule">Founding member offer</div>
          <p className="v2-hero-offer-headline">
            First 500 members.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>
              Permanent pricing.
            </em>
          </p>
          <p className="v2-hero-offer-body">First month free, then $8.99 a month for life.</p>
          <Link href="/pricing" className="v2-link v2-hero-offer-link">
            See pricing →
          </Link>
        </motion.div>

        <motion.div className="v2-hero-founder jn-reveal" variants={step}>
          <div className="v2-hero-founder-photo">
            {/* Same crop OfferBandV2's sibling FounderBlockV2 uses. */}
            <Image
              src="/arjav-photo.jpg"
              alt="Arjav, founder of Junoon Wellness"
              width={112}
              height={112}
              sizes="56px"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div>
            {/* Verbatim, same quote as FounderBlockV2. Whether this wraps to
                more than 3 lines at the hero's ~420px column can only be
                confirmed in a real browser (machine rules for this round
                forbid a dev server / screenshots), so the full quote ships
                as-is rather than guessing at a cut — flagged in the build
                report for a visual check. */}
            <p className="v2-hero-founder-quote">
              &ldquo;I spent years watching South Asian clients try platforms that just
              didn&apos;t speak to them. Junoon is what I wish existed when I started
              coaching.&rdquo;
            </p>
            <p className="v2-hero-founder-name">Arjav · Founder, Junoon Wellness</p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right: the actual product, cycling through the real app screens ──
          Two wrappers on purpose. The outer one is bound to the scroll motion
          value; the inner one runs the entrance. Putting both on one element
          would have `animate: { y: 0 }` seize the same motion value the
          parallax is driving, and the scroll binding would go dead after the
          entrance finished. */}
      <motion.div className="v2-devices jn-reveal" style={{ y: phoneY }}>
        {/*
          Bleeds past the column so the vignette has room to fade before the
          panel's own edge. It rides the same parallax as the phone on
          purpose - panel and device read as one object rather than as a
          backdrop the phone slides across.

          The explicit z-indexes are not decoration. A `position: absolute`
          layer with `z-index: 0` establishes a stacking context and would
          otherwise paint over the in-flow carousel beside it, putting the
          lattice in FRONT of the phone.
        */}
        {HERO_JAALI && <Jaali variant="panel" inset="-5% -7%" radius={12} zIndex={0} />}
        <motion.div
          className="jn-reveal"
          style={{ position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
        >
          <DeviceCarousel />
        </motion.div>
      </motion.div>
    </section>
  )
}
