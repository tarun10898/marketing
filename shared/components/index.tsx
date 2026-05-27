'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSidebar } from './SidebarContext';

export function SimpleHeader() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggle } = useSidebar();

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
      className={`sticky top-4 z-50 w-[95%] max-w-7xl mx-auto h-12 rounded-full border transition-all duration-300 flex items-center justify-between px-4 sm:px-6 relative shadow-lg shadow-primary/5 ${
        scrolled
          ? 'bg-white/55 dark:bg-surface-dark/65 backdrop-blur-2xl border-white/60 dark:border-border-dark/60'
          : 'bg-white/35 dark:bg-surface-dark/40 backdrop-blur-xl border-white/45 dark:border-border-dark/45'
      }`}
    >
      {/* Shimmer line across the very top of the nav */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/50 dark:via-primary-dark/40 to-transparent" />

      {/* Left Brand Area: Menu Toggle + Logo + Name */}
      <div className="flex items-center gap-2.5">
        {/* Hamburger menu button (3 lines) */}
        <button
          onClick={toggle}
          className="p-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-surface-dark-subtle/50 text-ink-muted dark:text-ink-dark-muted hover:text-ink dark:hover:text-ink-dark transition-colors"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo + Brand name */}
        <Link href="/product-strategy" className="flex items-center gap-2 group">
          {/* User provided Logo */}
          <div className="w-7 h-7 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
            <img 
              src="/logo.jpg" 
              alt="easyloops logo" 
              className="w-full h-full object-contain mix-blend-multiply dark:invert dark:mix-blend-screen" 
            />
          </div>
          <span className="font-display font-extrabold text-sm tracking-tight text-ink dark:text-ink-dark select-none">
            easyloops <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-medium">internal</span>
          </span>
        </Link>
      </div>

      {/* Center Dashboard Title */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none select-none">
        <span className="text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
          Product Strategy Dashboard
        </span>
      </div>

      {/* Dark mode toggle — pinned to right */}
      <button
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/30 dark:bg-surface-dark/40 backdrop-blur-sm border border-white/60 dark:border-border-dark/50 text-primary dark:text-primary-dark hover:bg-primary-soft/50 dark:hover:bg-primary-dark/20 hover:border-primary/40 dark:hover:border-primary-dark/40 hover:text-primary dark:hover:text-primary-soft shadow-sm hover:scale-105 transition-all duration-200"
      >
        {dark ? (
          /* Sun */
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          /* Moon */
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </header>
  );
}

export { Sidebar } from './Sidebar';
export { SidebarProvider, useSidebar } from './SidebarContext';
