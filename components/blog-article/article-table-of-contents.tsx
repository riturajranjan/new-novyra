"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
}

interface ArticleTableOfContentsProps {
  items: TocItem[];
  accent: AccentColor;
}

/** Desktop: a compact sticky list, the currently-visible chapter
 * highlighted via IntersectionObserver. Mobile: the same active-tracking
 * logic folded into a closed-by-default accordion ("On this page ↓") so
 * it doesn't push the headline down the viewport. One shared component,
 * not two — the active-section logic only needs to exist once. Chapter
 * titles arrive pre-resolved from the server-rendered parent, since this
 * client component only knows chapter ids, not the translation namespace. */
export function ArticleTableOfContents({ items, accent }: ArticleTableOfContentsProps) {
  const t = useTranslations("blogArticle");
  const stroke = accentStroke[accent];
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const headings = items
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function scrollToChapter(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 128;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMobileOpen(false);
  }

  const list = (
    <ol className="flex flex-col gap-0.5">
      {items.map((item, i) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToChapter(item.id);
              }}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "group flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[13px] leading-snug transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
                isActive ? "text-white" : "text-white/45 hover:text-white/75",
              )}
            >
              <span className="mt-px shrink-0 font-mono text-[11px] tabular-nums" style={{ color: isActive ? stroke : undefined }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative">
                {item.title}
                {isActive ? (
                  <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full" style={{ backgroundColor: stroke }} />
                ) : null}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label={t("toc.heading")}>
      {/* Desktop — plain sticky list */}
      <div className="hidden lg:block">
        <span className="mb-3 block text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">{t("toc.heading")}</span>
        {list}
      </div>

      {/* Mobile/tablet — closed-by-default accordion */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 px-4 py-3 text-[13px] font-semibold text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          {t("toc.mobileToggle")}
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-base", mobileOpen && "rotate-180")} aria-hidden />
        </button>
        {mobileOpen ? <div className="mt-2 rounded-lg border border-white/10 p-2">{list}</div> : null}
      </div>
    </nav>
  );
}
