import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AppStoreBadge from '@/components/waitlist/AppStoreBadge'
import { APP_STORE_URL } from '@/lib/constants'
import { INDIA_MAP_PATH } from '@/lib/india-map'
import {
  CLASSES,
  COACH,
  DOWNLOAD,
  FAQ_COPY,
  FEATURES,
  FOOTER_LEGAL,
  HERO_CHIPS,
  HERO_FINE,
  HERO_HEADLINE,
  HERO_MAP,
  HERO_SUB,
  JSCORE,
  LEARN,
  LIMBS,
  NAV_CTA,
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
 * The mock-up's section 8 (members' words) is left out on purpose: no member
 * quotes until real members give theirs (Kush, D1).
 *
 * Where the mock-up had a "picture goes here" box (breathwork, live classes)
 * this draws a stand-in in the same style as the Day 14 ring, so the live
 * page never shows a placeholder.
 */

/** The five pins around the map, positions as in the mock-up. */
const CHIP_POS: React.CSSProperties[] = [
  { top: '6%', left: '4%' },
  { top: '22%', right: 0 },
  { top: '46%', left: '-6%' },
  { top: '60%', right: 0 },
  { top: '76%', left: '8%' },
]

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
const RING_LABELS: [string, number, number][] = [
  ['Yama', 50.0, 8.0],
  ['Niyama', 82.8, 23.8],
  ['Asana', 90.9, 59.3],
  ['Pranayama', 68.2, 87.8],
  ['Pratyahara', 31.8, 87.8],
  ['Dharana', 9.1, 59.3],
  ['Dhyana', 17.2, 23.8],
]

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

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/junoonwellness/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@junoonwellness',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.5 3c.3 2.3 1.7 3.9 4 4.1v3.2c-1.5 0-2.8-.4-4-1.2v6.1c0 3.6-2.6 5.8-5.6 5.8-3.1 0-5.4-2.4-5.4-5.4 0-3.3 2.8-5.7 6.3-5.3v3.3c-1.6-.4-3.1.6-3.1 2.1 0 1.2 1 2.2 2.2 2.2 1.4 0 2.4-.9 2.4-2.8V3h3.2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/junoon-wellness/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="5" r="2.2" />
        <path d="M10 9h3.8v1.7c.6-1 1.9-2 3.9-2 3.2 0 4.3 2 4.3 5.3V21h-4v-6.2c0-1.6-.3-2.8-1.9-2.8-1.7 0-2.1 1.2-2.1 2.8V21h-4z" />
      </svg>
    ),
  },
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

/** A real app screen inside a drawn phone. */
function PhoneShot({ src, alt, tall = false }: { src: string; alt: string; tall?: boolean }) {
  return (
    <div className="k-phone">
      <div className={tall ? 'scr tall' : 'scr'}>
        <Image src={src} alt={alt} width={330} height={717} sizes="228px" />
      </div>
    </div>
  )
}

/* ── 1. The top ──────────────────────────────────────────────────────────── */

function DrawnPlayer() {
  return (
    <div className="h4-phone" aria-label="The Junoon session player, drawn" role="img">
      <div className="h4-screen">
        <div className="h4-island" />
        <div className="h4-video">
          <div className="h4-top">
            <span className="h4-pill">Evening wind-down</span>
            <span className="h4-pill">With Anjali</span>
          </div>
          <svg viewBox="0 0 270 312" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <circle cx="135" cy="150" r="96" fill="#E8B870" opacity=".12" />
            <circle cx="135" cy="150" r="64" fill="#E8B870" opacity=".14" />
            <circle cx="135" cy="128" r="17" fill="#F5F0E8" />
            <path d="M135 148 C112 150 104 176 106 206 L164 206 C166 176 158 150 135 148 Z" fill="#F5F0E8" />
            <path d="M88 214 C108 198 162 198 182 214 C170 224 100 224 88 214 Z" fill="#F5F0E8" />
            <path d="M108 170 C96 184 98 198 116 204" stroke="#F5F0E8" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M162 170 C174 184 172 198 154 204" stroke="#F5F0E8" strokeWidth="9" fill="none" strokeLinecap="round" />
            <rect x="40" y="226" width="190" height="4" rx="2" fill="#C4724A" opacity=".7" />
          </svg>
        </div>
        <div className="h4-body">
          <div className="h4-kick">Nadi shodhana · 3 of 6</div>
          <div className="h4-title">Alternate nostril breathing</div>
          <p className="h4-cue">
            Breathe in through the left for four. You slept five hours, so we&apos;re keeping tonight slow.
          </p>
          <div className="h4-bar">
            <div className="h4-track">
              <i />
            </div>
            <div className="h4-time">
              <span>6:12</span>
              <span>of 15:00</span>
            </div>
            <div className="h4-ctrl">
              <svg className="h4-sm" viewBox="0 0 24 24" fill="#F5F0E8" aria-hidden="true">
                <path d="M6 5h2v14H6zM20 5v14L9 12z" />
              </svg>
              <div className="h4-play">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#2C2118" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              </div>
              <svg className="h4-sm" viewBox="0 0 24 24" fill="#F5F0E8" aria-hidden="true">
                <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
              </svg>
            </div>
            <div className="h4-next">
              Next up <b>Child&apos;s pose · 2 min</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="h4-feat">
      <b>{title}</b>
      <span>{body}</span>
    </div>
  )
}

function TopSection() {
  return (
    <section className="h4" id="top-section">
      <div className="h4-head">
        <h1>{HERO_HEADLINE}</h1>
        <p className="lede">{HERO_SUB}</p>
      </div>
      <div className="h4-stage">
        <div className="h4-roots">
          <svg className="h4-map" viewBox="-10 -6 345 365" role="img" aria-label="Map of India with the Junoon tree">
            <path d={INDIA_MAP_PATH} fill="#3A2A1F" stroke="#8A5A3E" strokeWidth="1.6" strokeLinejoin="round" />
            <image href="/landing/junoon-tree.png" x="78" y="130" width="110" height="113" />
          </svg>
          {HERO_CHIPS.map((chip, i) => (
            <span key={chip} className="h4-chip" style={CHIP_POS[i]}>
              <i aria-hidden="true" />
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
        <div className="h4-app">
          <div className="h4-feats l">
            {FEATURES.slice(0, 4).map(f => (
              <Feature key={f.title} {...f} />
            ))}
          </div>
          <DrawnPlayer />
          <div className="h4-feats r">
            {FEATURES.slice(4).map(f => (
              <Feature key={f.title} {...f} />
            ))}
          </div>
        </div>
      </div>
      <div className="h4-offer">
        <p className="fine">
          <b>{HERO_FINE.lead}</b> {HERO_FINE.rest}
        </p>
        <div className="ctas">
          <AppStoreBadge size="nav" />
          <Link href="/pricing" className="textlink">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── 2. Your first two weeks ─────────────────────────────────────────────── */

function TwoWeeksSection() {
  const pics = [
    { src: '/landing/day1-coach-chat.jpg', alt: 'The coach chat', w: 420, h: 792 },
    { src: '/landing/day2-session.jpg', alt: 'A session playing', w: 420, h: 659 },
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
              {i < 2 ? (
                <div className="pic">
                  <Image src={pics[i].src} alt={pics[i].alt} width={pics[i].w} height={pics[i].h} sizes="(max-width: 760px) 90vw, 360px" />
                </div>
              ) : (
                <div className="pic drawn">
                  <div className="k-mini">
                    J Score<small>day 14</small>
                  </div>
                </div>
              )}
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
            <PhoneShot src="/landing/coach-chat.jpg" alt="The coach chat" />
            <PhoneShot src="/landing/coach-voices.jpg" alt="Choosing a coach voice" />
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
          <div className="k-ring" role="img" aria-label="The eight limbs of yoga in a ring, with Samadhi, your J Score, in the middle">
            <div className="halo" />
            <svg viewBox="0 0 100 100" className="spokes" aria-hidden="true">
              {RING_SPOKES.map(([x1, y1, x2, y2]) => (
                <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
              ))}
            </svg>
            {RING_LABELS.map(([name, left, top]) => (
              <span key={name} style={{ left: `${left}%`, top: `${top}%` }} aria-hidden="true">
                {name}
              </span>
            ))}
            <div className="centre" aria-hidden="true">
              <Tree size={64} />
              Samadhi
              <small>
                the number in the middle:
                <br />
                your J Score
              </small>
            </div>
          </div>
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
          <div className="k-score" role="img" aria-label="The J Score card: one ring, with a bar for each limb">
            <div className="ringbig">
              <span>J Score</span>
            </div>
            <div className="bars">
              {SCORE_BARS.map(([name, w]) => (
                <div key={name} className="k-b">
                  <span>{name}</span>
                  <i style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 6. Classes and breathwork ───────────────────────────────────────────── */

function BreathDrawing() {
  return (
    <svg className="k-breath" viewBox="0 0 180 180" aria-hidden="true">
      <circle cx="90" cy="90" r="84" fill="none" stroke="rgba(232,184,112,.22)" strokeWidth="2" />
      <circle cx="90" cy="90" r="64" fill="rgba(232,184,112,.10)" stroke="rgba(232,184,112,.35)" strokeWidth="1.5" />
      <circle cx="90" cy="90" r="44" fill="rgba(196,114,74,.28)" />
      <text x="90" y="98" textAnchor="middle" fill="#E8B870" fontSize="24" style={{ fontFamily: 'var(--serif)' }}>
        Inhale
      </text>
    </svg>
  )
}

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
              {i === 0 ? (
                <div className="pic">
                  <Image src="/landing/class-library.jpg" alt="The class library" width={330} height={717} sizes="(max-width: 760px) 90vw, 360px" />
                </div>
              ) : i === 1 ? (
                <div className="pic drawn">
                  <BreathDrawing />
                </div>
              ) : (
                <div className="pic drawn">
                  <div className="k-mini">
                    Live<small>coming soon</small>
                  </div>
                </div>
              )}
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
          <PhoneShot src="/landing/learn-tab.jpg" alt="The Learn tab" tall />
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

function Footer() {
  return (
    <footer className="k-s k-footer">
      <div className="swrap k-foot">
        <div>
          <p>{FOOTER_LEGAL}</p>
        </div>
        <div className="k-fl">
          <Image src="/logo-clay-text-96.png" alt="" aria-hidden="true" width={96} height={96} sizes="36px" />
          <div className="k-soc">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
          {/* About and Library are here because phones have no top-bar menu
              (Kush's yes, Mon 9 Nov 5:05 PM). /privacy, /terms and /contact
              are required: App Store review and the app's support URL point
              at them (see FooterV2). */}
          <nav className="k-flinks" aria-label="More pages, legal and contact">
            <Link href="/about">About</Link>
            <Link href="/library">Library</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://www.instagram.com/junoonwellness/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default function HomeLanding() {
  return (
    <div className="jh jn-home-scale" id="top">
      <header className="swrap nav">
        <Link href="/" className="brand" aria-label="Junoon, home">
          <Image src="/logo-clay-text-96.png" alt="" aria-hidden="true" width={96} height={96} sizes="40px" priority />
          Junoon
        </Link>
        <nav className="links" aria-label="Primary">
          <Link href="/" aria-current="page">
            Home
          </Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/library">Library</Link>
        </nav>
        <a href={APP_STORE_URL} className="cta">
          {NAV_CTA}
        </a>
      </header>
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
      <Footer />
    </div>
  )
}
