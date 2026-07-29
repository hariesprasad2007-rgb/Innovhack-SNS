import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onWishlistToggle?: (id: string) => void;
  animationDelay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted = false,
  onWishlistToggle,
  animationDelay = 0,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="glass-card animate-fade-up"
      style={{
        animationDelay: `${animationDelay}ms`,
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Image container */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
        <div
          style={{
            width: '100%',
            height: 200,
            background: 'linear-gradient(135deg, #1a1f3a, #0d1230)',
            display: imgLoaded ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.3)', borderTopColor: '#6366f1', animation: 'spin-slow 1s linear infinite' }} />
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          style={{ display: imgLoaded ? 'block' : 'none', height: 200 }}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Overlay actions */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(5,8,20,0.7), transparent)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 12,
            gap: 8,
          }}
          className="card-overlay"
        >
          <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }}>
            <Eye size={13} /> Quick View
          </button>
        </div>

        {/* Badges row */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {product.badge && (
            <span className={`badge ${product.badge.includes('OFF') ? 'badge-rose' : product.badge === 'New' ? 'badge-emerald' : 'badge-amber'}`}>
              {product.badge}
            </span>
          )}
          {!product.badge && <span />}
          <button
            className={`btn-icon ${isWishlisted ? 'active' : ''}`}
            style={{ backdropFilter: 'blur(8px)', background: 'rgba(5,8,20,0.6)' }}
            onClick={() => onWishlistToggle?.(product.id)}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {!product.inStock && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(5,8,20,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <span className="badge badge-rose" style={{ fontSize: 13 }}>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: 6 }}>{product.category}</span>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              marginTop: 6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
              }}
            >
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          {discount && (
            <span style={{ fontSize: 12, color: 'var(--accent-emerald)', fontWeight: 700 }}>
              {discount}% off
            </span>
          )}
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: 'auto', opacity: !product.inStock ? 0.4 : 1 }}
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={14} />
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
