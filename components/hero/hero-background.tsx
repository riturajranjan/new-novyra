import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientMesh } from "@/components/ui/gradient-mesh";
import { LightRays } from "@/components/ui/light-rays";
import { BokehBackground } from "@/components/ui/bokeh-background";
import { Particles } from "@/components/hero/particles";

/** Dark cinematic backdrop: the shared mesh/aurora/bokeh/particle primitives
 * (untouched — dialed back as a group via a single opacity multiplier
 * rather than editing each shared file), three restrained, targeted glows
 * — cyan behind the left content, violet behind the dashboard, a faint pink
 * kiss lower-right — a dark vignette to keep the edges calm, and a faint
 * noise texture. Then a top and bottom fade so the section blends cleanly
 * into the navbar above and the next section below. Nothing here reads as
 * a full-bleed bright wash; the goal is controlled, low-opacity light. */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <GradientMesh />
        <LightRays />
        <AuroraBackground />
        <BokehBackground />
        <Particles />
      </div>

      <div
        className="absolute bottom-[8%] left-[6%] h-72 w-72 rounded-full opacity-[0.18] blur-[100px]"
        style={{ background: "var(--color-brand-cyan)" }}
      />
      <div
        className="absolute top-[10%] right-[10%] h-80 w-80 rounded-full opacity-20 blur-[110px]"
        style={{ background: "var(--color-brand-purple)" }}
      />
      <div
        className="absolute right-[4%] bottom-[6%] h-56 w-56 rounded-full opacity-[0.16] blur-[90px]"
        style={{ background: "var(--color-brand-pink)" }}
      />

      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(2,5,15,0.5) 100%)" }}
      />

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/4 bg-gradient-to-b to-transparent" />
      <div className="from-background via-background/55 pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t to-transparent" />
    </div>
  );
}
