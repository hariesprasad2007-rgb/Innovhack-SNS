import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, size = 14 }) => {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <span
            key={i}
            style={{ position: 'relative', display: 'inline-block', width: size, height: size }}
          >
            <Star
              size={size}
              fill={filled ? '#fbbf24' : 'none'}
              color={filled ? '#fbbf24' : '#374151'}
              strokeWidth={1.5}
            />
            {partial && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${(rating % 1) * 100}%`,
                  overflow: 'hidden',
                  display: 'inline-block',
                }}
              >
                <Star size={size} fill="#fbbf24" color="#fbbf24" strokeWidth={1.5} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
