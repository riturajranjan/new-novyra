interface FlowPath {
  d: string;
  color: string;
  delay?: string;
  slow?: boolean;
}

interface FlowFieldProps {
  paths: FlowPath[];
  viewBox: string;
  opacity?: number;
  className?: string;
  strokeWidth?: number;
}

/** DEPTH 2 primitive — a small set of extremely thin curved traces that
 * drift a few pixels horizontally and breathe in opacity. Used wherever a
 * section's metaphor is "pathways / systems / flow" (What We Do, Process)
 * rather than a rigid grid. */
export function FlowField({ paths, viewBox, opacity = 0.18, className, strokeWidth = 1.25 }: FlowFieldProps) {
  return (
    <svg aria-hidden viewBox={viewBox} preserveAspectRatio="none" className={`pointer-events-none absolute ${className ?? ""}`} style={{ opacity }}>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={p.slow ? "animate-flow-drift-slow" : "animate-flow-drift"}
          style={{ animationDelay: p.delay ?? "0s" }}
        />
      ))}
    </svg>
  );
}
