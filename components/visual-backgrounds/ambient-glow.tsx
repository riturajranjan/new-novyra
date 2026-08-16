interface AmbientGlowProps {
  /** CSS position values — set whichever edges apply, leave the rest unset. */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Elongated by default (width far exceeds height) so it reads as
   * directional light entering the frame rather than a circular blob. */
  width: string;
  height: string;
  color: string;
  opacity?: number;
  blur?: string;
  rotate?: string;
  className?: string;
}

/** DEPTH 1 primitive — a soft, directional wash of light (never a crisp
 * circular blob). Used across every section background at low opacity as
 * the most distant layer. Pure CSS, no animation by default — sections
 * that want it to drift add `animate-*` via `className`. */
export function AmbientGlow({ top, bottom, left, right, width, height, color, opacity = 0.14, blur = "120px", rotate, className }: AmbientGlowProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-[999px] ${className ?? ""}`}
      style={{
        top,
        bottom,
        left,
        right,
        width,
        height,
        backgroundColor: color,
        opacity,
        filter: `blur(${blur})`,
        transform: rotate ? `rotate(${rotate})` : undefined,
      }}
    />
  );
}
