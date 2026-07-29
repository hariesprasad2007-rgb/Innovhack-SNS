import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  Users,
  Layers,
  TrendingUp,
  Zap,
  RefreshCw,
  Info,
} from 'lucide-react';
import { recommendations, currentUser } from '../data/mockData';
import { RecommendationCard } from '../components/RecommendationCard';

const matchTypes = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'collaborative', label: 'Collaborative', icon: Users },
  { id: 'content-based', label: 'Content-Based', icon: Layers },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'similar', label: 'Similar', icon: Zap },
];

const profileItems = [
  { label: 'Viewed Products', value: currentUser.browsingHistory.length, color: '#6366f1' },
  { label: 'Purchased Items', value: currentUser.purchaseHistory.length, color: '#8b5cf6' },
  { label: 'Wishlist Items', value: currentUser.wishlist.length, color: '#f59e0b' },
  { label: 'Products Rated', value: Object.keys(currentUser.ratings).length, color: '#10b981' },
];

export const RecommendationsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = activeFilter === 'all'
    ? recommendations
    : recommendations.filter((r) => r.matchType === activeFilter);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="page-wrapper">
      {/* Background orbs */}
      <div className="orb orb-violet" style={{ width: 500, height: 500, top: -100, right: -150, opacity: 0.25 }} />
      <div className="orb orb-emerald" style={{ width: 300, height: 300, bottom: 0, left: -100, opacity: 0.15 }} />

      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: 32, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div
                className="animate-pulse-glow"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Brain size={20} color="white" />
              </div>
              <h1 className="section-title">
                Picked <span className="gradient-text">For You</span>
              </h1>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              AI-curated recommendations based on your activity profile
            </p>
          </div>
          <button
            className="btn-ghost"
            onClick={handleRefresh}
            style={{ gap: 8, flexShrink: 0 }}
          >
            <RefreshCw size={14} style={{ animation: refreshing ? 'spin-slow 1s linear infinite' : 'none' }} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Profile Insight Bar */}
      <div
        className="glass-card animate-fade-up delay-100"
        style={{
          padding: '20px 24px',
          marginBottom: 28,
          opacity: 0,
          position: 'relative',
          zIndex: 1,
          border: '1px solid rgba(99,102,241,0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Info size={15} color="#6366f1" />
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
            Your Behaviour Profile — {currentUser.name}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
          {profileItems.map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.label}</div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginTop: 4 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, item.value * 20)}%`,
                    background: item.color,
                    borderRadius: 2,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div
        className="animate-fade-up delay-200"
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 28,
          opacity: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {matchTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveFilter(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              border: activeFilter === id ? '1px solid rgba(99,102,241,0.5)' : '1px solid var(--border)',
              background: activeFilter === id ? 'rgba(99,102,241,0.15)' : 'var(--bg-card)',
              color: activeFilter === id ? '#a5b4fc' : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            <Icon size={12} />
            {label}
            {id !== 'all' && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 99,
                  padding: '1px 6px',
                  fontSize: 11,
                }}
              >
                {recommendations.filter((r) => r.matchType === id).length}
              </span>
            )}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
          {filtered.length} recommendation{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Recommendation Cards */}
      {!refreshing ? (
        <div className="recs-grid" style={{ position: 'relative', zIndex: 1 }}>
          {filtered.map((rec, i) => (
            <RecommendationCard key={rec.product.id} rec={rec} animationDelay={i * 80} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '3px solid rgba(99,102,241,0.3)',
              borderTopColor: '#6366f1',
              animation: 'spin-slow 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Re-running recommendation engine...
          </p>
        </div>
      )}

      {/* How it works explainer */}
      <div
        className="glass-card animate-fade-up"
        style={{
          marginTop: 48,
          padding: '28px 32px',
          border: '1px solid rgba(99,102,241,0.15)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
          <Brain size={16} style={{ display: 'inline', marginRight: 8, color: '#6366f1' }} />
          How Your Score Is Calculated
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {[
            { label: 'Browsing History', weight: '35%', color: '#6366f1' },
            { label: 'Purchase Patterns', weight: '30%', color: '#8b5cf6' },
            { label: 'Rating Feedback', weight: '20%', color: '#10b981' },
            { label: 'Wishlist Signals', weight: '15%', color: '#f59e0b' },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.weight}</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div
                  style={{
                    height: '100%',
                    width: item.weight,
                    background: item.color,
                    borderRadius: 2,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
