import {
  coreModules,
  eligibilitySummary,
  tierColors,
  type TierSummary,
  tierDefinitions,
} from './hiring-tiers.meta';
import {
  getCompanyKey,
  type NestedGroup,
} from './hiring-tiers.model';

type HiringTiersLegendProps = {
  tiers: TierSummary[];
};

type HiringTiersSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

type HiringTiersResultSummaryProps = {
  query: string;
  resultCount: number;
  isLoading?: boolean;
};

type HiringTiersAccordionListProps = {
  groups: NestedGroup[];
  openGroups: Set<string>;
  openSubGroups: Set<string>;
  openCompanies: Set<string>;
  searchActive: boolean;
  onToggleGroup: (groupId: string) => void;
  onToggleSubGroup: (subGroupId: string) => void;
  onToggleCompany: (companyKey: string) => void;
  isLoading?: boolean;
  allTiersLoaded: boolean;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CompanyExperienceBadge({ experience }: { experience?: string }) {
  const label = experience ?? 'Fresher';
  const isFresher = label === 'Fresher';
  const isMixed = label.startsWith('Fresher /');
  const className = isFresher
    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    : isMixed
      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';

  return (
    <span className={`inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${className}`}>
      {label}
    </span>
  );
}

export function HiringTiersLegend({ tiers }: HiringTiersLegendProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {tiers.map((tier) => (
        <div key={tier.id} className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${tierColors[tier.id].dot}`} />
          <span className="text-sm font-semibold text-ink dark:text-ink-dark">{tier.label}</span>
          <span className="text-sm text-ink-muted dark:text-ink-dark-muted">{tier.range}</span>
        </div>
      ))}
    </div>
  );
}

export function HiringTiersSearch({ value, onChange }: HiringTiersSearchProps) {
  return (
    <div className="relative mb-6">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-ink-muted/75 dark:text-ink-dark-muted/75">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </span>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search company, role, level (SDE2, L5, E6, Staff, Principal)..."
        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border dark:border-border-dark bg-white dark:bg-surface-dark-subtle text-sm text-ink dark:text-ink-dark placeholder-ink-muted/70 dark:placeholder-ink-dark-muted/70 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition"
      />

      {value ? (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-3 flex items-center text-ink-muted/75 hover:text-ink dark:hover:text-ink-dark"
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

export type HiringTiersFilterControlsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function HiringTiersFilterControls({
  search,
  onSearchChange,
}: HiringTiersFilterControlsProps) {
  return (
    <div className="relative mb-6 max-w-2xl mx-auto">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-ink-muted/75 dark:text-ink-dark-muted/75">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </span>

      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search company, role, level (SDE2, L5, E6, Staff, Principal)..."
        className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-border dark:border-border-dark bg-white/45 dark:bg-surface-dark-subtle/30 text-sm text-ink dark:text-ink-dark placeholder-ink-muted/70 dark:placeholder-ink-dark-muted/70 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-all duration-200 shadow-sm"
      />

      {search ? (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-3 flex items-center text-ink-muted/75 hover:text-ink dark:hover:text-ink-dark"
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

export function HiringTiersResultSummary({
  query,
  resultCount,
  isLoading,
}: HiringTiersResultSummaryProps) {
  if (!query) {
    return null;
  }

  if (isLoading) {
    return (
      <p className="text-sm text-ink-muted dark:text-ink-dark-muted mb-4">
        Loading hiring tier results for &ldquo;{query}&rdquo;...
      </p>
    );
  }

  return (
    <p className="text-sm text-ink-muted dark:text-ink-dark-muted mb-4">
      {resultCount} result{resultCount !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
    </p>
  );
}

export function HiringTiersAccordionList({
  groups,
  openGroups,
  openSubGroups,
  openCompanies,
  searchActive,
  onToggleGroup,
  onToggleSubGroup,
  onToggleCompany,
  isLoading,
  allTiersLoaded,
}: HiringTiersAccordionListProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-dashed border-border dark:border-border-dark bg-white/60 dark:bg-surface-dark/60 px-6 py-8 text-center text-sm text-ink-muted dark:text-ink-dark-muted">
        Loading hiring tier data...
      </div>
    );
  }

  if (!groups.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border dark:border-border-dark bg-white/60 dark:bg-surface-dark/60 px-6 py-8 text-center text-sm text-ink-muted dark:text-ink-dark-muted">
        No companies matched this search yet. Try a company name, role, or level shorthand like SDE2.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const isGroupOpen = openGroups.has(group.id);
        const totalCompanies = group.subGroups.reduce((acc, sub) => acc + sub.companies.length, 0);
        const companyCountLabel = allTiersLoaded
          ? `${totalCompanies} companies / tracks`
          : 'Expand to load companies';

        return (
          <div
            key={group.id}
            className="rounded-2xl border border-border/80 dark:border-border-dark/80 bg-white/40 dark:bg-surface-dark/25 backdrop-blur-xl overflow-hidden shadow-md shadow-primary/5"
          >
            <button
              onClick={() => !searchActive && onToggleGroup(group.id)}
              className="w-full flex items-center justify-between px-6 py-5 text-left bg-gradient-to-r from-primary/5 via-transparent to-transparent hover:from-primary/10 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl select-none">{group.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {group.label}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {group.id === 'freshers'
                      ? 'Roles segmented by career impact tiers (CTC and interview depth)'
                      : 'Roles segmented by company archetype (Product-Based vs. Service-Based)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 dark:bg-primary-dark/20 text-primary-dark dark:text-primary rounded-full">
                  {companyCountLabel}
                </span>
                <ChevronIcon open={isGroupOpen} />
              </div>
            </button>

            {isGroupOpen && (
              <div className="p-4 space-y-4 bg-white/20 dark:bg-surface-dark-subtle/5 border-t border-border/40 dark:border-border-dark/40">
                {group.subGroups.map((subGroup) => {
                  const isSubGroupOpen = openSubGroups.has(subGroup.id);
                  const colors = tierColors[subGroup.accent] || tierColors.tier1;
                  const subGroupCountLabel = allTiersLoaded
                    ? `${subGroup.companies.length} companies`
                    : 'Expand to load';

                  return (
                    <div key={subGroup.id} className={`rounded-2xl border overflow-hidden ${colors.header}`}>
                      <button
                        onClick={() => !searchActive && onToggleSubGroup(subGroup.id)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                          <div>
                            <p className="text-md font-bold text-gray-900 dark:text-white">
                              {subGroup.label}
                              {subGroup.range && (
                                <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                                  {subGroup.range}
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {subGroupCountLabel}
                            </p>
                          </div>
                        </div>

                        <span className={colors.chevron}>
                          <ChevronIcon open={isSubGroupOpen} />
                        </span>
                      </button>

                      {isSubGroupOpen && (
                        <div className="px-4 pb-4 space-y-3">
                          {/* Detailed Tier Definition Callout for Freshers only */}
                          {group.id === 'freshers' && tierDefinitions[subGroup.id] && (
                            <div className={`p-4 rounded-xl border mb-3 text-xs grid grid-cols-1 md:grid-cols-3 gap-3 bg-white/20 dark:bg-surface-dark-subtle/25 backdrop-blur-sm ${colors.detailBorder}`}>
                              <div>
                                <p className="font-bold text-ink dark:text-ink-dark mb-0.5 uppercase tracking-wider text-[9px] opacity-75">Overview</p>
                                <p className="text-ink-muted dark:text-ink-dark-muted leading-relaxed">{tierDefinitions[subGroup.id].summary}</p>
                              </div>
                              <div>
                                <p className="font-bold text-ink dark:text-ink-dark mb-0.5 uppercase tracking-wider text-[9px] opacity-75">Interview Complexity</p>
                                <p className="text-ink-muted dark:text-ink-dark-muted leading-relaxed">{tierDefinitions[subGroup.id].interviewComplexity}</p>
                              </div>
                              <div>
                                <p className="font-bold text-ink dark:text-ink-dark mb-0.5 uppercase tracking-wider text-[9px] opacity-75">Opportunity Path</p>
                                <p className="text-ink-muted dark:text-ink-dark-muted leading-relaxed">{tierDefinitions[subGroup.id].opportunityPath}</p>
                              </div>
                            </div>
                          )}

                          {subGroup.companies.map((company) => {
                            const companyKey = getCompanyKey(subGroup.id, company);
                            const isCompanyOpen = openCompanies.has(companyKey);

                            return (
                              <div
                                key={companyKey}
                                className={`relative rounded-xl border overflow-hidden transition-all duration-200 ${
                                  isCompanyOpen
                                    ? colors.companyOpen
                                    : `${colors.companyBase} ${colors.companyHover}`
                                }`}
                              >
                                {isCompanyOpen && (
                                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.openIndicator} rounded-l-xl`} />
                                )}

                                <button
                                  onClick={() => onToggleCompany(companyKey)}
                                  className={`w-full flex items-center justify-between pl-6 pr-5 py-4 text-left transition-colors duration-150 ${
                                    !isCompanyOpen ? colors.buttonHover : ''
                                  }`}
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="min-w-0">
                                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {company.name}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {company.role}
                                      </p>
                                      <CompanyExperienceBadge experience={company.experience} />
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${company.badgeBg} ${company.badgeText}`}>
                                      {company.ctc}
                                    </span>
                                    <span className={colors.chevron}>
                                      <ChevronIcon open={isCompanyOpen} />
                                    </span>
                                  </div>
                                </button>

                                {isCompanyOpen && (
                                  <div className={`pl-6 pr-5 pb-5 border-t ${colors.detailBorder} ${colors.detailBg}`}>
                                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                      {/* Left Column */}
                                      <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                          <span className={`inline-block w-2.5 h-2.5 rounded-full ${company.negativeMarking ? 'bg-red-500 shadow-sm' : 'bg-green-500 shadow-sm'}`} />
                                          <span className="text-ink-muted dark:text-ink-dark-muted font-bold text-xs">
                                            {company.negativeMarking ? 'Negative marking applies' : 'No negative marking'}
                                          </span>
                                        </div>

                                        <div>
                                          <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted dark:text-ink-dark-muted mb-1">
                                            Rounds & Format
                                          </p>
                                          <p className="text-ink dark:text-ink-dark text-sm bg-white/45 dark:bg-surface-dark-subtle/30 p-2.5 rounded-xl border border-white/60 dark:border-border-dark/30 leading-relaxed">{company.rounds}</p>
                                        </div>

                                        <div>
                                          <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted dark:text-ink-dark-muted mb-1.5">
                                            Exam Pattern
                                          </p>
                                          <ul className="space-y-1.5 bg-white/45 dark:bg-surface-dark-subtle/30 p-3 rounded-xl border border-white/60 dark:border-border-dark/30">
                                            {company.pattern.map((step) => (
                                              <li key={step} className="flex items-start gap-2 text-ink dark:text-ink-dark text-sm">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-dark/60 dark:bg-primary-dark/80 flex-shrink-0" />
                                                <span className="leading-relaxed">{step}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>

                                      {/* Right Column */}
                                      <div className="space-y-4">
                                        <div>
                                          <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted dark:text-ink-dark-muted mb-1">
                                            Interview Focus
                                          </p>
                                          <p className="text-ink dark:text-ink-dark text-sm bg-white/45 dark:bg-surface-dark-subtle/30 p-2.5 rounded-xl border border-white/60 dark:border-border-dark/30 leading-relaxed">{company.interviews}</p>
                                        </div>

                                        <div>
                                          <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted dark:text-ink-dark-muted mb-1">
                                            Eligibility
                                          </p>
                                          <p className="text-ink dark:text-ink-dark text-sm bg-white/45 dark:bg-surface-dark-subtle/30 p-2.5 rounded-xl border border-white/60 dark:border-border-dark/30 leading-relaxed">{company.eligibility}</p>
                                        </div>

                                        {company.notes && (
                                          <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 mb-1">
                                              Important Note
                                            </p>
                                            <p className="text-ink-muted dark:text-ink-dark-muted text-xs leading-relaxed">{company.notes}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function CoreModulesCallout() {
  return (
    <div className="mt-10 bg-secondary-soft/35 dark:bg-secondary/12 border border-secondary/20 dark:border-secondary-dark/30 rounded-2xl p-5">
      <p className="text-sm font-semibold text-secondary dark:text-secondary-dark mb-1">
        Core Modules (Cover 80% of Companies)
      </p>
      <ul className="text-sm text-ink dark:text-ink-dark space-y-1 mt-2">
        {coreModules.map((module) => (
          <li key={module.title}>
            {module.icon} <strong>{module.title}</strong> - {module.detail}
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-muted dark:text-ink-dark-muted mt-3">
        {eligibilitySummary}
      </p>
    </div>
  );
}