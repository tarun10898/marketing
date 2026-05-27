'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function SimpleHeader() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setDark(false);
    } else {
      root.classList.add('dark');
      setDark(true);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/40 dark:bg-surface-dark/60 backdrop-blur-2xl shadow-lg shadow-primary/10 border-b border-white/50 dark:border-border-dark/50'
          : 'bg-white/20 dark:bg-surface-dark/35 backdrop-blur-xl border-b border-white/30 dark:border-border-dark/40'
      }`}
    >
      {/* Shimmer line across the very top of the nav */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 dark:via-primary-dark/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 relative flex items-center justify-center">

        {/* Left accent dot cluster */}
        <div className="absolute left-4 sm:left-6 lg:left-8 flex items-center gap-1.5 opacity-60">
          <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-dark shadow-sm shadow-primary/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-soft dark:bg-primary opacity-70" />
          <span className="w-1 h-1 rounded-full bg-secondary dark:bg-secondary-dark opacity-50" />
        </div>

        {/* Brand — centred with animated gradient */}
        <Link
          href="/product-strategy"
          className="group relative font-display font-extrabold text-sm sm:text-base tracking-wide text-center px-4 py-1.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
        >
          {/* Pill glow behind the text */}
          <span className="absolute inset-0 rounded-full bg-white/30 dark:bg-white/5 border border-white/50 dark:border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary dark:from-primary-dark dark:via-primary-soft dark:to-secondary-dark bg-clip-text text-transparent">
            Product Market Placement Strategy
          </span>
        </Link>

        {/* Dark mode toggle — pinned to right */}
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          className="absolute right-4 sm:right-6 lg:right-8 w-9 h-9 flex items-center justify-center rounded-xl bg-white/30 dark:bg-surface-dark/40 backdrop-blur-sm border border-white/60 dark:border-border-dark/50 text-primary dark:text-primary-dark hover:bg-primary-soft/50 dark:hover:bg-primary-dark/20 hover:border-primary/40 dark:hover:border-primary-dark/40 hover:text-primary dark:hover:text-primary-soft shadow-sm hover:shadow-md hover:shadow-primary/20 hover:scale-110 transition-all duration-200"
        >
          {dark ? (
            /* Sun */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            /* Moon */
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
