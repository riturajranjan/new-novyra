import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";

/** Pricing hero's backdrop — same visual grammar as the About/Services
 * heroes (a giant cropped wordmark, a faint engineering grid, directional
 * ambient light, tiny system-label texture) at a scale suited to a
 * compact ~420–540px hero rather than a near-full-viewport one. */
export function PricingHeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#07070f" }}>
      <span
        className="absolute top-1/2 right-[-2%] leading-none font-bold whitespace-nowrap text-white select-none"
        style={{
          fontSize: "clamp(120px, 14vw, 220px)",
          letterSpacing: "-0.05em",
          opacity: 0.03,
          transform: "translateY(-50%)",
        }}
      >
        PRICING
      </span>

      <TechnicalGrid opacity={0.045} size={52} mask="radial-gradient(70% 65% at 32% 45%, black, transparent)" />

      <AmbientGlow top="-16%" left="-10%" width="42%" height="60%" color="var(--color-brand-blue)" opacity={0.14} blur="140px" />
      <AmbientGlow bottom="-20%" right="-8%" width="40%" height="56%" color="var(--color-brand-purple)" opacity={0.13} blur="140px" />
      <AmbientGlow top="30%" right="18%" width="20%" height="30%" color="var(--color-brand-cyan)" opacity={0.08} blur="120px" />

      <BackgroundLabel text="Starter · Professional · Business" top="10%" left="6%" opacity={0.09} />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
