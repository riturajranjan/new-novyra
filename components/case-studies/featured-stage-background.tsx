interface FeaturedStageBackgroundProps {
  accent: string;
}

/** Featured concept's backdrop — "Product Stage": deeper blue-black than
 * the hero, one focused studio-light glow behind where the product
 * visual sits, faint diagonal stage geometry and a giant ghost "01" —
 * the interface reads as a product sitting under a spotlight, not part
 * of a network or an archive shelf. */
export function FeaturedStageBackground({ accent }: FeaturedStageBackgroundProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[36px]" style={{ backgroundColor: "#040611" }}>
      <div
        className="absolute inset-0 opacity-70 transition-[background] duration-700 ease-out"
        style={{ backgroundImage: `radial-gradient(46% 60% at 74% 40%, color-mix(in oklab, ${accent} 20%, transparent), transparent 70%)` }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: "linear-gradient(115deg, transparent 55%, rgba(255,255,255,0.03) 62%, transparent 70%)" }}
      />
      <span
        className="absolute top-1/2 right-[4%] leading-none font-bold text-white select-none"
        style={{ fontSize: "clamp(160px, 15vw, 260px)", letterSpacing: "-0.06em", opacity: 0.03, transform: "translateY(-50%)" }}
      >
        01
      </span>
    </div>
  );
}
