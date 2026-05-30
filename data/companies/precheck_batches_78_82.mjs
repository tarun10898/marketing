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

const batch78 = [
  "Shalimar Paints India",
  "Snowcem Paints India",
  "Sheenlac Paints India",
  "Sirca Paints India",
  "Acro Paints India",
  "Nippon Paint India",
  "Jotun India",
  "Sherwin-Williams India",
  "Pidilite Speciality Chemicals India",
  "Araldite India",
  "Resins and Plastics India",
  "Century Chemicals India",
  "Nirma Chemical India",
  "Tuticorin Alkali Chemicals India",
  "Southern Petrochemical Industries India",
  "Madras Fertilizers India",
  "Mangalore Chemicals and Fertilizers India",
  "Zuari Agro Chemicals India",
  "Greenstar Fertilizers India",
  "Fertilisers and Chemicals Travancore India",
  "Rama Phosphates India",
  "Khaitan Chemicals and Fertilizers India",
  "Bharat Fertilizer Industries India",
  "Basant Agro Tech India",
  "Teesta Agro Industries India",
];

const batch79 = [
  "L&T Energy Hydrocarbon India",
  "Gayatri Projects India",
  "Ramky Infrastructure India",
  "IRB Infrastructure Developers India",
  "GR Infraprojects India",
  "JMC Projects India",
  "H.G. Infra Engineering India",
  "KNR Constructions India",
  "Unity Infraprojects India",
  "J. Kumar Infraprojects India",
  "PSP Projects India",
  "Ahluwalia Contracts India",
  "Simplex Infrastructures India",
  "ITD Cementation India",
  "Patel Engineering India",
  "SEW Infrastructure India",
  "Techno Electric Engineering India",
  "Action Construction Equipment India",
  "Sanghvi Movers India",
  "Man Infraconstruction India",
  "Vascon Engineers India",
  "Pratibha Industries India",
  "Valecha Engineering India",
  "RPP Infra Projects India",
  "MBL Infrastructures India",
];

const batch80 = [
  "KEI Industries India",
  "RR Kabel India",
  "Panasonic Carbon India",
  "Universal Cables India",
  "Paramount Communications India",
  "Vindhya Telelinks India",
  "Dynamic Cables India",
  "Diamond Power Infrastructure India",
  "Cords Cable Industries India",
  "Ultracab India India",
  "Salzer Electronics India",
  "Precision Wires India",
  "Bharat Wire Ropes India",
  "Bedmutha Industries India",
  "Cable Corporation of India India",
  "Delton Cables India",
  "Shilpi Cable Technologies India",
  "Gupta Power Infrastructure India",
  "Lokesh Machines India",
  "Macpower CNC Machines India",
  "Batliboi India",
  "HMT Machine Tools India",
  "PMT Machines India",
  "Shanthi Gears India",
  "Elecon Engineering India",
];

const batch81 = [
  "Hamilton Housewares India",
  "Kores India",
  "Kokuyo Camlin India",
  "Linc Pen Plastics India",
  "Flair Writing Industries India",
  "DOMS Industries India",
  "Rorito India",
  "Reynolds India",
  "Luxor Writing Instruments India",
  "Add Gel India",
  "Stic Pens India",
  "Todays Writing Instruments India",
  "Wipro Consumer Care India",
  "Bajaj Consumer Care India",
  "Jyothy Labs India",
  "Zydus Wellness India",
  "Vicco Laboratories India",
  "Sri Sri Tattva India",
  "Baidyanath Ayurved India",
  "Zandu Pharmaceutical Works India",
  "Charak Pharma India",
  "Himalaya Wellness India",
  "Hamdard Laboratories India",
  "Organic India India",
  "Jiva Ayurveda India",
];

const batch82 = [
  "Fastrack India",
  "Timex Group India",
  "HMT Watches India",
  "GKB Opticals India",
  "Lawrence Mayo India",
  "Bausch Lomb India",
  "Essilor India India",
  "Ray-Ban Sun Optics India",
  "BlueStone Jewellery India",
  "Melorra India",
  "Kisna Diamond Jewellery India",
  "Orra Jewellery India",
  "Gili Jewellery India",
  "Nakshatra Jewellery India",
  "Asmi Jewellery India",
  "D'damas Jewellery India",
  "Anmol Jewellers India",
  "Farah Khan Fine Jewellery India",
  "Amrapali Jewels India",
  "Hazoorilal Jewellers India",
  "Mahesh Notandass India",
  "Popley Group India",
  "Gehna Jewellers India",
  "Mirari India",
  "Minawala Jewellers India",
];

const allCandidates = [
  ...batch78.map((n) => ({ name: n, batch: 78 })),
  ...batch79.map((n) => ({ name: n, batch: 79 })),
  ...batch80.map((n) => ({ name: n, batch: 80 })),
  ...batch81.map((n) => ({ name: n, batch: 81 })),
  ...batch82.map((n) => ({ name: n, batch: 82 })),
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
