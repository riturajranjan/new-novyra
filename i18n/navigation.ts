import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware drop-in replacements for next/link and next/navigation.
 * `Link` automatically prefixes hrefs with the current locale, and
 * `usePathname` strips the locale prefix back off (so components that
 * compare against nav hrefs like "/about" don't need to know locales
 * exist at all). Every internal link in the app should import `Link` from
 * here instead of "next/link" — that's what keeps navigation locale-aware
 * without touching every href by hand. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
