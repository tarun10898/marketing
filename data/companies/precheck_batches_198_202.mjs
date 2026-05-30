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

const batch198 = [
  "Wakefit Sleep Solutions",
  "Sleepycat Mattresses",
  "The Sleep Company",
  "Sleepwell Mattresses India",
  "Kurlon Mattresses India",
  "Duroflex Mattresses",
  "Flo Mattress D2C",
  "Sunday Mattress D2C",
  "Springwel Mattresses",
  "Centuary Mattresses",
  "Sleep Solutions Division",
  "Mattress Development Division",
  "Premier Sleep Solutions",
  "Universal Sleep Solutions",
  "Diamond Sleep Solutions",
  "Star Sleep Solutions",
  "Apex Sleep Solutions",
  "Royal Sleep Solutions",
  "Classic Sleep Solutions",
  "Precision Sleep Solutions",
  "Fine Sleep Solutions",
  "Elite Sleep Solutions",
  "Advanced Sleep Solutions",
  "Dynamic Sleep Solutions",
  "Supreme Sleep Solutions",
];

const batch199 = [
  "Beardo Men Grooming",
  "The Man Company D2C",
  "Bombay Shaving Company",
  "Ustraa Men Grooming",
  "Spruce Shave Club D2C",
  "LetsShave Men Grooming",
  "Wild Stone Men Grooming",
  "Park Avenue Men Grooming",
  "Axe Men Grooming India",
  "Cinthol Men Grooming",
  "Men Grooming Division",
  "Grooming Products Division",
  "Premier Men Grooming",
  "Universal Men Grooming",
  "Diamond Men Grooming",
  "Star Men Grooming",
  "Apex Men Grooming",
  "Royal Men Grooming",
  "Classic Men Grooming",
  "Precision Men Grooming",
  "Fine Men Grooming",
  "Elite Men Grooming",
  "Advanced Men Grooming",
  "Dynamic Men Grooming",
  "Supreme Men Grooming",
];

const batch200 = [
  "MDH Spices Masalas",
  "Everest Masalas India",
  "Badshah Masala Spices",
  "Sakthi Masala Spices",
  "Eastern Condiments Spices",
  "Pushp Spices Masala",
  "Goldiee Masale Spices",
  "MTR Foods Spices",
  "Aachi Masala Spices",
  "Roopak Spices Delhi",
  "Spices Manufacturing Division",
  "Masala Development Division",
  "Premier Spices Condiments",
  "Universal Spices Condiments",
  "Diamond Spices Condiments",
  "Star Spices Condiments",
  "Apex Spices Condiments",
  "Royal Spices Condiments",
  "Classic Spices Condiments",
  "Precision Spices Condiments",
  "Fine Spices Condiments",
  "Elite Spices Condiments",
  "Advanced Spices Condiments",
  "Dynamic Spices Condiments",
  "Supreme Spices Condiments",
];

const batch201 = [
  "Vestas Wind India",
  "Inox Wind Power",
  "KP Energy Wind",
  "Orient Green Power Wind",
  "Hero Future Energies Wind",
  "Adani Green Wind",
  "Tata Power Wind",
  "JSW Energy Wind",
  "Senvion Wind Technology",
  "Wind World India",
  "Wind Power Division India",
  "Wind Turbine Manufacturing",
  "Premier Wind Power",
  "Universal Wind Power",
  "Diamond Wind Power",
  "Star Wind Power",
  "Apex Wind Power",
  "Royal Wind Power",
  "Classic Wind Power",
  "Precision Wind Power",
  "Fine Wind Power",
  "Elite Wind Power",
  "Advanced Wind Power",
  "Dynamic Wind Power",
  "Supreme Wind Power",
];

const batch202 = [
  "Red Tape Footwear",
  "Campus Activewear Shoes",
  "Sparx Footwear India",
  "Bucik Shoes D2C",
  "Metro Brands Footwear",
  "VKC Lite Footwear",
  "Centrino Shoes India",
  "Ajanta Footwear India",
  "Doctor Extra Soft Footwear",
  "Asian Shoes India",
  "Footwear Retail Division",
  "Athleisure Development Div",
  "Premier Footwear Accessories",
  "Universal Footwear Accessories",
  "Diamond Footwear Accessories",
  "Star Footwear Accessories",
  "Apex Footwear Accessories",
  "Royal Footwear Accessories",
  "Classic Footwear Accessories",
  "Precision Footwear Accessories",
  "Fine Footwear Accessories",
  "Elite Footwear Accessories",
  "Advanced Footwear Accessories",
  "Dynamic Footwear Accessories",
  "Supreme Footwear Accessories",
];

const allCandidates = [
  ...batch198.map((n) => ({ name: n, batch: 198 })),
  ...batch199.map((n) => ({ name: n, batch: 199 })),
  ...batch200.map((n) => ({ name: n, batch: 200 })),
  ...batch201.map((n) => ({ name: n, batch: 201 })),
  ...batch202.map((n) => ({ name: n, batch: 202 })),
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
