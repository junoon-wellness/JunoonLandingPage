import Image from 'next/image'
import Link from 'next/link'
import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import HeroThread from '@/components/home/HeroThread'
import IPhoneFrame from '@/components/home/IPhoneFrame'
import SiteFooter from '@/components/site/SiteFooter'
import SiteHeader from '@/components/site/SiteHeader'
import InView from '@/components/home/InView'
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
  LIMBS,
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

/** Seven spokes and seven labels around the ring; Samadhi is the centre. */
const RING_SPOKES = [
  [50.0, 25.0, 50.0, 13.0],
  [69.5, 34.4, 78.9, 26.9],
  [74.4, 55.6, 86.1, 58.2],
  [60.8, 72.5, 66.1, 83.3],
  [39.2, 72.5, 33.9, 83.3],
  [25.6, 55.6, 13.9, 58.2],
  [30.5, 34.4, 21.1, 26.9],
]
/** Each label's angle from the top (degrees, clockwise); all sit 42% of the
 * ring's width from the centre (the same places as the mock-up's x/y). */
const RING_LABELS: [string, number][] = [
  ['Yama', 0],
  ['Niyama', 51.4],
  ['Asana', 102.9],
  ['Pranayama', 154.3],
  ['Pratyahara', 205.7],
  ['Dharana', 257.1],
  ['Dhyana', 308.6],
]
const RING_R = 42

/** Which entrance the ring plays (see app/home.css, "4b"). Kush's pick,
 * Mon 9 Nov 10:22 PM: 'orbit' ("Fan out like a clock"). 'sweep' is the
 * other one, kept so a switch back is this one line. */
const RING_VARIANT: 'sweep' | 'orbit' = 'orbit'

/** Round 2 (Kush, 9:30 call Tue 10 Nov: "a version of ... the fan one ...
 * rotating in a circle after it's been fanned out just slowly"): once the ring
 * has fanned out, the seven limbs and their spokes turn slowly round Samadhi,
 * the labels staying upright. `false` brings back the still ring. */
const RING_SPIN = true

function Tree({ className, size }: { className?: string; size: number }) {
  return (
    <Image
      className={className}
      src="/brand/junoon-tree-white-560.webp"
      alt=""
      aria-hidden="true"
      width={560}
      height={560}
      sizes={`${size}px`}
    />
  )
}


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

function LimbsRing() {
  return (
    <InView
      className="k-ring"
      data-variant={RING_VARIANT}
      data-spin={RING_SPIN || undefined}
      role="img"
      aria-label="The eight limbs of yoga in a ring, with Samadhi in the middle"
    >
      <div className="halo" />
      <div className="orb">
        <svg viewBox="0 0 100 100" className="spokes" aria-hidden="true">
          {RING_SPOKES.map(([x1, y1, x2, y2], i) => (
            <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </svg>
        {RING_LABELS.map(([name, angle], i) => (
          <span
            key={name}
            className="lb"
            style={{ '--a': `${angle}deg`, '--r': RING_R, '--i': i } as React.CSSProperties}
            aria-hidden="true"
          >
            <b>{name}</b>
          </span>
        ))}
      </div>
      <div className="centre" aria-hidden="true">
        <Tree size={64} />
        Samadhi
        <small>
          the number in the middle:
          <br />
          your Samadhi Score
        </small>
      </div>
    </InView>
  )
}

/* ── 10. Questions ───────────────────────────────────────────────────────── */

function FaqSection() {
  return (
    <section className="k-s alt" id="questions">
      <div className="swrap">
        <div className="k-prhead">
          <Tree className="k-treesm" size={92} />
          <div>
            <div className="k-eye">{FAQ_COPY.eyebrow}</div>
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

function LimbsFold() {
  return (
    <details className="k-fold">
      <summary>{LIMBS.heading}</summary>
      <p className="k-small">{LIMBS.body}</p>
      <div className="k-limbs">
        {LIMBS.items.map((l, i) => (
          <div key={l.name} className="k-limb">
            <span className="ln">{i + 1}</span>
            <b>{l.name}</b>
            <span className="lt">{l.body}</span>
          </div>
        ))}
      </div>
    </details>
  )
}

function JScorePoints() {
  return (
    <ul className="k-pts">
      {JSCORE.points.map(p => (
        <li key={p.title}>
          <b>{p.title}</b>
          {p.body ? <span>{p.body}</span> : null}
        </li>
      ))}
    </ul>
  )
}

/* A2. How it works: the 14 days, then the J Score and the limbs, one band. */
function HowItWorksSection() {
  return (
    <section className="k-s alt" id="how-it-works">
      <div className="swrap">
        {/* Arnav, 8:07 PM Sat 14 Nov: the "first 14 days" block is removed; the score block stays. */}
        <div className="hw-score">
          <LimbsRing />
          <div>
            <div className="k-eye">{JSCORE.eyebrow}</div>
            <h3 className="hw-h">{JSCORE.heading}</h3>
            <p className="k-lead">{JSCORE.body}</p>
            <JScorePoints />
            <LimbsFold />
          </div>
        </div>
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
    <section className="k-s" id="inside">
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
        {/* Learn's three articles sit under the row, always in view (they used
            to sit inside the last slide, which left an empty band under the
            row whenever that slide was off screen). */}
        <nav className="sr-links" aria-label={LEARN.heading}>
          {LEARN.articles.map(a => (
            <Link key={a.slug} href={`/library/${a.slug}`}>
              {a.title}
            </Link>
          ))}
        </nav>
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
        <HowItWorksSection />
        <InsideSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}
