import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  /** Overlay a faint grid for Linear-style precision. Default true. */
  grid?: boolean;
}

/** Flowing mesh-gradient wash, for cinematic section backdrops. Decorative only. */
export function AuroraBackground({ className, grid = true }: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="bg-gradient-aurora animate-aurora absolute inset-0 opacity-40 dark:opacity-50" />
      {grid ? (
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      ) : null}
      <div className="from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}
