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
  193: {
    name: "Electric Vehicle Charging Infrastructure and Battery Swapping",
    companies: [
      "Tata Power EV Charging",
      "Ather Grid EV Charging",
      "ChargeZone EV Infra",
      "Statiq EV Charging",
      "Kazam EV Charging",
      "Fortum Charge India",
      "BPCL EV Charging",
      "HPCL EV Charging",
      "IOCL EV Charging",
      "Sun Mobility Battery Swap",
      "EV Charging Division India",
      "Battery Swapping Division",
      "Premier EV Charging India",
      "Universal EV Charging India",
      "Diamond EV Charging India",
      "Star EV Charging India",
      "Apex EV Charging India",
      "Royal EV Charging India",
      "Classic EV Charging India",
      "Precision EV Charging India",
      "Fine EV Charging India",
      "Elite EV Charging India",
      "Advanced EV Charging India",
      "Dynamic EV Charging India",
      "Supreme EV Charging India",
    ],
  },
  194: {
    name: "D2C Audio, Smart Wearables, and Consumer Electronics",
    companies: [
      "Boat D2C Audio India",
      "Noise D2C Wearables",
      "Fire-Boltt D2C Smart",
      "Crossbeats D2C Audio",
      "Portronics D2C Gadgets",
      "Ambrane D2C Electronics",
      "Boult Audio D2C",
      "Mivi D2C Audio India",
      "Hammer D2C Wearables",
      "Pebble D2C Wearables",
      "D2C Wearables Division",
      "Smart Audio Division India",
      "Premier Wearables India",
      "Universal Wearables India",
      "Diamond Wearables India",
      "Star Wearables India",
      "Apex Wearables India",
      "Royal Wearables India",
      "Classic Wearables India",
      "Precision Wearables India",
      "Fine Wearables India",
      "Elite Wearables India",
      "Advanced Wearables India",
      "Dynamic Wearables India",
      "Supreme Wearables India",
    ],
  },
  195: {
    name: "Biologics, Biosimilars, and Vaccine Manufacturing",
    companies: [
      "Biocon Biologics Division",
      "Bharat Biotech Vaccines",
      "Serum Institute Biologics",
      "Indian Immunologicals Bio",
      "Panacea Biotec Vaccines",
      "Shantha Biotechnics Bio",
      "Wockhardt Biologics",
      "Zydus Biologics Division",
      "Gland Pharma Biologics",
      "Intas Biologics Division",
      "Biologics Division India",
      "Vaccine Manufacturing Division",
      "Premier Biologics India",
      "Universal Biologics India",
      "Diamond Biologics India",
      "Star Biologics India",
      "Apex Biologics India",
      "Royal Biologics India",
      "Classic Biologics India",
      "Precision Biologics India",
      "Fine Biologics India",
      "Elite Biologics India",
      "Advanced Biologics India",
      "Dynamic Biologics India",
      "Supreme Biologics India",
    ],
  },
  196: {
    name: "Premium Real Estate, Township Development, and Housing Projects",
    companies: [
      "Birla Estates Projects",
      "Puravankara Real Estate",
      "Sunteck Realty Projects",
      "Mahindra Lifespace Dev",
      "Kolte-Patil Developers",
      "Ashiana Housing Projects",
      "Suraj Estate Developers",
      "Signature Global Realty",
      "Max Estates Projects",
      "Keystone Realtors Projects",
      "Premium Housing Division",
      "Township Development Division",
      "Premier Realty India",
      "Universal Realty India",
      "Diamond Realty India",
      "Star Realty India",
      "Apex Realty India",
      "Royal Realty India",
      "Classic Realty India",
      "Precision Realty India",
      "Fine Realty India",
      "Elite Realty India",
      "Advanced Realty India",
      "Dynamic Realty India",
      "Supreme Realty India",
    ],
  },
  197: {
    name: "B2B Commerce, Industrial Supply, and Wholesale Platforms",
    companies: [
      "Zomato Hyperpure B2B",
      "Udaan B2B Commerce",
      "Moglix B2B Industrial",
      "IndiaMART B2B Platform",
      "Zetwerk B2B Manufacturing",
      "Infra.Market B2B Supply",
      "Power2SME B2B Platform",
      "Bizongo B2B Packaging",
      "Jumbotail B2B Grocery",
      "ShopKirana B2B Retail",
      "B2B Commerce Division",
      "Industrial Supply Division",
      "Premier B2B Platform India",
      "Universal B2B Platform India",
      "Diamond B2B Platform India",
      "Star B2B Platform India",
      "Apex B2B Platform India",
      "Royal B2B Platform India",
      "Classic B2B Platform India",
      "Precision B2B Platform India",
      "Fine B2B Platform India",
      "Elite B2B Platform India",
      "Advanced B2B Platform India",
      "Dynamic B2B Platform India",
      "Supreme B2B Platform India",
    ],
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

function buildCompany(companyName) {
  const company = {
    company_name: companyName,
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru", "Hyderabad"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: ["DSA", "System Design", "Backend Engineering", "Product Engineering", "Cloud", "SQL"],
    eligibility: "Strong coding and platform fundamentals for large-scale product backend systems, reliability, and cloud-native service development.",
    student_perception: "Widely recognized brand with practical backend ownership and distributed systems exposure.",
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

for (const [batchId, details] of Object.entries(batches)) {
  const batchData = details.companies.map(buildCompany);
  const filePath = `data/companies/companies_batch_${batchId}.json`;
  writeFileSync(filePath, `${JSON.stringify(batchData, null, 2)}\n`, "utf8");
  console.log(`Created ${filePath} with ${batchData.length} companies (${details.name})`);
}
