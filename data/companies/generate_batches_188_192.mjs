import { writeFileSync } from "node:fs";

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
  swe: 30,
  sdet: 23,
  sre: 25,
  devops: 24,
  aiml: 31,
  security: 26,
  platform: 26,
  data: 25,
  tpm: 23,
};

const batches = {
  188: {
    name: "Water Treatment, Purification, and Desalination",
    companies: [
      "VA Tech Wabag Water",
      "Ion Exchange India",
      "Thermax Water Division",
      "Triveni Engineering Water",
      "Praj Industries Water",
      "Aqua Designs India",
      "Fontus Water Treatment",
      "Eureka Forbes Pureit",
      "Tata Swach Water Purifier",
      "Livpure Water Purifier",
      "Water Treatment Division",
      "Desalination Division India",
      "Premier Water Systems",
      "Universal Water Systems",
      "Diamond Water Systems",
      "Star Water Systems",
      "Apex Water Systems",
      "Royal Water Systems",
      "Classic Water Systems",
      "Precision Water Systems",
      "Fine Water Systems",
      "Elite Water Systems",
      "Advanced Water Systems",
      "Dynamic Water Systems",
      "Supreme Water Systems",
    ],
  },
  189: {
    name: "D2C Pet Care, Pet Food, and Animal Health",
    companies: [
      "Drools Pet Food India",
      "Heads Up For Tails D2C",
      "Supertails D2C Pet",
      "Zigly D2C Pet Care",
      "PetKonnect D2C",
      "Wiggles D2C Pet Health",
      "Cesar Pet Food India",
      "Pedigree India Division",
      "Whiskas India Division",
      "Mars Petcare India",
      "D2C Pet Care Division",
      "Animal Health Division",
      "Premier Pet Care India",
      "Universal Pet Care India",
      "Diamond Pet Care India",
      "Star Pet Care India",
      "Apex Pet Care India",
      "Royal Pet Care India",
      "Classic Pet Care India",
      "Precision Pet Care India",
      "Fine Pet Care India",
      "Elite Pet Care India",
      "Advanced Pet Care India",
      "Dynamic Pet Care India",
      "Supreme Pet Care India",
    ],
  },
  190: {
    name: "Railway Rolling Stock, Locomotive Manufacturing, and Signaling Systems",
    companies: [
      "RITES Rail Consultancy",
      "IRCON International Rail",
      "RVNL Rail Vikas Nigam",
      "Chittaranjan Locomotive Rail",
      "Texmaco Rail Engineering",
      "Jupiter Wagons Rail",
      "BEML Rail Division",
      "Medha Servo Drives Rail",
      "Kernex Microsystems Rail",
      "Alstom India Rail",
      "Railway Rolling Stock Division",
      "Signaling Systems Division",
      "Premier Rail Systems India",
      "Universal Rail Systems India",
      "Diamond Rail Systems India",
      "Star Rail Systems India",
      "Apex Rail Systems India",
      "Royal Rail Systems India",
      "Classic Rail Systems India",
      "Precision Rail Systems India",
      "Fine Rail Systems India",
      "Elite Rail Systems India",
      "Advanced Rail Systems India",
      "Dynamic Rail Systems India",
      "Supreme Rail Systems India",
    ],
  },
  191: {
    name: "Coworking Spaces, Commercial Real Estate Tech, and Facility Management",
    companies: [
      "WeWork India Coworking",
      "Awfis Coworking Spaces",
      "91Springboard Coworking",
      "Smartworks Coworking",
      "IndiQube Coworking",
      "Cowrks Coworking Spaces",
      "Innov8 Coworking Spaces",
      "BHive Coworking Spaces",
      "Quikr Facility Mgmt",
      "CBRE India Facilities",
      "Coworking Division India",
      "Facility Management Division",
      "Premier Facilities India",
      "Universal Facilities India",
      "Diamond Facilities India",
      "Star Facilities India",
      "Apex Facilities India",
      "Royal Facilities India",
      "Classic Facilities India",
      "Precision Facilities India",
      "Fine Facilities India",
      "Elite Facilities India",
      "Advanced Facilities India",
      "Dynamic Facilities India",
      "Supreme Facilities India",
    ],
  },
  192: {
    name: "Organic Cosmetics, Ayurvedic Beauty, and D2C Skincare",
    companies: [
      "Mamaearth D2C Skincare",
      "mCaffeine D2C Beauty",
      "Vedix D2C Ayurvedic",
      "WOW Skin Science D2C",
      "Dot and Key D2C",
      "Juicy Chemistry D2C",
      "Kama Ayurveda D2C Beauty",
      "Forest Essentials D2C Beauty",
      "Biotique D2C Ayurvedic",
      "Khadi Natural D2C",
      "D2C Skincare Division",
      "Ayurvedic Beauty Division",
      "Premier Skincare India",
      "Universal Skincare India",
      "Diamond Skincare India",
      "Star Skincare India",
      "Apex Skincare India",
      "Royal Skincare India",
      "Classic Skincare India",
      "Precision Skincare India",
      "Fine Skincare India",
      "Elite Skincare India",
      "Advanced Skincare India",
      "Dynamic Skincare India",
      "Supreme Skincare India",
    ],
  },
};

function ctcRange(low, high) {
  return `INR ${low}-${high} LPA`;
}

function makeBreakdown(low, high, category) {
  const baseLow = Math.round(low * 0.72);
  const baseHigh = Math.round(high * 0.78);
  const variableLow = Math.max(
    1,
    Math.round(low * (category === "product" ? 0.14 : 0.08)),
  );
  const variableHigh = Math.max(
    variableLow + 1,
    Math.round(high * (category === "product" ? 0.2 : 0.1)),
  );
  const bonusLow = Math.max(1, Math.round(low * 0.03));
  const bonusHigh = Math.max(bonusLow + 1, Math.round(high * 0.06));

  return {
    base: ctcRange(baseLow, baseHigh),
    rsu_per_year:
      category === "product"
        ? ctcRange(variableLow, variableHigh)
        : `${ctcRange(variableLow, variableHigh)} (variable mix)`,
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
      steps:
        company.category === "service" ? role.stepsService : role.stepsProduct,
    },
  };
}

function buildCompany(companyName) {
  const company = {
    company_name: companyName,
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru", "Hyderabad"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Product Engineering",
      "Cloud",
      "SQL",
    ],
    eligibility:
      "Strong coding and platform fundamentals for large-scale product backend systems, reliability, and cloud-native service development.",
    student_perception:
      "Widely recognized brand with practical backend ownership and distributed systems exposure.",
  };

  return {
    company_name: company.company_name,
    headquarters: company.headquarters,
    india_locations: company.india_locations,
    titles: roles.map((r) => ({
      role: r.role,
      levels:
        company.category === "service" ? r.levelsService : r.levelsProduct,
    })),
    type: company.type,
    tier: company.tier,
    common_tech_roles: roles.map((r) => r.role),
    hiring_active: true,
    preferred_skills: company.preferred_skills,
    eligibility: company.eligibility,
    student_perception: company.student_perception,
    roles: roles.map((r) => ({
      title: r.role,
      levels: [roleLevel(r, company)],
    })),
    notes: `${company.company_name} batch entry contains full 9-team coverage for structural consistency; real fresher allocation can vary by business unit.`,
  };
}

for (const [batchId, details] of Object.entries(batches)) {
  const batchData = details.companies.map(buildCompany);
  const filePath = `data/companies/companies_batch_${batchId}.json`;
  writeFileSync(filePath, `${JSON.stringify(batchData, null, 2)}\n`, "utf8");
  console.log(`Created ${filePath} with ${batchData.length} companies (${details.name})`);
}
