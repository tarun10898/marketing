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
  138: {
    name: "Ceramics, Tiles, and Sanitaryware",
    companies: [
      "HSIL Hindware India",
      "Parryware Roca India",
      "Jaquar Group India",
      "Astral Bathware India",
      "AGL Tiles India",
      "Nexion Ceramics India",
      "Qutone Ceramics India",
      "Sunheart Group India",
      "Regalia Ceramics India",
      "Lioli Ceramics India",
      "GVT Tiles India",
      "Prismx Vitrified India",
      "Keramos Vitrified India",
      "Sakarni Ceramics India",
      "Letina Ceramics India",
      "Refin Ceramics India",
      "Millennium Tiles India",
      "Itaca Ceramics India",
      "Seron Granito India",
      "Emcer Tiles India",
      "Decorcera Tiles India",
      "Duragres Vitrified India",
      "Lavish Ceramics India",
      "Matrix Vitrified India",
      "Tropicana Ceramics India",
    ],
  },
  139: {
    name: "Hospitality, Hotels, and Resort Chains",
    companies: [
      "ITC Hotels India",
      "The Leela Palaces India",
      "Sarovar Hotels India",
      "Wyndham Hotels India",
      "Hyatt Hotels India",
      "Choice Hotels India",
      "Hilton Hotels India",
      "InterContinental Hotels India",
      "Zostel Hostels India",
      "Mahindra Holidays India",
      "Royal Orchid Hotels India",
      "Fortune Hotels India",
      "Ginger Hotels India",
      "IHCL Selections India",
      "Apeejay Surrendra Hotels India",
      "ITDC Ashok Hotels India",
      "Vivanta Hotels India",
      "Welcomhotel Chain India",
      "Clarks Hotel Group India",
      "Lords Hotels India",
      "Neemrana Heritage India",
      "CGH Earth Hotels India",
      "Evolve Back Resorts India",
      "SeleQtions Hotels India",
      "Mango Hotels India",
    ],
  },
  140: {
    name: "Food Services, QSR, and D2C Food Brands",
    companies: [
      "IRCTC Catering India",
      "Sodexo India India",
      "Compass Group India",
      "Elior Group India",
      "Aramark India India",
      "Barbeque Nation India",
      "Burger King India India",
      "Delhivery Logistics India",
      "Yum Brands India India",
      "Impresario Entertainment India",
      "Lite Bite Foods India",
      "Wow Momo Foods India",
      "Faasos Foods India",
      "Licious Foods India",
      "FreshToHome India",
      "Haldiram Snacks India",
      "Bikanervala Foods India",
      "Chuk Tableware India",
      "Third Wave Coffee India",
      "Levista Coffee India",
      "Fingerlix Foods India",
      "Eatclub Brands India",
      "Julian Alps Foods India",
      "Tata Starbucks India",
      "Mad Over Donuts India",
    ],
  },
  141: {
    name: "Industrial Gases, Bulk Chemicals, and Fertilisers",
    companies: [
      "Linde Engineering India",
      "Air Liquide Engineering India",
      "Messer Industrial Gases India",
      "Praxair India India",
      "Inox Air Products India",
      "Goyal MG Gases India",
      "National Oxygen India",
      "Bhuruka Gases India",
      "Ellenbarrie Industrial India",
      "Universal Industrial Gases India",
      "Southern Gas India",
      "Sicgil Industrial Gases India",
      "Asiatic Gases India",
      "Brin Oxygen India",
      "Prakash Air India",
      "Gas Authority India",
      "Deepak Fertilisers India",
      "Gujarat Fluorochemicals India",
      "Gujarat Alkalies India",
      "GHCL India India",
      "DCM Shriram India",
      "Aarti Drugs India",
      "Thirumalai Chemicals India",
      "Vinay Chemicals India",
      "Balaji Speciality India",
    ],
  },
  142: {
    name: "Pumps, Fluid Handling, and Water Systems",
    companies: [
      "Thermax Energy India",
      "Xylem Water Solutions India",
      "Wilo Mather Platt India",
      "Ebara Pumps India",
      "Crompton Pumps India",
      "Aquasub Engineering India",
      "Beacon Pumps India",
      "Mody Pumps India",
      "Sharp Industries Pumps India",
      "Oswal Pumps India",
      "CNP Pumps India",
      "Franklin Electric India",
      "Pentair Water India",
      "Tsurumi Pumps India",
      "Netzsch Pumps India",
      "Sulzer Water India",
      "Weg Motors India",
      "Danfoss Drives India",
      "Pumpwell Industries India",
      "Samudra Pumps India",
      "Texmo Industries India",
      "Duke Plasto India",
      "Prakash Pumps India",
      "Pioneer Pumps India",
      "Vansan Pumps India",
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
