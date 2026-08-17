import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { FlowField } from "@/components/visual-backgrounds/flow-field";
import { SignalNode } from "@/components/visual-backgrounds/signal-node";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";

const PATHS = [
  { d: "M20,60 C120,40 180,90 280,70 C360,55 420,90 500,72", color: "var(--color-brand-blue)", delay: "0s" },
  { d: "M40,180 C140,160 220,210 320,190 C400,175 460,210 540,192", color: "var(--color-brand-cyan)", delay: "1.4s", slow: true },
];

const NODES = [
  { x: "18%", y: "22%", color: "var(--color-brand-blue)", delay: "0.3s" },
  { x: "46%", y: "14%", color: "var(--color-brand-cyan)", delay: "1.8s" },
  { x: "70%", y: "30%", color: "var(--color-brand-purple)", delay: "3.1s" },
  { x: "84%", y: "58%", color: "var(--color-brand-pink)", delay: "2.2s" },
];

/** Services hero's signature motif — a "capability network": a faint
 * engineering grid, two thin connecting paths, a handful of animated
 * nodes, tiny coordinate labels, blue light entering from the left,
 * violet/pink atmosphere pooling toward the bottom right, and a giant,
 * heavily-cropped "SERVICES" wordmark standing in for About's "NOVYRA" —
 * same visual grammar, a different word and a different light direction,
 * so the two heroes don't read as palette-swapped copies of each other. */
export function ServicesHeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#060911" }}>
      <span
        className="absolute top-1/2 left-[-2%] leading-none font-bold whitespace-nowrap text-white select-none"
        style={{
          fontSize: "clamp(160px, 18vw, 300px)",
          letterSpacing: "-0.05em",
          opacity: 0.03,
          transform: "translateY(-50%)",
        }}
      >
        SERVICES
      </span>

      <TechnicalGrid opacity={0.045} size={56} mask="radial-gradient(75% 65% at 30% 40%, black, transparent)" />

      <AmbientGlow top="-10%" left="-8%" width="48%" height="58%" color="var(--color-brand-blue)" opacity={0.13} blur="150px" />
      <AmbientGlow bottom="-14%" right="-6%" width="44%" height="54%" color="var(--color-brand-purple)" opacity={0.11} blur="150px" />
      <AmbientGlow bottom="-6%" right="8%" width="30%" height="34%" color="var(--color-brand-pink)" opacity={0.08} blur="130px" />

      <FlowField paths={PATHS} viewBox="0 0 600 260" className="top-[8%] right-[2%] h-[46%] w-[54%]" opacity={0.14} />

      {NODES.map((n, i) => (
        <SignalNode key={i} x={n.x} y={n.y} color={n.color} delay={n.delay} />
      ))}

      <BackgroundLabel text="01 / WEBSITE — 06 / BRAND" top="8%" left="6%" opacity={0.1} />
      <BackgroundLabel text="N 26.14 · E 85.39" top="90%" left="6%" opacity={0.08} />
    </div>
  );
}
