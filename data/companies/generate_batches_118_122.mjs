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
  118: {
    name: "Cold Chain Reefer Trucks and Container Transport",
    companies: [
      "Coldreef Transport India",
      "Arctic Reefer India",
      "Polar Reefer India",
      "Cool Reef India India",
      "Chilled Transport India",
      "Refrigerated Transport Corporation India",
      "Ice Trans India India",
      "Freeze Trans India India",
      "Cool Trucks India",
      "Chill Trucks India",
      "Glacier Reefer India",
      "Snow Reefer India",
      "Frost Reefer India",
      "Alpine Reefer India",
      "Cold Carrier India India",
      "Polar Carrier India India",
      "Cool Logix India India",
      "Refer Cargo India India",
      "Chilled Cargo India India",
      "Thermal Transport India",
      "Cold Flow Reefer India",
      "Polar Flow Reefer India",
      "Ice Flow Reefer India",
      "Zero Reefer India India",
      "Cool Move Reefer India",
    ],
  },
  119: {
    name: "Industrial Breathing Apparatus and Fire Safety Gear",
    companies: [
      "Swastik Fire Safety India",
      "Safex Fire Safety India",
      "Kanex Fire Safety India",
      "Minimax Fire Safety India",
      "Agni Fire Safety India",
      "Ceasefire Industries India",
      "Gunnebo Fire Safety India",
      "Newage Fire Protection India",
      "Aska Equipment Fire India",
      "UTC Fire & Security India",
      "Tyco Fire Security India",
      "Nitin Fire Protection India",
      "Vijay Fire Vehicles India",
      "Zenith Fire Services India",
      "Supreme Fire Safety India",
      "Rapid Fire Safety India",
      "Active Fire Safety India",
      "Flame Safeguard India India",
      "Fire Pro India India",
      "Pyro Safeguard India India",
      "Fire Shield India India",
      "Heat Shield India India",
      "Safe Flame India India",
      "Agni Protection India India",
      "Agni Guard India India",
    ],
  },
  120: {
    name: "Laboratory Glass Tubes, Instruments, and Scientific Instruments",
    companies: [
      "Super Scientific Glass India",
      "Borosil Glass Tubes India",
      "Glassco Scientific India",
      "Top Glass Laboratory India",
      "Prime Lab Instruments India",
      "Apex Glass Instruments India",
      "Universal Glass Instruments India",
      "Scientific Glass Instruments India",
      "Sigma Lab Instruments India",
      "Micro Lab Instruments India",
      "Royal Lab Instruments India",
      "Classic Lab Instruments India",
      "Precision Lab Instruments India",
      "Allied Lab Instruments India",
      "Fine Lab Instruments India",
      "Elite Lab Instruments India",
      "Advanced Lab Instruments India",
      "Quartz Lab Instruments India",
      "Borosilicate Lab Instruments India",
      "Glass Tubes India India",
      "Lab Tubes India India",
      "Scientech Glass India India",
      "Labtech Glass India India",
      "Glassware Instruments India India",
      "Scientific Tubes India India",
    ],
  },
  121: {
    name: "Engineering Plastics, Nylons, and Polycarbonates",
    companies: [
      "Covestro Polycarbonates India",
      "Sabic Nylons India India",
      "Celanese Nylons India India",
      "Lanxess Engineering Plastics India",
      "Huntsman Specialty Polymers India",
      "DSM Nylons India India",
      "Sabic Polyacetal India India",
      "Celanese Polyacetal India India",
      "Zeon Synthetic Polymers India",
      "Kraton Specialty Polymers India",
      "Lubrizol Specialty Polymers India",
      "Dow Engineering Plastics India",
      "BASF Specialty Nylons India",
      "DuPont Specialty Nylons India",
      "Eastman Specialty Polymers India",
      "Mitsui Specialty Polymers India",
      "Sumitomo Specialty Polymers India",
      "Mitsubishi Specialty Polymers India",
      "sabic Resins India India",
      "Celanese Resins India India",
      "Covestro Resins India India",
      "Lanxess Resins India India",
      "Huntsman Resins India India",
      "Wacker Specialty Polymers India",
      "Shin-Etsu Specialty Polymers India",
    ],
  },
  122: {
    name: "Industrial Pulleys, Belts, and Mechanical Drives",
    companies: [
      "Diamond Industrial Belts India",
      "TI Industrial Belts India",
      "Renold Industrial Belts India",
      "Rolcon Industrial Belts India",
      "Tsubaki Industrial Belts India",
      "Lovejoy Industrial Belts India",
      "KTR Industrial Belts India",
      "Vulkan Industrial Belts India",
      "Stromag Industrial Belts India",
      "Centa Industrial Belts India",
      "Esco Industrial Belts India",
      "Tschan Industrial Belts India",
      "Ringfeder Industrial Belts India",
      "Ruland Industrial Belts India",
      "Stafford Industrial Belts India",
      "Climax Industrial Belts India",
      "Zero-Max Industrial Belts India",
      "Helical Industrial Belts India",
      "Huco Industrial Belts India",
      "Nabeya Industrial Belts India",
      "Altra Industrial Belts India",
      "Regal Industrial Belts India",
      "Fenner Pulleys India India",
      "Martin Pulleys India India",
      "Ramsey Pulleys India India",
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
