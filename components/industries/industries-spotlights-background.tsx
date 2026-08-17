import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";

/** Section 04's backdrop — a darker, image/UI-led canvas with a touch of
 * warm undertone (distinct from the Explorer's cool blue quiet grid and
 * the hero's topology), since this section is carried by the visuals
 * themselves rather than background texture. */
export function IndustriesSpotlightsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#040509" }}>
      <AmbientGlow top="20%" left="-10%" width="40%" height="50%" color="var(--color-brand-amber)" opacity={0.04} blur="170px" />
      <AmbientGlow bottom="10%" right="-8%" width="42%" height="46%" color="var(--color-brand-blue)" opacity={0.05} blur="160px" />
    </div>
  );
}
