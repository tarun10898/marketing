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

const batch213 = [
  "AMD Advanced Micro Devices",
  "HP Inc",
  "Hewlett Packard Enterprise HPE",
  "Western Digital",
  "Seagate Technology",
  "Kingston Technology",
  "ASML India",
  "TSMC India",
  "Realtek Semiconductor",
  "Analog Devices",
  "Infineon Technologies",
  "STMicroelectronics",
  "Renesas Electronics",
  "Keysight Technologies",
  "Arista Networks",
  "Cruise Self Driving",
  "KLA Corporation",
  "Tokyo Electron",
  "Arm Holdings",
  "Ampere Computing",
  "Cerebras Systems",
  "Graphcore",
  "Qorvo",
  "Tesla India",
  "Waymo Alphabet",
];

const batch214 = [
  "GitHub",
  "Confluent Apache Kafka",
  "Elasticsearch Elastic",
  "Neo4j Graph Database",
  "Redis Labs",
  "Sentry Error Tracking",
  "Heroku",
  "Travis CI",
  "SonarQube SonarSource",
  "Kong API",
  "Prometheus Robust Perception",
  "Dynatrace",
  "Okta",
  "Auth0",
  "Ping Identity",
  "OneLogin",
  "CyberArk",
  "SailPoint",
  "Fastly CDN Security",
  "1Password",
  "Rapid7",
  "Qualys",
  "Darktrace",
  "Sophos",
  "Kaspersky",
];

const batch215 = [
  "Slack Salesforce",
  "Zoom Video Communications",
  "Notion Labs",
  "Miro Visual Collaboration",
  "Trello Atlassian",
  "Jira Align",
  "Evernote",
  "Box Inc",
  "Dropbox",
  "DocuSign",
  "Adobe Creative Cloud",
  "Zendesk",
  "Mailchimp Intuit",
  "SendGrid Twilio",
  "RingCentral",
  "GoToMeeting LogMeIn",
  "Webex Cisco",
  "MuleSoft Salesforce",
  "Tableau Salesforce",
  "Drift",
  "Typeform",
  "Jotform",
  "Workday",
  "BambooHR",
  "Gusto",
];

const batch216 = [
  "Spotify",
  "Airbnb",
  "Shopify",
  "Pinterest",
  "Reddit",
  "Quora",
  "Snap Inc Snapchat",
  "Twitter X India",
  "ByteDance TikTok",
  "Epic Games",
  "Roblox Corporation",
  "Unity Technologies",
  "Match Group Tinder Hinge",
  "Bumble Inc",
  "Duolingo",
  "Coursera",
  "Udemy",
  "edX",
  "MasterClass",
  "Medium",
  "Substack",
  "Patreon",
  "Discord",
  "Twitch Amazon",
  "Vimeo",
];

const batch217 = [
  "Adyen",
  "Wise formerly TransferWise",
  "Revolut India",
  "Klarna",
  "Robinhood",
  "Coinbase",
  "Binance India",
  "Kraken Exchange",
  "Ripple Labs",
  "Affirm",
  "SoFi",
  "Square Block Inc",
  "Cash App",
  "Chime",
  "Nubank",
  "Payoneer India",
  "Worldpay",
  "Fiserv",
  "Fidelity National FIS",
  "Toast POS",
  "Checkout.com",
  "Tipalti",
  "Lemonade Insurtech",
  "OpenAI",
  "Hugging Face",
];

const allCandidates = [
  ...batch213.map((n) => ({ name: n, batch: 213 })),
  ...batch214.map((n) => ({ name: n, batch: 214 })),
  ...batch215.map((n) => ({ name: n, batch: 215 })),
  ...batch216.map((n) => ({ name: n, batch: 216 })),
  ...batch217.map((n) => ({ name: n, batch: 217 })),
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
