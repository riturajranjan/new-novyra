import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { GiantNumber } from "@/components/visual-backgrounds/background-label";

/** Section 05's backdrop — a warmer, quieter register than Process: a
 * single wide amber-tinted glow (echoing the "Concept" disclosure badge's
 * color) and one oversized cropped numeral bleeding off the top edge,
 * rather than the grid/node language used everywhere else on the page. */
export function SelectedWorkBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#07070c" }}>
      <TechnicalGrid opacity={0.03} size={64} mask="radial-gradient(70% 60% at 30% 20%, black, transparent)" />
      <AmbientGlow top="-15%" right="10%" width="55%" height="50%" color="var(--color-brand-amber)" opacity={0.05} blur="170px" />
      <AmbientGlow bottom="-10%" left="-6%" width="42%" height="46%" color="var(--color-brand-purple)" opacity={0.06} blur="160px" />
      <GiantNumber value="05" top="-6%" left="82%" size="16rem" opacity={0.025} />
    </div>
  );
}
