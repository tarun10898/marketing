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
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  for (const token of setA) { if (setB.has(token)) intersection += 1; }
  return intersection / (setA.size + setB.size - intersection);
}

function levenshteinDistance(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m || !n) return m + n;
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
  if (lengthGap > 3 || distance > 2 || minLength < 6) return false;
  if (bothMultiToken && distance > 1) return false;
  return distance / maxLength <= 0.25;
}

const batch208 = [
  "FirstCry Baby Products",
  "Hopscotch Kidswear D2C",
  "Beybee Baby Care D2C",
  "LuvLap Baby Gear",
  "Shumee D2C Toys",
  "SuperBottoms Baby Care",
  "BabyHug Baby Products",
  "Rimi Kids Clothing",
  "Smartivity D2C Toys",
  "Mee Mee Baby Products",
  "Kidswear Manufacturing Division",
  "Toy Development Division",
  "Premier Kidswear Toys",
  "Universal Kidswear Toys",
  "Diamond Kidswear Toys",
  "Star Kidswear Toys",
  "Apex Kidswear Toys",
  "Royal Kidswear Toys",
  "Classic Kidswear Toys",
  "Precision Kidswear Toys",
  "Fine Kidswear Toys",
  "Elite Kidswear Toys",
  "Advanced Kidswear Toys",
  "Dynamic Kidswear Toys",
  "Supreme Kidswear Toys",
];

const batch209 = [
  "L and T Valves Division",
  "Dembla Valves India",
  "KSB Valves India",
  "Microfinish Valves",
  "Hawa Valves India",
  "DelVal Flow Control India",
  "Cair Euromatic Automation",
  "Arita Valves India",
  "Intervalve Poonawalla",
  "Spirax Sarco India",
  "Valves Manufacturing Division",
  "Flow Control Division",
  "Premier Valves Controls",
  "Universal Valves Controls",
  "Diamond Valves Controls",
  "Star Valves Controls",
  "Apex Valves Controls",
  "Royal Valves Controls",
  "Classic Valves Controls",
  "Precision Valves Controls",
  "Fine Valves Controls",
  "Elite Valves Controls",
  "Advanced Valves Controls",
  "Dynamic Valves Controls",
  "Supreme Valves Controls",
];

const batch210 = [
  "Sumeru Frozen Foods",
  "Prasuma Frozen Momos",
  "ITC Master Chef Frozen",
  "Goeld Frozen Foods",
  "Buffet Frozen Foods",
  "Yummiez Frozen Foods",
  "McCain Foods India",
  "Venky's Frozen Foods",
  "Godrej Yummiez",
  "Safal Frozen Vegetables",
  "Frozen Food Division India",
  "Ready to Cook Division",
  "Premier Frozen Foods",
  "Universal Frozen Foods",
  "Diamond Frozen Foods",
  "Star Frozen Foods",
  "Al Kabeer Frozen Foods",
  "Royal Frozen Foods",
  "Classic Frozen Foods",
  "Precision Frozen Foods",
  "Fine Frozen Foods",
  "Elite Frozen Foods",
  "Advanced Frozen Foods",
  "Dynamic Frozen Foods",
  "Supreme Frozen Foods",
];

const batch211 = [
  "Air India MRO Division",
  "GMR Aviation MRO",
  "Indamer Aviation MRO",
  "Celebi Ground Handling",
  "AI Airport Services",
  "Bird Worldwide Flight",
  "GlobeGround India Ground",
  "TajAir Charter MRO",
  "Max Aerospace Aviation",
  "Air Works MRO India",
  "Aviation MRO Division",
  "Airport Ground Handling Division",
  "Premier Aviation MRO",
  "Universal Aviation MRO",
  "Diamond Aviation MRO",
  "Star Aviation MRO",
  "Apex Aviation MRO",
  "Royal Aviation MRO",
  "Classic Aviation MRO",
  "Precision Aviation MRO",
  "Fine Aviation MRO",
  "Elite Aviation MRO",
  "Advanced Aviation MRO",
  "Dynamic Aviation MRO",
  "Supreme Aviation MRO",
];

const batch212 = [
  "Lenskart Eyewear India",
  "John Jacobs Eyewear",
  "Specsmakers Eyewear",
  "Coolwinks Eyewear",
  "LensPlus Eyewear",
  "Fastrack Eyewear India",
  "Titan Eyeplus Eyewear",
  "GKB Lens India",
  "Lenskart Aqualens D2C",
  "Specsmakers Opticians",
  "Eyewear Manufacturing Division",
  "Lens Development Division",
  "Premier Eyewear Optical",
  "Universal Eyewear Optical",
  "Diamond Eyewear Optical",
  "Star Eyewear Optical",
  "Apex Eyewear Optical",
  "Royal Eyewear Optical",
  "Classic Eyewear Optical",
  "Precision Eyewear Optical",
  "Fine Eyewear Optical",
  "Elite Eyewear Optical",
  "Advanced Eyewear Optical",
  "Dynamic Eyewear Optical",
  "Supreme Eyewear Optical",
];

const allCandidates = [
  ...batch208.map((n) => ({ name: n, batch: 208 })),
  ...batch209.map((n) => ({ name: n, batch: 209 })),
  ...batch210.map((n) => ({ name: n, batch: 210 })),
  ...batch211.map((n) => ({ name: n, batch: 211 })),
  ...batch212.map((n) => ({ name: n, batch: 212 })),
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
