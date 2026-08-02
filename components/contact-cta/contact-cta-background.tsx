const particles = [
  { top: "12%", left: "10%", size: "h-1 w-1", delay: "0.2s" },
  { top: "22%", left: "88%", size: "h-1.5 w-1.5", delay: "1.4s" },
  { top: "52%", left: "6%", size: "h-1 w-1", delay: "2.3s" },
  { top: "70%", left: "78%", size: "h-1.5 w-1.5", delay: "0.8s" },
  { top: "90%", left: "42%", size: "h-1 w-1", delay: "1.9s" },
];

/** The most cinematic backdrop on the page — this is the final conversion
 * section, so the aurora glows run larger and brighter than any earlier
 * section's background. Clipped within this div only, never the outer
 * section, so nothing here fights a sticky/floating child element. */
export function ContactCtaBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-brand-blue/16 animate-drift absolute top-[-8rem] left-[-8rem] h-[34rem] w-[34rem] rounded-full blur-[140px]" />
      <div className="bg-brand-purple/16 animate-drift-slow absolute top-[6%] right-[-10rem] h-[32rem] w-[32rem] rounded-full blur-[140px]" />
      <div className="bg-brand-cyan/12 animate-drift-slow absolute bottom-[-6rem] left-[20%] h-[28rem] w-[28rem] rounded-full blur-[140px]" />
      <div className="bg-brand-pink/8 absolute top-1/2 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" />

      {particles.map((p, i) => (
        <span
          key={i}
          className={`bg-brand-blue/40 animate-drift-slow absolute rounded-full ${p.size}`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(70% 65% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 65% at 50% 30%, black, transparent)",
        }}
      />

      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-[120%] w-[60%] -translate-x-1/2 opacity-[0.07] blur-3xl dark:opacity-[0.12]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 44%, color-mix(in oklab, var(--color-brand-cyan) 55%, transparent) 49%, transparent 54%, color-mix(in oklab, var(--color-brand-purple) 50%, transparent) 66%, transparent 71%)",
        }}
      />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
