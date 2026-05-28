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
  83: {
    name: "Non-Ferrous Metals, Alloys, and Pipes",
    companies: [
      "Gravita India India",
      "Madhav Copper India",
      "Maithan Alloys India",
      "Indian Metals & Ferro Alloys India",
      "FACOR Alloys India",
      "Rohit Ferro-Tech India",
      "Shyam Metalics and Energy India",
      "Adani Enterprises Mining Division India",
      "Sunflag Iron and Steel India",
      "Prakash Industries India",
      "Lloyds Metals and Energy India",
      "Mahamaya Steel Industries India",
      "Steel Exchange India India",
      "Jayswal Neco Industries India",
      "Kalyani Steels India",
      "Suryadev Alloys and Power India",
      "Visa Steel India",
      "Pennar Industries India",
      "Salasar Techno Engineering India",
      "Goodluck India India",
      "Rama Steel Tubes India",
      "Hariom Pipe Industries India",
      "APL Apollo Tubes India",
      "Hi-Tech Pipes India",
      "JTL Industries India",
    ],
  },
  84: {
    name: "Shoe Components, Leather Processing, and Tannery",
    companies: [
      "Farida Group India",
      "KH Group India",
      "Tata International Leather Division India",
      "Florence Shoe India",
      "Indian Leather Corporation India",
      "Bharatiya International India",
      "Euro Footwear India",
      "Lotus Footwear India",
      "Allanasons Leather Division India",
      "Sovereign Leather India",
      "Zahur Sansons Paper & Leather India",
      "Mayur Leather Products India",
      "Hansa Leather India",
      "Rajda Industries India",
      "Mochiko Shoes India",
      "SSIPL Retail India",
      "Forward Shoe India",
      "Prime Shoes India",
      "Kisco Leather India",
      "Tirubala Group India",
      "Walkaroo International India",
      "Uday Footwear India",
      "Kito India",
      "Bahamas Footwear India",
      "Gola Shoes India",
    ],
  },
  85: {
    name: "Printing Ink, Graphic Arts, and Publishing Paper",
    companies: [
      "DIC India India",
      "Toyo Ink India India",
      "Hubergroup India India",
      "Siegwerk India India",
      "Flint Group India India",
      "Sakata Inks India",
      "Hi-Tech Inks India",
      "Printlink Inks India",
      "United Ink and Varnish India",
      "Rainbow Inks India",
      "Vikas Publishing India",
      "Eicher Goodearth Publications India",
      "Rupa & Co Publishing India",
      "Jaico Publishing House India",
      "Prabhat Prakashan India",
      "Rajpal & Sons India",
      "Kitab Mahal India",
      "Kalyani Publishers India",
      "Laxmi Publications India",
      "Arihant Publications India",
      "MTG Learning Media India",
      "Rachna Sagar India",
      "Oswaal Books India",
      "Saraswati House India",
      "Ratna Sagar India",
    ],
  },
  86: {
    name: "Solar Panels, Modules, and Silicon Wafers",
    companies: [
      "Saatvik Green Energy India",
      "Pixon Green Energy India",
      "Alpex Solar India",
      "Insolation Energy India",
      "Navitas Green Solutions India",
      "Redington Solar India",
      "Renewsys India India",
      "Mundra Solar India",
      "TP Solar India",
      "Ganesh Green Bharat India",
      "Premier Solar Systems India",
      "Shurjo Energy India",
      "Emmvee Photovoltaic Power India",
      "Elpro International India",
      "Solar Semiconductor India",
      "Sova Solar India",
      "Luminous Power Technologies Solar India",
      "Microtek Infrastructure Solar India",
      "Su-Kam Power Systems Solar India",
      "Exide Industries Solar Division India",
      "Amara Raja Solar India",
      "Statcon Energia India",
      "Okaya Power Solar India",
      "Eastman Auto & Power Solar India",
      "Genus Innovation Solar India",
    ],
  },
  87: {
    name: "Luxury Decor, Premium Carpets, and Home Furnishings",
    companies: [
      "Obeetee Carpets India",
      "Jaipur Rugs India",
      "D'Decor Home Fabrics India",
      "Spaces by Welspun India",
      "Portico New York India",
      "Swayam India India",
      "Maspar India India",
      "Sarom Fab India",
      "GM Fabrics India",
      "Marshalls Wallcoverings India",
      "Elementto Wallcoverings India",
      "Nilaya by Asian Paints India",
      "Sabyasachi Home India",
      "The Loom Art India",
      "Freedom Tree India",
      "Art D'Inox India",
      "Ellementry India",
      "Deco Window India",
      "Wonderchef Home Appliances India",
      "Stahl Cookware India",
      "Alda Cookware India",
      "Meyer Cookware India",
      "Vinod Cookware India",
      "Bergner India India",
      "Fissler India India",
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
