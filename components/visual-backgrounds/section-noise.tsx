/** Thin wrapper around the shared `.bg-noise` utility — a fine grain
 * texture on top of every section's background so nothing reads as a flat
 * digital gradient. */
export function SectionNoise({ opacity = 0.03 }: { opacity?: number }) {
  return <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 mix-blend-overlay" style={{ opacity }} />;
}
