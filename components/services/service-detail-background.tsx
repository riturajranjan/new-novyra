import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { SectionNoise } from "@/components/visual-backgrounds/section-noise";

/** Section 02's backdrop — deliberately quieter than the hero's: a single
 * faint grid, one very restrained glow low in the frame, and a texture
 * pass. No nodes, no flow lines, no labels — this section is meant to
 * read as "the page settling into reading mode" after the hero's motion. */
export function ServiceDetailBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#05070f" }}>
      <TechnicalGrid opacity={0.035} size={72} mask="linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)" />
      <AmbientGlow bottom="-20%" left="50%" width="60%" height="40%" color="var(--color-brand-cyan)" opacity={0.05} blur="180px" />
      <SectionNoise opacity={0.02} />
    </div>
  );
}
