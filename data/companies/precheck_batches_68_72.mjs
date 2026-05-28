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

const batch68 = [
  "Triveni Engineering Industries India",
  "Balrampur Chini Mills India",
  "Shree Renuka Sugars India",
  "EID Parry India",
  "Dalmia Bharat Sugar and Industries India",
  "Dhampur Sugar Mills India",
  "Dwarikesh Sugar Industries India",
  "Uttam Sugar Mills India",
  "Avadh Sugar Energy India",
  "Magadh Sugar Energy India",
  "KCP Sugar Industries Corporation India",
  "Bannari Amman Sugars India",
  "Ponni Sugars Erode India",
  "Mawana Sugars India",
  "Rana Sugars India",
  "Simbhaoli Sugars India",
  "Sakthi Sugars India",
  "Kesar Enterprises India",
  "GMB Sugar India",
  "Piccadily Agro Industries India",
  "KM Sugar Mills India",
  "Riga Sugar Company India",
  "Vishwaraj Sugar Industries India",
  "Indian Sucrose India",
  "Davangere Sugar Company India",
];

const batch69 = [
  "Singareni Collieries Company India",
  "NMDC India",
  "Hindustan Copper India",
  "Hindustan Zinc India",
  "National Aluminium Company India",
  "Manganese Ore India Limited India",
  "Gujarat Mineral Development Corporation India",
  "Sandur Manganese Iron Ores India",
  "Orissa Minerals Development Company India",
  "Deccan Gold Mines India",
  "Ashapura Minechem India",
  "KIOCL India",
  "Bharat Aluminium Company India",
  "Madras Aluminium Company India",
  "Hutti Gold Mines India",
  "Rajasthan State Mines and Minerals India",
  "Odisha Mining Corporation India",
  "Mineral Exploration and Consultancy India",
  "IREL India",
  "UCIL India",
  "Goa Carbon India",
  "Imerys Talc India",
  "Sarda Energy Minerals India",
  "GPIL India",
  "Jindal Saw India",
];

const batch70 = [
  "DB Corp India",
  "Mathrubhumi India",
  "Eenadu India",
  "Next Mediaworks India",
  "Hindustan Media Ventures India",
  "Infomedia Press India",
  "Sandesh India",
  "Sambhaav Media India",
  "Raj Television Network India",
  "TV Today Network India",
  "NDTV India",
  "TV18 Broadcast India",
  "Viacom18 India",
  "Tips Industries India",
  "Times Innovative Media India",
  "Radio Mirchi India",
  "Radio City India",
  "DEN Networks India",
  "Hathway Cable Datacom India",
  "Dish TV India India",
  "Tata Play India",
  "Airtel Digital TV India",
  "Sun Direct India",
  "NXTDIGITAL India",
  "Siti Networks India",
];

const batch71 = [
  "Sintex Plastics Technology India",
  "Nilkamal India",
  "Wimplast India",
  "Cello World India",
  "Shaily Engineering Plastics India",
  "Kingfa Science Technology India",
  "Jain Irrigation Systems India",
  "Kriti Industries India",
  "Plastiblends India",
  "Supreme Petrochem India",
  "DCW India",
  "Pearl Polymers India",
  "Signet Industries India",
  "Garware Technical Fibres India",
  "Garware Hi-Tech Films India",
  "Xpro India India",
  "Arrow Greentech India",
  "Innovassynth Technologies India",
  "Bhansali Engineering Polymers India",
  "Styrenix Performance Materials India",
  "Rajasthan Petro Synthetics India",
  "Savita Oil Technologies India",
  "Panama Petrochem India",
  "Gandhar Oil Refinery India",
  "Apar Industries India",
];

const batch72 = [
  "Lakshmi Machine Works India",
  "Kirloskar Pneumatic India",
  "Kirloskar Oil Engines India",
  "Elgi Equipments India",
  "Triveni Turbine India",
  "Craftsman Automation India",
  "Alicon Castalloy India",
  "Pricol India",
  "Sharda Motor Industries India",
  "Lumax Auto Technologies India",
  "Lumax Industries India",
  "Uno Minda India",
  "Suprajit Engineering India",
  "Gabriel India India",
  "Subros India",
  "Banco Products India",
  "Rane Madras India",
  "Rane Engine Valve India",
  "Rane Brake Lining India",
  "Rico Auto Industries India",
  "Automotive Axles India",
  "Talbros Automotive Components India",
  "Wheels India India",
  "Steel Strips Wheels India",
  "Sundram Fasteners India",
];

const allCandidates = [
  ...batch68.map((n) => ({ name: n, batch: 68 })),
  ...batch69.map((n) => ({ name: n, batch: 69 })),
  ...batch70.map((n) => ({ name: n, batch: 70 })),
  ...batch71.map((n) => ({ name: n, batch: 71 })),
  ...batch72.map((n) => ({ name: n, batch: 72 })),
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
