import Image from "next/image";

const PARTICLES = [
  { angle: 20, radius: 46, size: 5, color: "var(--color-brand-blue)", delay: "0s" },
  { angle: 150, radius: 50, size: 4, color: "var(--color-brand-purple)", delay: "1.2s" },
  { angle: 250, radius: 44, size: 4, color: "var(--color-brand-pink)", delay: "2.1s" },
];

/** The Project CTA's left visual — the real Novyra "N" mark (cropped from
 * the actual logo asset, not a redrawn icon) inside two concentric rings
 * with a handful of tiny orbiting particles. Motion is a single slow
 * rotation on the outer ring plus a gentle glow pulse — nothing fast,
 * nothing sprawling. */
export function OrbitalMark() {
  return (
    <div aria-hidden className="relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
      <span
        className="animate-glow-pulse pointer-events-none absolute inset-0 rounded-full opacity-60 blur-xl"
        style={{ backgroundImage: "radial-gradient(circle, var(--color-brand-blue), var(--color-brand-purple) 60%, transparent 75%)" }}
      />

      <span className="animate-spin-slow border-border-subtle absolute inset-0 rounded-full border" style={{ transformOrigin: "50% 50%" }} />
      <span
        className="animate-spin-slow-reverse absolute inset-2.5 rounded-full border border-dashed"
        style={{ borderColor: "color-mix(in oklab, var(--color-brand-purple) 35%, transparent)", transformOrigin: "50% 50%" }}
      />

      {PARTICLES.map((p, i) => {
        const x = 50 + p.radius * Math.cos((p.angle * Math.PI) / 180);
        const y = 50 + p.radius * Math.sin((p.angle * Math.PI) / 180);
        return (
          <span
            key={i}
            className="animate-node-drift absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDelay: p.delay,
              boxShadow: `0 0 6px 1px ${p.color}`,
            }}
          />
        );
      })}

      <span className="bg-background shadow-card relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full sm:h-16 sm:w-16">
        <span className="relative block h-full w-full overflow-hidden">
          <Image
            src="/logo.png"
            alt="Novyra Technologies"
            width={800}
            height={330}
            className="absolute top-[35px] left-[8px] h-auto w-[260px] max-w-none -translate-y-1/2 sm:w-[165px]"
          />
        </span>
      </span>
    </div>
  );
}
