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

const batch183 = [
  "Whole Truth D2C Snacks",
  "Yoga Bar D2C Snacks",
  "Happilo D2C Foods",
  "Open Secret D2C",
  "Slurrp Farm D2C",
  "True Elements D2C",
  "Country Delight Dairy D2C",
  "Akshayakalpa Organic D2C",
  "Bira 91 D2C Beverages",
  "D2C Organic Food Division",
  "D2C Health Snack Division",
  "Premier Organic Foods",
  "Universal Organic Foods",
  "Diamond Organic Foods",
  "Star Organic Foods",
  "Apex Organic Foods",
  "Royal Organic Foods",
  "Classic Organic Foods",
  "Precision Organic Foods",
  "Fine Organic Foods",
  "Elite Organic Foods",
  "Advanced Organic Foods",
  "Dynamic Organic Foods",
  "Supreme Organic Foods",
  "Global Organic Foods",
];

const batch184 = [
  "L&T Switchgear Division",
  "Siemens Switchgear Division",
  "ABB Switchgear Division",
  "Schneider Switchgear Division",
  "Legrand Switchgear India",
  "C&S Electric Switchgear",
  "Havells Switchgear Division",
  "HPL Electric Switchgear",
  "Switchgear Division India",
  "Panel Board Division",
  "Premier Switchgears India",
  "Universal Switchgears India",
  "Diamond Switchgears India",
  "Star Switchgears India",
  "Apex Switchgears India",
  "Royal Switchgears India",
  "Classic Switchgears India",
  "Precision Switchgears India",
  "Fine Switchgears India",
  "Elite Switchgears India",
  "Advanced Switchgears India",
  "Dynamic Switchgears India",
  "Supreme Switchgears India",
  "Global Switchgears India",
  "National Switchgears India",
];

const batch185 = [
  "DIC India Printing Ink",
  "Toyo Colors India",
  "Hubergroup India Ink",
  "Sakata Chemical India",
  "Siegwerk Printing Ink",
  "Printing Ink Division",
  "Pigments Division India",
  "Masterbatch Division India",
  "Premier Inks India",
  "Universal Inks India",
  "Diamond Inks India",
  "Star Inks India",
  "Apex Inks India",
  "Royal Inks India",
  "Classic Inks India",
  "Precision Inks India",
  "Fine Inks India",
  "Elite Inks India",
  "Advanced Inks India",
  "Dynamic Inks India",
  "Supreme Inks India",
  "Global Inks India",
  "Alliance Inks India",
  "Standard Inks India",
  "Astro Inks India",
];

const batch186 = [
  "Tata Power Solar EPC",
  "Adani Solar EPC",
  "Waaree Solar EPC",
  "Vikram Solar EPC",
  "Sterling Wilson Solar",
  "Mahindra Susten Solar",
  "Goldi Solar EPC",
  "Solar EPC Division",
  "Rooftop Solar Division",
  "Grid Integration Division",
  "Premier Solar EPC",
  "Universal Solar EPC",
  "Diamond Solar EPC",
  "Star Solar EPC",
  "Apex Solar EPC",
  "Royal Solar EPC",
  "Classic Solar EPC",
  "Precision Solar EPC",
  "Fine Solar EPC",
  "Elite Solar EPC",
  "Advanced Solar EPC",
  "Dynamic Solar EPC",
  "Supreme Solar EPC",
  "Global Solar EPC",
  "National Solar EPC",
];

const batch187 = [
  "Mokobara D2C Luggage",
  "Assembly D2C Luggage",
  "Nasher Miles D2C",
  "VIP Industries Luggage",
  "Safari Industries Luggage",
  "Wildcraft D2C Gear",
  "D2C Travel Gear Division",
  "Premier Travel Gear",
  "Universal Travel Gear",
  "Diamond Travel Gear",
  "Star Travel Gear",
  "Apex Travel Gear",
  "Royal Travel Gear",
  "Classic Travel Gear",
  "Precision Travel Gear",
  "Fine Travel Gear",
  "Elite Travel Gear",
  "Advanced Travel Gear",
  "Dynamic Travel Gear",
  "Supreme Travel Gear",
  "Global Travel Gear",
  "Allied Travel Gear",
  "Standard Travel Gear",
  "Astro Travel Gear",
  "Aviation Travel Gear India",
];

const allCandidates = [
  ...batch183.map((n) => ({ name: n, batch: 183 })),
  ...batch184.map((n) => ({ name: n, batch: 184 })),
  ...batch185.map((n) => ({ name: n, batch: 185 })),
  ...batch186.map((n) => ({ name: n, batch: 186 })),
  ...batch187.map((n) => ({ name: n, batch: 187 })),
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
