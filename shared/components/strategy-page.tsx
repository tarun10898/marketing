import Link from 'next/link';
import type { ReactNode } from 'react';
import { SimpleHeader } from './index';
import { Sidebar } from './Sidebar';

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
        'flex items-center gap-2 text-sm text-ink-muted dark:text-ink-dark-muted mb-8',
        className
      )}
    >
      <Link href={href} className={linkClassName}>
        {label}
      </Link>
      <span>/</span>
      <span className="text-ink dark:text-ink-dark font-medium">{current}</span>
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
      <h1 className="font-display text-4xl font-bold text-ink dark:text-ink-dark mb-3">{title}</h1>
      <p className={joinClasses('text-ink-muted dark:text-ink-dark-muted', descriptionClassName)}>
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
        'font-display text-2xl font-bold text-ink dark:text-ink-dark mb-6 flex items-center gap-3',
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
        'flex items-center justify-between pt-4 border-t border-border dark:border-border-dark',
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

type StrategyDetailPageShellProps = {
  current: ReactNode;
  badge: ReactNode;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  breadcrumbLinkClassName: string;
  introBadgeClassName: string;
  navLinkClassName: string;
  footerMessage: ReactNode;
  leftNav?: StrategyPageNavItem;
  rightNav?: StrategyPageNavItem;
  breadcrumbHref?: string;
  breadcrumbLabel?: ReactNode;
  pageClassName?: string;
  mainClassName?: string;
  introClassName?: string;
  introDescriptionClassName?: string;
  introChildren?: ReactNode;
  navClassName?: string;
  footerClassName?: string;
};

export function StrategyDetailPageShell({
  current,
  badge,
  title,
  description,
  children,
  breadcrumbLinkClassName,
  introBadgeClassName,
  navLinkClassName,
  footerMessage,
  leftNav,
  rightNav,
  breadcrumbHref,
  breadcrumbLabel,
  pageClassName,
  mainClassName,
  introClassName,
  introDescriptionClassName,
  introChildren,
  navClassName,
  footerClassName,
}: StrategyDetailPageShellProps) {
  return (
    <div className={joinClasses('min-h-screen transition-colors', pageClassName)}>
      <SimpleHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row py-10">
        <Sidebar />
        <main className={joinClasses('flex-1 min-w-0 py-2', mainClassName)}>
          <StrategyBreadcrumb
            current={current}
            linkClassName={breadcrumbLinkClassName}
            href={breadcrumbHref}
            label={breadcrumbLabel}
          />

          <StrategyPageIntro
            badge={badge}
            badgeClassName={introBadgeClassName}
            title={title}
            description={description}
            className={introClassName}
            descriptionClassName={introDescriptionClassName}
          >
            {introChildren}
          </StrategyPageIntro>

          {children}

          {leftNav || rightNav ? (
            <StrategyPageNav
              left={leftNav}
              right={rightNav}
              linkClassName={navLinkClassName}
              className={navClassName}
            />
          ) : null}
        </main>
      </div>

      <StrategyFooter message={footerMessage} className={footerClassName} />
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
        'border-t border-border dark:border-border-dark py-6 px-6 text-center mt-12',
        className
      )}
    >
      <p className={joinClasses('text-sm text-ink-muted dark:text-ink-dark-muted', textClassName)}>
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
        'bg-white/65 dark:bg-surface-dark/70 backdrop-blur-md rounded-xl p-5 border border-white/70 dark:border-border-dark/50 shadow-md shadow-primary/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200',
        className
      )}
    >
      {icon ? <div className="text-2xl mb-3">{icon}</div> : null}
      <p className={joinClasses('font-semibold text-ink dark:text-ink-dark', titleClassName)}>
        {title}
      </p>
      <p
        className={joinClasses(
          'text-sm text-ink-muted dark:text-ink-dark-muted',
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
        'group flex items-start gap-4 bg-white/65 dark:bg-surface-dark/70 backdrop-blur-md rounded-2xl p-6 border border-white/70 dark:border-border-dark/50 shadow-md shadow-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <span className="text-3xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className={joinClasses(
              'font-semibold text-ink dark:text-ink-dark transition-colors',
              titleClassName
            )}
          >
            {title}
          </p>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface dark:bg-surface-dark-subtle text-ink-muted dark:text-ink-dark-muted flex-shrink-0">
            {type}
          </span>
        </div>
        <p className="text-sm text-ink-muted dark:text-ink-dark-muted mb-2">{description}</p>
        <p className={joinClasses('text-xs truncate', urlClassName)}>{href}</p>
      </div>
      <svg
        className={joinClasses(
          'w-5 h-5 text-ink-muted/50 dark:text-ink-dark-muted/45 transition-colors flex-shrink-0 mt-1',
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