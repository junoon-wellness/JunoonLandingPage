import type { CSSProperties } from 'react'
import { hexA, jaaliTile, JAALI_RENDER_SIZE } from './motifs'

/**
 * THE JAALI LATTICE as a background layer (LV5-021).
 *
 * An absolutely-positioned, pointer-transparent, aria-hidden layer that tiles
 * the poster's jaali and lays the poster's vignette over it. Drop it as the
 * first child of any `position: relative` box.
 *
 * Deliberately NOT a page-wide texture: Kush ruled the pages solid dark
 * (LV5-018, which took the ambient ground radials back off the hero). This is
 * for panels — behind the phone, behind a card — where it reads as one
 * considered surface rather than as wallpaper.
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
  /** Opacity baked into the tile's SVG group. Poster value is 0.44. */
  tileOpacity?: number
  /** Opacity of the whole layer. Effective = tileOpacity x layerOpacity. */
  layerOpacity?: number
  /** The vignette is not optional styling — see trap 1 in motifs.ts. */
  vignette?: boolean
  /** Ground colour the vignette fades INTO. Default: the page background. */
  vignetteColor?: string
  /** Alpha the vignette reaches at its 80% stop. Poster value is 0.76. */
  vignetteStrength?: number
  /** Rendered tile size in px. */
  size?: number
  /** CSS inset for the layer. Bleed it past its box to soften the edges. */
  inset?: string
  radius?: number | string
  zIndex?: number
  className?: string
  style?: CSSProperties
}

export default function Jaali({
  stroke = '#D9A03C',
  tileOpacity = 0.44,
  layerOpacity = 0.25,
  vignette = true,
  vignetteColor = '#1C1410',
  vignetteStrength = 0.76,
  size = JAALI_RENDER_SIZE,
  inset = '0',
  radius,
  zIndex = 0,
  className,
  style,
}: JaaliProps) {
  const tile = jaaliTile(stroke, tileOpacity)

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset,
        zIndex,
        pointerEvents: 'none',
        borderRadius: radius,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${tile}")`,
          backgroundSize: `${size}px ${size}px`,
          backgroundRepeat: 'repeat',
          opacity: layerOpacity,
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
