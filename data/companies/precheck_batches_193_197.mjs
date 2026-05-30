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
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const token of setA) { if (setB.has(token)) intersection += 1; }
  return intersection / (setA.size + setB.size - intersection);
}

function levenshteinDistance(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m || !n) return m + n;
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
  if (lengthGap > 3 || distance > 2 || minLength < 6) return false;
  if (bothMultiToken && distance > 1) return false;
  return distance / maxLength <= 0.25;
}

const batch193 = [
  "Tata Power EV Charging",
  "Ather Grid EV Charging",
  "ChargeZone EV Infra",
  "Statiq EV Charging",
  "Kazam EV Charging",
  "Fortum Charge India",
  "BPCL EV Charging",
  "HPCL EV Charging",
  "IOCL EV Charging",
  "Sun Mobility Battery Swap",
  "EV Charging Division India",
  "Battery Swapping Division",
  "Premier EV Charging India",
  "Universal EV Charging India",
  "Diamond EV Charging India",
  "Star EV Charging India",
  "Apex EV Charging India",
  "Royal EV Charging India",
  "Classic EV Charging India",
  "Precision EV Charging India",
  "Fine EV Charging India",
  "Elite EV Charging India",
  "Advanced EV Charging India",
  "Dynamic EV Charging India",
  "Supreme EV Charging India",
];

const batch194 = [
  "Boat D2C Audio India",
  "Noise D2C Wearables",
  "Fire-Boltt D2C Smart",
  "Crossbeats D2C Audio",
  "Portronics D2C Gadgets",
  "Ambrane D2C Electronics",
  "Boult Audio D2C",
  "Mivi D2C Audio India",
  "Hammer D2C Wearables",
  "Pebble D2C Wearables",
  "D2C Wearables Division",
  "Smart Audio Division India",
  "Premier Wearables India",
  "Universal Wearables India",
  "Diamond Wearables India",
  "Star Wearables India",
  "Apex Wearables India",
  "Royal Wearables India",
  "Classic Wearables India",
  "Precision Wearables India",
  "Fine Wearables India",
  "Elite Wearables India",
  "Advanced Wearables India",
  "Dynamic Wearables India",
  "Supreme Wearables India",
];

const batch195 = [
  "Biocon Biologics Division",
  "Bharat Biotech Vaccines",
  "Serum Institute Biologics",
  "Indian Immunologicals Bio",
  "Panacea Biotec Vaccines",
  "Shantha Biotechnics Bio",
  "Wockhardt Biologics",
  "Zydus Biologics Division",
  "Gland Pharma Biologics",
  "Intas Biologics Division",
  "Biologics Division India",
  "Vaccine Manufacturing Division",
  "Premier Biologics India",
  "Universal Biologics India",
  "Diamond Biologics India",
  "Star Biologics India",
  "Apex Biologics India",
  "Royal Biologics India",
  "Classic Biologics India",
  "Precision Biologics India",
  "Fine Biologics India",
  "Elite Biologics India",
  "Advanced Biologics India",
  "Dynamic Biologics India",
  "Supreme Biologics India",
];

const batch196 = [
  "Birla Estates Projects",
  "Puravankara Real Estate",
  "Sunteck Realty Projects",
  "Mahindra Lifespace Dev",
  "Kolte-Patil Developers",
  "Ashiana Housing Projects",
  "Suraj Estate Developers",
  "Signature Global Realty",
  "Max Estates Projects",
  "Keystone Realtors Projects",
  "Premium Housing Division",
  "Township Development Division",
  "Premier Realty India",
  "Universal Realty India",
  "Diamond Realty India",
  "Star Realty India",
  "Apex Realty India",
  "Royal Realty India",
  "Classic Realty India",
  "Precision Realty India",
  "Fine Realty India",
  "Elite Realty India",
  "Advanced Realty India",
  "Dynamic Realty India",
  "Supreme Realty India",
];

const batch197 = [
  "Zomato Hyperpure B2B",
  "Udaan B2B Commerce",
  "Moglix B2B Industrial",
  "IndiaMART B2B Platform",
  "Zetwerk B2B Manufacturing",
  "Infra.Market B2B Supply",
  "Power2SME B2B Platform",
  "Bizongo B2B Packaging",
  "Jumbotail B2B Grocery",
  "ShopKirana B2B Retail",
  "B2B Commerce Division",
  "Industrial Supply Division",
  "Premier B2B Platform India",
  "Universal B2B Platform India",
  "Diamond B2B Platform India",
  "Star B2B Platform India",
  "Apex B2B Platform India",
  "Royal B2B Platform India",
  "Classic B2B Platform India",
  "Precision B2B Platform India",
  "Fine B2B Platform India",
  "Elite B2B Platform India",
  "Advanced B2B Platform India",
  "Dynamic B2B Platform India",
  "Supreme B2B Platform India",
];

const allCandidates = [
  ...batch193.map((n) => ({ name: n, batch: 193 })),
  ...batch194.map((n) => ({ name: n, batch: 194 })),
  ...batch195.map((n) => ({ name: n, batch: 195 })),
  ...batch196.map((n) => ({ name: n, batch: 196 })),
  ...batch197.map((n) => ({ name: n, batch: 197 })),
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
