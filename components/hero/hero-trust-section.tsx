import { useTranslations } from "next-intl";
import { heroTrustItems } from "@/content/hero";
import { accentStroke, accentTint } from "@/lib/accent";

/** A compact two-column grid of honest capability claims beneath the CTAs —
 * never a star rating or fake review, just what Novyra actually does.
 * Server-rendered; the hover lift is a plain CSS transition (no client JS),
 * and the mount reveal rides the hero's CSS entrance. */
export function HeroTrustSection() {
  const t = useTranslations("hero.trust.items");

  return (
    <div className="mt-1 hidden md:grid grid-cols-1 gap-2 min-[430px]:grid-cols-2 sm:gap-2.5">
      {heroTrustItems.map((item) => {
        const Icon = item.icon;
        return (
          <span
            key={item.id}
            style={{ ["--pill-border" as string]: accentTint(item.accent, 40) }}
            className="glass text-caption text-foreground-secondary inline-flex min-h-10 items-center gap-2 rounded-pill px-3 py-1.5 font-medium transition-[transform,border-color] duration-base ease-soft hover:-translate-y-0.5 hover:scale-[1.02] hover:border-(--pill-border)">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{ background: accentTint(item.accent, 18) }}>
              <Icon
                className="h-3 w-3"
                style={{ color: accentStroke[item.accent] }}
                aria-hidden
              />
            </span>
            {t(item.id)}
          </span>
        );
      })}
    </div>
  );
}
