import Jaali from './Jaali'

/**
 * THE SITE-WIDE LATTICE GROUND (LV5-022 SC5, re-plumbed LV5-024)
 *
 * Kush, 2026-08-23: "utilize the pattern throughout the page more and broadly
 * throughout the website." Mounted ONCE in app/layout.tsx, so every route gets
 * it without any page opting in — and so there is exactly one thing to remove
 * if he changes his mind. This supersedes the "solid dark pages" ruling of
 * LV5-018.
 *
 * 🔴 ABSOLUTE, not fixed (LV5-024). Kush, 2026-08-23, on the same preview:
 * "there's 2 layers of this so they're slightly off — either make it all one
 * or line them up perfectly." The site-wide ground was `position:fixed`
 * (viewport-anchored, never scrolls) while every panel was `position:absolute`
 * inside document-flow ancestors (scrolls with the page) — two DIFFERENT
 * scroll behaviours, so even with identical tile geometry the two patterns
 * would slide out of phase the moment the page scrolled at all. `absolute`
 * here, sized by `inset:0` against `<body>` (see `position:relative` on body
 * in app/layout.tsx — that is THE PAGE WRAPPER every Jaali instance now
 * shares as its containing block), makes ground scroll WITH the document,
 * exactly like every panel, so the two registers stay in the same coordinate
 * space at every scroll position, not just at the top of the page.
 *
 * 🔴 z-index: -1 IS LOAD-BEARING. Page content is a mix of positioned and
 * non-positioned elements; anything at z-index 0 or above would paint over
 * the non-positioned half of it. A negative index puts the layer below every
 * descendant of the root but still ABOVE the canvas background, because the
 * body's background-color propagates to the canvas and paints first. That
 * ordering is why `body { background-color: var(--jn-bg) }` must stay. Panel
 * instances also use zIndex={-1} for the same reason, and paint above ground
 * because they are later in DOM tree order at equal z-index.
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
      style={{ position: 'absolute' }}
      /* The vignette is what stops a full-viewport lattice reading as
         wallpaper: it pulls the pattern back to nothing at the margins, so
         the eye finds it in the middle of the page and loses it at the edges,
         exactly as on the poster. Lattice and vignette are one decision. */
      vignette
      vignetteStrength={0.82}
    />
  )
}
