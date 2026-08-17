"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FeaturedInsightVisual } from "@/components/blog/featured-insight-visual";
import type { BlogPost } from "@/content/blog";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

interface FeaturedInsightProps {
  post: BlogPost;
}

/** The editorial hero — Article 01. No article pages exist yet, so this is
 * a static `<article>`, not a link: the "Explore insight" affordance is a
 * plain visual element rather than a fake/broken navigation promise. The
 * artwork is deliberately oversized and cropped by the card boundary (a
 * few percent larger than its box, negative-inset) so it reads as one
 * dimensional composition rather than two rectangles placed side by side. */
export function FeaturedInsight({ post }: FeaturedInsightProps) {
  const t = useTranslations("blog");
  const stroke = accentStroke[post.accent];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.6, ease: easePremium }}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border sm:flex-row"
      style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0a0e1e" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: accentTint(post.accent, 30) }}
      />

      <div className="relative h-[220px] shrink-0 overflow-hidden sm:h-auto sm:w-[60%]">
        <span
          aria-hidden
          className="pointer-events-none absolute right-[-6%] bottom-[-10%] leading-none font-bold select-none"
          style={{
            fontSize: "clamp(160px, 22vw, 260px)",
            color: "transparent",
            WebkitTextStroke: `1px ${accentTint(post.accent, 40)}`,
            opacity: 0.4,
          }}
        >
          01
        </span>
        <div
          className="absolute -inset-[6%] transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
          style={{ transform: "scale(1.06)" }}
        >
          <FeaturedInsightVisual accent={post.accent} />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-2.5 p-6 sm:p-7">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-semibold tracking-[0.14em] text-white/35 uppercase">
            01 / {t("featuredLabel")}
          </span>
          <span className="h-3 w-px bg-white/15" aria-hidden />
          <span className="text-[12px] font-semibold tracking-[0.05em] uppercase" style={{ color: stroke }}>
            {t(`categories.${post.category}`)}
          </span>
        </div>
        <h3 className="text-[23px] leading-[1.15] font-semibold text-white transition-transform duration-300 group-hover:translate-x-0.5">
          {t(`posts.${post.id}.title`)}
        </h3>
        <p className="line-clamp-2 text-[14px] leading-[1.55] text-white/70">{t(`posts.${post.id}.description`)}</p>

        <span className="relative mt-1 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-white/85 transition-colors duration-300">
          {t("exploreInsight")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]" aria-hidden />
        </span>
      </div>
    </motion.article>
  );
}
