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

const batch178 = [
  "IFFCO Fertilizer Cooperative",
  "KRIBHCO Fertilizer Cooperative",
  "GSFC Fertilizer Division",
  "GNFC Fertilizer Division",
  "Coromandel Fertilizer Division",
  "Chambal Fertilisers Division",
  "FACT Fertilizer Cooperative",
  "RCF Fertilizer Division",
  "NFL Fertilizer Division",
  "Mangalore Chemicals Fertilizers",
  "Fertilizer Division India",
  "Soil Nutrition Division",
  "Premier Fertilizers India",
  "Universal Fertilizers India",
  "Diamond Fertilizers India",
  "Star Fertilizers India",
  "Apex Fertilizers India",
  "Royal Fertilizers India",
  "Classic Fertilizers India",
  "Precision Fertilizers India",
  "Fine Fertilizers India",
  "Elite Fertilizers India",
  "Advanced Fertilizers India",
  "Dynamic Fertilizers India",
  "Supreme Fertilizers India",
];

const batch179 = [
  "Yoho D2C Footwear",
  "Neeman's D2C Shoes",
  "Flatheads D2C Shoes",
  "Solethreads D2C Slippers",
  "Chupps D2C Slippers",
  "Walkaroo D2C Footwear",
  "Red Chief D2C",
  "Woodland D2C Shoes",
  "Sparx D2C Shoes",
  "Abros D2C Shoes",
  "Feet Comfort Division",
  "D2C Accessories Division",
  "Premier Feetwear India",
  "Universal Feetwear India",
  "Diamond Feetwear India",
  "Star Feetwear India",
  "Apex Feetwear India",
  "Royal Feetwear India",
  "Classic Feetwear India",
  "Precision Feetwear India",
  "Fine Feetwear India",
  "Elite Feetwear India",
  "Advanced Feetwear India",
  "Dynamic Feetwear India",
  "Supreme Feetwear India",
];

const batch180 = [
  "Siemens Industrial Automation",
  "Rockwell Automation Systems",
  "Schneider Industrial Automation",
  "Honeywell Automation Systems",
  "ABB Automation Systems",
  "Yokogawa Automation Systems",
  "Mitsubishi Automation Systems",
  "Omron Automation Systems",
  "Fanuc Industrial Automation",
  "Delta Automation Systems",
  "Automation Division India",
  "PLC SCADA Division",
  "Premier Automation India",
  "Universal Automation India",
  "Diamond Automation India",
  "Star Automation India",
  "Apex Automation India",
  "Royal Automation India",
  "Classic Automation India",
  "Precision Automation India",
  "Fine Automation India",
  "Elite Automation India",
  "Advanced Automation India",
  "Dynamic Automation India",
  "Supreme Automation India",
];

const batch181 = [
  "Asian Paints Industrial",
  "Berger Paints Industrial",
  "Kansai Nerolac Industrial",
  "AkzoNobel Protective Coatings",
  "PPG Asian Paints",
  "Jotun Protective Coatings",
  "Shalimar Industrial Paints",
  "Indigo Protective Paints",
  "Sheenlac Industrial Coatings",
  "Pidilite Industrial Coatings",
  "Industrial Paint Division",
  "Powder Coating Division",
  "Premier Paints India",
  "Universal Paints India",
  "Diamond Paints India",
  "Star Paints India",
  "Apex Paints India",
  "Royal Paints India",
  "Classic Paints India",
  "Precision Paints India",
  "Fine Paints India",
  "Elite Paints India",
  "Advanced Paints India",
  "Dynamic Paints India",
  "Supreme Paints India",
];

const batch182 = [
  "Epiroc Mining Equipment",
  "Sandvik Mining Equipment",
  "Metso Outotec Mining",
  "FLSmidth Processing India",
  "Thyssenkrupp Mining Equipment",
  "Terex Excavators India",
  "Weir Mining Systems",
  "Xylem Pumps India",
  "Mining Division India",
  "Coal Processing Division",
  "Premier Mining Division",
  "Universal Mining Division",
  "Diamond Mining Division",
  "Star Mining Division",
  "Apex Mining Division",
  "Royal Mining Division",
  "Classic Mining Division",
  "Precision Mining Division",
  "Fine Mining Division",
  "Elite Mining Division",
  "Advanced Mining Division",
  "Dynamic Mining Division",
  "Supreme Mining Division",
  "Global Mining Division",
  "BEML Mining Equipment",
];

const allCandidates = [
  ...batch178.map((n) => ({ name: n, batch: 178 })),
  ...batch179.map((n) => ({ name: n, batch: 179 })),
  ...batch180.map((n) => ({ name: n, batch: 180 })),
  ...batch181.map((n) => ({ name: n, batch: 181 })),
  ...batch182.map((n) => ({ name: n, batch: 182 })),
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
