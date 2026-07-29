import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';
import { cn } from '../../lib/utils';
import { useLocalStore } from '../../hooks/useLocalStore';

export const RootLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStore<boolean>(
    'shopmind_sidebar_collapsed',
    false
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        isSidebarOpen={isMobileSidebarOpen}
      />

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette />

      <div className="flex flex-1 relative">
        {/* Left Collapsible Navigation Drawer */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Workspace Stage */}
        <main
          className={cn(
            'flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out',
            isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
          )}
        >
          <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>

          {/* Architectural Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
};
