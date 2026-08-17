import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { SignalNode } from "@/components/visual-backgrounds/signal-node";

const PATHS = [
  "M-30,80 C120,40 220,120 380,70 C480,38 560,90 660,60",
  "M-30,180 C140,220 260,150 400,200 C500,230 580,180 680,210",
];

/** Contact hero's signature motif — "Signal Network": a soft blue wash
 * from the left, violet/pink atmosphere pooling behind the connection
 * visual on the right, a couple of extremely faint communication paths,
 * a handful of slow signal points, and a giant barely-there "CONNECT"
 * wordmark — distinct from Services' rigid hexagon grid, Industries'
 * topology contours, and About's oversized brand type. */
export function ContactHeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#050914" }}>
      <span
        className="absolute top-1/2 left-1/2 leading-none font-bold whitespace-nowrap text-white select-none"
        style={{ fontSize: "clamp(150px, 17vw, 280px)", letterSpacing: "-0.05em", opacity: 0.02, transform: "translate(-50%, -50%)" }}
      >
        CONNECT
      </span>

      <AmbientGlow top="10%" left="-10%" width="46%" height="60%" color="var(--color-brand-blue)" opacity={0.13} blur="160px" className="animate-drift" />
      <AmbientGlow top="-8%" right="-8%" width="50%" height="58%" color="var(--color-brand-purple)" opacity={0.12} blur="160px" className="animate-drift-slow" />
      <AmbientGlow bottom="-14%" right="4%" width="34%" height="38%" color="var(--color-brand-pink)" opacity={0.08} blur="140px" />

      <svg aria-hidden viewBox="0 0 700 260" preserveAspectRatio="none" className="absolute inset-x-0 top-[8%] h-[42%] w-full opacity-[0.1]">
        {PATHS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(140,160,255,0.7)" strokeWidth={0.6} />
        ))}
      </svg>

      <SignalNode x="14%" y="28%" color="var(--color-brand-blue)" delay="0.4s" />
      <SignalNode x="82%" y="18%" color="var(--color-brand-pink)" delay="2.1s" />
      <SignalNode x="70%" y="68%" color="var(--color-brand-purple)" delay="3.4s" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(45% 55% at 78% 45%, black, transparent)",
          WebkitMaskImage: "radial-gradient(45% 55% at 78% 45%, black, transparent)",
        }}
      />
      <div className="bg-noise absolute inset-0 opacity-[0.025] mix-blend-overlay" />
    </div>
  );
}
