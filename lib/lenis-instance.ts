import type Lenis from "lenis";

/** A tiny mutable singleton the root `SmoothScrollProvider` publishes its
 * Lenis instance into — anything that needs to scroll-to-target
 * programmatically (e.g. the blog article TOC) must go through Lenis's
 * own `scrollTo`, not a raw `window.scrollTo`/`scrollIntoView`: Lenis
 * maintains its own virtual scroll position and RAF loop, and a call
 * that bypasses it gets fought/overridden on the next frame. `null` when
 * Lenis isn't running (prefers-reduced-motion, or before mount) — callers
 * fall back to native anchor/scrollIntoView behavior in that case. */
export const lenisInstance: { current: Lenis | null } = { current: null };
