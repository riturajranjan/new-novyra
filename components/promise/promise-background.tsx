const particles = [
  { top: "18%", left: "12%", size: "h-1 w-1", delay: "0.4s" },
  { top: "30%", left: "86%", size: "h-1.5 w-1.5", delay: "1.7s" },
  { top: "62%", left: "6%", size: "h-1 w-1", delay: "2.2s" },
  { top: "78%", left: "70%", size: "h-1.5 w-1.5", delay: "1.1s" },
];

/** Layered decorative backdrop for "Our Promise" — aurora glows, a faint
 * grid, fine noise, and floating particles. Theme-reactive, matching the
 * backdrop language used across Our Services / Our Process / Why Choose
 * Novyra / Case Studies. */
export function PromiseBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-emerald/12 animate-drift absolute top-[-8rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full blur-[130px]" />
      <div className="bg-brand-amber/10 animate-drift-slow absolute right-[-8rem] bottom-[6%] h-[26rem] w-[26rem] rounded-full blur-[130px]" />
      <div className="bg-brand-blue/10 absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className={`bg-brand-cyan/40 animate-drift-slow absolute rounded-full ${p.size}`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(65% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(65% 60% at 50% 30%, black, transparent)",
        }}
      />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
