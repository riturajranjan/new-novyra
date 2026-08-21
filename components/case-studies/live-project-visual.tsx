import Image from "next/image";
import type { ConceptBuild } from "@/content/case-studies";
import { accentTint } from "@/lib/accent";

interface LiveProjectVisualProps {
  build: ConceptBuild;
  priority?: boolean;
}

/** The homepage grid's visual for a real, live-demo build — a browser-chrome
 * framed screenshot, larger and more legible than the small corner-fade
 * illustration tile `ProjectVisual` uses for the abstract SaaS concepts.
 * Those illustrations use a radial fade to dissolve a floating 3D object
 * into the dark card background; a real screenshot has hard rectangular
 * edges and browser UI, so it gets its own honest frame instead of being
 * forced into that same treatment. */
export function LiveProjectVisual({ build, priority }: LiveProjectVisualProps) {
  if (!build.image) return null;

  return (
    <div
      className="absolute right-3 bottom-3 h-33 w-47.5 overflow-hidden rounded-lg border shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] min-[500px]:h-37.5 min-[500px]:w-54 md:right-4 md:bottom-4 md:h-41 md:w-59"
      style={{ borderColor: accentTint(build.accent, 30), backgroundColor: "#0b0e1a" }}
    >
      <div className="flex h-5 items-center gap-1 border-b px-2" style={{ borderColor: accentTint(build.accent, 18), backgroundColor: "rgba(255,255,255,0.03)" }}>
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
      </div>
      <div className="relative h-[calc(100%-1.25rem)] w-full">
        <Image src={build.image} alt="" fill priority={priority} sizes="240px" className="object-cover object-top" />
      </div>
    </div>
  );
}
