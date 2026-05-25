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
          ? 'bg-white/40 dark:bg-slate-950/50 backdrop-blur-2xl shadow-lg shadow-indigo-900/10 border-b border-white/50 dark:border-slate-700/50'
          : 'bg-white/20 dark:bg-slate-950/20 backdrop-blur-xl border-b border-white/30 dark:border-slate-800/40'
      }`}
    >
      {/* Shimmer line across the very top of the nav */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 dark:via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 relative flex items-center justify-center">

        {/* Left accent dot cluster */}
        <div className="absolute left-4 sm:left-6 lg:left-8 flex items-center gap-1.5 opacity-60">
          <span className="w-2 h-2 rounded-full bg-indigo-400 dark:bg-indigo-500 shadow-sm shadow-indigo-400/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 dark:bg-violet-500 opacity-70" />
          <span className="w-1 h-1 rounded-full bg-sky-400 dark:bg-sky-500 opacity-50" />
        </div>

        {/* Brand — centred with animated gradient */}
        <Link
          href="/product-strategy"
          className="group relative font-extrabold text-sm sm:text-base tracking-wide text-center px-4 py-1.5 rounded-full transition-all duration-300 hover:scale-[1.03]"
        >
          {/* Pill glow behind the text */}
          <span className="absolute inset-0 rounded-full bg-white/30 dark:bg-white/5 border border-white/50 dark:border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 dark:from-indigo-300 dark:via-violet-300 dark:to-sky-300 bg-clip-text text-transparent">
            Product Market Placement Strategy
          </span>
        </Link>

        {/* Dark mode toggle — pinned to right */}
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          className="absolute right-4 sm:right-6 lg:right-8 w-9 h-9 flex items-center justify-center rounded-xl bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm border border-white/60 dark:border-slate-600/50 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/40 hover:border-indigo-300/70 dark:hover:border-indigo-500/50 hover:text-indigo-700 dark:hover:text-indigo-200 shadow-sm hover:shadow-md hover:shadow-indigo-400/20 hover:scale-110 transition-all duration-200"
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
