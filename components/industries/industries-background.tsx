import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { PerspectiveGrid } from "@/components/visual-backgrounds/perspective-grid";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";
import { SignalNode } from "@/components/visual-backgrounds/signal-node";

const INDEX_LABELS = [
  { text: "01", top: "10%", left: "6%" },
  { text: "02", top: "10%", left: "22%" },
  { text: "03", top: "78%", left: "10%" },
  { text: "04", top: "16%", left: "88%" },
  { text: "05", top: "80%", left: "80%" },
  { text: "06", top: "50%", left: "94%" },
];

/** Industries' signature motif — "Modular Digital Landscape": a perspective
 * floor plane (architectural blueprint receding into depth) rather than a
 * flat grid, a controlled blue/cyan ambient wash, faint industry-index
 * numerals scattered at the edges, and one soft diagonal scan every ~14s.
 * Kept quieter than the six colorful industry cards it sits behind. */
export function IndustriesBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientGlow top="-10%" right="-10%" width="50%" height="60%" color="var(--color-brand-cyan)" opacity={0.1} blur="150px" />
      <AmbientGlow bottom="-15%" left="10%" width="42%" height="50%" color="var(--color-brand-blue)" opacity={0.07} blur="150px" />

      <PerspectiveGrid origin="bottom" opacity={0.13} sweep />

      {INDEX_LABELS.map((l) => (
        <BackgroundLabel key={l.text} text={l.text} top={l.top} left={l.left} opacity={0.05} />
      ))}

      <SignalNode x="24%" y="34%" color="var(--color-brand-cyan)" delay="0.6s" />
      <SignalNode x="66%" y="20%" color="var(--color-brand-blue)" delay="2.4s" />
      <SignalNode x="80%" y="62%" color="var(--color-brand-cyan)" delay="4.1s" />
    </div>
  );
}
