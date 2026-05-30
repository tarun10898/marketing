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

const batch93 = [
  "Indus Towers India",
  "GTL Infrastructure India",
  "Summit Digitel Infrastructure India",
  "American Tower Corporation India",
  "Reliance Infratel India",
  "Tower Vision India",
  "Suyog Telematics India",
  "Aster Teleservices India",
  "HFCL Limited India",
  "Sterlite Technologies Limited India",
  "Aksh Optifibre India",
  "Birla Cable India",
  "Nelco Limited India",
  "RailTel Corporation of India",
  "Tejas Networks India",
  "ITI Limited India",
  "Smartlink Holdings India",
  "D-Link India India",
  "UTStarcom India India",
  "Shyam Telecom India",
  "Kavveri Telecom Products India",
  "Kore Digital India",
  "Frog Cellsat India",
  "Precision Electronics India",
  "Valiant Communications India",
];

const batch94 = [
  "Modern Food Enterprises India",
  "Nestle India India",
  "Hatsun Agro Product India",
  "Heritage Foods India",
  "Kwality Limited India",
  "Vadilal Industries India",
  "Milkfood Limited India",
  "Parag Milk Foods India",
  "Dodla Dairy India",
  "Umang Dairies India",
  "Tasty Bite Eatables India",
  "ADF Foods India",
  "Prataap Snacks India",
  "DFM Foods India",
  "Bikaji Foods International India",
  "Haldiram Foods India",
  "Balaji Wafers India",
  "Bector Food Specialities India",
  "KRBL Limited India",
  "LT Foods India",
  "Chaman Lal Setia Exports India",
  "GRM Foods India",
  "Kohinoor Foods India",
  "Sarveshwar Foods India",
  "Megastar Foods India",
];

const batch95 = [
  "Escorts Kubota India",
  "Sany Heavy Industry India",
  "JCB India India",
  "Caterpillar India India",
  "Komatsu India India",
  "Kobelco Construction Machinery India",
  "Hyundai Construction Equipment India",
  "Volvo Construction Equipment India",
  "LiuGong India India",
  "TIL Limited India",
  "Macons Construction Equipment India",
  "Schwing Stetter India India",
  "Putzmeister India India",
  "Wirtgen India India",
  "Apollo Infratech India",
  "KYB-Conmat India",
  "Revathi Equipment India",
  "International Combustion India India",
  "Windsor Machines India",
  "TRF Limited India",
  "McNally Bharat Engineering India",
  "Sandvik Asia India",
  "Atlas Copco India India",
  "Liebherr India India",
  "Zoomlion India India",
];

const batch96 = [
  "TVS Supply Chain Solutions India",
  "Stellar Value Chain Solutions India",
  "TCI Express India",
  "Tiger Logistics India",
  "Gateway Distriparks India",
  "Snowman Logistics India",
  "Gati-KWE India",
  "Sical Logistics India",
  "Spoton Logistics India",
  "Navkar Corporation India",
  "Lancer Container Lines India",
  "Seaways Shipping and Logistics India",
  "LetsTransport India",
  "Locus Shypyard India",
  "CJ Darcl Logistics India",
  "Aegis Logistics India",
  "Increff India",
  "Falcon Autotech India",
  "GreyOrange India",
  "Addverb Technologies India",
  "Armstrong Robotics India",
  "Godrej Storage Solutions India",
  "Coldman Logistics India",
  "Gubba Cold Storage India",
  "Kool-ex Logistics India",
];

const batch97 = [
  "Orient Bell Limited India",
  "Regency Ceramics India",
  "Nitco Tiles India",
  "Orient Bell Tiles India",
  "Asian Granito India",
  "Exxaro Tiles India",
  "H&R Johnson India India",
  "RAK Ceramics India India",
  "Simpolo Ceramics India",
  "Varmora Granito India",
  "Sunhearrt Ceramik India",
  "Hindware Home Innovation India",
  "HSIL Limited India",
  "Parryware India India",
  "Jaquar & Company India",
  "Kohler India India",
  "Toto India India",
  "Roca India India",
  "Murudeshwar Ceramics India",
  "Clay Craft India India",
  "Eagle Glass India",
  "Bharat Potteries India",
  "Empire Industries Glass Division India",
  "Gujarat Borosil India",
  "Fena Ceramics India",
];

const allCandidates = [
  ...batch93.map((n) => ({ name: n, batch: 93 })),
  ...batch94.map((n) => ({ name: n, batch: 94 })),
  ...batch95.map((n) => ({ name: n, batch: 95 })),
  ...batch96.map((n) => ({ name: n, batch: 96 })),
  ...batch97.map((n) => ({ name: n, batch: 97 })),
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
