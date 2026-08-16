/** The page's closing backdrop — deliberately quiet and dark (the ProjectCta
 * panel and the footer panel above provide their own subtle glows), so the
 * page settles here instead of staying "alive" all the way to the bottom.
 * Just a faint grid and a soft noise texture. */
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
      <div className="bg-noise absolute inset-0 opacity-[0.02] mix-blend-overlay" />
    </div>
  );
}
