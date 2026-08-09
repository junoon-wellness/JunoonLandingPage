import Image from 'next/image'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/lib/screens'

interface PhoneFrameProps {
  src: string
  alt: string
  /** Rendered width in CSS px. Height is derived from the source aspect. */
  width?: number
  className?: string
  priority?: boolean
}

/**
 * The page's phone frame: bezel, radius and shadow, so product shots look
 * identical wherever they appear.
 *
 * ⚠️ Still load-bearing after v4 round 2 deleted DeviceCarousel. The scroll
 * story's mobile/reduced-motion cards and the feature rail both render through
 * this; it is not carousel leftovers.
 */
export default function PhoneFrame({
  src,
  alt,
  width = 232,
  className = '',
  priority = false,
}: PhoneFrameProps) {
  return (
    <div
      className={`v2-device ${className}`}
      /*
        ⚠️ The prop is the FALLBACK inside var(), not an inline
        `--pf-w: Npx`. Setting the property inline would defeat the whole
        point: an inline custom-property declaration beats any stylesheet
        rule on that same element, so a media query could never override
        it. Read with a fallback instead, and any ancestor can set
        `--pf-w` and have it inherit down — ordinary specificity, no
        !important, which this codebase has already been bitten by.

        Height comes from aspect-ratio for the same reason: override the
        width and the frame stays in proportion on its own, instead of
        needing a second override that can drift out of sync.
      */
      style={{
        width: `var(--pf-w, ${width}px)`,
        aspectRatio: `${SCREEN_WIDTH} / ${SCREEN_HEIGHT}`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        sizes={`${width}px`}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </div>
  )
}
