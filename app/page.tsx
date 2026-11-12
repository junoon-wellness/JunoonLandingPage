import HomeLanding from "@/components/home/HomeLanding";

/**
 * The junoonwellness.com home page.
 *
 * Mon 9 Nov 2026 (launch): rebuilt to match the approved mock-up,
 * junoon-team pages/mockups/landing-editable-1106.html ("Arjav's words,
 * 8 Nov"), on Kush's word: the approved page is the editable mock-up, not the
 * old site layout. See components/home/HomeLanding.tsx and app/home.css.
 *
 * The old home (components/waitlist/WaitlistPageV2 and its sections) is no
 * longer rendered here; its files stay on disk, unchanged from main.
 */
export default function Home() {
  return <HomeLanding />;
}
