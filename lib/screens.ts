/**
 * THE ONE PLACE APP SCREENSHOTS ARE NAMED  (spec §C, ticket LV3-012)
 *
 * Every screenshot on the page (hero carousel + scroll story + tour teaser)
 * resolves through `SCREENS` below. Nothing else references a file under
 * /screenshots directly.
 *
 * ── v3 shots, round 3 ────────────────────────────────────────────────────
 * All nine keys point at real app captures in `public/screenshots/v3/`,
 * one distinct file per key. The v2 stand-ins and the `standIn` flag that
 * tracked them are gone, and no image is used twice.
 *
 * Note on `coachPicks`: the key name is historical. The picks surface no
 * longer exists in the app; this slot now shows a class with the coach's
 * "Why this" reason expanded, which is the same idea in the shape the app
 * actually ships.
 *
 * 🔴 STRIP OS CHROME FROM **BOTH ENDS**, NOT JUST THE TOP.
 * The iOS status bar is the obvious one and it is only half the job. When a
 * screen is a presented SHEET, the capture also contains the sheet's rounded
 * bottom corners with the grey backdrop showing through at the sides — which
 * lands in the phone frame as an ugly grey bar across the bottom. Kush caught
 * it on the hero twice ("not sure why this keeps happening"), and the same
 * defect was sitting unnoticed in coachPicks and ritualWeek.
 *
 * HOW TO FIND IT WITHOUT EYEBALLING: a real app row runs edge to edge in one
 * background, so scan up from the bottom for the first row whose LEFT and
 * RIGHT edge pixels stop matching its CENTRE. That is where the chrome
 * begins. Cut ~8px above it and fill the shortfall (see below).
 * ⚠️ Do NOT apply this blindly — a full-screen tab view ends in the app's own
 * tab bar, which is real content. `liveTab` is exactly that case and is
 * deliberately uncropped. The detector returns "clean" for it; trust that.
 *
 * FILLING THE SHORTFALL: every capture is shorter than 828x1800 once the
 * chrome is off, so the remainder must be filled. Fill at the BOTTOM, never
 * the top — at the top it is a pale strip above a dark photo and reads as a
 * blank band; at the bottom it continues the screen's own background and
 * disappears. Pick the fill row by MEASURING the flattest row in the last
 * 300px, never by taking the last row: on IMG_5380 the last row carries a
 * shadow (stddev 28) and stretching it produced a visible streak.
 *
 * ── 2026-09-01, Kush's captures ──────────────────────────────────────────
 * Four slots re-shot from full-screen 1206x2622 simulator captures. EVERY
 * app screenshot used publicly gets the iOS status bar (top 186px) AND the
 * in-app BETA badge removed first — Kush's standing rule, applies to the
 * site, Instagram, the App Store listing, everything. The BETA pill sits at
 * roughly x569-680 / y237-295 in an uncropped capture; erase it by per-row
 * interpolation across the header's horizontal gradient, never a flat fill.
 * `live-tab` was the only one of the four that carried the badge.
 *
 * DELIBERATELY NOT RE-SHOT (Kush, 2026-09-01): `ritualProposal` and
 * `breathworkSession`. The ritual proposal can only be captured during the
 * Sunday ritual window, and neither screen's UI has meaningfully changed.
 *
 * ── 2026-09-23, LV5-069 (fix, not a re-shoot) ────────────────────────────
 * `ritual-proposal.png` and `ritual-week.png` were PULLED FROM PUBLIC
 * ENTIRELY (deleted from `public/screenshots/v3/`, not just unreferenced)
 * because both named Kush in on-screen text ("THE REST OF KUSH'S WEEK",
 * "KUSH'S WEEK AHEAD") — the same defect `coachPicks` was fixed for on
 * 2026-09-01, missed here. Both keys below now point at
 * `breathwork-session.png` as a STAND-IN (same precedent as the old
 * `liveClass`/`liveTab` note above: this file "used to stand in" for the
 * Live chapter before real live captures existed). It carries no name, no
 * date, and is the only dark-mode capture in this batch, so it clashes
 * with the ritual chapter's copy less than a stale light screenshot would.
 * ⇒ **ONE-FILE SWAP FOR LV5-068**: once the dark re-shoot lands real ritual
 * captures, change only the two `src` (and `alt`) values below — nothing
 * else in the app references these files directly.
 * ── 2026-09-23, LV5-068: five slots now dark 1.0.4 captures ───────────────
 * coachChat, coachPicks, planTab, ritualProposal and ritualWeek point at the
 * App Store 1.0.4 dark captures (sample member "Maya", no status bar, no BETA
 * pill). library, liveClass, liveTab and breathworkSession are still the older
 * captures until the next capture pass. library moved to a dark capture
 * the same day; the two live slots wait on Kush (live classes are not weekly yet).
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
    // 2026-09-23 (LV5-068): the 1.0.4 App Store capture, dark, sample member
    // "Maya", resized to 828 wide with the bottom 128px filled from the
    // capture's own flattest row. Source: Desktop/Junoon/Marketing/App Store/
    // 2026-09-20-v1.0.4/captures-0920/.
    src: '/screenshots/v3/schedule-dark.png',
    alt: 'A week in the Junoon app: completed and upcoming sessions laid out day by day beside calendar events',
  },
  ritualWeek: {
    // 2026-09-23 (LV5-068): the 1.0.4 App Store capture, dark, sample member
    // "Maya", resized to 828 wide with the bottom 128px filled from the
    // capture's own flattest row. Source: Desktop/Junoon/Marketing/App Store/
    // 2026-09-20-v1.0.4/captures-0920/.
    src: '/screenshots/v3/body-map-dark.png',
    alt: 'The Junoon body map showing which areas were worked in the last seven days, with the next step to practise',
  },
  coachChat: {
    // 2026-09-23 (LV5-068): the 1.0.4 App Store capture, dark, sample member
    // "Maya", resized to 828 wide with the bottom 128px filled from the
    // capture's own flattest row. Source: Desktop/Junoon/Marketing/App Store/
    // 2026-09-20-v1.0.4/captures-0920/.
    src: '/screenshots/v3/coach-chat-dark.png',
    alt: 'A conversation with the Junoon coach, which notices a pattern in the week and suggests a class for this evening',
  },
  coachPicks: {
    // 2026-09-23 (LV5-068): the 1.0.4 App Store capture, dark, sample member
    // "Maya", resized to 828 wide with the bottom 128px filled from the
    // capture's own flattest row. Source: Desktop/Junoon/Marketing/App Store/
    // 2026-09-20-v1.0.4/captures-0920/.
    src: '/screenshots/v3/session-dark.png',
    alt: 'A session the coach built for the evening, playing a downward-facing dog clip with the next poses listed below',
  },
  library: {
    // 2026-09-23 (LV5-068): dark V5 capture of the Classes tab (Library),
    // sample member "Maya", from Desktop/Junoon/Marketing/Screenshots/
    // 2026-09-23-dark-features/landing/01-library-shelf.png. The library is
    // in 1.0.4. File name kept distinct from library.png, which specs bind to.
    src: '/screenshots/v3/library-dark.png',
    alt: 'The Junoon class library with classes recommended for you and recorded yoga, meditation and pranayama classes with their teachers and lengths',
  },
  liveClass: {
    // 2026-09-23 (LV5-070, Kush's yes): dark capture of a live class page,
    // sample member, with the date line cut out so the frame does not age.
    // Live classes start weekly; the chapter copy says so.
    src: '/screenshots/v3/live-class-dark.png',
    alt: 'A live Junoon class page with its instructor, what the session covers and an RSVP button',
  },
  liveTab: {
    // 2026-09-23 (LV5-070): key name is historical. Live classes are not
    // running weekly yet (Kush, 23 Sep), so the second live frame is a
    // recorded class, matching the chapter's "the recorded library is always
    // open" line, instead of a list of upcoming live sessions.
    src: '/screenshots/v3/recorded-class-dark.png',
    alt: "A recorded Junoon class with the coach's reason for suggesting it and the next class recommended",
  },
  morningCheckIn: {
    // 2026-09-23 (LV5-070, Kush's yes): replaces Live Classes in the hero.
    // Dark capture of the morning check-in, sample member, date line cut out.
    src: '/screenshots/v3/morning-check-in-dark.png',
    alt: 'The Junoon morning check-in building the day, with today\'s plan of two sessions',
  },
  breathworkSession: {
    src: '/screenshots/v3/breathwork-session.png',
    alt:
      'A guided Extended Box Breathing session in progress, showing the exhale cue and the cycle count',
  },
  planTab: {
    // 2026-09-23 (LV5-068): the 1.0.4 App Store capture, dark, sample member
    // "Maya", resized to 828 wide with the bottom 128px filled from the
    // capture's own flattest row. Source: Desktop/Junoon/Marketing/App Store/
    // 2026-09-20-v1.0.4/captures-0920/.
    src: '/screenshots/v3/home-dark.png',
    alt: "The Junoon home screen with today's three sessions, a nudge from the coach, and the body map below",
  },
} as const satisfies Record<string, Screen>

export type ScreenKey = keyof typeof SCREENS

export function screen(key: ScreenKey): Screen {
  return SCREENS[key]
}

/**
 * Hero carousel lineup (spec §C). Five slides in the order Kush ruled
 * (2026-08-23): "1. Coach 2. Live classes 3. Classes recorded 4. Your plan
 * 5. Ritual" — classes up front, the ritual as the closer. The Weekly Plan
 * (coachPicks) and Breathwork slides came out in the same ruling, and the
 * third label's wording was ruled "Recorded Classes".
 */
export const HERO_SLIDES: { key: ScreenKey; label: string }[] = [
  { key: 'coachChat', label: 'AI Coach' },
  // 2026-09-23 (Kush): Live Classes came out of the hero until live classes
  // run weekly; the daily check-in takes its place.
  { key: 'morningCheckIn', label: 'Daily Check-ins' },
  { key: 'library', label: 'Recorded Classes' },
  { key: 'planTab', label: 'Your Plan' },
  { key: 'ritualProposal', label: 'Weekly Ritual' },
]
