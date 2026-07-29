import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind CSS classes safely with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats currency values consistently
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats confidence scores with semantic labels and color classes
 */
export function getConfidenceBadgeConfig(score: number) {
  if (score >= 85) {
    return {
      label: 'High Confidence Alignment',
      shortLabel: 'High Alignment',
      variant: 'emerald' as const,
      bgClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
      icon: 'CheckCircle2',
    };
  }
  if (score >= 65) {
    return {
      label: 'Moderate Intent Fit',
      shortLabel: 'Moderate Fit',
      variant: 'amber' as const,
      bgClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
      icon: 'AlertCircle',
    };
  }
  return {
    label: 'High Tradeoff Friction',
    shortLabel: 'Friction Alert',
    variant: 'rose' as const,
    bgClass: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
    icon: 'XCircle',
  };
}

/**
 * Safely parse JSON from localStorage with fallback
 */
export function getLocalStorage<T>(key: string, fallback: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely set JSON to localStorage
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing key "${key}" to localStorage:`, error);
  }
}
