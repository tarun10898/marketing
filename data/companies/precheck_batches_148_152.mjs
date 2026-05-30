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

const batch148 = [
  "Otis Elevators India",
  "Schindler Elevators India",
  "Kone Elevators India",
  "Thyssenkrupp Elevator India",
  "Johnson Lifts India",
  "Mitsubishi Elevator India",
  "Fujitec Elevators India",
  "Hitachi Lift India",
  "Omega Elevators India",
  "ECE Elevators India",
  "Trio Elevators India",
  "Escon Elevators India",
  "Apex Elevators India",
  "Citizen Elevators India",
  "Bharat Lifts India",
  "Express Elevators India",
  "Stannah Lifts India",
  "Hyundai Lifts India",
  "Sigma Lifts India",
  "Toshiba Elevators India",
  "ORONA Elevators India",
  "Pappas Elevators India",
  "Kleemann Lifts India",
  "Glarie Elevators India",
  "Stiltz Lifts India",
];

const batch149 = [
  "SGS Testing India",
  "TUV SUD India",
  "Bureau Veritas India",
  "Intertek Quality India",
  "Quality Council India",
  "TUV Rheinland India",
  "TUV Nord India",
  "DNV Certification India",
  "Lloyds Register India",
  "Eurofins Clinical India",
  "Cotecna Inspection India",
  "ALS Testing India",
  "Inspectorate India India",
  "Mitra SK India",
  "UL Verification India",
  "Applus IDIADA India",
  "Dekra Certification India",
  "BSI Assurance India",
  "Sirim QAS India",
  "QIMA Quality India",
  "Vimta Labs India",
  "Choksi Laboratories India",
  "Spectro Analytical India",
  "TCR Engineering India",
  "Shriram Institute India",
];

const batch150 = [
  "Ultraviolette Automotive India",
  "Ather Energy India",
  "Altigreen EV India",
  "Euler Motors India",
  "Magenta Mobility India",
  "Sun Mobility India",
  "Battery Smart India",
  "Log9 Materials India",
  "Exicom EV Charging",
  "Yulu Bikes India",
  "Bounce Infinity India",
  "Lectrix EV India",
  "HOP Electric India",
  "Odysse Electric India",
  "Kinetic Green India",
  "Lohum Cleantech India",
  "TI Clean Mobility",
  "Tork Motors India",
  "Revolt Motors India",
  "Matter Motor Works",
  "Hero Electric India",
  "Okinawa Autotech India",
  "Ampere Vehicles India",
  "Jitendra EV India",
  "Joy eBike India",
];

const batch151 = [
  "GMR Airports India",
  "Adani Airports India",
  "AISATS Ground India",
  "Celebi Ground India",
  "Bird Ground Handling",
  "Bhadra Ground India",
  "Air Works India",
  "Indamer Aviation India",
  "GMR Aero Technic",
  "Taj Air India",
  "Deccan Charters India",
  "Club One Air",
  "Pinnacle Air India",
  "JetSetGo Aviation India",
  "Airseva Services India",
  "GlobeGround India India",
  "NAS India Ground",
  "Menzies Aviation India",
  "Swissport India Ground",
  "Dnata Ground India",
  "SATS Cargo India",
  "TFS Airport Dining",
  "Cochin Airport Services",
  "Bangalore Airport IT",
  "Delhi Airport Developers",
];

const batch152 = [
  "Captiva Power India",
  "Cummins Generators India",
  "Kirloskar Powerol India",
  "Jakson Power India",
  "Captiva Power India",
  "Sudhir Power India",
  "Mahindra Powerol India",
  "Sterling Generators India",
  "Koel Green Generators",
  "Ashok Leyland Power",
  "Greaves Power India",
  "Luminous Power India",
  "Microtek Power India",
  "Genlite Generators India",
  "Perfect Generators India",
  "Supernova Generators India",
  "Bhaskar Power India",
  "Elgi Power Generators",
  "Bpower Systems India",
  "Powerica Generators India",
  "Captiva Power India",
  "Silent Power India",
  "Genset India India",
  "Control Power India",
  "Diesel Power India",
  "Stamford Alternators India",
  "Leroy Somer India",
];

const allCandidates = [
  ...batch148.map((n) => ({ name: n, batch: 148 })),
  ...batch149.map((n) => ({ name: n, batch: 149 })),
  ...batch150.map((n) => ({ name: n, batch: 150 })),
  ...batch151.map((n) => ({ name: n, batch: 151 })),
  ...batch152.map((n) => ({ name: n, batch: 152 })),
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
