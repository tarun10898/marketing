import type { Company, Tier } from './hiring-tiers.data';

export const SERVICE_BASED_COMPANIES = new Set([
  'tcs',
  'infosys',
  'wipro',
  'cognizant',
  'accenture',
  'capgemini',
  'hcl',
  'hcltech',
  'tech mahindra',
  'mahindra',
  'lti',
  'ltimindtree',
  'mindtree',
  'mphasis',
  'birlasoft',
  'persistent',
  'hexaware',
]);

export function isServiceBasedCompany(companyName: string): boolean {
  const normalized = companyName.toLowerCase();
  for (const name of SERVICE_BASED_COMPANIES) {
    if (normalized.includes(name)) {
      return true;
    }
  }
  return false;
}

export function isFresherRole(company: Company): boolean {
  if (!company.experience) return true; // Default to fresher if not defined
  const exp = company.experience.toLowerCase();
  return exp.includes('fresher');
}

export function isExperiencedRole(company: Company): boolean {
  if (!company.experience) return false;
  const exp = company.experience.toLowerCase();
  return exp.includes('experienced');
}

function getCompanySearchText(company: Company) {
  return `${company.name} ${company.role} ${company.experience ?? ''} ${company.notes ?? ''}`
    .toLowerCase()
    .trim();
}

export function normalizeDesignation(value: string) {
  return value
    .toLowerCase()
    .replace(/\biii\b/g, '3')
    .replace(/\bii\b/g, '2')
    .replace(/([a-z])\s+(\d)/g, '$1$2');
}

export function filterHiringTiers(allTiers: Tier[], search: string) {
  const query = search.trim().toLowerCase();

  if (!query) {
    return allTiers;
  }

  const normalizedQuery = normalizeDesignation(query);

  return allTiers
    .map((tier) => ({
      ...tier,
      companies: tier.companies.filter((company) => {
        const searchableText = getCompanySearchText(company);
        return (
          searchableText.includes(query) ||
          normalizeDesignation(searchableText).includes(normalizedQuery)
        );
      }),
    }))
    .filter((tier) => tier.companies.length > 0);
}

export type StructuredCompany = Company & {
  tierId: string;
  badgeBg: string;
  badgeText: string;
};

export type NestedSubGroup = {
  id: string;
  label: string;
  range?: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  companies: StructuredCompany[];
};

export type NestedGroup = {
  id: 'freshers' | 'experienced';
  label: string;
  icon: string;
  subGroups: NestedSubGroup[];
};

export function getNestedHiringTiers(allTiers: Tier[], search: string): NestedGroup[] {
  const query = search.trim().toLowerCase();
  const normalizedQuery = normalizeDesignation(query);

  const matchesSearch = (company: Company) => {
    if (!query) return true;
    const searchableText = `${company.name} ${company.role} ${company.experience ?? ''} ${company.notes ?? ''}`
      .toLowerCase()
      .trim();
    return (
      searchableText.includes(query) ||
      normalizeDesignation(searchableText).includes(normalizedQuery)
    );
  };

  const mapCompany = (company: Company, tier: Tier): StructuredCompany => ({
    ...company,
    tierId: tier.id,
    badgeBg: tier.badgeBg,
    badgeText: tier.badgeText,
  });

  // 1. Freshers sub-groups
  // Service-based companies in Tier-1 are relocated to Tier-2 since Tier-1
  // is reserved for high career-impact product roles.
  const tier1Data = allTiers.find((t) => t.id === 'tier1');
  const tier2Data = allTiers.find((t) => t.id === 'tier2');

  const relocatedFromTier1: StructuredCompany[] = [];
  if (tier1Data && tier2Data) {
    relocatedFromTier1.push(
      ...tier1Data.companies
        .filter((c) => isFresherRole(c) && isServiceBasedCompany(c.name) && matchesSearch(c))
        .map((c) => mapCompany(c, tier2Data)),
    );
  }

  const fresherSubGroups: NestedSubGroup[] = allTiers.map((tier) => {
    let companies = tier.companies
      .filter((c) => isFresherRole(c) && matchesSearch(c))
      .map((c) => mapCompany(c, tier));

    if (tier.id === 'tier1') {
      // Remove service-based companies from Tier-1
      companies = companies.filter((c) => !isServiceBasedCompany(c.name));
    } else if (tier.id === 'tier2') {
      // Add relocated service-based companies from Tier-1
      companies = [...companies, ...relocatedFromTier1];
    }

    return {
      id: tier.id,
      label: tier.label,
      range: tier.range,
      accent: tier.id,
      badgeBg: tier.badgeBg,
      badgeText: tier.badgeText,
      borderColor: tier.borderColor,
      companies,
    };
  });

  // 2. Experienced sub-groups (Product vs Service)
  const experiencedCompanies: StructuredCompany[] = [];
  allTiers.forEach((tier) => {
    tier.companies.forEach((company) => {
      if (isExperiencedRole(company) && matchesSearch(company)) {
        experiencedCompanies.push(mapCompany(company, tier));
      }
    });
  });

  const productCompanies = experiencedCompanies.filter((c) => !isServiceBasedCompany(c.name));
  const serviceCompanies = experiencedCompanies.filter((c) => isServiceBasedCompany(c.name));

  const experiencedSubGroups: NestedSubGroup[] = [
    {
      id: 'product',
      label: 'Product-Based',
      accent: 'tier1',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      borderColor: 'border-emerald-200 dark:border-emerald-700',
      companies: productCompanies,
    },
    {
      id: 'service',
      label: 'Service-Based',
      accent: 'tier3',
      badgeBg: 'bg-slate-100 dark:bg-slate-900/40',
      badgeText: 'text-slate-700 dark:text-slate-300',
      borderColor: 'border-slate-200 dark:border-slate-700',
      companies: serviceCompanies,
    },
  ];

  const filteredFreshers = fresherSubGroups.filter((g) => g.companies.length > 0);
  const filteredExperienced = experiencedSubGroups.filter((g) => g.companies.length > 0);

  const result: NestedGroup[] = [];

  if (filteredFreshers.length > 0) {
    result.push({
      id: 'freshers',
      label: 'Freshers',
      icon: '🎓',
      subGroups: filteredFreshers,
    });
  }

  if (filteredExperienced.length > 0) {
    result.push({
      id: 'experienced',
      label: 'Experienced',
      icon: '💼',
      subGroups: filteredExperienced,
    });
  }

  return result;
}

export function countHiringTierCompanies(tiers: Array<Pick<Tier, 'companies'>>) {
  return tiers.reduce((total, tier) => total + tier.companies.length, 0);
}

export function countNestedHiringTierCompanies(groups: NestedGroup[]): number {
  return groups.reduce((total, group) => {
    return total + group.subGroups.reduce((subTotal, sub) => subTotal + sub.companies.length, 0);
  }, 0);
}

export function getCompanyKey(tierId: string, company: Company) {
  return `${tierId}:${company.name}:${company.role}`;
}

export const initialNestedGroups: NestedGroup[] = [
  {
    id: 'freshers',
    label: 'Freshers',
    icon: '🎓',
    subGroups: [
      {
        id: 'tier1',
        label: 'Tier‑1',
        range: '≥ ₹10 LPA',
        accent: 'tier1',
        badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
        badgeText: 'text-emerald-700 dark:text-emerald-300',
        borderColor: 'border-emerald-200 dark:border-emerald-700',
        companies: [],
      },
      {
        id: 'tier2',
        label: 'Tier‑2',
        range: '₹4.5–10 LPA',
        accent: 'tier2',
        badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
        badgeText: 'text-blue-700 dark:text-blue-300',
        borderColor: 'border-blue-200 dark:border-blue-700',
        companies: [],
      },
      {
        id: 'tier3',
        label: 'Tier‑3',
        range: '≤ ₹4.5 LPA',
        accent: 'tier3',
        badgeBg: 'bg-slate-100 dark:bg-slate-900/40',
        badgeText: 'text-slate-700 dark:text-slate-300',
        borderColor: 'border-slate-200 dark:border-slate-700',
        companies: [],
      },
    ],
  },
  {
    id: 'experienced',
    label: 'Experienced',
    icon: '💼',
    subGroups: [
      {
        id: 'product',
        label: 'Product-Based',
        accent: 'tier1',
        badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
        badgeText: 'text-emerald-700 dark:text-emerald-300',
        borderColor: 'border-emerald-200 dark:border-emerald-700',
        companies: [],
      },
      {
        id: 'service',
        label: 'Service-Based',
        accent: 'tier3',
        badgeBg: 'bg-slate-100 dark:bg-slate-900/40',
        badgeText: 'text-slate-700 dark:text-slate-300',
        borderColor: 'border-slate-200 dark:border-slate-700',
        companies: [],
      },
    ],
  },
];