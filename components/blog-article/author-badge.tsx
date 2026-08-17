import { useTranslations } from "next-intl";
import type { AuthorId } from "@/content/blog-articles";
import { articleAuthors } from "@/content/blog-articles";

interface AuthorBadgeProps {
  authorId: AuthorId;
  size?: "sm" | "md";
}

/** A brand monogram standing in for a byline photo — Novyra has no
 * individually bylined writers, so this never fakes a headshot. Reused in
 * the hero metadata row and the Article Details panel. */
export function AuthorBadge({ authorId, size = "md" }: AuthorBadgeProps) {
  const t = useTranslations("blogArticle");
  const author = articleAuthors[authorId];
  const dimension = size === "sm" ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-[13px]";

  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className={`bg-gradient-brand flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${dimension}`}
      >
        N
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold text-white">{t(author.nameKey)}</span>
        <span className="text-[11px] text-white/45">{t(author.roleKey)}</span>
      </div>
    </div>
  );
}
