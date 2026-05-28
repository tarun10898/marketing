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

const batch98 = [
  "GAIL India India",
  "Gujarat Gas India",
  "Indraprastha Gas India",
  "Mahanagar Gas India",
  "Oil India India",
  "Petronet LNG India",
  "Deep Industries India",
  "Selan Exploration India",
  "Jindal Drilling India",
  "Dolphin Offshore India",
  "Aban Offshore India",
  "Hindusthan Oil Exploration India",
  "Asian Energy Services India",
  "Alphageo India India",
  "Gulf Oil Lubricants India",
  "Castrol India India",
  "Valvoline Cummins India",
  "Tide Water Oil India",
  "GP Petroleums India",
  "Eastern Petroleum India",
  "Shiv-Vani Oil & Gas India",
  "Quippo Infrastructure India",
  "Confident Petroleum India",
  "IRM Energy India",
  "Bengal Gas Company India",
];

const batch99 = [
  "Landmark Cars India",
  "Popular Vehicles & Services India",
  "TVS Mobility India",
  "Mandovi Motors India",
  "Kalyani Motors India",
  "Bimal Auto Agency India",
  "Advaith Hyundai India",
  "Trident Hyundai India",
  "Pratham Motors India",
  "Kothari Wheels India",
  "Shaman Wheels India",
  "Autobahn Enterprises India",
  "Modi Motors India",
  "Lally Motors India",
  "Dada Motors India",
  "Speedwell Motors India",
  "Dynamic Motors India",
  "Garve Motors India",
  "Sterling Motor Company India",
  "Himgiri Hyundai India",
  "OSL Luxury Car India",
  "Navnit Motors India",
  "Infinity Cars India",
  "EVM Motors India",
  "Talwar Auto Garage India",
];

const batch100 = [
  "Shree Ajit Pulp and Paper India",
  "South India Paper Mills India",
  "Genus Paper & Boards India",
  "Astron Paper & Board Mill India",
  "Malu Paper Mills India",
  "Sripathi Paper Boards India",
  "Siddharth Papers India",
  "Katyayini Paper Mills India",
  "Kuantum Papers India",
  "Satia Industries India",
  "N R Agarwal Industries India",
  "Emami Paper Mills India",
  "Rama Pulp & Papers India",
  "Everest Organics Paper India",
  "Pudumjee Paper Products India",
  "Shreyans Industries India",
  "Murli Industries Paper India",
  "Balkrishna Paper Mills India",
  "Laxmi Board and Paper India",
  "Coastal Papers India",
  "Kay Power and Paper India",
  "Sarda Papers India",
  "Servalakshmi Paper India",
  "Jayant Paper Mills India",
  "Shree Rama Newsprint India",
];

const batch101 = [
  "Tipco Industries India",
  "OK Play India India",
  "National Plastic Industries India",
  "Vimla Plast India",
  "Prima Plastics India",
  "Avro India India",
  "Formulated Polymers India",
  "Mitsu Chem Plast India",
  "Commercial Syn Bags India",
  "PIL Italica Lifestyle India",
  "Bright Brothers India",
  "Polylink Polymers India",
  "Dhabriya Polywood India",
  "Mayur Uniquoters India",
  "Sintex BAPL India",
  "Uniplast India India",
  "TPL Plastech India",
  "Khator Fibre & Fabrics India",
  "Machino Plastics India",
  "Megaplast India India",
  "Rex Pipes & Cables India",
  "Apex Plastics India",
  "Kkalpana Industries India",
  "Garg Plastics India",
  "Rishi Techtex India",
];

const batch102 = [
  "Bharat Forge India",
  "Ramkrishna Forgings India",
  "Happy Forgings India",
  "Precision Camshafts India",
  "Pradeep Metals India",
  "Steelcast Limited India",
  "Synergy Green Industries India",
  "Bhagwati Autocast India",
  "Electrosteel Castings India",
  "Nelcast Limited India",
  "Kasturi Foundry India",
  "Kirloskar Ferrous Industries India",
  "Simplex Castings India",
  "Magna Electro Castings India",
  "Rucha Yantra India",
  "BFL Forgings India",
  "Hilton Metal Forging India",
  "Simonds Forgtech India",
  "Continental Forgings India",
  "Western India Forgings India",
  "Metalyst Forgings India",
  "Ahmednagar Forgings India",
  "Amtek Auto India",
  "Castex Technologies India",
  "Smith Forgings India",
];

const allCandidates = [
  ...batch98.map((n) => ({ name: n, batch: 98 })),
  ...batch99.map((n) => ({ name: n, batch: 99 })),
  ...batch100.map((n) => ({ name: n, batch: 100 })),
  ...batch101.map((n) => ({ name: n, batch: 101 })),
  ...batch102.map((n) => ({ name: n, batch: 102 })),
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
