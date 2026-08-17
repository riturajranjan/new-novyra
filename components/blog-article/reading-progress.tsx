"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

interface ReadingProgressProps {
  targetId: string;
  minutes: number;
}

/** A thin, sticky readout — not decorative motion but a direct scroll
 * position readout (same reasoning as the sitewide ScrollProgress bar),
 * so it stays a plain instant value rather than something gated behind
 * prefers-reduced-motion. Progress is measured against the real article
 * content element (`targetId`), not the whole page, so header/footer
 * height don't skew the percentage. */
export function ReadingProgress({ targetId, minutes }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    function measure() {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    }

    function onScroll() {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        measure();
        frame.current = null;
      });
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [targetId]);

  const t = useTranslations("blogArticle");

  return (
    <div className="sticky top-[88px] z-40 sm:top-24">
      <div className="border-b border-white/[0.06]" style={{ backgroundColor: "rgba(5,8,20,0.72)", backdropFilter: "blur(10px)" }}>
        <Container size="wide" className="flex items-center justify-between gap-3 py-1.5">
          <span className="text-[10px] font-mono font-medium tracking-[0.12em] text-white/35 uppercase tabular-nums">
            {t("readingProgress.label")} · {Math.round(progress)}%
          </span>
          <span className="text-[10px] font-mono font-medium tracking-[0.12em] text-white/35 uppercase">
            {t("readingProgress.minRead", { count: minutes })}
          </span>
        </Container>
        <div className="h-px w-full bg-white/[0.06]">
          <div
            className="h-full"
            style={{
              width: `${progress}%`,
              backgroundImage: "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-purple), var(--color-brand-pink))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
