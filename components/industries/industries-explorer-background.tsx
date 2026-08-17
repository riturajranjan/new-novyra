import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";

/** Section 02's backdrop — a clean, near-black editorial canvas: one faint
 * grid, one very restrained glow. No topology lines, no nodes — the
 * ecosystem visual already lives in the hero above; this section is
 * meant to read as quiet reading space. */
export function IndustriesExplorerBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#05060c" }}>
      <TechnicalGrid opacity={0.03} size={68} mask="linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)" />
      <AmbientGlow top="-16%" right="-6%" width="46%" height="42%" color="var(--color-brand-blue)" opacity={0.05} blur="170px" />
    </div>
  );
}
