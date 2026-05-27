'use client';

import { useState } from 'react';
import { strategyPageThemes } from '@/app/config-layout/theme';
import { StrategyDetailPageShell } from '@/shared/components/strategy-page';
import { tiers } from './hiring-tiers.data';
import {
  countHiringTierCompanies,
  filterHiringTiers,
} from './hiring-tiers.model';
import {
  CoreModulesCallout,
  HiringTiersAccordionList,
  HiringTiersLegend,
  HiringTiersResultSummary,
  HiringTiersSearch,
} from './hiring-tiers.view';

export default function HiringTiersPage() {
  const pageTheme = strategyPageThemes.hiringTiers;
  const [openTiers, setOpenTiers] = useState<Set<string>>(new Set());
  const [openCompanies, setOpenCompanies] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const query = search.trim();
  const filteredTiers = filterHiringTiers(tiers, search);
  const searchActive = query.length > 0;
  const activeTiers = searchActive ? new Set(filteredTiers.map((tier) => tier.id)) : openTiers;
  const resultCount = countHiringTierCompanies(filteredTiers);

  const toggleTier = (id: string) => {
    setOpenTiers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleCompany = (key: string) => {
    setOpenCompanies((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <StrategyDetailPageShell
      current="Hiring Tiers"
      badge="Course Reference"
      title="Company Hiring Tiers"
      description="Indian Software Engineer / SDE / Associate Engineer roles classified by CTC. Click a tier to expand, then click a company to see exam pattern details."
      breadcrumbLinkClassName={pageTheme.breadcrumbLinkClassName}
      introBadgeClassName={pageTheme.introBadgeClassName}
      navLinkClassName={pageTheme.navLinkClassName}
      leftNav={{ href: '/product-strategy', label: '← Strategy Overview' }}
      footerMessage="EasyLoops. Internal course reference document."
      mainClassName="max-w-4xl"
      introDescriptionClassName="max-w-2xl"
      introChildren={<HiringTiersLegend />}
      navClassName="pt-6 mt-8"
    >
      <HiringTiersSearch value={search} onChange={setSearch} />
      <HiringTiersResultSummary query={query} resultCount={resultCount} />
      <HiringTiersAccordionList
        tiers={filteredTiers}
        activeTiers={activeTiers}
        openCompanies={openCompanies}
        searchActive={searchActive}
        onToggleTier={toggleTier}
        onToggleCompany={toggleCompany}
      />
      <CoreModulesCallout />
    </StrategyDetailPageShell>
  );
}
