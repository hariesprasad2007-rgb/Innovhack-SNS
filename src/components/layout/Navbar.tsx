import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon, Cpu, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { APP_NAME } from '../../lib/constants';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isScrolled } = useScrollPosition();

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-panel border-b border-border/80 shadow-sm'
          : 'bg-background/80 backdrop-blur-sm border-b border-border/40'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Brand Identity */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-md transition-transform duration-300 group-hover:scale-105">
              <Cpu className="h-5 w-5 text-emerald-400" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {APP_NAME}
                </span>
                <Badge variant="emerald" className="hidden sm:inline-flex text-[10px] py-0 px-1.5">
                  v2.4 Engine
                </Badge>
              </div>
            </div>
          </Link>
        </div>

        {/* Center Command Launcher */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              window.dispatchEvent(event);
            }}
            className="w-full flex items-center justify-between h-9 px-3.5 rounded-xl border border-input bg-background/50 text-muted-foreground text-xs hover:bg-secondary/60 hover:border-foreground/20 transition-all group"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>Search evaluations, tradeoffs, or type prompt...</span>
            </span>
            <kbd className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-secondary rounded-md border border-border">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-secondary/50 border border-border/60 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-muted-foreground text-[11px]">Integrity Check:</span>
            <span className="font-medium text-foreground text-[11px]">100% Unbiased</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="rounded-xl"
            title="Toggle color theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </Button>

          <Button variant="emerald" size="sm" className="hidden sm:inline-flex gap-1.5 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            New Evaluation
          </Button>
        </div>
      </div>
    </header>
  );
};
