import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { GiantNumber } from "@/components/visual-backgrounds/background-label";
import { SectionNoise } from "@/components/visual-backgrounds/section-noise";

/** Selected Work's signature motif — "Cinematic Project Gallery": large
 * soft directional light (upper-left blue, center violet, lower-right
 * magenta — never circular blobs), two cropped giant numeral fragments
 * bleeding off-frame, faint diagonal composition lines, and grain — reads
 * as "light entering a dark studio," not a dashboard. The most visually
 * memorable background after Hero, but restrained enough that the six
 * project cards stay dominant. */
export function CaseStudiesBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientGlow top="-15%" left="-10%" width="55%" height="60%" color="var(--color-brand-blue)" opacity={0.13} blur="160px" rotate="-12deg" />
      <AmbientGlow top="20%" left="35%" width="45%" height="55%" color="var(--color-brand-purple)" opacity={0.09} blur="160px" />
      <AmbientGlow bottom="-20%" right="-10%" width="48%" height="55%" color="var(--color-brand-pink)" opacity={0.07} blur="160px" rotate="10deg" />

      <GiantNumber value="01" top="-6%" left="-3%" size="20rem" opacity={0.025} />
      <GiantNumber value="06" top="42%" left="78%" size="18rem" opacity={0.02} />

      <svg aria-hidden viewBox="0 0 1200 700" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-[0.05]">
        <line x1="0" y1="80" x2="1200" y2="560" stroke="var(--color-brand-blue)" strokeWidth="1" />
        <line x1="0" y1="640" x2="1200" y2="140" stroke="var(--color-brand-purple)" strokeWidth="1" />
      </svg>

      <SectionNoise opacity={0.035} />
    </div>
  );
}
