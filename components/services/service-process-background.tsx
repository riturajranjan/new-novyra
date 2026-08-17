import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { BlueprintField } from "@/components/visual-backgrounds/blueprint-field";

const LINES = [
  { d: "M0,120 L800,120", delay: 0 },
  { d: "M0,380 L800,380", delay: 0.15 },
];

/** Section 04's backdrop — an "engineering documentation" treatment
 * (corner brackets, ruled guide lines, mono coordinate labels) rather
 * than the hero's node network or the detail section's plain quiet grid,
 * so the build process reads as a distinct, more technical register. */
export function ServiceProcessBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#080a14" }}>
      <TechnicalGrid opacity={0.04} size={48} mask="radial-gradient(85% 70% at 50% 50%, black, transparent)" />
      <AmbientGlow top="10%" left="-8%" width="40%" height="50%" color="var(--color-brand-pink)" opacity={0.06} blur="160px" />
      <AmbientGlow bottom="0%" right="-6%" width="36%" height="46%" color="var(--color-brand-blue)" opacity={0.06} blur="150px" />
      <BlueprintField
        color="var(--color-brand-cyan)"
        opacity={0.14}
        lines={LINES}
        labels={[
          { text: "PROCESS / 01–06", top: "6%", left: "6%" },
          { text: "ENG.DOC", top: "92%", left: "88%" },
        ]}
      />
    </div>
  );
}
