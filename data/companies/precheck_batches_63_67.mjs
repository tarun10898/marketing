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

const batch63 = [
  "Berger Paints India",
  "Kansai Nerolac Paints India",
  "Akzo Nobel India",
  "Indigo Paints India",
  "Astral Pipes India",
  "Prince Pipes and Fittings India",
  "Finolex Industries India",
  "Ambuja Cements India",
  "ACC India",
  "Shree Cement India",
  "Dalmia Bharat India",
  "Ramco Cements India",
  "JK Cement India",
  "Birla Corporation India",
  "HeidelbergCement India",
  "Orient Cement India",
  "Kajaria Ceramics India",
  "Somany Ceramics India",
  "Cera Sanitaryware India",
  "Greenply Industries India",
  "Century Plyboards India",
  "Asahi India Glass India",
  "Borosil Renewables India",
  "Borosil India",
  "La Opala RG India",
];

const batch64 = [
  "Tata Consumer Products India",
  "CCL Products India",
  "Tata Coffee India",
  "Bombay Burmah Trading Corporation India",
  "McLeod Russel India",
  "Goodricke Group India",
  "Jay Shree Tea Industries India",
  "Andrew Yule Company India",
  "Harrisons Malayalam India",
  "Warren Tea India",
  "United Spirits India",
  "Radico Khaitan India",
  "United Breweries India",
  "Sula Vineyards India",
  "Som Distilleries and Breweries India",
  "Tilaknagar Industries India",
  "Globus Spirits India",
  "GM Breweries India",
  "Varun Beverages India",
  "Coca-Cola India",
  "PepsiCo India",
  "Hector Beverages India",
  "Sleepy Owl Coffee India",
  "Blue Tokai Coffee India",
  "Rage Coffee India",
];

const batch65 = [
  "Barbeque Nation Hospitality India",
  "Restaurant Brands Asia India",
  "Sapphire Foods India",
  "Coffee Day Enterprises India",
  "Curefoods India",
  "Keventers India",
  "Bikanervala India",
  "Gits Food India",
  "MTR Foods India",
  "Maiyas Beverages and Foods India",
  "Adyar Ananda Bhavan India",
  "Saravana Bhavan India",
  "Wow! Momo India",
  "Burger Singh India",
  "Biryani By Kilo India",
  "FreshMenu India",
  "Box8 India",
  "Tea Post India",
  "Chai Tapri India",
  "Samosa Party India",
  "Gusto Foods India",
  "Kaati Zone India",
  "Nando's India",
  "Subway India",
  "Pizza Hut India",
];

const batch66 = [
  "Bharat Electronics India",
  "Hindustan Aeronautics India",
  "Bharat Dynamics India",
  "Mishra Dhatu Nigam India",
  "Mazagon Dock Shipbuilders India",
  "GRSE India",
  "Cochin Shipyard India",
  "BEML India",
  "BHEL India",
  "Solar Industries India",
  "Zen Technologies India",
  "Astra Microwave Products India",
  "Paras Defence and Space Technologies India",
  "Data Patterns India",
  "Dynamatic Technologies India",
  "Apollo Micro Systems India",
  "MTAR Technologies India",
  "IdeaForge Technology India",
  "HBL Power Systems India",
  "Centum Electronics India",
  "Premier Explosives India",
  "Vem Technologies India",
  "Sika Interplant Systems India",
  "Nibe India",
  "DCG Cables Wires India",
];

const batch67 = [
  "Adani Ports and Special Economic Zone India",
  "Shipping Corporation of India India",
  "Great Eastern Shipping Company India",
  "Shreyas Shipping and Logistics India",
  "Essar Shipping India",
  "Mercator India",
  "Global Offshore Services India",
  "Seamec India",
  "Jindal Drilling Industries India",
  "Dolphin Offshore Enterprises India",
  "Gujarat Pipavav Port India",
  "JSW Infrastructure India",
  "Western India Shipyard India",
  "Tebma Shipyards India",
  "Chokhani International India",
  "Hooghly Cochin Shipyard India",
  "JNPA India",
  "Deendayal Port Authority India",
  "Kolkata Port Trust India",
  "Mumbai Port Authority India",
  "Chennai Port Authority India",
  "Tuticorin Port Authority India",
  "Cochin Port Authority India",
  "New Mangalore Port Authority India",
  "Mormugao Port Authority India",
];

const allCandidates = [
  ...batch63.map((n) => ({ name: n, batch: 63 })),
  ...batch64.map((n) => ({ name: n, batch: 64 })),
  ...batch65.map((n) => ({ name: n, batch: 65 })),
  ...batch66.map((n) => ({ name: n, batch: 66 })),
  ...batch67.map((n) => ({ name: n, batch: 67 })),
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
