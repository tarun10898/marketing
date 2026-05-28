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

const batch118 = [
  "Coldreef Transport India",
  "Arctic Reefer India",
  "Polar Reefer India",
  "Cool Reef India India",
  "Chilled Transport India",
  "Refrigerated Transport Corporation India",
  "Ice Trans India India",
  "Freeze Trans India India",
  "Cool Trucks India",
  "Chill Trucks India",
  "Glacier Reefer India",
  "Snow Reefer India",
  "Frost Reefer India",
  "Alpine Reefer India",
  "Cold Carrier India India",
  "Polar Carrier India India",
  "Cool Logix India India",
  "Refer Cargo India India",
  "Chilled Cargo India India",
  "Thermal Transport India",
  "Cold Flow Reefer India",
  "Polar Flow Reefer India",
  "Ice Flow Reefer India",
  "Zero Reefer India India",
  "Cool Move Reefer India",
];

const batch119 = [
  "Swastik Fire Safety India",
  "Safex Fire Safety India",
  "Kanex Fire Safety India",
  "Minimax Fire Safety India",
  "Agni Fire Safety India",
  "Ceasefire Industries India",
  "Gunnebo Fire Safety India",
  "Newage Fire Protection India",
  "Aska Equipment Fire India",
  "UTC Fire & Security India",
  "Tyco Fire Security India",
  "Nitin Fire Protection India",
  "Vijay Fire Vehicles India",
  "Zenith Fire Services India",
  "Supreme Fire Safety India",
  "Rapid Fire Safety India",
  "Active Fire Safety India",
  "Flame Safeguard India India",
  "Fire Pro India India",
  "Pyro Safeguard India India",
  "Fire Shield India India",
  "Heat Shield India India",
  "Safe Flame India India",
  "Agni Protection India India",
  "Agni Guard India India",
];

const batch120 = [
  "Super Scientific Glass India",
  "Borosil Glass Tubes India",
  "Glassco Scientific India",
  "Top Glass Laboratory India",
  "Prime Lab Instruments India",
  "Apex Glass Instruments India",
  "Universal Glass Instruments India",
  "Scientific Glass Instruments India",
  "Sigma Lab Instruments India",
  "Micro Lab Instruments India",
  "Royal Lab Instruments India",
  "Classic Lab Instruments India",
  "Precision Lab Instruments India",
  "Allied Lab Instruments India",
  "Fine Lab Instruments India",
  "Elite Lab Instruments India",
  "Advanced Lab Instruments India",
  "Quartz Lab Instruments India",
  "Borosilicate Lab Instruments India",
  "Glass Tubes India India",
  "Lab Tubes India India",
  "Scientech Glass India India",
  "Labtech Glass India India",
  "Glassware Instruments India India",
  "Scientific Tubes India India",
];

const batch121 = [
  "Covestro Polycarbonates India",
  "Sabic Nylons India India",
  "Celanese Nylons India India",
  "Lanxess Engineering Plastics India",
  "Huntsman Specialty Polymers India",
  "DSM Nylons India India",
  "Sabic Polyacetal India India",
  "Celanese Polyacetal India India",
  "Zeon Synthetic Polymers India",
  "Kraton Specialty Polymers India",
  "Lubrizol Specialty Polymers India",
  "Dow Engineering Plastics India",
  "BASF Specialty Nylons India",
  "DuPont Specialty Nylons India",
  "Eastman Specialty Polymers India",
  "Mitsui Specialty Polymers India",
  "Sumitomo Specialty Polymers India",
  "Mitsubishi Specialty Polymers India",
  "sabic Resins India India",
  "Celanese Resins India India",
  "Covestro Resins India India",
  "Lanxess Resins India India",
  "Huntsman Resins India India",
  "Wacker Specialty Polymers India",
  "Shin-Etsu Specialty Polymers India",
];

const batch122 = [
  "Diamond Industrial Belts India",
  "TI Industrial Belts India",
  "Renold Industrial Belts India",
  "Rolcon Industrial Belts India",
  "Tsubaki Industrial Belts India",
  "Lovejoy Industrial Belts India",
  "KTR Industrial Belts India",
  "Vulkan Industrial Belts India",
  "Stromag Industrial Belts India",
  "Centa Industrial Belts India",
  "Esco Industrial Belts India",
  "Tschan Industrial Belts India",
  "Ringfeder Industrial Belts India",
  "Ruland Industrial Belts India",
  "Stafford Industrial Belts India",
  "Climax Industrial Belts India",
  "Zero-Max Industrial Belts India",
  "Helical Industrial Belts India",
  "Huco Industrial Belts India",
  "Nabeya Industrial Belts India",
  "Altra Industrial Belts India",
  "Regal Industrial Belts India",
  "Fenner Pulleys India India",
  "Martin Pulleys India India",
  "Ramsey Pulleys India India",
];

const allCandidates = [
  ...batch118.map((n) => ({ name: n, batch: 118 })),
  ...batch119.map((n) => ({ name: n, batch: 119 })),
  ...batch120.map((n) => ({ name: n, batch: 120 })),
  ...batch121.map((n) => ({ name: n, batch: 121 })),
  ...batch122.map((n) => ({ name: n, batch: 122 })),
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
