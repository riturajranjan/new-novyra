type Listener = () => void;

/** A tiny shared counter so unrelated modal components (the mobile nav
 * drawer, this popup itself) can answer "is some other modal already open"
 * without knowing about each other directly. Module-scoped state is fine
 * here — there's exactly one of each modal per page, and this only ever
 * runs client-side. */
let openCount = 0;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function registerModalOpen(): void {
  openCount += 1;
  notify();
}

export function registerModalClosed(): void {
  openCount = Math.max(0, openCount - 1);
  notify();
}

export function isAnyModalOpen(): boolean {
  return openCount > 0;
}

export function subscribeModalOpen(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
