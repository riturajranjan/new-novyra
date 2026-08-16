/** The footer's brand signature — a huge, low-opacity "NOVYRA" wordmark
 * cropped behind the bottom bar. Purely decorative, static (no animation
 * loop), clipped by the footer's own overflow-hidden so it never affects
 * layout or scroll width. */
export function FooterWordmark() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[-6%] -z-10 flex justify-center overflow-hidden select-none">
      <span
        className="text-gradient-brand text-[20vw] leading-none font-bold whitespace-nowrap opacity-[0.05] sm:text-[16vw]"
        style={{ letterSpacing: "-0.03em" }}
      >
        NOVYRA
      </span>
    </div>
  );
}
