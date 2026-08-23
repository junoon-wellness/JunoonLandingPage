'use client'

import ScrollStory, { type StoryChapter } from '@/components/story/ScrollStory'
import { SCREENS } from '@/lib/screens'

/**
 * The four product chapters (spec §B5). Rendered as named clickable tabs by
 * ScrollStory (LV5-003, 2026-08-22) - replaces both the older tabbed
 * FeatureShowcase (which auto-advanced on a 7s timer whether or not anyone
 * was looking at it) and the scroll-jacked pin that briefly replaced it.
 *
 * Order is the product argument: the ritual that starts the week, the coach
 * that learns from it, the library it draws on, and the thing you can reach for
 * in the middle of a bad afternoon.
 *
 * The Devanagari watermark glyphs each chapter used to carry are gone
 * (Kush, LV5-003: "remove the Hindi text from the background of the 4
 * tabs") - `railLabel` below is now each chapter's only short name, used for
 * both the tab text and (previously) the progress rail.
 */
const CHAPTERS: StoryChapter[] = [
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
    // LV5-019: tab outline colours, Kush's mapping - ritual/coach/library/
    // breathwork each get their own. Separate from `accent` above (which
    // stays put) because that one also colours 11px eyebrow text, and only
    // some of these pass 4.5:1 at that size - see ScrollStory's comment.
    tabAccent: 'var(--jn-turmeric)',
    railLabel: 'The ritual',
    screens: [SCREENS.ritualProposal, SCREENS.ritualWeek],
  },
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
    id: 'library',
    eyebrow: 'A growing library',
    title: (
      <>
        Taught by people who <em>know the tradition.</em>
      </>
    ),
    body: 'Live sessions and a growing on-demand library: yoga, meditation and pranayama at every level, each class explained in plain terms so you know what it does and why.',
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
    screens: [SCREENS.library, SCREENS.liveClass],
  },
  {
    id: 'breath',
    eyebrow: 'Breathwork on demand',
    title: (
      <>
        Need to reset? <em>Just ask.</em>
      </>
    ),
    body: "Tell the coach you're stretched thin between meetings and it starts a guided breathing session built around the time you actually have, not a generic timer.",
    points: [
      'Ask in plain language. The coach reads the situation, not a keyword.',
      'Pick a length that fits the gap you actually have: 2, 3 or 5 minutes.',
      'Or start one yourself from anywhere in the app, no conversation needed.',
    ],
    accent: 'var(--jn-turmeric)',
    // Poster gold, reusing the same --jn-gold-alt token LV5-019's hero dots
    // introduced (7.82:1 on --jn-bg) rather than adding a second gold.
    tabAccent: 'var(--jn-gold-alt)',
    railLabel: 'Breathwork',
    screens: [SCREENS.breathworkSession, SCREENS.planTab],
  },
]

export default function FeatureStory() {
  return <ScrollStory chapters={CHAPTERS} label="What Junoon does" />
}
