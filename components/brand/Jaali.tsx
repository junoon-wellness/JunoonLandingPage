import type { CSSProperties } from 'react'
import {
  hexA,
  jaaliTile,
  JAALI_GROUND_OPACITY,
  JAALI_PANEL_OPACITY,
  JAALI_RENDER_SIZE,
} from './motifs'

/**
 * THE JAALI LATTICE as a background layer (LV5-021).
 *
 * An absolutely-positioned, pointer-transparent, aria-hidden layer that tiles
 * the poster's jaali and lays the poster's vignette over it.
 *
 * 🔴 ONE GEOMETRY (LV5-024, ADDED FIRST note): `inset` is ALWAYS `0` — there
 * is no per-instance override any more. Every Jaali instance, ground or
 * panel, is `position:absolute; inset:0` against its nearest POSITIONED
 * ancestor, and every call site in this codebase is placed so that ancestor
 * is `<body>` (see app/layout.tsx: `position:relative`) — i.e. THE PAGE
 * WRAPPER, never a local child element. `background-size` is the same
 * `JAALI_RENDER_SIZE` tile and `background-position` is the same explicit
 * `0 0` for both registers, so two instances on the same page are, by
 * construction, the exact same tile grid: there is no offset for them to
 * drift out of registration on.
 *
 * TWO REGISTERS, one component (LV5-022 SC5, re-plumbed LV5-024):
 *   variant="ground"  the faint site-wide layer. Use <JaaliGround> rather
 *                     than calling this directly — it is mounted once in
 *                     app/layout.tsx and covers every page.
 *   variant="panel"   the stronger local moments (home hero phone, the
 *                     feature-tab phone pair, the /about instructor grid,
 *                     the /library header, the ground behind the /pricing
 *                     card). A panel is a SECOND, full-page copy of the same
 *                     tile — not a smaller box sized to the target — with a
 *                     `mask-image` ellipse (`maskPosition`/`maskSize`) that
 *                     reveals it only near the target. Because the copy's
 *                     own box is `inset:0` off the SAME containing block as
 *                     the ground layer, its tile origin is identical to the
 *                     ground's by construction; the mask only controls where
 *                     it is VISIBLE, never where the grid starts.
 *                     ⚠️ Mask coordinates below are best-effort estimates —
 *                     no live browser pass was available this round (LV5-024
 *                     machine constraints). They fix the registration bug
 *                     regardless of how well-centred they are: the grid
 *                     lines coincide everywhere on the page whether or not
 *                     the mask is a few px off the target.
 *
 * Both draw their opacity from the two constants in motifs.ts, so the whole
 * site re-tunes from one place. An explicit `layerOpacity` still wins if a
 * single instance needs to differ.
 *
 * No 'use client': it renders a div with inline styles and holds no state, so
 * it stays a server component and costs the bundle nothing.
 *
 * ⚠️ `stroke` must be a LITERAL colour, never `var(--jn-turmeric)`. The tile is
 * a data: URI, and a data URI is parsed outside the document's CSS cascade, so
 * a custom property inside it resolves to nothing and the lattice silently
 * renders blank. The default is the poster's own accentAlt, which the site
 * already carries as --jn-gold-alt (#D9A03C, measured 7.82:1 on --jn-bg by
 * LV5-019).
 */
export interface JaaliProps {
  /** Literal colour only — see the warning above. */
  stroke?: string
  /** Which of the two site registers this layer belongs to. */
  variant?: 'ground' | 'panel'
  /** Opacity baked into the tile's SVG group. Poster value is 0.44. */
  tileOpacity?: number
  /**
   * Escape hatch. Normally leave this alone and let `variant` set it from the
   * constants in motifs.ts — that is what keeps the site tunable from one
   * place. Effective opacity = tileOpacity x layerOpacity.
   */
  layerOpacity?: number
  /** The vignette is not optional styling — see trap 1 in motifs.ts. */
  vignette?: boolean
  /** Ground colour the vignette fades INTO. Default: the page background. */
  vignetteColor?: string
  /** Alpha the vignette reaches at its 80% stop. Poster value is 0.76. */
  vignetteStrength?: number
  /** Rendered tile size in px. */
  size?: number
  /**
   * `variant="panel"` only. CSS `mask-position` for the ellipse that reveals
   * this copy near its target — e.g. `'76% 340px'`. Omitted on `ground`
   * (unmasked, fully visible) and required in practice for `panel` (an
   * unmasked panel would just be a second full-page ground at a different
   * opacity, not a local moment).
   */
  maskPosition?: string
  /** `variant="panel"` only. CSS `mask-size` for the ellipse, e.g. `'820px 820px'`. */
  maskSize?: string
  zIndex?: number
  className?: string
  style?: CSSProperties
}

export default function Jaali({
  stroke = '#D9A03C',
  variant = 'panel',
  tileOpacity = 0.44,
  layerOpacity,
  vignette = true,
  vignetteColor = '#1C1410',
  vignetteStrength = 0.76,
  size = JAALI_RENDER_SIZE,
  maskPosition,
  maskSize,
  zIndex = 0,
  className,
  style,
}: JaaliProps) {
  const tile = jaaliTile(stroke, tileOpacity)

  /*
    The layer opacity is DERIVED so the constants can be stated as the thing
    that actually matters — what a stroke pixel ends up at over the ground.
    Hand-writing a layer figure at each call site is how the two registers
    would quietly drift apart.
  */
  const effective = variant === 'ground' ? JAALI_GROUND_OPACITY : JAALI_PANEL_OPACITY
  const resolvedLayerOpacity = layerOpacity ?? effective / tileOpacity

  /*
    The mask lives on the OUTER wrapper (tile + vignette together) so a
    panel's brightened patch and its own edge-softening vignette reveal as
    one shape, never a hard-edged tile rectangle with a separately-shaped
    vignette underneath it.
  */
  const maskImage = maskPosition
    ? 'radial-gradient(ellipse at center, black 0%, black 55%, transparent 100%)'
    : undefined

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex,
        pointerEvents: 'none',
        overflow: 'hidden',
        ...(maskImage && {
          WebkitMaskImage: maskImage,
          maskImage,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: maskPosition,
          maskPosition,
          WebkitMaskSize: maskSize,
          maskSize,
        }),
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${tile}")`,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: '0 0',
          backgroundRepeat: 'repeat',
          opacity: resolvedLayerOpacity,
        }}
      />
      {vignette && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            /*
              Both stops are the SAME colour, one at alpha 0 — never the
              `transparent` keyword. `transparent` is rgba(0,0,0,0), so a
              browser interpolating towards it drags the midtones through
              black and leaves a dirty ring. The poster hit this first and
              solved it the same way (hexA(c.dark, 0)).
            */
            background: `radial-gradient(ellipse at 50% 34%, ${hexA(
              vignetteColor,
              0
            )} 34%, ${hexA(vignetteColor, vignetteStrength)} 80%)`,
          }}
        />
      )}
    </div>
  )
}
