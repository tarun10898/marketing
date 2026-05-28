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

const batch73 = [
  "Greenlam Industries India",
  "Stylam Industries India",
  "Greenpanel Industries India",
  "Rushil Decor India",
  "Archidply Industries India",
  "Duroply Industries India",
  "Sarda Plywood Industries India",
  "National Plywood Industries India",
  "Wood Crafts Products India",
  "Kitply Industries India",
  "Anchor Plywood India",
  "Kutty Flush Doors India",
  "Merino Laminates India",
  "Century Laminates India",
  "Sharon Plywoods India",
  "Austin Plywood India",
  "Sylvan Ply India",
  "Trojan Ply India",
  "Globe Panel Industries India",
  "Northern Plywood India",
  "Wudplay India",
  "Action TESA India",
  "AICA Laminates India",
  "Sunmica India",
  "Vir Laminate India",
];

const batch74 = [
  "Hindusthan National Glass Industries India",
  "Eagle Flask Industries India",
  "Borosil Scientific India",
  "Piramal Glass India",
  "Saint-Gobain Glass India",
  "Gujarat Guardian India",
  "Goldplus Glass Industries India",
  "Sisecam Flat Glass India",
  "Glass Wall Systems India",
  "Pragati Glass India",
  "Vitrum Glass India",
  "Haldyn Glass India",
  "Triveni Glass India",
  "Associated Glass Industries India",
  "Excel Glass India",
  "Alembic Glass India",
  "Mahalakshmi Glass Works India",
  "Universal Glass India",
  "Sejal Glass India",
  "FGP India",
  "Owens-Corning India",
  "Binani 3B Fibreglass India",
  "Saint-Gobain Sekurit India",
  "Schott Glass India",
  "Glaverbel India",
];

const batch75 = [
  "Tata Spices India",
  "Eastern Condiments India",
  "MTR Spices India",
  "Everest Spices India",
  "Badshah Masala India",
  "MDH Spices India",
  "Catch Spices India",
  "Ramdev Food Products India",
  "Aachi Masala India",
  "Sakthi Masala India",
  "Goldiee Group India",
  "Pushp Brand Masala India",
  "Rajesh Masala India",
  "Sunrise Foods India",
  "Roopak Spices India",
  "VLC Spices India",
  "Ganesh Masala India",
  "Synthite Industries India",
  "Plantlipids India",
  "Kancor Ingredients India",
  "AVT Natural Products India",
  "Asian Spices India",
  "Swastik Spices India",
  "Priya Foods India",
  "Mother's Recipe India",
];

const batch76 = [
  "Inox Green Energy Services India",
  "KPI Green Energy India",
  "Oriana Power India",
  "Gensol Engineering India",
  "Solex Energy India",
  "Servotech Power Systems India",
  "Websol Energy System India",
  "Urja Global India",
  "SWELECT Energy Systems India",
  "Adani Solar India",
  "Tata Power Renewable Energy India",
  "JSW Neo Energy India",
  "CleanMax Solar India",
  "Fourth Partner Energy India",
  "Amplus Solar India",
  "Husk Power Systems India",
  "Loom Solar India",
  "ZunRoof India",
  "Freyr Energy India",
  "SolarSquare India",
  "MYSUN India",
  "Rays Power Infra India",
  "Jakson Group Renewable India",
  "Premier Energies India",
  "Goldi Energy India",
];

const batch77 = [
  "Sabyasachi Couture India",
  "Manish Malhotra Design India",
  "Ritu Kumar Fashion India",
  "Tarun Tahiliani Lifestyle India",
  "Anita Dongre fashion India",
  "Masaba Gupta design India",
  "Rohit Bal Couture India",
  "Sandeep Khosla fashion India",
  "Gaurav Gupta Couture India",
  "Rahul Mishra Fashion India",
  "Anamika Khanna design India",
  "Kalki Fashion India",
  "Good Earth India",
  "Nicobar Lifestyle India",
  "Jaypore India",
  "Kama Ayurveda India",
  "Forest Essentials India",
  "Just Herbs India",
  "Sadhev India",
  "Shahnaz Husain Group India",
  "Blossom Kochhar Aroma Magic India",
  "Lotus Herbals India",
  "Biotique India",
  "mCaffeine India",
  "Plum Goodness India",
];

const allCandidates = [
  ...batch73.map((n) => ({ name: n, batch: 73 })),
  ...batch74.map((n) => ({ name: n, batch: 74 })),
  ...batch75.map((n) => ({ name: n, batch: 75 })),
  ...batch76.map((n) => ({ name: n, batch: 76 })),
  ...batch77.map((n) => ({ name: n, batch: 77 })),
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
