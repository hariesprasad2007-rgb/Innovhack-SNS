import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  TrendingUp,
  Users,
  Layers,
  ArrowRight,
  Star,
  ShoppingBag,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { products, recommendations, currentUser } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

const stats = [
  { label: 'Products Analysed', value: '2.4M+', icon: ShoppingBag, color: '#6366f1' },
  { label: 'Active Users', value: '180K+', icon: Users, color: '#8b5cf6' },
  { label: 'Avg. Match Accuracy', value: '94.7%', icon: Zap, color: '#10b981' },
  { label: 'Recommendations / Day', value: '5M+', icon: Sparkles, color: '#f59e0b' },
];

const features = [
  {
    icon: Layers,
    title: 'Content-Based Filtering',
    desc: 'Analyses product attributes and your viewing patterns to surface items that match your personal taste profile.',
    color: '#6366f1',
  },
  {
    icon: Users,
    title: 'Collaborative Filtering',
    desc: 'Finds patterns across millions of users with similar preferences to discover products you will love.',
    color: '#8b5cf6',
  },
  {
    icon: TrendingUp,
    title: 'Trending Intelligence',
    desc: 'Real-time monitoring of purchase trends and viral products, weighted against your interests.',
    color: '#10b981',
  },
  {
    icon: Brain,
    title: 'Hybrid AI Engine',
    desc: 'Fuses multiple ML signals — KNN, SVD, TF-IDF — for recommendations that improve with every interaction.',
    color: '#f59e0b',
  },
];

export const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const topRec = recommendations[0];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '80px 24px',
        }}
      >
        {/* Background orbs */}
        <div
          className="orb orb-indigo"
          style={{ width: 600, height: 600, top: '-20%', left: '-10%', opacity: 0.5 }}
        />
        <div
          className="orb orb-violet"
          style={{ width: 500, height: 500, bottom: '-15%', right: '-5%', opacity: 0.4 }}
        />
        <div
          className="orb orb-emerald"
          style={{ width: 350, height: 350, top: '30%', right: '20%', opacity: 0.2 }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            {/* Left: Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div className="animate-fade-up">
                <span className="badge badge-indigo" style={{ fontSize: 12 }}>
                  <Sparkles size={11} />
                  AI-Powered Recommendations
                </span>
              </div>

              <h1
                className="animate-fade-up delay-100"
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  opacity: 0,
                }}
              >
                Discover Products{' '}
                <span className="gradient-text">Tailored</span>
                {' '}Just For You
              </h1>

              <p
                className="animate-fade-up delay-200"
                style={{
                  fontSize: 18,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  opacity: 0,
                  maxWidth: 480,
                }}
              >
                ShopMind AI analyses your browsing history, purchase patterns, and preferences
                to deliver hyper-personalised product recommendations in real time.
              </p>

              <div
                className="animate-fade-up delay-300"
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', opacity: 0 }}
              >
                <Link to="/recommendations" className="btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
                  <Sparkles size={16} />
                  See My Recommendations
                </Link>
                <Link to="/products" className="btn-ghost" style={{ fontSize: 15, padding: '13px 28px' }}>
                  <ShoppingBag size={16} />
                  Browse Products
                </Link>
              </div>

              {/* Mini stat row */}
              <div
                className="animate-fade-up delay-400"
                style={{
                  display: 'flex',
                  gap: 24,
                  opacity: 0,
                  paddingTop: 8,
                  borderTop: '1px solid var(--border)',
                }}
              >
                {[
                  { val: '94.7%', label: 'Match Accuracy' },
                  { val: '2.4M+', label: 'Products' },
                  { val: '5M+', label: 'Daily Recs' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Recommendation Preview Card */}
            <div
              className="animate-fade-up delay-300 animate-float"
              style={{ opacity: 0, position: 'relative' }}
            >
              {/* Main card */}
              <div
                className="glass-card"
                style={{
                  padding: 24,
                  border: '1px solid rgba(99,102,241,0.3)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.2)',
                  maxWidth: 420,
                  margin: '0 auto',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Brain size={16} color="white" />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                      AI Recommendation
                    </span>
                  </div>
                  <span className="badge badge-emerald">97% Match</span>
                </div>

                {/* Product preview */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                  <img
                    src={topRec.product.image}
                    alt={topRec.product.name}
                    style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border)' }}
                  />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {topRec.product.name}
                    </div>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 6 }}>
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={11} fill="#fbbf24" color="#fbbf24" />
                      ))}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 2 }}>
                        {topRec.product.rating}
                      </span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{topRec.product.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.15)',
                    marginBottom: 16,
                  }}
                >
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <Sparkles size={11} style={{ display: 'inline', marginRight: 4, color: '#6366f1' }} />
                    {topRec.reason}
                  </p>
                </div>

                {/* Match bars */}
                {[
                  { label: 'Based on browsing', val: 94 },
                  { label: 'Category preference', val: 88 },
                  { label: 'Price range fit', val: 76 },
                ].map((b) => (
                  <div key={b.label} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-indigo)' }}>{b.val}%</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${b.val}%`,
                          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                          borderRadius: 2,
                          transition: 'width 1s ease',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating badges */}
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -10,
                  padding: '8px 14px',
                  borderRadius: 10,
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  backdropFilter: 'blur(8px)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#6ee7b7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <TrendingUp size={13} /> Trending Now
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="glass-card animate-fade-up"
                  style={{
                    padding: '24px',
                    textAlign: 'center',
                    animationDelay: `${i * 100}ms`,
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${stat.color}20`,
                      border: `1px solid ${stat.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}
                  >
                    <Icon size={20} color={stat.color} />
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 28,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <h2 className="section-title">
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 15 }}>
                Hand-picked based on quality and popularity
              </p>
            </div>
            <Link to="/products" className="btn-ghost" style={{ gap: 6 }}>
              View All <ChevronRight size={15} />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={currentUser.wishlist.includes(product.id)}
                animationDelay={i * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: '60px 24px',
          background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.03), transparent)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-violet" style={{ marginBottom: 12 }}>
              <Brain size={11} /> AI Technology
            </span>
            <h2 className="section-title">
              How the <span className="gradient-text">Engine Works</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: 16, maxWidth: 520, margin: '12px auto 0' }}>
              Our multi-algorithm recommendation system learns from every interaction to deliver smarter suggestions.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card animate-fade-up"
                  style={{
                    padding: 28,
                    animationDelay: `${i * 120}ms`,
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `${feature.color}18`,
                      border: `1px solid ${feature.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={22} color={feature.color} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              borderRadius: 24,
              padding: '52px 48px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              flexWrap: 'wrap',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="orb orb-indigo"
              style={{ width: 300, height: 300, top: '-50%', right: '10%', opacity: 0.3 }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
                Ready for smarter shopping?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 480 }}>
                Let ShopMind AI analyse your taste and deliver recommendations that feel like they were hand-picked just for you.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
              <Link to="/recommendations" className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
                <Sparkles size={16} /> Get My Recommendations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
