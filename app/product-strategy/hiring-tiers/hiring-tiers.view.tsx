import {
  coreModules,
  eligibilitySummary,
  tierColors,
  tiers as allHiringTiers,
  type Tier,
} from './hiring-tiers.data';
import { getCompanyKey } from './hiring-tiers.model';

type HiringTiersSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

type HiringTiersResultSummaryProps = {
  query: string;
  resultCount: number;
};

type HiringTiersAccordionListProps = {
  tiers: Tier[];
  activeTiers: Set<string>;
  openCompanies: Set<string>;
  searchActive: boolean;
  onToggleTier: (tierId: string) => void;
  onToggleCompany: (companyKey: string) => void;
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

export function HiringTiersLegend() {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {allHiringTiers.map((tier) => (
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

export function HiringTiersResultSummary({
  query,
  resultCount,
}: HiringTiersResultSummaryProps) {
  if (!query) {
    return null;
  }

  return (
    <p className="text-sm text-ink-muted dark:text-ink-dark-muted mb-4">
      {resultCount} result{resultCount !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
    </p>
  );
}

export function HiringTiersAccordionList({
  tiers,
  activeTiers,
  openCompanies,
  searchActive,
  onToggleTier,
  onToggleCompany,
}: HiringTiersAccordionListProps) {
  if (!tiers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border dark:border-border-dark bg-white/60 dark:bg-surface-dark/60 px-6 py-8 text-center text-sm text-ink-muted dark:text-ink-dark-muted">
        No companies matched this search yet. Try a company name, role, or level shorthand like SDE2.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tiers.map((tier) => {
        const colors = tierColors[tier.id];
        const isTierOpen = activeTiers.has(tier.id);

        return (
          <div key={tier.id} className={`rounded-2xl border overflow-hidden ${colors.header}`}>
            <button
              onClick={() => !searchActive && onToggleTier(tier.id)}
              className={`w-full flex items-center justify-between px-6 py-5 text-left ${searchActive ? 'cursor-default' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className={`inline-block w-3 h-3 rounded-full ${colors.dot}`} />
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {tier.label}
                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                      {tier.range}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {tier.companies.length} companies / tracks
                  </p>
                </div>
              </div>

              <span className={colors.chevron}>
                <ChevronIcon open={isTierOpen} />
              </span>
            </button>

            {isTierOpen ? (
              <div className="px-4 pb-4 space-y-2">
                {tier.companies.map((company) => {
                  const companyKey = getCompanyKey(tier.id, company);
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
                      {isCompanyOpen ? (
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.openIndicator} rounded-l-xl`} />
                      ) : null}

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
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tier.badgeBg} ${tier.badgeText}`}>
                            {company.ctc}
                          </span>
                          <span className={colors.chevron}>
                            <ChevronIcon open={isCompanyOpen} />
                          </span>
                        </div>
                      </button>

                      {isCompanyOpen ? (
                        <div className={`pl-6 pr-5 pb-5 border-t ${colors.detailBorder} ${colors.detailBg}`}>
                          <div className="pt-4 space-y-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block w-2 h-2 rounded-full ${company.negativeMarking ? 'bg-red-500' : 'bg-green-500'}`} />
                              <span className="text-gray-600 dark:text-gray-300 font-medium">
                                {company.negativeMarking ? 'Negative marking applies' : 'No negative marking'}
                              </span>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 mb-1">
                                Rounds
                              </p>
                              <p className="text-gray-700 dark:text-gray-300">{company.rounds}</p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 mb-2">
                                Exam Pattern
                              </p>
                              <ul className="space-y-1">
                                {company.pattern.map((step) => (
                                  <li key={step} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 mb-1">
                                Interview Focus
                              </p>
                              <p className="text-gray-700 dark:text-gray-300">{company.interviews}</p>
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 dark:text-gray-500 mb-1">
                                Eligibility
                              </p>
                              <p className="text-gray-700 dark:text-gray-300">{company.eligibility}</p>
                            </div>

                            {company.notes ? (
                              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg px-4 py-3">
                                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-0.5">
                                  Note
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">{company.notes}</p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
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