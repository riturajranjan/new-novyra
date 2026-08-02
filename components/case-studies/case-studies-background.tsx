const particles = [
  { top: "12%", left: "8%", size: "h-1 w-1", delay: "0s" },
  { top: "24%", left: "90%", size: "h-1.5 w-1.5", delay: "1.3s" },
  { top: "55%", left: "4%", size: "h-1 w-1", delay: "2.5s" },
  { top: "72%", left: "76%", size: "h-1.5 w-1.5", delay: "0.7s" },
  { top: "88%", left: "40%", size: "h-1 w-1", delay: "1.9s" },
];

/** Layered decorative backdrop for the Case Studies section — aurora
 * glows, a faint grid, fine noise, and floating particles. Theme-reactive,
 * matching Our Services / Our Process / Why Choose Novyra. */
export function CaseStudiesBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-blue/14 animate-drift absolute top-[-6rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full blur-[130px]" />
      <div className="bg-brand-purple/14 animate-drift-slow absolute bottom-[10%] left-[-8rem] h-[28rem] w-[28rem] rounded-full blur-[130px]" />
      <div className="bg-brand-pink/10 absolute top-1/2 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />

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
