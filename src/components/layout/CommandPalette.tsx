import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, GitCompare, Microscope, Archive, Sliders, Settings, Sun, Moon, Sparkles } from 'lucide-react';
import { Modal } from '../ui/modal';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { useTheme } from '../../hooks/useTheme';
import { ROUTES } from '../../lib/constants';

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Bind Cmd+K or Ctrl+K to toggle command palette
  useKeyboardShortcut(
    { key: 'k', metaOrControl: true },
    () => setIsOpen((prev) => !prev)
  );

  const filteredRoutes = ROUTES.filter(
    (route) =>
      route.name.toLowerCase().includes(query.toLowerCase()) ||
      route.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectRoute = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="h-4 w-4" />,
    GitCompare: <GitCompare className="h-4 w-4" />,
    Microscope: <Microscope className="h-4 w-4" />,
    Archive: <Archive className="h-4 w-4" />,
    Sliders: <Sliders className="h-4 w-4" />,
    Settings: <Settings className="h-4 w-4" />,
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-xl p-0 overflow-hidden">
      <div className="p-4 border-b border-border/60 flex items-center gap-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a route, command, or evaluation intent..."
          className="w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/60"
          autoFocus
        />
        <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-secondary rounded-md border border-border">
          ESC
        </kbd>
      </div>

      <div className="p-2 max-h-80 overflow-y-auto space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Navigation & Engines
        </div>
        {filteredRoutes.map((route) => (
          <button
            key={route.path}
            onClick={() => handleSelectRoute(route.path)}
            className="w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between hover:bg-secondary/80 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-background text-muted-foreground group-hover:text-foreground group-hover:border-foreground/20 border border-border/40 transition-colors">
                {iconMap[route.iconName] || <Sparkles className="h-4 w-4" />}
              </span>
              <div>
                <p className="text-xs font-medium text-foreground">{route.name}</p>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{route.description}</p>
              </div>
            </div>
            {route.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                {route.badge}
              </span>
            )}
          </button>
        ))}

        <div className="mt-3 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Theme Controls
        </div>
        <button
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
            setIsOpen(false);
          }}
          className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 hover:bg-secondary/80 transition-colors"
        >
          <span className="p-2 rounded-lg bg-background text-muted-foreground border border-border/40">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </span>
          <div>
            <p className="text-xs font-medium text-foreground">
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </p>
            <p className="text-[11px] text-muted-foreground">Toggle platform color palette</p>
          </div>
        </button>
      </div>

      <div className="p-3 border-t border-border/60 bg-secondary/30 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-emerald-500" /> DoubleShift-AI Intelligence Command Active
        </span>
        <span>Press <kbd className="font-mono text-[10px] px-1 py-0.5 bg-background rounded border border-border">↑↓</kbd> to navigate</span>
      </div>
    </Modal>
  );
};
