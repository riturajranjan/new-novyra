import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const PRODUCTION_HOST = "novyratech.in";

const intlMiddleware = createMiddleware(routing);

/** Canonical-domain redirect, ahead of the locale middleware. Vercel keeps
 * a project's own `*.vercel.app` alias live indefinitely even after a
 * custom domain is attached — if that alias stays crawlable, it competes
 * with novyratech.in as a duplicate-content source, since `metadataBase`
 * (see app/[locale]/layout.tsx) only puts a canonical *hint* in the page
 * head and search engines don't always defer to that over an actual
 * response. A real 301 is the reliable fix.
 *
 * Scoped to `VERCEL_ENV === "production"` so preview deployments — used to
 * review a branch before it's live, often before any domain is attached —
 * are never redirected away from the only URL they have. Locally
 * (`VERCEL_ENV` unset) this is a no-op and falls straight through to the
 * existing i18n middleware. */
export default function middleware(request: NextRequest) {
  if (process.env.VERCEL_ENV === "production") {
    const host = request.headers.get("host") ?? "";
    if (host && host !== PRODUCTION_HOST && host !== `www.${PRODUCTION_HOST}`) {
      const url = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, `https://${PRODUCTION_HOST}`);
      return NextResponse.redirect(url, 301);
    }
  }
  return intlMiddleware(request);
}

/** Resolves the locale for every request (URL prefix > NEXT_LOCALE cookie
 * > Accept-Language header, in that order), redirects bare paths to the
 * right `/en` or `/hi` prefix, and — critically for "persist after
 * refresh / while navigating" — writes the resolved locale back to the
 * `NEXT_LOCALE` cookie so the next request already knows the preference
 * without needing the URL to carry it across a fresh tab or a typed-in
 * URL. */
export const config = {
  // Run on every path except static assets, image optimization, favicon,
  // and API routes — none of the latter exist yet, but excluding /api is
  // the standard next-intl matcher so future routes there aren't
  // accidentally locale-prefixed.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
