import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { BackgroundLabel } from "@/components/visual-backgrounds/background-label";

/** Work hero's signature motif — "Project Archive": deep near-black base,
 * faint receding perspective lines (an archive shelf, not a network), cool
 * blue/violet illumination, a giant cropped "WORK" ghost word, and a
 * handful of tiny technical index labels. Deliberately calmer than
 * Industries' scattered ecosystem or Services' hexagon network — this
 * page's identity is "archive," not "system." */
export function WorkHeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#05060c" }}>
      <span
        className="absolute top-1/2 left-[-2%] leading-none font-bold whitespace-nowrap text-white select-none"
        style={{ fontSize: "clamp(160px, 18vw, 300px)", letterSpacing: "-0.06em", opacity: 0.025, transform: "translateY(-50%)" }}
      >
        WORK
      </span>

      <svg aria-hidden viewBox="0 0 800 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-[0.08]">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={400} y1={0} x2={80 + i * 160} y2={400} stroke="rgba(140,160,255,0.8)" strokeWidth={0.5} />
        ))}
      </svg>

      <AmbientGlow top="-10%" right="-8%" width="46%" height="56%" color="var(--color-brand-blue)" opacity={0.11} blur="160px" className="animate-drift" />
      <AmbientGlow bottom="-14%" left="-6%" width="40%" height="50%" color="var(--color-brand-purple)" opacity={0.09} blur="150px" className="animate-drift-slow" />

      <BackgroundLabel text="SELECTED / 09" top="9%" left="5%" opacity={0.1} />
      <BackgroundLabel text="PRODUCT / ENGINEERING" top="90%" left="70%" opacity={0.08} />
    </div>
  );
}
