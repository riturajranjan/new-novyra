import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { articles } from "@/content/blog-articles";
import { caseStudySlugs } from "@/content/case-studies";

const SITE_URL = "https://novyratech.in";

/** Every real route on the site, listed once — kept here instead of
 * re-derived from the footer/nav content modules so this can't silently
 * lose a page just because it isn't linked from the footer or nav (see
 * content/footer.ts and content/nav.ts, which intentionally only link
 * pages that exist, not the other way around). Anchor sections on the
 * homepage (`/#services`, `/#pricing`, etc.) aren't separate routes and
 * don't belong here. `/contact` and `/blog` were previously missing here
 * despite being real, indexable routes. */
const routes = [
  "",
  "/about",
  "/work",
  "/services",
  "/industries",
  "/pricing",
  "/contact",
  "/blog",
  "/privacy",
  "/terms",
  "/cookies",
  "/accessibility",
  ...caseStudySlugs.map((slug) => `/work/${slug}`),
  ...articles.map((article) => `/blog/${article.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}/${routing.defaultLocale}${route}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${route}`])),
    },
  }));
}
