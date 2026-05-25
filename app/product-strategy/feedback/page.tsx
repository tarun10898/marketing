import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

const feedbackLinks = [
  {
    title: 'Payments Feedback',
    description: 'Spreadsheet collecting payments-related feedback from users.',
    href: 'https://1drv.ms/x/c/ad1dcae350651760/IQDgZMm8ckmOSIaEglk8sPoLAUdIh3Bf9bcIx5FyBXz71fQ?e=wzSCZV',
    type: 'OneDrive Excel',
    icon: '📊',
  },
  {
    title: 'Interview Feedback Form',
    description: 'Google Form used to collect structured feedback from interview sessions.',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdnoa2EW-ZCIQppkR3r-Oz2iGQ6NX-nkmJnyQZSe2OE3qp7bw/viewform?usp=publish-editor',
    type: 'Google Form',
    icon: '📋',
  },
  {
    title: 'Interview Feedback Responses',
    description: 'Google Spreadsheet containing all collected interview feedback responses.',
    href: 'https://docs.google.com/spreadsheets/d/1HnI7Vj9xHbICv4ILeQGfNfdlipYp8Gpj/edit?usp=sharing&ouid=103094024624998087669&rtpof=true&sd=true',
    type: 'Google Sheets',
    icon: '📝',
  },
];

export default function FeedbackPage() {
  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link
            href="/product-strategy"
            className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            Product Strategy
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Feedback Links</span>
        </nav>

        <header className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 mb-3">
            Stage 2
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Feedback Links
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Feedback forms, surveys, and response sheets used to gather learner and interview
            insights.
          </p>
        </header>

        <section className="space-y-4 mb-12">
          {feedbackLinks.map((r) => (
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
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {r.title}
                  </p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {r.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{r.description}</p>
                <p className="text-xs text-rose-600 dark:text-rose-400 truncate">{r.href}</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-rose-500 transition-colors flex-shrink-0 mt-1"
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
            href="/product-strategy/resources"
            className="text-sm text-rose-600 dark:text-rose-400 hover:underline"
          >
            ← Resources
          </Link>
          <Link
            href="/product-strategy"
            className="text-sm text-rose-600 dark:text-rose-400 hover:underline"
          >
            Strategy Overview →
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 px-6 text-center text-sm text-gray-400 dark:text-gray-500 mt-12">
        © {new Date().getFullYear()} EasyLoops. Internal strategy document.
      </footer>
    </div>
  );
}
