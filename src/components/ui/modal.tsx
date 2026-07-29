import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative z-50 w-full max-w-lg rounded-3xl glass-panel p-6 shadow-2xl border border-border/80',
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-xl p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            {(title || description) && (
              <div className="mb-4 pr-8">
                {title && <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>}
                {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
              </div>
            )}

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
