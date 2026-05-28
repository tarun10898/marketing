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

const batch108 = [
  "Fresh and Healthy Enterprises India",
  "Gati Kausar India",
  "Coldstar Logistics India",
  "Crystal Group Logistics India",
  "MJ Logistics Services India",
  "Indo-Arya Logistics India",
  "RK Foodland India",
  "Dev Bhumi Cold Chain India",
  "Kailash Cold Storage India",
  "Associated Cold Stores India",
  "Dynamic Cold Chain India",
  "Silverline Cold Storage India",
  "Snowfresh Logistics India",
  "Arctic Cold Chain India",
  "Cold Chain Express India",
  "Iceberg Cold Storage India",
  "Glacier Cold Chain India",
  "Blue Water Cold Storage India",
  "Polar Cold Chain India",
  "Freezezone Logistics India",
  "Chilltech Cold Chain India",
  "Cool Line Logistics India",
  "Alpine Cold Storage India",
  "Zero Degree Logistics India",
  "Frostline Cold Storage India",
];

const batch109 = [
  "Mallcom India India",
  "Karam Safety India",
  "Venus Safety & Health India",
  "Sure Safety India India",
  "Joseph Leslie & Co India",
  "Industrial Safety Products India",
  "Liberty Safety Shoes India",
  "Allen Cooper Safety India",
  "Hillson Safety Footwear India",
  "Acme Safety Footwear India",
  "Tiger Safety Shoes India",
  "Safetech India India",
  "Kings Safety Wear India",
  "Udyogi Safety India",
  "Safe Guard India India",
  "Protector Safety India",
  "Honeywell Safety India India",
  "MSA Safety India India",
  "3M Safety India India",
  "Ansell Safety India India",
  "DuPont Safety India India",
  "Dräger Safety India India",
  "Armstrong Safety Wear India",
  "Technova Safety India",
  "Dynamic Safety Solutions India",
];

const batch110 = [
  "Hindusthan National Glass India",
  "Empire Glass Containers India",
  "Gujarat Guardian Glass India",
  "Haldyn Glassworks India",
  "Schott Poonawalla India",
  "Haldyn Heinz Fine Glass India",
  "Empire Industries Vitrum Glass India",
  "Excel Glasses India",
  "Glass Container India India",
  "Victory Glass Industries India",
  "Mahalaxmi Glass Works India",
  "Krishna Glass Works India",
  "Ajanta Bottle India",
  "Glasspack India India",
  "Capital Glass India",
  "Bharat Glass Tube India",
  "Star Glass Containers India",
  "Premier Glass Works India",
  "Apex Glass Bottles India",
  "United Glass Bottles India",
  "Standard Glass Works India",
  "Surya Glass Bottles India",
  "Central Glass Industries India",
  "Royal Glassware India",
  "Pearl Glass Containers India",
];

const batch111 = [
  "Bajaj Plast India",
  "Master Compounding India",
  "Fine Polymer Additives India",
  "Goldstab Organics India",
  "Baerlocher India India",
  "Songwon Specialty Chemicals India",
  "Adeka India India",
  "Vinayaka Masterbatches India",
  "Satyam Polyplast India",
  "Omega Masterbatches India",
  "Riddhi Masterbatches India",
  "Sai Masterbatches India",
  "Delta Polymers India",
  "Dynamic Polymers India",
  "Polycolor India India",
  "Rainbow Masterbatches India",
  "Spectrum Masterbatches India",
  "Classic Polymers India",
  "Technicolor Masterbatches India",
  "Matrix Polymers India",
  "Excel Masterbatches India",
  "Super Polymers India",
  "Micro Masterbatches India",
  "Vardhman Masterbatches India",
  "Sun Masterbatches India",
];

const batch112 = [
  "Gearbox India India",
  "Premium Transmission India",
  "Radicon Powerbuild Transmission India",
  "Allison Transmission India India",
  "Bonfiglioli Transmission India India",
  "SEW-Eurodrive India India",
  "Flender India India",
  "Rexnord India India",
  "Nord Drivesystems India India",
  "Motovario Gearboxes India India",
  "Rossi Gearmotors India India",
  "Sumitomo Drive Technologies India India",
  "Fenner India India",
  "Renold Chain India India",
  "Tsubaki India India",
  "Challenge Power Transmission India India",
  "Martin Sprocket & Gear India India",
  "Gates India India",
  "Optibelt India India",
  "Habasit India India",
  "Chiorino India India",
  "Forbo Siegling India India",
  "Nitta Corporation India India",
  "Megadyne India India",
  "Bando India India",
];

const allCandidates = [
  ...batch108.map((n) => ({ name: n, batch: 108 })),
  ...batch109.map((n) => ({ name: n, batch: 109 })),
  ...batch110.map((n) => ({ name: n, batch: 110 })),
  ...batch111.map((n) => ({ name: n, batch: 111 })),
  ...batch112.map((n) => ({ name: n, batch: 112 })),
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
