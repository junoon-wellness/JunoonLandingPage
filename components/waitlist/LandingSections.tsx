'use client'

import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import PhoneFrame from './PhoneFrame'
import AppStoreBadge from './AppStoreBadge'
import { SCREENS } from '@/lib/screens'
import {
  CLASSES,
  COACH,
  DOWNLOAD,
  FAQ_COPY,
  FEATURES,
  FEATURES_EYEBROW,
  JSCORE,
  LEARN,
  LIMBS,
  PRICING,
  TWO_WEEKS,
} from '@/lib/landing-copy'

/**
 * The middle of the landing page, in Arjav's order (editable mock-up, Sun 8
 * Nov): the eight features, your first two weeks, your coach, the eight limbs,
 * your J Score, classes and breathwork, learn, pricing, questions, download.
 *
 * All words come from lib/landing-copy.ts. Member quotes are not on the page
 * (Kush, Mon 9 Nov, D1). Styling reuses the site's own tokens; the few new
 * classes are the `.ld-*` block at the end of globals.css.
 */

function Heading({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div className="ld-head">
      <Reveal>
        <p className="eyebrow no-rule">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="wb-title">{heading}</h2>
      </Reveal>
    </div>
  )
}

/* ── The eight features ───────────────────────────────────────────────── */
export function FeaturesSection() {
  return (
    <section className="v2-section ld-sec" aria-label="What is inside Junoon">
      <div className="ld-head">
        <Reveal>
          <p className="eyebrow no-rule">{FEATURES_EYEBROW}</p>
        </Reveal>
      </div>
      <div className="ld-cards ld-cards--4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.06} y={14} amount={0.3} className="ld-card">
            <div className="wb-card-title">{f.title}</div>
            <div className="wb-card-copy">{f.body}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── Your first two weeks ─────────────────────────────────────────────── */
export function TwoWeeksSection() {
  return (
    <section className="v2-section ld-sec" id="first-two-weeks">
      <Heading eyebrow={TWO_WEEKS.eyebrow} heading={TWO_WEEKS.heading} />
      <div className="ld-cards ld-cards--3">
        {TWO_WEEKS.days.map((d, i) => (
          <Reveal key={d.label} delay={i * 0.08} y={14} amount={0.3} className="ld-card">
            <div className="jn-mono wb-num">{d.label}</div>
            <div className="wb-card-title">{d.title}</div>
            <div className="wb-card-copy">{d.body}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── Meet your coach ──────────────────────────────────────────────────── */
export function CoachSection() {
  return (
    <section className="v2-section ld-sec" id="coach">
      <div className="ld-split">
        <div>
          <Heading eyebrow={COACH.eyebrow} heading={COACH.heading} />
          <Reveal delay={0.08}>
            <p className="wb-intro">{COACH.body}</p>
          </Reveal>
          <div className="ld-cards ld-cards--2 ld-cards--tight">
            {COACH.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} y={14} amount={0.3} className="ld-card">
                <div className="wb-card-title">{c.title}</div>
                <div className="wb-card-copy">{c.body}</div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="ld-phone" delay={0.1}>
          <PhoneFrame src={SCREENS.coachChat.src} alt={SCREENS.coachChat.alt} width={250} />
        </Reveal>
      </div>
    </section>
  )
}

/* ── The eight limbs ──────────────────────────────────────────────────── */
function LimbRing() {
  const r = 104
  const c = 140
  return (
    <svg className="ld-ring" viewBox="0 0 280 280" role="img" aria-label="The eight limbs of yoga in a ring, with your J Score in the middle">
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--jn-hairline)" strokeWidth="1" />
      {LIMBS.items.map((l, i) => {
        const a = (-90 + i * 45) * (Math.PI / 180)
        const x = c + r * Math.cos(a)
        const y = c + r * Math.sin(a)
        const lx = c + (r + 22) * Math.cos(a)
        const ly = c + (r + 22) * Math.sin(a)
        const last = i === 7
        return (
          <g key={l.name}>
            <circle cx={x} cy={y} r="5" fill={last ? 'var(--jn-turmeric)' : 'var(--jn-clay)'} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="var(--jn-text-dim)"
              fontFamily="var(--font-dm-sans), sans-serif"
            >
              {i + 1}
            </text>
          </g>
        )
      })}
      <text x={c} y={c - 4} textAnchor="middle" fontSize="22" fill="var(--jn-text)" fontFamily="var(--font-cormorant), serif" fontStyle="italic">
        J Score
      </text>
      <text x={c} y={c + 16} textAnchor="middle" fontSize="10" fill="var(--jn-mute)" fontFamily="var(--font-dm-sans), sans-serif">
        the middle of the ring
      </text>
    </svg>
  )
}

export function LimbsSection() {
  return (
    <section className="v2-section ld-sec" id="eight-limbs">
      <div className="ld-split ld-split--ring">
        <div>
          <Heading eyebrow={LIMBS.eyebrow} heading={LIMBS.heading} />
          <Reveal delay={0.08}>
            <p className="wb-intro ld-wide-intro">{LIMBS.body}</p>
          </Reveal>
        </div>
        <Reveal className="ld-ring-wrap" delay={0.1}>
          <LimbRing />
        </Reveal>
      </div>
      <div className="ld-limbs">
        {LIMBS.items.map((l, i) => (
          <Reveal key={l.name} delay={(i % 4) * 0.05} y={12} amount={0.3} className="ld-limb">
            <div className="ld-limb-row">
              <span className="jn-mono wb-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="wb-card-title">{l.name}</div>
                <div className="wb-card-copy">{l.body}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── Your J Score ─────────────────────────────────────────────────────── */
export function JScoreSection() {
  return (
    <section className="v2-section ld-sec" id="j-score">
      <Heading eyebrow={JSCORE.eyebrow} heading={JSCORE.heading} />
      <Reveal delay={0.08}>
        <p className="wb-intro ld-wide-intro">{JSCORE.body}</p>
      </Reveal>
      <div className="ld-cards ld-cards--3">
        {JSCORE.points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} y={14} amount={0.3} className="ld-card">
            <div className={i === 0 ? 'wb-card-copy' : 'wb-card-title'}>{p.title}</div>
            {p.body && <div className="wb-card-copy">{p.body}</div>}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── Classes and breathwork ───────────────────────────────────────────── */
export function ClassesSection() {
  return (
    <section className="v2-section ld-sec" id="classes">
      <div className="ld-split ld-split--flip">
        <Reveal className="ld-phone" delay={0.1}>
          <PhoneFrame src={SCREENS.library.src} alt={SCREENS.library.alt} width={250} />
        </Reveal>
        <div>
          <Heading eyebrow={CLASSES.eyebrow} heading={CLASSES.heading} />
          <Reveal delay={0.08}>
            <p className="wb-intro">{CLASSES.body}</p>
          </Reveal>
          <div className="ld-cards ld-cards--1 ld-cards--tight">
            {CLASSES.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} y={14} amount={0.3} className="ld-card">
                <div className="wb-card-title">
                  {c.title}
                  {c.soon && <span className="ld-soon">Coming soon</span>}
                </div>
                <div className="wb-card-copy">{c.body}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Learn ────────────────────────────────────────────────────────────── */
export function LearnSection() {
  return (
    <section className="v2-section ld-sec" id="learn">
      <Heading eyebrow={LEARN.eyebrow} heading={LEARN.heading} />
      <Reveal delay={0.08}>
        <p className="wb-intro">{LEARN.body}</p>
      </Reveal>
      <div className="ld-cards ld-cards--3">
        {LEARN.articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08} y={14} amount={0.3} className="ld-card ld-card--link">
            <Link href={`/library/${a.slug}`} className="v2-link ld-card-link">
              <div className="jn-mono wb-num">{a.kind}</div>
              <div className="wb-card-title">{a.title}</div>
              <div className="wb-card-copy">{a.line}</div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── Pricing ──────────────────────────────────────────────────────────── */
export function PricingSection() {
  return (
    <section className="v2-section ld-sec" id="pricing">
      <Heading eyebrow={PRICING.eyebrow} heading={PRICING.heading} />
      <Reveal delay={0.08}>
        <p className="wb-intro">{PRICING.body}</p>
      </Reveal>
      <div className="ld-plans">
        <Reveal y={14} amount={0.3} className="ld-card ld-plan">
          <div className="ld-plan-price">
            {PRICING.price}
            <span> {PRICING.unit}</span>
          </div>
          <div className="wb-card-copy">{PRICING.included}</div>
        </Reveal>
      </div>
      <p className="ld-pricing-link">
        <Link href="/pricing" className="v2-link v2-hero-offer-link">
          See pricing →
        </Link>
      </p>
    </section>
  )
}

/* ── Questions ────────────────────────────────────────────────────────── */
export function FaqSection() {
  return (
    <section className="v2-section ld-sec" id="questions">
      <Heading eyebrow={FAQ_COPY.eyebrow} heading={FAQ_COPY.heading} />
      <div className="pr-faq ld-faq">
        {FAQ_COPY.items.map(item => (
          <details key={item.q} className="pr-faq-item">
            <summary>{item.q}</summary>
            <p className="pr-faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/* ── Download ─────────────────────────────────────────────────────────── */
export function DownloadSection() {
  return (
    <section className="v2-section ld-sec ld-download" id="download">
      <Reveal>
        <h2 className="wb-title">{DOWNLOAD.heading}</h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="wb-intro ld-center">{DOWNLOAD.body}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="ld-download-badge">
          <AppStoreBadge size="lg" />
        </div>
      </Reveal>
    </section>
  )
}
