import WaitlistPageV2 from "@/components/waitlist/WaitlistPageV2";

/**
 * The junoonwellness.com marketing site (LV5-002: the app is live, so this
 * is no longer a waitlist page — see WaitlistPageV2's component name, kept
 * unchanged as an internal identifier only).
 *
 * The previous SplitLayout design (sticky 40% dark panel + 60% scrolling
 * column) has been replaced by the full-width product-first redesign. The
 * components it used still exist under components/layout and
 * components/sections but are no longer rendered.
 *
 * LV5-024: this used to fetch a live beehiiv subscriber count and thread a
 * `?ref=` source param down to HeroV2 for signup attribution. Both were dead
 * — HeroV2 dropped its own signup form under LV5-018 (the App Store badge
 * replaced it) and never read either value again, so the fetch and the prop
 * threading through WaitlistPageV2 were pure plumbing with nothing on the
 * other end. lib/beehiiv.ts and the SPOTS_CLAIMED_FALLBACK constant went
 * with it — grep proved both had no other caller.
 */
export default function Home() {
  return <WaitlistPageV2 />;
}
