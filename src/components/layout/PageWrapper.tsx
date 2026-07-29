import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

interface PageWrapperProps {
  title: string;
  description: string;
  badge?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  description,
  badge,
  actions,
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn('w-full space-y-8 py-6', className)}
    >
      {/* Route Blueprint Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{title}</h1>
            {badge && (
              <Badge variant="emerald" className="text-xs font-mono font-bold tracking-wide">
                {badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>

      {/* Main Page Content Canvas */}
      <div className="w-full">{children}</div>
    </motion.div>
  );
};
