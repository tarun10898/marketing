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
  133: {
    name: "Specialty Chemicals and Organic Intermediates",
    companies: [
      "SRF Specialty Chemicals India",
      "Navin Fluorine India",
      "Clean Science Technology India",
      "Laxmi Organic Industries India",
      "Anupam Rasayan India",
      "Tatva Chintan Pharma India",
      "Aether Industries India",
      "Archean Chemical Industries India",
      "Himadri Speciality India",
      "Valiant Organics India",
      "Bodal Chemicals India",
      "Atul Limited India",
      "NOCIL Limited India",
      "Alkyl Amines India",
      "Balaji Amines India",
      "Oriental Aromatics India",
      "Privi Speciality India",
      "Sudarshan Chemical India",
      "Camlin Fine Sciences India",
      "Fairchem Organics India",
      "Meghmani Organics India",
      "Transpek Industry India",
      "Bhageria Industries India",
      "Shree Pushkar Chemicals India",
      "Ami Organics India",
    ],
  },
  134: {
    name: "Industrial Textiles, Spinning, and Apparel Manufacturing",
    companies: [
      "Welspun India Textiles",
      "Trident Group Textiles India",
      "Raymond Textiles India",
      "Arvind Textiles India",
      "KPR Mill India",
      "Gokaldas Exports India",
      "Indo Count Industries India",
      "Himatsingka Seide India",
      "Sutlej Textiles India",
      "Nahar Spinning India",
      "RSWM Textiles India",
      "Donear Industries India",
      "Nitin Spinners India",
      "Sangam Textiles India",
      "Birla Century Textiles India",
      "Ambika Cotton India",
      "Loyal Textile Mills India",
      "Mafatlal Industries India",
      "Rieter India India",
      "Saurer Textiles India",
      "SP Apparels India",
      "Dollar Industries India",
      "Lux Industries India",
      "Rupa Company India",
      "Monte Carlo Fashions India",
    ],
  },
  135: {
    name: "Agritech, Precision Farming, and Farm-to-Market Platforms",
    companies: [
      "Fasal AgriTech India",
      "BharatAgri India",
      "Plantix India",
      "FarmERP India",
      "SatSure India",
      "Intello Labs India",
      "WayCool Foods India",
      "S4S Technologies India",
      "Farmizen India",
      "AgNext Technologies India",
      "Arya Collateral India",
      "Jai Kisan India",
      "Oxen Farm India",
      "KrishiHub India",
      "GramCover India",
      "FarmGuide India",
      "EM3 AgriServices India",
      "Ergos Agritech India",
      "AgriRain Systems India",
      "Unnati Agritech India",
      "Clover Ventures India",
      "AgriQ Analytics India",
      "ReshaMandi India",
      "Otipy Fresh India",
      "SuperZop India",
    ],
  },
  136: {
    name: "Shipbuilding, Marine Engineering, and Maritime Logistics",
    companies: [
      "Garden Reach Shipbuilders India",
      "Goa Shipyard India",
      "Hindustan Shipyard India",
      "L&T Shipbuilding India",
      "ABG Shipyard India",
      "Pipavav Defence India",
      "Bharati Shipyard India",
      "Chowgule Shipyard India",
      "Shoft Shipyard India",
      "Modest Infrastructure India",
      "Dempo Shipbuilding India",
      "Great Eastern Shipping India",
      "Shipping Corp India",
      "Mercator Shipping India",
      "Varun Shipping India",
      "Samudra Shipyard India",
      "Titagarh Rail Systems India",
      "Swan Energy Marine India",
      "Wadia Shipyard India",
      "Reliance Naval India",
      "IHC India India",
      "Colombo Dockyard India",
      "Hooghly Dock India",
      "Shalimar Works India",
      "Alcock Ashdown India",
    ],
  },
  137: {
    name: "Consumer Appliances, Kitchen, and Home Durables",
    companies: [
      "Havells Appliances India",
      "Crompton Greaves Consumer India",
      "Butterfly Gandhimathi India",
      "Stove Kraft India",
      "Elica India India",
      "Faber Appliances India",
      "Preethi Kitchen India",
      "Voltas Beko India",
      "Morphy Richards India",
      "Kent RO Systems India",
      "Livpure Appliances India",
      "A O Smith India",
      "Racold Thermo India",
      "Panasonic Appliances India",
      "Philips Domestic India",
      "Whirlpool Appliances India",
      "Haier Appliances India",
      "Samsung Consumer India",
      "LG Electronics Appliances India",
      "Daikin Airconditioning India",
      "Blue Star Appliances India",
      "Symphony Coolers India",
      "Carrier Midea India",
      "Brita Water India",
      "AquaSure Purifiers India",
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
