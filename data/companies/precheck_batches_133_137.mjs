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

const batch133 = [
  "SRF Specialty Chemicals India",
  "Navin Fluorine India",
  "Clean Science Technology India",
  "Laxmi Organic Industries India",
  "Anupam Rasayan India",
  "Tatva Chintan Pharma India",
  "Aether Industries India",
  "Archean Chemical Industries India",
  "Himadri Speciality India",
  "Valiant Organics India",
  "Bodal Chemicals India",
  "Atul Limited India",
  "NOCIL Limited India",
  "Alkyl Amines India",
  "Balaji Amines India",
  "Oriental Aromatics India",
  "Privi Speciality India",
  "Sudarshan Chemical India",
  "Camlin Fine Sciences India",
  "Fairchem Organics India",
  "Meghmani Organics India",
  "Transpek Industry India",
  "Bhageria Industries India",
  "Shree Pushkar Chemicals India",
  "Ami Organics India",
];

const batch134 = [
  "Welspun India Textiles",
  "Trident Group Textiles India",
  "Raymond Textiles India",
  "Arvind Textiles India",
  "KPR Mill India",
  "Gokaldas Exports India",
  "Indo Count Industries India",
  "Himatsingka Seide India",
  "Sutlej Textiles India",
  "Nahar Spinning India",
  "RSWM Textiles India",
  "Donear Industries India",
  "Nitin Spinners India",
  "Sangam Textiles India",
  "Birla Century Textiles India",
  "Ambika Cotton India",
  "Loyal Textile Mills India",
  "Mafatlal Industries India",
  "Rieter India India",
  "Saurer Textiles India",
  "SP Apparels India",
  "Dollar Industries India",
  "Lux Industries India",
  "Rupa Company India",
  "Monte Carlo Fashions India",
];

const batch135 = [
  "Fasal AgriTech India",
  "BharatAgri India",
  "Plantix India",
  "FarmERP India",
  "SatSure India",
  "Intello Labs India",
  "WayCool Foods India",
  "S4S Technologies India",
  "Farmizen India",
  "AgNext Technologies India",
  "Arya Collateral India",
  "Jai Kisan India",
  "Oxen Farm India",
  "KrishiHub India",
  "GramCover India",
  "FarmGuide India",
  "EM3 AgriServices India",
  "Ergos Agritech India",
  "AgriRain Systems India",
  "Unnati Agritech India",
  "Clover Ventures India",
  "AgriQ Analytics India",
  "ReshaMandi India",
  "Otipy Fresh India",
  "SuperZop India",
];

const batch136 = [
  "Garden Reach Shipbuilders India",
  "Goa Shipyard India",
  "Hindustan Shipyard India",
  "L&T Shipbuilding India",
  "ABG Shipyard India",
  "Pipavav Defence India",
  "Bharati Shipyard India",
  "Chowgule Shipyard India",
  "Shoft Shipyard India",
  "Modest Infrastructure India",
  "Dempo Shipbuilding India",
  "Great Eastern Shipping India",
  "Shipping Corp India",
  "Mercator Shipping India",
  "Varun Shipping India",
  "Samudra Shipyard India",
  "Titagarh Rail Systems India",
  "Swan Energy Marine India",
  "Wadia Shipyard India",
  "Reliance Naval India",
  "IHC India India",
  "Colombo Dockyard India",
  "Hooghly Dock India",
  "Shalimar Works India",
  "Alcock Ashdown India",
];

const batch137 = [
  "Havells Appliances India",
  "Crompton Greaves Consumer India",
  "Butterfly Gandhimathi India",
  "Stove Kraft India",
  "Elica India India",
  "Faber Appliances India",
  "Preethi Kitchen India",
  "Voltas Beko India",
  "Morphy Richards India",
  "Kent RO Systems India",
  "Livpure Appliances India",
  "A O Smith India",
  "Racold Thermo India",
  "Panasonic Appliances India",
  "Philips Domestic India",
  "Whirlpool Appliances India",
  "Haier Appliances India",
  "Samsung Consumer India",
  "LG Electronics Appliances India",
  "Daikin Airconditioning India",
  "Blue Star Appliances India",
  "Symphony Coolers India",
  "Carrier Midea India",
  "Brita Water India",
  "AquaSure Purifiers India",
];

const allCandidates = [
  ...batch133.map((n) => ({ name: n, batch: 133 })),
  ...batch134.map((n) => ({ name: n, batch: 134 })),
  ...batch135.map((n) => ({ name: n, batch: 135 })),
  ...batch136.map((n) => ({ name: n, batch: 136 })),
  ...batch137.map((n) => ({ name: n, batch: 137 })),
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
