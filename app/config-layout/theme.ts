function hexToRgbChannels(hex: string) {
  const normalized = hex.replace('#', '');
  const fullHex = normalized.length === 3
    ? normalized
        .split('')
        .map((character) => `${character}${character}`)
        .join('')
    : normalized;

  const colorValue = Number.parseInt(fullHex, 16);
  const red = (colorValue >> 16) & 255;
  const green = (colorValue >> 8) & 255;
  const blue = colorValue & 255;

  return `${red} ${green} ${blue}`;
}

const withOpacity = (variableName: string) => `rgb(var(${variableName}) / <alpha-value>)`;

export const layoutTheme = {
  fonts: {
    body: {
      name: 'Inter',
      variable: '--font-body',
      fallback: ['system-ui', 'sans-serif'],
    },
    display: {
      name: 'Space Grotesk',
      variable: '--font-display',
      fallback: ['system-ui', 'sans-serif'],
    },
  },
  colors: {
    primary: '#4f46e5',
    primarySoft: '#c7d2fe',
    primaryForeground: '#eef2ff',
    primaryDark: '#818cf8',
    secondary: '#0891b2',
    secondarySoft: '#bae6fd',
    secondaryForeground: '#ecfeff',
    secondaryDark: '#67e8f9',
    surface: '#dde3f0',
    surfaceSubtle: '#ffffff',
    surfaceDark: '#020617',
    surfaceDarkSubtle: '#0f172a',
    ink: '#0f172a',
    inkMuted: '#475569',
    inkDark: '#f1f5f9',
    inkDarkMuted: '#cbd5e1',
    border: '#cbd5e1',
    borderDark: '#475569',
  },
} as const;

export const rootThemeVariables = {
  '--theme-color-primary': layoutTheme.colors.primary,
  '--theme-color-primary-rgb': hexToRgbChannels(layoutTheme.colors.primary),
  '--theme-color-primary-soft': layoutTheme.colors.primarySoft,
  '--theme-color-primary-soft-rgb': hexToRgbChannels(layoutTheme.colors.primarySoft),
  '--theme-color-primary-foreground': layoutTheme.colors.primaryForeground,
  '--theme-color-primary-foreground-rgb': hexToRgbChannels(layoutTheme.colors.primaryForeground),
  '--theme-color-primary-dark': layoutTheme.colors.primaryDark,
  '--theme-color-primary-dark-rgb': hexToRgbChannels(layoutTheme.colors.primaryDark),
  '--theme-color-secondary': layoutTheme.colors.secondary,
  '--theme-color-secondary-rgb': hexToRgbChannels(layoutTheme.colors.secondary),
  '--theme-color-secondary-soft': layoutTheme.colors.secondarySoft,
  '--theme-color-secondary-soft-rgb': hexToRgbChannels(layoutTheme.colors.secondarySoft),
  '--theme-color-secondary-foreground': layoutTheme.colors.secondaryForeground,
  '--theme-color-secondary-foreground-rgb': hexToRgbChannels(layoutTheme.colors.secondaryForeground),
  '--theme-color-secondary-dark': layoutTheme.colors.secondaryDark,
  '--theme-color-secondary-dark-rgb': hexToRgbChannels(layoutTheme.colors.secondaryDark),
  '--theme-color-surface': layoutTheme.colors.surface,
  '--theme-color-surface-rgb': hexToRgbChannels(layoutTheme.colors.surface),
  '--theme-color-surface-subtle': layoutTheme.colors.surfaceSubtle,
  '--theme-color-surface-subtle-rgb': hexToRgbChannels(layoutTheme.colors.surfaceSubtle),
  '--theme-color-surface-dark': layoutTheme.colors.surfaceDark,
  '--theme-color-surface-dark-rgb': hexToRgbChannels(layoutTheme.colors.surfaceDark),
  '--theme-color-surface-dark-subtle': layoutTheme.colors.surfaceDarkSubtle,
  '--theme-color-surface-dark-subtle-rgb': hexToRgbChannels(layoutTheme.colors.surfaceDarkSubtle),
  '--theme-color-ink': layoutTheme.colors.ink,
  '--theme-color-ink-rgb': hexToRgbChannels(layoutTheme.colors.ink),
  '--theme-color-ink-muted': layoutTheme.colors.inkMuted,
  '--theme-color-ink-muted-rgb': hexToRgbChannels(layoutTheme.colors.inkMuted),
  '--theme-color-ink-dark': layoutTheme.colors.inkDark,
  '--theme-color-ink-dark-rgb': hexToRgbChannels(layoutTheme.colors.inkDark),
  '--theme-color-ink-dark-muted': layoutTheme.colors.inkDarkMuted,
  '--theme-color-ink-dark-muted-rgb': hexToRgbChannels(layoutTheme.colors.inkDarkMuted),
  '--theme-color-border': layoutTheme.colors.border,
  '--theme-color-border-rgb': hexToRgbChannels(layoutTheme.colors.border),
  '--theme-color-border-dark': layoutTheme.colors.borderDark,
  '--theme-color-border-dark-rgb': hexToRgbChannels(layoutTheme.colors.borderDark),
} as const;

export const tailwindThemeExtension = {
  colors: {
    primary: withOpacity('--theme-color-primary-rgb'),
    'primary-soft': withOpacity('--theme-color-primary-soft-rgb'),
    'primary-foreground': withOpacity('--theme-color-primary-foreground-rgb'),
    'primary-dark': withOpacity('--theme-color-primary-dark-rgb'),
    secondary: withOpacity('--theme-color-secondary-rgb'),
    'secondary-soft': withOpacity('--theme-color-secondary-soft-rgb'),
    'secondary-foreground': withOpacity('--theme-color-secondary-foreground-rgb'),
    'secondary-dark': withOpacity('--theme-color-secondary-dark-rgb'),
    surface: withOpacity('--theme-color-surface-rgb'),
    'surface-subtle': withOpacity('--theme-color-surface-subtle-rgb'),
    'surface-dark': withOpacity('--theme-color-surface-dark-rgb'),
    'surface-dark-subtle': withOpacity('--theme-color-surface-dark-subtle-rgb'),
    ink: withOpacity('--theme-color-ink-rgb'),
    'ink-muted': withOpacity('--theme-color-ink-muted-rgb'),
    'ink-dark': withOpacity('--theme-color-ink-dark-rgb'),
    'ink-dark-muted': withOpacity('--theme-color-ink-dark-muted-rgb'),
    border: withOpacity('--theme-color-border-rgb'),
    'border-dark': withOpacity('--theme-color-border-dark-rgb'),
  },
  fontFamily: {
    sans: [`var(${layoutTheme.fonts.body.variable})`, ...layoutTheme.fonts.body.fallback],
    display: [`var(${layoutTheme.fonts.display.variable})`, ...layoutTheme.fonts.display.fallback],
  },
};

type StrategyPageTheme = {
  route: string;
  label: string;
  summary: string;
  breadcrumbLinkClassName: string;
  introBadgeClassName: string;
  navLinkClassName: string;
  resourceTitleHoverClassName?: string;
  resourceUrlClassName?: string;
  resourceIconHoverClassName?: string;
};

export const strategyPageThemes = {
  overview: {
    route: '/product-strategy',
    label: 'Strategy Overview',
    summary: 'Primary brand shell, hero chip, gradients, and internal layout-config entry point.',
    breadcrumbLinkClassName: 'hover:text-primary dark:hover:text-primary-dark transition-colors',
    introBadgeClassName:
      'bg-primary-soft/85 text-primary dark:bg-primary/20 dark:text-primary-dark border border-primary/20 dark:border-primary-dark/30',
    navLinkClassName: 'text-sm text-primary dark:text-primary-dark hover:underline',
  },
  competitorScan: {
    route: '/product-strategy/competitor-scan',
    label: 'Competitor Scan',
    summary: 'Primary accents drive the global table, while secondary accents differentiate the India comparison.',
    breadcrumbLinkClassName: 'hover:text-primary dark:hover:text-primary-dark transition-colors',
    introBadgeClassName:
      'bg-primary-soft/80 text-primary dark:bg-primary/20 dark:text-primary-dark',
    navLinkClassName: 'text-sm text-primary dark:text-primary-dark hover:underline',
  },
  positioning: {
    route: '/product-strategy/positioning',
    label: 'Positioning',
    summary: 'Primary owns positioning and pricing. Secondary accents customer engagement and supporting panels.',
    breadcrumbLinkClassName: 'hover:text-primary dark:hover:text-primary-dark transition-colors',
    introBadgeClassName:
      'bg-primary-soft/80 text-primary dark:bg-primary/20 dark:text-primary-dark',
    navLinkClassName: 'text-sm text-primary dark:text-primary-dark hover:underline',
  },
  resources: {
    route: '/product-strategy/resources',
    label: 'Resources',
    summary: 'Secondary-accent outbound resource cards and navigation.',
    breadcrumbLinkClassName: 'hover:text-secondary dark:hover:text-secondary-dark transition-colors',
    introBadgeClassName:
      'bg-secondary-soft/80 text-secondary dark:bg-secondary/20 dark:text-secondary-dark',
    navLinkClassName: 'text-sm text-secondary dark:text-secondary-dark hover:underline',
    resourceTitleHoverClassName:
      'group-hover:text-secondary dark:group-hover:text-secondary-dark',
    resourceUrlClassName: 'text-secondary dark:text-secondary-dark',
    resourceIconHoverClassName: 'group-hover:text-secondary',
  },
  feedback: {
    route: '/product-strategy/feedback',
    label: 'Feedback',
    summary: 'Primary-accent form and sheet links with shared resource card styling.',
    breadcrumbLinkClassName: 'hover:text-primary dark:hover:text-primary-dark transition-colors',
    introBadgeClassName:
      'bg-primary-soft/80 text-primary dark:bg-primary/20 dark:text-primary-dark',
    navLinkClassName: 'text-sm text-primary dark:text-primary-dark hover:underline',
    resourceTitleHoverClassName: 'group-hover:text-primary dark:group-hover:text-primary-dark',
    resourceUrlClassName: 'text-primary dark:text-primary-dark',
    resourceIconHoverClassName: 'group-hover:text-primary',
  },
  hiringTiers: {
    route: '/product-strategy/hiring-tiers',
    label: 'Popular Companies Students and Experienced Ones Know',
    summary: 'Primary theme tokens own the page shell, search controls, and footer note while tier semantics stay domain-specific.',
    breadcrumbLinkClassName: 'hover:text-primary dark:hover:text-primary-dark transition-colors',
    introBadgeClassName:
      'bg-primary-soft/35 dark:bg-primary/15 text-primary dark:text-primary-dark',
    navLinkClassName: 'text-sm text-primary dark:text-primary-dark hover:underline',
  },
} as const satisfies Record<string, StrategyPageTheme>;

export const strategyThemeOrder = [
  'overview',
  'competitorScan',
  'positioning',
  'resources',
  'feedback',
  'hiringTiers',
] as const;

export type StrategyThemeKey = (typeof strategyThemeOrder)[number];