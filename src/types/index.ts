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

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  tags: string[];
  badge?: string;
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  browsingHistory: string[];
  purchaseHistory: string[];
  wishlist: string[];
  ratings: Record<string, number>;
}

export interface Recommendation {
  product: Product;
  score: number;
  reason: string;
  matchType: 'collaborative' | 'content-based' | 'trending' | 'similar';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductReview {
  id: string;
  productId?: string;
  productName: string;
  author: string;
  avatar?: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  pros?: string[];
  cons?: string[];
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
