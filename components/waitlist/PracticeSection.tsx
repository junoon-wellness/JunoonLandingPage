/**
 * "A practice that knows you" (LV5-074). ONE section where Home used to have
 * two identical numbered lists in a row: WhatWereBuildingV2 (the four
 * evergreen features) and WhatsNewV2 (what's new since launch, LV5-070).
 * The 27 Sep scope: "'What we're building' and 'What's new' merge into one
 * un-numbered section." Numbers promised a sequence these never were.
 *
 * WORDS: every line below is carried over VERBATIM from those two files,
 * including Kush's own row-04 wording (2026-08-23) and LV5-070's App Store
 * 1.0.4 sourcing for the "what's new" four. Only the 01-04 numbers, the
 * drawn hairlines and the gold italic clauses went.
 */
const FEATURES = [
  {
    title: 'Live and on-demand classes',
    body: 'Yoga, meditation, pranayama, and breathwork. Taught live, available on demand, at every level and around real schedules.',
  },
  {
    title: 'An AI Coach that learns your week',
    body: 'Recommends what to practice next based on what you actually finished, what felt right, and the time you have. Guidance that used to require a personal teacher.',
  },
  {
    title: 'A weekly planning ritual',
    body: 'Every Sunday the coach lays out your week: what to practice, when it fits your schedule. You approve it, change it, or tell it what to fix.',
  },
  {
    // Kush, 2026-08-23: his exact replacement copy for this row, verbatim.
    title: 'Ancient Indian backed philosophy',
    body: 'Knowledge grounded in ancient India, seamlessly blended with modern science and psychology.',
  },
]

const NEW_SINCE_LAUNCH = [
  {
    title: 'A new dark look',
    body: 'Junoon now opens in a new dark look, with a light theme or an option to follow your phone, under Appearance.',
  },
  {
    title: 'Home, rebuilt around your body map',
    body: 'Tap any area on your body map and your coach builds a session for it, right on the page.',
  },
  {
    title: 'Two check-ins, not one',
    body: 'Your coach checks in each morning and evening, and builds today’s session instead of planning a week ahead.',
  },
  {
    title: 'Download classes, practice offline',
    body: 'Save any class to your phone and practice with no connection.',
  },
]

function List({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="rf-feat">
      {items.map(f => (
        <li key={f.title}>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </li>
      ))}
    </ul>
  )
}

export default function PracticeSection() {
  return (
    <section className="rf-band" aria-labelledby="rf-practice-title">
      <div className="rf-band-inner">
        <h2 id="rf-practice-title">A practice that knows you.</h2>
        <p className="rf-body">
          Junoon brings together yoga, pranayama, Ayurveda and breathwork with an AI Coach that
          makes expert guidance personal. Not a library you browse through. A practice that adapts
          to you.
        </p>
        <List items={FEATURES} />

        <h3 className="rf-subhead">Everything that&apos;s changed since launch.</h3>
        <p className="rf-body">
          The app in your hand isn&apos;t the app from launch day. Here&apos;s what&apos;s new.
        </p>
        <List items={NEW_SINCE_LAUNCH} />
      </div>
    </section>
  )
}
