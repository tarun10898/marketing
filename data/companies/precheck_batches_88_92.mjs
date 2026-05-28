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

const batch88 = [
  "SKF India India",
  "Timken India India",
  "Schaeffler India India",
  "NRB Bearings India",
  "Menon Bearings India",
  "Austin Engineering India",
  "Galaxy Bearings India",
  "Bimetal Bearings India",
  "SNL Bearings India",
  "Gajra Bevel Gears India",
  "Harsha Engineers International India",
  "Sona BLW Precision Forgings India",
  "Sansera Engineering India",
  "Munjal Showa India",
  "Munjal Auto Industries India",
  "Spark Minda India",
  "Endurance Technologies India",
  "Varroc Engineering India",
  "Sandhar Technologies India",
  "Fiem Industries India",
  "Padmini VNA Mechatronics India",
  "Sterling Tools India",
  "MM Forgings India",
  "LGB & Bros India",
  "Ucal Fuel Systems India",
];

const batch89 = [
  "John Fowler India India",
  "Purolator India India",
  "Fleetguard Filters India",
  "Donaldson India India",
  "Mann & Hummel Filter India",
  "Sartorius India India",
  "Pall India India",
  "Amiad Filtration India",
  "Rotex Automation India",
  "KSB Pumps India",
  "Kirloskar Brothers Limited India",
  "WPIL India",
  "Roto Pumps India",
  "Shakti Pumps India",
  "Falcon Pumps India",
  "Lubrite Industries India",
  "Cenlub Industries India",
  "Lincoln Helios India",
  "Vickers Systems India",
  "Veljan Denison India",
  "Hydax Hydraulics India",
  "Tractor Engineers India",
  "Dynamic Hydraulics India",
  "Flowmore India",
  "Flowserve India India",
];

const batch90 = [
  "L&T Switchgear India",
  "Schneider Electric Infrastructure India",
  "Hitachi Energy India",
  "Siemens Limited India",
  "Crabtree India",
  "Legrand India India",
  "Hager India India",
  "C&S Electric India",
  "Kaycee Industries India",
  "Anchor Electricals India",
  "Goldmedal Electricals India",
  "GM Modular India",
  "Cona Electricals India",
  "GreatWhite Global India",
  "Kolors India",
  "Elmeasure India India",
  "HPL Electric & Power India",
  "Indo Asian Fusegear India",
  "BCH Electric India",
  "EPCOS India",
  "GE T&D India India",
  "Transformers & Rectifiers India India",
  "Voltamp Transformers India",
  "Schneider Electric IT India",
  "Socomec India India",
];

const batch91 = [
  "Taj GVK Hotels & Resorts India",
  "HRH Group of Hotels India",
  "WelcomHeritage Hotels India",
  "Neemrana Hotels India",
  "CGH Earth India",
  "The Leela Palaces Hotels and Resorts India",
  "Trident Hotels India",
  "Fortune Park Hotels India",
  "Vana Retreat India",
  "Ananda in the Himalayas India",
  "The Park Hotels India",
  "Zuri Hotels & Resorts India",
  "Lalit Suri Hospitality Group India",
  "Radisson Hotels Group India",
  "Hyatt India India",
  "Marriott International India India",
  "Hilton India India",
  "Novotel India India",
  "Accor Hotels India India",
  "Red Fox Hotels India",
  "Pride Hotels India",
  "Sarovar Hotels & Resorts India",
  "Country Club Hospitality & Holidays India",
  "Golden Tulip India India",
  "Khyber Himalayan Resort India",
];

const batch92 = [
  "Chiripal Poly Films India",
  "Max Speciality Films India",
  "Flex Films India",
  "Vacmet India India",
  "Nahar Poly Films India",
  "Jasch Industries India",
  "Time Mauser India",
  "Gilt Pack India",
  "Mold-Tek Blow Plast India",
  "Positive Packaging India",
  "Packsys India",
  "Bilcare India",
  "Huhtamaki Webtech India",
  "Albea India India",
  "Constantia Flexibles India",
  "Amcor Flexibles India India",
  "Berry Global India India",
  "Sealed Air India India",
  "Scholle IPN India",
  "Huhtamaki PPL India",
  "Bemis India India",
  "Winpak India India",
  "Coveris India India",
  "Printpack India India",
  "Sonoco India India",
];

const allCandidates = [
  ...batch88.map((n) => ({ name: n, batch: 88 })),
  ...batch89.map((n) => ({ name: n, batch: 89 })),
  ...batch90.map((n) => ({ name: n, batch: 90 })),
  ...batch91.map((n) => ({ name: n, batch: 91 })),
  ...batch92.map((n) => ({ name: n, batch: 92 })),
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
