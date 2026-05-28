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

const batch173 = [
  "Bharat Heavy Transformers",
  "CG Power Transformers",
  "ABB Transformers India",
  "Siemens Transformers India",
  "Toshiba Transmission India",
  "GE Grid Solutions",
  "Schneider Grid India",
  "Alstom Grid India",
  "Loha Transformers India",
  "Prime Meiden Transformers",
  "Transformer Division India",
  "Substation Grid Division",
  "Premier Transformers India",
  "Universal Transformers India",
  "Diamond Transformers India",
  "Star Transformers India",
  "Apex Transformers India",
  "Royal Transformers India",
  "Classic Transformers India",
  "Precision Transformers India",
  "Fine Transformers India",
  "Elite Transformers India",
  "Advanced Transformers India",
  "Dynamic Transformers India",
  "Supreme Transformers India",
];

const batch174 = [
  "Mamaearth D2C Cosmetics",
  "Sugar Cosmetics D2C",
  "Nykaa D2C Cosmetics",
  "Plum Goodness D2C",
  "MCaffeine D2C Cosmetics",
  "Wow Skin Science",
  "Pilgrim D2C Cosmetics",
  "Dot Key D2C",
  "Foxtale D2C Cosmetics",
  "Minimalist D2C Cosmetics",
  "Cosmetics Division India",
  "Personal Care Division",
  "Premier Cosmetics India",
  "Universal Cosmetics India",
  "Diamond Cosmetics India",
  "Star Cosmetics India",
  "Apex Cosmetics India",
  "Royal Cosmetics India",
  "Classic Cosmetics India",
  "Precision Cosmetics India",
  "Fine Cosmetics India",
  "Elite Cosmetics India",
  "Advanced Cosmetics India",
  "Dynamic Cosmetics India",
  "Supreme Cosmetics India",
];

const batch175 = [
  "Bewakoof D2C Apparel",
  "Souled Store D2C",
  "Beyoung D2C Apparel",
  "Snitch D2C Apparel",
  "Roadster D2C Apparel",
  "HRX D2C Athleisure",
  "Campus Sutra D2C",
  "Redwolf D2C Apparel",
  "WROGN D2C Apparel",
  "Kook N Keech",
  "Fast Fashion Division",
  "Athleisure Division India",
  "Premier Apparel India",
  "Universal Apparel India",
  "Diamond Apparel India",
  "Star Apparel India",
  "Apex Apparel India",
  "Royal Apparel India",
  "Classic Apparel India",
  "Precision Apparel India",
  "Fine Apparel India",
  "Elite Apparel India",
  "Advanced Apparel India",
  "Dynamic Apparel India",
  "Supreme Apparel India",
];

const batch176 = [
  "Waaree Solar Modules",
  "Vikram Solar Modules",
  "Goldi Solar Modules",
  "Adani Solar Modules",
  "Tata Solar Modules",
  "Premier Energies Solar",
  "Servotech Solar Inverters",
  "Loom Solar Modules",
  "RenewSys Solar Modules",
  "Solar module Division",
  "Solar Inverter Division",
  "Premier Solar Division",
  "Universal Solar Division",
  "Diamond Solar Division",
  "Star Solar Division",
  "Apex Solar Division",
  "Royal Solar Division",
  "Classic Solar Division",
  "Precision Solar Division",
  "Fine Solar Division",
  "Elite Solar Division",
  "Advanced Solar Division",
  "Dynamic Solar Division",
  "Supreme Solar Division",
  "Global Solar Division",
];

const batch177 = [
  "Action Construction Cranes",
  "TIL Cranes India",
  "Escorts Kubota Cranes",
  "Godrej Forklifts Division",
  "Voltas Forklifts Division",
  "JCB Earthmovers India",
  "L&T Komatsu Earthmovers",
  "BEML Earthmovers Division",
  "Caterpillar Earthmovers India",
  "Earthmover Division India",
  "Forklift Division India",
  "Premier Cranes Division",
  "Universal Cranes Division",
  "Diamond Cranes Division",
  "Star Cranes Division",
  "Apex Cranes Division",
  "Royal Cranes Division",
  "Classic Cranes Division",
  "Precision Cranes Division",
  "Fine Cranes Division",
  "Elite Cranes Division",
  "Advanced Cranes Division",
  "Dynamic Cranes Division",
  "Supreme Cranes Division",
  "Global Cranes Division",
];

const allCandidates = [
  ...batch173.map((n) => ({ name: n, batch: 173 })),
  ...batch174.map((n) => ({ name: n, batch: 174 })),
  ...batch175.map((n) => ({ name: n, batch: 175 })),
  ...batch176.map((n) => ({ name: n, batch: 176 })),
  ...batch177.map((n) => ({ name: n, batch: 177 })),
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
