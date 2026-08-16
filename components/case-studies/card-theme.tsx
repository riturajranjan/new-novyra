import { accentStroke } from "@/lib/accent";
import type { ConceptBuild } from "@/content/case-studies";

type MotifKind = "grid" | "pulse" | "diagonal" | "route" | "chart" | "nodes";

interface CardTheme {
  /** Full CSS `background` shorthand — a project-specific radial glow
   * layered over a project-specific dark linear base. Replaces the old
   * flat `#070a16` fill so all six cards read as distinct dark
   * environments, not copies of one card with different images. */
  background: string;
  /** Resting border tint — a faint accent color, not flat white, so the
   * six cards are distinguishable even before hover. */
  borderTint: string;
  /** Color for the thin top-edge highlight line. */
  line: string;
  /** Color for the image-adjacent atmospheric glow (kept as its own,
   * lower-opacity value — not derived from `line` — so the glow stays
   * atmospheric rather than a visible glowing circle). */
  glow: string;
  motif: MotifKind;
}

export const cardThemes: Record<string, CardTheme> = {
  "school-erp": {
    background:
      "radial-gradient(circle at 78% 60%, rgba(115,82,255,0.16), transparent 45%), linear-gradient(135deg, #090817 0%, #070918 55%, #0b0b20 100%)",
    borderTint: "rgba(115,82,255,.17)",
    line: "rgba(139,116,255,0.9)",
    glow: "rgba(139,116,255,0.16)",
    motif: "grid",
  },
  "hospital-platform": {
    background:
      "radial-gradient(circle at 78% 58%, rgba(0,190,220,0.15), transparent 46%), linear-gradient(135deg, #061018 0%, #07101b 58%, #07131c 100%)",
    borderTint: "rgba(0,190,220,.16)",
    line: "rgba(34,206,230,0.9)",
    glow: "rgba(34,206,230,0.16)",
    motif: "pulse",
  },
  "ecommerce-platform": {
    background:
      "radial-gradient(circle at 80% 60%, rgba(255,122,24,0.16), transparent 45%), linear-gradient(135deg, #100b09 0%, #0c0b10 55%, #120d09 100%)",
    borderTint: "rgba(255,122,24,.17)",
    line: "rgba(255,148,64,0.9)",
    glow: "rgba(255,148,64,0.16)",
    motif: "diagonal",
  },
  "travel-platform": {
    background:
      "radial-gradient(circle at 78% 60%, rgba(20,200,160,0.14), transparent 48%), linear-gradient(135deg, #06100f 0%, #071215 58%, #061117 100%)",
    borderTint: "rgba(20,200,160,.16)",
    line: "rgba(45,214,178,0.9)",
    glow: "rgba(45,214,178,0.16)",
    motif: "route",
  },
  "fintech-platform": {
    background:
      "radial-gradient(circle at 78% 58%, rgba(66,105,255,0.16), transparent 46%), linear-gradient(135deg, #070b16 0%, #071020 56%, #080d19 100%)",
    borderTint: "rgba(66,105,255,.16)",
    line: "rgba(96,132,255,0.9)",
    glow: "rgba(96,132,255,0.16)",
    motif: "chart",
  },
  "ai-saas-dashboard": {
    background:
      "radial-gradient(circle at 80% 60%, rgba(221,60,170,0.14), transparent 47%), linear-gradient(135deg, #0d0711 0%, #0b0914 55%, #110812 100%)",
    borderTint: "rgba(221,60,170,.16)",
    line: "rgba(226,90,184,0.9)",
    glow: "rgba(226,90,184,0.16)",
    motif: "nodes",
  },
};

const fallbackTheme: CardTheme = {
  background: "linear-gradient(135deg, #08070f 0%, #070a16 55%, #0a0a14 100%)",
  borderTint: "rgba(255,255,255,.08)",
  line: "rgba(255,255,255,.4)",
  glow: "rgba(255,255,255,.1)",
  motif: "grid",
};

export function getCardTheme(id: string): CardTheme {
  return cardThemes[id] ?? fallbackTheme;
}

/** One faint, project-specific technical motif — never more than one shape
 * per card, always near the noise floor (~0.05 opacity) so it reads as
 * atmosphere, not decoration. Uses the project's own accent stroke so the
 * motif answers the same color identity as the border/glow. */
export function CardMotif({ build }: { build: ConceptBuild }) {
  const theme = getCardTheme(build.id);
  const stroke = accentStroke[build.accent];

  return (
    <svg
      aria-hidden
      viewBox="0 0 400 280"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.055 }}
    >
      {theme.motif === "grid" ? (
        <>
          <line x1="26" y1="16" x2="26" y2="264" stroke={stroke} strokeWidth="1" />
          {[64, 106, 148, 190, 232].map((y) => (
            <line key={y} x1="26" y1={y} x2="378" y2={y} stroke={stroke} strokeWidth="0.75" />
          ))}
        </>
      ) : null}

      {theme.motif === "pulse" ? (
        <path
          d="M10,150 L110,150 L128,96 L146,204 L164,150 L390,150"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}

      {theme.motif === "diagonal" ? (
        <>
          <line x1="-20" y1="30" x2="300" y2="300" stroke={stroke} strokeWidth="1" />
          <line x1="30" y1="-20" x2="360" y2="300" stroke={stroke} strokeWidth="1" />
          <line x1="90" y1="-20" x2="410" y2="260" stroke={stroke} strokeWidth="1" />
        </>
      ) : null}

      {theme.motif === "route" ? (
        <>
          <path
            d="M14,214 C110,170 190,236 274,132"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />
          <circle cx="274" cy="132" r="4.5" fill={stroke} />
          <circle cx="14" cy="214" r="3" fill={stroke} />
        </>
      ) : null}

      {theme.motif === "chart" ? (
        <>
          {[76, 138, 200].map((y) => (
            <line key={y} x1="20" y1={y} x2="384" y2={y} stroke={stroke} strokeWidth="0.75" />
          ))}
          <path
            d="M32,222 L96,190 L160,206 L224,158 L288,176 L352,118"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : null}

      {theme.motif === "nodes" ? (
        <>
          <line x1="56" y1="56" x2="164" y2="92" stroke={stroke} strokeWidth="0.75" />
          <line x1="164" y1="92" x2="312" y2="104" stroke={stroke} strokeWidth="0.75" />
          <line x1="104" y1="168" x2="164" y2="92" stroke={stroke} strokeWidth="0.75" />
          <line x1="104" y1="168" x2="232" y2="196" stroke={stroke} strokeWidth="0.75" />
          {[
            [56, 56],
            [164, 92],
            [104, 168],
            [232, 196],
            [312, 104],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill={stroke} />
          ))}
        </>
      ) : null}
    </svg>
  );
}
