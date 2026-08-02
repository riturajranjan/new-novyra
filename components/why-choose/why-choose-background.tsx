const particles = [
  { top: "16%", left: "10%", size: "h-1 w-1", delay: "0s" },
  { top: "30%", left: "88%", size: "h-1.5 w-1.5", delay: "1.2s" },
  { top: "62%", left: "6%", size: "h-1 w-1", delay: "2.4s" },
  { top: "78%", left: "70%", size: "h-1.5 w-1.5", delay: "0.6s" },
  { top: "50%", left: "50%", size: "h-1 w-1", delay: "1.8s" },
];

/** Layered decorative backdrop for the Why Choose section — aurora glows,
 * a faint grid, fine noise, and a handful of floating particles. Fully
 * theme-reactive (unlike the advisor's forced-dark canvas), matching Our
 * Services / Our Process. */
export function WhyChooseBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-blue/14 animate-drift absolute top-[-6rem] left-[-8rem] h-[32rem] w-[32rem] rounded-full blur-[130px]" />
      <div className="bg-brand-purple/14 animate-drift-slow absolute top-1/4 right-[-8rem] h-[28rem] w-[28rem] rounded-full blur-[130px]" />
      <div className="bg-brand-pink/12 absolute bottom-[-6rem] left-1/3 h-[26rem] w-[26rem] rounded-full blur-[120px]" />

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
