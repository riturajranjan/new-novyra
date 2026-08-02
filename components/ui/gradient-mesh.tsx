import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
}

/** Slow-drifting layered mesh gradient — a depth layer distinct from the
 * aurora wash and bokeh orbs. CSS transforms only, no JS animation loop. */
export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="bg-gradient-mesh animate-mesh-a absolute -inset-1/4 opacity-[0.18] blur-3xl will-change-transform dark:opacity-[0.26]" />
      <div className="bg-gradient-mesh animate-mesh-b absolute -inset-1/4 opacity-[0.1] blur-3xl will-change-transform dark:opacity-[0.18]" />
    </div>
  );
}
