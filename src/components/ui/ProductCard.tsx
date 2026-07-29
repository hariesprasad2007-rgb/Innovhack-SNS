import React, { useState } from 'react';
import { Badge } from './badge';
import { Button } from './button';
import { CheckCircle2, Bookmark, GitCompare, Star, Check } from 'lucide-react';
import { getProductImage, getProductRating } from '../../lib/mockData';
import { ProductCardSkeleton } from './Skeleton';

export interface ProductCardProps {
  id?: string;
  name: string;
  subtitle?: string;
  price: string | number;
  matchScore?: number | string;
  rating?: string;
  image?: string;
  keyBenefits?: string[];
  onCompare?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  isWinner?: boolean;
  isLoading?: boolean;
  badge?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  subtitle,
  price,
  matchScore = 94,
  rating,
  image,
  keyBenefits = [],
  onCompare,
  onSave,
  isSaved = false,
  isWinner = false,
  isLoading = false,
  badge,
  className = '',
}) => {
  const [saved, setSaved] = useState(isSaved);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  const cardImage = image || getProductImage(name);
  const cardRating = rating || getProductRating(name);
  const formattedPrice = typeof price === 'number' ? `$${price}` : price;
  const matchDisplay = typeof matchScore === 'number' ? `${matchScore}% AI Match` : matchScore;

  // Ensure 3 Key Benefits
  const benefits = keyBenefits.slice(0, 3);
  if (benefits.length < 3) {
    const defaultBenefits = [
      'Unbiased performance & durability audit',
      'Zero subscription lock & open software',
      'High secondary market resale liquidity',
    ];
    while (benefits.length < 3) {
      benefits.push(defaultBenefits[benefits.length % defaultBenefits.length]);
    }
  }

  const handleSaveToggle = () => {
    setSaved(!saved);
    if (onSave) onSave();
  };

  return (
    <div
      className={`rounded-3xl apple-card border transition-all duration-300 flex flex-col justify-between overflow-hidden relative hover-card-lift bg-card ${
        isWinner
          ? 'border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-border/80 hover:border-foreground/20 shadow-xs'
      } ${className}`}
    >
      {/* 1. PRODUCT IMAGE HERO HEADER WITH THUMBNAIL ASPECT */}
      <div className="relative h-52 w-full overflow-hidden bg-muted/60">
        <img
          src={cardImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

        {/* 2. AI MATCH BADGE & TOP BADGE */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 flex-wrap">
          <Badge variant="emerald" className="shadow-md text-xs font-bold py-1 px-3 rounded-xl">
            {matchDisplay}
          </Badge>
          {badge && (
            <Badge variant="secondary" className="shadow-xs text-xs font-semibold py-1 px-2.5 rounded-xl backdrop-blur-md bg-background/80">
              {badge}
            </Badge>
          )}
        </div>

        {/* SAVE BUTTON OVERLAY */}
        <button
          onClick={handleSaveToggle}
          className="absolute top-3.5 right-3.5 h-9 w-9 rounded-full bg-background/85 backdrop-blur-md border border-border/80 flex items-center justify-center text-foreground shadow-sm hover:scale-110 transition-all"
          title={saved ? 'Remove from saved' : 'Save to Vault'}
        >
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-emerald-500 text-emerald-500' : 'text-muted-foreground'}`} />
        </button>

        {/* RATING BADGE OVERLAY */}
        <div className="absolute bottom-3.5 left-3.5">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1 rounded-xl bg-background/90 backdrop-blur-md border border-border/80 text-foreground shadow-2xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {cardRating}
          </span>
        </div>
      </div>

      {/* CARD CONTENT WITH BREATHABLE SPACING */}
      <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-bold text-foreground leading-tight truncate">{name}</h3>
            <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
              {formattedPrice}
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* 3 KEY BENEFITS IN CLEAN CARDS */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Evaluated Key Benefits
          </span>
          <div className="space-y-2">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-secondary/40 border border-border/50 text-xs"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-foreground text-xs leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-3 flex items-center gap-3 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={onCompare}
            className="flex-1 text-xs gap-1.5 rounded-xl font-semibold hover-card-lift py-2.5"
          >
            <GitCompare className="h-4 w-4 text-emerald-500" /> Compare
          </Button>

          <Button
            variant={saved ? 'emerald' : 'secondary'}
            size="sm"
            onClick={handleSaveToggle}
            className="flex-1 text-xs gap-1.5 rounded-xl font-semibold hover-card-lift py-2.5"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" /> Save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
