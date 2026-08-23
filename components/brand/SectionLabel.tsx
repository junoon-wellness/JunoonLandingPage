import type { ReactNode } from 'react'
import Lotus from './Lotus'

/**
 * A section label with the lotus mark above it — the "3 · Lotus section
 * marks" board Kush picked (2026-08-23). Wraps the existing gold `.eyebrow`
 * text; `align` mirrors the label's own alignment.
 */
export default function SectionLabel({
  children,
  align = 'start',
  className,
  style,
}: {
  children: ReactNode
  align?: 'start' | 'center'
  className?: string
  style?: React.CSSProperties
}) {
  // Kush, 2026-08-23: centred labels keep the lotus ABOVE the text; left-
  // aligned ones ("What we're building next", "Articles") carry it BESIDE the
  // text so the block stays one line tall.
  if (align === 'center') {
    return (
      <div
        className={`jn-section-label jn-section-label--stacked${className ? ` ${className}` : ''}`}
        style={{ alignItems: 'center', ...style }}
      >
        <Lotus size={18} />
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          {children}
        </div>
      </div>
    )
  }
  return (
    <div
      className={`jn-section-label jn-section-label--inline${className ? ` ${className}` : ''}`}
      style={style}
    >
      <Lotus size={16} />
      <div className="eyebrow">{children}</div>
    </div>
  )
}
