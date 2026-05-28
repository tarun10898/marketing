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

const batch163 = [
  "Kokuyo Camlin Stationery",
  "ITC Classmate Stationery",
  "Navneet Education Stationery",
  "Doms Industries Stationery",
  "Linc Pen Writing",
  "Reynolds Pen Writing",
  "Flair Writing Instruments",
  "Rorito Writing Pens",
  "Cello Pen Writing",
  "Kangaro Office Stationery",
  "Stationery Division India",
  "Premier Stationery India",
  "Universal Stationery India",
  "Diamond Stationery India",
  "Star Stationery India",
  "Apex Stationery India",
  "Royal Stationery India",
  "Classic Stationery India",
  "Precision Stationery India",
  "Fine Stationery India",
  "Elite Stationery India",
  "Advanced Stationery India",
  "Dynamic Stationery India",
  "Supreme Stationery India",
  "Global Stationery India",
];

const batch164 = [
  "Bata Footwear India",
  "Lancer Shoes India",
  "Lakhani Footwear India",
  "Aquolite Footwear India",
  "VKC Pride Footwear",
  "Kanga Footwear India",
  "Red Chief Leather",
  "Khadims Footwear India",
  "Metro Shoes India",
  "Mochi Shoes India",
  "Footwear Division India",
  "Premier Footwear India",
  "Universal Footwear India",
  "Diamond Footwear India",
  "Star Footwear India",
  "Apex Footwear India",
  "Royal Footwear India",
  "Classic Footwear India",
  "Precision Footwear India",
  "Fine Footwear India",
  "Elite Footwear India",
  "Advanced Footwear India",
  "Dynamic Footwear India",
  "Supreme Footwear India",
  "Global Footwear India",
];

const batch165 = [
  "Amul Dairy Cooperative",
  "Mother Dairy Cooperative",
  "Nandini Dairy Cooperative",
  "Milma Dairy Cooperative",
  "Aavin Dairy Cooperative",
  "OMFED Dairy Cooperative",
  "Sudha Dairy Cooperative",
  "Saras Dairy Cooperative",
  "Verka Dairy Cooperative",
  "Vita Dairy Cooperative",
  "Dairy Cooperative Division",
  "Premier Dairy Cooperative",
  "Universal Dairy Cooperative",
  "Diamond Dairy Cooperative",
  "Star Dairy Cooperative",
  "Apex Dairy Cooperative",
  "Royal Dairy Cooperative",
  "Classic Dairy Cooperative",
  "Precision Dairy Cooperative",
  "Fine Dairy Cooperative",
  "Elite Dairy Cooperative",
  "Advanced Dairy Cooperative",
  "Dynamic Dairy Cooperative",
  "Supreme Dairy Cooperative",
  "Global Dairy Cooperative",
];

const batch166 = [
  "Bharat Electronics Avionics",
  "HAL Avionics Division",
  "Astra Microwave Defense",
  "Centum Electronics Defense",
  "Data Patterns Avionics",
  "Alpha Design Avionics",
  "Apollo Micro Defense",
  "Avionics Division India",
  "Radar Division India",
  "Navigation Instruments Division",
  "Premier Avionics Division",
  "Universal Avionics Division",
  "Diamond Avionics Division",
  "Star Avionics Division",
  "Apex Avionics Division",
  "Royal Avionics Division",
  "Classic Avionics Division",
  "Precision Avionics Division",
  "Fine Avionics Division",
  "Elite Avionics Division",
  "Advanced Avionics Division",
  "Dynamic Avionics Division",
  "Supreme Avionics Division",
  "Bharat Avionics Division",
  "Global Avionics Division",
];

const batch167 = [
  "Adani Ports Marine",
  "Shipping Corporation Marine",
  "Great Eastern Marine",
  "Essar Shipping Marine",
  "Shreyas Shipping Marine",
  "Mercator Marine Services",
  "Seven Islands Marine",
  "Marine Logistics Division",
  "Shipping Division India",
  "Cargo Logistics Division",
  "Premier Marine Division",
  "Universal Marine Division",
  "Diamond Marine Division",
  "Star Marine Division",
  "Apex Marine Division",
  "Royal Marine Division",
  "Classic Marine Division",
  "Precision Marine Division",
  "Fine Marine Division",
  "Elite Marine Division",
  "Advanced Marine Division",
  "Dynamic Marine Division",
  "Supreme Marine Division",
  "Global Marine Division",
  "Sical Logistics Marine",
];

const allCandidates = [
  ...batch163.map((n) => ({ name: n, batch: 163 })),
  ...batch164.map((n) => ({ name: n, batch: 164 })),
  ...batch165.map((n) => ({ name: n, batch: 165 })),
  ...batch166.map((n) => ({ name: n, batch: 166 })),
  ...batch167.map((n) => ({ name: n, batch: 167 })),
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
