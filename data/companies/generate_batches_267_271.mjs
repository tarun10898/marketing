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
  // Batch 267
  "Finexcore": "Mumbai, Maharashtra, India",
  "Techdom": "Bengaluru, Karnataka, India",
  "Shuttl": "Gurgaon, Haryana, India",
  "Loco Nav": "Gurgaon, Haryana, India",
  "IntrCity SmartBus": "Noida, Uttar Pradesh, India",
  "Routematic": "Bengaluru, Karnataka, India",
  "Moveinsync": "Bengaluru, Karnataka, India",
  "Commut": "Hyderabad, Telangana, India",
  "ZipGo": "Bengaluru, Karnataka, India",
  "Easycommute": "Hyderabad, Telangana, India",
  "Quick Ride": "Bengaluru, Karnataka, India",
  "sRide": "Pune, Maharashtra, India",
  "Ola Corporate": "Bengaluru, Karnataka, India",
  "Zoomcar": "Bengaluru, Karnataka, India",
  "Revv": "Gurgaon, Haryana, India",
  "Drivezy": "Bengaluru, Karnataka, India",
  "Myles Car": "New Delhi, Delhi, India",
  "Voler Cars": "New Delhi, Delhi, India",
  "Selfdrive": "Mumbai, Maharashtra, India",
  "JustRide": "Mumbai, Maharashtra, India",
  "Eco Rent": "New Delhi, Delhi, India",
  "Savaari": "Bengaluru, Karnataka, India",
  "Outstation": "Bengaluru, Karnataka, India",
  "Taxida": "Chennai, Tamil Nadu, India",
  "Ryde": "Bengaluru, Karnataka, India",

  // Batch 268
  "Aarav Unmanned": "Bengaluru, Karnataka, India",
  "Endure Air": "Noida, Uttar Pradesh, India",
  "Skye Air": "Gurgaon, Haryana, India",
  "Addverb Tech": "Noida, Uttar Pradesh, India",
  "Hi-Tech Robotic": "Gurgaon, Haryana, India",
  "Mukunda Foods": "Bengaluru, Karnataka, India",
  "Planys Tech": "Chennai, Tamil Nadu, India",
  "Stanza Living": "New Delhi, Delhi, India",
  "ZoloStays": "Bengaluru, Karnataka, India",
  "Colive": "Bengaluru, Karnataka, India",
  "Nestaway": "Bengaluru, Karnataka, India",
  "CoHo": "Gurgaon, Haryana, India",
  "StayAbode": "Bengaluru, Karnataka, India",
  "Flock": "Bengaluru, Karnataka, India",
  "SimplyGuest": "Bengaluru, Karnataka, India",
  "Hello World Co": "Bengaluru, Karnataka, India",
  "Isthara": "Hyderabad, Telangana, India",
  "Youth Hostel": "New Delhi, Delhi, India",
  "Zostel": "Gurgaon, Haryana, India",
  "Wanderers": "New Delhi, Delhi, India",
  "The Hosteller": "Mumbai, Maharashtra, India",
  "goSTOPS": "New Delhi, Delhi, India",
  "Backpacker Panda": "Pune, Maharashtra, India",
  "Moustache Escapes": "New Delhi, Delhi, India",
  "Roadhouse Hostels": "New Delhi, Delhi, India",

  // Batch 269
  "Madpackers": "New Delhi, Delhi, India",
  "Joey's Hostel": "New Delhi, Delhi, India",
  "Smyle Inn": "New Delhi, Delhi, India",
  "ZiffyHomes": "Gurgaon, Haryana, India",
  "Square Yards": "Gurgaon, Haryana, India",
  "MagicBricks": "Noida, Uttar Pradesh, India",
  "99acres": "Noida, Uttar Pradesh, India",
  "Housing.com": "Mumbai, Maharashtra, India",
  "Commonfloor": "Bengaluru, Karnataka, India",
  "PropTiger": "Gurgaon, Haryana, India",
  "Makaan.com": "Gurgaon, Haryana, India",
  "EaseMyTrip": "New Delhi, Delhi, India",
  "Paytm Travel": "Noida, Uttar Pradesh, India",
  "ConfirmTkt": "Bengaluru, Karnataka, India",
  "RedBus India": "Bengaluru, Karnataka, India",
  "AbhiBus": "Hyderabad, Telangana, India",
  "TicketGoose": "Chennai, Tamil Nadu, India",
  "Travelyaari": "Bengaluru, Karnataka, India",
  "Goibibo": "Gurgaon, Haryana, India",
  "Via.com": "Bengaluru, Karnataka, India",
  "Headout": "Bengaluru, Karnataka, India",
  "Trove": "Bengaluru, Karnataka, India",
  "Klook India": "Gurgaon, Haryana, India",
  "Tripoto": "New Delhi, Delhi, India",
  "HolidayIQ": "Bengaluru, Karnataka, India"
};

const metadata = {
  267: {
    preferred_skills: ["Route Optimization", "Node.js", "Java", "Redis", "Real-Time Tracking", "APIs"],
    eligibility: "Degrees in CSE/ECE/EE with strong systems coding and interest in transit optimization and logistics algorithms.",
    student_perception: "High-impact mobility and transit software brands serving millions of daily commuters.",
  },
  268: {
    preferred_skills: ["Embedded C/C++", "ROS", "Firmware", "Python", "Computer Vision", "IoT Systems"],
    eligibility: "Degrees in ECE/EE/ME/CSE with passion for hardware-software integration, robotics, and smart systems.",
    student_perception: "Innovative hardware-software engineering spaces developing next-generation robotics and drone fleets.",
  },
  269: {
    preferred_skills: ["Search Engines", "React", "Node.js", "Elasticsearch", "SQL/NoSQL", "System Design"],
    eligibility: "Degrees in CSE/ECE with strong front-end or back-end skills and interest in high-scale search, listings, and travel commerce.",
    student_perception: "Popular consumer travel and real estate portals offering high exposure to high-scale booking systems.",
  },
  270: {
    preferred_skills: ["IoT Sensing", "Python", "GIS/Spatial Data", "Data Lakes", "AWS"],
    eligibility: "Degrees in CSE/ECE/EE with interest in supply-chain intelligence, spatial tracking, and agricultural data platforms.",
    student_perception: "Evolving agricultural analytics and supply-chain digitization workspaces.",
  },
  271: {
    preferred_skills: ["Micro-transactions", "Ledgers", "React Native", "Spring Boot", "REST APIs"],
    eligibility: "Degrees in CSE/ECE/EE with strong backend foundations and interest in micro-banking or digital distribution networks.",
    student_perception: "Specialized micro-fintech and agritech platforms scaling transaction and logistics networks.",
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

// Load the candidate batches configuration
const batchesConfig = JSON.parse(readFileSync("data/companies/candidate_batches_267_271.json", "utf8"));

for (const [batchId, companies] of Object.entries(batchesConfig)) {
  const meta = metadata[batchId];
  const batchData = companies.map((name) => buildCompany(name, batchId, meta));
  const filePath = `data/companies/companies_batch_${batchId}.json`;
  writeFileSync(filePath, `${JSON.stringify(batchData, null, 2)}\n`, "utf8");
  console.log(`Created ${filePath} with ${batchData.length} companies`);
}
