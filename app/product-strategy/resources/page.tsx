import { strategyPageThemes } from '@/app/config-layout/theme';
import {
  ResourceLinkCard,
  StrategyDetailPageShell,
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
    <StrategyDetailPageShell
      current="Resources"
      badge="References"
      title="Resources"
      description="Supporting documents and research material used to build this market placement strategy."
      breadcrumbLinkClassName={pageTheme.breadcrumbLinkClassName}
      introBadgeClassName={pageTheme.introBadgeClassName}
      navLinkClassName={pageTheme.navLinkClassName}
      leftNav={{ href: '/product-strategy/positioning', label: '← Position · Promotion · Price' }}
      rightNav={{ href: '/product-strategy/feedback', label: 'Feedback Links →' }}
      footerMessage="EasyLoops. Internal strategy document."
      mainClassName="max-w-3xl"
    >
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
    </StrategyDetailPageShell>
  );
}
