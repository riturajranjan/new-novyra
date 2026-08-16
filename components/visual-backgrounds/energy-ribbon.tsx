interface EnergyRibbonProps {
  d: string;
  viewBox: string;
  strokeWidth?: number;
  opacity?: number;
  blur?: string;
  className?: string;
  id: string;
}

/** DEPTH 1/2 primitive — one broad, softly blurred gradient stroke (blue →
 * violet → magenta), drifting a few pixels. Reads as "light passing through
 * curved glass," never a solid cartoon wave. Used for Pricing's energy
 * ribbon and reusable anywhere a section wants that same signature. */
export function EnergyRibbon({ d, viewBox, strokeWidth = 80, opacity = 0.14, blur = "44px", className, id }: EnergyRibbonProps) {
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={`animate-ribbon-breathe pointer-events-none absolute ${className ?? ""}`}
      style={{ opacity, filter: `blur(${blur})` }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-blue)" />
          <stop offset="50%" stopColor="var(--color-brand-purple)" />
          <stop offset="100%" stopColor="var(--color-brand-pink)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}
