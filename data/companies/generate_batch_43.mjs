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
    company_name: "Orca Security India",
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
      "AI Security",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and platform fundamentals for AI threat detection, model runtime protection, and secure ML workflows.",
    student_perception:
      "AI security product environment with practical backend and platform reliability ownership opportunities.",
  },
  {
    company_name: "Axonius India",
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
      "Data Security",
      "Cloud",
      "Python/TypeScript",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for knowledge-access governance and enterprise data security controls.",
    student_perception:
      "Data security platform with practical backend and performance engineering scope.",
  },
  {
    company_name: "JupiterOne India",
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
      "Model Security",
      "Cloud",
      "Python/Go",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for AI model risk assessment, policy enforcement, and runtime protections.",
    student_perception:
      "AI model security platform with practical backend and data-platform ownership opportunities.",
  },
  {
    company_name: "Obsidian Security India",
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
      "Data Governance",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and platform fundamentals for privacy automation, governance orchestration, and data trust tooling.",
    student_perception:
      "Data governance platform with balanced backend and platform reliability exposure.",
  },
  {
    company_name: "Censys India",
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
      "AI Security",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for AI workflow protection and adaptive security controls.",
    student_perception:
      "AI security product with strong backend and reliability engineering opportunities.",
  },
  {
    company_name: "CyCognito India",
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
      "ML Security Engineering",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and systems fundamentals for model security testing, detection engineering, and ML pipeline hardening.",
    student_perception:
      "ML security platform with practical backend and distributed systems ownership.",
  },
  {
    company_name: "Hunters Security India",
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
      "GenAI Security",
      "Cloud",
      "Python/TypeScript",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for GenAI access controls, content risk detection, and policy automation.",
    student_perception:
      "GenAI security platform with practical backend and platform design opportunities.",
  },
  {
    company_name: "XM Cyber India",
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
      "AppSec Analytics",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for application-security analytics and developer security workflows.",
    student_perception:
      "Application security product with practical backend and reliability exposure.",
  },
  {
    company_name: "Claroty India",
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
      "LLM Guardrails",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and platform fundamentals for LLM guardrails, prompt risk mitigation, and safe AI deployment systems.",
    student_perception:
      "AI guardrail platform with practical backend and systems reliability ownership.",
  },
  {
    company_name: "Nozomi Networks India",
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
      "AI Red Teaming",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for AI red teaming, adversarial testing, and model risk controls.",
    student_perception:
      "AI security testing platform with balanced backend and product systems ownership.",
  },
  {
    company_name: "Dragos India",
    headquarters: "Washington, District of Columbia, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "AI Governance",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and platform fundamentals for AI governance, policy workflows, and secure model operations.",
    student_perception:
      "AI governance platform with practical backend and reliability engineering opportunities.",
  },
  {
    company_name: "Forescout India",
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
      "Cloud Runtime Security",
      "Cloud",
      "Python/Go",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for cloud runtime threat detection and response systems.",
    student_perception:
      "Cloud runtime security platform with strong backend and operations-focused ownership.",
  },
  {
    company_name: "ReliaQuest India",
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
      "Static Analysis",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for static analysis rules, code scanning workflows, and secure SDLC tooling.",
    student_perception:
      "Code security platform with practical backend and distributed systems ownership.",
  },
  {
    company_name: "SecurityScorecard India",
    headquarters: "Tel Aviv, Israel",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Identity Security",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and platform fundamentals for identity telemetry, anomaly detection, and security workflow automation.",
    student_perception:
      "Identity security platform with practical backend and reliability ownership opportunities.",
  },
  {
    company_name: "BitSight India",
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
      "Application Risk Management",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for application risk intelligence and secure development lifecycle systems.",
    student_perception:
      "Application risk platform with practical backend and product systems ownership.",
  },
  {
    company_name: "Panorays India",
    headquarters: "Tel Aviv, Israel",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Security Automation",
      "Cloud",
      "Python/TypeScript",
    ],
    eligibility:
      "Strong coding and platform fundamentals for security workflow automation and control-plane integration systems.",
    student_perception:
      "Security automation platform with practical backend and integration-heavy engineering exposure.",
  },
  {
    company_name: "SafeBreach India",
    headquarters: "New York, New York, USA",
    india_locations: ["Bengaluru", "Hyderabad"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.07,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Pentest Automation",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for pentest workflow automation and vulnerability validation systems.",
    student_perception:
      "Offensive-security product setup with practical backend and platform reliability exposure.",
  },
  {
    company_name: "Avalor Security India",
    headquarters: "Tel Aviv, Israel",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Kubernetes Security",
      "Cloud",
      "Python/Go",
    ],
    eligibility:
      "Strong coding and cloud-security fundamentals for Kubernetes posture management and runtime workload protection.",
    student_perception:
      "Cloud-native security platform with practical backend and systems ownership opportunities.",
  },
  {
    company_name: "Silverfort India",
    headquarters: "San Francisco, California, USA",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.07,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "Vulnerability Management",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for vulnerability triage automation and remediation intelligence systems.",
    student_perception:
      "Vulnerability management platform with practical backend and reliability engineering opportunities.",
  },
  {
    company_name: "Talon Cyber Security India",
    headquarters: "Paris, France",
    india_locations: ["Bengaluru"],
    type: "Product",
    tier: "Tier 2",
    category: "product",
    multiplier: 1.08,
    preferred_skills: [
      "DSA",
      "System Design",
      "Backend Engineering",
      "AI Red Teaming",
      "Cloud",
      "Python",
    ],
    eligibility:
      "Strong coding and security-platform fundamentals for AI red-team automation and model safety validation systems.",
    student_perception:
      "AI red-teaming platform with practical backend and product systems ownership.",
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
  "data/companies/companies_batch_43.json",
  `${JSON.stringify(batch, null, 2)}\n`,
  "utf8",
);
console.log(
  "Created data/companies/companies_batch_43.json with",
  batch.length,
  "companies",
);
