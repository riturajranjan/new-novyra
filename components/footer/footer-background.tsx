const NODE_X = ["14%", "38%", "62%", "86%"];
const PARTICLES = [
  { top: "30%", left: "20%" },
  { top: "40%", left: "72%" },
];

/** Footer's signature motif — "Quiet System Terminal": the darkest, calmest
 * background on the page. An ultra-faint grid, tiny coordinates, one thin
 * animated blue → violet → magenta line, four small glowing points aligned
 * with the value strip below it, a couple of slow-drifting particles, and
 * a barely-visible oversized "NOVYRA" watermark cropped at the bottom edge
 * — sized so it never adds height to the section. Motion stays minimal so
 * the page settles here rather than staying "alive" to the very bottom. */
export function FooterBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(80% 70% at 50% 10%, black, transparent)",
          WebkitMaskImage: "radial-gradient(80% 70% at 50% 10%, black, transparent)",
        }}
      />

      <span
        className="pointer-events-none absolute inset-x-0 flex justify-center overflow-hidden leading-none font-extrabold whitespace-nowrap select-none"
        style={{
          bottom: "-14%",
          fontSize: "clamp(140px, 18vw, 300px)",
          letterSpacing: "-0.07em",
          opacity: 0.035,
          backgroundImage: "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-purple), var(--color-brand-pink))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        NOVYRA
      </span>

      <div
        className="animate-tiny-pulse absolute inset-x-[6%] bottom-[24%] h-px"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent, var(--color-brand-blue) 25%, var(--color-brand-purple) 60%, var(--color-brand-pink) 80%, transparent)",
          opacity: 0.18,
        }}
      />

      {NODE_X.map((x, i) => (
        <span
          key={x}
          className="animate-tiny-pulse absolute bottom-[calc(24%-2px)] h-1 w-1 rounded-full"
          style={{
            left: x,
            backgroundColor: i % 2 === 0 ? "var(--color-brand-blue)" : "var(--color-brand-purple)",
            animationDelay: `${i * 1.3}s`,
          }}
        />
      ))}

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="animate-node-drift absolute h-[3px] w-[3px] rounded-full"
          style={{ top: p.top, left: p.left, backgroundColor: "var(--color-brand-purple)", opacity: 0.4, animationDelay: `${i * 2}s` }}
        />
      ))}

      {["01", "02", "03"].map((label, i) => (
        <span key={label} className="absolute top-[6%] font-mono text-[9px] text-white/12" style={{ left: `${16 + i * 30}%` }}>
          {label}
        </span>
      ))}

      <div className="bg-noise absolute inset-0 opacity-[0.02] mix-blend-overlay" />
    </div>
  );
}
