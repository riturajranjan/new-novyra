import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/** One JSON file per section/namespace rather than one giant messages file
 * per locale — keeps each section's translations independently reviewable
 * and let separate sections be translated/edited without touching a
 * shared file. Add a new section here (and mirror it under both locales'
 * folders) when a new namespace is introduced; `useTranslations("xyz")` /
 * `getTranslations("xyz")` on the consuming side just needs the key to
 * match a property below. */
const namespaces = [
  "common",
  "nav",
  "footer",
  "hero",
  "services",
  "pricing",
  "advisor",
  "faq",
  "caseStudies",
  "process",
  "contact",
  "metadata",
  "leadPopup",
  "about",
  "mobileCta",
  "legal",
  "work",
  "industries",
  "trustedPartner",
  "blog",
] as const;

async function loadMessages(locale: string) {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const mod = await import(`../messages/${locale}/${namespace}.json`);
      return [namespace, mod.default] as const;
    }),
  );
  return Object.fromEntries(entries);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
