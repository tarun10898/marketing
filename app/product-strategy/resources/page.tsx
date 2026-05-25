import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

const resources = [
  {
    title: 'EasyLoops Strategy Document',
    description:
      'Full working document covering research, competitor analysis, positioning details, and go-to-market planning for EasyLoops.',
    href: 'https://docs.google.com/document/d/1jaUqPXk46x6VOxAd5-VatKAZCu_SqOdkNp80rdHV6yM/edit?usp=sharing',
    type: 'Google Doc',
    icon: '📄',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/product-strategy" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Product Strategy
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Resources</span>
        </nav>

        <header className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 mb-3">
            References
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Resources</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Supporting documents and research material used to build this market placement
            strategy.
          </p>
        </header>

        <section className="space-y-4 mb-12">
          {resources.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 bg-white/65 dark:bg-slate-800/55 backdrop-blur-md rounded-2xl p-6 border border-white/70 dark:border-slate-700/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl flex-shrink-0">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {r.title}
                  </p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {r.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{r.description}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 truncate">{r.href}</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1"
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
          ))}
        </section>

        {/* Nav */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/product-strategy/positioning"
            className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
          >
            ← Position · Promotion · Price
          </Link>
          <Link
            href="/product-strategy/feedback"
            className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
          >
            Feedback Links →
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 px-6 text-center text-sm text-gray-400 dark:text-gray-500 mt-12">
        © {new Date().getFullYear()} EasyLoops. Internal strategy document.
      </footer>
    </div>
  );
}
