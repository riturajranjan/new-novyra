import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Brain,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Megaphone,
  Stethoscope,
  Users,
  Globe,
} from "lucide-react";

export type ScreenLayout = "content" | "dashboard" | "chat" | "kanban" | "chart" | "grid";
export type AccentColor = "blue" | "purple" | "cyan" | "pink" | "emerald" | "amber";

export interface HeroScreen {
  id: string;
  layout: ScreenLayout;
  icon: LucideIcon;
  accent: AccentColor;
}

/** Abstract UI states the central browser mockup cycles through, in a fixed
 * loop: Business Website → Hospital Website → Hospital ERP Dashboard →
 * School ERP → CRM Dashboard → AI Assistant → Digital Marketing Analytics →
 * Business Analytics → Portfolio Website → repeat. No real copy — these
 * render as geometric skeleton shapes, never readable text. */
export const heroScreens: HeroScreen[] = [
  { id: "business-website", layout: "content", icon: Globe, accent: "blue" },
  { id: "hospital-website", layout: "content", icon: HeartPulse, accent: "cyan" },
  { id: "hospital-erp-dashboard", layout: "dashboard", icon: Stethoscope, accent: "cyan" },
  { id: "school-erp", layout: "dashboard", icon: GraduationCap, accent: "purple" },
  { id: "crm-dashboard", layout: "kanban", icon: Users, accent: "pink" },
  { id: "ai-assistant", layout: "chat", icon: Brain, accent: "purple" },
  { id: "marketing-analytics", layout: "chart", icon: Megaphone, accent: "blue" },
  { id: "business-analytics", layout: "dashboard", icon: BarChart3, accent: "emerald" },
  { id: "portfolio-website", layout: "grid", icon: Briefcase, accent: "pink" },
];
