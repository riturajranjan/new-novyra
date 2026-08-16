const NODE_X = ["14%", "38%", "62%", "86%"];

/** Footer's signature motif — "Quiet System Terminal": the darkest, calmest
 * background on the page. An ultra-faint grid, tiny coordinates, one long
 * system line, four small glowing points aligned with the value strip
 * below it, and a barely-visible oversized "NOVYRA" wordmark. Motion is
 * almost nothing — a slow node pulse, nothing else — so the page settles
 * here rather than staying "alive" to the very bottom. */
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
        className="pointer-events-none absolute inset-x-0 bottom-[22%] flex justify-center overflow-hidden text-[16vw] leading-none font-bold whitespace-nowrap text-white opacity-[0.018] select-none"
        style={{ letterSpacing: "-0.03em" }}
      >
        NOVYRA
      </span>

      <div
        className="absolute inset-x-[6%] bottom-[24%] h-px opacity-[0.16]"
        style={{ backgroundImage: "linear-gradient(90deg, transparent, var(--color-brand-blue) 25%, var(--color-brand-purple) 75%, transparent)" }}
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

      {["01", "02", "03"].map((label, i) => (
        <span key={label} className="absolute top-[6%] font-mono text-[9px] text-white/12" style={{ left: `${16 + i * 30}%` }}>
          {label}
        </span>
      ))}

      <div className="bg-noise absolute inset-0 opacity-[0.02] mix-blend-overlay" />
    </div>
  );
}
