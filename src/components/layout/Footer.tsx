import React from 'react';
import { ShieldCheck, Cpu, Terminal, Sparkles, Heart } from 'lucide-react';
import { APP_NAME } from '../../lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border/60 bg-background/50 backdrop-blur-sm text-xs text-muted-foreground py-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <Cpu className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{APP_NAME}</p>
              <p className="text-[11px] text-muted-foreground">
                Autonomous buying decision architecture & un-sponsored product intelligence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero Affiliate Bias Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary text-muted-foreground border border-border">
              <Terminal className="h-3.5 w-3.5 text-foreground" />
              <span>⌘K Command Engine</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} DoubleShift-AI. Architecture Blueprint & UI Foundation.</p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Handcrafted with precision for high-intent shoppers</span>
            <Sparkles className="h-3 w-3 text-amber-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
