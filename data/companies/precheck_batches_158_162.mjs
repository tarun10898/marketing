import { readFileSync } from "fs";

const reg = JSON.parse(readFileSync("data/companies/company_registry.json", "utf8"));
const seen = (reg.companies || []).map((e) => e.canonical_company_name).filter(Boolean);

function canonicalizeName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[.,()]/g, " ")
    .replace(
      /\b(inc|llc|ltd|limited|corp|corporation|technologies|technology|india|global)\b/g,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value) {
  return String(value || "").split(" ").filter(Boolean);
}

function jaccardSimilarity(a, b) {
  const setA = new Set(tokens(a));
  const setB = new Set(tokens(b));
  if (!setA.size || !setB.size) {
    return 0;
  }

  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) {
      intersection += 1;
    }
  }
  return intersection / (setA.size + setB.size - intersection);
}

function levenshteinDistance(a, b) {
  if (a === b) {
    return 0;
  }

  const m = a.length;
  const n = b.length;
  if (!m || !n) {
    return m + n;
  }

  let previous = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 0; i < m; i += 1) {
    const current = [i + 1];
    for (let j = 0; j < n; j += 1) {
      const cost = a[i] === b[j] ? 0 : 1;
      current[j + 1] = Math.min(current[j] + 1, previous[j + 1] + 1, previous[j] + cost);
    }
    previous = current;
  }
  return previous[n];
}

function isEditDistanceFuzzyMatch(a, b, distance) {
  const maxLength = Math.max(a.length, b.length);
  const minLength = Math.min(a.length, b.length);
  const lengthGap = Math.abs(a.length - b.length);
  const bothMultiToken = tokens(a).length > 1 && tokens(b).length > 1;

  if (lengthGap > 3 || distance > 2 || minLength < 6) {
    return false;
  }

  if (bothMultiToken && distance > 1) {
    return false;
  }

  return distance / maxLength <= 0.25;
}

const batch158 = [
  "Bharat Petroleum Fuel",
  "Hindustan Petroleum Fuel",
  "Indian Oil Petrol",
  "Reliance Petroleum Fuel",
  "Nayara Energy Fuel",
  "Shell Petroleum India",
  "Gulf Petrochem India",
  "Aegis Logistics Fuel",
  "Castrol Fuel Division",
  "Onyx Petroleum India",
  "Indo Petroleum Fuel",
  "Super Petroleum India",
  "Diamond Petroleum India",
  "Star Petroleum Fuel",
  "Apex Petroleum Fuel",
  "Royal Petroleum Fuel",
  "Classic Petroleum Fuel",
  "Precision Petroleum Fuel",
  "Fine Petroleum Fuel",
  "Elite Petroleum Fuel",
  "Advanced Petroleum Fuel",
  "Dynamic Petroleum Fuel",
  "Supreme Petroleum Fuel",
  "Bharat Petroleum Retail",
  "Global Petroleum Fuel",
];

const batch159 = [
  "Asahi India Glass Container",
  "Piramal Glass Container",
  "Glass Factory India",
  "AGI Glaspac",
  "Saint Gobain Glass Container",
  "Owens Illinois India",
  "Borosil Glass Container",
  "Glass Container Division",
  "Gujarat Glass Bottle",
  "National Glass Container",
  "Premier Glass Container",
  "Universal Glass Container",
  "Diamond Glass Container",
  "Astro Glass Container",
  "Apex Glass Container",
  "Royal Glass Container",
  "Classic Glass Container",
  "Precision Glass Container",
  "Fine Glass Container",
  "Elite Glass Container",
  "Advanced Glass Container",
  "Dynamic Glass Container",
  "Supreme Glass Container",
  "Bharat Glass Container",
  "Horizon Glass Container",
];

const batch160 = [
  "Suzlon Wind Energy",
  "Inox Wind Energy",
  "ReNew Wind Power",
  "Adani Wind Energy",
  "Tata Wind Energy",
  "Hero Wind Energy",
  "Greenko Wind Energy",
  "Continuum Wind Energy",
  "Mytrah Wind Energy",
  "Orient Green Wind",
  "Wind Power Developers",
  "Wind Energy Division",
  "Premier Wind Energy",
  "Universal Wind Energy",
  "Diamond Wind Energy",
  "Star Wind Energy",
  "Apex Wind Energy",
  "Royal Wind Energy",
  "Classic Wind Energy",
  "Precision Wind Energy",
  "Fine Wind Energy",
  "Elite Wind Energy",
  "Advanced Wind Energy",
  "Dynamic Wind Energy",
  "Supreme Wind Energy",
];

const batch161 = [
  "IndoSpace Logistics Parks",
  "Embassy Industrial Parks",
  "Horizon Industrial Parks",
  "Welspun One Logistics",
  "ESR Warehousing India",
  "Ascendas First Logistics",
  "TVS Industrial Parks",
  "GMR Logistics Park",
  "Adani Logistics Parks",
  "Mahindra Logistics Parks",
  "Warehousing Division India",
  "Premier Warehousing India",
  "Universal Warehousing India",
  "Diamond Warehousing India",
  "Star Warehousing India",
  "Apex Warehousing India",
  "Royal Warehousing India",
  "Classic Warehousing India",
  "Precision Warehousing India",
  "Fine Warehousing India",
  "Elite Warehousing India",
  "Advanced Warehousing India",
  "Dynamic Warehousing India",
  "Supreme Warehousing India",
  "Global Warehousing India",
];

const batch162 = [
  "Kalyani Hybrid Seeds",
  "Nuziveedu Seeds",
  "Mahyco Agri Biotech",
  "Rasi Seeds",
  "JK Seeds",
  "Namdhari Seeds",
  "Syngenta Seeds India",
  "Bayer Seeds India",
  "Advanta Seeds India",
  "VNR Seeds",
  "Seed Processing Division",
  "Premier Seeds India",
  "Universal Seeds India",
  "Diamond Seeds India",
  "Star Seeds India",
  "Apex Seeds India",
  "Royal Seeds India",
  "Classic Seeds India",
  "Precision Seeds India",
  "Fine Seeds India",
  "Elite Seeds India",
  "Advanced Seeds India",
  "Dynamic Seeds India",
  "Supreme Seeds India",
  "Bharat Seeds India",
];

const allCandidates = [
  ...batch158.map((n) => ({ name: n, batch: 158 })),
  ...batch159.map((n) => ({ name: n, batch: 159 })),
  ...batch160.map((n) => ({ name: n, batch: 160 })),
  ...batch161.map((n) => ({ name: n, batch: 161 })),
  ...batch162.map((n) => ({ name: n, batch: 162 })),
];

let duplicatesFound = 0;
for (const cand of allCandidates) {
  const canonical = canonicalizeName(cand.name);
  let verdict = "OK";

  if (seen.includes(canonical)) {
    verdict = "EXACT";
    duplicatesFound++;
  } else {
    for (const existing of seen) {
      const jaccard = jaccardSimilarity(canonical, existing);
      const distance = levenshteinDistance(canonical, existing);
      if (jaccard >= 0.9 || isEditDistanceFuzzyMatch(canonical, existing, distance)) {
        verdict = `FUZZY ${existing} d=${distance} j=${jaccard.toFixed(2)}`;
        duplicatesFound++;
        break;
      }
    }
  }

  if (verdict !== "OK") {
    console.log(`[Batch ${cand.batch}] ${cand.name} => ${verdict}`);
  }
}

if (duplicatesFound === 0) {
  console.log("ALL 125 CANDIDATES ARE COMPLETELY UNIQUE!");
} else {
  console.log(`${duplicatesFound} duplicates found.`);
}
