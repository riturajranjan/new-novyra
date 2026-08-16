interface BackgroundLabelProps {
  text: string;
  top: string;
  left: string;
  size?: string;
  opacity?: number;
}

/** DEPTH 3 primitive — a small mono-font faint text fragment (a "system
 * label," a coordinate, an index number). Never large enough to compete
 * with real content. */
export function BackgroundLabel({ text, top, left, size = "10px", opacity = 0.16 }: BackgroundLabelProps) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute font-mono font-medium tracking-[0.2em] text-white uppercase"
      style={{ top, left, fontSize: size, opacity }}
    >
      {text}
    </span>
  );
}

interface GiantNumberProps {
  value: string;
  top: string;
  left: string;
  size?: string;
  opacity?: number;
  rotate?: string;
}

/** DEPTH 2 primitive — an oversized, heavily cropped numeral fragment
 * (Selected Work's "01…06" project numbers bleeding off-frame). Never a
 * full readable number sitting inside the visible area — always cropped
 * or pushed to an edge so it stays texture, not a label. */
export function GiantNumber({ value, top, left, size = "18rem", opacity = 0.03, rotate }: GiantNumberProps) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute leading-none font-bold text-white select-none"
      style={{
        top,
        left,
        fontSize: size,
        opacity,
        transform: rotate ? `rotate(${rotate})` : undefined,
        letterSpacing: "-0.04em",
      }}
    >
      {value}
    </span>
  );
}
