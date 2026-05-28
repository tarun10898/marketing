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

const batch153 = [
  "Ujjivan Small Finance",
  "Jana Small Finance",
  "Equitas Small Finance",
  "AU Small Finance",
  "Capital Small Finance",
  "Fincare Small Finance",
  "Suryoday Small Finance",
  "ESAF Small Finance",
  "Utkarsh Small Finance",
  "Spandana Sphoorty Financial",
  "Satin Creditcare Network",
  "CreditAccess Grameen",
  "Arohan Financial Services",
  "Muthoot Microfin",
  "Svatantra Microfin",
  "Fusion Microfinance",
  "Annapurna Finance",
  "Asirvad Microfinance",
  "Bandhan Financial Services",
  "Belstar Microfinance",
  "Chaitanya India Fin Credit",
  "Sonata Microfinance",
  "Share Microfin Limited",
  "Cashpor Microcredit",
  "Grameen Koota Financial",
];

const batch154 = [
  "Modern Insulators",
  "Aditya Birla Insulators",
  "WS Industries India",
  "BHEL Insulators Division",
  "Jaipur Glass Insulators",
  "Ojas Insulators",
  "Rashtriya Insulators",
  "Hindustan Insulators",
  "National Insulators",
  "Premier Insulators",
  "Universal Insulators",
  "Diamond Insulators",
  "Star Insulators",
  "Apex Insulators",
  "Royal Insulators",
  "Classic Insulators",
  "Precision Insulators",
  "Fine Insulators",
  "Elite Insulators",
  "Advanced Insulators",
  "Dynamic Insulators",
  "Supreme Insulators",
  "Bharat Insulators",
  "Global Insulators",
  "Shakti Insulators",
];

const batch155 = [
  "Hinduja Foundries",
  "Ductron Castings",
  "Kastwel Foundries",
  "Loha Foundries",
  "Neco Casting Industries",
  "Peekay Steel Castings",
  "Foundry Division India",
  "Bhartia Mini Steel",
  "Indo Shell Cast",
  "Sakar Industries Castings",
  "Nahar Foundries",
  "Crescent Foundry",
  "RGL Industries",
  "Brakes India Foundry",
  "L&T Foundry Division",
  "BHEL Foundry Division",
  "Tata Foundry Division",
  "Mahindra Foundry Division",
  "Ashok Leyland Foundry",
  "Premier Foundry",
  "Universal Foundry",
  "Diamond Foundry",
  "Star Foundry",
  "Apex Foundry",
  "Royal Foundry",
];

const batch156 = [
  "Harrisons Malayalam Plantations",
  "McLeod Russel Estates",
  "Bombay Burmah Estates",
  "Jay Shree Tea",
  "Darjeeling Tea Plantations",
  "Assam Company Estates",
  "Andrew Yule Tea",
  "Rossell India Tea",
  "Dhunseri Tea",
  "Kanan Devan Hills Plantations",
  "Tata Coffee Estates",
  "CCL Coffee Estates",
  "United Nilgiri Tea",
  "Craigmore Estates",
  "Devon Plantations",
  "Woodbriar Group",
  "Glendale Tea Estate",
  "Chamong Tea",
  "Makaibari Tea Estate",
  "Castleton Tea Estate",
  "Glenburn Tea Estate",
  "Jungpana Tea Estate",
  "Margaret's Hope Tea",
  "Happy Valley Tea",
  "Goomtee Tea Estate",
];

const batch157 = [
  "IRB Infrastructure Tollways",
  "Ashoka Buildcon Highway",
  "Sadbhav Engineering Road",
  "Dilip Buildcon Road",
  "PNC Infratech Highway",
  "KNR Constructions Highway",
  "H G Infra Road",
  "G R Infraprojects Road",
  "MEP Infrastructure Highways",
  "ITNL Road Infrastructure",
  "Highway Concessions One",
  "Cube Highways India",
  "National Highways Authority India",
  "Maharashtra State Road Development",
  "Karnataka Road Development Corp",
  "Larsen Toubro Highways",
  "Reliance Infrastructure Roadways",
  "GMR Highways Roadways",
  "Adani Road Transport",
  "Welspun Enterprises Roadways",
  "Tata Realty Roadways",
  "Dilip Buildcon Tollways",
  "Ashoka Concessions Limited",
  "MEP Toll Roadways",
  "Highway Infrastructure Developers",
];

const allCandidates = [
  ...batch153.map((n) => ({ name: n, batch: 153 })),
  ...batch154.map((n) => ({ name: n, batch: 154 })),
  ...batch155.map((n) => ({ name: n, batch: 155 })),
  ...batch156.map((n) => ({ name: n, batch: 156 })),
  ...batch157.map((n) => ({ name: n, batch: 157 })),
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
