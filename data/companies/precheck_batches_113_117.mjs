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

const batch113 = [
  "Rinac India India",
  "Ice Make Refrigeration India",
  "Lloyd Insulations India",
  "Metecno India India",
  "Kingspan Jindal India",
  "Bito Storage Systems India India",
  "Blue Star Refrigeration India",
  "Rockwell Industries India",
  "Frick India India",
  "Western Refrigeration India",
  "Carey Cold Chain India",
  "Coldtech Industries India",
  "Intek Insulation India",
  "Thermocare Insulation India",
  "Paneltech Industries India",
  "Isofoam Insulations India",
  "Chillmax Refrigeration India",
  "Super Cold Chain India",
  "Polar Insulations India",
  "Freeze tech India India",
  "Chillers India India",
  "Refcon Technologies India",
  "Everest Coolers India",
  "Dynamic Coldrooms India",
  "Cooltech Insulation India",
];

const batch114 = [
  "Swaraj Protective Wear India",
  "Arvind Protective Wear India",
  "Raymond Workwear Fabrics India",
  "Welspun Workwear Textiles India",
  "Udyogi Protective Wear India",
  "Rahman Industries Safety India",
  "Superhouse Safety India",
  "Liberty Safety Footwear India",
  "Red Fort Workwear India",
  "Dynamic Safety Footwear India",
  "Euro Safety Footwear India",
  "Frontier Protective Wear India",
  "Tarasafe Workwear India",
  "Wildcroft Safety India",
  "Vaibhav Safety Wear India",
  "Safe Guard Fabrics India",
  "Prosafe Safety Wear India",
  "Shield Safety Gear India",
  "Tough Safety Shoes India",
  "Durasafe Safety Wear India",
  "Combat Safety Gear India",
  "Core Safety Footwear India",
  "Apex Safety Shoes India",
  "Excel Safety Wear India",
  "Paramount Safety Wear India",
];

const batch115 = [
  "Advanced Glassco Lab India",
  "Schott Kaisha India",
  "SGD Pharma India India",
  "Gerresheimer India India",
  "Piramal Glass Vials India",
  "Glassvials India India",
  "Lab Glassware India India",
  "Glassco Laboratory Equipments India",
  "Supertek Glass India",
  "Vensil Glass India",
  "Borosilicate Glassware India",
  "Premier Lab Glass India",
  "Apex Lab Glass India",
  "Universal Lab Glass India",
  "Scientific Glass Tube India",
  "Sigma Laboratory Glass India",
  "Micro Lab Glass India",
  "Royal Lab Glass India",
  "Classic Lab Glass India",
  "Precision Lab Glass India",
  "Allied Scientific Glass India",
  "Fine Lab Glass India",
  "Elite Glassware India",
  "Advanced Lab Glass India",
  "Quartz Laboratory Glass India",
];

const batch116 = [
  "Kaneka India India",
  "Arkema India India",
  "Solvay India India",
  "Evonik India India",
  "Covestro India India",
  "Lanxess India India",
  "Huntsman India India",
  "Wacker Chemie India India",
  "Shin-Etsu India India",
  "Toray India India",
  "Teijin India India",
  "DSM India India",
  "Sabic India India",
  "Celanese India India",
  "Zeon India India",
  "Kraton Polymers India India",
  "Lubrizol India India",
  "Clariant Specialty Polymers India",
  "Dow Chemical India India",
  "BASF Specialty Polymers India",
  "DuPont Specialty Polymers India",
  "Eastman Chemical India India",
  "Mitsui Chemicals India India",
  "Sumitomo Chemical India India",
  "Mitsubishi Chemical India India",
];

const batch117 = [
  "Diamond Chain India",
  "TI Diamond Chain India",
  "Rolcon Engineering India",
  "Lovejoy Couplings India",
  "KTR Couplings India India",
  "Vulkan Couplings India India",
  "Stromag Couplings India India",
  "Centa Couplings India India",
  "Esco Couplings India India",
  "Tschan Couplings India India",
  "Ringfeder Couplings India India",
  "Ruland Couplings India India",
  "Stafford Couplings India India",
  "Climax Metal Couplings India India",
  "Zero-Max Couplings India India",
  "Helical Couplings India India",
  "Huco Couplings India India",
  "Nabeya Bi-tech Couplings India",
  "Altra Industrial Motion India",
  "Regal Rexnord Couplings India India",
  "Fenner Drive Assemblies India",
  "Ramsey Chain India",
  "US Tsubaki India India",
  "Morse Chain India India",
  "Browning Drive Components India",
];

const allCandidates = [
  ...batch113.map((n) => ({ name: n, batch: 113 })),
  ...batch114.map((n) => ({ name: n, batch: 114 })),
  ...batch115.map((n) => ({ name: n, batch: 115 })),
  ...batch116.map((n) => ({ name: n, batch: 116 })),
  ...batch117.map((n) => ({ name: n, batch: 117 })),
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
