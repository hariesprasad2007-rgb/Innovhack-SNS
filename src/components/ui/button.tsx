import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md',
        emerald:
          'bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 hover:shadow-emerald-900/20 dark:bg-emerald-500 dark:hover:bg-emerald-400',
        vermilion:
          'bg-rose-600 text-white shadow-sm hover:bg-rose-500 hover:shadow-rose-900/20 dark:bg-rose-500 dark:hover:bg-rose-400',
        outline:
          'border border-input bg-background/50 hover:bg-accent/10 hover:text-accent-foreground dark:border-border',
        ghost:
          'hover:bg-secondary hover:text-secondary-foreground text-muted-foreground',
        glass:
          'glass-panel text-foreground shadow-sm hover:bg-background/80 hover:border-foreground/20',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-[11px] rounded-lg',
        lg: 'h-11 px-6 text-sm rounded-2xl',
        icon: 'h-9 w-9 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
