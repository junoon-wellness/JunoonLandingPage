import Image from 'next/image'

interface PhoneFrameProps {
  src: string
  alt: string
  /** Rendered width in CSS px. Height is derived from the 640:1391 source aspect. */
  width?: number
  className?: string
  priority?: boolean
}

/**
 * Static version of the frame used by DeviceCarousel — same bezel, radius and
 * shadow, so product shots look identical wherever they appear on the page.
 */
export default function PhoneFrame({
  src,
  alt,
  width = 232,
  className = '',
  priority = false,
}: PhoneFrameProps) {
  const height = Math.round((width * 1391) / 640)

  return (
    <div
      className={`v2-device ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={src}
        alt={alt}
        width={640}
        height={1391}
        sizes={`${width}px`}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </div>
  )
}
