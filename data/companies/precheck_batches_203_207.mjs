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

const batch203 = [
  "Haldirams Packaged Sweets",
  "Bikaji Packaged Sweets",
  "Lal Sweets D2C",
  "Ghasitaram Sweets India",
  "Prabhuji Haldiram Sweets",
  "Bikanervala Sweets India",
  "Haldiram Nagpur Sweets",
  "Chhappan Bhog Sweets",
  "K C Das Sweets",
  "Adyar Ananda Bhavan Sweets",
  "Sweets Packaging Division",
  "Dessert Development Division",
  "Premier Packaged Sweets",
  "Universal Packaged Sweets",
  "Diamond Packaged Sweets",
  "Star Packaged Sweets",
  "Apex Packaged Sweets",
  "Royal Packaged Sweets",
  "Classic Packaged Sweets",
  "Precision Packaged Sweets",
  "Fine Packaged Sweets",
  "Elite Packaged Sweets",
  "Advanced Packaged Sweets",
  "Dynamic Packaged Sweets",
  "Supreme Packaged Sweets",
];

const batch204 = [
  "Action Construction Equipment ACE",
  "Godrej Material Handling",
  "Voltas Material Handling",
  "ElectroMech Cranes",
  "Sany India Cranes",
  "Hercules Hoists India",
  "Anupam Industries Cranes",
  "Reva Cranes India",
  "Escorts Kubota Material",
  "Hyva India Cranes",
  "Cranes Manufacturing Division",
  "Material Handling Division",
  "Premier Material Handling",
  "Universal Material Handling",
  "Diamond Material Handling",
  "Star Material Handling",
  "Apex Material Handling",
  "Royal Material Handling",
  "Classic Material Handling",
  "Precision Material Handling",
  "Fine Material Handling",
  "Elite Material Handling",
  "Advanced Material Handling",
  "Dynamic Material Handling",
  "Supreme Material Handling",
];

const batch205 = [
  "Oziva D2C Nutrition",
  "Kapiva D2C Ayurveda",
  "Wellbeing Nutrition D2C",
  "Fast and Up Nutrition",
  "MuscleBlaze D2C Supplements",
  "Plix D2C Nutrition",
  "Fitspire D2C Nutrition",
  "Gynoveda D2C Ayurveda",
  "Boldfit D2C Wellness",
  "Auric D2C Wellness",
  "Wellness Products Division",
  "Supplement Development Div",
  "Premier Wellness Nutrition",
  "Universal Wellness Nutrition",
  "Diamond Wellness Nutrition",
  "Star Wellness Nutrition",
  "Apex Wellness Nutrition",
  "Royal Wellness Nutrition",
  "Classic Wellness Nutrition",
  "Precision Wellness Nutrition",
  "Fine Wellness Nutrition",
  "Elite Wellness Nutrition",
  "Advanced Wellness Nutrition",
  "Dynamic Wellness Nutrition",
  "Supreme Wellness Nutrition",
];

const batch206 = [
  "Tata Motors Buses Division",
  "Ashok Leyland Buses Division",
  "Eicher Trucks Buses Division",
  "JCBL Bus Bodies",
  "MG Alma Bus Bodies",
  "Sutlej Motors Bus Bodies",
  "Force Motors Specialty Buses",
  "Veera Vahana Bus Bodies",
  "Olectra Greenpower Buses",
  "Switch Mobility Electric Buses",
  "Bus Body Manufacturing Division",
  "Specialty Vehicle Division",
  "Premier Bus Bodies",
  "Universal Bus Bodies",
  "Diamond Bus Bodies",
  "Star Bus Bodies",
  "Apex Bus Bodies",
  "Royal Bus Bodies",
  "Classic Bus Bodies",
  "Precision Bus Bodies",
  "Fine Bus Bodies",
  "Elite Bus Bodies",
  "Advanced Bus Bodies",
  "Dynamic Bus Bodies",
  "Supreme Bus Bodies",
];

const batch207 = [
  "Nestasia D2C Decor",
  "Pepperfry D2C Furniture",
  "Urban Ladder Furniture",
  "Chumbak Home Decor",
  "Home Centre India",
  "The Decocraft D2C",
  "Ellementry D2C Decor",
  "Zansaar Home Decor",
  "Wishkey D2C Toys Home",
  "Sattvic Home Decor",
  "Home Decor Division",
  "Lighting Products Division",
  "Premier Home Decor",
  "Universal Home Decor",
  "Diamond Home Decor",
  "Star Home Decor",
  "Apex Home Decor",
  "Royal Home Decor",
  "Classic Home Decor",
  "Precision Home Decor",
  "Fine Home Decor",
  "Elite Home Decor",
  "Advanced Home Decor",
  "Dynamic Home Decor",
  "Supreme Home Decor",
];

const allCandidates = [
  ...batch203.map((n) => ({ name: n, batch: 203 })),
  ...batch204.map((n) => ({ name: n, batch: 204 })),
  ...batch205.map((n) => ({ name: n, batch: 205 })),
  ...batch206.map((n) => ({ name: n, batch: 206 })),
  ...batch207.map((n) => ({ name: n, batch: 207 })),
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
