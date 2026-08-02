"use client";

import { useState } from "react";
import { ChevronDown, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { compareRows, compareGroups, pricingPlans, type CompareValue } from "@/content/pricing";
import { accentStroke } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Translate = ReturnType<typeof useTranslations>;

function CheckGlyph({ color }: { color: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="mx-auto h-5 w-5"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/** String-valued cells are translated via `compareRows.<rowId>.values.<planId>`
 * — the raw `value` held in content/pricing.ts is never rendered directly,
 * only used to tell a translatable cell apart from a plain boolean one. */
function Cell({ value, color, rowId, planId, t }: { value: CompareValue; color: string; rowId: string; planId: string; t: Translate }) {
  if (value === true) return <CheckGlyph color={color} />;
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-white/25" aria-hidden />;
  return (
    <span className="text-caption text-body-sm font-medium" style={{ color }}>
      {t(`compareRows.${rowId}.values.${planId}`)}
    </span>
  );
}

function rowsForGroup(rowIds: string[]) {
  return rowIds.map((id) => compareRows.find((r) => r.id === id)).filter((r): r is (typeof compareRows)[number] => Boolean(r));
}

/** Desktop-only (md+) grouped comparison table. Each of the five categories
 * from content/pricing.ts's `compareGroups` renders as its own collapsible
 * section within one shared table, so the sticky feature column and row
 * striping stay continuous instead of splitting into five separate tables.
 * Groups start open — the outer "Compare All Plans" panel is already one
 * deliberate click to get here, so a second layer of default-collapsed
 * sections would just add friction — but each stays individually
 * collapsible for anyone who wants to tuck a section away. */
function DesktopGroupedTable() {
  const t = useTranslations("pricing");
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(compareGroups.map((g) => g.id)));

  function toggleGroup(id: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div
      className="hidden overflow-hidden rounded-hero border border-white/8 shadow-card md:block"
      style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(13,12,20,0.97) 55%)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-body-sm sticky left-0 z-10 bg-[#0d0c14] p-4 text-left font-semibold text-white/55">
                {t("comparePanel.featureColumnHeader")}
              </th>
              {pricingPlans.map((plan) => (
                <th key={plan.id} className="text-body-sm p-4 text-center font-semibold text-white">
                  {t(`plans.${plan.id}.name`)}
                </th>
              ))}
            </tr>
          </thead>
          {compareGroups.map((group) => {
            const isOpen = openGroups.has(group.id);
            const rows = rowsForGroup(group.rowIds);
            return (
              <tbody key={group.id}>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <td colSpan={pricingPlans.length + 1} className="p-0">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      aria-expanded={isOpen}
                      className="text-caption flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left font-semibold tracking-wide text-white/55 uppercase"
                    >
                      {t(`compareGroups.${group.id}.title`)}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-fast", isOpen && "rotate-180")} aria-hidden />
                    </button>
                  </td>
                </tr>
                {isOpen
                  ? rows.map((row, i) => (
                      <tr
                        key={row.id}
                        className={cn(
                          "h-12 border-b border-white/[0.06] transition-colors duration-fast last:border-b-0 hover:bg-white/[0.04]",
                          i % 2 === 1 && "bg-white/[0.015]",
                        )}
                      >
                        <td className="text-body-sm sticky left-0 z-10 bg-[#0d0c14] p-4 font-medium text-white">
                          {t(`compareRows.${row.id}.label`)}
                        </td>
                        {pricingPlans.map((plan) => (
                          <td key={plan.id} className="p-4 text-center">
                            <Cell value={row.values[plan.id]} color={accentStroke[plan.accent]} rowId={row.id} planId={plan.id} t={t} />
                          </td>
                        ))}
                      </tr>
                    ))
                  : null}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

/** Mobile (below md): category accordions instead of a squeezed table or a
 * per-plan repeat — each open category lists its rows with all four plans'
 * values side by side in a small wrapping grid, so there's never horizontal
 * body scrolling. */
function MobileGroupedAccordion() {
  const t = useTranslations("pricing");
  const [openId, setOpenId] = useState<string | null>(compareGroups[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-2 md:hidden">
      {compareGroups.map((group) => {
        const isOpen = openId === group.id;
        const rows = rowsForGroup(group.rowIds);
        return (
          <div key={group.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : group.id)}
              aria-expanded={isOpen}
              className="flex min-h-13 w-full items-center justify-between px-4 py-3"
            >
              <span className="text-body-sm font-semibold text-white">{t(`compareGroups.${group.id}.title`)}</span>
              <ChevronDown className={cn("h-4 w-4 text-white/55 transition-transform duration-fast", isOpen && "rotate-180")} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: easePremium }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-3">
                    {rows.map((row) => (
                      <div key={row.id} className="flex flex-col gap-1.5">
                        <span className="text-body-sm font-medium text-white">{t(`compareRows.${row.id}.label`)}</span>
                        <div className="grid grid-cols-2 gap-2">
                          {pricingPlans.map((plan) => (
                            <div
                              key={plan.id}
                              className="flex items-center justify-between gap-2 rounded-lg border border-white/10 px-2.5 py-1.5"
                            >
                              <span className="text-caption truncate text-white/55">{t(`plans.${plan.id}.name`)}</span>
                              <Cell value={row.values[plan.id]} color={accentStroke[plan.accent]} rowId={row.id} planId={plan.id} t={t} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function ComparisonTable() {
  return (
    <>
      <MobileGroupedAccordion />
      <DesktopGroupedTable />
    </>
  );
}
