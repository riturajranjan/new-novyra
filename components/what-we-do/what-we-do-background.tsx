import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { FlowField } from "@/components/visual-backgrounds/flow-field";
import { SignalNode } from "@/components/visual-backgrounds/signal-node";
import { SectionNoise } from "@/components/visual-backgrounds/section-noise";

const LEFT_CONTOURS = [
  { d: "M-60,80 C60,40 140,120 260,60", color: "var(--color-brand-blue)", delay: "0s" },
  { d: "M-60,220 C80,260 160,180 300,220", color: "var(--color-brand-purple)", delay: "2.2s", slow: true },
];

const RIGHT_PATHS = [
  { d: "M420,60 C540,90 560,40 680,70 C760,90 780,50 860,80", color: "var(--color-brand-blue)", delay: "0.8s" },
  { d: "M420,220 C520,190 600,250 700,210 C780,180 800,230 860,200", color: "var(--color-brand-purple)", delay: "1.6s", slow: true },
];

/** What We Do's signature motif — "Product Flow Field": subtle curved
 * contour lines entering from outside the viewport on the left, a faint
 * atmospheric wash behind the heading, and thin flowing paths on the right
 * that separate and reconnect — ideas → systems → products. Deliberately
 * not a grid: this section's metaphor is flow, not structure (that's
 * Industries' job). Motion stays at the edge of perception. */
export function WhatWeDoBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientGlow top="0%" left="30%" width="46%" height="55%" color="var(--color-brand-blue)" opacity={0.09} blur="140px" />
      <AmbientGlow top="10%" right="20%" width="40%" height="50%" color="var(--color-brand-purple)" opacity={0.07} blur="140px" />

      <FlowField paths={LEFT_CONTOURS} viewBox="0 0 320 300" className="top-[8%] left-0 h-[70%] w-[34%]" opacity={0.16} />
      <FlowField paths={RIGHT_PATHS} viewBox="0 0 900 300" className="top-[14%] right-0 h-[55%] w-[48%]" opacity={0.14} />

      <SignalNode x="18%" y="22%" color="var(--color-brand-cyan)" delay="0.4s" />
      <SignalNode x="72%" y="30%" color="var(--color-brand-blue)" delay="2.1s" />
      <SignalNode x="84%" y="58%" color="var(--color-brand-purple)" delay="3.4s" />

      <SectionNoise opacity={0.02} />
    </div>
  );
}
