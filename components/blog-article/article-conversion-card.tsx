import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AccentColor } from "@/content/hero-screens";
import { accentTint } from "@/lib/accent";

interface ArticleConversionCardProps {
  accent: AccentColor;
}

/** Deliberately quiet — a hairline border, one line of copy, one link.
 * The article stays the primary focus; this earns its place in the
 * sidebar without competing for attention. */
export async function ArticleConversionCard({ accent }: ArticleConversionCardProps) {
  const t = await getTranslations("blogArticle.conversionCard");

  return (
    <div
      className="flex flex-col gap-2.5 rounded-xl border p-4"
      style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: accentTint(accent, 5) }}
    >
      <p className="text-[14px] leading-snug font-semibold text-white">{t("heading")}</p>
      <p className="text-[12.5px] leading-snug text-white/50">{t("description")}</p>
      <Link
        href="/contact"
        className="group mt-1 inline-flex w-fit items-center gap-1.5 text-[12.5px] font-semibold text-white/85 transition-colors duration-base hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
      >
        {t("cta")}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </Link>
    </div>
  );
}
