import { strategyPageThemes } from '@/app/config-layout/theme';
import { SimpleHeader } from '@/shared/components';
import {
  ResourceLinkCard,
  StrategyBreadcrumb,
  StrategyFooter,
  StrategyPageIntro,
  StrategyPageNav,
} from '@/shared/components/strategy-page';

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
  const pageTheme = strategyPageThemes.resources;

  return (
    <div className="min-h-screen transition-colors">
      <SimpleHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StrategyBreadcrumb
          current="Resources"
          linkClassName={pageTheme.breadcrumbLinkClassName}
        />

        <StrategyPageIntro
          badge="References"
          badgeClassName={pageTheme.introBadgeClassName}
          title="Resources"
          description="Supporting documents and research material used to build this market placement strategy."
        />

        <section className="space-y-4 mb-12">
          {resources.map((r) => (
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
          left={{ href: '/product-strategy/positioning', label: '← Position · Promotion · Price' }}
          right={{ href: '/product-strategy/feedback', label: 'Feedback Links →' }}
          linkClassName={pageTheme.navLinkClassName}
        />
      </main>

      <StrategyFooter message="EasyLoops. Internal strategy document." />
    </div>
  );
}
