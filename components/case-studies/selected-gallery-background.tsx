/** Selected Concepts' backdrop — "Editorial Gallery": near-black, a
 * handful of very faint horizontal rules (not a technical grid), large
 * cropped project numbers bleeding off the edges, and a thin blue/violet
 * wash between rows. Reads as a magazine spread, not a dashboard. */
export function SelectedGalleryBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ backgroundColor: "#040509" }}>
      {[22, 42, 62, 82].map((top) => (
        <div key={top} className="absolute inset-x-0 h-px bg-white/[0.035]" style={{ top: `${top}%` }} />
      ))}
      {["02", "03", "04", "05", "06"].map((n, i) => (
        <span
          key={n}
          className="absolute leading-none font-bold text-white select-none"
          style={{
            top: `${8 + i * 20}%`,
            left: i % 2 === 0 ? "-1%" : undefined,
            right: i % 2 === 1 ? "-1%" : undefined,
            fontSize: "clamp(70px, 8vw, 130px)",
            opacity: 0.02,
          }}
        >
          {n}
        </span>
      ))}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(40% 30% at 30% 35%, color-mix(in oklab, var(--color-brand-blue) 8%, transparent), transparent 70%), radial-gradient(40% 30% at 75% 70%, color-mix(in oklab, var(--color-brand-purple) 7%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
