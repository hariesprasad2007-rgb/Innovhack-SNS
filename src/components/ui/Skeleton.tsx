import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-secondary/80 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer-slide before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent ${className}`}
      {...props}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl apple-card border border-border/80 p-6 space-y-4 shadow-xs">
      <Skeleton className="h-44 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-full rounded-xl" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1 rounded-xl" />
        <Skeleton className="h-9 flex-1 rounded-xl" />
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div className="rounded-3xl apple-card border border-border/80 p-6 space-y-4 shadow-xs">
      <Skeleton className="h-6 w-1/3 rounded-xl" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};
