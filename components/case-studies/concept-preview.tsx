"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { accentTint } from "@/lib/accent";
import type { AccentColor } from "@/content/hero-screens";

const bars = [40, 65, 50, 80, 60, 90, 70];
const listRows = [70, 50, 60, 45];

interface ConceptPreviewProps {
  accent: AccentColor;
}

/** An abstract dashboard mockup — browser chrome, a skeleton list, and an
 * animated bar chart — standing in for a product preview. Deliberately not
 * a real screenshot, since this represents a concept build, not a
 * deployed product. The header badge and its data are both marked
 * "illustrative" with no pulsing "live" indicator dot — a pulsing green
 * dot is a near-universal "this is connected/live" signal in product UI,
 * and this preview shows neither a real product nor real data. */
export function ConceptPreview({ accent }: ConceptPreviewProps) {
  const t = useTranslations("caseStudies.preview");
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-border-subtle bg-surface/70 relative flex h-full w-full flex-col overflow-hidden rounded-2xl border backdrop-blur-md">
      <div className="border-border-subtle flex items-center gap-1.5 border-b px-4 py-2.5">
        <span className="bg-foreground/15 h-2 w-2 rounded-full" />
        <span className="bg-foreground/15 h-2 w-2 rounded-full" />
        <span className="bg-foreground/15 h-2 w-2 rounded-full" />
        <span className="bg-foreground/5 text-foreground-secondary ml-2 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
          {t("label")}
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-3 p-4">
        <div className="border-border-subtle col-span-1 flex flex-col justify-center gap-2.5 rounded-xl border p-3">
          {listRows.map((w, i) => (
            <span key={i} className="bg-foreground/10 h-2 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="border-border-subtle col-span-2 rounded-xl border p-3" style={{ backgroundColor: accentTint(accent, 8) }}>
          <div className="flex h-full items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true, margin: "150px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-1 rounded-t-sm"
                style={{ backgroundColor: accentTint(accent, i % 2 ? 60 : 32) }}
              />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong shadow-card absolute right-4 bottom-4 rounded-xl px-3 py-2"
      >
        <span className="text-caption text-foreground font-semibold">{t("illustrativeData")}</span>
      </motion.div>
    </div>
  );
}
