import { ReactNode } from "react";

/**
 * Visible placeholder marker for content not yet available (links, emails,
 * handles). Renders link-styled, greyed-out text with a dashed clay border
 * at 40% opacity so it is obvious during review. Per the handoff placeholder
 * policy: never omit, never use a broken link, never invent a URL.
 */
export default function Placeholder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-sm border border-dashed border-clay/40 px-2 py-0.5 font-sans text-xs text-driftwood ${className}`}
    >
      {children}
    </span>
  );
}
