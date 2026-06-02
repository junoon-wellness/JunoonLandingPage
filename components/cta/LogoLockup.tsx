import Image from "next/image";
import { nav } from "@/content";

/**
 * Logo lockup matching the iOS LogoLockup: circular logo mark +
 * "Junoon" in Cormorant Garamond light + "." in clay + "Beta" mono tag.
 */
export default function LogoLockup() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo-clay-no-text.png"
        alt="Junoon logo"
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-contain"
        priority
      />
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-3xl font-light leading-none text-ivory">
          {nav.logo}
        </span>
        <span className="font-serif text-3xl font-light leading-none text-clay">.</span>
        <span className="mono-label ml-1 rounded-sm border border-clay/40 px-1.5 py-0.5 font-mono text-[0.5rem] uppercase text-clay">
          {nav.tagline}
        </span>
      </div>
    </div>
  );
}
