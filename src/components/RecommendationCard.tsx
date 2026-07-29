import React from 'react';
import { Zap, Users, TrendingUp, Layers } from 'lucide-react';
import { Recommendation } from '../types';
import { StarRating } from './StarRating';

interface RecommendationCardProps {
  rec: Recommendation;
  animationDelay?: number;
}

const matchTypeConfig = {
  'collaborative': { label: 'Collaborative', icon: Users, color: 'badge-indigo' },
  'content-based': { label: 'Content-Based', icon: Layers, color: 'badge-violet' },
  'trending': { label: 'Trending', icon: TrendingUp, color: 'badge-emerald' },
  'similar': { label: 'Similar', icon: Zap, color: 'badge-amber' },
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ rec, animationDelay = 0 }) => {
  const config = matchTypeConfig[rec.matchType];
  const Icon = config.icon;
  const pct = `${rec.score}%`;

  return (
    <div
      className="glass-card animate-fade-up"
      style={{
        animationDelay: `${animationDelay}ms`,
        opacity: 0,
        display: 'flex',
        gap: 16,
        padding: 20,
        alignItems: 'center',
      }}
    >
      {/* Product image */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img
          src={rec.product.image}
          alt={rec.product.name}
          style={{
            width: 90,
            height: 90,
            borderRadius: 10,
            objectFit: 'cover',
            border: '1px solid var(--border)',
          }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className={`badge ${config.color}`} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon size={10} />
            {config.label}
          </span>
        </div>

        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {rec.product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StarRating rating={rec.product.rating} size={12} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {rec.product.rating} ({rec.product.reviewCount.toLocaleString()})
          </span>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {rec.reason}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>
            ₹{rec.product.price.toLocaleString()}
          </span>
          <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }}>
            View Product
          </button>
        </div>
      </div>

      {/* Score ring */}
      <div
        className="score-ring"
        style={{ '--pct': pct } as React.CSSProperties}
        title={`${rec.score}% match score`}
      >
        <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-indigo)' }}>
          {rec.score}
        </span>
      </div>
    </div>
  );
};
