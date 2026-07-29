import React, { useState } from 'react';
import { Heart, Trash2, ShoppingCart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, currentUser } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<string[]>(currentUser.wishlist);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleRemove = (id: string) => {
    setWishlist((prev) => prev.filter((w) => w !== id));
  };

  const handleClearAll = () => {
    setWishlist([]);
  };

  const totalValue = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="page-wrapper">
      {/* Background orb */}
      <div className="orb orb-rose" style={{
        width: 400, height: 400, top: -100, right: -100, opacity: 0.15,
        background: 'radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)',
        position: 'absolute', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <div
        className="animate-fade-up"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 16,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'rgba(244,63,94,0.15)',
                border: '1px solid rgba(244,63,94,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={20} color="#f43f5e" fill="rgba(244,63,94,0.4)" />
            </div>
            <h1 className="section-title">
              My <span style={{
                background: 'linear-gradient(135deg, #f43f5e, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Wishlist</span>
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''} · Total value ₹{totalValue.toLocaleString()}
          </p>
        </div>
        {wishlist.length > 0 && (
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: 13 }}
              onClick={() => alert('Moving all to cart!')}
            >
              <ShoppingCart size={14} /> Add All to Cart
            </button>
            <button
              className="btn-ghost"
              style={{ color: '#f43f5e', borderColor: 'rgba(244,63,94,0.3)', padding: '10px 16px', fontSize: 13 }}
              onClick={handleClearAll}
            >
              <Trash2 size={14} /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* Summary stats */}
      {wishlist.length > 0 && (
        <div
          className="glass-card animate-fade-up delay-100"
          style={{
            padding: '20px 24px',
            marginBottom: 28,
            opacity: 0,
            display: 'flex',
            gap: 32,
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
            border: '1px solid rgba(244,63,94,0.15)',
          }}
        >
          {[
            { label: 'Total Items', value: wishlist.length, color: '#f43f5e' },
            {
              label: 'Total Savings',
              value: `₹${wishlistProducts.reduce((sum, p) => sum + ((p.originalPrice ?? p.price) - p.price), 0).toLocaleString()}`,
              color: '#10b981',
            },
            {
              label: 'In Stock',
              value: wishlistProducts.filter((p) => p.inStock).length,
              color: '#6366f1',
            },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Wishlist grid */}
      {wishlist.length > 0 ? (
        <div className="products-grid" style={{ position: 'relative', zIndex: 1 }}>
          {wishlistProducts.map((product, i) => (
            <div key={product.id} style={{ position: 'relative' }}>
              <ProductCard
                product={product}
                isWishlisted={true}
                onWishlistToggle={handleRemove}
                animationDelay={i * 80}
              />
              <button
                onClick={() => handleRemove(product.id)}
                style={{
                  position: 'absolute',
                  bottom: 72,
                  left: 16,
                  background: 'rgba(244,63,94,0.15)',
                  border: '1px solid rgba(244,63,94,0.3)',
                  borderRadius: 8,
                  color: '#f43f5e',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '4px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Trash2 size={10} /> Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <Heart size={36} color="rgba(244,63,94,0.5)" />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-secondary)', marginBottom: 10 }}>
            Your wishlist is empty
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>
            Save products you love to keep track of them and get notified of price drops.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn-primary">
              <Heart size={14} /> Browse Products
            </Link>
            <Link to="/recommendations" className="btn-ghost">
              <Sparkles size={14} /> See Recommendations
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
