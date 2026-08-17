"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { industries } from "@/content/industries";
import { accentStroke } from "@/lib/accent";

const RADIUS = 42;
/** The CTA evolves the Hero's "known industries" network by one open
 * slot — an unfilled node reserved for whatever the visitor's own
 * business is, positioned last in the arc so the six real industries
 * still read as a complete, unmodified set. */
const OPEN_SLOT_INDEX = 6;
const TOTAL_SLOTS = industries.length + 1;

function nodePosition(index: number, total: number) {
  const angle = (-90 + (index * 360) / total) * (Math.PI / 180);
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) * 0.55 + 8 };
}

/** The Final CTA's backdrop — a quiet echo of the hero's Industry
 * Ecosystem, evolved rather than repeated: the same six industries plus
 * one open, glowing "Your Business" slot, flattened into a wide
 * low-contrast arc that sits *behind* the CTA copy and pulses instead of
 * inviting interaction. Hero says "these are the industries we work
 * with"; this says "yours can join the network too." */
export function IndustryConstellationBackground() {
  const t = useTranslations("industries.cta");
  const reduceMotion = useReducedMotion();
  const center = { x: 50, y: 46 };
  const openSlot = nodePosition(OPEN_SLOT_INDEX, TOTAL_SLOTS);

  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-70">
      {industries.map((industry, i) => {
        const p = nodePosition(i, TOTAL_SLOTS);
        return (
          <motion.line
            key={industry.id}
            x1={center.x}
            y1={center.y}
            x2={p.x}
            y2={p.y}
            stroke={accentStroke[industry.accent]}
            strokeWidth={0.25}
            strokeLinecap="round"
            initial={reduceMotion ? { opacity: 0.14 } : { opacity: 0.06 }}
            animate={reduceMotion ? undefined : { opacity: [0.06, 0.22, 0.06] }}
            transition={reduceMotion ? undefined : { duration: 6 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        );
      })}
      {industries.map((industry, i) => {
        const p = nodePosition(i, TOTAL_SLOTS);
        return (
          <motion.circle
            key={industry.id}
            cx={p.x}
            cy={p.y}
            r={0.6}
            fill={accentStroke[industry.accent]}
            initial={{ opacity: 0.3 }}
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
            transition={reduceMotion ? undefined : { duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        );
      })}

      {/* The open slot — brighter, dashed, and labeled, so it reads as
          "reserved" rather than just a seventh identical dot. */}
      <motion.line
        x1={center.x}
        y1={center.y}
        x2={openSlot.x}
        y2={openSlot.y}
        stroke="white"
        strokeWidth={0.3}
        strokeDasharray="1.2 1"
        initial={{ opacity: 0.18 }}
        animate={reduceMotion ? undefined : { opacity: [0.18, 0.4, 0.18] }}
        transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={openSlot.x}
        cy={openSlot.y}
        r={1.4}
        fill="none"
        stroke="white"
        strokeWidth={0.3}
        strokeDasharray="1 1"
        initial={{ opacity: 0.4 }}
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.85, 0.4], scale: [1, 1.15, 1] }}
        transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${openSlot.x}px ${openSlot.y}px` }}
      />
      <text
        x={openSlot.x}
        y={openSlot.y - 3}
        textAnchor="middle"
        fontSize={2.1}
        fontWeight={600}
        letterSpacing={0.3}
        fill="white"
        opacity={0.5}
        style={{ textTransform: "uppercase" }}
      >
        {t("openSlotLabel")}
      </text>

      <circle cx={center.x} cy={center.y} r={1} fill="white" opacity={0.5} />
    </svg>
  );
}
