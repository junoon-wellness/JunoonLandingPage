import type { ReactNode } from 'react'
import Image from 'next/image'

/**
 * ONE iPhone frame for every app picture on the site (Kush, call of Mon 9 Nov:
 * "actually do the iPhone proportions"). Styles: `.ip` in app/home.css.
 *
 * True proportions: the screen is 1179 x 2556 (iPhone 15 and 16 Pro, 19.5:9),
 * the corners, bezel, side buttons and Dynamic Island are all sized from the
 * frame's own width (container units), so the phone stays an iPhone at any
 * size. Set the size with `width` (any CSS length) or from the parent.
 *
 * Three ways to fill the screen:
 *   - fit="full": a full-screen capture (it already carries its own status
 *     bar and island, so neither is drawn again).
 *   - fit="bottom": a capture cropped from the lower part of a screen; it sits
 *     at the bottom, the frame draws the status bar and island above it, and
 *     `screenBg` fills the gap in the capture's own top colour.
 *   - children: a screen drawn in code (breathwork, live classes, day 14),
 *     with the status bar and island drawn by the frame.
 */
export default function IPhoneFrame({
  src,
  alt = '',
  fit = 'full',
  screenBg = '#0f0b08',
  width,
  sizes = '240px',
  className,
  children,
}: {
  src?: string
  alt?: string
  fit?: 'full' | 'bottom'
  screenBg?: string
  width?: string
  sizes?: string
  className?: string
  children?: ReactNode
}) {
  const drawsChrome = !src || fit === 'bottom'
  return (
    <div className={`ip${className ? ` ${className}` : ''}`} style={width ? { width } : undefined}>
      <div className="ip-body">
        <i className="ip-btn ip-btn-action" aria-hidden="true" />
        <i className="ip-btn ip-btn-up" aria-hidden="true" />
        <i className="ip-btn ip-btn-down" aria-hidden="true" />
        <i className="ip-btn ip-btn-power" aria-hidden="true" />
        <div className="ip-screen" style={{ background: screenBg }}>
          {src ? (
            <Image
              className={fit === 'bottom' ? 'ip-img ip-img-bottom' : 'ip-img'}
              src={src}
              alt={alt}
              width={660}
              height={1430}
              sizes={sizes}
            />
          ) : (
            <div className="ip-drawn" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
              {children}
            </div>
          )}
          {drawsChrome ? (
            <>
              <div className="ip-status" aria-hidden="true">
                <span>9:41</span>
                <svg viewBox="0 0 54 12" aria-hidden="true">
                  <rect x="0" y="7" width="3" height="5" rx="1" />
                  <rect x="5" y="5" width="3" height="7" rx="1" />
                  <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                  <path d="M27 3.2c2.3 0 4.4.9 6 2.4l1.3-1.3A10.4 10.4 0 0 0 27 1.3c-2.8 0-5.4 1.1-7.3 3l1.3 1.3a8.5 8.5 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.3-1.3a6.6 6.6 0 0 0-9.4 0l1.3 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.4 1.6-1.6a2.3 2.3 0 0 0-3.2 0z" />
                  <rect x="37.5" y="1.5" width="14" height="9" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" />
                  <rect x="39" y="3" width="11" height="6" rx="1.4" />
                  <rect x="52.3" y="4.4" width="1.3" height="3.2" rx=".6" opacity=".5" />
                </svg>
              </div>
              <div className="ip-island" aria-hidden="true" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
