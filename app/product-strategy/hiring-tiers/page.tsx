'use client';

import { useState } from 'react';
import { strategyPageThemes } from '@/app/config-layout/theme';
import { StrategyDetailPageShell } from '@/shared/components/strategy-page';
import type { Tier } from './hiring-tiers.data';
import { loadHiringTiersDataset } from './hiring-tiers.loader';
import { tierSummaries } from './hiring-tiers.meta';
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

type HiringTiersPageContentProps = {
  initialTiers?: Tier[];
  loadTiers?: () => Promise<Tier[]>;
};

export function HiringTiersPageContent({
  initialTiers,
  loadTiers = loadHiringTiersDataset,
}: HiringTiersPageContentProps) {
  const pageTheme = strategyPageThemes.hiringTiers;
  const [allTiers, setAllTiers] = useState<Tier[] | null>(initialTiers ?? null);
  const [openTiers, setOpenTiers] = useState<Set<string>>(new Set());
  const [openCompanies, setOpenCompanies] = useState<Set<string>>(new Set());
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [loadingTierId, setLoadingTierId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const query = search.trim();
  const searchActive = query.length > 0;
  const filteredTiers = allTiers ? filterHiringTiers(allTiers, search) : [];
  const activeTiers = searchActive && allTiers
    ? new Set(filteredTiers.map((tier) => tier.id))
    : openTiers;
  const resultCount = allTiers ? countHiringTierCompanies(filteredTiers) : 0;
  const visibleTiers = searchActive
    ? filteredTiers
    : allTiers ?? tierSummaries;

  const ensureDatasetLoaded = async () => {
    if (allTiers) {
      return allTiers;
    }

    setIsDataLoading(true);

    try {
      const nextTiers = await loadTiers();
      setAllTiers((currentTiers) => currentTiers ?? nextTiers);
      return nextTiers;
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (value.trim() && !allTiers) {
      void ensureDatasetLoaded();
    }
  };

  const toggleTier = async (id: string) => {
    if (!allTiers) {
      setLoadingTierId(id);

      try {
        await ensureDatasetLoaded();
      } finally {
        setLoadingTierId(null);
      }
    }

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
      introChildren={<HiringTiersLegend tiers={tierSummaries} />}
      navClassName="pt-6 mt-8"
    >
      <HiringTiersSearch value={search} onChange={handleSearchChange} />
      <HiringTiersResultSummary query={query} resultCount={resultCount} isLoading={searchActive && isDataLoading && !allTiers} />
      <HiringTiersAccordionList
        tiers={visibleTiers}
        activeTiers={activeTiers}
        openCompanies={openCompanies}
        searchActive={searchActive}
        onToggleTier={toggleTier}
        onToggleCompany={toggleCompany}
        isLoading={searchActive && isDataLoading && !allTiers}
        loadingTierId={loadingTierId}
      />
      <CoreModulesCallout />
    </StrategyDetailPageShell>
  );
}

export default function HiringTiersPage() {
  return <HiringTiersPageContent />;
}
