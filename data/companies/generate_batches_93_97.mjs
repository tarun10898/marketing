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
  93: {
    name: "Telecom Infrastructure, Towers, and Fiber Networks",
    companies: [
      "Indus Towers India",
      "GTL Infrastructure India",
      "Summit Digitel Infrastructure India",
      "American Tower Corporation India",
      "Reliance Infratel India",
      "Tower Vision India",
      "Suyog Telematics India",
      "Aster Teleservices India",
      "HFCL Limited India",
      "Sterlite Technologies Limited India",
      "Aksh Optifibre India",
      "Birla Cable India",
      "Nelco Limited India",
      "RailTel Corporation of India",
      "Tejas Networks India",
      "ITI Limited India",
      "Smartlink Holdings India",
      "D-Link India India",
      "UTStarcom India India",
      "Shyam Telecom India",
      "Kavveri Telecom Products India",
      "Kore Digital India",
      "Frog Cellsat India",
      "Precision Electronics India",
      "Valiant Communications India",
    ],
  },
  94: {
    name: "Consumer Food Processing, Dairy, and Bakeries",
    companies: [
      "Modern Food Enterprises India",
      "Nestle India India",
      "Hatsun Agro Product India",
      "Heritage Foods India",
      "Kwality Limited India",
      "Vadilal Industries India",
      "Milkfood Limited India",
      "Parag Milk Foods India",
      "Dodla Dairy India",
      "Umang Dairies India",
      "Tasty Bite Eatables India",
      "ADF Foods India",
      "Prataap Snacks India",
      "DFM Foods India",
      "Bikaji Foods International India",
      "Haldiram Foods India",
      "Balaji Wafers India",
      "Bector Food Specialities India",
      "KRBL Limited India",
      "LT Foods India",
      "Chaman Lal Setia Exports India",
      "GRM Foods India",
      "Kohinoor Foods India",
      "Sarveshwar Foods India",
      "Megastar Foods India",
    ],
  },
  95: {
    name: "Heavy Engineering Machinery, Cranes, and Earthmovers",
    companies: [
      "Escorts Kubota India",
      "Sany Heavy Industry India",
      "JCB India India",
      "Caterpillar India India",
      "Komatsu India India",
      "Kobelco Construction Machinery India",
      "Hyundai Construction Equipment India",
      "Volvo Construction Equipment India",
      "LiuGong India India",
      "TIL Limited India",
      "Macons Construction Equipment India",
      "Schwing Stetter India India",
      "Putzmeister India India",
      "Wirtgen India India",
      "Apollo Infratech India",
      "KYB-Conmat India",
      "Revathi Equipment India",
      "International Combustion India India",
      "Windsor Machines India",
      "TRF Limited India",
      "McNally Bharat Engineering India",
      "Sandvik Asia India",
      "Atlas Copco India India",
      "Liebherr India India",
      "Zoomlion India India",
    ],
  },
  96: {
    name: "Logistics Platforms, Cold Chain, and Warehouse Automation",
    companies: [
      "TVS Supply Chain Solutions India",
      "Stellar Value Chain Solutions India",
      "TCI Express India",
      "Tiger Logistics India",
      "Gateway Distriparks India",
      "Snowman Logistics India",
      "Gati-KWE India",
      "Sical Logistics India",
      "Spoton Logistics India",
      "Navkar Corporation India",
      "Lancer Container Lines India",
      "Seaways Shipping and Logistics India",
      "LetsTransport India",
      "Locus Shypyard India",
      "CJ Darcl Logistics India",
      "Aegis Logistics India",
      "Increff India",
      "Falcon Autotech India",
      "GreyOrange India",
      "Addverb Technologies India",
      "Armstrong Robotics India",
      "Godrej Storage Solutions India",
      "Coldman Logistics India",
      "Gubba Cold Storage India",
      "Kool-ex Logistics India",
    ],
  },
  97: {
    name: "Specialty Glass, Ceramics, and Sanitaryware",
    companies: [
      "Orient Bell Limited India",
      "Regency Ceramics India",
      "Nitco Tiles India",
      "Orient Bell Tiles India",
      "Asian Granito India",
      "Exxaro Tiles India",
      "H&R Johnson India India",
      "RAK Ceramics India India",
      "Simpolo Ceramics India",
      "Varmora Granito India",
      "Sunhearrt Ceramik India",
      "Hindware Home Innovation India",
      "HSIL Limited India",
      "Parryware India India",
      "Jaquar & Company India",
      "Kohler India India",
      "Toto India India",
      "Roca India India",
      "Murudeshwar Ceramics India",
      "Clay Craft India India",
      "Eagle Glass India",
      "Bharat Potteries India",
      "Empire Industries Glass Division India",
      "Gujarat Borosil India",
      "Fena Ceramics India",
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
