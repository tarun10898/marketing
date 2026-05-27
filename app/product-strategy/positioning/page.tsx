import { strategyPageThemes } from '@/app/config-layout/theme';
import { SimpleHeader } from '@/shared/components';
import {
  FeatureCard,
  StrategyBreadcrumb,
  StrategyFooter,
  StrategyPageIntro,
  StrategyPageNav,
  StrategySectionTitle,
} from '@/shared/components/strategy-page';

const promotionItems = [
  {
    phase: 'Pre-launch buzz',
    detail: 'Teasers, countdowns, "EasyLoops is coming…" campaigns across social channels.',
  },
  {
    phase: 'Launch campaign',
    detail: 'Influencer collabs with education YouTubers and LinkedIn creators.',
  },
  {
    phase: 'Localized marketing',
    detail: 'Regional language ads and campus activations targeting students directly.',
  },
  {
    phase: 'Global branding',
    detail: 'English-first campaigns highlighting multilingual scalability.',
  },
  {
    phase: 'Website + App (primary hub)',
    detail: 'The core product experience — seamless on desktop and mobile.',
  },
  {
    phase: 'Social media',
    detail: 'Facebook, Instagram, X/Twitter with regional sub-pages for each language.',
  },
  {
    phase: 'Community-driven',
    detail: 'Telegram and Discord groups for learners to share, ask, and grow together.',
  },
];

const pricingTiers = [
  {
    name: 'Free',
    description: 'Intro courses & core exercises',
    price: '₹0 / $0',
    highlight: false,
    features: [
      'Access to introductory courses',
      'Community forum access',
      'Basic progress tracking',
      'Limited language support',
    ],
  },
  {
    name: 'Premium',
    description: 'Advanced tracks & all features',
    price: '$9/mo · $98/yr',
    highlight: true,
    features: [
      'All intro + advanced courses',
      'Multilingual content (Hindi, Telugu, Tamil, Kannada)',
      'Certificates of completion',
      'Priority doubt support',
      'No Cost EMI available (India)',
    ],
  },
  {
    name: 'Global',
    description: 'Parity pricing for international learners',
    price: 'Regionally adjusted',
    highlight: false,
    features: [
      'All Premium features',
      'Pricing matched to local affordability',
      'English-first interface',
      'Global leaderboard access',
    ],
  },
];

const engagementItems = [
  {
    icon: '🎮',
    title: 'Gamification',
    detail: 'Badges, leaderboards, and progress trackers that keep learners motivated.',
  },
  {
    icon: '🪙',
    title: 'Loyalty Programmes',
    detail: 'Referral bonuses and "LoopCoins" redeemable for discounts on premium tiers.',
  },
  {
    icon: '💬',
    title: 'Feedback Loops',
    detail: 'Surveys, polls, and beta-tester cohorts drawn from student communities.',
  },
];

const kpis = [
  { category: 'Acquisition', metrics: 'App downloads · Sign-ups per region' },
  { category: 'Engagement', metrics: 'Course completion rates · Daily active users' },
  { category: 'Retention', metrics: 'Subscription renewals · Churn rate' },
  { category: 'Growth', metrics: 'Market share vs competitors · Social media reach' },
];

export default function PositioningPage() {
  const pageTheme = strategyPageThemes.positioning;

  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StrategyBreadcrumb
          current="Position · Promotion · Price"
          linkClassName={pageTheme.breadcrumbLinkClassName}
        />

        <StrategyPageIntro
          badge="Stage 1"
          badgeClassName={pageTheme.introBadgeClassName}
          title="Position · Promotion · Price"
          description="How EasyLoops is positioned in the market, how we will promote it, and our pricing strategy designed for global + regional affordability."
          descriptionClassName="max-w-2xl"
          className="mb-12"
        />

        {/* Positioning */}
        <section className="mb-14">
          <StrategySectionTitle title="Product Positioning" accentClassName="bg-primary" />

          <div className="bg-white dark:bg-surface-dark-subtle rounded-2xl p-8 border border-border/40 dark:border-border-dark/50 shadow-sm mb-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-primary dark:text-primary-dark mb-2">
              Unique Value Proposition
            </p>
            <blockquote className="font-display text-2xl font-bold text-ink dark:text-ink-dark italic mb-4">
              &quot;Learn anywhere, in your language, with structured loops that make knowledge
              stick.&quot;
            </blockquote>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-primary-soft/35 dark:bg-primary/15 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-dark mb-1">
                  Tone
                </p>
                <p className="text-ink-muted dark:text-ink-dark-muted text-sm">
                  Motivational · Professional · Aspirational
                </p>
              </div>
              <div className="bg-primary-soft/35 dark:bg-primary/15 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-dark mb-1">
                  Key Differentiator
                </p>
                <p className="text-ink-muted dark:text-ink-dark-muted text-sm">
                  Multilingual sub-pages (Hindi, Telugu, Tamil, Kannada) + global English hub
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion */}
        <section className="mb-14">
          <StrategySectionTitle title="Promotion Plan" accentClassName="bg-secondary" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promotionItems.map((item) => (
              <FeatureCard
                key={item.phase}
                title={item.phase}
                description={item.detail}
                titleClassName="mb-1 text-sm"
              />
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-14">
          <StrategySectionTitle title="Pricing Strategy" accentClassName="bg-primary" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 border shadow-sm ${
                  tier.highlight
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white dark:bg-surface-dark-subtle border-border/40 dark:border-border-dark/50'
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white mb-3">
                    Recommended
                  </span>
                )}
                <p
                  className={`text-xl font-bold mb-1 ${
                    tier.highlight ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {tier.name}
                </p>
                <p
                  className={`text-sm mb-3 ${
                    tier.highlight ? 'text-white/80' : 'text-ink-muted dark:text-ink-dark-muted'
                  }`}
                >
                  {tier.description}
                </p>
                <p
                  className={`text-base font-semibold mb-4 ${
                    tier.highlight ? 'text-white' : 'text-ink dark:text-ink-dark'
                  }`}
                >
                  {tier.price}
                </p>
                <ul className="space-y-1.5">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-2 ${
                        tier.highlight ? 'text-white/90' : 'text-ink-muted dark:text-ink-dark-muted'
                      }`}
                    >
                      <span className="mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted/80 dark:text-ink-dark-muted/75 mt-4">
            Freemium model: Free intro courses, premium advanced tracks. No Cost EMI available for
            Indian users. Global pricing adjusted to local affordability while maintaining brand
            premium.
          </p>
        </section>

        {/* Stage 2 – Customer Engagement */}
        <section id="engagement" className="mb-14">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-secondary-soft/80 text-secondary dark:bg-secondary/20 dark:text-secondary-dark mb-3">
              Stage 2
            </span>
          </div>
          <StrategySectionTitle title="Customer Engagement" accentClassName="bg-secondary" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {engagementItems.map((e) => (
              <FeatureCard
                key={e.title}
                icon={e.icon}
                title={e.title}
                description={e.detail}
                titleClassName="mb-1"
              />
            ))}
          </div>

          {/* KPIs */}
          <h3 className="font-display text-lg font-bold text-ink dark:text-ink-dark mb-4">
            Metrics &amp; KPIs
          </h3>
          <div className="overflow-x-auto rounded-xl shadow-sm border border-border dark:border-border-dark">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-surface-subtle dark:bg-surface-dark-subtle text-left">
                  <th className="px-4 py-3 font-semibold text-ink-muted dark:text-ink-dark-muted w-40">Category</th>
                  <th className="px-4 py-3 font-semibold text-ink-muted dark:text-ink-dark-muted">Key Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 dark:divide-border-dark/50">
                {kpis.map((k) => (
                  <tr key={k.category} className="bg-white dark:bg-surface-dark">
                    <td className="px-4 py-3 font-semibold text-ink dark:text-ink-dark">{k.category}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted">{k.metrics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <StrategyPageNav
          left={{ href: '/product-strategy/competitor-scan', label: '← Competitor Scan' }}
          right={{ href: '/product-strategy/resources', label: 'Resources →' }}
          linkClassName={pageTheme.navLinkClassName}
        />
      </main>

      <StrategyFooter message="EasyLoops. Internal strategy document." />
    </div>
  );
}
