const particles = [
  { top: "14%", left: "10%", size: "h-1 w-1", delay: "0.2s" },
  { top: "26%", left: "88%", size: "h-1.5 w-1.5", delay: "1.5s" },
  { top: "58%", left: "5%", size: "h-1 w-1", delay: "2.4s" },
  { top: "82%", left: "72%", size: "h-1.5 w-1.5", delay: "0.9s" },
  { top: "44%", left: "48%", size: "h-1 w-1", delay: "1.8s" },
];

/** Layered decorative backdrop for Pricing — aurora glows, a faint grid,
 * fine noise, and floating particles. Theme-reactive, matching the backdrop
 * language used across every other section on the page. */
export function PricingBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-purple/14 animate-drift absolute top-[-6rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full blur-[130px]" />
      <div className="bg-brand-blue/12 animate-drift-slow absolute right-[-6rem] bottom-[8%] h-[28rem] w-[28rem] rounded-full blur-[130px]" />
      <div className="bg-brand-cyan/10 absolute top-1/2 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className={`bg-brand-amber/40 animate-drift-slow absolute rounded-full ${p.size}`}
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
