import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3.5 text-muted-foreground pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-xl border border-input bg-background/60 px-3 py-2 text-xs transition-all duration-200 placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:bg-background disabled:cursor-not-allowed disabled:opacity-50',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-muted-foreground flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
