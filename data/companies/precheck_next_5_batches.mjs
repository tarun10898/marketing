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

const batch53 = [
  "Blue Dart Express India",
  "Safexpress India",
  "Container Corporation of India",
  "Transport Corporation of India",
  "Gati India",
  "Allcargo Logistics India",
  "Mahindra Logistics India",
  "VRL Logistics India",
  "InterGlobe Aviation India",
  "SpiceJet India",
  "Air India India",
  "Akasa Air India",
  "Shiprocket India",
  "Porter India",
  "Shadowfax India",
  "BlackBuck India",
  "ElasticRun India",
  "Rivigo India",
  "Ecom Express India",
  "Xpressbees India",
  "Blowhorn India",
  "Locus India",
  "LogiNext India",
  "FarEye India",
  "Fleetx India",
];

const batch54 = [
  "Indian Hotels Company India",
  "EIH India",
  "Lemon Tree Hotels India",
  "Chalet Hotels India",
  "Speciality Restaurants India",
  "Westlife Foodworld India",
  "Devyani International India",
  "Jubilant FoodWorks India",
  "Rebel Foods India",
  "Yatra India",
  "Easy Trip Planners India",
  "Thomas Cook India",
  "Cleartrip India",
  "Sterling Holidays India",
  "Treebo Hotels India",
  "FabHotels India",
  "Sayaji Hotels India",
  "TravelTriangle India",
  "Thrillophilia India",
  "Club Mahindra India",
  "SOTC Travel India",
  "Cox & Kings India",
  "EatFit India",
  "Chai Point India",
  "Chaayos India",
];

const batch55 = [
  "BYJU'S India",
  "Testbook India",
  "Infinity Learn India",
  "Great Learning India",
  "Eruditus India",
  "Simplilearn India",
  "Edureka India",
  "Classplus India",
  "Adda247 India",
  "Lead School India",
  "CueMath India",
  "Doubtnut India",
  "Toppr India",
  "Brainly India",
  "Career 360 India",
  "S Chand and Company India",
  "Navneet Education India",
  "Repro India",
  "Macmillan Publishers India",
  "Oxford University Press India",
  "Pearson India",
  "Allen Career Institute India",
  "Resonance India",
  "FIITJEE India",
  "Akash Educational Services India",
];

const batch56 = [
  "Apollo Health and Lifestyle India",
  "Medanta India",
  "Thyrocare Technologies India",
  "Shalby India",
  "Kovai Medical Center and Hospital India",
  "Indraprastha Medical Corporation India",
  "KIMS Hospitals India",
  "Rainbow Children's Medicare India",
  "Artemis Medicare Services India",
  "Healthcare Global Enterprises India",
  "Vijaya Diagnostic Centre India",
  "Polymedicure India",
  "Tarsons Products India",
  "Opto Circuits India",
  "Wipro GE Healthcare India",
  "Siemens Healthineers India",
  "Philips Healthcare India",
  "Johnson & Johnson Medical India",
  "Medtronic India",
  "Becton Dickinson India",
  "Roche Diagnostics India",
  "Merck India",
  "GlaxoSmithKline Pharmaceuticals India",
  "Sanofi India",
  "Novartis India",
];

const batch57 = [
  "Voltas India",
  "Blue Star India",
  "Finolex Cables India",
  "Crompton Greaves Consumer Electricals India",
  "Orient Electric India",
  "Bajaj Electricals India",
  "Usha International India",
  "Symphony India",
  "V-Guard Industries India",
  "Polycab India",
  "TTK Prestige India",
  "Hawkins Cookers India",
  "Butterfly Gandhimathi Appliances India",
  "IFB Industries India",
  "EPL India",
  "Dixion Technologies India",
  "Amber Enterprises India",
  "PG Electroplast India",
  "Syrma SGS Technology India",
  "Kaynes Technology India",
  "Avalon Technologies India",
  "Elin Electronics India",
  "Ikio Lighting India",
  "Godrej & Boyce India",
  "Eureka Forbes India",
];

const allCandidates = [
  ...batch53.map((n) => ({ name: n, batch: 53 })),
  ...batch54.map((n) => ({ name: n, batch: 54 })),
  ...batch55.map((n) => ({ name: n, batch: 55 })),
  ...batch56.map((n) => ({ name: n, batch: 56 })),
  ...batch57.map((n) => ({ name: n, batch: 57 })),
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
