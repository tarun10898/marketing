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

const batch143 = [
  "Castrol Lubricants India",
  "Gulf Oil India",
  "Aditya Oil India",
  "Tide Water Lubricants India",
  "GP Petroleums Lubricants",
  "Gandhar Oil India",
  "Panama Petrochem Lubricants",
  "Raj Petro India",
  "Valvoline Lubricants India",
  "Shell Oils India",
  "ExxonMobil Lubricants India",
  "Total Lubricants India",
  "Fuchs Lubricants India",
  "Motul Oils India",
  "Veedol Lubricants India",
  "Servo Oils India",
  "Mak Lubricants India",
  "HP Lubricants India",
  "United Grease India",
  "Balmer Lawrie Lubricants",
  "Standard Greases India",
  "Chevron Oronite India",
  "IPOL Lubricants India",
  "Shield Lubricants India",
  "Lubricant Specialities India",
];

const batch144 = [
  "UPL Agrochemicals India",
  "PI Industries Agrochemicals",
  "Adama Agrochemicals India",
  "Syngenta Agrochemicals India",
  "BASF Crop Protection India",
  "Coromandel Fertilizers India",
  "Chambal Agrochemicals India",
  "Nagarjuna Agrichem India",
  "Sharda Cropchem India",
  "Rallis Agrochemicals India",
  "Bharat Rasayan India",
  "Insecticides India India",
  "Krishi Rasayan India",
  "Meghmani Agrochemicals India",
  "Excel Industries Agrochemicals",
  "Gharda Chemicals Agrochemicals",
  "Sulphur Mills India",
  "Crystal Crop Protection India",
  "Willowood Agrochemicals India",
  "Best Agrochem India",
  "Heranba Industries India",
  "HPM Chemicals India",
  "Indofil Industries Agrochemicals",
  "Astec LifeSciences India",
  "AIMCO Pesticides India",
];

const batch145 = [
  "Pidilite Adhesives India",
  "Astral Adhesives India",
  "Henkel Adhesives India",
  "3M Adhesives India",
  "Bostik Adhesives India",
  "Sika Adhesives India",
  "Huntsman Adhesives India",
  "Arkema Adhesives India",
  "HB Fuller India",
  "Pidilite Speciality India",
  "Resicol Adhesives India",
  "Benson Adhesives India",
  "Jubilant Adhesives India",
  "Century Adhesives India",
  "Anabond Adhesives India",
  "Metro Adhesives India",
  "Dural Adhesives India",
  "National Adhesives India",
  "Bondtite Adhesives India",
  "Araldite Adhesives India",
  "Loctite Adhesives India",
  "Fevikwik Adhesives India",
  "Dr Fixit Sealants India",
  "M-Seal Sealants India",
  "Wacker Adhesives India",
];

const batch146 = [
  "Hero Cycles India",
  "TI Cycles India",
  "Atlas Cycles India",
  "Avon Cycles India",
  "Hercules Cycles India",
  "BSA Cycles India",
  "Firefox Bikes India",
  "Stryder Cycles India",
  "Eastman Cycles India",
  "Leader Cycles India",
  "SK Bikes India",
  "Kross Bikes India",
  "Hamilton Cycles India",
  "Roadmaster Cycles India",
  "Montra Bikes India",
  "Suncross Bikes India",
  "Ninety One Cycles India",
  "EMotorad EBikes India",
  "Hero Lectro EBikes India",
  "Toutche EBikes India",
  "Svitch Moto EBikes India",
  "Being Human Ecycles India",
  "Decathlon Fitness India",
  "Jerai Fitness India",
  "Cosco Fitness India",
];

const batch147 = [
  "Aditya Birla Retail India",
  "DMart Avenue Supermarts",
  "Big Bazaar Future Retail",
  "Spencer's Retail India",
  "More Retail India",
  "Star Bazaar Retail India",
  "Easyday Retail India",
  "Spar Hypermarket India",
  "Vishal Mega Mart India",
  "Metro Cash Carry India",
  "Lotts Wholesale India",
  "Reliance Smart India",
  "More Supermarket India",
  "24 Seven Retail India",
  "In & Out Retail India",
  "Nature's Basket India",
  "Foodhall Retail India",
  "Trent Star Bazaar India",
  "Hypercity Retail India",
  "Nilgiris Retail India",
  "Heritage Fresh India",
  "City Kart Retail India",
  "Bazaar Kolkata Retail",
  "Koutons Retail India",
  "Gini Jony Retail India",
];

const allCandidates = [
  ...batch143.map((n) => ({ name: n, batch: 143 })),
  ...batch144.map((n) => ({ name: n, batch: 144 })),
  ...batch145.map((n) => ({ name: n, batch: 145 })),
  ...batch146.map((n) => ({ name: n, batch: 146 })),
  ...batch147.map((n) => ({ name: n, batch: 147 })),
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
