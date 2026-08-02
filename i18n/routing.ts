import { defineRouting } from "next-intl/routing";

/** Single source of truth for supported locales — imported by the
 * middleware, the navigation helpers, and the locale layout, so adding a
 * third language later only means editing this file plus the message
 * dictionaries. `localePrefix: "always"` is what makes English live at
 * `/en/...` rather than at the bare root — required for the `/en` and
 * `/hi` URL scheme this project asked for. */
export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type AppLocale = (typeof routing.locales)[number];
