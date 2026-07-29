import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Cpu, Zap, ShieldCheck } from 'lucide-react';

export interface AIThinkingAnimationProps {
  label?: string;
  isCompact?: boolean;
  className?: string;
}

const THINKING_STEPS = [
  'Extracting ergonomic & hardware constraints...',
  'Evaluating 42 unsponsored teardowns...',
  'Analyzing long-term battery & chassis durability...',
  'Calibrating unbiased match confidence score...',
  'Finalizing purchasing recommendations...',
];

export const AIThinkingAnimation: React.FC<AIThinkingAnimationProps> = ({
  label = 'AI Assistant Thinking',
  isCompact = false,
  className = '',
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % THINKING_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  if (isCompact) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400 ${className}`}>
        <div className="relative flex items-center justify-center h-6 w-6 shrink-0">
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
          <Brain className="h-4 w-4 text-emerald-500 relative z-10 animate-pulse" />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate">{THINKING_STEPS[stepIndex]}</span>
        </div>
        <div className="flex items-end gap-0.5 h-3 shrink-0">
          <span className="w-1 bg-emerald-500 rounded-full animate-wave-bar-1" />
          <span className="w-1 bg-emerald-500 rounded-full animate-wave-bar-2" />
          <span className="w-1 bg-emerald-500 rounded-full animate-wave-bar-3" />
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-3xl apple-card border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-card to-emerald-500/10 shadow-md space-y-5 overflow-hidden relative ${className}`}>
      {/* Background Animated Glowing Orb */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl animate-float-glow pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 shadow-inner">
            <div className="absolute inset-0 rounded-2xl border border-emerald-400/40 animate-neural-ring" />
            <Sparkles className="h-5 w-5 text-emerald-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-foreground">{label}</h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                Live Synthesis
              </span>
            </div>
            <p className="text-xs text-muted-foreground transition-all duration-300">
              {THINKING_STEPS[stepIndex]}
            </p>
          </div>
        </div>

        {/* Soundwave Bars */}
        <div className="flex items-end gap-1 h-5 px-3 py-1.5 rounded-xl bg-background/80 border border-border/60 shadow-2xs">
          <span className="w-1 bg-emerald-500 rounded-full animate-wave-bar-1" />
          <span className="w-1 bg-emerald-500 rounded-full animate-wave-bar-2" />
          <span className="w-1 bg-emerald-500 rounded-full animate-wave-bar-3" />
          <span className="w-1 bg-emerald-500 rounded-full animate-wave-bar-4" />
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-secondary/80 h-2 rounded-full overflow-hidden relative">
        <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full w-3/4 animate-pulse" />
      </div>

      {/* 3 Step Badge Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background/60 border border-border/50 text-xs">
          <Cpu className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="text-[11px] text-muted-foreground font-medium truncate">Deep Teardown Parsing</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background/60 border border-border/50 text-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="text-[11px] text-muted-foreground font-medium truncate">Zero Sponsored Filters</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background/60 border border-border/50 text-xs">
          <Zap className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="text-[11px] text-muted-foreground font-medium truncate">Context Match Engine</span>
        </div>
      </div>
    </div>
  );
};
