"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { connectionNodes } from "@/content/contact-page";
import { accentStroke, accentTint } from "@/lib/accent";

/** The Contact hero's signature visual — "Idea → Novyra → Digital
 * Product": four floating nodes (Idea, Design, Build, Launch) connected
 * to a central, gently-breathing Novyra mark by thin orbital curves with
 * slow-traveling signals. Not a map, not a browser mockup — a compact
 * pseudo-3D system diagram that reads as "your idea enters here." */
export function ContactConnectionVisual() {
  const t = useTranslations("contact.hero.visual");
  const reduceMotion = useReducedMotion();
  const center = { x: 50, y: 48 };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-100 md:max-w-110 lg:max-w-120">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[6%] left-[6%] h-40 w-40 rounded-full opacity-[0.15] blur-[90px]" />
        <div className="bg-brand-pink absolute right-[2%] bottom-[8%] h-44 w-44 rounded-full opacity-[0.13] blur-[95px]" />
      </div>

      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <circle cx={center.x} cy={center.y} r={38} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={0.3} strokeDasharray="0.5 3.5" />
      </motion.svg>

      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        {connectionNodes.map((node, i) => {
          const nx = parseFloat(node.left);
          const ny = parseFloat(node.top);
          const mx = (center.x + nx) / 2 + (i % 2 === 0 ? -5 : 5);
          const my = (center.y + ny) / 2 + (i % 2 === 0 ? 5 : -5);
          const d = `M${center.x},${center.y} Q${mx},${my} ${nx},${ny}`;
          return (
            <g key={node.id}>
              <path d={d} fill="none" stroke={accentStroke[node.accent]} strokeWidth={0.35} strokeLinecap="round" opacity={0.3} />
              {!reduceMotion ? (
                <motion.circle
                  r={0.7}
                  fill={accentStroke[node.accent]}
                  initial={false}
                  animate={{ cx: [center.x, mx, nx], cy: [center.y, my, ny], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.7 }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {connectionNodes.map((node, i) => {
        const Icon = node.icon;
        const stroke = accentStroke[node.accent];
        return (
          <motion.div
            key={node.id}
            className="glass absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl px-3.5 py-3"
            style={{ top: node.top, left: node.left }}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={
              reduceMotion
                ? { duration: 0.3 }
                : { opacity: { duration: 0.35, delay: 0.4 + i * 0.08 }, scale: { duration: 0.35, delay: 0.4 + i * 0.08 }, y: { duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 } }
            }
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: accentTint(node.accent, 18) }}>
              <Icon className="h-4 w-4" style={{ color: stroke }} aria-hidden />
            </span>
            <span className="text-body-sm text-foreground font-medium whitespace-nowrap">{t(`nodes.${node.id}`)}</span>
          </motion.div>
        );
      })}

      <motion.div
        className="glass-strong shadow-card-hover absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl px-7 py-6 text-center"
        style={{ top: `${center.y}%`, left: `${center.x}%` }}
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -4, 0], boxShadow: ["0 0 0px 0px rgba(124,92,255,0)", "0 0 30px 4px rgba(124,92,255,0.2)", "0 0 0px 0px rgba(124,92,255,0)"] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[26px] leading-tight font-semibold tracking-[-0.03em] text-gradient-brand">{t("centerLabel")}</span>
      </motion.div>
    </div>
  );
}
