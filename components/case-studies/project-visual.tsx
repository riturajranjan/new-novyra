import Image from "next/image";
import type { ConceptBuild } from "@/content/case-studies";

interface ProjectVisualProps {
  build: ConceptBuild;
  priority?: boolean;
}

/** The project card's real image — a small fixed-size tile anchored to the
 * bottom-right corner (not bleeding across the card), sized so it never
 * competes with or covers the title/description on the left. Masked on its
 * top-left corner so its own dark background dissolves into the card. */
export function ProjectVisual({ build, priority }: ProjectVisualProps) {
  if (!build.image) return null;

  return (
    <div
      className="absolute right-2.5 bottom-2 h-[120px] w-[135px] min-[500px]:h-[135px] min-[500px]:w-[155px] md:right-4 md:bottom-3 md:h-[138px] md:w-[168px]"
      style={{
        maskImage: "radial-gradient(120% 120% at 100% 100%, black 55%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(120% 120% at 100% 100%, black 55%, transparent 100%)",
      }}
    >
      <Image src={build.image} alt="" fill priority={priority} sizes="200px" className="object-contain object-right-bottom" />
    </div>
  );
}
