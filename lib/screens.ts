/**
 * THE ONE PLACE APP SCREENSHOTS ARE NAMED  (spec §C, ticket LV3-012)
 *
 * Every screenshot on the page (hero carousel + scroll story + tour teaser)
 * resolves through `SCREENS` below. Nothing else references a file under
 * /screenshots directly.
 *
 * ── v3 shots, round 3 ────────────────────────────────────────────────────
 * All eight keys now point at real app captures in `public/screenshots/v3/`,
 * one distinct file per key. The v2 stand-ins and the `standIn` flag that
 * tracked them are gone, and no image is used twice.
 *
 * Note on `coachPicks`: the key name is historical. The picks surface no
 * longer exists in the app, so this slide shows the coach building your week
 * instead, and its user-visible label reads "Weekly Plan".
 */

export interface Screen {
  src: string
  alt: string
}

/** Intrinsic size of the source PNGs. Frames are laid out against this ratio. */
export const SCREEN_WIDTH = 828
export const SCREEN_HEIGHT = 1800

export const SCREENS = {
  ritualProposal: {
    src: '/screenshots/v3/ritual-proposal.png',
    alt:
      'The Sunday ritual proposing the coming week, showing what changed and an Approve this week button',
  },
  ritualWeek: {
    src: '/screenshots/v3/ritual-week.png',
    alt:
      'The approved Junoon week laid out day by day, each session labelled with its time of day and type',
  },
  coachChat: {
    src: '/screenshots/v3/coach-chat.png',
    alt:
      'The Junoon coach in conversation, swapping a scheduled class for a gentler practice on request',
  },
  coachPicks: {
    src: '/screenshots/v3/coach-picks.png',
    alt:
      'The coach summarising your week before it is built: your free windows, how much of each practice, and what to focus on',
  },
  library: {
    src: '/screenshots/v3/library.png',
    alt:
      'The Junoon library of recorded yoga, meditation and pranayama classes with their lengths and instructors',
  },
  liveClass: {
    src: '/screenshots/v3/live-class.png',
    alt:
      'A Junoon class detail page showing the instructor, the length, and what the session covers',
  },
  breathworkSession: {
    src: '/screenshots/v3/breathwork-session.png',
    alt:
      'A guided Extended Box Breathing session in progress, showing the exhale cue and the cycle count',
  },
  planTab: {
    src: '/screenshots/v3/plan-tab.png',
    alt:
      'The Junoon plan tab with a populated day of practice, habits and nutrition across morning, midday and evening',
  },
} as const satisfies Record<string, Screen>

export type ScreenKey = keyof typeof SCREENS

export function screen(key: ScreenKey): Screen {
  return SCREENS[key]
}

/**
 * Hero carousel lineup (spec §C). Order is the product story: the ritual that
 * starts the week, the coach that shapes it, what it serves you, then the rest
 * of the app.
 */
export const HERO_SLIDES: { key: ScreenKey; label: string }[] = [
  { key: 'ritualProposal', label: 'Weekly Ritual' },
  { key: 'coachChat', label: 'AI Coach' },
  { key: 'coachPicks', label: 'Weekly Plan' },
  { key: 'library', label: 'Library' },
  { key: 'breathworkSession', label: 'Breathwork' },
  { key: 'planTab', label: 'Your Plan' },
]
