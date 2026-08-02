import { cn } from "@/lib/utils";

const particles = [
  { top: "10%", left: "6%", size: "h-1.5 w-1.5", delay: "0.4s" },
  { top: "72%", left: "92%", size: "h-1 w-1", delay: "1.6s" },
  { top: "42%", left: "50%", size: "h-1 w-1", delay: "2.2s" },
  { top: "85%", left: "18%", size: "h-1.5 w-1.5", delay: "1s" },
  { top: "22%", left: "82%", size: "h-1 w-1", delay: "2.8s" },
];

interface ServicesBackgroundProps {
  className?: string;
}

/** Layered decorative backdrop for the services showcase — a large soft
 * radial glow centered high in the section (so the switcher/preview reads
 * as sitting in a lit space rather than empty dark), the shared aurora
 * mesh utility drifting slowly, a few bokeh particles, and fine noise.
 * Everything kept subtle enough to stay behind the glass panels, not
 * compete with them. */
export function ServicesBackground({ className }: ServicesBackgroundProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 50% 0%, color-mix(in oklab, var(--color-brand-purple) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="bg-gradient-aurora animate-aurora absolute inset-0 opacity-[0.13]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className={cn("bg-brand-blue/40 animate-drift-slow absolute rounded-full", p.size)}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
