import { ReactNode } from "react";
import CTAPanel from "@/components/cta/CTAPanel";

/**
 * The whole design: a sticky left CTA panel (40%) over a scrollable right
 * feature column (60%) on desktop. On mobile it stacks — CTA panel first
 * (full width, not sticky), then the feature sections below.
 *
 * Uses window-level scroll with a sticky left panel (single scrollbar) so the
 * left panel "never moves" while the right column scrolls past it.
 */
export default function SplitLayout({
  children,
  subscriberCount,
}: {
  children: ReactNode;
  subscriberCount?: number | null;
}) {
  return (
    <div className="lg:flex">
      <aside className="bg-bark lg:sticky lg:top-0 lg:h-screen lg:w-2/5 lg:flex-shrink-0">
        <CTAPanel subscriberCount={subscriberCount} />
      </aside>
      <main className="bg-cream lg:w-3/5">{children}</main>
    </div>
  );
}
