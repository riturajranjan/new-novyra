const particles = [
  { top: "10%", left: "14%", size: "h-1 w-1", delay: "0.3s" },
  { top: "34%", left: "92%", size: "h-1.5 w-1.5", delay: "1.6s" },
  { top: "66%", left: "8%", size: "h-1 w-1", delay: "2.1s" },
  { top: "86%", left: "64%", size: "h-1.5 w-1.5", delay: "1s" },
];

/** Layered decorative backdrop for FAQ — aurora glows, a faint grid, fine
 * noise, and floating particles. Clipped entirely within this div (never on
 * the outer section) so `lg:sticky` still works on the info panel next to
 * it. */
export function FaqBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-blue/14 animate-drift absolute top-[-7rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full blur-[130px]" />
      <div className="bg-brand-cyan/12 animate-drift-slow absolute bottom-[6%] left-[-8rem] h-[26rem] w-[26rem] rounded-full blur-[130px]" />
      <div className="bg-brand-purple/10 absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className={`bg-brand-blue/40 animate-drift-slow absolute rounded-full ${p.size}`}
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
