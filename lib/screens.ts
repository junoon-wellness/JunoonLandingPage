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
    // LV5-007 (2026-08-22): swapped for a newer capture (2026-08-17) of the
    // same ritual-proposal screen - content changed, framing and crop did
    // not (straight proportional resize of the same 1206x2622 capture
    // format the rest of the batch used, no visible crop in either).
    alt:
      "What's different this week: 2 slots added, 4 removed, with an Approve this week button",
  },
  ritualWeek: {
    src: '/screenshots/v3/ritual-week.png',
    // 2026-09-01: re-shot. The old capture printed MONDAY 10 AUG - SUNDAY
    // 16 AUG on screen, three weeks stale on a page we promote from today.
    // This one is the ritual tab itself, dated the current week, with the
    // Adjust plan control at the top.
    alt:
      'The Junoon week ahead laid out day by day, each session labelled with its type, above an Adjust plan button',
  },
  coachChat: {
    src: '/screenshots/v3/coach-chat.png',
    // 2026-08-30: swapped for a current capture (Kush's ruling — refresh only
    // the screens we have new shots of, leave the rest). The 2026-08-09 batch
    // was full-screen 1206x2622 including the iOS status bar; this one starts
    // at the app header, so it is proportionally resized to 828 wide and the
    // remaining 110px is the capture's own first row repeated upward, which
    // continues the header's horizontal gradient with no seam. Do NOT drop a
    // raw capture in here: .v2-device img is object-fit:cover, so anything
    // that is not 828x1800 gets its SIDES cropped and loses the header
    // buttons. Alt rewritten — the old one described the retired
    // swap-a-class conversation and no longer matched the image.
    alt:
      'The Junoon coach introducing itself, offering to build a routine around yoga, meditation and the habits around them',
  },
  coachPicks: {
    src: '/screenshots/v3/coach-picks.png',
    // 2026-09-01: re-shot. The old capture was headed "Kush's week", made a
    // claim about a specific person ("practised Sat midday 8 weeks running")
    // and showed an EMPTY focus panel reading "Nothing set yet" - an empty
    // state doing marketing work. This one is a real class with the coach's
    // "Why this" reason expanded, which is what the chapter copy promises.
    alt:
      "A recorded class with the coach's reason for choosing it expanded: it is pitched at where you are starting from",
  },
  library: {
    src: '/screenshots/v3/library.png',
    // 2026-08-30: current capture, same treatment as coachChat above. The
    // file name stays `library` because KEEPER-SPEC, POSTER-SPEC and
    // SEED-LIBRARY all bind cards to these filenames — the app's own tab is
    // now labelled "Classes", which is why this shot shows a Classes tab bar.
    // Alt still accurate: it is the recorded shelf either way.
    alt:
      'The Junoon library of recorded yoga, meditation and pranayama classes with their lengths and instructors',
  },
  liveClass: {
    src: '/screenshots/v3/live-class.png',
    // 2026-09-01: the old capture was a RECORDED class detail page sitting
    // under a hero slide labelled "Live Classes" - the picture and the
    // promise disagreed. This one is a genuine scheduled live session:
    // LIVE CLASS chip, a real date, a named instructor, and the note about
    // stream access that proves it is not a video.
    alt:
      'A scheduled Junoon live class with its date, its instructor and what the session covers',
  },
  liveTab: {
    src: '/screenshots/v3/live-tab.png',
    // 2026-09-01, new key. Shows the Live classes / Recorded toggle, which
    // the class-detail capture cannot - so the Live chapter's two frames are
    // "here is the structure" and "here is one session", instead of leaning
    // on the breathwork player it used to borrow.
    alt:
      'The Junoon classes tab switched to Live classes, showing an upcoming session with its date and instructor',
  },
  breathworkSession: {
    src: '/screenshots/v3/breathwork-session.png',
    alt:
      'A guided Extended Box Breathing session in progress, showing the exhale cue and the cycle count',
  },
  planTab: {
    src: '/screenshots/v3/plan-tab.png',
    // 2026-08-30: current capture, same treatment as coachChat above. Alt
    // rewritten — the old one promised habits and nutrition items that this
    // day does not contain.
    alt:
      'The Junoon plan tab with the day laid out across morning, midday and evening: a midday yoga sequence and an evening guided meditation',
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
  { key: 'liveClass', label: 'Live Classes' },
  { key: 'library', label: 'Recorded Classes' },
  { key: 'planTab', label: 'Your Plan' },
  { key: 'ritualProposal', label: 'Weekly Ritual' },
]
