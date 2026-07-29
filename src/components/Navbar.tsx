import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Home,
  Menu,
  X,
  ShoppingCart,
  Brain,
} from 'lucide-react';
import { currentUser } from '../data/mockData';

const navLinks = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/products', label: 'Products', icon: ShoppingBag },
  { to: '/recommendations', label: 'For You', icon: Sparkles },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(5, 8, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(99,102,241,0.4)',
              }}
            >
              <Brain size={20} color="white" />
            </div>
            <div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em',
                }}
              >
                ShopMind
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {' '}AI
              </span>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flex: 1,
              justifyContent: 'center',
            }}
            className="desktop-nav"
          >
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
              return (
                <NavLink
                  key={to}
                  to={to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '8px 16px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                    border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={15} color={active ? '#6366f1' : 'currentColor'} />
                  {label}
                </NavLink>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <button className="btn-icon" title="Cart">
              <ShoppingCart size={16} />
            </button>
            {/* Avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 800,
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(99,102,241,0.3)',
              }}
              title={currentUser.name}
            >
              {currentUser.avatar}
            </div>
            {/* Mobile toggle */}
            <button
              className="btn-icon mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: 'none' }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 68,
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'rgba(10, 15, 30, 0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                }}
              >
                <Icon size={17} color={active ? '#6366f1' : 'currentColor'} />
                {label}
              </NavLink>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
};
