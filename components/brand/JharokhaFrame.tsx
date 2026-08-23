'use client'

import { useId, type CSSProperties, type ReactNode } from 'react'
import {
  ARCH_ASPECT,
  ARCH_KEYLINE_INSET,
  ARCH_PATH,
  ARCH_UNIT_TRANSFORM,
  ARCH_VIEWBOX,
} from './motifs'

/**
 * THE JHAROKHA ARCH as a frame (LV5-021).
 *
 * Clips whatever you give it to V5's arch and optionally draws the poster's
 * gold hairline around the opening. Children fill the frame — pass an
 * `<Image>` with `object-fit: cover`, a `<video>`, or a whole composed block.
 *
 * ⚠️ THE ASPECT RATIO IS THE COMPONENT'S, NOT THE CALLER'S. It sets
 * `aspect-ratio: 660 / 754` on itself and that inline value beats whatever
 * class you also hand it. Give it a width and let the height follow. Overriding
 * the ratio through `style` distorts the arch (motifs.ts trap 2) — resize the
 * frame instead.
 *
 * 'use client' is required only for `useId`, which cannot run in a server
 * component. Server pages import it happily; children rendered on the server
 * pass straight through.
 */
export interface JharokhaFrameProps {
  children?: ReactNode
  /** `true` for the default gold hairline, or a colour, or `false` for none. */
  stroke?: boolean | string
  /** Hairline width in CSS px — held constant at any frame size. */
  strokeWidth?: number
  strokeOpacity?: number
  className?: string
  style?: CSSProperties
}

export default function JharokhaFrame({
  children,
  stroke = true,
  strokeWidth = 1,
  strokeOpacity = 0.55,
  className,
  style,
}: JharokhaFrameProps) {
  /*
    React's useId returns a value wrapped in punctuation (':r0:' on 18,
    '«r0»' on 19). Both are legal HTML ids and both break `url(#...)`, which
    is CSS-parsed — the clip silently never applies and the frame renders as a
    plain rectangle. Strip to word characters.
  */
  const clipId = `jn-arch-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const strokeColor = typeof stroke === 'string' ? stroke : 'var(--jn-gold-alt)'

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        clipPath: `url(#${clipId})`,
        ...style,
        /* Spread last so a caller's `style` cannot flatten the crown. */
        aspectRatio: ARCH_ASPECT,
      }}
    >
      {/*
        The clip definition travels with the frame so there is no global
        <defs> block to keep in sync, and useId keeps two frames on one page
        from colliding. <defs> content never paints, so living inside the
        clipped element costs nothing.
      */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={ARCH_PATH} transform={ARCH_UNIT_TRANSFORM} />
          </clipPath>
        </defs>
      </svg>

      {children}

      {stroke !== false && (
        <svg
          viewBox={ARCH_VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <path
            d={ARCH_PATH}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            /* Keeps the hairline 1px at every frame size instead of
               scaling with the 660-unit viewBox. */
            vectorEffect="non-scaling-stroke"
            transform={ARCH_KEYLINE_INSET}
          />
        </svg>
      )}
    </div>
  )
}
