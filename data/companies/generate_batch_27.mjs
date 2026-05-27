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

const companies = [
  {
    company_name: "Cartesia India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.1,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Speech AI",
      "Cloud",
      "Python/Go",
    ],
    eligibility:
      "Strong coding and model-platform fundamentals for real-time speech and multimodal AI systems.",
    student_perception:
      "Applied AI product environment with strong backend and platform reliability exposure.",
  },
  {
    company_name: "Fal.ai India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.09,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Inference Infrastructure",
      "Cloud",
      "Python/Go",
    ],
    eligibility:
      "Strong coding and distributed systems fundamentals for low-latency generative AI inference platforms.",
    student_perception:
      "Infra-first AI product setup with practical backend and performance engineering scope.",
  },
  {
    company_name: "Tavus India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Video AI",
      "Cloud",
      "Python/Go",
    ],
    eligibility:
      "Strong coding and media-platform fundamentals for AI-generated video and avatar systems.",
    student_perception:
      "Creative AI engineering setup with practical backend and systems ownership opportunities.",
  },
  {
    company_name: "Runpod India",
    headquarters: "Mountain View, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.1,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "GPU Infrastructure",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and infrastructure-platform fundamentals for scalable AI compute and training workloads.",
    student_perception:
      "AI infrastructure-focused engineering environment with strong backend and platform reliability depth.",
  },
  {
    company_name: "Predibase India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.1,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Model Platform",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and AI-platform fundamentals for fine-tuning and serving production language models.",
    student_perception:
      "Model-platform engineering setup with practical backend and infrastructure exposure.",
  },
  {
    company_name: "Voyage AI India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Embedding Systems",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and model-platform fundamentals for embeddings and retrieval-optimized AI systems.",
    student_perception:
      "AI model infrastructure environment with strong backend and data-platform opportunities.",
  },
  {
    company_name: "Reka AI India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Multimodal Models",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and model-platform fundamentals for multimodal foundation model systems.",
    student_perception:
      "AI-first engineering setup with practical backend and platform design opportunities.",
  },
  {
    company_name: "Modular AI India",
    headquarters: "Palo Alto, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.1,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Compiler/Runtime Systems",
      "Cloud",
      "Python/TypeScript",
    ],
    eligibility:
      "Strong coding and systems fundamentals for AI compiler and runtime performance platforms.",
    student_perception:
      "High-performance AI systems environment with strong backend and platform engineering depth.",
  },
  {
    company_name: "Reflection AI India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Reasoning Models",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and model-platform fundamentals for advanced reasoning and agentic AI systems.",
    student_perception:
      "AI research-to-product engineering setup with practical backend and platform reliability work.",
  },
  {
    company_name: "Imbue India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "AI Agents",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and platform fundamentals for AI agent systems and automation workflows.",
    student_perception:
      "AI-native engineering environment with balanced backend and product systems ownership.",
  },
];

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

function buildCompany(company) {
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

const batch = companies.map(buildCompany);

writeFileSync(
  "data/companies/companies_batch_27.json",
  `${JSON.stringify(batch, null, 2)}\n`,
  "utf8",
);
console.log(
  "Created data/companies/companies_batch_27.json with",
  batch.length,
  "companies",
);
