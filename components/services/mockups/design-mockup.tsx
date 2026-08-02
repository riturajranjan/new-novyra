"use client";

import { motion } from "framer-motion";
import { Heart, Image as ImageIcon, MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { AccentColor } from "@/content/hero-screens";

/** Gallery of brand-collateral mockups for the Graphic Design service
 * preview — each tile is composed to resemble the actual deliverable's
 * real-world layout (a logo sheet shown on light *and* dark, a palette as
 * an actual swatch strip, a business card with a proper card silhouette
 * and text lines, an Instagram post with its header/image/action-row
 * structure, and so on) rather than an abstract shape standing in for the
 * idea of it. Still built from plain divs/gradients, not real artwork —
 * but the composition itself is what makes it read as a deliverable. */
export function DesignMockup({ accent }: { accent: AccentColor }) {
  const t = useTranslations("services");
  const stroke = accentStroke[accent];
  const tint = (p: number) => accentTint(accent, p);

  const items: { id: string; content: React.ReactNode }[] = [
    {
      // Logo presentation sheet — the mark shown on light and dark, the
      // standard way a logo suite is actually presented.
      id: "logo",
      content: (
        <div className="grid h-full grid-cols-2">
          <div className="flex items-center justify-center bg-white">
            <div className="h-5 w-5 rounded-[6px]" style={{ backgroundColor: stroke }} />
          </div>
          <div className="flex items-center justify-center bg-[#111015]">
            <div className="h-5 w-5 rounded-[6px] bg-white" />
          </div>
        </div>
      ),
    },
    {
      // Color palette — an actual swatch strip, evenly divided, not dots.
      id: "brandKit",
      content: (
        <div className="flex h-full">
          {[stroke, tint(65), tint(40), tint(22)].map((c, i) => (
            <span key={i} className="h-full flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      ),
    },
    {
      // Business card — a real card silhouette (proper aspect ratio,
      // shadow, rounded corners) sitting on a soft surface, with a mark
      // and two text lines in the standard bottom-left layout.
      id: "businessCard",
      content: (
        <div className="flex h-full items-center justify-center p-2" style={{ backgroundColor: tint(8) }}>
          <div className="border-border-subtle flex aspect-[1.75/1] w-full max-w-[92px] flex-col justify-between rounded-[5px] border bg-white p-2 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.35)]">
            <div className="h-2 w-2 rounded-[3px]" style={{ backgroundColor: stroke }} />
            <div className="flex flex-col gap-0.5">
              <span className="h-[3px] w-3/5 rounded-full" style={{ backgroundColor: "rgba(15,15,20,0.7)" }} />
              <span className="h-[3px] w-2/5 rounded-full bg-black/20" />
            </div>
          </div>
        </div>
      ),
    },
    {
      // Instagram creative — header (avatar + handle), image area, action
      // row — the actual structure of a post, not a lone icon.
      id: "instagramPost",
      content: (
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center gap-1 px-1.5 py-1">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: stroke }} />
            <span className="h-[3px] w-8 rounded-full bg-black/15" />
          </div>
          <div
            className="flex flex-1 items-center justify-center"
            style={{ backgroundImage: `linear-gradient(135deg, ${tint(55)}, ${tint(20)})` }}
          >
            <ImageIcon className="h-3.5 w-3.5 text-white/80" aria-hidden />
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-1">
            <Heart className="h-2.5 w-2.5" style={{ color: stroke }} aria-hidden />
            <MessageCircle className="h-2.5 w-2.5 text-black/30" aria-hidden />
            <Send className="h-2.5 w-2.5 text-black/30" aria-hidden />
          </div>
        </div>
      ),
    },
    {
      // Website banner — headline + subline + a real CTA pill, the shape
      // of an actual promo banner.
      id: "websiteBanner",
      content: (
        <div
          className="flex h-full flex-col justify-center gap-1.5 px-3"
          style={{ backgroundImage: `linear-gradient(120deg, ${tint(30)}, ${tint(10)})` }}
        >
          <span className="h-2 w-3/4 rounded-full" style={{ backgroundColor: stroke }} />
          <span className="h-1 w-1/2 rounded-full bg-black/20" />
          <span
            className="mt-1 flex h-3.5 w-11 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: stroke }}
          >
            <span className="h-[3px] w-4 rounded-full bg-white/80" />
          </span>
        </div>
      ),
    },
    {
      // Brochure — an opened tri-fold, three panels each with their own
      // header rule and body lines.
      id: "brochure",
      content: (
        <div className="flex h-full gap-[3px] bg-black/[0.04] p-1.5">
          {[0, 1, 2].map((panel) => (
            <div key={panel} className="flex flex-1 flex-col gap-1 rounded-[3px] bg-white p-1.5">
              <span className="h-[3px] w-full rounded-full" style={{ backgroundColor: panel === 1 ? stroke : tint(30) }} />
              <span className="h-[2px] w-full rounded-full bg-black/10" />
              <span className="h-[2px] w-2/3 rounded-full bg-black/10" />
            </div>
          ))}
        </div>
      ),
    },
    {
      // Packaging — a box front with a skewed side panel for a light 3D
      // read, plus a color band and centered mark.
      id: "packaging",
      content: (
        <div className="flex h-full items-center justify-center gap-0.5" style={{ perspective: 200 }}>
          <div
            className="relative flex h-9 w-8 flex-col overflow-hidden rounded-[3px] border"
            style={{ backgroundColor: "#fff", borderColor: tint(35) }}
          >
            <span className="h-2 w-full shrink-0" style={{ backgroundColor: stroke }} />
            <span className="flex flex-1 items-center justify-center">
              <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: tint(60) }} />
            </span>
          </div>
          <div
            className="h-9 w-3 rounded-r-[3px] opacity-80"
            style={{ backgroundColor: tint(18), transform: "skewY(6deg)" }}
          />
        </div>
      ),
    },
    {
      // Presentation — title bar + a small bar chart, the shape of an
      // actual data slide rather than plain text lines.
      id: "presentation",
      content: (
        <div className="flex h-full flex-col justify-between bg-white p-2">
          <span className="h-[3px] w-2/3 rounded-full" style={{ backgroundColor: stroke }} />
          <div className="flex h-6 items-end gap-1">
            {[40, 70, 50, 90].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[2px]"
                style={{ height: `${h}%`, backgroundColor: i === 3 ? stroke : tint(30) }}
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid h-full grid-cols-3 gap-2 p-3 sm:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: easePremium }}
          className="border-border-subtle flex flex-col overflow-hidden rounded-lg border shadow-[0_2px_8px_-4px_rgba(0,0,0,0.15)] transition-shadow duration-base hover:shadow-[0_8px_18px_-8px_rgba(0,0,0,0.28)]"
        >
          <div className="min-h-0 flex-1">{item.content}</div>
          <p className="text-caption text-foreground-secondary border-border-subtle truncate border-t px-1.5 py-1 text-center">
            {t(`mockups.design.items.${item.id}`)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
