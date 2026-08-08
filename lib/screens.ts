/**
 * THE ONE PLACE APP SCREENSHOTS ARE NAMED  (spec §C, ticket LV3-012)
 *
 * Every screenshot on the page (hero carousel + scroll story + tour teaser)
 * resolves through `SCREENS` below. Nothing else references a file under
 * /screenshots directly.
 *
 * ── Swapping in Kush's v3 shots ──────────────────────────────────────────
 * When `public/screenshots/v3/` lands, change ONLY the `src` values here to
 * `/screenshots/v3/<name>.png` (the file names in the spec's table match the
 * keys below one-for-one) and refresh the `alt` text to describe the new
 * screen. Delete the old `public/screenshots/*.png` afterwards, once the swap
 * has been eyeballed in a browser.
 *
 * The `standIn: true` flag marks every entry still pointing at a v2 file.
 * Grep for it to see what is left to swap.
 *
 * There are 8 semantic screens and only 7 stand-in files, so exactly one
 * duplicate is unavoidable. It is parked where it is never visible twice at
 * once: `ritualWeek` borrows the library shot, so no chapter shows the same
 * image in both its phones, the six hero slides are all distinct, and the two
 * chapters that share it (1 and 3) are not adjacent, so nothing looks frozen
 * during a crossfade.
 */

export interface Screen {
  src: string
  alt: string
  /** True while this key still points at a v2 stand-in rather than a v3 shot. */
  standIn?: boolean
}

/** Intrinsic size of the source PNGs. Frames are laid out against this ratio. */
export const SCREEN_WIDTH = 640
export const SCREEN_HEIGHT = 1391

export const SCREENS = {
  ritualProposal: {
    src: '/screenshots/screenshot-plan.png',
    alt: 'The Junoon weekly ritual proposing a week of practice across the coming days',
    standIn: true,
  },
  ritualWeek: {
    src: '/screenshots/screenshot-library.png',
    alt: 'The approved Junoon week laid out day by day',
    standIn: true,
  },
  coachChat: {
    src: '/screenshots/screenshot-coach.png',
    alt: 'The Junoon coach in conversation, shaping a personalised weekly plan',
    standIn: true,
  },
  coachPicks: {
    src: '/screenshots/screenshot-coach-pick.png',
    alt: 'The Junoon coach recommending a five minute Chair Yoga practice chosen for the season and your morning window',
    standIn: true,
  },
  library: {
    src: '/screenshots/screenshot-library.png',
    alt: 'The Junoon library of recorded yoga, meditation and pranayama classes',
    standIn: true,
  },
  liveClass: {
    src: '/screenshots/screenshot-breathwork-coach.png',
    alt: 'A Junoon class detail page showing what the session covers and how long it runs',
    standIn: true,
  },
  breathworkSession: {
    src: '/screenshots/screenshot-breathwork-session.png',
    alt: 'A guided Box Breathing session in progress, showing the inhale cue and cycle count',
    standIn: true,
  },
  planTab: {
    src: '/screenshots/screenshot-practice.png',
    alt: 'The Junoon plan tab with a populated day of practice and habits',
    standIn: true,
  },
  // ── v4 additions (spec §D). Both want their own shot; `habits.png` and
  // `insights.png` are on Kush's list and can ride the Sunday capture.
  habits: {
    src: '/screenshots/screenshot-practice.png',
    alt: 'A Junoon day with its habits listed and one of them ticked off',
    standIn: true,
  },
  insights: {
    src: '/screenshots/screenshot-coach-pick.png',
    alt: 'A Junoon check-in asking how the session felt, feeding the coach insights',
    standIn: true,
  },
} as const satisfies Record<string, Screen>

export type ScreenKey = keyof typeof SCREENS

export function screen(key: ScreenKey): Screen {
  return SCREENS[key]
}

/**
 * WHAT THE v4 HERO PHONE SHOWS. (v4 spec §A3, §A6)
 *
 * This is the "one config entry" half of the video-ready seam: the other half
 * is `components/hero/PhoneScreen.tsx`. To put Kush's screen recording in the
 * hero later, this becomes
 *
 *   { kind: 'video', src: '/hero/ritual.mp4', poster: '/hero/ritual-poster.jpg',
 *     alt: '…' }
 *
 * and nothing in the hero component changes.
 */
export type HeroScreen =
  | { kind: 'image'; key: ScreenKey }
  | { kind: 'video'; src: string; poster: string; alt: string }

/**
 * ⚠️ MOCK. `mock-tour.mp4` is 8 screens captured from the /tour walkthrough,
 * which is a stylised recreation of the app, NOT real app pixels. It exists so
 * the motion concept can be judged and so this video path is exercised before
 * Kush's real recording arrives (v4 ticket LV4-014).
 *
 * Swapping in the real recording is this one line plus the two files.
 * Rebuild command and capture script: see the LV4-014 notes in LANDING-V4-LOG.
 */
export const HERO_SCREEN: HeroScreen = {
  kind: 'video',
  src: '/hero/mock-tour.mp4',
  poster: '/hero/mock-tour-poster.png',
  alt: 'A walkthrough of the Junoon app: signing in, the onboarding questions, the week the coach proposes, the plan, the coach conversation, the library, and the Sunday ritual.',
}

/** The still that shipped before the mock video, kept for an easy revert. */
export const HERO_SCREEN_STILL: HeroScreen = { kind: 'image', key: 'ritualProposal' }

/*
 * HERO_SLIDES (the v3 carousel lineup) was deleted in v4 round 2 along with
 * DeviceCarousel and HeroV2. The cinematic hero shows one screen through
 * HERO_SCREEN rather than cycling six.
 */
