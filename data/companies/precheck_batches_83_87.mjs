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

const batch83 = [
  "Gravita India India",
  "Madhav Copper India",
  "Maithan Alloys India",
  "Indian Metals & Ferro Alloys India",
  "FACOR Alloys India",
  "Rohit Ferro-Tech India",
  "Shyam Metalics and Energy India",
  "Adani Enterprises Mining Division India",
  "Sunflag Iron and Steel India",
  "Prakash Industries India",
  "Lloyds Metals and Energy India",
  "Mahamaya Steel Industries India",
  "Steel Exchange India India",
  "Jayswal Neco Industries India",
  "Kalyani Steels India",
  "Suryadev Alloys and Power India",
  "Visa Steel India",
  "Pennar Industries India",
  "Salasar Techno Engineering India",
  "Goodluck India India",
  "Rama Steel Tubes India",
  "Hariom Pipe Industries India",
  "APL Apollo Tubes India",
  "Hi-Tech Pipes India",
  "JTL Industries India",
];

const batch84 = [
  "Farida Group India",
  "KH Group India",
  "Tata International Leather Division India",
  "Florence Shoe India",
  "Indian Leather Corporation India",
  "Bharatiya International India",
  "Euro Footwear India",
  "Lotus Footwear India",
  "Allanasons Leather Division India",
  "Sovereign Leather India",
  "Zahur Sansons Paper & Leather India",
  "Mayur Leather Products India",
  "Hansa Leather India",
  "Rajda Industries India",
  "Mochiko Shoes India",
  "SSIPL Retail India",
  "Forward Shoe India",
  "Prime Shoes India",
  "Kisco Leather India",
  "Tirubala Group India",
  "Walkaroo International India",
  "Uday Footwear India",
  "Kito India",
  "Bahamas Footwear India",
  "Gola Shoes India",
];

const batch85 = [
  "DIC India India",
  "Toyo Ink India India",
  "Hubergroup India India",
  "Siegwerk India India",
  "Flint Group India India",
  "Sakata Inks India",
  "Hi-Tech Inks India",
  "Printlink Inks India",
  "United Ink and Varnish India",
  "Rainbow Inks India",
  "Vikas Publishing India",
  "Eicher Goodearth Publications India",
  "Rupa & Co Publishing India",
  "Jaico Publishing House India",
  "Prabhat Prakashan India",
  "Rajpal & Sons India",
  "Kitab Mahal India",
  "Kalyani Publishers India",
  "Laxmi Publications India",
  "Arihant Publications India",
  "MTG Learning Media India",
  "Rachna Sagar India",
  "Oswaal Books India",
  "Saraswati House India",
  "Ratna Sagar India",
];

const batch86 = [
  "Saatvik Green Energy India",
  "Pixon Green Energy India",
  "Alpex Solar India",
  "Insolation Energy India",
  "Navitas Green Solutions India",
  "Redington Solar India",
  "Renewsys India India",
  "Mundra Solar India",
  "TP Solar India",
  "Ganesh Green Bharat India",
  "Premier Solar Systems India",
  "Shurjo Energy India",
  "Emmvee Photovoltaic Power India",
  "Elpro International India",
  "Solar Semiconductor India",
  "Sova Solar India",
  "Luminous Power Technologies Solar India",
  "Microtek Infrastructure Solar India",
  "Su-Kam Power Systems Solar India",
  "Exide Industries Solar Division India",
  "Amara Raja Solar India",
  "Statcon Energia India",
  "Okaya Power Solar India",
  "Eastman Auto & Power Solar India",
  "Genus Innovation Solar India",
];

const batch87 = [
  "Obeetee Carpets India",
  "Jaipur Rugs India",
  "D'Decor Home Fabrics India",
  "Spaces by Welspun India",
  "Portico New York India",
  "Swayam India India",
  "Maspar India India",
  "Sarom Fab India",
  "GM Fabrics India",
  "Marshalls Wallcoverings India",
  "Elementto Wallcoverings India",
  "Nilaya by Asian Paints India",
  "Sabyasachi Home India",
  "The Loom Art India",
  "Freedom Tree India",
  "Art D'Inox India",
  "Ellementry India",
  "Deco Window India",
  "Wonderchef Home Appliances India",
  "Stahl Cookware India",
  "Alda Cookware India",
  "Meyer Cookware India",
  "Vinod Cookware India",
  "Bergner India India",
  "Fissler India India",
];

const allCandidates = [
  ...batch83.map((n) => ({ name: n, batch: 83 })),
  ...batch84.map((n) => ({ name: n, batch: 84 })),
  ...batch85.map((n) => ({ name: n, batch: 85 })),
  ...batch86.map((n) => ({ name: n, batch: 86 })),
  ...batch87.map((n) => ({ name: n, batch: 87 })),
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
