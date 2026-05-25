import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

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
  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/product-strategy" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Product Strategy
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Position · Promotion · Price</span>
        </nav>

        <header className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300 mb-3">
            Stage 1
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Position · Promotion · Price
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            How EasyLoops is positioned in the market, how we will promote it, and our pricing
            strategy designed for global + regional affordability.
          </p>
        </header>

        {/* Positioning */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="inline-block w-1 h-7 rounded bg-violet-500" />
            Product Positioning
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-violet-600 dark:text-violet-400 mb-2">
              Unique Value Proposition
            </p>
            <blockquote className="text-2xl font-bold text-gray-800 dark:text-white italic mb-4">
              &quot;Learn anywhere, in your language, with structured loops that make knowledge
              stick.&quot;
            </blockquote>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400 mb-1">
                  Tone
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Motivational · Professional · Aspirational
                </p>
              </div>
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400 mb-1">
                  Key Differentiator
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Multilingual sub-pages (Hindi, Telugu, Tamil, Kannada) + global English hub
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="inline-block w-1 h-7 rounded bg-pink-500" />
            Promotion Plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promotionItems.map((item) => (
              <div
                key={item.phase}
                className="bg-white/65 dark:bg-slate-800/55 backdrop-blur-md rounded-xl p-5 border border-white/70 dark:border-slate-700/50 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <p className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">
                  {item.phase}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="inline-block w-1 h-7 rounded bg-emerald-500" />
            Pricing Strategy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 border shadow-sm ${
                  tier.highlight
                    ? 'bg-violet-600 border-violet-500 text-white'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
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
                    tier.highlight ? 'text-violet-200' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {tier.description}
                </p>
                <p
                  className={`text-base font-semibold mb-4 ${
                    tier.highlight ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {tier.price}
                </p>
                <ul className="space-y-1.5">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-2 ${
                        tier.highlight ? 'text-violet-100' : 'text-gray-600 dark:text-gray-300'
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
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Freemium model: Free intro courses, premium advanced tracks. No Cost EMI available for
            Indian users. Global pricing adjusted to local affordability while maintaining brand
            premium.
          </p>
        </section>

        {/* Stage 2 – Customer Engagement */}
        <section id="engagement" className="mb-14">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 mb-3">
              Stage 2
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="inline-block w-1 h-7 rounded bg-teal-500" />
            Customer Engagement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {engagementItems.map((e) => (
              <div
                key={e.title}
                className="bg-white/65 dark:bg-slate-800/55 backdrop-blur-md rounded-xl p-5 border border-white/70 dark:border-slate-700/50 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-2xl mb-3">{e.icon}</div>
                <p className="font-semibold text-slate-900 dark:text-white mb-1">{e.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{e.detail}</p>
              </div>
            ))}
          </div>

          {/* KPIs */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Metrics &amp; KPIs
          </h3>
          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 w-40">Category</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Key Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {kpis.map((k) => (
                  <tr key={k.category} className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">{k.category}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{k.metrics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Nav */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/product-strategy/competitor-scan"
            className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
          >
            ← Competitor Scan
          </Link>
          <Link
            href="/product-strategy/resources"
            className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
          >
            Resources →
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 px-6 text-center text-sm text-gray-400 dark:text-gray-500 mt-12">
        © {new Date().getFullYear()} EasyLoops. Internal strategy document.
      </footer>
    </div>
  );
}
