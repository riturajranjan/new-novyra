import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after client hydration. React automatically re-renders once
 * after hydrating when a useSyncExternalStore snapshot differs from the
 * server snapshot, which is exactly the signal we want here — no effect
 * (and no effect-triggered setState) required.
 */
export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
