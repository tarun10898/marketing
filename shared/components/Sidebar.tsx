'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';

export function Sidebar({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const navItems = [
    {
      href: '/product-strategy',
      label: 'Overview',
      detail: 'Core strategy framework',
      icon: '📊',
    },
    {
      href: '/product-strategy/competitor-scan',
      label: 'Competitor Scan',
      detail: '100+ platforms analysed',
      icon: '🔍',
    },
    {
      href: '/product-strategy/positioning',
      label: 'Positioning & Price',
      detail: 'UVP & pricing models',
      icon: '🎯',
    },
    {
      href: '/product-strategy/resources',
      label: 'Resources',
      detail: 'Documents & research',
      icon: '📚',
    },
    {
      href: '/product-strategy/feedback',
      label: 'Feedback Links',
      detail: 'Beta tester surveys',
      icon: '💬',
    },
    {
      href: '/product-strategy/hiring-tiers',
      label: 'Hiring Tiers',
      detail: 'SDE company classification',
      icon: '💼',
    },
  ];

  return (
    <>
      {/* Mobile Sidebar Slide-Over Overlay & Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-20 z-40 h-[calc(100vh-6rem)] md:h-[fit-content] transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-52 lg:w-56 md:mr-8 translate-x-0 opacity-100'
            : 'w-0 md:mr-0 -translate-x-full md:translate-x-0 md:w-0 opacity-0 pointer-events-none'
        } ${className}`}
      >
        {/* Sidebar Container */}
        <div className={`h-full md:h-auto overflow-y-auto rounded-2xl bg-white/40 dark:bg-surface-dark/45 backdrop-blur-xl shadow-lg shadow-primary/5 flex flex-col gap-2 transition-all duration-300 ${
          isOpen 
            ? 'w-52 lg:w-56 p-4 border border-white/60 dark:border-border-dark/50' 
            : 'w-0 p-0 border-none overflow-hidden'
        }`}>
          <div className="px-3 py-1 mb-2 border-b border-border/20 dark:border-border-dark/20 pb-2 flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest font-bold text-ink-muted dark:text-ink-dark-muted">
              Navigation
            </p>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1 rounded-lg hover:bg-white/60 dark:hover:bg-surface-dark-subtle/50 text-ink-muted dark:text-ink-dark-muted hover:text-ink dark:hover:text-ink-dark"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    // Close sidebar on mobile after clicking a link
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary-dark/15 dark:to-secondary-dark/15 border-primary/20 dark:border-primary-dark/30 text-primary dark:text-primary-dark shadow-sm'
                      : 'bg-transparent border-transparent text-ink-muted dark:text-ink-dark-muted hover:bg-white/60 dark:hover:bg-surface-dark-subtle/50 hover:text-ink dark:hover:text-ink-dark'
                  }`}
                >
                  <span className={`text-xl transition-transform duration-200 group-hover:scale-110 ${isActive ? 'scale-105' : ''}`}>
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-primary dark:text-primary-dark' : 'text-ink dark:text-ink-dark'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-ink-muted dark:text-ink-dark-muted mt-0.5 truncate group-hover:text-ink/80 dark:group-hover:text-ink-dark/80">
                      {item.detail}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
