interface OrbitalFieldProps {
  size?: number;
  ringColor?: string;
  ringColorSecondary?: string;
  opacity?: number;
  className?: string;
}

/** DEPTH 2/3 primitive — two counter-rotating concentric rings, extremely
 * slow (44s / 60s). Used for the Project CTA's "orbital communication"
 * motif and reusable anywhere a section wants an orbit/network read. */
export function OrbitalField({ size = 420, ringColor = "var(--color-brand-blue)", ringColorSecondary = "var(--color-brand-purple)", opacity = 0.16, className }: OrbitalFieldProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{ width: size, height: size, opacity }}
    >
      <circle
        className="animate-spin-slow"
        cx="200"
        cy="200"
        r="170"
        fill="none"
        stroke={ringColor}
        strokeWidth="1"
        strokeDasharray="1 10"
        style={{ transformOrigin: "200px 200px" }}
      />
      <circle
        className="animate-spin-slow-reverse"
        cx="200"
        cy="200"
        r="130"
        fill="none"
        stroke={ringColorSecondary}
        strokeWidth="1"
        strokeDasharray="1 8"
        style={{ transformOrigin: "200px 200px" }}
      />
      <circle cx="200" cy="30" r="3" fill={ringColor} className="animate-node-drift" />
      <circle cx="370" cy="200" r="2.5" fill={ringColorSecondary} className="animate-node-drift" style={{ animationDelay: "2s" }} />
    </svg>
  );
}
