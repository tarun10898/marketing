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
  98: {
    name: "Petrochemical Pipelines, Gas Distribution, and Oilfield Services",
    companies: [
      "GAIL India India",
      "Gujarat Gas India",
      "Indraprastha Gas India",
      "Mahanagar Gas India",
      "Oil India India",
      "Petronet LNG India",
      "Deep Industries India",
      "Selan Exploration India",
      "Jindal Drilling India",
      "Dolphin Offshore India",
      "Aban Offshore India",
      "Hindusthan Oil Exploration India",
      "Asian Energy Services India",
      "Alphageo India India",
      "Gulf Oil Lubricants India",
      "Castrol India India",
      "Valvoline Cummins India",
      "Tide Water Oil India",
      "GP Petroleums India",
      "Eastern Petroleum India",
      "Shiv-Vani Oil & Gas India",
      "Quippo Infrastructure India",
      "Confident Petroleum India",
      "IRM Energy India",
      "Bengal Gas Company India",
    ],
  },
  99: {
    name: "Auto Dealerships, Automotive Retail, and Services",
    companies: [
      "Landmark Cars India",
      "Popular Vehicles & Services India",
      "TVS Mobility India",
      "Mandovi Motors India",
      "Kalyani Motors India",
      "Bimal Auto Agency India",
      "Advaith Hyundai India",
      "Trident Hyundai India",
      "Pratham Motors India",
      "Kothari Wheels India",
      "Shaman Wheels India",
      "Autobahn Enterprises India",
      "Modi Motors India",
      "Lally Motors India",
      "Dada Motors India",
      "Speedwell Motors India",
      "Dynamic Motors India",
      "Garve Motors India",
      "Sterling Motor Company India",
      "Himgiri Hyundai India",
      "OSL Luxury Car India",
      "Navnit Motors India",
      "Infinity Cars India",
      "EVM Motors India",
      "Talwar Auto Garage India",
    ],
  },
  100: {
    name: "Paper Packaging, Corrugated Boxes, and Cartons",
    companies: [
      "Shree Ajit Pulp and Paper India",
      "South India Paper Mills India",
      "Genus Paper & Boards India",
      "Astron Paper & Board Mill India",
      "Malu Paper Mills India",
      "Sripathi Paper Boards India",
      "Siddharth Papers India",
      "Katyayini Paper Mills India",
      "Kuantum Papers India",
      "Satia Industries India",
      "N R Agarwal Industries India",
      "Emami Paper Mills India",
      "Rama Pulp & Papers India",
      "Everest Organics Paper India",
      "Pudumjee Paper Products India",
      "Shreyans Industries India",
      "Murli Industries Paper India",
      "Balkrishna Paper Mills India",
      "Laxmi Board and Paper India",
      "Coastal Papers India",
      "Kay Power and Paper India",
      "Sarda Papers India",
      "Servalakshmi Paper India",
      "Jayant Paper Mills India",
      "Shree Rama Newsprint India",
    ],
  },
  101: {
    name: "Specialty Plastics, Extruded Profiles, and Synthetic Polymers",
    companies: [
      "Tipco Industries India",
      "OK Play India India",
      "National Plastic Industries India",
      "Vimla Plast India",
      "Prima Plastics India",
      "Avro India India",
      "Formulated Polymers India",
      "Mitsu Chem Plast India",
      "Commercial Syn Bags India",
      "PIL Italica Lifestyle India",
      "Bright Brothers India",
      "Polylink Polymers India",
      "Dhabriya Polywood India",
      "Mayur Uniquoters India",
      "Sintex BAPL India",
      "Uniplast India India",
      "TPL Plastech India",
      "Khator Fibre & Fabrics India",
      "Machino Plastics India",
      "Megaplast India India",
      "Rex Pipes & Cables India",
      "Apex Plastics India",
      "Kkalpana Industries India",
      "Garg Plastics India",
      "Rishi Techtex India",
    ],
  },
  102: {
    name: "Industrial Engineering, Casting, Forging, and Metallurgy",
    companies: [
      "Bharat Forge India",
      "Ramkrishna Forgings India",
      "Happy Forgings India",
      "Precision Camshafts India",
      "Pradeep Metals India",
      "Steelcast Limited India",
      "Synergy Green Industries India",
      "Bhagwati Autocast India",
      "Electrosteel Castings India",
      "Nelcast Limited India",
      "Kasturi Foundry India",
      "Kirloskar Ferrous Industries India",
      "Simplex Castings India",
      "Magna Electro Castings India",
      "Rucha Yantra India",
      "BFL Forgings India",
      "Hilton Metal Forging India",
      "Simonds Forgtech India",
      "Continental Forgings India",
      "Western India Forgings India",
      "Metalyst Forgings India",
      "Ahmednagar Forgings India",
      "Amtek Auto India",
      "Castex Technologies India",
      "Smith Forgings India",
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
