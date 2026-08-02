import { cn } from "@/lib/utils";

interface BokehBackgroundProps {
  className?: string;
}

/** Kept to blue/purple/cyan — the ambient background palette — so pink/emerald
 * stay reserved for foreground product accents rather than diluting the
 * background into a rainbow wash. */
const blobs = [
  { color: "bg-brand-blue", pos: "left-[8%] top-[12%]", size: "h-72 w-72", anim: "animate-drift" },
  { color: "bg-brand-purple", pos: "right-[10%] top-[4%]", size: "h-80 w-80", anim: "animate-drift-slow" },
  { color: "bg-brand-cyan", pos: "left-[30%] bottom-[8%]", size: "h-64 w-64", anim: "animate-drift-slow" },
  { color: "bg-brand-blue", pos: "right-[18%] bottom-[14%]", size: "h-56 w-56", anim: "animate-drift" },
  { color: "bg-brand-purple", pos: "left-[55%] top-[35%]", size: "h-48 w-48", anim: "animate-drift" },
];

/** Soft, colorful blurred orbs for cinematic depth behind hero/section content. Decorative only. */
export function BokehBackground({ className }: BokehBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full opacity-30 blur-3xl will-change-transform",
            blob.color,
            blob.pos,
            blob.size,
            blob.anim,
          )}
        />
      ))}
    </div>
  );
}
