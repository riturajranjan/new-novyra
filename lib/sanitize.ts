/** Strips markup before values are persisted — defense at write time, so
 * nothing HTML-shaped ever reaches the database regardless of how it's
 * displayed later (admin UI, exports, etc). */
export function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

/** Escapes for safe interpolation into HTML — defense at render time, used
 * specifically when building the email templates. Even though values are
 * already tag-stripped before saving, this is cheap insurance against
 * characters like `&` or stray `<`/`>` breaking the email markup. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
