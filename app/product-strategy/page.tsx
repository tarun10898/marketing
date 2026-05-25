import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

const stages = [
  {
    number: '01',
    title: 'Competitor Scan',
    description:
      'In-depth analysis of 50 global and 50 Indian learning platforms — pricing, features, and content-creation models.',
    href: '/product-strategy/competitor-scan',
    color: 'from-blue-500 to-blue-700',
    badge: 'Stage 1',
  },
  {
    number: '02',
    title: 'Position · Promotion · Price',
    description:
      "EasyLoops's Unique Value Proposition, go-to-market promotion plan, and freemium pricing strategy.",
    href: '/product-strategy/positioning',
    color: 'from-violet-500 to-violet-700',
    badge: 'Stage 1',
  },
  {
    number: '03',
    title: 'Customer Engagement & KPIs',
    description:
      'Gamification, loyalty programmes, feedback loops, and the metrics that define growth.',
    href: '/product-strategy/positioning#engagement',
    color: 'from-emerald-500 to-emerald-700',
    badge: 'Stage 2',
  },
  {
    number: '04',
    title: 'Resources',
    description:
      'Supporting documents and research material used to build this strategy.',
    href: '/product-strategy/resources',
    color: 'from-amber-500 to-amber-700',
    badge: 'References',
  },
  {
    number: '05',
    title: 'Feedback Links',
    description:
      'Surveys, polls, and beta-tester channels for ongoing learner feedback and product improvement.',
    href: '/product-strategy/feedback',
    color: 'from-rose-500 to-rose-700',
    badge: 'Stage 2',
  },
  {
    number: '06',
    title: 'Company Hiring Tiers',
    description:
      'All Indian SE / SDE hiring companies classified into Tier-1 (≥₹10 LPA), Tier-2 (₹4.5–10 LPA), and Tier-3 (≤₹4.5 LPA) with exam patterns.',
    href: '/product-strategy/hiring-tiers',
    color: 'from-slate-500 to-slate-700',
    badge: 'Course Ref',
  },
];

const audienceSegments = [
  { label: 'Students', detail: 'High school & college learners', icon: '🎓' },
  { label: 'Professionals', detail: 'Upskilling & certification seekers', icon: '💼' },
  { label: 'Lifelong Learners', detail: 'Hobbyists & language learners', icon: '📚' },
];

export default function ProductStrategyPage() {
  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 mb-6 border border-indigo-200 dark:border-indigo-800">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Internal Document
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.1]">
            EasyLoops
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 dark:from-indigo-400 dark:via-violet-400 dark:to-blue-400">
              Market Placement Strategy
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A stepwise framework to place EasyLoops in the market with clarity and
            scalability — scalable across regions while keeping our global + local
            identity intact.
          </p>
        </header>

        {/* UVP callout */}
        <div className="relative overflow-hidden bg-white/55 dark:bg-indigo-950/40 backdrop-blur-md border border-white/70 dark:border-indigo-700/40 rounded-2xl p-8 mb-12 text-center shadow-md">
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)' }}
          />
          <p className="relative text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 mb-3">
            Unique Value Proposition
          </p>
          <blockquote className="relative text-xl md:text-2xl font-bold text-slate-800 dark:text-white italic leading-relaxed mb-3">
            &quot;Learn anywhere, in your language, with structured loops that make
            knowledge stick.&quot;
          </blockquote>
          <p className="relative text-sm text-slate-500 dark:text-slate-400">
            Multilingual sub-pages (Hindi, Telugu, Tamil, Kannada) + global English hub
          </p>
        </div>

        {/* Audience segments */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
            Target Audience Segments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {audienceSegments.map((s) => (
              <div
                key={s.label}
                className="bg-white/65 dark:bg-slate-800/55 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/70 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <p className="font-semibold text-slate-900 dark:text-white">{s.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gap identification */}
        <div className="flex gap-4 items-start bg-white/60 dark:bg-emerald-950/30 backdrop-blur-md border border-white/70 dark:border-emerald-700/50 rounded-2xl p-6 mb-12 shadow-md">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-700 dark:text-emerald-400 mb-1">
              Gap Identification
            </p>
            <p className="text-slate-800 dark:text-slate-200 text-base leading-relaxed">
              Affordable, multilingual, community-driven learning with global + regional resonance.
              Competitors such as Coursera, Udemy, BYJU&apos;S, and Unacademy leave this space
              largely unaddressed.
            </p>
          </div>
        </div>

        {/* Strategy cards */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Strategy Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stages.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative bg-white/65 dark:bg-slate-800/55 backdrop-blur-md rounded-2xl border border-white/70 dark:border-slate-700/50 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl font-black text-slate-400 dark:text-slate-700 select-none leading-none">
                      {s.number}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${s.color} text-white shadow-sm select-none`}>
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.description}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
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

      <footer className="border-t border-slate-200 dark:border-slate-800/60 py-8 px-6 text-center mt-16">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} EasyLoops · Internal strategy document — not for public distribution.
        </p>
      </footer>
    </div>
  );
}
