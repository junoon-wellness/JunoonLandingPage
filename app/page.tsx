import WaitlistPageV2 from "@/components/waitlist/WaitlistPageV2";
import { getActiveSubscriberCount } from "@/lib/beehiiv";
import { SPOTS_CLAIMED_FALLBACK, normaliseSource } from "@/lib/constants";

/**
 * The waitlist landing page.
 *
 * The previous SplitLayout design (sticky 40% dark panel + 60% scrolling
 * column) has been replaced by the full-width product-first redesign. The
 * components it used still exist under components/layout and
 * components/sections but are no longer rendered.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const source = normaliseSource(params.ref);

  // Real active-subscriber count from beehiiv (cached 60s in lib/beehiiv.ts).
  // Returns null when beehiiv is unconfigured or the request fails.
  const subscriberCount = await getActiveSubscriberCount();

  return (
    <WaitlistPageV2
      initialClaimed={subscriberCount ?? SPOTS_CLAIMED_FALLBACK}
      source={source}
    />
  );
}
