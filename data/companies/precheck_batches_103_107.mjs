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

const batch103 = [
  "Bihar Tubes India",
  "Maharashtra Seamless India",
  "Suryasteel Pipes India",
  "ISMT Limited India",
  "Venus Pipes & Tubes India",
  "Ratnamani Metals & Tubes India",
  "Man Industries India",
  "Gandhi Special Tubes India",
  "Prakash Steelage India",
  "Zenith Steel Pipes India",
  "Lalit Pipes & Pipes India",
  "Oil Country Tubular India",
  "GTV Engineering India",
  "Suraj Limited India",
  "Scania Pipes India",
  "Tirupati Tubes India",
  "Mukat Pipes India",
  "Quality Foils India India",
  "Utkarsh India India",
  "Jindal Industries India",
  "Apollo Metalex India",
  "Shankara Building Products India",
  "Nova Iron & Steel India",
  "Rajkumar Tubes India",
  "Kundan Industries India",
];

const batch104 = [
  "Kalyani Forge India",
  "Mahindra Forgings India",
  "Autoline Industries India",
  "Rasandik Engineering India",
  "Omax Autos India",
  "GNA Axles India",
  "Kross Limited India",
  "Gears and Shafts India",
  "JMT Auto India",
  "India Pistons India",
  "Gearock Forgings India",
  "Super Forgings & Steels India",
  "Dynamic Forgings India",
  "Universal Forgings India",
  "Imperial Auto Industries India",
  "Badve Engineering India",
  "Sun Forgings India",
  "Setco Automotive India",
  "Jamna Auto Industries India",
  "Sundaram-Clayton India",
  "Wabco India India",
  "Auto Fit India India",
  "Pritika Auto Industries India",
  "IP Rings India",
  "Menam Forgings India",
];

const batch105 = [
  "Poddar Pigments India",
  "Clariant Chemicals India",
  "Ampacet India India",
  "Cabot India India",
  "Alok Masterbatches India",
  "Blend Colors India",
  "JJ Plastalloy India",
  "Rajiv Plastic Industries India",
  "Colloids India India",
  "Polmann India India",
  "Sukano India India",
  "Polyone India India",
  "Americhem India India",
  "Tosaf India India",
  "A Schulman India India",
  "Masterbatch India India",
  "Rika Plast India",
  "Fine Blend Polymer India",
  "Krypton Industries India",
  "Polyspin Exports India",
  "Shree Rama Multi-Tech India",
  "Synthetic Packaging India",
  "Polycon International India",
  "Dugar Polymers India",
  "Sumeet Industries India",
];

const batch106 = [
  "Suguna Foods India",
  "Apex Frozen Foods India",
  "Avanti Feeds India",
  "Waterbase Limited India",
  "Venky's India India",
  "Hester Biosciences India",
  "Sequent Scientific India",
  "Indovax India India",
  "Globion India India",
  "Biostadt India India",
  "Neospark Drugs and Chemicals India",
  "Zenex Animal Health India",
  "Natural Remedies India",
  "Ayurvet Limited India",
  "Cargill India Feed Division India",
  "Trouw Nutrition India India",
  "Kemin Industries India India",
  "Novus Animal Nutrition India India",
  "Lallemand Animal Nutrition India India",
  "Alltech Biotechnology India India",
  "Phibro Animal Health India India",
  "Virbac Animal Health India India",
  "Zoetis India India",
  "Boehringer Ingelheim Animal Health India India",
  "Elanco India India",
];

const batch107 = [
  "Gemini Cables India",
  "Tirupati Plastomatic India",
  "Plaza Wires India",
  "Apollo Cables India",
  "Bonton Cables India",
  "Relisys Cables India",
  "Prime Cable Industries India",
  "Suraj Cables India",
  "Sigma Cables India",
  "Nicco Corporation Cable Division India",
  "Incab Industries India",
  "Victor Cables India",
  "Premier Cable India",
  "Torrent Cables India",
  "RPG Cables India",
  "Ravin Cables India",
  "Thermo Cables India",
  "Elkay Telelinks India",
  "Relemac Technologies India",
  "Teleflux Cables India",
  "Sudhakar Wires India",
  "Gemscab Industries India",
  "General Cable India India",
  "Prysmian Kablo India India",
  "Nexans India India",
];

const allCandidates = [
  ...batch103.map((n) => ({ name: n, batch: 103 })),
  ...batch104.map((n) => ({ name: n, batch: 104 })),
  ...batch105.map((n) => ({ name: n, batch: 105 })),
  ...batch106.map((n) => ({ name: n, batch: 106 })),
  ...batch107.map((n) => ({ name: n, batch: 107 })),
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
