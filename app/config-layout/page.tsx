import type { Metadata } from 'next';
import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';
import { StrategyFooter } from '@/shared/components/strategy-page';
import {
  layoutTheme,
  strategyPageThemes,
  strategyThemeOrder,
  type StrategyThemeKey,
} from './theme';

export const metadata: Metadata = {
  title: 'Config Layout – EasyLoops',
  description:
    'Single source of truth for EasyLoops primary and secondary colors, fonts, and shared strategy-page theme presets.',
};

const colorTokens = [
  ['Primary', layoutTheme.colors.primary],
  ['Primary Soft', layoutTheme.colors.primarySoft],
  ['Primary Dark', layoutTheme.colors.primaryDark],
  ['Secondary', layoutTheme.colors.secondary],
  ['Secondary Soft', layoutTheme.colors.secondarySoft],
  ['Secondary Dark', layoutTheme.colors.secondaryDark],
  ['Surface', layoutTheme.colors.surface],
  ['Surface Dark', layoutTheme.colors.surfaceDark],
  ['Ink', layoutTheme.colors.ink],
  ['Ink Dark', layoutTheme.colors.inkDark],
] as const;

const fontTokens = [
  {
    label: 'Body font',
    name: layoutTheme.fonts.body.name,
    previewClassName: 'font-sans',
    sample: 'Readable interface copy and UI text across every page.',
  },
  {
    label: 'Display font',
    name: layoutTheme.fonts.display.name,
    previewClassName: 'font-display',
    sample: 'Headlines, quotes, and section titles use the same display family.',
  },
] as const;

export default function ConfigLayoutPage() {
  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary-soft/85 text-primary dark:bg-primary/20 dark:text-primary-dark border border-primary/20 dark:border-primary-dark/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Single source of truth
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink dark:text-ink-dark mb-4 leading-tight">
            Config Layout
          </h1>
          <p className="max-w-3xl text-lg text-ink-muted dark:text-ink-dark-muted leading-relaxed">
            Edit <span className="font-mono text-sm text-primary dark:text-primary-dark">app/config-layout/theme.ts</span> to change the primary and secondary colors, the shared fonts, and the route-level styling presets used by the strategy pages.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/product-strategy"
              className="inline-flex items-center gap-2 rounded-xl bg-white/70 dark:bg-surface-dark/70 border border-white/70 dark:border-border-dark/50 px-4 py-2 text-sm font-semibold text-ink dark:text-ink-dark shadow-sm hover:border-primary/35 dark:hover:border-primary-dark/35 hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              Go to strategy overview
            </Link>
            <span className="inline-flex items-center rounded-xl bg-secondary-soft/55 dark:bg-secondary/15 px-4 py-2 text-sm font-medium text-secondary dark:text-secondary-dark">
              Tailwind and global CSS already read from this file.
            </span>
          </div>
        </header>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-display text-2xl font-bold text-ink dark:text-ink-dark">
              Core tokens
            </h2>
            <p className="text-sm text-ink-muted dark:text-ink-dark-muted">
              Update a hex value once and the shared app shell follows.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {colorTokens.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-white/75 dark:bg-surface-dark/70 border border-white/70 dark:border-border-dark/50 p-4 shadow-sm"
              >
                <div
                  className="h-16 rounded-xl border border-black/5 dark:border-white/10 mb-3"
                  style={{ backgroundColor: value }}
                />
                <p className="text-sm font-semibold text-ink dark:text-ink-dark">{label}</p>
                <p className="text-xs text-ink-muted dark:text-ink-dark-muted mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-display text-2xl font-bold text-ink dark:text-ink-dark">
              Typography
            </h2>
            <p className="text-sm text-ink-muted dark:text-ink-dark-muted">
              Body and display fonts are configured alongside the color tokens.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fontTokens.map((fontToken) => (
              <div
                key={fontToken.label}
                className="rounded-2xl bg-white/75 dark:bg-surface-dark/70 border border-white/70 dark:border-border-dark/50 p-6 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-ink-dark-muted mb-3">
                  {fontToken.label}
                </p>
                <p className={`text-3xl text-ink dark:text-ink-dark ${fontToken.previewClassName}`}>
                  {fontToken.name}
                </p>
                <p className={`mt-3 text-base text-ink-muted dark:text-ink-dark-muted ${fontToken.previewClassName}`}>
                  {fontToken.sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-display text-2xl font-bold text-ink dark:text-ink-dark">
              Route presets
            </h2>
            <p className="text-sm text-ink-muted dark:text-ink-dark-muted">
              Strategy pages read these shared presets instead of owning their own badge and nav colors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {strategyThemeOrder.map((themeKey) => {
              const theme = strategyPageThemes[themeKey as StrategyThemeKey];

              return (
                <Link
                  key={theme.route}
                  href={theme.route}
                  className="group rounded-2xl bg-white/75 dark:bg-surface-dark/70 border border-white/70 dark:border-border-dark/50 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${theme.introBadgeClassName}`}>
                      {theme.label}
                    </span>
                    <span className={`text-xs font-semibold ${theme.navLinkClassName}`}>
                      Open route
                    </span>
                  </div>
                  <p className="font-display text-xl font-bold text-ink dark:text-ink-dark mb-2 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                    {theme.label}
                  </p>
                  <p className="text-sm text-ink-muted dark:text-ink-dark-muted leading-relaxed mb-4">
                    {theme.summary}
                  </p>
                  <div className="text-xs text-ink-muted dark:text-ink-dark-muted space-y-2">
                    <p>
                      <span className="font-semibold text-ink dark:text-ink-dark">Route:</span>{' '}
                      {theme.route}
                    </p>
                    <p>
                      <span className="font-semibold text-ink dark:text-ink-dark">Edit source:</span>{' '}
                      <span className="font-mono">app/config-layout/theme.ts</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-white/70 dark:bg-surface-dark/70 border border-white/70 dark:border-border-dark/50 p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-ink dark:text-ink-dark mb-4">
            How to use it
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl bg-primary-soft/55 dark:bg-primary/15 p-5">
              <p className="font-semibold text-primary dark:text-primary-dark mb-2">1. Edit tokens</p>
              <p className="text-ink dark:text-ink-dark">
                Change the color hex values or font names in <span className="font-mono text-xs">app/config-layout/theme.ts</span>.
              </p>
            </div>
            <div className="rounded-2xl bg-secondary-soft/55 dark:bg-secondary/15 p-5">
              <p className="font-semibold text-secondary dark:text-secondary-dark mb-2">2. Tailwind follows</p>
              <p className="text-ink dark:text-ink-dark">
                The Tailwind theme extension and root CSS variables are generated from the same file.
              </p>
            </div>
            <div className="rounded-2xl bg-white/70 dark:bg-surface-dark-subtle/70 border border-border/40 dark:border-border-dark/40 p-5">
              <p className="font-semibold text-ink dark:text-ink-dark mb-2">3. Pages update</p>
              <p className="text-ink-muted dark:text-ink-dark-muted">
                Strategy route badges, links, shared cards, and the global shell reflect the updated tokens.
              </p>
            </div>
          </div>
        </section>
      </main>

      <StrategyFooter message="EasyLoops · Layout configuration preview." />
    </div>
  );
}