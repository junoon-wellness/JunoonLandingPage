import SplitLayout from "@/components/layout/SplitLayout";
import NavBar from "@/components/layout/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import FeatureSection from "@/components/sections/FeatureSection";
import HowItWorks from "@/components/sections/HowItWorks";
import PillarsSection from "@/components/sections/PillarsSection";
import FooterSection from "@/components/sections/FooterSection";
import { features } from "@/content";
import { clean } from "@/lib/text";
import { getActiveSubscriberCount } from "@/lib/beehiiv";

// Clean copy at the source so em dashes never reach the client component's
// serialized props (the visible text is cleaned at render too, but this keeps
// the rule honoured in the HTML payload as well).
const cleanedFeatures = features.map((f) => ({
  ...f,
  headline: clean(f.headline),
  body: clean(f.body),
  bullets: f.bullets.map(clean),
  screenshot: {
    ...f.screenshot,
    alt: clean(f.screenshot.alt),
    status: clean(f.screenshot.status),
  },
}));

export default async function Home() {
  const subscriberCount = await getActiveSubscriberCount();

  return (
    <>
      <NavBar />
      <SplitLayout subscriberCount={subscriberCount}>
        <HeroSection />
        <div id="features">
          {cleanedFeatures.map((feature, i) => (
            <FeatureSection key={feature.id} feature={feature} index={i} />
          ))}
        </div>
        <HowItWorks />
        <PillarsSection />
        <FooterSection />
      </SplitLayout>
    </>
  );
}
