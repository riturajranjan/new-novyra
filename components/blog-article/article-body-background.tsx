import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { TechnicalGrid } from "@/components/visual-backgrounds/technical-grid";

/** The reading zone's own quiet backdrop — near-black, a barely-visible
 * grid, and one restrained vertical light field down the center column
 * (behind the article, not behind the sidebars) — visibly calmer than
 * the hero so the transition reads as a new "chapter" without a hard
 * section-box edge. */
export function ArticleBodyBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#04060d" }}>
      <TechnicalGrid opacity={0.022} size={64} mask="radial-gradient(60% 90% at 50% 30%, black, transparent)" />
      <AmbientGlow top="0%" left="30%" width="40%" height="90%" color="var(--color-brand-blue)" opacity={0.045} blur="180px" />
    </div>
  );
}
