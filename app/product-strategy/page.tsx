import Link from 'next/link';
import { strategyPageThemes } from '@/app/config-layout/theme';
import { SimpleHeader } from '@/shared/components';
import { FeatureCard, StrategyFooter } from '@/shared/components/strategy-page';

const stages = [
  {
    number: '01',
    title: 'Competitor Scan',
    description:
      'In-depth analysis of 50 global and 50 Indian learning platforms — pricing, features, and content-creation models.',
    href: '/product-strategy/competitor-scan',
    badge: 'Stage 1',
  },
  {
    number: '02',
    title: 'Position · Promotion · Price',
    description:
      "EasyLoops's Unique Value Proposition, go-to-market promotion plan, and freemium pricing strategy.",
    href: '/product-strategy/positioning',
    badge: 'Stage 1',
  },
  {
    number: '03',
    title: 'Customer Engagement & KPIs',
    description:
      'Gamification, loyalty programmes, feedback loops, and the metrics that define growth.',
    href: '/product-strategy/positioning#engagement',
    badge: 'Stage 2',
  },
  {
    number: '04',
    title: 'Resources',
    description:
      'Supporting documents and research material used to build this strategy.',
    href: '/product-strategy/resources',
    badge: 'References',
  },
  {
    number: '05',
    title: 'Feedback Links',
    description:
      'Surveys, polls, and beta-tester channels for ongoing learner feedback and product improvement.',
    href: '/product-strategy/feedback',
    badge: 'Stage 2',
  },
  {
    number: '06',
    title: 'Company Hiring Tiers',
    description:
      'All Indian SE / SDE hiring companies classified into Tier-1 (≥₹10 LPA), Tier-2 (₹4.5–10 LPA), and Tier-3 (≤₹4.5 LPA) with exam patterns.',
    href: '/product-strategy/hiring-tiers',
    badge: 'Course Ref',
  },
];

const audienceSegments = [
  { label: 'Students', detail: 'High school & college learners', icon: '🎓' },
  { label: 'Professionals', detail: 'Upskilling & certification seekers', icon: '💼' },
  { label: 'Lifelong Learners', detail: 'Hobbyists & language learners', icon: '📚' },
];

export default function ProductStrategyPage() {
  const pageTheme = strategyPageThemes.overview;
  const overviewStages = stages.map((stage, index) => ({
    ...stage,
    color:
      [
        'from-primary to-secondary',
        'from-secondary to-primary-dark',
        'from-primary-dark to-secondary-dark',
        'from-secondary to-primary-soft',
        'from-primary to-primary-dark',
        'from-secondary-dark to-primary',
      ][index] ?? 'from-primary to-secondary',
  }));

  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <header className="text-center mb-16">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 ${pageTheme.introBadgeClassName}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Internal Document
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-ink dark:text-ink-dark mb-5 leading-[1.1]">
            EasyLoops
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-secondary dark:from-primary-dark dark:via-primary-soft dark:to-secondary-dark">
              Market Placement Strategy
            </span>
          </h1>
          <p className="text-lg text-ink-muted dark:text-ink-dark-muted max-w-2xl mx-auto leading-relaxed">
            A stepwise framework to place EasyLoops in the market with clarity and
            scalability — scalable across regions while keeping our global + local
            identity intact.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/config-layout"
              className="inline-flex items-center gap-2 rounded-xl bg-white/70 dark:bg-surface-dark/70 border border-white/70 dark:border-border-dark/50 px-4 py-2 text-sm font-semibold text-ink dark:text-ink-dark shadow-sm hover:border-primary/35 dark:hover:border-primary-dark/35 hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              Configure layout tokens
            </Link>
          </div>
        </header>

        {/* UVP callout */}
        <div className="relative overflow-hidden bg-white/55 dark:bg-surface-dark/70 backdrop-blur-md border border-white/70 dark:border-border-dark/40 rounded-2xl p-8 mb-12 text-center shadow-md shadow-primary/10">
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgb(var(--theme-color-primary-rgb) / 1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgb(var(--theme-color-secondary-rgb) / 1) 0%, transparent 50%)',
            }}
          />
          <p className="relative text-xs uppercase tracking-widest font-bold text-primary dark:text-primary-dark mb-3">
            Unique Value Proposition
          </p>
          <blockquote className="relative font-display text-xl md:text-2xl font-bold text-ink dark:text-ink-dark italic leading-relaxed mb-3">
            &quot;Learn anywhere, in your language, with structured loops that make
            knowledge stick.&quot;
          </blockquote>
          <p className="relative text-sm text-ink-muted dark:text-ink-dark-muted">
            Multilingual sub-pages (Hindi, Telugu, Tamil, Kannada) + global English hub
          </p>
        </div>

        {/* Audience segments */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-ink dark:text-ink-dark mb-5">
            Target Audience Segments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {audienceSegments.map((s) => (
              <FeatureCard
                key={s.label}
                icon={s.icon}
                title={s.label}
                description={s.detail}
                descriptionClassName="mt-1"
              />
            ))}
          </div>
        </section>

        {/* Gap identification */}
        <div className="flex gap-4 items-start bg-white/60 dark:bg-surface-dark/75 backdrop-blur-md border border-white/70 dark:border-border-dark/45 rounded-2xl p-6 mb-12 shadow-md shadow-secondary/10">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary-soft/70 dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-secondary-dark">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-secondary dark:text-secondary-dark mb-1">
              Gap Identification
            </p>
            <p className="text-ink dark:text-ink-dark text-base leading-relaxed">
              Affordable, multilingual, community-driven learning with global + regional resonance.
              Competitors such as Coursera, Udemy, BYJU&apos;S, and Unacademy leave this space
              largely unaddressed.
            </p>
          </div>
        </div>

        {/* Strategy cards */}
        <section>
          <h2 className="font-display text-xl font-bold text-ink dark:text-ink-dark mb-6">
            Strategy Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {overviewStages.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative bg-white/65 dark:bg-surface-dark/70 backdrop-blur-md rounded-2xl border border-white/70 dark:border-border-dark/50 overflow-hidden shadow-md shadow-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl font-black text-ink-muted/35 dark:text-ink-dark-muted/20 select-none leading-none">
                      {s.number}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${s.color} text-white shadow-sm select-none`}>
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-ink dark:text-ink-dark mb-2 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-muted dark:text-ink-dark-muted leading-relaxed">{s.description}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-ink-muted/80 dark:text-ink-dark-muted/70 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                    <span>Explore</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <StrategyFooter
        message="EasyLoops · Internal strategy document — not for public distribution."
        className="border-border dark:border-border-dark py-8 mt-16"
        textClassName="text-ink-muted dark:text-ink-dark-muted"
      />
    </div>
  );
}
