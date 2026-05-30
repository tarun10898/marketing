import { readFileSync, writeFileSync } from "fs";

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

const trulyMissing = JSON.parse(readFileSync("data/companies/truly_missing_list.json", "utf8"));

const batch218 = trulyMissing.slice(0, 25).map(c => c.name);
const batch219 = trulyMissing.slice(25, 50).map(c => c.name);
const batch220 = trulyMissing.slice(50, 75).map(c => c.name);
const batch221 = trulyMissing.slice(75, 100).map(c => c.name);
const batch222 = trulyMissing.slice(100, 125).map(c => c.name);

// Ensure exactly 25 in each
console.log(`Batch 218 count: ${batch218.length}`);
console.log(`Batch 219 count: ${batch219.length}`);
console.log(`Batch 220 count: ${batch220.length}`);
console.log(`Batch 221 count: ${batch221.length}`);
console.log(`Batch 222 count: ${batch222.length}`);

const allCandidates = [
  ...batch218.map((n) => ({ name: n, batch: 218 })),
  ...batch219.map((n) => ({ name: n, batch: 219 })),
  ...batch220.map((n) => ({ name: n, batch: 220 })),
  ...batch221.map((n) => ({ name: n, batch: 221 })),
  ...batch222.map((n) => ({ name: n, batch: 222 })),
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

if (duplicatesFound === 0 && allCandidates.length === 125) {
  console.log("ALL 125 CANDIDATES ARE COMPLETELY UNIQUE!");
  
  // Write the actual batches config to a temporary json file so generate script can read it directly!
  writeFileSync("data/companies/candidate_batches_218_222.json", JSON.stringify({
    218: { name: "AI, Machine Learning & Big Data", companies: batch218 },
    219: { name: "E-commerce Enablers & Logistics Tech", companies: batch219 },
    220: { name: "EdTech & HR Tech", companies: batch220 },
    221: { name: "Automotive, Robotics & Spatial Tech", companies: batch221 },
    222: { name: "Cybersecurity, Cloud Infrastructure & Digital Payments", companies: batch222 }
  }, null, 2), "utf8");
  console.log("Successfully wrote data/companies/candidate_batches_218_222.json");
} else {
  console.log(`${duplicatesFound} duplicates found or total candidates is ${allCandidates.length} (expected 125).`);
}
