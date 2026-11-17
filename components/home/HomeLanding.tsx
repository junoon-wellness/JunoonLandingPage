import Link from 'next/link'
import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import HeroThread from '@/components/home/HeroThread'
import IPhoneFrame from '@/components/home/IPhoneFrame'
import SiteFooter from '@/components/site/SiteFooter'
import SiteHeader from '@/components/site/SiteHeader'
import LimbsWheel from '@/components/home/LimbsWheel'
import ScreenRow from '@/components/home/ScreenRow'
import {
  CLASSES,
  COACH,
  FAQ_COPY,
  HERO_FINE,
  HERO_HEADLINE,
  INSIDE_LABEL,
  HERO_SUB,
  JSCORE,
  LEARN,
} from '@/lib/landing-copy'

/**
 * THE HOME PAGE, built to match the approved mock-up (Kush, Mon 9 Nov 2026):
 * junoon-team pages/mockups/landing-editable-1106.html, "Arjav's words, 8 Nov",
 * with its outlines and notes hidden. Same sections in the same order, same
 * drawings (the map of India with the Junoon tree, the drawn session player,
 * the ring of the eight limbs), same type and spacing. Styles: app/home.css.
 *
 * Round 2 (Kush, 9:30 call Tue 10 Nov): the drawn player became a rotating
 * gallery of real screens (HeroGallery), the map became a Pahari-miniature
 * drawing (IndiaMiniature), and the ring of the limbs turns slowly after it
 * fans out (RING_SPIN).
 *
 * The mock-up's section 8 (members' words) is left out on purpose: no member
 * quotes until real members give theirs (Kush, D1).
 *
 * Where the mock-up had a "picture goes here" box (live classes) this draws a
 * stand-in in the same style as the Day 14 ring, so the live
 * page never shows a placeholder.
 */

/* The ring of the limbs, its wheel and the one-limb box: components/home/LimbsWheel.tsx
   (option A, Arnav, Tue 17 Nov 2026). */


/* ── 1. The top ──────────────────────────────────────────────────────────── */

function TopSection() {
  return (
    <section className="h4 hx-top" id="top-section">
      <div className="h4-head">
        <h1>{HERO_HEADLINE}</h1>
        <p className="lede">{HERO_SUB}</p>
      </div>
      {/* Round 2 of the first screen (Kush, Fri 13 Nov): components/home/HeroThread.tsx.
          The round 1 map (IndiaMiniature) and gallery (HeroGallery) stay on disk. */}
      <HeroThread />
      <div className="h4-offer">
        <p className="fine">
          <b>{HERO_FINE.lead}</b> {HERO_FINE.rest}
        </p>
        <div className="ctas">
          <AppStoreBadge size="nav" />
          <Link href="/pricing" className="textlink">
            1 MONTH FREE
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── 10. Questions ───────────────────────────────────────────────────────── */

function FaqSection() {
  return (
    <section className="k-s alt" id="questions">
      <div className="swrap">
        <div className="k-prhead">
          <div>
            <h2>{FAQ_COPY.heading}</h2>
          </div>
        </div>
        <div className="k-two2">
          {FAQ_COPY.items.map(item => (
            <details key={item.q} className="k-faq">
              <summary>
                <h3>{item.q}</h3>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Condensed close (round 3, Fri 13 Nov 2026): Pricing and Download, merged ──
   Kush: "a little bit of a long scroll ... if it's not needed, condensing it
   down somewhere else". Pricing (9) and Download (11) said the same line
   twice ("Your first month is free, for everyone ..."), so the condensed page
   ends on ONE band: the founding offer, both prices, the App Store badge.
   Download's heading ("Start your free month.") is the one line dropped; the
   pricing heading says the same. Kush picked the merge at 7:18 PM; the two
   old sections are deleted. No words are new. */

/* A2. How it works: the 14 days, then the J Score and the limbs, one band. */
function HowItWorksSection() {
  return (
    <section className="k-s" id="how-it-works">
      <div className="swrap">
        {/* Arnav, 8:07 PM Sat 14 Nov: the "first 14 days" block is removed; the score block stays. */}
        {/* Option A (Arnav, Tue 17 Nov 2026): the fold of the eight limbs is gone; the
            ring's chips are buttons and one box under the paragraph explains the chosen limb. */}
        <LimbsWheel>
          <h3 className="hw-h">{JSCORE.heading}</h3>
          <p className="k-lead">
            {JSCORE.body}
            <br />
            <strong className="k-term" lang="sa">
              {JSCORE.bodyTerm}
            </strong>
            {JSCORE.bodySecond}
          </p>
        </LimbsWheel>
      </div>
    </section>
  )
}

/* A3. Inside the app: full-size screens the first screen does not show,
   each with the existing card words. */
const INSIDE_SLIDES: { src: string; alt: string; title: string; body: string; soon?: boolean }[] = [
  { src: '/landing/day1-coach-chat.jpg', alt: 'The coach chat on day one', title: COACH.heading, body: COACH.body },
  { src: '/landing/day-briefing.jpg', alt: 'The morning briefing: today’s plan', title: COACH.cards[1].title, body: COACH.cards[1].body },
  { src: '/landing/four-coaches.jpg', alt: 'Choosing your coach’s voice', title: COACH.cards[2].title, body: COACH.cards[2].body },
  { src: '/landing/library-appstore.jpg', alt: 'The class library', title: CLASSES.cards[0].title, body: CLASSES.cards[0].body },
  { src: '/landing/breathwork.jpg', alt: 'A breathwork session, mid breath', title: CLASSES.cards[1].title, body: CLASSES.cards[1].body },
  { src: '/landing/live-classes.jpg', alt: 'The live classes schedule', title: CLASSES.cards[2].title, body: CLASSES.cards[2].body, soon: true },
  { src: '/landing/learn-tab.jpg', alt: 'The Learn tab', title: LEARN.heading, body: LEARN.body },
]

function InsideSection() {
  return (
    <section className="k-s alt" id="inside">
      <div className="swrap">
        <div className="k-eye">{INSIDE_LABEL}</div>
        <ScreenRow label={INSIDE_LABEL}>
          {INSIDE_SLIDES.map(sl => (
            <figure key={sl.src} className="sr-slide">
              <IPhoneFrame src={sl.src} alt={sl.alt} sizes="240px" />
              <figcaption>
                <h3>
                  {sl.title}
                  {sl.soon ? <span className="k-soon">Coming soon</span> : null}
                </h3>
                <p>{sl.body}</p>
              </figcaption>
            </figure>
          ))}
        </ScreenRow>
      </div>
    </section>
  )
}

export default function HomeLanding() {
  return (
    <div className="jh jh-home jn-home-scale" id="top">
      <SiteHeader current="/" />
      <main>
        <TopSection />
        {/* Round 4, structure A (Kush's pick, 7:36 PM Fri 13 Nov) */}
        <InsideSection />
        {/* Arjav, Sun 15 Nov: the Samadhi Score section sits below Inside the app. */}
        <HowItWorksSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}
