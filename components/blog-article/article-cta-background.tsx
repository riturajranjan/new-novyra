import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { SectionNoise } from "@/components/visual-backgrounds/section-noise";

/** The article's closing chapter — stronger illumination than the reading
 * zone, but still one restrained composition (two soft glows + a faint
 * grid), not a giant flat gradient rectangle. */
export function ArticleCtaBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#070b1a" }}>
      <TechnicalGrid opacity={0.04} size={52} mask="radial-gradient(65% 70% at 50% 45%, black, transparent)" />
      <AmbientGlow top="-10%" left="8%" width="46%" height="70%" color="var(--color-brand-blue)" opacity={0.14} blur="140px" />
      <AmbientGlow bottom="-15%" right="4%" width="48%" height="72%" color="var(--color-brand-purple)" opacity={0.16} blur="150px" />
      <AmbientGlow top="30%" right="20%" width="26%" height="40%" color="var(--color-brand-pink)" opacity={0.07} blur="120px" />
      <SectionNoise opacity={0.025} />
    </div>
  );
}
