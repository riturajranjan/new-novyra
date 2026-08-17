"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/content/blog";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";

interface InsightRowProps {
  post: BlogPost;
  index: number;
}

/** One compact secondary story — a premium editorial index entry (number +
 * category, a title allowed up to two lines, never ellipsis-truncated, a
 * diagonal arrow) separated by a hairline rather than boxed in its own
 * card. A faint accent-tinted glow appears behind the row on hover. Links
 * to the real dynamic article route at /blog/[slug]. */
export function InsightRow({ post, index }: InsightRowProps) {
  const t = useTranslations("blog");
  const stroke = accentStroke[post.accent];
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: easePremium }}
      className="border-t first:border-t-0"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <Link
        href={`/blog/${post.id}`}
        className="group relative flex items-center gap-4 px-1 py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:py-4.5"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: `radial-gradient(120% 140% at 0% 50%, ${accentTint(post.accent, 8)}, transparent 70%)` }}
        />

        <span
          aria-hidden
          className="absolute top-0 left-0 h-px w-6 origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-[2]"
          style={{ backgroundColor: stroke }}
        />

        <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-white/30 tabular-nums">{number}</span>
            <span className="text-[11px] font-semibold tracking-[0.06em] uppercase" style={{ color: stroke }}>
              {t(`categories.${post.category}`)}
            </span>
          </div>
          <h4 className="line-clamp-2 text-[16px] leading-[1.3] font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
            {t(`posts.${post.id}.title`)}
          </h4>
        </div>

        <span
          aria-hidden
          className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-white/[0.04]"
          style={{ borderColor: accentTint(post.accent, 24) }}
        >
          <ArrowUpRight
            className="h-3.5 w-3.5 text-white/60 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-white"
            aria-hidden
          />
        </span>
      </Link>
    </motion.div>
  );
}
