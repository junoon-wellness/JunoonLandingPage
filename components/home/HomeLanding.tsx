import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import HeroGallery from '@/components/home/HeroGallery'
import IndiaMiniature from '@/components/home/IndiaMiniature'
import IPhoneFrame from '@/components/home/IPhoneFrame'
import SiteFooter from '@/components/site/SiteFooter'
import SiteHeader from '@/components/site/SiteHeader'
import InView from '@/components/home/InView'
import {
  CLASSES,
  COACH,
  DOWNLOAD,
  FAQ_COPY,
  FEATURES,
  HERO_CHIPS,
  HERO_FINE,
  HERO_HEADLINE,
  HERO_MAP,
  HERO_SUB,
  JSCORE,
  LEARN,
  LIMBS,
  PRICING,
  TWO_WEEKS,
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

/** The five labels around the map (round 2, Kush, 9:30 call Tue 10 Nov: "put
 * the asanas, pranayam, real Indian instructors, eight limbs, and ancient texts
 * around that image"), in HERO_CHIPS order, each with a small line drawing.
 * Positions are the `.c0`..`.c4` classes in app/home.css. */
const CHIP_ICONS: React.ReactNode[] = [
  // Asana: a standing pose, arms joined overhead
  <svg key="asana" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="7.5" r="2" />
    <path d="M12 9.5v6.5M12 16l-2.5 5M12 13l3.5 1.5-3.5 1.5M10.5 6 12 1.5 13.5 6" />
  </svg>,
  // Pranayama: the breath, three soft waves
  <svg key="pranayama" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 13c3-3 6 3 9 0s6 3 9 0M3 18c3-3 6 3 9 0s6 3 9 0" />
  </svg>,
  // Ancient texts: a palm-leaf manuscript
  <svg key="texts" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2.5" y="7" width="19" height="10" rx="3" />
    <path d="M6 10.5h9M6 13.5h12" />
    <circle cx="18.5" cy="10.5" r=".6" />
  </svg>,
  // Real Indian instructors: our teachers' own photos (see INSTRUCTOR_FACES)
  null,
  // Patanjali's 8 limbs: a wheel of eight spokes
  <svg key="limbs" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3v7M12 14v7M3 12h7M14 12h7M5.6 5.6l5 5M13.4 13.4l5 5M18.4 5.6l-5 5M10.6 13.4l-5 5" />
  </svg>,
]

/** Three of the teachers on the About page, by their real photos. */
const INSTRUCTOR_FACES = ['/instructors/divya-head.jpg', '/instructors/amman-head-v2.jpg', '/instructors/shoam-head.jpg']

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

/** The J Score card's drawn bars (lengths are illustrative, as in the mock-up). */
const SCORE_BARS: [string, number][] = [
  ['Yama', 62],
  ['Niyama', 48],
  ['Asana', 80],
  ['Pranayama', 70],
  ['Pratyahara', 35],
  ['Dharana', 55],
  ['Dhyana', 44],
]

function Tree({ className, size }: { className?: string; size: number }) {
  return (
    <Image
      className={className}
      src="/landing/junoon-tree.png"
      alt=""
      aria-hidden="true"
      width={506}
      height={520}
      sizes={`${size}px`}
    />
  )
}


/* ── 1. The top ──────────────────────────────────────────────────────────── */

function TopSection() {
  return (
    <section className="h4" id="top-section">
      <div className="h4-head">
        <h1>{HERO_HEADLINE}</h1>
        <p className="lede">{HERO_SUB}</p>
      </div>
      <div className="h4-stage">
        <div className="h4-roots">
          <IndiaMiniature />
          {HERO_CHIPS.map((chip, i) => (
            <span key={chip} className={`h4-chip c${i}`}>
              {CHIP_ICONS[i] ?? (
                <span className="h4-faces" aria-hidden="true">
                  {INSTRUCTOR_FACES.map(src => (
                    <Image key={src} src={src} alt="" width={44} height={44} sizes="22px" />
                  ))}
                </span>
              )}
              {chip}
            </span>
          ))}
          <p className="h4-cap">
            {HERO_MAP.caption}
            <small>{HERO_MAP.captionSmall}</small>
          </p>
        </div>
        <div className="h4-bridge" aria-hidden="true">
          <span className="h4-lbl">{HERO_MAP.bridge}</span>
          <svg viewBox="0 0 150 120">
            <path d="M6 70 C40 20 100 20 138 62" fill="none" stroke="#C4724A" strokeWidth="2.4" strokeDasharray="2 7" strokeLinecap="round" />
            <path d="M126 50 L140 64 L122 70" fill="none" stroke="#C4724A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <HeroGallery features={FEATURES} />
      </div>
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

/* ── 2. Your first two weeks ─────────────────────────────────────────────── */

function TwoWeeksSection() {
  // Full-screen captures from the staging app (Mon 9 Nov night, test logins
  // renamed Rohan and Arjun), so they fill the frame like every other phone.
  const pics = [
    { src: '/landing/day1-coach-chat.jpg', alt: 'The coach chat on day one' },
    { src: '/landing/day2-session.jpg', alt: 'A session playing' },
  ]
  return (
    <section className="k-s alt" id="two-weeks">
      <div className="swrap">
        <div className="k-eye">{TWO_WEEKS.eyebrow}</div>
        <h2>{TWO_WEEKS.heading}</h2>
        <div className="k-path" aria-hidden="true">
          <b className="first" />
          {Array.from({ length: 13 }, (_, i) => (
            <Fragment key={i}>
              <i />
              <b className={i === 12 ? 'big' : undefined} />
            </Fragment>
          ))}
        </div>
        <div className="k-days">
          {TWO_WEEKS.days.map((d, i) => (
            <div key={d.label} className="k-dcard">
              <div className="tp">
                <div className="num">{d.label}</div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
              <div className="pic phone">
                {i < 2 ? (
                  <IPhoneFrame src={pics[i].src} alt={pics[i].alt} sizes="214px" />
                ) : (
                  <IPhoneFrame alt="Your J Score on day 14">
                    <div className="ds">
                      <div className="k-mini">
                        J Score<small>day 14</small>
                      </div>
                    </div>
                  </IPhoneFrame>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 3. Meet your coach ──────────────────────────────────────────────────── */

function CoachSection() {
  return (
    <section className="k-s" id="coach">
      <div className="swrap k-two">
        <div>
          <div className="k-eye">{COACH.eyebrow}</div>
          <h2>{COACH.heading}</h2>
          <p className="k-lead">{COACH.body}</p>
          <div className="k-ev4">
            {COACH.cards.map(c => (
              <div key={c.title} className="k-ev">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="k-picside">
          <div className="k-phones">
            <IPhoneFrame src="/landing/coach-chat.jpg" alt="The coach chat" sizes="236px" />
            <IPhoneFrame src="/landing/coach-voices.jpg" alt="The evening reflection with the coach" sizes="236px" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 4. The eight limbs ──────────────────────────────────────────────────── */

function LimbsSection() {
  return (
    <section className="k-s alt" id="eight-limbs">
      <div className="swrap k-limbs2">
        <div>
          <InView
            className="k-ring"
            data-variant={RING_VARIANT}
            data-spin={RING_SPIN || undefined}
            role="img"
            aria-label="The eight limbs of yoga in a ring, with Samadhi, your J Score, in the middle"
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
                your J Score
              </small>
            </div>
          </InView>
        </div>
        <div>
          <div className="k-eye">{LIMBS.eyebrow}</div>
          <h2>{LIMBS.heading}</h2>
          <p className="k-lead">{LIMBS.body}</p>
          <div className="k-limbs">
            {LIMBS.items.map((l, i) => (
              <div key={l.name} className="k-limb">
                <span className="ln">{i + 1}</span>
                <b>{l.name}</b>
                <span className="lt">{l.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 5. Your J Score ─────────────────────────────────────────────────────── */

function JScoreSection() {
  return (
    <section className="k-s" id="j-score">
      <div className="swrap k-two">
        <div>
          <div className="k-eye">{JSCORE.eyebrow}</div>
          <h2>{JSCORE.heading}</h2>
          <p className="k-lead">{JSCORE.body}</p>
          <ul className="k-pts">
            {JSCORE.points.map(p => (
              <li key={p.title}>
                <b>{p.title}</b>
                {p.body ? <span>{p.body}</span> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="k-picside">
          <InView className="k-score" role="img" aria-label="The J Score card: one ring, with a bar for each limb">
            <div className="ringbig">
              <span>J Score</span>
            </div>
            <div className="bars">
              {SCORE_BARS.map(([name, w], i) => (
                <div key={name} className="k-b">
                  <span>{name}</span>
                  <i style={{ width: `${w}%`, '--i': i } as React.CSSProperties} />
                </div>
              ))}
            </div>
          </InView>
        </div>
      </div>
    </section>
  )
}

/* ── 6. Classes and breathwork ───────────────────────────────────────────── */

function ClassesSection() {
  return (
    <section className="k-s alt" id="classes">
      <div className="swrap">
        <div className="k-eye">{CLASSES.eyebrow}</div>
        <h2>{CLASSES.heading}</h2>
        <p className="k-lead">{CLASSES.body}</p>
        <div className="k-days">
          {CLASSES.cards.map((c, i) => (
            <div key={c.title} className="k-dcard">
              <div className="tp">
                <h3>{c.title}</h3>
                {c.soon ? <span className="k-soon">Coming soon</span> : null}
                <p>{c.body}</p>
              </div>
              <div className="pic phone">
                {i === 0 ? (
                  <IPhoneFrame src="/landing/class-library.jpg" alt="The class library" sizes="214px" />
                ) : i === 1 ? (
                  <IPhoneFrame src="/landing/breathwork.jpg" alt="A breathwork session, mid-breath" sizes="214px" />
                ) : (
                  <IPhoneFrame alt="Live classes, coming soon">
                    <div className="ds">
                      <div className="k-mini">
                        Live<small>coming soon</small>
                      </div>
                    </div>
                  </IPhoneFrame>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 7. Learn ────────────────────────────────────────────────────────────── */

function LearnSection() {
  return (
    <section className="k-s" id="learn">
      <div className="swrap k-two">
        <div>
          <div className="k-eye">{LEARN.eyebrow}</div>
          <h2>{LEARN.heading}</h2>
          <div className="k-arts">
            {LEARN.articles.map(a => (
              <Link key={a.slug} href={`/library/${a.slug}`} className="k-row">
                <div className="kind">{a.kind}</div>
                <h3>{a.title}</h3>
                <div className="kind">{a.line}</div>
              </Link>
            ))}
          </div>
          <p className="k-small">{LEARN.body}</p>
        </div>
        <div className="k-picside">
          <IPhoneFrame src="/landing/learn-tab.jpg" alt="The Learn tab" sizes="250px" />
        </div>
      </div>
    </section>
  )
}

/* ── 9. Pricing (8, members' words, is left out: Kush, D1) ───────────────── */

function PricingSection() {
  return (
    <section className="k-s" id="pricing">
      <div className="swrap">
        <div className="k-prhead">
          <div className="k-badge">
            <Tree size={48} />
            <span>
              Founding
              <br />
              member
            </span>
          </div>
          <div>
            <div className="k-eye">{PRICING.eyebrow}</div>
            <h2>{PRICING.heading}</h2>
            <p className="k-lead">{PRICING.body}</p>
          </div>
        </div>
        <div className="k-three3">
          {PRICING.plans.map(p => (
            <div key={p.name} className="k-plan">
              <h3>{p.name}</h3>
              <p className="k-price">{p.price}</p>
              <p>{p.included}</p>
            </div>
          ))}
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

/* ── 11. Download, 12. Footer ────────────────────────────────────────────── */

function DownloadSection() {
  return (
    <section className="k-s offer" id="download">
      <div className="swrap k-offer">
        <Tree className="k-treesm" size={92} />
        <div className="k-grow">
          <h2>{DOWNLOAD.heading}</h2>
          <p>{DOWNLOAD.body}</p>
        </div>
        <div className="k-store">
          <AppStoreBadge size="nav" />
        </div>
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
        <TwoWeeksSection />
        <CoachSection />
        <LimbsSection />
        <JScoreSection />
        <ClassesSection />
        <LearnSection />
        <PricingSection />
        <FaqSection />
        <DownloadSection />
      </main>
      <SiteFooter />
    </div>
  )
}
