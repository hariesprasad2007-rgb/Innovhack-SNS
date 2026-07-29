import { RouteConfig } from '../types';

export const APP_NAME = 'DoubleShift-AI';

export const ROUTES: RouteConfig[] = [
  {
    path: '/',
    name: 'Decision Canvas',
    description: 'Synthesize multi-factor buying intents into actionable confidence scores.',
    iconName: 'Compass',
    section: 'engine',
  },
  {
    path: '/recommendations',
    name: 'Editorial Recommendations',
    description: 'In-depth editorial dossiers explaining the why, decision reasoning, and situational alternatives.',
    iconName: 'BookOpen',
    badge: 'Editorial',
    section: 'analysis',
  },
  {
    path: '/tradeoffs',
    name: 'Comparison Studio',
    description: 'Interactive side-by-side decision studio, tradeoff vectors, confidence meters, and AI verdicts.',
    iconName: 'GitCompare',
    badge: 'Studio',
    section: 'analysis',
  },
  {
    path: '/forensics',
    name: 'Product Forensics',
    description: 'Deep architectural teardown, hidden failure modes, and long-term durability.',
    iconName: 'Microscope',
    section: 'analysis',
  },
  {
    path: '/vault',
    name: 'Decision Vault & Dashboard',
    description: 'Immutable ledger of past buying decisions, post-purchase sentiment, and regret auditing.',
    iconName: 'Archive',
    badge: 'Dashboard',
    section: 'engine',
  },
  {
    path: '/personas',
    name: 'Persona Studio',
    description: 'Calibrate custom evaluator weights, priority biases, and budget constraints.',
    iconName: 'Sliders',
    section: 'personalization',
  },
  {
    path: '/settings',
    name: 'Integrity & Settings',
    description: 'Configure telemetry privacy, model sensitivity, and data sources.',
    iconName: 'Settings',
    section: 'system',
  },
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const DESIGN_TOKENS = {
  radius: {
    none: '0px',
    sm: '6px',
    md: '12px',
    lg: '18px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
    elevated: '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
  },
} as const;
