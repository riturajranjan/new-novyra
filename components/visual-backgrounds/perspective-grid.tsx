interface PerspectiveGridProps {
  /** Which edge the grid recedes from. */
  origin?: "bottom" | "top";
  opacity?: number;
  color?: string;
  className?: string;
  /** Adds a soft diagonal light sweep across the plane (Industries' "scanning
   * illumination"). Purely CSS — a `background-position` keyframe. */
  sweep?: boolean;
}

/** DEPTH 2 primitive — a floor/blueprint plane receding into depth via a
 * CSS 3D transform on a repeating grid (cheap: one transformed element, no
 * per-line SVG). Reads as "architectural plane" rather than a flat grid. */
export function PerspectiveGrid({ origin = "bottom", opacity = 0.16, color = "rgba(110,150,220,0.9)", className, sweep }: PerspectiveGridProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} style={{ perspective: "600px" }}>
      <div
        className="absolute inset-x-[-25%]"
        style={{
          [origin]: "-10%",
          height: "85%",
          opacity,
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          transform: origin === "bottom" ? "rotateX(58deg)" : "rotateX(-58deg)",
          transformOrigin: origin === "bottom" ? "bottom" : "top",
          maskImage: `linear-gradient(to ${origin === "bottom" ? "top" : "bottom"}, black, transparent 92%)`,
          WebkitMaskImage: `linear-gradient(to ${origin === "bottom" ? "top" : "bottom"}, black, transparent 92%)`,
        }}
      />

      {sweep ? (
        <div
          className="animate-scan-sweep absolute inset-0 opacity-0"
          style={{
            backgroundImage: "linear-gradient(115deg, transparent 42%, var(--color-brand-cyan) 50%, transparent 58%)",
            backgroundSize: "260% 260%",
            mixBlendMode: "screen",
          }}
        />
      ) : null}
    </div>
  );
}
