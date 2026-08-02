type Listener = () => void;

/** Shared counter so the persistent mobile conversion dock can tell when a
 * section-local contextual sticky bar (pricing's plan-spotlight bar,
 * services' category bar — see components/sections/pricing.tsx and
 * services-showcase.tsx) is already occupying the same fixed
 * bottom-of-viewport position, and hide itself rather than stack on top of
 * it. Deliberately a separate counter from `modal-registry.ts` — these bars
 * aren't modals, and coupling this to modal state would wrongly suppress
 * the lead popup trigger just because the user has scrolled to a section
 * with a contextual bar on screen. */
let visibleCount = 0;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function registerStickyBarVisible(): void {
  visibleCount += 1;
  notify();
}

export function registerStickyBarHidden(): void {
  visibleCount = Math.max(0, visibleCount - 1);
  notify();
}

export function isStickyBarVisible(): boolean {
  return visibleCount > 0;
}

export function subscribeStickyBarVisible(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
