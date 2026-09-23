import {
  Award,
  BookOpen,
  Bot,
  Code2,
  Compass,
  Cpu,
  FileCode2,
  Globe,
  GraduationCap,
  Layers,
  Layout,
  Palette,
  Rocket,
  Server,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  Layout,
  Sparkles: Bot,
  TrendingUp,
  Target,
};

export const skillToolIcons: Record<string, LucideIcon> = {
  Bot,
  Sparkles,
  Cpu,
  Code2,
  Globe,
  Palette,
  Server,
  Target,
  Share2,
  Layers,
};

export const processIcons: Record<string, LucideIcon> = {
  Compass,
  FileCode2,
  Palette,
  Bot,
  Rocket,
};

export const educationIcons: Record<string, LucideIcon> = {
  GraduationCap,
  Cpu,
  BookOpen,
};

export const heroStatIcons: Record<string, LucideIcon> = {
  Award,
  TrendingUp,
  Zap,
};

export function resolveIcon(
  map: Record<string, LucideIcon>,
  name: string,
  fallback: LucideIcon,
): LucideIcon {
  return map[name] ?? fallback;
}
