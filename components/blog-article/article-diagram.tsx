import { accentStroke, accentTint } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

interface ArticleDiagramProps {
  nodes: string[];
  accent: AccentColor;
}

const CONNECTOR_LENGTH = { x: "56px", y: "36px" };

/** A request-flow diagram in Novyra's own visual language — glowing
 * nodes, thin connecting lines, a small signal dot drifting along each
 * connector — rather than a screenshot of a real architecture or any
 * invented dashboard metrics. Row layout at `lg:`, column below, each
 * with its own local signal animation so it never needs JS/path math. */
export function ArticleDiagram({ nodes, accent }: ArticleDiagramProps) {
  const stroke = accentStroke[accent];

  return (
    <div
      role="img"
      aria-label={nodes.join(" → ")}
      className="my-4 flex flex-col items-stretch gap-0 rounded-xl border border-white/8 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
      style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
    >
      {nodes.map((label, i) => {
        const isLast = i === nodes.length - 1;
        return (
          <div key={label} className="flex flex-col items-stretch lg:flex-1 lg:flex-row lg:items-center">
            <div
              className="flex items-center gap-2.5 rounded-lg border px-4 py-3"
              style={{ borderColor: accentTint(accent, 28), backgroundColor: accentTint(accent, 6) }}
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: stroke, boxShadow: `0 0 6px 1px ${stroke}` }} />
              <span className="text-[12.5px] font-mono font-semibold tracking-[0.04em] text-white/85">{label}</span>
            </div>

            {!isLast ? (
              <>
                {/* Desktop connector — horizontal */}
                <div
                  aria-hidden
                  className="relative hidden h-px flex-1 lg:mx-3 lg:block"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", ["--diagram-connector-length" as string]: CONNECTOR_LENGTH.x }}
                >
                  <span
                    className="diagram-signal-x absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: stroke, boxShadow: `0 0 6px 1px ${stroke}` }}
                  />
                </div>
                {/* Mobile connector — vertical */}
                <div
                  aria-hidden
                  className="relative mx-auto my-2 h-9 w-px lg:hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", ["--diagram-connector-length" as string]: CONNECTOR_LENGTH.y }}
                >
                  <span
                    className="diagram-signal-y absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                    style={{ backgroundColor: stroke, boxShadow: `0 0 6px 1px ${stroke}` }}
                  />
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
