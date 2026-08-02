export interface AdvisorAccent {
  base: string;
  from: string;
  to: string;
}

/** Neutral default used before a need is selected — the rest of the
 * journey (progress, pathway, timeline, result) inherits whichever need's
 * accent the visitor picks in Step 1. */
const DEFAULT_ACCENT: AdvisorAccent = { base: "#22D3EE", from: "#0891B2", to: "#22D3EE" };

const NEED_ACCENTS: Record<string, AdvisorAccent> = {
  "business-website": { base: "#3B82F6", from: "#2563EB", to: "#60A5FA" },
  ecommerce: { base: "#06B6D4", from: "#0891B2", to: "#22D3EE" },
  "hospital-software": { base: "#EF4444", from: "#DC2626", to: "#F87171" },
  "school-erp": { base: "#10B981", from: "#059669", to: "#34D399" },
  "saas-product": { base: "#8B5CF6", from: "#7C3AED", to: "#A78BFA" },
  crm: { base: "#F59E0B", from: "#D97706", to: "#FBBF24" },
  branding: { base: "#EC4899", from: "#DB2777", to: "#F472B6" },
  "digital-marketing": { base: "#14B8A6", from: "#0F766E", to: "#2DD4BF" },
};

export function getNeedAccent(needId?: string): AdvisorAccent {
  if (!needId) return DEFAULT_ACCENT;
  return NEED_ACCENTS[needId] ?? DEFAULT_ACCENT;
}

/** Step 2 (goal) options each carry their own accent, unlike Steps 1 and 3
 * which share the one accent chosen back in Step 1. */
const GOAL_ACCENTS: Record<string, AdvisorAccent> = {
  "generate-leads": { base: "#3B82F6", from: "#2563EB", to: "#60A5FA" },
  "sell-online": { base: "#06B6D4", from: "#0891B2", to: "#22D3EE" },
  "automate-operations": { base: "#8B5CF6", from: "#7C3AED", to: "#A78BFA" },
  "launch-mvp": { base: "#F97316", from: "#EA580C", to: "#FB923C" },
  "improve-brand": { base: "#EC4899", from: "#DB2777", to: "#F472B6" },
  "manage-customers": { base: "#10B981", from: "#059669", to: "#34D399" },
  "improve-seo": { base: "#22C55E", from: "#16A34A", to: "#4ADE80" },
  "scale-product": { base: "#6366F1", from: "#4F46E5", to: "#818CF8" },
};

export function getGoalAccent(goalId?: string): AdvisorAccent {
  if (!goalId) return DEFAULT_ACCENT;
  return GOAL_ACCENTS[goalId] ?? DEFAULT_ACCENT;
}

/** Step 3 (stage) options each carry their own accent, matching the
 * per-option treatment used for Step 2's goals. */
const STAGE_ACCENTS: Record<string, AdvisorAccent> = {
  idea: { base: "#3B82F6", from: "#2563EB", to: "#60A5FA" },
  starting: { base: "#06B6D4", from: "#0891B2", to: "#22D3EE" },
  growing: { base: "#8B5CF6", from: "#7C3AED", to: "#A78BFA" },
  scaling: { base: "#F97316", from: "#EA580C", to: "#FB923C" },
  established: { base: "#10B981", from: "#059669", to: "#34D399" },
};

export function getStageAccent(stageId?: string): AdvisorAccent {
  if (!stageId) return DEFAULT_ACCENT;
  return STAGE_ACCENTS[stageId] ?? DEFAULT_ACCENT;
}

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
