/**
 * THE JUNOON ELEMENT — shared geometry (LV5-021)
 *
 * Kush, 2026-08-22: "use the design we made in the latest batch of marketing
 * (V4 and V5) throughout the pages UI as a 'Junoon' element."
 *
 * Two motifs come across from the poster set: the JAALI lattice (V4's
 * background candidate + V5's ground) and the JHAROKHA arch (V5). Both are
 * pure CSS/SVG — no image assets ship with them.
 *
 * 🔴 SOURCE OF TRUTH, copied verbatim, do not "tidy":
 *    ~/Desktop/Junoon/Marketing/Instagram/08.2026/
 *      template-mockups-2026-08-19/build-mockups.mjs
 *    - `jaaliTile(stroke, opacity)`   → JAALI_TILE below
 *    - `archPath` inside `v5()`       → ARCH_PATH below
 * The poster file keeps ONE definition of the tile so V4 and V5 cannot drift
 * apart (spec §C3). This file is the site's copy of that same geometry; if the
 * poster's ever changes, change it here too rather than growing a third.
 *
 * Spec: POSTER-V3-V4-V5-SPEC.md §C3 (jaali) and §D3 (ground) in
 * agent-os/companies/junoon/content-studio/.
 *
 * ⚠️ TRAPS carried over from that spec, all three already paid for:
 *   1. The lattice and the vignette are ONE decision (§D3). The vignette eats
 *      the lattice exactly at the edges where it is most visible, so a lattice
 *      without one looks like a rectangle of texture pasted onto the page.
 *      `<Jaali>` therefore defaults `vignette` to true.
 *   2. The arch scales on BOTH axes by the same factor or it distorts. That is
 *      why ARCH_ASPECT is locked and `<JharokhaFrame>` sets it itself rather
 *      than inheriting whatever box it is dropped into.
 *   3. The corner PAISLEYS were removed from V4/V5 at Kush's call ("they look
 *      like nipples", 2026-08-21) and the mandala is out of scope. Neither is
 *      ported here. Do not add them.
 */

/** hex + alpha -> rgba(). Mirrors `hexA()` in build-mockups.mjs. */
export function hexA(hex: string, a: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

/**
 * The jaali tile: an 8-point star grid. 120x120, stroke-width 1.6, two squares
 * (one rotated 45°), a circle r15, four spokes and the two diagonal paths that
 * carry the pattern across tile boundaries.
 *
 * `opacity` is baked into the SVG group, exactly as the poster does it. The
 * layer that USES the tile then applies its own opacity on top, so the
 * effective opacity of a stroke pixel is tileOpacity x layerOpacity — see
 * JAALI_EFFECTIVE_MAX.
 */
export function jaaliTile(stroke: string, opacity: number): string {
  return (
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
        '<g fill="none" stroke="' +
        stroke +
        '" stroke-width="1.6" opacity="' +
        opacity +
        '">' +
        '<path d="M60 8 82 30 104 30 104 52 126 74"/>' +
        '<path d="M60 8 38 30 16 30 16 52 -6 74"/>' +
        '<rect x="24" y="24" width="72" height="72" transform="rotate(45 60 60)"/>' +
        '<rect x="24" y="24" width="72" height="72"/>' +
        '<circle cx="60" cy="60" r="15"/>' +
        '<path d="M0 60h18M102 60h18M60 0v18M60 102v18"/>' +
        '</g></svg>'
    )
  )
}

/** Rendered tile size in px. §C3: a 120px tile rendered at 132px. */
export const JAALI_RENDER_SIZE = 132

/**
 * 🔴 THE SITE CEILING. The poster runs tile 0.44 x layer 0.64 ≈ 0.28 effective,
 * but a poster is looked at, not read through. LV5-021 caps the site at ~0.12
 * so no text pair loses its AA margin over the lattice. In every case below the
 * TILE opacity is kept at the poster's 0.44 and only the LAYER is dialled down,
 * so the pattern keeps the poster's internal weighting instead of turning into
 * a flat grey wash.
 */
export const JAALI_EFFECTIVE_MAX = 0.12

/* ══════════════════════════════════════════════════════════════════════
   🔴 THE TWO DIALS (LV5-022 SC5)

   Kush, 2026-08-23: "utilize the pattern throughout the page more and
   broadly throughout the website." He likes the panel behind the hero
   phone; this supersedes the earlier "solid dark pages" ruling.

   CHANGE THESE TWO NUMBERS AND THE WHOLE SITE MOVES. They are effective
   opacities (tile x layer); <Jaali> derives the layer opacity from them,
   so the arithmetic only lives in one place.

   GROUND  every page, always on, fixed behind all content. Faint enough to
           read as tone rather than as pattern.
   PANEL   the deliberate local moments listed in <Jaali>'s header. Twice
           the ground, and the level Kush already approved behind the phone.

   🔴 GROUND'S CEILING IS 0.055, AND IT IS SET BY --jn-mute, NOT BY EYE.
   Mute (#93826F) is the site's weakest text token; on the ground it measures
   4.545:1 at 0.050 and 4.508:1 at 0.055, and it goes UNDER AA at 0.060. It is
   live text in exactly two places - the /pricing FAQ's "+" affordance and the
   /about contact form's labels. 0.050 is chosen over the 0.055 the ticket
   floated purely for that margin. To go higher, retire mute as a text colour
   in those two rules first.

   PANEL has more room: the weakest pair under a panel is --jn-text-faint at
   4.78:1, which holds AA up to about 0.15.
   ══════════════════════════════════════════════════════════════════════ */
export const JAALI_GROUND_OPACITY = 0.05
export const JAALI_PANEL_OPACITY = 0.11

/**
 * The jharokha arch, verbatim from v5()'s `archPath`.
 *
 * ⚠️ Its bounding box is NOT 660x720 despite the "660x720" shorthand in the
 * ticket: the crown's control points reach y = -34, so the real box is
 * x 0..660, y -34..720 — 660 x 754. The poster renders it in a viewBox of
 * "-6 -40 672 766" for exactly this reason. Using 660/720 as the aspect would
 * flatten the crown by 4.7%.
 */
export const ARCH_PATH =
  'M 0,720 L 0,318 C 0,176 74,84 226,26 C 286,3 320,-34 330,-34 C 340,-34 374,3 434,26 C 586,84 660,176 660,318 L 660,720 Z'

/** Bounding box of ARCH_PATH, derived above. */
export const ARCH_BOX = { x: 0, y: -34, w: 660, h: 754 } as const

/** viewBox string that fits ARCH_PATH exactly. */
export const ARCH_VIEWBOX = `${ARCH_BOX.x} ${ARCH_BOX.y} ${ARCH_BOX.w} ${ARCH_BOX.h}`

/** CSS `aspect-ratio` value. Locked — see trap 2 in the header. */
export const ARCH_ASPECT = `${ARCH_BOX.w} / ${ARCH_BOX.h}`

/** Centre of the bounding box, used as the origin for the keyline inset. */
export const ARCH_CENTRE = {
  x: ARCH_BOX.x + ARCH_BOX.w / 2, // 330
  y: ARCH_BOX.y + ARCH_BOX.h / 2, // 343
} as const

/**
 * The arch mapped into a 0..1 unit square, for `clipPathUnits="objectBoundingBox"`.
 * Rightmost transform applies first: translate the box down onto y=0, then
 * scale each axis by its own extent. That is a non-uniform scale ON PURPOSE —
 * it maps the path into the unit box, and the element's locked ARCH_ASPECT
 * then restores the true proportions at paint time. Trap 2 is about the
 * RENDERED box, and ARCH_ASPECT is what keeps that honest.
 */
export const ARCH_UNIT_TRANSFORM = `scale(${1 / ARCH_BOX.w} ${1 / ARCH_BOX.h}) translate(0 ${-ARCH_BOX.y})`

/**
 * Pulls the keyline just inside the frame so `clip-path` / the svg viewport
 * cannot shave the outer half of the stroke off at the extreme edges. The
 * poster uses the same translate-scale-translate trick for V5's inner keyline.
 */
export const ARCH_KEYLINE_INSET = `translate(${ARCH_CENTRE.x},${ARCH_CENTRE.y}) scale(0.994) translate(${-ARCH_CENTRE.x},${-ARCH_CENTRE.y})`

/**
 * Where the arch stops curving. Below y=318 the sides are dead straight, so a
 * full-width 16:9 box pinned to the base (660 x 371.25, i.e. y 348.75..720)
 * sits entirely inside the straight-sided region and the curve never touches
 * it. That is the fact /about's founder video slot is built on.
 */
export const ARCH_SHOULDER_Y = 318
