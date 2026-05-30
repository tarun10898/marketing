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
  // Mixed
  "Ansys": "Canonsburg, Pennsylvania, USA",
  "Autodesk": "San Rafael, California, USA",
  "Logitech": "Lausanne, Switzerland",
  "Garmin": "Schaffhausen, Switzerland",
  "Sonos": "Santa Barbara, California, USA",
  "Bose": "Framingham, Massachusetts, USA",
  "Pure Storage": "Mountain View, California, USA",
  "Synopsys India (EDA Software)": "Mountain View, California, USA",
  "Linode": "Philadelphia, Pennsylvania, USA",
  "Hetzner": "Gunzenhausen, Germany",
  "ScyllaDB": "Palo Alto, California, USA",
  "Prisma": "Berlin, Germany",
  "LaunchDarkly": "Oakland, California, USA",
  "Framer": "Amsterdam, Netherlands",
  "SoundCloud": "Berlin, Germany",
  "Deezer": "Paris, France",
  "Tidal Music": "Oslo, Norway",
  "Pandora Media": "Oakland, California, USA",
  "Eventbrite": "San Francisco, California, USA",
  "Monzo": "London, UK",
  "Starling Bank": "London, UK",
  "N26": "Berlin, Germany",
  "Dave": "Los Angeles, California, USA",
  "MoneyLion": "New York City, New York, USA",
  "Cohere AI": "Toronto, Ontario, Canada",

  // AI & Cyber
  "Stability AI": "London, UK",
  "Runway ML": "New York City, New York, USA",
  "Jasper AI": "Austin, Texas, USA",
  "Copy.ai": "Memphis, Tennessee, USA",
  "C3.ai": "Redwood City, California, USA",
  "Alteryx": "Irvine, California, USA",
  "Fivetran": "Oakland, California, USA",
  "dbt Labs": "Philadelphia, Pennsylvania, USA",
  "Dagster Labs": "San Francisco, California, USA",
  "H2O.ai": "Mountain View, California, USA",
  "Milvus": "San Francisco, California, USA",
  "Qdrant": "Berlin, Germany",
  "Comet ML": "New York City, New York, USA",
  "Neptune.ai": "Warsaw, Poland",
  "Run:ai": "Tel Aviv, Israel",
  "Trellix (FireEye/McAfee)": "San Jose, California, USA",
  "HashiCorp Vault": "San Francisco, California, USA",
  "Bitdefender": "Bucharest, Romania",
  "Symantec": "Tempe, Arizona, USA",
  "Dashlane": "New York City, New York, USA",
  "Keeper Security": "Chicago, Illinois, USA",
  "NordVPN": "Panama City, Panama",
  "ExpressVPN": "Road Town, British Virgin Islands",
  "Surfshark": "Vilnius, Lithuania",
  "WooCommerce (Automattic)": "San Francisco, California, USA",

  // E-commerce
  "Magento (Adobe)": "San Jose, California, USA",
  "BigCommerce": "Austin, Texas, USA",
  "Squarespace": "New York City, New York, USA",
  "Wix.com": "Tel Aviv, Israel",
  "ShipStation": "Austin, Texas, USA",
  "Flexport": "San Francisco, California, USA",
  "Cart.com": "Austin, Texas, USA",
  "Bolt Payments": "San Francisco, California, USA",
  "Attentive (SMS Marketing)": "New York City, New York, USA",
  "Gorgias (Helpdesk)": "San Francisco, California, USA",
  "Yotpo": "New York City, New York, USA",
  "Printful": "Riga, Latvia",
  "ShipBob": "Chicago, Illinois, USA",
  "Shippo": "San Francisco, California, USA",
  "SendCloud": "Eindhoven, Netherlands",
  "Easyship": "New York City, New York, USA",
  "Shogun": "San Francisco, California, USA",
  "Cart Loop": "Bucharest, Romania",
  "Rebuy Engine": "Minneapolis, Minnesota, USA",
  "loop returns": "Columbus, Ohio, USA",
  "Flexe": "Seattle, Washington, USA",
  "Project44": "Chicago, Illinois, USA",
  "FourKites India": "Chennai, Tamil Nadu, India",
  "Convoy": "Seattle, Washington, USA",
  "Bringg": "Tel Aviv, Israel",

  // Edtech / HR
  "Deel": "San Francisco, California, USA",
  "Oyster HR": "London, UK",
  "Remote.com": "San Francisco, California, USA",
  "Lattice": "San Francisco, California, USA",
  "15Five": "San Francisco, California, USA",
  "Culture Amp": "Melbourne, Australia",
  "Cornerstone OnDemand": "Santa Monica, California, USA",
  "TalentLMS": "Athens, Greece",
  "Docebo": "Toronto, Ontario, Canada",
  "Degreed": "Pleasanton, California, USA",
  "Guild Education": "Denver, Colorado, USA",
  "Khan Academy": "Mountain View, California, USA",
  "Skillshare": "New York City, New York, USA",
  "Udacity": "Mountain View, California, USA",
  "Pluralsight": "Farmington, Utah, USA",
  "Kahoot": "Oslo, Norway",
  "Codecademy": "New York City, New York, USA",
  "Quizlet": "San Francisco, California, USA",
  "Babbel": "Berlin, Germany",
  "Memrise": "London, UK",
  "LinkedIn Learning": "Sunnyvale, California, USA",
  "Hibob": "Tel Aviv, Israel",
  "Zenefits": "San Francisco, California, USA",
  "Personio": "Munich, Germany",
  "Factorial HR": "Barcelona, Spain",
  "Namely": "New York City, New York, USA",

  // Automotive / Robotics
  "Aurora Innovation": "Pittsburgh, Pennsylvania, USA",
  "Zoox (Amazon)": "Foster City, California, USA",
  "Boston Dynamics": "Waltham, Massachusetts, USA",
  "Universal Robots": "Odense, Denmark",
  "DJI Drones": "Shenzhen, Guangdong, China",
  "Trimble Navigation": "Westminster, Colorado, USA",
  "Esri India (GIS Software)": "Noida, Uttar Pradesh, India",
  "Pony.ai": "Fremont, California, USA",
  "TuSimple": "San Diego, California, USA",
  "Kodiak Robotics": "Mountain View, California, USA",
  "Nuro": "Mountain View, California, USA",
  "Starship Technologies": "San Francisco, California, USA",
  "Skydio Drones": "Redwood City, California, USA",
  "Kuka Robotics": "Augsburg, Germany",
  "ABB Robotics": "Zurich, Switzerland",
  "Fanuc India": "Bengaluru, Karnataka, India",
  "Yaskawa India": "Bengaluru, Karnataka, India",
  "Fetch Robotics": "San Jose, California, USA",
  "Locus Robotics": "Wilmington, Massachusetts, USA",
  "Covariant AI": "Berkeley, California, USA",
  "Berkshire Grey": "Bedford, Massachusetts, USA",
  "Autonomous Stuff": "Morton, Illinois, USA",
  "Luminar Technologies": "Orlando, Florida, USA",
  "Velodyne Lidar": "San Jose, California, USA",
  "Ouster Lidar": "San Francisco, California, USA",
};

const metadata = {
  218: {
    preferred_skills: ["Product Architecture", "Software Engineering", "Analytical Reasoning", "Systems Programming"],
    eligibility: "Consistent academic background, strong logical thinking, and experience with modern language stacks (C++, Java, Go, Rust).",
    student_perception: "Top-tier global engineering brand offering immense technical ownership and premium pay.",
  },
  219: {
    preferred_skills: ["AI/ML Pipelines", "Deep Learning Models", "Security controls", "Cloud Orchestration", "Python/Rust"],
    eligibility: "Strong coding skills, analytical mindset, understanding of modern machine learning or secure coding principles.",
    student_perception: "Fast-moving advanced technology domain with cutting-edge stack and elite talent density.",
  },
  220: {
    preferred_skills: ["High-Scale Systems", "Database Optimization", "Web Architectures", "API Integrations", "Supply Chain Engineering"],
    eligibility: "Solid understanding of software patterns, problem-solving, and interest in e-commerce scalability.",
    student_perception: "Scalable platform domain dealing with millions of active users and transaction volume.",
  },
  221: {
    preferred_skills: ["Web Applications", "State Management", "HR Automation systems", "Edtech platform scaling", "Product Usability"],
    eligibility: "Passionate about user-centric product experiences, clean code, and fast iterative development loops.",
    student_perception: "Highly collaborative modern SaaS environment focused on education and workplace digitalization.",
  },
  222: {
    preferred_skills: ["Robotics Systems", "Sensor Fusion", "Computer Vision", "Control Algorithms", "GIS & Spatial Databases"],
    eligibility: "Degrees in CSE/ECE/EE or Robotics with specialized knowledge in real-time embedded systems or spatial analytics.",
    student_perception: "Elite future-tech workspace for hardware-software integration, automated vehicles, and spatial systems.",
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
const batchesConfig = JSON.parse(readFileSync("data/companies/candidate_batches_218_222.json", "utf8"));

for (const [batchId, batchInfo] of Object.entries(batchesConfig)) {
  const meta = metadata[batchId];
  const batchData = batchInfo.companies.map((name) => buildCompany(name, batchId, meta));
  const filePath = `data/companies/companies_batch_${batchId}.json`;
  writeFileSync(filePath, `${JSON.stringify(batchData, null, 2)}\n`, "utf8");
  console.log(`Created ${filePath} with ${batchData.length} companies (${batchInfo.name})`);
}
