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

const batch123 = [
  "Talbros Gaskets India",
  "Payen Gaskets India India",
  "Victor Gaskets India India",
  "Banco Gaskets India India",
  "Tevta Seals India India",
  "Leakproof Gaskets India",
  "Super Gaskets India",
  "Perfect Gaskets India",
  "Apex Gaskets India",
  "Universal Gaskets India",
  "Sigma Seals India",
  "Micro Seals India",
  "Royal Seals India",
  "Classic Seals India",
  "Precision Seals India",
  "Allied Seals India",
  "Fine Seals India",
  "Elite Seals India",
  "Advanced Seals India",
  "Quartz Seals India",
  "Borosilicate Seals India",
  "Gasket Sheets India India",
  "Seal Rings India India",
  "Sealing Solutions India India",
  "Industrial Gaskets India India",
];

const batch124 = [
  "Loba Chemie India",
  "SD Fine Chem India",
  "CDH Fine Chemicals India",
  "Thomas Baker India India",
  "Spectrochem India India",
  "Rankem Chemicals India",
  "HiMedia Laboratories India",
  "Avantor Performance Materials India",
  "Thermo Fisher Diagnostics India",
  "Merck Life Science India",
  "Sigma-Aldrich India India",
  "Bio-Rad Laboratories India",
  "Quest Diagnostics India",
  "Abbott Diagnostics India",
  "Beckman Coulter India",
  "Sysmex India India",
  "Ortho Clinical Diagnostics India",
  "Horiba India India",
  "Tulip Diagnostics India",
  "Trivector Biomed India",
  "Beacon Diagnostics India",
  "Agappe Diagnostics India",
  "Transasia Bio-Medicals India",
  "Erba Diagnostics India",
  "J Mitra India",
];

const batch125 = [
  "Honeywell Sensors India",
  "Baumer Sensors India",
  "Pepperl+Fuchs Sensors India",
  "Banner Engineering Sensors India",
  "Sick Sensors India",
  "Ifm Electronic Sensors India",
  "Turck Sensors India",
  "Keyence Sensors India",
  "Cognex Sensors India",
  "Balluff Sensors India",
  "Omron Sensors India",
  "Panasonic Sensors India",
  "Autonics Sensors India",
  "Selec Sensors India",
  "Gefran Sensors India",
  "Dynisco Sensors India",
  "Wika Sensors India",
  "Ashcroft Sensors India",
  "Danfoss Sensors India",
  "Endress+Hauser Sensors India",
  "Krohne Sensors India",
  "Yokogawa Sensors India",
  "ABB Sensors India",
  "Siemens Sensors India",
  "Schneider Sensors India",
];

const batch126 = [
  "LMW Machine Tools India",
  "Ace Micromatic India",
  "Bharat Fritz Werner India",
  "Precihole Machine Tools India",
  "Jyoti CNC Automation India",
  "Macpower CNC India",
  "Gedee Weiler India",
  "Premier Machine Tools India",
  "Batliboi Machine Tools India",
  "Kennametal India India",
  "Sandvik Coromant India",
  "Seco Tools India",
  "Walter Tools India",
  "Guhring India India",
  "Mitsubishi Materials India",
  "Kyocera Precision Tools India",
  "TaeguTec India India",
  "Widia India India",
  "Ceratizit India India",
  "Korloy India India",
  "Tungaloy India India",
  "Addisons Cutting Tools India",
  "Miranda Tools India",
  "Birla Precision India",
  "Totem Cutting Tools India",
];

const batch127 = [
  "Audco Valves India",
  "L&T Valves India India",
  "Grundfos Pumps India",
  "Kirloskar Pumps India India",
  "WPIL Pumps India India",
  "Sintech Pumps India",
  "Sujal Pumps India",
  "Pluga Pumps India India",
  "Lubi Pumps India India",
  "Varuna Pumps India",
  "CRI Pumps India India",
  "Texmo Pumps India India",
  "Taro Pumps India India",
  "Suguna Pumps India India",
  "Deccan Pumps India India",
  "Mahendra Pumps India India",
  "Sharp Pumps India India",
  "Flowmore Pumps India",
  "Johnston Pumps India",
  "Mather+Platt Pumps India",
  "Jyoti Pumps India",
  "Kirloskar Ebara Pumps India",
  "Best & Crompton India",
  "Worthington Pumps India",
  "Ingersoll-Rand Pumps India",
];

const allCandidates = [
  ...batch123.map((n) => ({ name: n, batch: 123 })),
  ...batch124.map((n) => ({ name: n, batch: 124 })),
  ...batch125.map((n) => ({ name: n, batch: 125 })),
  ...batch126.map((n) => ({ name: n, batch: 126 })),
  ...batch127.map((n) => ({ name: n, batch: 127 })),
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
