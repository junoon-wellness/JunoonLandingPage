import Image from "next/image";

type PhoneFrameProps = {
  /** Public path to the screenshot, e.g. "/screenshots/screenshot-coach.png" */
  src?: string;
  alt: string;
  /** Short caption used in the placeholder, e.g. "coach" */
  label: string;
  /** When true (or no src), render the clay/cream placeholder instead of an image */
  placeholder?: boolean;
  className?: string;
};

/**
 * iPhone 15 Pro–style frame: slightly squared corners, Dynamic Island notch,
 * thin bark bezel (~5% opacity), and the brand phone shadow. The screenshot
 * fills the screen cropped to fit. When no real screenshot is available it
 * renders a warm clay/cream placeholder with a dashed clay border, per the
 * handoff placeholder policy.
 */
export default function PhoneFrame({
  src,
  alt,
  label,
  placeholder,
  className = "",
}: PhoneFrameProps) {
  const showPlaceholder = placeholder || !src;

  return (
    <div
      className={`relative aspect-[1179/2556] w-full max-w-[300px] rounded-[2.6rem] bg-bark p-[3px] shadow-phone ring-1 ring-bark/5 ${className}`}
    >
      {/* Inner screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-cream">
        {showPlaceholder ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[2.4rem] border-2 border-dashed border-clay/40 bg-gradient-to-b from-clayLight via-cream to-canvas p-6 text-center">
            <span className="mono-label font-mono text-[0.625rem] uppercase text-clay/80">
              Screenshot: {label}
            </span>
            <span className="font-sans text-xs text-driftwood">
              capture from device
            </span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 60vw, 300px"
            className="object-cover"
          />
        )}

        {/* Dynamic Island */}
        <div className="pointer-events-none absolute left-1/2 top-3 z-10 h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-bark" />
      </div>
    </div>
  );
}
