import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";
import { SignalNode } from "@/components/visual-backgrounds/signal-node";

const NODES = [
  { x: "62%", y: "20%", color: "var(--color-brand-blue)", delay: "0.4s" },
  { x: "78%", y: "48%", color: "var(--color-brand-purple)", delay: "2.1s" },
  { x: "88%", y: "72%", color: "var(--color-brand-cyan)", delay: "3.6s" },
];

/** Insights' signature motif — "Editorial Signal Room": a deep graphite
 * base, a faint technical grid, one large violet illumination + a smaller
 * blue one, a thin flowing signal line running toward the article
 * composition, a few tiny glowing nodes, and an oversized cropped
 * "INSIGHTS" watermark at near-zero opacity — reads as a technology
 * publication's own quiet studio, distinct from every other section's
 * background language (no aurora bands, no perspective grid, no ribbon). */
export function BlogBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#080c19" }}>
      <TechnicalGrid opacity={0.035} size={64} mask="radial-gradient(70% 65% at 60% 40%, black, transparent)" />

      <AmbientGlow top="18%" right="-10%" width="40%" height="58%" color="var(--color-brand-purple)" opacity={0.09} blur="150px" />
      <AmbientGlow top="6%" left="-6%" width="42%" height="52%" color="var(--color-brand-blue)" opacity={0.1} blur="140px" />

      <span
        className="pointer-events-none absolute top-1/2 left-[8%] leading-none font-bold whitespace-nowrap text-white select-none"
        style={{
          fontSize: "clamp(160px, 18vw, 300px)",
          letterSpacing: "-0.07em",
          opacity: 0.025,
          transform: "translateY(-50%)",
        }}
      >
        INSIGHTS
      </span>

      <svg aria-hidden viewBox="0 0 1200 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-[0.16]">
        <path
          className="animate-flow-drift-slow"
          d="M-40,380 C260,320 420,260 620,240 C820,220 960,160 1240,120"
          fill="none"
          stroke="var(--color-brand-blue)"
          strokeWidth="1"
        />
      </svg>

      {NODES.map((n, i) => (
        <SignalNode key={i} x={n.x} y={n.y} color={n.color} delay={n.delay} />
      ))}
    </div>
  );
}
