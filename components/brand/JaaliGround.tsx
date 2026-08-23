import Jaali from './Jaali'

/**
 * THE SITE-WIDE LATTICE GROUND (LV5-022 SC5)
 *
 * Kush, 2026-08-23: "utilize the pattern throughout the page more and broadly
 * throughout the website." Mounted ONCE in app/layout.tsx, so every route gets
 * it without any page opting in — and so there is exactly one thing to remove
 * if he changes his mind. This supersedes the "solid dark pages" ruling of
 * LV5-018.
 *
 * FIXED, not absolute. The lattice stays put while the page scrolls over it,
 * which keeps it reading as the ground the site sits on rather than as a
 * texture glued to a section. It also means one element covers a document of
 * any length. If Kush wants it to scroll with the page instead, change
 * `position` to absolute here and give it a height — that is the only edit.
 *
 * 🔴 z-index: -1 IS LOAD-BEARING. Page content is a mix of positioned and
 * non-positioned elements; anything at z-index 0 or above would paint over
 * the non-positioned half of it. A negative index puts the layer below every
 * descendant of the root but still ABOVE the canvas background, because the
 * body's background-color propagates to the canvas and paints first. That
 * ordering is why `body { background-color: var(--jn-bg) }` must stay.
 *
 * ⚠️ AN OPAQUE SECTION BACKGROUND HIDES THIS. LV5-022 removed the redundant
 * `background: var(--jn-bg)` fills from the home page's sections and from
 * `.jn-story` for exactly that reason — they were the same colour as the
 * ground and predate this layer. Do not reintroduce one without checking
 * what it does to the lattice underneath. Genuinely different surfaces
 * (`--jn-surface` blocks, the mobile nav sheet, /tour) are fine and are
 * meant to cover it.
 */
export default function JaaliGround() {
  return (
    <Jaali
      variant="ground"
      zIndex={-1}
      style={{ position: 'fixed' }}
      /* The vignette is what stops a full-viewport lattice reading as
         wallpaper: it pulls the pattern back to nothing at the margins, so
         the eye finds it in the middle of the page and loses it at the edges,
         exactly as on the poster. Lattice and vignette are one decision. */
      vignette
      vignetteStrength={0.82}
    />
  )
}
