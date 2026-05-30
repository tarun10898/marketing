import { writeFileSync, readFileSync } from "node:fs";

const roles = [
  {
    key: "swe",
    role: "Software Engineer",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Trainee", "Associate", "Senior Associate"],
    stepsProduct: [
      "Step 1 - OA with DSA and coding.",
      "Step 2 - Coding round with algorithmic depth.",
      "Step 3 - System design round for scalability and reliability.",
      "Step 4 - Behavioral round on ownership and collaboration.",
    ],
    stepsService: [
      "Step 1 - Aptitude and basic coding round.",
      "Step 2 - Fundamentals and language basics round.",
      "Step 3 - Scenario or project discussion round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "sdet",
    role: "Software Engineer in Test (SDET/QA)",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Trainee", "Associate", "Senior Associate"],
    stepsProduct: [
      "Step 1 - Coding plus test-case design.",
      "Step 2 - Testing fundamentals and debugging round.",
      "Step 3 - Automation framework and CI quality-gate round.",
      "Step 4 - Behavioral round on quality ownership.",
    ],
    stepsService: [
      "Step 1 - Basic testing and aptitude screen.",
      "Step 2 - Manual testing and basic automation concepts.",
      "Step 3 - QA scenario round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "sre",
    role: "Site Reliability Engineer (SRE)",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Associate", "Senior Associate", "Lead"],
    stepsProduct: [
      "Step 1 - Linux and networking fundamentals round.",
      "Step 2 - Reliability troubleshooting round.",
      "Step 3 - SLO/SLI and incident response design round.",
      "Step 4 - Behavioral round on operational ownership.",
    ],
    stepsService: [
      "Step 1 - Basic operations and scripting screen.",
      "Step 2 - Monitoring and support workflow round.",
      "Step 3 - Incident handling basics round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "devops",
    role: "DevOps / Platform Reliability Engineer",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Associate", "Senior Associate", "Lead"],
    stepsProduct: [
      "Step 1 - CI/CD and cloud fundamentals round.",
      "Step 2 - IaC and orchestration round.",
      "Step 3 - Deployment architecture and rollback strategy round.",
      "Step 4 - Behavioral on release reliability.",
    ],
    stepsService: [
      "Step 1 - Basic CI/CD and tooling screen.",
      "Step 2 - Environment management and deployment basics round.",
      "Step 3 - Supportability and release operations scenario round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "aiml",
    role: "AI/ML Engineer",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Associate", "Senior Associate", "Lead"],
    stepsProduct: [
      "Step 1 - Coding plus ML fundamentals screen.",
      "Step 2 - Feature engineering and model evaluation round.",
      "Step 3 - ML pipeline design and monitoring round.",
      "Step 4 - Project deep-dive and behavioral round.",
    ],
    stepsService: [
      "Step 1 - Basic ML and coding screening.",
      "Step 2 - ML pipeline fundamentals round.",
      "Step 3 - Use-case implementation discussion round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "security",
    role: "Security Engineer",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Associate", "Senior Associate", "Lead"],
    stepsProduct: [
      "Step 1 - Security fundamentals and secure coding screen.",
      "Step 2 - AppSec vulnerability analysis round.",
      "Step 3 - Threat-modeling and architecture controls round.",
      "Step 4 - Behavioral on incident response and governance.",
    ],
    stepsService: [
      "Step 1 - Security basics screening.",
      "Step 2 - Vulnerability checklist and controls round.",
      "Step 3 - Incident workflow scenario round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "platform",
    role: "Platform Engineer",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Associate", "Senior Associate", "Lead"],
    stepsProduct: [
      "Step 1 - API design and coding round.",
      "Step 2 - Platform architecture round.",
      "Step 3 - Reliability and observability design round.",
      "Step 4 - Behavioral on platform ownership.",
    ],
    stepsService: [
      "Step 1 - Basic API and coding screen.",
      "Step 2 - Integration and platform operations round.",
      "Step 3 - Performance/supportability basics round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "data",
    role: "Data Engineer",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Associate", "Senior Associate", "Lead"],
    stepsProduct: [
      "Step 1 - SQL and coding round.",
      "Step 2 - Data modeling and warehouse design round.",
      "Step 3 - ETL/streaming architecture round.",
      "Step 4 - Behavioral on data quality and ownership.",
    ],
    stepsService: [
      "Step 1 - SQL and basic coding screen.",
      "Step 2 - ETL fundamentals round.",
      "Step 3 - Data support and reporting scenario round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
  {
    key: "tpm",
    role: "Technical Program Manager (TPM)",
    levelsProduct: ["Entry", "Mid", "Senior"],
    levelsService: ["Associate", "Senior Associate", "Lead"],
    stepsProduct: [
      "Step 1 - Program planning and dependency management round.",
      "Step 2 - Architecture literacy round.",
      "Step 3 - Risk and milestone execution round.",
      "Step 4 - Behavioral on communication and influence.",
    ],
    stepsService: [
      "Step 1 - Program coordination basics round.",
      "Step 2 - Delivery planning and reporting round.",
      "Step 3 - Stakeholder management scenario round.",
      "Step 4 - HR/behavioral fit round.",
    ],
  },
];

const roleBase = {
  swe: 32,
  sdet: 24,
  sre: 26,
  devops: 25,
  aiml: 34,
  security: 28,
  platform: 28,
  data: 26,
  tpm: 24,
};

const hqs = {
  // Audio & Systems
  "Sennheiser Audio": "Wedemark, Germany",
  "JBL Harman": "Stamford, Connecticut, USA",
  "Bang and Olufsen": "Struer, Denmark",
  "Audio-Technica": "Tokyo, Japan",
  "Beyerdynamic": "Heilbronn, Germany",
  "Pioneer Corporation": "Tokyo, Japan",
  "Garmin Smartwatches": "Schaffhausen, Switzerland",
  "Fitbit Wearables": "San Francisco, California, USA",
  "GoPro Cameras": "San Mateo, California, USA",
  "Pebble Smartwatches": "Redwood City, California, USA",
  "Autel Robotics Drones": "Shenzhen, Guangdong, China",
  "Parrot Drones": "Paris, France",
  "ASUS Computers": "Taipei, Taiwan",
  "Acer Laptops": "New Taipei City, Taiwan",
  "Lenovo Computers": "Beijing, China",
  "MSI Computers Gaming": "New Taipei City, Taiwan",
  "Razer Gaming": "Singapore",
  "Corsair Gaming": "Milpitas, California, USA",
  "SteelSeries Gaming": "Copenhagen, Denmark",
  "Logitech Peripherals": "Lausanne, Switzerland",
  "Crucial Memory SSD": "Boise, Idaho, USA",
  "PNY Technologies": "Parsippany-Troy Hills, New Jersey, USA",
  "Zotac Graphics Cards": "Hong Kong",
  "EVGA Corporation": "Brea, California, USA",
  "Gigabyte Technology": "New Taipei City, Taiwan",
  "ASRock Motherboards": "Taipei, Taiwan",
  "MathWorks MATLAB": "Natick, Massachusetts, USA",
  "Altair Engineering": "Troy, Michigan, USA",
  "Bentley Systems": "Exton, Pennsylvania, USA",
  "Dassault Systemes": "Velizy-Villacoublay, France",
  "Siemens PLM Software": "Plano, Texas, USA",
  "Leica Geosystems": "Heerbrugg, Switzerland",
  "Hexagon AB": "Stockholm, Sweden",
  "FARO Technologies": "Lake Mary, Florida, USA",

  // Devops, Cloud & Databases
  "Varnish Software": "Los Angeles, California, USA",
  "OpenStack Cloud": "Austin, Texas, USA",
  "MariaDB Database": "Redwood City, California, USA",
  "Percona MySQL Support": "Raleigh, North Carolina, USA",
  "SingleStore Database": "San Francisco, California, USA",
  "TimescaleDB": "New York City, New York, USA",
  "QuestDB": "London, UK",
  "VictoriaMetrics": "San Francisco, California, USA",
  "Loki Grafana": "New York City, New York, USA",
  "Tempo Grafana": "New York City, New York, USA",
  "Mimir Grafana": "New York City, New York, USA",
  "Thanos Prometheus": "San Francisco, California, USA",
  "OpenTelemetry": "San Francisco, California, USA",
  "Jaeger Tracing": "San Francisco, California, USA",
  "Zipkin Tracing": "San Francisco, California, USA",
  "Fluentd Logging": "Mountain View, California, USA",
  "Fluent Bit Logging": "Mountain View, California, USA",
  "Logstash Elastic": "Mountain View, California, USA",
  "Filebeat Elastic": "Mountain View, California, USA",
  "Metricbeat Elastic": "Mountain View, California, USA",
  "ScyllaDB NoSQL": "Palo Alto, California, USA",
  "Nomad HashiCorp": "San Francisco, California, USA",
  "Consul HashiCorp": "San Francisco, California, USA",
  "Packer HashiCorp": "San Francisco, California, USA",
  "Vagrant HashiCorp": "San Francisco, California, USA",
  "Spinnaker CD": "San Francisco, California, USA",
  "ArgoCD Kubernetes": "San Francisco, California, USA",
  "Tekton Pipelines": "San Francisco, California, USA",
  "Jenkins CI": "San Francisco, California, USA",
  "TeamCity JetBrains": "Prague, Czech Republic",
  "AppVeyor CI": "Toronto, Ontario, Canada",
  "Veracode Security": "Burlington, Massachusetts, USA",
  "Checkmarx Security": "Ramat Gan, Israel",
  "Aqua Security": "Ramat Gan, Israel",
  "Sysdig Container Security": "San Francisco, California, USA",
  "Lacework Security": "San Jose, California, USA",
  "Orca Security Cloud": "Tel Aviv, Israel",
  "Honeycomb Observability": "San Francisco, California, USA",
  "Lightstep Observability": "San Francisco, California, USA",
  "Chronosphere Observability": "New York City, New York, USA",
  "Logz.io Logging": "Tel Aviv, Israel",
  "Sumo Logic Analytics": "Redwood City, California, USA",
  "Graylog Logging": "Houston, Texas, USA",
  "Semgrep Code Scanning": "San Francisco, California, USA",
  "Coverity Synopsys": "Mountain View, California, USA",
  "Fortify Security": "Sunnyvale, California, USA",
  "Vultr Cloud": "Matawan, New Jersey, USA",
  "Kamatera Cloud": "New York City, New York, USA",
  "Atlantic.Net Cloud": "Orlando, Florida, USA",
  "Render Cloud Hosting": "San Francisco, California, USA",
  "Railway App Cloud": "San Francisco, California, USA",
  "Fly.io Cloud Hosting": "Chicago, Illinois, USA",

  // Digital Media & Creative
  "Sketch Design": "The Hague, Netherlands",
  "InVision App": "New York City, New York, USA",
  "Adobe XD": "San Jose, California, USA",
  "Marvel App Design": "London, UK",
  "Zeplin Collaboration": "San Francisco, California, USA",
  "Avocode Design": "Prague, Czech Republic",
  "LottieFiles Animations": "San Francisco, California, USA",
  "Adobe Express": "San Jose, California, USA",
  "PicMonkey Editor": "Seattle, Washington, USA",
  "Fotor Editor": "Chengdu, Sichuan, China",
  "Pixlr Image Editor": "Stockholm, Sweden",
  "Photopea Editor": "Prague, Czech Republic",
  "Affinity Designer Serif": "Nottingham, UK",
  "Affinity Photo Serif": "Nottingham, UK",
  "Affinity Publisher Serif": "Nottingham, UK",
  "QuarkXPress Publishing": "Grand Rapids, Michigan, USA",
  "Final Cut Pro Apple": "Cupertino, California, USA",
  "DaVinci Resolve Blackmagic": "Melbourne, Australia",
  "Avid Media Composer": "Burlington, Massachusetts, USA",
  "Ableton Live Music": "Berlin, Germany",
  "FL Studio Image-Line": "Ghent, Belgium",
  "Pro Tools Avid": "Burlington, Massachusetts, USA",
  "Cubase Steinberg": "Hamburg, Germany",
  "Reaper Cockos": "San Francisco, California, USA",
  "Studio One PreSonus": "Baton Rouge, Louisiana, USA",
  "Reason Studios": "Stockholm, Sweden",
  "Bitwig Studio": "Berlin, Germany",
  "Cakewalk BandLab": "Singapore",
  "Traktor Native Instruments": "Berlin, Germany",
  "Serato DJ": "Auckland, New Zealand",
  "VirtualDJ Atomix": "Paris, France",
  "Rekordbox Pioneer": "Yokohama, Kanagawa, Japan",

  // Workplace & Low Code
  "Basecamp 37signals": "Chicago, Illinois, USA",
  "Wrike Collaborative": "San Jose, California, USA",
  "Smartsheet Spreadsheet": "Bellevue, Washington, USA",
  "Airtable Low Code": "San Francisco, California, USA",
  "Coda.io Documents": "San Francisco, California, USA",
  "Quip Salesforce": "San Francisco, California, USA",
  "Bear Markdown Notes": "Florence, Italy",
  "Ulysses Markdown Notes": "Leipzig, Germany",
  "Scrivener Writing": "Cornwall, UK",
  "Obsidian Notes": "Waterloo, Ontario, Canada",
  "Roam Research Notes": "San Francisco, California, USA",
  "Logseq Notes": "San Francisco, California, USA",
  "Milanote Creative Boards": "Melbourne, Australia",
  "Whimsical Boards": "Denver, Colorado, USA",
  "Mural Collaboration": "San Francisco, California, USA",
  "Lucidchart Diagramming": "South Jordan, Utah, USA",
  "Draw.io Diagrams": "Aschaffenburg, Germany",
  "Balsamiq Wireframes": "Sacramento, California, USA",
  "OutSystems Enterprise Low Code": "Boston, Massachusetts, USA",
  "Mendix Low Code": "Boston, Massachusetts, USA",
  "Appian Low Code Automation": "McLean, Virginia, USA",
  "Pocketbase Backend": "Sofia, Bulgaria",
  "Appwrite Backend": "London, UK",
  "Back4App Cloud Parse": "Sunnyvale, California, USA",
  "Parse Platform Backend": "San Francisco, California, USA",

  // Fintech & AI
  "Bunq Mobile Bank": "Amsterdam, Netherlands",
  "Oxigen Wallet India": "Gurgaon, Haryana, India",
  "Citrus Pay Payments": "Mumbai, Maharashtra, India",
  "MSwipe Card Reader": "Mumbai, Maharashtra, India",
  "Ezetap POS India": "Bengaluru, Karnataka, India",
  "Clover POS Fiserv": "Sunnyvale, California, USA",
  "Revel Systems POS": "Atlanta, Georgia, USA",
  "TouchBistro Restaurant POS": "Toronto, Ontario, Canada",
  "Loyverse Free POS": "Limassol, Cyprus",
  "Afterpay BNPL": "Melbourne, Australia",
  "Sezzle BNPL Payments": "Minneapolis, Minnesota, USA",
  "Splitit BNPL": "New York City, New York, USA",
  "Zip Co BNPL": "Sydney, Australia",
  "Laybuy BNPL": "Auckland, New Zealand",
  "Humm Group BNPL": "Sydney, Australia",
  "Uniswap Labs Crypto": "New York City, New York, USA",
  "PancakeSwap DEX": "Singapore",
  "SushiSwap DEX": "New York City, New York, USA",
  "Curve Finance DeFi": "Zurich, Switzerland",
  "Balancer DeFi": "Berlin, Germany",
  "Kyber Network DeFi": "Singapore",
  "Loopring Layer 2": "Shanghai, China",
  "dYdX Exchange Crypto": "San Francisco, California, USA",
  "Synthetix DeFi Assets": "Sydney, Australia",
  "Adept AI Labs": "San Francisco, California, USA",
  "Inflection AI Pi": "Palo Alto, California, USA",
  "Character.ai Chatbots": "Palo Alto, California, USA",
  "Synthesia AI Video": "London, UK",
  "Descript AI Audio": "San Francisco, California, USA",
  "ElevenLabs AI Voice": "New York City, New York, USA",
  "Murf.ai Voiceover": "Salt Lake City, Utah, USA",
  "Play.ht AI Voice": "San Francisco, California, USA",
  "Lovo.ai Voiceover": "Berkeley, California, USA",
  "Speechify Reader": "Cliffside Park, New Jersey, USA",
  "Otter.ai Transcription": "Mountain View, California, USA",
  "Fireflies.ai Meeting Notes": "San Francisco, California, USA",
  "Fathom AI Notes": "San Francisco, California, USA",
  "Avoma Meeting AI": "San Francisco, California, USA",
  "Chorus.ai Conversation Intelligence": "San Francisco, California, USA",
  "Gong.io Revenue Intelligence": "Palo Alto, California, USA",
  "Salesloft Revenue Workspace": "Atlanta, Georgia, USA",
  "Outreach.io Sales Engagement": "Seattle, Washington, USA",
  "Apollo.io Sales Database": "San Francisco, California, USA",
  "Seamless.ai Sales Search": "Columbus, Ohio, USA",
  "Lusha Sales Intelligence": "Tel Aviv, Israel",
  "Hunter.io Email Finder": "Lyon, France",
  "Clearbit B2B Data": "San Francisco, California, USA",
  "LeadIQ Prospecting": "Singapore",
  "Cognism B2B Leads": "London, UK",
  "Uplead B2B Prospecting": "Walnut Creek, California, USA",
  "Ouster Lidar": "San Francisco, California, USA",
};

const metadata = {
  223: {
    preferred_skills: ["Acoustic Engineering", "Sensor Systems", "Firmware Development", "CAD/3D Modeling", "Hardware Testing"],
    eligibility: "Degrees in EE/ECE/ME/CSE with strong analytical skills and interest in premium physical tech and simulation.",
    student_perception: "Elite hardware-software engineering brand specializing in premium audio, GPS, and simulation systems.",
  },
  224: {
    preferred_skills: ["Linux Systems", "Observability Frameworks", "Infrastructure IaC", "Distributed Queries", "Log Aggregation"],
    eligibility: "Degrees in CSE/ECE with deep understanding of network protocols, cloud, or SQL/NoSQL databases.",
    student_perception: "High-scale engineering workspace building the pipelines and databases that support modern cloud monitoring.",
  },
  225: {
    preferred_skills: ["UI Development", "WebGL/Graphic Rendering", "Audio DSP", "C++ or Web Audio API", "UX Optimization"],
    eligibility: "Interests in audio processing, graphic rendering, front-end architecture, and creative product usability.",
    student_perception: "Vibrant creative workspace for musicians, video editors, and designers building digital media engines.",
  },
  226: {
    preferred_skills: ["Spreadsheet Engineering", "Low-code architecture", "Markdown & Docs automation", "API integrations", "Workplace workflows"],
    eligibility: "Strong logical thinking, interest in developer efficiency, B2B workplace workflows, and clean code principles.",
    student_perception: "Fast-moving SaaS digital brand building low-code databases, document tooling, and project management workspaces.",
  },
  227: {
    preferred_skills: ["DeFi smart contracts", "Mobile Banking", "Billing & Transaction APIs", "Sales Automation", "CRM data models"],
    eligibility: "Excellent problem solving, mathematical skills, interest in transaction speed, safety, or sales intelligence databases.",
    student_perception: "Cutting-edge fintech and sales intelligence domain offering premium compensation and high scale.",
  },
};

function ctcRange(low, high) {
  return `INR ${low}-${high} LPA`;
}

function makeBreakdown(low, high, category) {
  const baseLow = Math.round(low * 0.72);
  const baseHigh = Math.round(high * 0.78);
  const variableLow = Math.max(1, Math.round(low * (category === "product" ? 0.14 : 0.08)));
  const variableHigh = Math.max(variableLow + 1, Math.round(high * (category === "product" ? 0.2 : 0.1)));
  const bonusLow = Math.max(1, Math.round(low * 0.03));
  const bonusHigh = Math.max(bonusLow + 1, Math.round(high * 0.06));
  return {
    base: ctcRange(baseLow, baseHigh),
    rsu_per_year: category === "product" ? ctcRange(variableLow, variableHigh) : `${ctcRange(variableLow, variableHigh)} (variable mix)`,
    joining_bonus: ctcRange(bonusLow, bonusHigh),
  };
}

function roleLevel(role, company) {
  const anchor = roleBase[role.key] * company.multiplier;
  const low = Math.max(4, Math.round(anchor * 0.78));
  const high = Math.max(low + 4, Math.round(anchor * 1.28));
  const level = company.category === "service" ? "Trainee/Associate" : "Entry";
  return {
    level,
    label: `${role.role} - ${level}`,
    experience: "0-2 years",
    ctc_range: ctcRange(low, high),
    breakdown: makeBreakdown(low, high, company.category),
    interview_process: {
      rounds: 4,
      steps: company.category === "service" ? role.stepsService : role.stepsProduct,
    },
  };
}

function buildCompany(companyName, batchId, details) {
  const hq = hqs[companyName] || "Bengaluru, Karnataka, India";
  
  const company = {
    company_name: companyName,
    headquarters: hq,
    india_locations: ["Bengaluru", "Hyderabad", "Mumbai", "Pune", "Gurgaon"],
    type: "Product",
    tier: "Tier 1",
    category: "product",
    multiplier: 1.45,
    preferred_skills: details.preferred_skills,
    eligibility: details.eligibility,
    student_perception: details.student_perception,
  };
  
  return {
    company_name: company.company_name,
    headquarters: company.headquarters,
    india_locations: company.india_locations,
    titles: roles.map((r) => ({ role: r.role, levels: company.category === "service" ? r.levelsService : r.levelsProduct })),
    type: company.type,
    tier: company.tier,
    common_tech_roles: roles.map((r) => r.role),
    hiring_active: true,
    preferred_skills: company.preferred_skills,
    eligibility: company.eligibility,
    student_perception: company.student_perception,
    roles: roles.map((r) => ({ title: r.role, levels: [roleLevel(r, company)] })),
    notes: `${company.company_name} batch entry contains full 9-team coverage for structural consistency; real fresher allocation can vary by business unit.`,
  };
}

// Load the prechecked candidate batches configuration
const batchesConfig = JSON.parse(readFileSync("data/companies/candidate_batches_223_227.json", "utf8"));

for (const [batchId, batchInfo] of Object.entries(batchesConfig)) {
  const meta = metadata[batchId];
  const batchData = batchInfo.companies.map((name) => buildCompany(name, batchId, meta));
  const filePath = `data/companies/companies_batch_${batchId}.json`;
  writeFileSync(filePath, `${JSON.stringify(batchData, null, 2)}\n`, "utf8");
  console.log(`Created ${filePath} with ${batchData.length} companies (${batchInfo.name})`);
}
