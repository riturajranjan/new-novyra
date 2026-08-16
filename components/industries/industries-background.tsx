/** A light tonal wash — bridges Services (no background) into Recent
 * Projects' richer CaseStudiesBackground, rather than a hard cut between
 * sections. Same cheap primitives used sitewide: one drifting blur circle
 * (transform-only), a faint grid, and noise — no blur-heavy full-section
 * glass, nothing scroll-linked. */
export function IndustriesBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-cyan/10 animate-drift-slow absolute top-[10%] right-[-10rem] h-[26rem] w-[26rem] rounded-full blur-[130px]" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(60% 55% at 70% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 55% at 70% 40%, black, transparent)",
        }}
      />
    </div>
  );
}
