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

const batch128 = [
  "Ace Weld India",
  "Ador Welding India",
  "ESAB Welding India",
  "Lincoln Electric India",
  "Thermadyne Welding India",
  "Fronius Welding India",
  "Miller Welding India",
  "Kemppi Welding India",
  "Hobart Welding India",
  "Victor Technologies India",
  "Bohler Welding India",
  "Voestalpine Welding India",
  "Air Liquide Welding India",
  "Linde Welding India",
  "Messer Welding India",
  "Saluja Engineering India",
  "D&H Secheron India",
  "Advani Oerlikon India",
  "Supercut Welding India",
  "Weld India Industries India",
  "National Welding India",
  "Star Welding India",
  "Premier Welding India",
  "Universal Welding India",
  "Diamond Welding India",
];

const batch129 = [
  "Thermax Boilers India",
  "Triveni Boilers India",
  "Bharat Heavy Electricals India",
  "Cethar Vessels India",
  "Forbes Marshall India",
  "Cheema Boilers India",
  "Balkrishna Boilers India",
  "Transparent Energy India",
  "Microtech Boilers India",
  "Industrial Boilers India",
  "Urjex Boilers India",
  "Ross Boilers India",
  "Thermodyne Boilers India",
  "Energy Pack Boilers India",
  "Maxima Boilers India",
  "Saz Boilers India",
  "Elite Thermal Engineers India",
  "Shanti Boilers India",
  "Aero Therm Systems India",
  "Nestler Boilers India",
  "JP Energy Boilers India",
  "Devotion Boilers India",
  "Hi-Therm Boilers India",
  "Garioni Naval India",
  "Cochran Boilers India",
];

const batch130 = [
  "Godrej Tooling India",
  "Bharat Gears India",
  "ZF India India",
  "Dana India India",
  "BorgWarner India India",
  "Wabash National India",
  "Continental Automotive India",
  "Valeo India India",
  "Bosch Automotive India",
  "Delphi Technologies India",
  "Aptiv India India",
  "Magna International India",
  "Aisin India India",
  "Denso India India",
  "NGK Spark Plugs India",
  "NTN Bearings India India",
  "NSK Bearings India India",
  "Koyo Bearings India India",
  "JTEKT India India",
  "Showa India India",
  "Hitachi Astemo India",
  "Mando India India",
  "Hanon Systems India",
  "Hella India India",
  "Faurecia India India",
];

const batch131 = [
  "Blue Dart Aviation India",
  "Quess Corp India",
  "TeamLease Services India",
  "Randstad India India",
  "Adecco India India",
  "ManpowerGroup India India",
  "Kelly Services India India",
  "Gi Group India India",
  "ABC Consultants India",
  "Shine Jobs India India",
  "Indeed India India",
  "Monster India India",
  "Foundit India India",
  "HireRight India India",
  "Ciel HR India India",
  "Genius Consultants India",
  "IKYA Human Capital India",
  "SutraHR India India",
  "Xpheno India India",
  "Hunt Partners India India",
  "Heidrick Struggles India",
  "Egon Zehnder India",
  "Spencer Stuart India",
  "Korn Ferry India",
  "Michael Page India",
];

const batch132 = [
  "Epiroc Mining India",
  "Sandvik Mining India",
  "Metso Outotec India",
  "FLSmidth India India",
  "Thyssenkrupp Mining India",
  "Terex Mining India",
  "Weir Minerals India",
  "Xylem India India",
  "Alfa Laval India India",
  "SPX Flow India India",
  "Sulzer Pumps India",
  "Circor Flow India India",
  "ITT India India",
  "Dover India India",
  "Circor India India",
  "IDEX India India",
  "Colfax India India",
  "Graco India India",
  "Nordson India India",
  "Parker Hannifin India",
  "Eaton India India",
  "Emerson India India",
  "Honeywell Process India",
  "Rockwell Automation India",
  "Yokogawa India India",
];

const allCandidates = [
  ...batch128.map((n) => ({ name: n, batch: 128 })),
  ...batch129.map((n) => ({ name: n, batch: 129 })),
  ...batch130.map((n) => ({ name: n, batch: 130 })),
  ...batch131.map((n) => ({ name: n, batch: 131 })),
  ...batch132.map((n) => ({ name: n, batch: 132 })),
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
