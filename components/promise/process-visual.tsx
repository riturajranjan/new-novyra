"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const messageRows = [
  { from: "team", width: 62 },
  { from: "you", width: 44 },
  { from: "team", width: 74 },
  { from: "you", width: 36 },
];

const demoDayIndex = 2;

/** An abstract "how we work" mockup — a message thread and a weekly-demo
 * calendar strip, both built from skeleton shapes rather than real chat
 * content or names. Standing in for a communication rhythm, not a specific
 * recorded conversation. */
export function ProcessVisual() {
  const t = useTranslations("promise.processVisual");
  const weekDays = t.raw("weekDays") as string[];
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-border-subtle bg-surface/70 relative flex h-full w-full flex-col overflow-hidden rounded-2xl border backdrop-blur-md">
      <div className="border-border-subtle flex items-center gap-1.5 border-b px-4 py-2.5">
        <span className="bg-foreground/15 h-2 w-2 rounded-full" />
        <span className="bg-foreground/15 h-2 w-2 rounded-full" />
        <span className="bg-foreground/15 h-2 w-2 rounded-full" />
        <span className="bg-foreground/5 text-foreground-secondary ml-2 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
          <motion.span
            aria-hidden
            className="bg-brand-emerald h-1.5 w-1.5 rounded-full"
            animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
            transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {t("thisWeek")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="border-border-subtle flex flex-1 flex-col justify-center gap-2.5 rounded-xl border p-4">
          {messageRows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: row.from === "you" ? 12 : -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex ${row.from === "you" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`h-6 rounded-full ${row.from === "you" ? "bg-brand-blue/25" : "bg-foreground/10"}`}
                style={{ width: `${row.width}%` }}
              />
            </motion.div>
          ))}
        </div>

        <div className="border-border-subtle bg-brand-emerald/6 grid grid-cols-7 gap-1.5 rounded-xl border p-3">
          {weekDays.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-caption text-foreground-secondary">{day}</span>
              <motion.span
                animate={
                  reduceMotion || i !== demoDayIndex
                    ? undefined
                    : { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className={`h-6 w-6 rounded-full ${i === demoDayIndex ? "bg-brand-emerald" : "bg-foreground/10"}`}
              />
            </div>
          ))}
        </div>
        <p className="text-caption text-foreground-secondary text-center">{t("recurringDemo")}</p>
      </div>
    </div>
  );
}
