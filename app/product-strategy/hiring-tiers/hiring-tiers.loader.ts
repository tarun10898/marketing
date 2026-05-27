import type { Tier } from './hiring-tiers.data';

let tiersPromise: Promise<Tier[]> | null = null;

export function loadHiringTiersDataset() {
  if (!tiersPromise) {
    tiersPromise = import('./hiring-tiers.data').then((module) => module.tiers);
  }

  return tiersPromise;
}