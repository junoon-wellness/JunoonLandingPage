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
  const height = Math.round((width * SCREEN_HEIGHT) / SCREEN_WIDTH)

  return (
    <div
      className={`v2-device ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
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
