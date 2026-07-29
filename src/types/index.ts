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
