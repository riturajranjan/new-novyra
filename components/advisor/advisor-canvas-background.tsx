const particles = [
  { top: "14%", left: "18%", size: "h-1 w-1", delay: "0s" },
  { top: "26%", left: "78%", size: "h-1.5 w-1.5", delay: "1.4s" },
  { top: "58%", left: "10%", size: "h-1 w-1", delay: "2.6s" },
  { top: "70%", left: "62%", size: "h-1.5 w-1.5", delay: "0.8s" },
  { top: "44%", left: "48%", size: "h-1 w-1", delay: "2s" },
  { top: "84%", left: "30%", size: "h-1 w-1", delay: "1.1s" },
];

/** Decorative backdrop for the advisor section — layered ambient glows with
 * a slow drift, soft diagonal light rays, a faint grid, fine noise, a
 * handful of floating particles, and a vignette. No solid fill, so the
 * section shows through to the page's own background (light or dark)
 * instead of reading as a separate boxed panel. Spans the full section
 * edge-to-edge. Alive, never distracting. */
export function AdvisorCanvasBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-drift absolute inset-0 bg-[radial-gradient(50%_45%_at_15%_15%,rgba(59,130,246,0.16),transparent_70%)]" />
      <div className="animate-drift-slow absolute inset-0 bg-[radial-gradient(50%_45%_at_85%_20%,rgba(139,92,246,0.16),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_95%,rgba(34,211,238,0.13),transparent_70%)]" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 30%, rgba(120,170,255,0.05) 45%, rgba(190,140,255,0.05) 55%, transparent 70%)",
        }}
      />

      {particles.map((p, i) => (
        <span
          key={i}
          className={`bg-brand-cyan/50 animate-drift-slow absolute rounded-full ${p.size}`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
