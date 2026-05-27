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