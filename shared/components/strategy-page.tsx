import Link from 'next/link';
import type { ReactNode } from 'react';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

type StrategyBreadcrumbProps = {
  current: ReactNode;
  linkClassName: string;
  href?: string;
  label?: ReactNode;
  className?: string;
};

export function StrategyBreadcrumb({
  current,
  linkClassName,
  href = '/product-strategy',
  label = 'Product Strategy',
  className,
}: StrategyBreadcrumbProps) {
  return (
    <nav
      className={joinClasses(
        'flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8',
        className
      )}
    >
      <Link href={href} className={linkClassName}>
        {label}
      </Link>
      <span>/</span>
      <span className="text-gray-900 dark:text-white font-medium">{current}</span>
    </nav>
  );
}

type StrategyPageIntroProps = {
  badge: ReactNode;
  badgeClassName: string;
  title: ReactNode;
  description: ReactNode;
  className?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

export function StrategyPageIntro({
  badge,
  badgeClassName,
  title,
  description,
  className,
  descriptionClassName,
  children,
}: StrategyPageIntroProps) {
  return (
    <header className={joinClasses('mb-10', className)}>
      <span
        className={joinClasses(
          'inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3',
          badgeClassName
        )}
      >
        {badge}
      </span>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h1>
      <p className={joinClasses('text-gray-600 dark:text-gray-300', descriptionClassName)}>
        {description}
      </p>
      {children}
    </header>
  );
}

type StrategySectionTitleProps = {
  title: ReactNode;
  accentClassName?: string;
  className?: string;
};

export function StrategySectionTitle({
  title,
  accentClassName,
  className,
}: StrategySectionTitleProps) {
  return (
    <h2
      className={joinClasses(
        'text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3',
        className
      )}
    >
      {accentClassName ? (
        <span className={joinClasses('inline-block w-1 h-7 rounded', accentClassName)} />
      ) : null}
      {title}
    </h2>
  );
}

type StrategyPageNavItem = {
  href: string;
  label: ReactNode;
};

type StrategyPageNavProps = {
  left?: StrategyPageNavItem;
  right?: StrategyPageNavItem;
  linkClassName: string;
  className?: string;
};

export function StrategyPageNav({
  left,
  right,
  linkClassName,
  className,
}: StrategyPageNavProps) {
  return (
    <div
      className={joinClasses(
        'flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {left ? (
        <Link href={left.href} className={linkClassName}>
          {left.label}
        </Link>
      ) : (
        <span />
      )}
      {right ? (
        <Link href={right.href} className={linkClassName}>
          {right.label}
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

type StrategyFooterProps = {
  message: ReactNode;
  className?: string;
  textClassName?: string;
};

export function StrategyFooter({
  message,
  className,
  textClassName,
}: StrategyFooterProps) {
  return (
    <footer
      className={joinClasses(
        'border-t border-gray-200 dark:border-gray-700 py-6 px-6 text-center mt-12',
        className
      )}
    >
      <p className={joinClasses('text-sm text-gray-400 dark:text-gray-500', textClassName)}>
        © {new Date().getFullYear()} {message}
      </p>
    </footer>
  );
}

type FeatureCardProps = {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function FeatureCard({
  title,
  description,
  icon,
  className,
  titleClassName,
  descriptionClassName,
}: FeatureCardProps) {
  return (
    <div
      className={joinClasses(
        'bg-white/65 dark:bg-slate-800/55 backdrop-blur-md rounded-xl p-5 border border-white/70 dark:border-slate-700/50 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200',
        className
      )}
    >
      {icon ? <div className="text-2xl mb-3">{icon}</div> : null}
      <p className={joinClasses('font-semibold text-slate-900 dark:text-white', titleClassName)}>
        {title}
      </p>
      <p
        className={joinClasses(
          'text-sm text-slate-500 dark:text-slate-400',
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  );
}

type ResourceLinkCardProps = {
  title: string;
  description: string;
  href: string;
  type: string;
  icon: ReactNode;
  className?: string;
  titleClassName?: string;
  urlClassName?: string;
  iconClassName?: string;
};

export function ResourceLinkCard({
  title,
  description,
  href,
  type,
  icon,
  className,
  titleClassName,
  urlClassName,
  iconClassName,
}: ResourceLinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={joinClasses(
        'group flex items-start gap-4 bg-white/65 dark:bg-slate-800/55 backdrop-blur-md rounded-2xl p-6 border border-white/70 dark:border-slate-700/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <span className="text-3xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className={joinClasses(
              'font-semibold text-gray-900 dark:text-white transition-colors',
              titleClassName
            )}
          >
            {title}
          </p>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0">
            {type}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{description}</p>
        <p className={joinClasses('text-xs truncate', urlClassName)}>{href}</p>
      </div>
      <svg
        className={joinClasses(
          'w-5 h-5 text-gray-300 dark:text-gray-600 transition-colors flex-shrink-0 mt-1',
          iconClassName
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}