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

// Batch 138: Ceramics, Tiles, and Sanitaryware — replaced 8 duplicates
const batch138 = [
  "HSIL Hindware India",
  "Parryware Roca India",
  "Jaquar Group India",
  "Astral Bathware India",
  "AGL Tiles India",
  "Nexion Ceramics India",
  "Qutone Ceramics India",
  "Sunheart Group India",
  "Regalia Ceramics India",
  "Lioli Ceramics India",
  "GVT Tiles India",
  "Prismx Vitrified India",
  "Keramos Vitrified India",
  "Sakarni Ceramics India",
  "Letina Ceramics India",
  "Refin Ceramics India",
  "Millennium Tiles India",
  "Itaca Ceramics India",
  "Seron Granito India",
  "Emcer Tiles India",
  "Decorcera Tiles India",
  "Duragres Vitrified India",
  "Lavish Ceramics India",
  "Matrix Vitrified India",
  "Tropicana Ceramics India",
];

// Batch 139: Hospitality, Hotel Chains — replaced 12 duplicates
const batch139 = [
  "ITC Hotels India",
  "The Leela Palaces India",
  "Sarovar Hotels India",
  "Wyndham Hotels India",
  "Hyatt Hotels India",
  "Choice Hotels India",
  "Hilton Hotels India",
  "InterContinental Hotels India",
  "Zostel Hostels India",
  "Mahindra Holidays India",
  "Royal Orchid Hotels India",
  "Fortune Hotels India",
  "Ginger Hotels India",
  "IHCL Selections India",
  "Apeejay Surrendra Hotels India",
  "ITDC Ashok Hotels India",
  "Vivanta Hotels India",
  "Welcomhotel Chain India",
  "Clarks Hotel Group India",
  "Lords Hotels India",
  "Neemrana Heritage India",
  "CGH Earth Hotels India",
  "Evolve Back Resorts India",
  "SeleQtions Hotels India",
  "Mango Hotels India",
];

// Batch 140: Food Services, QSR, and D2C Food — replaced 10 duplicates
const batch140 = [
  "IRCTC Catering India",
  "Sodexo India India",
  "Compass Group India",
  "Elior Group India",
  "Aramark India India",
  "Barbeque Nation India",
  "Burger King India India",
  "Delhivery Logistics India",
  "Yum Brands India India",
  "Impresario Entertainment India",
  "Lite Bite Foods India",
  "Wow Momo Foods India",
  "Faasos Foods India",
  "Licious Foods India",
  "FreshToHome India",
  "Haldiram Snacks India",
  "Bikanervala Foods India",
  "Chuk Tableware India",
  "Third Wave Coffee India",
  "Levista Coffee India",
  "Fingerlix Foods India",
  "Eatclub Brands India",
  "Julian Alps Foods India",
  "Tata Starbucks India",
  "Mad Over Donuts India",
];

// Batch 141: Industrial Gases and Bulk Chemicals — replaced 1 duplicate
const batch141 = [
  "Linde Engineering India",
  "Air Liquide Engineering India",
  "Messer Industrial Gases India",
  "Praxair India India",
  "Inox Air Products India",
  "Goyal MG Gases India",
  "National Oxygen India",
  "Bhuruka Gases India",
  "Ellenbarrie Industrial India",
  "Universal Industrial Gases India",
  "Southern Gas India",
  "Sicgil Industrial Gases India",
  "Asiatic Gases India",
  "Brin Oxygen India",
  "Prakash Air India",
  "Gas Authority India",
  "Deepak Fertilisers India",
  "Gujarat Fluorochemicals India",
  "Gujarat Alkalies India",
  "GHCL India India",
  "DCM Shriram India",
  "Aarti Drugs India",
  "Thirumalai Chemicals India",
  "Vinay Chemicals India",
  "Balaji Speciality India",
];

// Batch 142: Pumps, Fluid Handling, and Water Systems — replaced 10 duplicates
const batch142 = [
  "Thermax Energy India",
  "Xylem Water Solutions India",
  "Wilo Mather Platt India",
  "Ebara Pumps India",
  "Crompton Pumps India",
  "Aquasub Engineering India",
  "Beacon Pumps India",
  "Mody Pumps India",
  "Sharp Industries Pumps India",
  "Oswal Pumps India",
  "CNP Pumps India",
  "Franklin Electric India",
  "Pentair Water India",
  "Tsurumi Pumps India",
  "Netzsch Pumps India",
  "Sulzer Water India",
  "Weg Motors India",
  "Danfoss Drives India",
  "Pumpwell Industries India",
  "Samudra Pumps India",
  "Texmo Industries India",
  "Duke Plasto India",
  "Prakash Pumps India",
  "Pioneer Pumps India",
  "Vansan Pumps India",
];

const allCandidates = [
  ...batch138.map((n) => ({ name: n, batch: 138 })),
  ...batch139.map((n) => ({ name: n, batch: 139 })),
  ...batch140.map((n) => ({ name: n, batch: 140 })),
  ...batch141.map((n) => ({ name: n, batch: 141 })),
  ...batch142.map((n) => ({ name: n, batch: 142 })),
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
