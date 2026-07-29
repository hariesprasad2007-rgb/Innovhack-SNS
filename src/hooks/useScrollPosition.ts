import { useEffect, useState } from 'react';

export function useScrollPosition(): { scrollY: number; scrollX: number; isScrolled: boolean } {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      setScrollPosition({
        scrollY,
        scrollX,
        isScrolled: scrollY > 12,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}
