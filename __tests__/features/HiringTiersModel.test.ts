import { tiers } from '@/app/product-strategy/hiring-tiers/hiring-tiers.data';
import {
  countHiringTierCompanies,
  filterHiringTiers,
  getCompanyKey,
  normalizeDesignation,
} from '@/app/product-strategy/hiring-tiers/hiring-tiers.model';

describe('Hiring tiers model', () => {
  it('normalizes common designation variants', () => {
    expect(normalizeDesignation('SDE III')).toBe('sde3');
    expect(normalizeDesignation('SDE 2')).toBe('sde2');
  });

  it('returns the full dataset for a blank query', () => {
    const result = filterHiringTiers(tiers, '   ');

    expect(result).toHaveLength(tiers.length);
    expect(countHiringTierCompanies(result)).toBe(countHiringTierCompanies(tiers));
  });

  it('matches shorthand queries against spaced and roman numeral roles', () => {
    const result = filterHiringTiers(tiers, 'sde3');
    const roles = result.flatMap((tier) => tier.companies.map((company) => company.role));

    expect(roles.some((role) => /sde 3|sde iii/i.test(role))).toBe(true);
  });

  it('builds stable company keys from tier and domain identity', () => {
    const razorpayEntry = tiers
      .flatMap((tier) => tier.companies.map((company) => ({ tierId: tier.id, company })))
      .find(
        ({ company }) => company.name === 'Razorpay' && /Software Engineer/i.test(company.role)
      );

    expect(razorpayEntry).toBeDefined();
    expect(getCompanyKey(razorpayEntry!.tierId, razorpayEntry!.company)).toBe(
      `${razorpayEntry!.tierId}:${razorpayEntry!.company.name}:${razorpayEntry!.company.role}`
    );
  });

  it('filters by company name and returns a countable result set', () => {
    const result = filterHiringTiers(tiers, 'Razorpay');

    expect(result.length).toBeGreaterThan(0);
    expect(countHiringTierCompanies(result)).toBeGreaterThan(0);
  });
});

describe('Nested Hiring Tiers model helper', () => {
  const {
    getNestedHiringTiers,
    countNestedHiringTierCompanies,
  } = require('@/app/product-strategy/hiring-tiers/hiring-tiers.model');

  it('correctly segments freshers and experienced companies', () => {
    const result = getNestedHiringTiers(tiers as any, '');
    expect(result).toHaveLength(2); // 'freshers' and 'experienced'

    const freshers = result.find((g: any) => g.id === 'freshers')!;
    const experienced = result.find((g: any) => g.id === 'experienced')!;

    expect(freshers.subGroups).toHaveLength(3); // Tier 1, Tier 2, Tier 3
    expect(experienced.subGroups).toHaveLength(2); // Product-Based, Service-Based

    // Check count matching
    const totalCount = countNestedHiringTierCompanies(result);
    expect(totalCount).toBeGreaterThan(0);
  });

  it('filters nested categories correctly by search query', () => {
    const mockData = [
      {
        id: 'tier1',
        label: 'Tier-1',
        companies: [
          { name: 'Google', role: 'SDE III', experience: 'Experienced' }
        ]
      }
    ];
    const result = getNestedHiringTiers(mockData as any, 'Google');
    const freshers = result.find((g: any) => g.id === 'freshers');
    const experienced = result.find((g: any) => g.id === 'experienced');

    expect(freshers).toBeUndefined();
    expect(experienced).toBeDefined();
    expect(experienced!.subGroups.find((s: any) => s.id === 'product')!.companies.length).toBeGreaterThan(0);
  });
});