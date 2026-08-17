import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";

/** Section 02's backdrop — "Digital Workspace": a touch lighter than the
 * Hero's navy, faint diagonal technical lines instead of the Hero's
 * network paths, a violet glow pooling behind the form column and a
 * cyan glow behind the contact panel, plus two barely-there giant "01"/
 * "02" numerals marking the two columns. No particles — those are the
 * Hero's signature, not repeated here. */
export function ContactWorkspaceBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#070b18" }}>
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "repeating-linear-gradient(115deg, rgba(140,160,255,0.6) 0px, rgba(140,160,255,0.6) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <AmbientGlow top="6%" left="8%" width="42%" height="52%" color="var(--color-brand-purple)" opacity={0.07} blur="170px" />
      <AmbientGlow top="10%" right="4%" width="34%" height="42%" color="var(--color-brand-cyan)" opacity={0.06} blur="160px" />

      <span
        className="absolute top-[8%] left-[2%] leading-none font-bold text-white select-none"
        style={{ fontSize: "clamp(90px, 10vw, 160px)", opacity: 0.02 }}
      >
        01
      </span>
      <span
        className="absolute top-[8%] right-[4%] leading-none font-bold text-white select-none"
        style={{ fontSize: "clamp(90px, 10vw, 160px)", opacity: 0.02 }}
      >
        02
      </span>
    </div>
  );
}
