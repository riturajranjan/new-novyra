"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import type { Industry } from "@/content/industries";

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: 0.05 + i * 0.05, ease: easePremium },
});

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full min-h-0 flex-col gap-4 p-4 sm:p-5">{children}</div>;
}

function Row({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-caption text-foreground-secondary w-20 shrink-0 truncate">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          transition={{ duration: 0.5, ease: easePremium }}
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

/** Education — an academic calendar strip + an attendance/admissions
 * pairing, the two things a school's digital system actually tracks. */
function EducationVisual({ stroke, tint }: { stroke: string; tint: (p: number) => string }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <Frame>
      <div className="flex items-center gap-1.5">
        {days.map((d, i) => (
          <motion.div
            key={i}
            {...stagger(i)}
            className="flex h-9 flex-1 items-center justify-center rounded-md text-[11px] font-semibold"
            style={{ backgroundColor: i === 2 ? tint(20) : tint(8), color: i === 2 ? stroke : "rgba(255,255,255,0.4)" }}
          >
            {d}
          </motion.div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="border-border-subtle flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3">
          <span className="text-title font-bold" style={{ color: stroke }}>94%</span>
          <span className="text-caption text-foreground-secondary">Attendance</span>
        </div>
        <div className="border-border-subtle flex flex-col justify-center gap-2 rounded-xl border p-3">
          <Row label="Applied" value={100} accent={tint(70)} />
          <Row label="Admitted" value={62} accent={stroke} />
        </div>
      </div>
    </Frame>
  );
}

/** Healthcare — an appointment timeline + a lightweight vitals trace,
 * standing in for the two audiences a hospital platform serves: patients
 * booking, and staff monitoring. */
function HealthcareVisual({ stroke, tint }: { stroke: string; tint: (p: number) => string }) {
  const slots = ["9:00", "9:30", "10:00", "10:30", "11:00"];
  return (
    <Frame>
      <div className="flex flex-col gap-1.5">
        {slots.map((s, i) => (
          <motion.div key={s} {...stagger(i)} className="flex items-center gap-3">
            <span className="text-caption text-foreground-secondary w-11 shrink-0">{s}</span>
            <div
              className="h-6 flex-1 rounded-md"
              style={{ backgroundColor: i === 1 || i === 3 ? tint(16) : "transparent", border: i === 1 || i === 3 ? `1px solid ${tint(35)}` : "1px dashed rgba(255,255,255,0.08)" }}
            />
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 200 40" className="h-10 w-full" aria-hidden>
        <motion.path
          d="M0,20 L30,20 L40,6 L52,34 L64,20 L100,20 L112,10 L124,30 L136,20 L200,20"
          fill="none"
          stroke={stroke}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
    </Frame>
  );
}

/** Retail — a product grid plus a linear order-flow stepper (cart →
 * payment → shipped), the shape of a commerce operation rather than a
 * generic admin panel. */
function RetailVisual({ stroke, tint }: { stroke: string; tint: (p: number) => string }) {
  const stages = ["Cart", "Payment", "Shipped"];
  return (
    <Frame>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            {...stagger(i)}
            className="aspect-square rounded-lg"
            style={{ backgroundColor: tint(10 + (i % 3) * 8) }}
          />
        ))}
      </div>
      <div className="flex flex-1 items-center gap-2">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                style={{ backgroundColor: i <= 1 ? stroke : tint(16), color: i <= 1 ? "#050816" : stroke }}
              >
                {i + 1}
              </span>
              <span className="text-caption text-foreground-secondary">{s}</span>
            </div>
            {i < stages.length - 1 ? <div className="h-px flex-1" style={{ backgroundColor: i === 0 ? stroke : "rgba(255,255,255,0.1)" }} /> : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** Travel — a vertical itinerary (depart → stopover → arrive) beside a
 * curved route with a moving dot, the shape of a booking journey. */
function TravelVisual({ stroke, tint }: { stroke: string; tint: (p: number) => string }) {
  const stops = ["Depart", "Stopover", "Arrive"];
  return (
    <Frame>
      <svg viewBox="0 0 200 50" className="h-12 w-full" aria-hidden>
        <path d="M10,40 Q100,-10 190,40" fill="none" stroke={tint(30)} strokeWidth={1} strokeDasharray="3 4" />
        <motion.circle
          r={2.6}
          fill={stroke}
          initial={false}
          animate={{ cx: [10, 100, 190], cy: [40, 15, 40] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <div className="relative flex flex-1 flex-col justify-between pl-5">
        <span aria-hidden className="absolute top-1 bottom-1 left-1.5 w-px bg-white/10" />
        {stops.map((s, i) => (
          <motion.div key={s} {...stagger(i)} className="relative flex items-center gap-2.5">
            <span aria-hidden className="absolute -left-3.5 h-2 w-2 rounded-full" style={{ backgroundColor: i === 1 ? stroke : "rgba(255,255,255,0.25)" }} />
            <span className="text-body-sm text-foreground font-medium">{s}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/** Finance — a transaction ledger with amount bars beside a compact
 * approval-workflow chip trail, the shape of secure operational finance. */
function FinanceVisual({ stroke, tint }: { stroke: string; tint: (p: number) => string }) {
  const rows = [62, 88, 40, 74];
  const steps = ["Submitted", "Reviewed", "Approved"];
  return (
    <Frame>
      <div className="flex flex-col gap-2">
        {rows.map((v, i) => (
          <motion.div key={i} {...stagger(i)}>
            <Row label={`TXN-0${i + 1}`} value={v} accent={i === 1 ? stroke : tint(55)} />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className="text-caption rounded-full px-2.5 py-1 font-semibold"
              style={{ backgroundColor: i < 2 ? tint(16) : "transparent", border: `1px solid ${i < 2 ? tint(40) : "rgba(255,255,255,0.1)"}`, color: i < 2 ? stroke : "rgba(255,255,255,0.4)" }}
            >
              {s}
            </span>
            {i < steps.length - 1 ? <span className="text-white/20">→</span> : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** Professional Services — a three-column client pipeline (lead →
 * scheduled → delivered) beside document rows, the shape of a service
 * firm's operational workflow. */
function ProfessionalVisual({ stroke, tint }: { stroke: string; tint: (p: number) => string }) {
  const columns = [
    { label: "Lead", count: 5 },
    { label: "Scheduled", count: 3 },
    { label: "Delivered", count: 2 },
  ];
  return (
    <Frame>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {columns.map((col, ci) => (
          <div key={col.label} className="flex flex-col gap-1.5">
            <span className="text-caption text-foreground-secondary text-center font-medium">{col.label}</span>
            <div className="flex flex-1 flex-col gap-1.5">
              {Array.from({ length: col.count }).map((_, i) => (
                <motion.div
                  key={i}
                  {...stagger(ci + i)}
                  className="h-4 rounded"
                  style={{ backgroundColor: tint(10 + ci * 6) }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {[80, 55].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: stroke }} />
            <span className="h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </Frame>
  );
}

const VISUALS: Record<string, typeof EducationVisual> = {
  education: EducationVisual,
  healthcare: HealthcareVisual,
  "retail-ecommerce": RetailVisual,
  "travel-hospitality": TravelVisual,
  finance: FinanceVisual,
  "professional-services": ProfessionalVisual,
};

/** The Explorer's right-side canvas visual — a genuinely distinct
 * composition per industry (never one dashboard recolored), wrapped in a
 * shared honest "illustrative" chrome. */
export function IndustryVisual({ industry }: { industry: Industry }) {
  const t = useTranslations("industries");
  const stroke = accentStroke[industry.accent];
  const tint = (p: number) => accentTint(industry.accent, p);
  const Visual = VISUALS[industry.id] ?? EducationVisual;

  return (
    <div className="border-border-subtle bg-surface/70 relative flex h-full w-full flex-col overflow-hidden rounded-2xl border backdrop-blur-md">
      <div className="border-border-subtle flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">
          {t(`items.${industry.id}.title`)}
        </span>
        <span className="text-[10px] font-medium tracking-[0.14em] text-white/30 uppercase">
          {t("visualBadge")}
        </span>
      </div>
      <div className="min-h-0 flex-1">
        <Visual stroke={stroke} tint={tint} />
      </div>
    </div>
  );
}
