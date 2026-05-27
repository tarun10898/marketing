'use client';

import { useState } from 'react';
import { strategyPageThemes } from '@/app/config-layout/theme';
import { StrategyDetailPageShell } from '@/shared/components/strategy-page';
import type { Tier } from './hiring-tiers.data';
import { loadHiringTiersDataset } from './hiring-tiers.loader';
import { tierSummaries } from './hiring-tiers.meta';
import {
  countNestedHiringTierCompanies,
  getNestedHiringTiers,
  initialNestedGroups,
} from './hiring-tiers.model';
import {
  CoreModulesCallout,
  HiringTiersAccordionList,
  HiringTiersLegend,
  HiringTiersResultSummary,
  HiringTiersFilterControls,
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
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [openSubGroups, setOpenSubGroups] = useState<Set<string>>(new Set());
  const [openCompanies, setOpenCompanies] = useState<Set<string>>(new Set());
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [search, setSearch] = useState('');

  const query = search.trim();
  const searchActive = query.length > 0;

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

  const toggleGroup = async (groupId: string) => {
    if (!allTiers) {
      await ensureDatasetLoaded();
    }

    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  const toggleSubGroup = async (subGroupId: string) => {
    if (!allTiers) {
      await ensureDatasetLoaded();
    }

    setOpenSubGroups((prev) => {
      const next = new Set(prev);
      next.has(subGroupId) ? next.delete(subGroupId) : next.add(subGroupId);
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

  const nestedGroups = allTiers
    ? getNestedHiringTiers(allTiers, search)
    : initialNestedGroups;

  // Auto-expand everything when searching, otherwise use manual toggles
  const activeGroups = searchActive
    ? new Set(nestedGroups.map((g) => g.id))
    : openGroups;

  const activeSubGroups = searchActive
    ? new Set(nestedGroups.flatMap((g) => g.subGroups.map((sub) => sub.id)))
    : openSubGroups;

  const resultCount = allTiers ? countNestedHiringTierCompanies(nestedGroups) : 0;

  return (
    <StrategyDetailPageShell
      current="Hiring Tiers"
      badge="Course Reference"
      title="Company Hiring Tiers"
      description="Indian Software Engineer / SDE / Associate Engineer roles classified by CTC. Click a category to expand, then click a company to see exam pattern details."
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
      <HiringTiersFilterControls
        search={search}
        onSearchChange={handleSearchChange}
      />
      <HiringTiersResultSummary
        query={query}
        resultCount={resultCount}
        isLoading={searchActive && isDataLoading && !allTiers}
      />
      <HiringTiersAccordionList
        groups={nestedGroups}
        openGroups={activeGroups}
        openSubGroups={activeSubGroups}
        openCompanies={openCompanies}
        searchActive={searchActive}
        onToggleGroup={toggleGroup}
        onToggleSubGroup={toggleSubGroup}
        onToggleCompany={toggleCompany}
        isLoading={searchActive && isDataLoading && !allTiers}
        allTiersLoaded={!!allTiers}
      />
      <CoreModulesCallout />
    </StrategyDetailPageShell>
  );
}

export default function HiringTiersPage() {
  return <HiringTiersPageContent />;
}
