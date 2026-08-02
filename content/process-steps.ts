import type { LucideIcon } from "lucide-react";
import { Bug, Code2, MessageCircleQuestion, PenTool, Rocket, Route } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

export interface ProcessStep {
  id: string;
  number: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** Structural data only — title, description, and deliverables all live in
 * messages/{locale}/process.json, keyed by `id`, so this file doesn't
 * change per locale. `number` is a display numeral (e.g. "01"), not
 * language text, so it stays here. */
export const processSteps: ProcessStep[] = [
  { id: "discovery", number: "01", icon: MessageCircleQuestion, accent: "blue" },
  { id: "strategy", number: "02", icon: Route, accent: "cyan" },
  { id: "design", number: "03", icon: PenTool, accent: "purple" },
  { id: "development", number: "04", icon: Code2, accent: "pink" },
  { id: "testing", number: "05", icon: Bug, accent: "amber" },
  { id: "launch", number: "06", icon: Rocket, accent: "emerald" },
];
