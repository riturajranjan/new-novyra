import { EnergyRibbon } from "@/components/visual-backgrounds/energy-ribbon";
import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";

/** The homepage Pricing teaser's signature motif — "Energy Architecture":
 * one broad, softly blurred ribbon (blue → violet → magenta) traveling
 * lower-left → behind the recommended plan → upper-right, plus faint
 * concentric contour lines breathing around that plan so it reads as the
 * visual focal point without a loud badge doing all the work. */
export function PricingTeaserBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientGlow bottom="-10%" left="10%" width="40%" height="45%" color="var(--color-brand-blue)" opacity={0.08} blur="140px" />
      <AmbientGlow top="-10%" right="10%" width="40%" height="45%" color="var(--color-brand-pink)" opacity={0.06} blur="140px" />

      <EnergyRibbon
        id="pricing-teaser-ribbon"
        viewBox="0 0 1000 500"
        d="M-40,420 C220,380 320,260 480,220 C620,186 760,120 1040,60"
        strokeWidth={70}
        opacity={0.12}
        blur="50px"
        className="inset-0 h-full w-full"
      />

      <svg aria-hidden viewBox="0 0 400 400" className="animate-contour-breathe absolute top-1/2 left-[62%] h-[70%] w-[46%] -translate-x-1/2 -translate-y-1/2 opacity-30">
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--color-brand-purple)" strokeWidth="0.75" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="var(--color-brand-blue)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
