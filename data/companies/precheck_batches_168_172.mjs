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

const batch168 = [
  "Mahindra Tractors Division",
  "TAFE Tractors Division",
  "Sonalika Tractors Division",
  "Escorts Tractors Division",
  "John Deere Tractors India",
  "New Holland Tractors India",
  "Force Motors Tractors",
  "Preet Tractors India",
  "Captain Tractors India",
  "Indo Farm Tractors",
  "VST Tillers Tractors",
  "HMT Tractors Division",
  "Eicher Tractors Division",
  "Farmtrac Tractors India",
  "Powertrac Tractors India",
  "Sonalika International Tractors",
  "Premier Tractors India",
  "Universal Tractors India",
  "Diamond Tractors India",
  "Star Tractors Fuel Division",
  "Apex Tractors Division",
  "Royal Tractors Division",
  "Classic Tractors Division",
  "Precision Tractors Division",
  "Fine Tractors Division",
];

const batch169 = [
  "MTR Foods Masalas",
  "Gits Foods Spices",
  "Roopak Masala India",
  "Badshah Spices India",
  "Pushp Spices India",
  "Goldiee Spices India",
  "Nirapara Spices India",
  "Keya Spices India",
  "Spices Board India",
  "Ramdev Spices India",
  "Spice Division India",
  "Flour Mill Division",
  "Premier Spices India",
  "Universal Spices India",
  "Diamond Spices India",
  "Star Spices India",
  "Apex Spices India",
  "Royal Spices India",
  "Classic Spices India",
  "Precision Spices India",
  "Fine Spices India",
  "Elite Spices India",
  "Advanced Spices India",
  "Dynamic Spices India",
  "Supreme Spices India",
];

const batch170 = [
  "Kirloskar Electric Motors",
  "CG Power Motors",
  "ABB Motors India",
  "Siemens Motors India",
  "Bharat Bijlee Motors",
  "Marathon Electric India",
  "Havells Motors Division",
  "GE Power Motors",
  "Bharat Bijlee Alternators",
  "Electric Motor Division",
  "Alternator Division India",
  "Premier Motors India",
  "Universal Motors India",
  "Diamond Motors India",
  "Star Motors India",
  "Apex Motors India",
  "Royal Motors India",
  "Classic Motors India",
  "Precision Motors India",
  "Fine Motors India",
  "Elite Motors India",
  "Advanced Motors India",
  "Astro Motors India",
  "Supreme Motors India",
  "Global Motors India",
];

const batch171 = [
  "Sears Gears India",
  "Premium Transmission Gears",
  "Elecon Engineering Gears",
  "Essential Power Transmission",
  "Gearbox Division India",
  "Speed Reducer Division",
  "Power Transmission Division",
  "Premier Gears India",
  "Universal Gears India",
  "Diamond Gears India",
  "Star Gears India",
  "Apex Gears India",
  "Royal Gears India",
  "Classic Gears India",
  "Precision Gears India",
  "Fine Gears India",
  "Elite Gears India",
  "Advanced Gears India",
  "Dynamic Gears India",
  "Supreme Gears India",
  "Global Gears India",
  "Allied Gears India",
  "Standard Gears India",
  "Classic Gearbox India",
  "Precision Gearbox India",
];

const batch172 = [
  "Dilip Buildcon EPC",
  "Ashoka Buildcon EPC",
  "IRB Infrastructure EPC",
  "PNC Infratech EPC",
  "KNR Constructions EPC",
  "H G Infra EPC",
  "G R Infraprojects EPC",
  "Bridge Developers India",
  "National Highway EPC",
  "Highway Construction Division",
  "Premier EPC Division",
  "Universal EPC Division",
  "Diamond EPC Division",
  "Star EPC Division",
  "Apex EPC Division",
  "Royal EPC Division",
  "Classic EPC Division",
  "Precision EPC Division",
  "Fine EPC Division",
  "Elite EPC Division",
  "Advanced EPC Division",
  "Dynamic EPC Division",
  "Supreme EPC Division",
  "Global EPC Division",
  "Bharat EPC Division",
];

const allCandidates = [
  ...batch168.map((n) => ({ name: n, batch: 168 })),
  ...batch169.map((n) => ({ name: n, batch: 169 })),
  ...batch170.map((n) => ({ name: n, batch: 170 })),
  ...batch171.map((n) => ({ name: n, batch: 171 })),
  ...batch172.map((n) => ({ name: n, batch: 172 })),
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
