const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

/** In-memory sliding window keyed by IP. This lives in module scope, so it
 * only limits within a single running server process — on serverless
 * platforms a cold start resets it, and a multi-instance deployment won't
 * share state across instances. That's a real limitation, not a bug: the
 * spec asks for a "short server-side rate limit", not a distributed one,
 * and the honeypot + timing check + duplicate-detection below it are the
 * actual first lines of defense against scripted abuse. Swap this for a
 * Redis/Upstash-backed limiter if this ever needs to hold up across
 * multiple instances. */
const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, recent);
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - recent[0]) };
  }

  recent.push(now);
  hits.set(key, recent);
  return { allowed: true, retryAfterMs: 0 };
}
