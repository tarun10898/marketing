import type { Company, Tier } from './hiring-tiers.data';

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

export function countHiringTierCompanies(tiers: Array<Pick<Tier, 'companies'>>) {
  return tiers.reduce((total, tier) => total + tier.companies.length, 0);
}

export function getCompanyKey(tierId: string, company: Company) {
  return `${tierId}:${company.name}:${company.role}`;
}