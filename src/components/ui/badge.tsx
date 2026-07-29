import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[11px] font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',
        outline:
          'text-foreground border-border',
        emerald:
          'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
        amber:
          'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
        rose:
          'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
        glass:
          'glass-panel border-border/80 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
