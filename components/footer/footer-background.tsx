const particles = [
  { top: "8%", left: "12%", size: "h-1 w-1", delay: "0.3s" },
  { top: "20%", left: "90%", size: "h-1.5 w-1.5", delay: "1.5s" },
  { top: "48%", left: "5%", size: "h-1 w-1", delay: "2.4s" },
  { top: "68%", left: "82%", size: "h-1.5 w-1.5", delay: "0.9s" },
  { top: "88%", left: "30%", size: "h-1 w-1", delay: "1.8s" },
  { top: "94%", left: "62%", size: "h-1.5 w-1.5", delay: "1.1s" },
];

/** The closing backdrop for the whole page — aurora, mesh, grid, noise, and
 * light rays, clipped entirely within this div so nothing above it (the
 * outer glass container's own floating children) gets trapped by
 * overflow-hidden. */
export function FooterBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-purple/16 animate-drift absolute top-[-10rem] left-[-8rem] h-[36rem] w-[36rem] rounded-full blur-[150px]" />
      <div className="bg-brand-blue/16 animate-drift-slow absolute top-[20%] right-[-10rem] h-[32rem] w-[32rem] rounded-full blur-[150px]" />
      <div className="bg-brand-cyan/12 animate-drift-slow absolute bottom-[-8rem] left-[25%] h-[30rem] w-[30rem] rounded-full blur-[150px]" />
      <div className="bg-brand-pink/8 absolute bottom-[10%] right-[10%] h-[24rem] w-[24rem] rounded-full blur-[140px]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className={`bg-brand-blue/40 animate-drift-slow absolute rounded-full ${p.size}`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(75% 70% at 50% 20%, black, transparent)",
          WebkitMaskImage: "radial-gradient(75% 70% at 50% 20%, black, transparent)",
        }}
      />

      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-[80%] w-[70%] -translate-x-1/2 opacity-[0.06] blur-3xl dark:opacity-[0.1]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 44%, color-mix(in oklab, var(--color-brand-blue) 55%, transparent) 49%, transparent 54%, color-mix(in oklab, var(--color-brand-purple) 50%, transparent) 66%, transparent 71%)",
        }}
      />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
