import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ShoppingBag } from 'lucide-react';
import { products, categories, currentUser } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

export const ProductsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
  const [wishlist, setWishlist] = useState<string[]>(currentUser.wishlist);
  const [showInStock, setShowInStock] = useState(false);

  const handleWishlistToggle = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (showInStock) {
      result = result.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy, showInStock]);

  return (
    <div className="page-wrapper">
      {/* Background orbs */}
      <div className="orb orb-indigo" style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.2 }} />

      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingBag size={20} color="#6366f1" />
          </div>
          <h1 className="section-title">
            All <span className="gradient-text">Products</span>
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Browse our full catalogue — {products.length} products across {categories.length - 1} categories
        </p>
      </div>

      {/* Filters Row */}
      <div
        className="glass-card animate-fade-up delay-100"
        style={{ padding: '16px 20px', marginBottom: 28, opacity: 0 }}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
            <Search
              size={15}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Search products, brands, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36 }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <SlidersHorizontal size={14} color="var(--text-muted)" />
            <select
              className="input-field"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              style={{ width: 'auto', cursor: 'pointer' }}
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* In Stock toggle */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              fontSize: 13,
              color: 'var(--text-secondary)',
              flexShrink: 0,
            }}
          >
            <div
              onClick={() => setShowInStock(!showInStock)}
              style={{
                width: 36,
                height: 20,
                borderRadius: 10,
                background: showInStock ? 'var(--accent-indigo)' : 'rgba(255,255,255,0.1)',
                position: 'relative',
                transition: 'background 0.3s ease',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: 'white',
                  top: 3,
                  left: showInStock ? 19 : 3,
                  transition: 'left 0.3s ease',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }}
              />
            </div>
            In Stock Only
          </label>

          {/* Result count */}
          <span style={{ fontSize: 13, color: 'var(--text-muted)', marginLeft: 'auto', flexShrink: 0 }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div
        className="animate-fade-up delay-200"
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 28,
          opacity: 0,
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '7px 16px',
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              border: selectedCategory === cat ? '1px solid rgba(99,102,241,0.5)' : '1px solid var(--border)',
              background: selectedCategory === cat ? 'rgba(99,102,241,0.15)' : 'var(--bg-card)',
              color: selectedCategory === cat ? '#a5b4fc' : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onWishlistToggle={handleWishlistToggle}
              animationDelay={i * 60}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            color: 'var(--text-muted)',
          }}
        >
          <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3, display: 'block' }} />
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
            No products found
          </div>
          <div style={{ fontSize: 14 }}>Try adjusting your search or filters</div>
          <button
            className="btn-ghost"
            style={{ marginTop: 20, display: 'inline-flex' }}
            onClick={() => { setSearch(''); setSelectedCategory('All'); setShowInStock(false); }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
