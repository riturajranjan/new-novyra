import { AmbientGlow } from "@/components/visual-backgrounds/ambient-glow";
import { BlueprintField } from "@/components/visual-backgrounds/blueprint-field";

const LABELS = [
  { text: "SYSTEM", top: "12%", left: "6%" },
  { text: "PERFORMANCE", top: "82%", left: "6%" },
  { text: "SECURITY", top: "18%", left: "90%" },
  { text: "SCALE", top: "70%", left: "88%" },
  { text: "01.24", top: "46%", left: "3%" },
  { text: "04.18", top: "50%", left: "94%" },
];

const LINES = [{ d: "M40,50 L760,50" }, { d: "M40,450 L760,450", delay: 0.15 }];

/** Trusted Partner's signature motif — "Technical Blueprint": corner
 * brackets, measurement ticks, faint system labels/coordinates, and one
 * large partially-visible system-diagram circle behind the right edge —
 * "engineering documentation transformed into premium visual design."
 * Lines draw in once on viewport entry, not a loop. */
export function TrustedPartnerBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientGlow top="10%" right="-15%" width="46%" height="70%" color="var(--color-brand-blue)" opacity={0.08} blur="160px" />

      <svg aria-hidden viewBox="0 0 400 400" className="absolute top-1/2 right-[-12%] h-[80%] w-[36%] -translate-y-1/2 opacity-[0.06]">
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--color-brand-blue)" strokeWidth="1" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="var(--color-brand-purple)" strokeWidth="0.75" strokeDasharray="2 8" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="var(--color-brand-blue)" strokeWidth="0.5" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--color-brand-blue)" strokeWidth="0.5" />
      </svg>

      <BlueprintField labels={LABELS} lines={LINES} viewBox="0 0 800 500" opacity={0.32} />
    </div>
  );
}
