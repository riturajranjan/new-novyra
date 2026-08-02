import { cn } from "@/lib/utils";

interface LightRaysProps {
  className?: string;
}

/** Soft top-down keynote-stage light beams — static and very low opacity so
 * it reads as ambient lighting, never a distraction. */
export function LightRays({ className }: LightRaysProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="absolute -top-1/4 left-1/2 h-[140%] w-[70%] -translate-x-1/2 opacity-[0.08] blur-3xl dark:opacity-[0.13]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 42%, color-mix(in oklab, var(--color-brand-cyan) 55%, transparent) 48%, transparent 54%, color-mix(in oklab, var(--color-brand-blue) 50%, transparent) 64%, transparent 70%)",
        }}
      />
    </div>
  );
}
