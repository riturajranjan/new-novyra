import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";

/** Section 06's backdrop — the calmest on the page: a single faint grid on
 * a clean deep navy field, no glows, no nodes. A deliberate breath before
 * the CTA's much stronger gradient close. */
export function ServicesPrinciplesBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#04050a" }}>
      <TechnicalGrid opacity={0.03} size={64} mask="radial-gradient(70% 60% at 50% 40%, black, transparent)" />
    </div>
  );
}
