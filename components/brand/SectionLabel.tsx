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
  return (
    <div
      className={`jn-section-label${className ? ` ${className}` : ''}`}
      style={{ alignItems: align === 'center' ? 'center' : 'flex-start', ...style }}
    >
      <Lotus size={18} />
      <div className="eyebrow" style={align === 'center' ? { justifyContent: 'center' } : undefined}>
        {children}
      </div>
    </div>
  )
}
