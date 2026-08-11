/** Fixed (not random-at-render) so the markup is deterministic. */
const particles = [
  { x: 12, y: 20, size: 3, delay: 0, duration: 6 },
  { x: 28, y: 65, size: 2, delay: 0.6, duration: 7.5 },
  { x: 42, y: 12, size: 2, delay: 1.2, duration: 5.5 },
  { x: 58, y: 78, size: 3, delay: 0.3, duration: 8 },
  { x: 68, y: 30, size: 2, delay: 1.8, duration: 6.5 },
  { x: 78, y: 55, size: 3, delay: 0.9, duration: 7 },
  { x: 88, y: 15, size: 2, delay: 1.5, duration: 6 },
  { x: 20, y: 42, size: 2, delay: 2.1, duration: 7.2 },
  { x: 92, y: 70, size: 2, delay: 0.4, duration: 5.8 },
  { x: 50, y: 90, size: 2, delay: 1.1, duration: 6.8 },
];

/** Subtle drifting particles for atmospheric depth. Server-rendered; the
 * drift is a CSS keyframe (`animate-hero-particle`), disabled under
 * prefers-reduced-motion via the global rule. */
export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-hero-particle bg-brand-cyan absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            // Idle base for when the keyframe is neutralized under
            // prefers-reduced-motion — matches the prior static value
            // instead of reverting to a solid opacity:1 dot.
            opacity: 0.35,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
