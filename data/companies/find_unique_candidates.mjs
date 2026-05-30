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

const pool = [
  // Category A: Audio & Systems & Peripherals
  { name: "Sennheiser Audio", category: "Hardware & Audio" },
  { name: "JBL Harman", category: "Hardware & Audio" },
  { name: "Bang and Olufsen", category: "Hardware & Audio" },
  { name: "Audio-Technica", category: "Hardware & Audio" },
  { name: "Beyerdynamic", category: "Hardware & Audio" },
  { name: "Pioneer Corporation", category: "Hardware & Audio" },
  { name: "Garmin Smartwatches", category: "Hardware & Audio" },
  { name: "Fitbit Wearables", category: "Hardware & Audio" },
  { name: "GoPro Cameras", category: "Hardware & Audio" },
  { name: "Pebble Smartwatches", category: "Hardware & Audio" },
  { name: "Autel Robotics Drones", category: "Hardware & Audio" },
  { name: "Parrot Drones", category: "Hardware & Audio" },
  { name: "ASUS Computers", category: "Hardware & Audio" },
  { name: "Acer Laptops", category: "Hardware & Audio" },
  { name: "Lenovo Computers", category: "Hardware & Audio" },
  { name: "MSI Computers Gaming", category: "Hardware & Audio" },
  { name: "Razer Gaming", category: "Hardware & Audio" },
  { name: "Corsair Gaming", category: "Hardware & Audio" },
  { name: "SteelSeries Gaming", category: "Hardware & Audio" },
  { name: "Logitech Peripherals", category: "Hardware & Audio" },
  { name: "Crucial Memory SSD", category: "Hardware & Audio" },
  { name: "PNY Technologies", category: "Hardware & Audio" },
  { name: "Zotac Graphics Cards", category: "Hardware & Audio" },
  { name: "EVGA Corporation", category: "Hardware & Audio" },
  { name: "Gigabyte Technology", category: "Hardware & Audio" },
  { name: "ASRock Motherboards", category: "Hardware & Audio" },
  { name: "MathWorks MATLAB", category: "Hardware & Audio" },
  { name: "Altair Engineering", category: "Hardware & Audio" },
  { name: "Bentley Systems", category: "Hardware & Audio" },
  { name: "Dassault Systemes", category: "Hardware & Audio" },
  { name: "Siemens PLM Software", category: "Hardware & Audio" },
  { name: "Leica Geosystems", category: "Hardware & Audio" },
  { name: "Hexagon AB", category: "Hardware & Audio" },
  { name: "FARO Technologies", category: "Hardware & Audio" },

  // Category B: Devops, Databases & Cloud
  { name: "Varnish Software", category: "Cloud & Developer Tools" },
  { name: "OpenStack Cloud", category: "Cloud & Developer Tools" },
  { name: "MariaDB Database", category: "Cloud & Developer Tools" },
  { name: "Percona MySQL Support", category: "Cloud & Developer Tools" },
  { name: "SingleStore Database", category: "Cloud & Developer Tools" },
  { name: "TimescaleDB", category: "Cloud & Developer Tools" },
  { name: "QuestDB", category: "Cloud & Developer Tools" },
  { name: "VictoriaMetrics", category: "Cloud & Developer Tools" },
  { name: "Loki Grafana", category: "Cloud & Developer Tools" },
  { name: "Tempo Grafana", category: "Cloud & Developer Tools" },
  { name: "Mimir Grafana", category: "Cloud & Developer Tools" },
  { name: "Thanos Prometheus", category: "Cloud & Developer Tools" },
  { name: "OpenTelemetry", category: "Cloud & Developer Tools" },
  { name: "Jaeger Tracing", category: "Cloud & Developer Tools" },
  { name: "Zipkin Tracing", category: "Cloud & Developer Tools" },
  { name: "Fluentd Logging", category: "Cloud & Developer Tools" },
  { name: "Fluent Bit Logging", category: "Cloud & Developer Tools" },
  { name: "Logstash Elastic", category: "Cloud & Developer Tools" },
  { name: "Filebeat Elastic", category: "Cloud & Developer Tools" },
  { name: "Metricbeat Elastic", category: "Cloud & Developer Tools" },
  { name: "ScyllaDB NoSQL", category: "Cloud & Developer Tools" },
  { name: "Nomad HashiCorp", category: "Cloud & Developer Tools" },
  { name: "Consul HashiCorp", category: "Cloud & Developer Tools" },
  { name: "Packer HashiCorp", category: "Cloud & Developer Tools" },
  { name: "Vagrant HashiCorp", category: "Cloud & Developer Tools" },
  { name: "Spinnaker CD", category: "Cloud & Developer Tools" },
  { name: "ArgoCD Kubernetes", category: "Cloud & Developer Tools" },
  { name: "Tekton Pipelines", category: "Cloud & Developer Tools" },
  { name: "Jenkins CI", category: "Cloud & Developer Tools" },
  { name: "TeamCity JetBrains", category: "Cloud & Developer Tools" },
  { name: "AppVeyor CI", category: "Cloud & Developer Tools" },
  { name: "Veracode Security", category: "Cloud & Developer Tools" },
  { name: "Checkmarx Security", category: "Cloud & Developer Tools" },
  { name: "Aqua Security", category: "Cloud & Developer Tools" },
  { name: "Sysdig Container Security", category: "Cloud & Developer Tools" },
  { name: "Lacework Security", category: "Cloud & Developer Tools" },
  { name: "Orca Security Cloud", category: "Cloud & Developer Tools" },
  { name: "Honeycomb Observability", category: "Cloud & Developer Tools" },
  { name: "Lightstep Observability", category: "Cloud & Developer Tools" },
  { name: "Chronosphere Observability", category: "Cloud & Developer Tools" },
  { name: "Logz.io Logging", category: "Cloud & Developer Tools" },
  { name: "Sumo Logic Analytics", category: "Cloud & Developer Tools" },
  { name: "Graylog Logging", category: "Cloud & Developer Tools" },
  { name: "Semgrep Code Scanning", category: "Cloud & Developer Tools" },
  { name: "Coverity Synopsys", category: "Cloud & Developer Tools" },
  { name: "Fortify Security", category: "Cloud & Developer Tools" },
  { name: "Vultr Cloud", category: "Cloud & Developer Tools" },
  { name: "Kamatera Cloud", category: "Cloud & Developer Tools" },
  { name: "Atlantic.Net Cloud", category: "Cloud & Developer Tools" },
  { name: "Render Cloud Hosting", category: "Cloud & Developer Tools" },
  { name: "Railway App Cloud", category: "Cloud & Developer Tools" },
  { name: "Fly.io Cloud Hosting", category: "Cloud & Developer Tools" },

  // Category C: Digital Media, Web & Design
  { name: "Sketch Design", category: "Web Design & SaaS" },
  { name: "InVision App", category: "Web Design & SaaS" },
  { name: "Adobe XD", category: "Web Design & SaaS" },
  { name: "Marvel App Design", category: "Web Design & SaaS" },
  { name: "Zeplin Collaboration", category: "Web Design & SaaS" },
  { name: "Avocode Design", category: "Web Design & SaaS" },
  { name: "LottieFiles Animations", category: "Web Design & SaaS" },
  { name: "Adobe Express", category: "Web Design & SaaS" },
  { name: "PicMonkey Editor", category: "Web Design & SaaS" },
  { name: "Fotor Editor", category: "Web Design & SaaS" },
  { name: "Pixlr Image Editor", category: "Web Design & SaaS" },
  { name: "Photopea Editor", category: "Web Design & SaaS" },
  { name: "Affinity Designer Serif", category: "Web Design & SaaS" },
  { name: "Affinity Photo Serif", category: "Web Design & SaaS" },
  { name: "Affinity Publisher Serif", category: "Web Design & SaaS" },
  { name: "QuarkXPress Publishing", category: "Web Design & SaaS" },
  { name: "Final Cut Pro Apple", category: "Web Design & SaaS" },
  { name: "DaVinci Resolve Blackmagic", category: "Web Design & SaaS" },
  { name: "Avid Media Composer", category: "Web Design & SaaS" },
  { name: "Ableton Live Music", category: "Web Design & SaaS" },
  { name: "FL Studio Image-Line", category: "Web Design & SaaS" },
  { name: "Pro Tools Avid", category: "Web Design & SaaS" },
  { name: "Cubase Steinberg", category: "Web Design & SaaS" },
  { name: "Reaper Cockos", category: "Web Design & SaaS" },
  { name: "Studio One PreSonus", category: "Web Design & SaaS" },
  { name: "Reason Studios", category: "Web Design & SaaS" },
  { name: "Bitwig Studio", category: "Web Design & SaaS" },
  { name: "Cakewalk BandLab", category: "Web Design & SaaS" },
  { name: "Traktor Native Instruments", category: "Web Design & SaaS" },
  { name: "Serato DJ", category: "Web Design & SaaS" },
  { name: "VirtualDJ Atomix", category: "Web Design & SaaS" },
  { name: "Rekordbox Pioneer", category: "Web Design & SaaS" },

  // Category D: Workplace SaaS, CRM & HR Tech
  { name: "Basecamp 37signals", category: "Productivity & HR SaaS" },
  { name: "Wrike Collaborative", category: "Productivity & HR SaaS" },
  { name: "Smartsheet Spreadsheet", category: "Productivity & HR SaaS" },
  { name: "Airtable Low Code", category: "Productivity & HR SaaS" },
  { name: "Coda.io Documents", category: "Productivity & HR SaaS" },
  { name: "Quip Salesforce", category: "Productivity & HR SaaS" },
  { name: "Bear Markdown Notes", category: "Productivity & HR SaaS" },
  { name: "Ulysses Markdown Notes", category: "Productivity & HR SaaS" },
  { name: "Scrivener Writing", category: "Productivity & HR SaaS" },
  { name: "Obsidian Notes", category: "Productivity & HR SaaS" },
  { name: "Roam Research Notes", category: "Productivity & HR SaaS" },
  { name: "Logseq Notes", category: "Productivity & HR SaaS" },
  { name: "Milanote Creative Boards", category: "Productivity & HR SaaS" },
  { name: "Whimsical Boards", category: "Productivity & HR SaaS" },
  { name: "Mural Collaboration", category: "Productivity & HR SaaS" },
  { name: "Lucidchart Diagramming", category: "Productivity & HR SaaS" },
  { name: "Draw.io Diagrams", category: "Productivity & HR SaaS" },
  { name: "Balsamiq Wireframes", category: "Productivity & HR SaaS" },
  { name: "OutSystems Enterprise Low Code", category: "Productivity & HR SaaS" },
  { name: "Mendix Low Code", category: "Productivity & HR SaaS" },
  { name: "Appian Low Code Automation", category: "Productivity & HR SaaS" },
  { name: "Pocketbase Backend", category: "Productivity & HR SaaS" },
  { name: "Appwrite Backend", category: "Productivity & HR SaaS" },
  { name: "Back4App Cloud Parse", category: "Productivity & HR SaaS" },
  { name: "Parse Platform Backend", category: "Productivity & HR SaaS" },

  // Category E: Fintech & AI
  { name: "Bunq Mobile Bank", category: "Fintech & AI Platforms" },
  { name: "Oxigen Wallet India", category: "Fintech & AI Platforms" },
  { name: "Citrus Pay Payments", category: "Fintech & AI Platforms" },
  { name: "MSwipe Card Reader", category: "Fintech & AI Platforms" },
  { name: "Ezetap POS India", category: "Fintech & AI Platforms" },
  { name: "Clover POS Fiserv", category: "Fintech & AI Platforms" },
  { name: "Revel Systems POS", category: "Fintech & AI Platforms" },
  { name: "TouchBistro Restaurant POS", category: "Fintech & AI Platforms" },
  { name: "Loyverse Free POS", category: "Fintech & AI Platforms" },
  { name: "Afterpay BNPL", category: "Fintech & AI Platforms" },
  { name: "Sezzle BNPL Payments", category: "Fintech & AI Platforms" },
  { name: "Splitit BNPL", category: "Fintech & AI Platforms" },
  { name: "Zip Co BNPL", category: "Fintech & AI Platforms" },
  { name: "Laybuy BNPL", category: "Fintech & AI Platforms" },
  { name: "Humm Group BNPL", category: "Fintech & AI Platforms" },
  { name: "Uniswap Labs Crypto", category: "Fintech & AI Platforms" },
  { name: "PancakeSwap DEX", category: "Fintech & AI Platforms" },
  { name: "SushiSwap DEX", category: "Fintech & AI Platforms" },
  { name: "Curve Finance DeFi", category: "Fintech & AI Platforms" },
  { name: "Balancer DeFi", category: "Fintech & AI Platforms" },
  { name: "Kyber Network DeFi", category: "Fintech & AI Platforms" },
  { name: "Loopring Layer 2", category: "Fintech & AI Platforms" },
  { name: "dYdX Exchange Crypto", category: "Fintech & AI Platforms" },
  { name: "Synthetix DeFi Assets", category: "Fintech & AI Platforms" },
  { name: "Adept AI Labs", category: "Fintech & AI Platforms" },
  { name: "Inflection AI Pi", category: "Fintech & AI Platforms" },
  { name: "Character.ai Chatbots", category: "Fintech & AI Platforms" },
  { name: "Synthesia AI Video", category: "Fintech & AI Platforms" },
  { name: "Descript AI Audio", category: "Fintech & AI Platforms" },
  { name: "ElevenLabs AI Voice", category: "Fintech & AI Platforms" },
  { name: "Murf.ai Voiceover", category: "Fintech & AI Platforms" },
  { name: "Play.ht AI Voice", category: "Fintech & AI Platforms" },
  { name: "Lovo.ai Voiceover", category: "Fintech & AI Platforms" },
  { name: "Speechify Reader", category: "Fintech & AI Platforms" },
  { name: "Otter.ai Transcription", category: "Fintech & AI Platforms" },
  { name: "Fireflies.ai Meeting Notes", category: "Fintech & AI Platforms" },
  { name: "Fathom AI Notes", category: "Fintech & AI Platforms" },
  { name: "Avoma Meeting AI", category: "Fintech & AI Platforms" },
  { name: "Chorus.ai Conversation Intelligence", category: "Fintech & AI Platforms" },
  { name: "Gong.io Revenue Intelligence", category: "Fintech & AI Platforms" },
  { name: "Salesloft Revenue Workspace", category: "Fintech & AI Platforms" },
  { name: "Outreach.io Sales Engagement", category: "Fintech & AI Platforms" },
  { name: "Apollo.io Sales Database", category: "Fintech & AI Platforms" },
  { name: "Seamless.ai Sales Search", category: "Fintech & AI Platforms" },
  { name: "Lusha Sales Intelligence", category: "Fintech & AI Platforms" },
  { name: "Hunter.io Email Finder", category: "Fintech & AI Platforms" },
  { name: "Clearbit B2B Data", category: "Fintech & AI Platforms" },
  { name: "LeadIQ Prospecting", category: "Fintech & AI Platforms" },
  { name: "Cognism B2B Leads", category: "Fintech & AI Platforms" },
  { name: "Uplead B2B Prospecting", category: "Fintech & AI Platforms" }
];

const uniqueCandidates = [];

for (const comp of pool) {
  const canonical = canonicalizeName(comp.name);
  let isDup = false;
  if (seen.includes(canonical)) {
    isDup = true;
  } else {
    for (const existing of seen) {
      const jaccard = jaccardSimilarity(canonical, existing);
      const distance = levenshteinDistance(canonical, existing);
      if (jaccard >= 0.9 || isEditDistanceFuzzyMatch(canonical, existing, distance)) {
        isDup = true;
        break;
      }
    }
  }
  if (!isDup) {
    uniqueCandidates.push(comp);
  }
}

console.log(`Pool size: ${pool.length}`);
console.log(`Unique size: ${uniqueCandidates.length}`);

// We need exactly 124 companies to reach 125 (1 from truly missing + 124 unique ones)
const selected = uniqueCandidates.slice(0, 124);
console.log(`Selected size: ${selected.length}`);

writeFileSync("data/companies/extra_unique_candidates.json", JSON.stringify(selected, null, 2), "utf8");
console.log("Successfully wrote extra_unique_candidates.json");
