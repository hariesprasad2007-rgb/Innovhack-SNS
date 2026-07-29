import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            'absolute mt-2 w-48 rounded-2xl glass-panel p-1.5 shadow-xl z-50 animate-in fade-in-0 zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          <div className="py-1" onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  destructive?: boolean;
}> = ({ children, onClick, icon, destructive }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-3 py-2 text-xs rounded-xl flex items-center gap-2 transition-colors duration-150',
        destructive
          ? 'text-rose-600 hover:bg-rose-500/10 dark:text-rose-400'
          : 'text-foreground/90 hover:bg-secondary hover:text-foreground'
      )}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      {children}
    </button>
  );
};
