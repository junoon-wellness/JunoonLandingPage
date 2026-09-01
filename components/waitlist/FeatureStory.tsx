'use client'

import ScrollStory, { type StoryChapter } from '@/components/story/ScrollStory'
import { SCREENS } from '@/lib/screens'

/**
 * The four product chapters (spec §B5). Rendered as named clickable tabs by
 * ScrollStory (LV5-003, 2026-08-22) - replaces both the older tabbed
 * FeatureShowcase (which auto-advanced on a 7s timer whether or not anyone
 * was looking at it) and the scroll-jacked pin that briefly replaced it.
 *
 * Order (Kush, 2026-08-23): coach first, then live classes, the library,
 * and the ritual as the closer — matching the hero carousel's slide order.
 * The Breathwork chapter came out in the same ruling and Live classes took
 * its slot.
 *
 * The Devanagari watermark glyphs each chapter used to carry are gone
 * (Kush, LV5-003: "remove the Hindi text from the background of the 4
 * tabs") - `railLabel` below is now each chapter's only short name, used for
 * both the tab text and (previously) the progress rail.
 */
const CHAPTERS: StoryChapter[] = [
  {
    id: 'coach',
    eyebrow: 'Recommendations that learn',
    title: (
      <>
        It notices <em>what worked.</em>
      </>
    ),
    body: 'The coach pays attention to what you finish, what you skip, and how sessions felt. Recommendations get sharper every week without you filling out a single form.',
    points: [
      'Finished it and felt good? You will see more like it.',
      'Said it was not for you? It stays gone.',
      'Variety first: the coach will not serve you the same class on repeat.',
    ],
    // LV5-001: was clay — 3.63:1 as this chapter's 11px eyebrow text, below
    // AA. This slipped through ba2760a itself (the library chapter got
    // fixed to sage in that commit, this one didn't). Sage measures 6.12:1
    // and keeps the four chapters from reading as three-turmeric-one-sage.
    accent: 'var(--jn-sage)',
    // Clay measures 3.63:1 on --jn-bg - clears the 3:1 graphic/border floor
    // this tab outline needs, but is exactly the ratio that failed as this
    // chapter's 11px eyebrow TEXT above (needs 4.5:1 - see the LV5-001
    // comment on `accent`). Kept apart so the outline can be clay without
    // reopening that AA failure.
    tabAccent: 'var(--jn-clay)',
    railLabel: 'The coach',
    screens: [SCREENS.coachChat, SCREENS.coachPicks],
  },
  {
    // New chapter (Kush, 2026-08-23: "Remove breathwork tab in these,
    // replace with live classes"). Copy drafted at build for Kush's review.
    id: 'live',
    eyebrow: 'Live classes',
    title: (
      <>
        Real instructors, <em>in real time.</em>
      </>
    ),
    body: 'Practice with real instructors in real time: live yoga, meditation and breathwork sessions you join straight from the app, at every level.',
    points: [
      'Yoga, meditation and breathwork, taught live through the week.',
      'Every level welcome — follow along in real time.',
      "Can't join live? The recorded library is always open.",
    ],
    accent: 'var(--jn-turmeric)',
    // Poster gold, inherited from the retired Breathwork chapter's slot
    // (--jn-gold-alt, 7.82:1 on --jn-bg per LV5-019) so the four tab
    // outlines stay clay/gold/sage/turmeric — one each.
    tabAccent: 'var(--jn-gold-alt)',
    railLabel: 'Live classes',
    // 2026-09-01: both frames are now genuinely live-class screens. Frame 1
    // is one scheduled session, frame 2 is the Live classes / Recorded
    // toggle. breathworkSession used to stand in here and no longer needs
    // to — a breathing timer was never "real instructors in real time".
    screens: [SCREENS.liveClass, SCREENS.liveTab],
  },
  {
    id: 'library',
    eyebrow: 'A growing library',
    title: (
      <>
        Taught by people who <em>know the tradition.</em>
      </>
    ),
    // "Live sessions and" came off the front when Live classes became its
    // own chapter (Kush, 2026-08-23) — this one is the on-demand shelf now.
    body: 'A growing on-demand library: yoga, meditation and pranayama at every level, each class explained in plain terms so you know what it does and why.',
    points: [
      'New classes added regularly, live and recorded.',
      'Filter by length, style, or what your body needs today.',
      'Instructors who grew up with these practices.',
    ],
    // The one chapter that carries the second hue. Stone was the weakest
    // accent of the four — a warm grey among three warm accents — so the
    // library chapter is where sage costs the least and reads the most.
    accent: 'var(--jn-sage)',
    tabAccent: 'var(--jn-sage)',
    railLabel: 'The library',
    // liveClass moved to the Live classes chapter; planTab (where a class
    // lands in your day) fills the second frame so no screen repeats
    // across chapters.
    screens: [SCREENS.library, SCREENS.planTab],
  },
  {
    id: 'ritual',
    eyebrow: 'The Sunday ritual',
    title: (
      <>
        Your week, planned <em>before it starts.</em>
      </>
    ),
    body: 'Every Sunday the coach proposes your week: which classes, which days, sized to the schedule you actually have. You approve it in one tap or tell it what to change.',
    points: [
      'See what changed since last week, and why.',
      'Move, swap or remove anything. The plan is yours.',
      'Life shifted mid-week? Re-work the remaining days in seconds.',
    ],
    accent: 'var(--jn-turmeric)',
    // LV5-019: tab outline colours - each chapter gets its own. Separate
    // from `accent` above (which stays put) because that one also colours
    // 11px eyebrow text, and only some of these pass 4.5:1 at that size -
    // see ScrollStory's comment.
    tabAccent: 'var(--jn-turmeric)',
    railLabel: 'The ritual',
    screens: [SCREENS.ritualProposal, SCREENS.ritualWeek],
  },
]

export default function FeatureStory() {
  return <ScrollStory chapters={CHAPTERS} label="What Junoon does" />
}
