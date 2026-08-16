interface SignalNodeProps {
  x: string;
  y: string;
  size?: number;
  color?: string;
  delay?: string;
  glow?: boolean;
}

/** DEPTH 3 primitive — one small foreground signal point. Absolutely
 * positioned within whatever parent supplies the coordinate space; `x`/`y`
 * are percentages. */
export function SignalNode({ x, y, size = 3, color = "var(--color-brand-cyan)", delay = "0s", glow = true }: SignalNodeProps) {
  return (
    <span
      aria-hidden
      className="animate-tiny-pulse pointer-events-none absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        animationDelay: delay,
        boxShadow: glow ? `0 0 6px 1px ${color}` : undefined,
      }}
    />
  );
}
