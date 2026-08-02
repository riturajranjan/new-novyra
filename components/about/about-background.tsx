import { cn } from "@/lib/utils";

interface AboutBackgroundProps {
  /** "strong" for hero/mission-vision/CTA, "calm" everywhere else — the
   * page deliberately alternates visual intensity rather than applying the
   * same glow behind every section. */
  variant?: "strong" | "calm";
  className?: string;
}

/** Shared About-page backdrop: blue/cyan aurora, violet/pink bokeh, a faint
 * grid, fine noise, and an edge vignette fading to the page background.
 * Reused across sections with a strength dial instead of one bespoke
 * background component per section. */
export function AboutBackground({ variant = "calm", className }: AboutBackgroundProps) {
  const strong = variant === "strong";

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className={cn(
          "bg-brand-blue animate-drift absolute rounded-full blur-[120px]",
          strong ? "top-[-6rem] left-[-8rem] h-[32rem] w-[32rem] opacity-[0.18]" : "top-[-4rem] left-[-6rem] h-72 w-72 opacity-[0.08]",
        )}
      />
      <div
        className={cn(
          "bg-brand-purple animate-drift-slow absolute rounded-full blur-[130px]",
          strong ? "top-1/4 right-[-6rem] h-[28rem] w-[28rem] opacity-[0.18]" : "top-1/3 right-[-4rem] h-64 w-64 opacity-[0.07]",
        )}
      />
      {strong ? (
        <div className="bg-brand-pink animate-drift absolute bottom-[-6rem] left-1/3 h-96 w-96 rounded-full opacity-[0.12] blur-[120px]" />
      ) : null}

      <div
        className={cn("absolute inset-0", strong ? "opacity-[0.05]" : "opacity-[0.03]")}
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(60% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 30%, black, transparent)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 50% 30%, transparent 55%, color-mix(in oklab, var(--color-background) 60%, transparent) 100%)",
        }}
      />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
