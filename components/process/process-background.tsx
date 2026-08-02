const particles = [
  { top: "18%", left: "12%", size: "h-1 w-1", delay: "0s" },
  { top: "32%", left: "82%", size: "h-1.5 w-1.5", delay: "1.2s" },
  { top: "62%", left: "22%", size: "h-1 w-1", delay: "2.4s" },
  { top: "74%", left: "68%", size: "h-1.5 w-1.5", delay: "0.6s" },
  { top: "48%", left: "50%", size: "h-1 w-1", delay: "1.8s" },
];

/** Layered decorative backdrop for the process section — large drifting
 * blue/violet/cyan glows, a faint grid, fine noise, a handful of tiny
 * floating particles, and a soft vignette fading to the page's own
 * background. Fully theme-reactive and deliberately not the bokeh-blob or
 * radial-spotlight composition used elsewhere on the page, so this section
 * keeps its own identity. Alive, never distracting. */
export function ProcessBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-blue/16 animate-drift absolute top-[-4rem] left-[-6rem] h-[30rem] w-[30rem] rounded-full blur-[120px]" />
      <div className="bg-brand-purple/16 animate-drift-slow absolute top-1/3 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-[130px]" />
      <div className="bg-brand-cyan/14 animate-drift absolute right-[-4rem] bottom-[-4rem] h-[26rem] w-[26rem] rounded-full blur-[120px]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className={`bg-brand-cyan/40 animate-drift-slow absolute rounded-full ${p.size}`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(65% 65% at 50% 35%, black, transparent)",
          WebkitMaskImage: "radial-gradient(65% 65% at 50% 35%, black, transparent)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 50% 40%, transparent 45%, color-mix(in oklab, var(--color-background) 55%, transparent) 100%)",
        }}
      />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
