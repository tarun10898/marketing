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
  208: {
    name: "D2C Kidswear, Baby Products, and Toys",
    companies: [
      "FirstCry Baby Products",
      "Hopscotch Kidswear D2C",
      "Beybee Baby Care D2C",
      "LuvLap Baby Gear",
      "Shumee D2C Toys",
      "SuperBottoms Baby Care",
      "BabyHug Baby Products",
      "Rimi Kids Clothing",
      "Smartivity D2C Toys",
      "Mee Mee Baby Products",
      "Kidswear Manufacturing Division",
      "Toy Development Division",
      "Premier Kidswear Toys",
      "Universal Kidswear Toys",
      "Diamond Kidswear Toys",
      "Star Kidswear Toys",
      "Apex Kidswear Toys",
      "Royal Kidswear Toys",
      "Classic Kidswear Toys",
      "Precision Kidswear Toys",
      "Fine Kidswear Toys",
      "Elite Kidswear Toys",
      "Advanced Kidswear Toys",
      "Dynamic Kidswear Toys",
      "Supreme Kidswear Toys",
    ],
  },
  209: {
    name: "Industrial Valves, Actuators, and Flow Control Systems",
    companies: [
      "L and T Valves Division",
      "Dembla Valves India",
      "KSB Valves India",
      "Microfinish Valves",
      "Hawa Valves India",
      "DelVal Flow Control India",
      "Cair Euromatic Automation",
      "Arita Valves India",
      "Intervalve Poonawalla",
      "Spirax Sarco India",
      "Valves Manufacturing Division",
      "Flow Control Division",
      "Premier Valves Controls",
      "Universal Valves Controls",
      "Diamond Valves Controls",
      "Star Valves Controls",
      "Apex Valves Controls",
      "Royal Valves Controls",
      "Classic Valves Controls",
      "Precision Valves Controls",
      "Fine Valves Controls",
      "Elite Valves Controls",
      "Advanced Valves Controls",
      "Dynamic Valves Controls",
      "Supreme Valves Controls",
    ],
  },
  210: {
    name: "D2C Frozen Foods, Ready-to-Cook, and Heat-and-Eat",
    companies: [
      "Sumeru Frozen Foods",
      "Prasuma Frozen Momos",
      "ITC Master Chef Frozen",
      "Goeld Frozen Foods",
      "Buffet Frozen Foods",
      "Yummiez Frozen Foods",
      "McCain Foods India",
      "Venky's Frozen Foods",
      "Godrej Yummiez",
      "Safal Frozen Vegetables",
      "Frozen Food Division India",
      "Ready to Cook Division",
      "Premier Frozen Foods",
      "Universal Frozen Foods",
      "Diamond Frozen Foods",
      "Star Frozen Foods",
      "Al Kabeer Frozen Foods",
      "Royal Frozen Foods",
      "Classic Frozen Foods",
      "Precision Frozen Foods",
      "Fine Frozen Foods",
      "Elite Frozen Foods",
      "Advanced Frozen Foods",
      "Dynamic Frozen Foods",
      "Supreme Frozen Foods",
    ],
  },
  211: {
    name: "Commercial Aircraft MRO, Airport ground handling, and Aviation Support",
    companies: [
      "Air India MRO Division",
      "GMR Aviation MRO",
      "Indamer Aviation MRO",
      "Celebi Ground Handling",
      "AI Airport Services",
      "Bird Worldwide Flight",
      "GlobeGround India Ground",
      "TajAir Charter MRO",
      "Max Aerospace Aviation",
      "Air Works MRO India",
      "Aviation MRO Division",
      "Airport Ground Handling Division",
      "Premier Aviation MRO",
      "Universal Aviation MRO",
      "Diamond Aviation MRO",
      "Star Aviation MRO",
      "Apex Aviation MRO",
      "Royal Aviation MRO",
      "Classic Aviation MRO",
      "Precision Aviation MRO",
      "Fine Aviation MRO",
      "Elite Aviation MRO",
      "Advanced Aviation MRO",
      "Dynamic Aviation MRO",
      "Supreme Aviation MRO",
    ],
  },
  212: {
    name: "D2C Eyewear, Sunglasses, and Contact Lenses",
    companies: [
      "Lenskart Eyewear India",
      "John Jacobs Eyewear",
      "Specsmakers Eyewear",
      "Coolwinks Eyewear",
      "LensPlus Eyewear",
      "Fastrack Eyewear India",
      "Titan Eyeplus Eyewear",
      "GKB Lens India",
      "Lenskart Aqualens D2C",
      "Specsmakers Opticians",
      "Eyewear Manufacturing Division",
      "Lens Development Division",
      "Premier Eyewear Optical",
      "Universal Eyewear Optical",
      "Diamond Eyewear Optical",
      "Star Eyewear Optical",
      "Apex Eyewear Optical",
      "Royal Eyewear Optical",
      "Classic Eyewear Optical",
      "Precision Eyewear Optical",
      "Fine Eyewear Optical",
      "Elite Eyewear Optical",
      "Advanced Eyewear Optical",
      "Dynamic Eyewear Optical",
      "Supreme Eyewear Optical",
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
    headquarters: "Bengaluru, Karnataka, India",
    india_locations: ["Bengaluru", "Hyderabad", "Mumbai", "Pune"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.05,
    preferred_skills: ["Product Development", "Customer Experience", "Problem Solving", "Growth Engineering", "Operations"],
    eligibility: "Consistent academic performance, strong logical thinking, and interest in consumer product and scaling challenges.",
    student_perception: "Modern, direct-to-consumer digital brand offering high autonomy and ownership.",
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
