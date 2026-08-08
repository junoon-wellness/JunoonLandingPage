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
 * Static version of the frame used by DeviceCarousel - same bezel, radius and
 * shadow, so product shots look identical wherever they appear on the page.
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
