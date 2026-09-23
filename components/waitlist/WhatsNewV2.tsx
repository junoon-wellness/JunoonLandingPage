'use client'

import Reveal, { DrawLine } from '@/components/motion/Reveal'

/**
 * "What's new since launch" (LV5-070, 2026-09-23).
 *
 * Reuses the `.wb-*` classes and layout from WhatWereBuildingV2 verbatim —
 * same 4-across / 2x2 / stacked responsive grid, already tuned for exactly
 * four cards, so a second instance of the same section needs no new CSS.
 *
 * Every line below traces to the live App Store 1.0.4 listing (fetched
 * 2026-09-23 via `itunes.apple.com/lookup?id=6781123809`) — the release
 * notes for "What's New in Version 1.04" and the description's "A Home
 * Built Around You" / "Classes, Live and On Demand" sections. Nothing here
 * is read off the V5 working tree, which is a spec, not a shipped build.
 *
 * Deliberately NOT included (unverified in 1.0.4, or explicitly ruled out):
 * coach persona count, "sit and do nothing", a home-screen widget. Insights'
 * Apple Health read and calendar sync are real (same description) but left
 * out here to keep four cards instead of six — candidates for a future pass.
 */
const features = [
  {
    num: '01',
    title: 'A new dark look',
    body: 'Junoon now opens in a new dark look, with a light theme or an option to follow your phone, under Appearance.',
  },
  {
    num: '02',
    title: 'Home, rebuilt around your body map',
    body: 'Tap any area on your body map and your coach builds a session for it, right on the page.',
  },
  {
    num: '03',
    title: 'Two check-ins, not one',
    body: 'Your coach checks in each morning and evening, and builds today’s session instead of planning a week ahead.',
  },
  {
    num: '04',
    title: 'Download classes, practice offline',
    body: 'Save any class to your phone and practice with no connection.',
  },
]

const RULE: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: '0.5px',
  background: 'var(--jn-hairline)',
}

export default function WhatsNewV2() {
  return (
    <section className="v2-section">
      <div className="wb-head">
        <Reveal>
          <h2 className="wb-title">
            Everything that&apos;s changed{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jn-turmeric)' }}>since launch.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="wb-intro">
            The app in your hand isn&apos;t the app from launch day. Here&apos;s what&apos;s new.
          </p>
        </Reveal>
      </div>

      <div className="wb-grid">
        {features.map((f, i) => (
          <Reveal key={f.num} delay={i * 0.09} y={16} amount={0.35} className="wb-card">
            <DrawLine delay={i * 0.09} duration={0.9} style={{ ...RULE, top: 0 }} />
            {i === features.length - 1 && (
              <DrawLine
                delay={i * 0.09 + 0.12}
                duration={0.9}
                className="wb-rule-end"
                style={{ ...RULE, bottom: 0 }}
              />
            )}
            <div className="jn-mono wb-num">{f.num}</div>
            <div className="wb-card-body">
              <div className="wb-card-title">{f.title}</div>
              <div className="wb-card-copy">{f.body}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
