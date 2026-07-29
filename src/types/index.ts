/**
 * DoubleShift-AI Architecture Types
 * Core domain contracts, theme definitions, and layout configurations.
 */

export type Theme = 'light' | 'dark' | 'system';

export interface RouteConfig {
  path: string;
  name: string;
  description: string;
  iconName: string;
  badge?: string;
  section: 'engine' | 'analysis' | 'personalization' | 'system';
}

export interface UserPreferences {
  theme: Theme;
  sidebarCollapsed: boolean;
  compactView: boolean;
  aiSensitivity: 'strict' | 'balanced' | 'exploratory';
  autoEvaluateLinks: boolean;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'caution';

export interface DecisionMetric {
  id: string;
  label: string;
  score: number; // 0 to 100
  weight: number;
  verdict: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'critical';
}

export interface QuickAction {
  id: string;
  label: string;
  shortcut?: string;
  icon: string;
  action: () => void;
}
