import { strategyPageThemes } from '@/app/config-layout/theme';
import { SimpleHeader } from '@/shared/components';
import {
  ResourceLinkCard,
  StrategyBreadcrumb,
  StrategyFooter,
  StrategyPageIntro,
  StrategyPageNav,
} from '@/shared/components/strategy-page';

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
  const pageTheme = strategyPageThemes.feedback;

  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StrategyBreadcrumb
          current="Feedback Links"
          linkClassName={pageTheme.breadcrumbLinkClassName}
        />

        <StrategyPageIntro
          badge="Stage 2"
          badgeClassName={pageTheme.introBadgeClassName}
          title="Feedback Links"
          description="Feedback forms, surveys, and response sheets used to gather learner and interview insights."
        />

        <section className="space-y-4 mb-12">
          {feedbackLinks.map((r) => (
            <ResourceLinkCard
              key={r.href}
              title={r.title}
              description={r.description}
              href={r.href}
              type={r.type}
              icon={r.icon}
              titleClassName={pageTheme.resourceTitleHoverClassName}
              urlClassName={pageTheme.resourceUrlClassName}
              iconClassName={pageTheme.resourceIconHoverClassName}
            />
          ))}
        </section>

        <StrategyPageNav
          left={{ href: '/product-strategy/resources', label: '← Resources' }}
          right={{ href: '/product-strategy', label: 'Strategy Overview →' }}
          linkClassName={pageTheme.navLinkClassName}
        />
      </main>

      <StrategyFooter message="EasyLoops. Internal strategy document." />
    </div>
  );
}
