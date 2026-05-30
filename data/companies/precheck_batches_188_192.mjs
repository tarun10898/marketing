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

const batch188 = [
  "VA Tech Wabag Water",
  "Ion Exchange India",
  "Thermax Water Division",
  "Triveni Engineering Water",
  "Praj Industries Water",
  "Aqua Designs India",
  "Fontus Water Treatment",
  "Eureka Forbes Pureit",
  "Tata Swach Water Purifier",
  "Livpure Water Purifier",
  "Water Treatment Division",
  "Desalination Division India",
  "Premier Water Systems",
  "Universal Water Systems",
  "Diamond Water Systems",
  "Star Water Systems",
  "Apex Water Systems",
  "Royal Water Systems",
  "Classic Water Systems",
  "Precision Water Systems",
  "Fine Water Systems",
  "Elite Water Systems",
  "Advanced Water Systems",
  "Dynamic Water Systems",
  "Supreme Water Systems",
];

const batch189 = [
  "Drools Pet Food India",
  "Heads Up For Tails D2C",
  "Supertails D2C Pet",
  "Zigly D2C Pet Care",
  "PetKonnect D2C",
  "Wiggles D2C Pet Health",
  "Cesar Pet Food India",
  "Pedigree India Division",
  "Whiskas India Division",
  "Mars Petcare India",
  "D2C Pet Care Division",
  "Animal Health Division",
  "Premier Pet Care India",
  "Universal Pet Care India",
  "Diamond Pet Care India",
  "Star Pet Care India",
  "Apex Pet Care India",
  "Royal Pet Care India",
  "Classic Pet Care India",
  "Precision Pet Care India",
  "Fine Pet Care India",
  "Elite Pet Care India",
  "Advanced Pet Care India",
  "Dynamic Pet Care India",
  "Supreme Pet Care India",
];

const batch190 = [
  "RITES Rail Consultancy",
  "IRCON International Rail",
  "RVNL Rail Vikas Nigam",
  "Chittaranjan Locomotive Rail",
  "Texmaco Rail Engineering",
  "Jupiter Wagons Rail",
  "BEML Rail Division",
  "Medha Servo Drives Rail",
  "Kernex Microsystems Rail",
  "Alstom India Rail",
  "Railway Rolling Stock Division",
  "Signaling Systems Division",
  "Premier Rail Systems India",
  "Universal Rail Systems India",
  "Diamond Rail Systems India",
  "Star Rail Systems India",
  "Apex Rail Systems India",
  "Royal Rail Systems India",
  "Classic Rail Systems India",
  "Precision Rail Systems India",
  "Fine Rail Systems India",
  "Elite Rail Systems India",
  "Advanced Rail Systems India",
  "Dynamic Rail Systems India",
  "Supreme Rail Systems India",
];

const batch191 = [
  "WeWork India Coworking",
  "Awfis Coworking Spaces",
  "91Springboard Coworking",
  "Smartworks Coworking",
  "IndiQube Coworking",
  "Cowrks Coworking Spaces",
  "Innov8 Coworking Spaces",
  "BHive Coworking Spaces",
  "Quikr Facility Mgmt",
  "CBRE India Facilities",
  "Coworking Division India",
  "Facility Management Division",
  "Premier Facilities India",
  "Universal Facilities India",
  "Diamond Facilities India",
  "Star Facilities India",
  "Apex Facilities India",
  "Royal Facilities India",
  "Classic Facilities India",
  "Precision Facilities India",
  "Fine Facilities India",
  "Elite Facilities India",
  "Advanced Facilities India",
  "Dynamic Facilities India",
  "Supreme Facilities India",
];

const batch192 = [
  "Mamaearth D2C Skincare",
  "mCaffeine D2C Beauty",
  "Vedix D2C Ayurvedic",
  "WOW Skin Science D2C",
  "Dot and Key D2C",
  "Juicy Chemistry D2C",
  "Kama Ayurveda D2C Beauty",
  "Forest Essentials D2C Beauty",
  "Biotique D2C Ayurvedic",
  "Khadi Natural D2C",
  "D2C Skincare Division",
  "Ayurvedic Beauty Division",
  "Premier Skincare India",
  "Universal Skincare India",
  "Diamond Skincare India",
  "Star Skincare India",
  "Apex Skincare India",
  "Royal Skincare India",
  "Classic Skincare India",
  "Precision Skincare India",
  "Fine Skincare India",
  "Elite Skincare India",
  "Advanced Skincare India",
  "Dynamic Skincare India",
  "Supreme Skincare India",
];

const allCandidates = [
  ...batch188.map((n) => ({ name: n, batch: 188 })),
  ...batch189.map((n) => ({ name: n, batch: 189 })),
  ...batch190.map((n) => ({ name: n, batch: 190 })),
  ...batch191.map((n) => ({ name: n, batch: 191 })),
  ...batch192.map((n) => ({ name: n, batch: 192 })),
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
