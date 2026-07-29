import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  GitCompare,
  Microscope,
  Archive,
  Sliders,
  Settings,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
} from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="h-4 w-4" />,
    BookOpen: <BookOpen className="h-4 w-4" />,
    GitCompare: <GitCompare className="h-4 w-4" />,
    Microscope: <Microscope className="h-4 w-4" />,
    Archive: <Archive className="h-4 w-4" />,
    Sliders: <Sliders className="h-4 w-4" />,
    Settings: <Settings className="h-4 w-4" />,
  };

  const sections = [
    { id: 'engine', label: 'Decision Engine' },
    { id: 'analysis', label: 'Deep Analysis' },
    { id: 'personalization', label: 'Personalization' },
    { id: 'system', label: 'Platform & Audit' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed top-16 bottom-0 left-0 z-40 flex flex-col border-r border-border/80 bg-background/95 backdrop-blur-md transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Collapse Toggle Rail Button */}
        <div className="hidden lg:flex justify-end p-2 border-b border-border/40">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((section) => {
            const sectionRoutes = ROUTES.filter((r) => r.section === section.id);
            if (sectionRoutes.length === 0) return null;

            return (
              <div key={section.id} className="space-y-1.5">
                {!isCollapsed && (
                  <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    {section.label}
                  </p>
                )}

                {sectionRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      cn(
                        'relative flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 group',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            'flex h-5 w-5 items-center justify-center transition-colors',
                            isActive ? 'text-emerald-400' : 'group-hover:text-foreground'
                          )}
                        >
                          {iconMap[route.iconName] || <Layers className="h-4 w-4" />}
                        </span>

                        {!isCollapsed && (
                          <div className="flex items-center justify-between flex-1 truncate">
                            <span className="truncate">{route.name}</span>
                            {route.badge && (
                              <span
                                className={cn(
                                  'text-[10px] px-1.5 py-0.2 rounded-full font-semibold',
                                  isActive
                                    ? 'bg-emerald-400/20 text-emerald-300'
                                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                )}
                              >
                                {route.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom Active Intelligence Rail Card */}
        {!isCollapsed && (
          <div className="p-3 border-t border-border/60">
            <div className="p-3 rounded-2xl glass-panel space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-medium">
                  <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" /> Live Confidence
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">98.4%</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-snug">
                Engine evaluating 14 real-time market signals without sponsored bias.
              </p>
              <div className="w-full bg-secondary rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-1 rounded-full w-[98%]" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
