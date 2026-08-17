import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { SectionNoise } from "@/components/visual-backgrounds/section-noise";
import type { AccentColor } from "@/content/hero-screens";

interface ArticleHeroBackgroundProps {
  accent: AccentColor;
}

/** The hero's own zone — deep navy/black, a faint technical grid, and one
 * large violet illumination plus a smaller accent-tinted one keyed to the
 * article's category, distinct from the body zone below it. */
export function ArticleHeroBackground({ accent }: ArticleHeroBackgroundProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#05070f" }}>
      <TechnicalGrid opacity={0.04} size={60} mask="radial-gradient(70% 60% at 30% 30%, black, transparent)" />
      <AmbientGlow top="-8%" left="-6%" width="48%" height="60%" color="var(--color-brand-purple)" opacity={0.12} blur="150px" />
      <AmbientGlow top="10%" right="-8%" width="40%" height="55%" color={`var(--color-brand-${accent})`} opacity={0.1} blur="140px" />
      <SectionNoise opacity={0.025} />
    </div>
  );
}
