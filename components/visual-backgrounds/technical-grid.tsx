interface TechnicalGridProps {
  opacity?: number;
  size?: number;
  color?: string;
  /** CSS mask-image value — fades the grid so it doesn't read as a hard
   * rectangle. Defaults to a centered radial fade. */
  mask?: string;
  className?: string;
}

/** DEPTH 2 primitive — the faint line grid used (with different mask/size
 * per section) as one shared "technical geometry" language across the
 * page, instead of every section inventing its own grid from scratch. */
export function TechnicalGrid({
  opacity = 0.045,
  size = 56,
  color = "rgba(120,140,180,0.85)",
  mask = "radial-gradient(65% 60% at 50% 35%, black, transparent)",
  className,
}: TechnicalGridProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        opacity,
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
