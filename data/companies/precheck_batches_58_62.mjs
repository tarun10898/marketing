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

const batch58 = [
  "Aditya Birla Fashion and Retail India",
  "Trent India",
  "Page Industries India",
  "Raymond India",
  "Arvind India",
  "Zodiac Clothing India",
  "Welspun India",
  "Vardhman Textiles India",
  "Alok Industries India",
  "Siyaram Silk Mills India",
  "Bombay Dyeing India",
  "Cantabil Retail India",
  "V-Mart Retail India",
  "Nykaa Fashion India",
  "LimeRoad India",
  "Zivame India",
  "Clovia India",
  "Bewakoof India",
  "The Souled Store India",
  "Chumbak India",
  "Fabindia India",
  "Manyavar India",
  "Biba Apparels India",
  "W for Woman India",
  "Zodiac Activewear India",
];

const batch59 = [
  "Century Textile Paper India",
  "JK Paper India",
  "West Coast Paper Mills India",
  "Seshasayee Paper and Boards India",
  "Tamil Nadu Newsprint and Papers India",
  "Andhra Paper India",
  "Orient Paper and Industries India",
  "Ballarpur Industries India",
  "Star Paper Mills India",
  "Ruchira Papers India",
  "Yash Pakka India",
  "Uflex India",
  "Huhtamaki India",
  "TCPL Packaging India",
  "Mold-Tek Packaging India",
  "Ester Industries India",
  "Cosmo First India",
  "Polyplex Corporation India",
  "Jindal Poly Films India",
  "Supreme Industries India",
  "Time Technoplast India",
  "Responsive Industries India",
  "Parksons Packaging India",
  "Hindustan Tin Works India",
  "Manjushree Technopack India",
];

const batch60 = [
  "PC Jeweller India",
  "Senco Gold India",
  "Thangamayil Jewellery India",
  "Rajesh Exports India",
  "TBZ India",
  "Malabar Gold and Diamonds India",
  "Joyalukkas India",
  "Kalyan Jewellers India",
  "PC Chandra Jewellers India",
  "GRT Jewellers India",
  "Lalitha Jewellery India",
  "Bhima Jewellers India",
  "Asian Star Company India",
  "Kiri Industries India",
  "Ganesha Ecosphere India",
  "Sudarshan Chemical Industries India",
  "Fine Organic Industries India",
  "Privi Speciality Chemicals India",
  "Neogen Chemicals India",
  "Clean Science and Technology India",
  "Rossari Biotech India",
  "Galaxy Surfactants India",
  "Vinati Organics India",
  "Alkyl Amines Chemicals India",
  "Deepak Chemtex India",
];

const batch61 = [
  "Tata Power Solar India",
  "Adani Green Energy India",
  "Suzlon Energy India",
  "ReNew Power India",
  "Hero Future Energies India",
  "Acme Solar India",
  "Azure Power India",
  "Vikram Solar India",
  "Waaree Energies India",
  "Goldi Solar India",
  "Sterling and Wilson Renewable Energy India",
  "Inox Wind India",
  "GIPCL India",
  "THDC India",
  "NLC India",
  "Torrent Power India",
  "CESC India",
  "JSW Energy India",
  "Adani Power India",
  "Reliance Power India",
  "GMR Power and Urban Infra India",
  "NTPC Vidyut Vyapar Nigam India",
  "Suryachakra Power India",
  "Jaiprakash Power Ventures India",
  "Kalpataru Projects International India",
];

const batch62 = [
  "Bata India",
  "Relaxo Footwears India",
  "Lancer Footwear India",
  "Khadim India",
  "Liberty Shoes India",
  "Metro Brands India",
  "Campus Activewear India",
  "Red Chief India",
  "Woodland India",
  "Mirza International India",
  "Superhouse India",
  "Lakhani Armaan Group India",
  "Action Shoes India",
  "Paragon Footwear India",
  "VKC Pride India",
  "Ajanta Footcare India",
  "Sreeleathers India",
  "VIP Industries India",
  "Safari Industries India",
  "Samsonite India",
  "Da Milano India",
  "Hidesign India",
  "Nappa Dori India",
  "Baggit India",
  "Lino Perros India",
];

const allCandidates = [
  ...batch58.map((n) => ({ name: n, batch: 58 })),
  ...batch59.map((n) => ({ name: n, batch: 59 })),
  ...batch60.map((n) => ({ name: n, batch: 60 })),
  ...batch61.map((n) => ({ name: n, batch: 61 })),
  ...batch62.map((n) => ({ name: n, batch: 62 })),
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
