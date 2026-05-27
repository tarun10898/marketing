import { writeFileSync } from 'node:fs';

const roles = [
  {
    key: 'swe',
    role: 'Software Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Trainee', 'Associate', 'Senior Associate'],
    stepsProduct: [
      'Step 1 - OA with DSA and coding.',
      'Step 2 - Coding round with problem-solving depth.',
      'Step 3 - System design round with scalability discussion.',
      'Step 4 - Behavioral round on ownership and execution.',
    ],
    stepsService: [
      'Step 1 - Aptitude and basic coding round.',
      'Step 2 - Fundamentals and language basics round.',
      'Step 3 - Project or scenario discussion round.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'sdet',
    role: 'Software Engineer in Test (SDET/QA)',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Trainee', 'Associate', 'Senior Associate'],
    stepsProduct: [
      'Step 1 - Coding plus test-case design.',
      'Step 2 - Testing fundamentals and debugging round.',
      'Step 3 - Automation framework design with CI.',
      'Step 4 - Behavioral round on quality ownership.',
    ],
    stepsService: [
      'Step 1 - Basic testing and aptitude screen.',
      'Step 2 - Manual and basic automation concepts round.',
      'Step 3 - Scenario-based QA discussion.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'sre',
    role: 'Site Reliability Engineer (SRE)',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - Linux and networking screening.',
      'Step 2 - Reliability troubleshooting round.',
      'Step 3 - SLO/SLI and incident response design round.',
      'Step 4 - Behavioral on operations ownership.',
    ],
    stepsService: [
      'Step 1 - Basic operations and scripting screen.',
      'Step 2 - Monitoring and support workflow discussion.',
      'Step 3 - Incident handling basics round.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'devops',
    role: 'DevOps / Platform Reliability Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - CI/CD and cloud fundamentals round.',
      'Step 2 - IaC and orchestration round.',
      'Step 3 - Deployment architecture and rollback strategy round.',
      'Step 4 - Behavioral on release reliability.',
    ],
    stepsService: [
      'Step 1 - Basic CI/CD and tooling screen.',
      'Step 2 - Environment management round.',
      'Step 3 - Deployment operations scenario round.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'aiml',
    role: 'AI/ML Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - Coding plus ML fundamentals screen.',
      'Step 2 - Feature engineering and model evaluation round.',
      'Step 3 - ML system design and monitoring round.',
      'Step 4 - Project deep-dive round.',
    ],
    stepsService: [
      'Step 1 - Basic ML and coding screening.',
      'Step 2 - ML pipeline fundamentals round.',
      'Step 3 - Use-case implementation discussion.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'security',
    role: 'Security Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - Security fundamentals and secure coding screen.',
      'Step 2 - AppSec vulnerability analysis round.',
      'Step 3 - Threat-modeling and architecture controls round.',
      'Step 4 - Behavioral on incident response.',
    ],
    stepsService: [
      'Step 1 - Security basics screening.',
      'Step 2 - Vulnerability and control checklist round.',
      'Step 3 - Incident workflow scenario round.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'platform',
    role: 'Platform Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - API design and coding round.',
      'Step 2 - Platform architecture round.',
      'Step 3 - Reliability and observability round.',
      'Step 4 - Behavioral on platform ownership.',
    ],
    stepsService: [
      'Step 1 - Basic API and coding screen.',
      'Step 2 - Integration and platform operations round.',
      'Step 3 - Supportability and performance basics round.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'data',
    role: 'Data Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - SQL and coding round.',
      'Step 2 - Data modeling and warehouse design round.',
      'Step 3 - ETL/streaming architecture round.',
      'Step 4 - Behavioral on data quality ownership.',
    ],
    stepsService: [
      'Step 1 - SQL and basic coding screen.',
      'Step 2 - ETL fundamentals round.',
      'Step 3 - Data support and reporting scenario round.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'tpm',
    role: 'Technical Program Manager (TPM)',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - Program planning and dependency management round.',
      'Step 2 - Architecture literacy round.',
      'Step 3 - Risk and milestone execution round.',
      'Step 4 - Behavioral on influence and communication.',
    ],
    stepsService: [
      'Step 1 - Program coordination basics round.',
      'Step 2 - Delivery planning and reporting round.',
      'Step 3 - Stakeholder management scenario round.',
      'Step 4 - HR/behavioral fit round.',
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
    company_name: 'Flipkart',
    headquarters: 'Bengaluru, India',
    india_locations: ['Bengaluru', 'Hyderabad'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.2,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'Java', 'Python', 'SQL'],
    eligibility: 'Strong coding profile with product engineering fundamentals.',
    student_perception: 'Top Indian product company with good learning and growth trajectory.',
  },
  {
    company_name: 'Swiggy',
    headquarters: 'Bengaluru, India',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.14,
    preferred_skills: ['DSA', 'System Design', 'Backend Engineering', 'Java', 'Go', 'SQL'],
    eligibility: 'Strong problem solving and backend design fundamentals.',
    student_perception: 'Strong startup-product environment with rapid ownership opportunities.',
  },
  {
    company_name: 'Zomato',
    headquarters: 'Gurgaon, India',
    india_locations: ['Gurgaon', 'Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.12,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'Java', 'Python', 'Data Modeling'],
    eligibility: 'Strong coding and engineering fundamentals for consumer-scale systems.',
    student_perception: 'Fast-paced product culture with meaningful scale exposure.',
  },
  {
    company_name: 'Razorpay',
    headquarters: 'Bengaluru, India',
    india_locations: ['Bengaluru'],
    type: 'FinTech',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.18,
    preferred_skills: ['DSA', 'System Design', 'Payments Domain Basics', 'Java', 'Go', 'SQL'],
    eligibility: 'Strong coding baseline with payment-system reliability mindset.',
    student_perception: 'High-growth fintech with strong compensation and learning opportunities.',
  },
  {
    company_name: 'PhonePe',
    headquarters: 'Bengaluru, India',
    india_locations: ['Bengaluru', 'Pune'],
    type: 'FinTech',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.16,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'Java', 'Kotlin', 'SQL'],
    eligibility: 'Strong coding and reliability orientation for high-throughput systems.',
    student_perception: 'Top fintech product environment with strong engineering ownership.',
  },
  {
    company_name: 'Paytm',
    headquarters: 'Noida, India',
    india_locations: ['Noida', 'Bengaluru'],
    type: 'FinTech',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.02,
    preferred_skills: ['DSA', 'System Design', 'Java', 'Backend Engineering', 'SQL', 'Cloud Basics'],
    eligibility: 'Good coding and full-stack/backend fundamentals.',
    student_perception: 'Large fintech ecosystem with varied team quality and solid opportunities.',
  },
  {
    company_name: 'Zoho',
    headquarters: 'Chennai, India',
    india_locations: ['Chennai', 'Coimbatore', 'Tenkasi'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.0,
    preferred_skills: ['DSA', 'Java', 'C++', 'Problem Solving', 'System Design Fundamentals', 'SQL'],
    eligibility: 'Strong coding fundamentals and consistency in problem solving.',
    student_perception: 'Strong India product firm with practical engineering depth.',
  },
  {
    company_name: 'Freshworks',
    headquarters: 'San Mateo, California, USA',
    india_locations: ['Chennai', 'Bengaluru', 'Hyderabad'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.05,
    preferred_skills: ['DSA', 'System Design', 'JavaScript', 'Java', 'Cloud Basics', 'SQL'],
    eligibility: 'Good coding and product-engineering fundamentals with customer-facing mindset.',
    student_perception: 'Strong SaaS product company with decent growth tracks.',
  },
  {
    company_name: 'HCLTech',
    headquarters: 'Noida, India',
    india_locations: ['Pan-India'],
    type: 'Service',
    tier: 'Tier 3',
    category: 'service',
    multiplier: 0.66,
    preferred_skills: ['Programming Basics', 'Aptitude', 'SQL Basics', 'Communication'],
    eligibility: 'Broad intake with baseline coding and aptitude checks for fresher tracks.',
    student_perception: 'Fallback service route; progress depends on project quality and reskilling.',
  },
  {
    company_name: 'Tech Mahindra',
    headquarters: 'Pune, India',
    india_locations: ['Pan-India'],
    type: 'Service',
    tier: 'Tier 3',
    category: 'service',
    multiplier: 0.64,
    preferred_skills: ['Programming Basics', 'Aptitude', 'Fundamentals', 'Communication'],
    eligibility: 'Entry hiring with basic coding and aptitude rounds.',
    student_perception: 'Service fallback option where growth is strongly tied to skill upgrades.',
  },
];

function ctcRange(low, high) {
  return `INR ${low}-${high} LPA`;
}

function makeBreakdown(low, high, category) {
  const baseLow = Math.round(low * 0.72);
  const baseHigh = Math.round(high * 0.78);
  const variableLow = Math.max(1, Math.round(low * (category === 'product' ? 0.14 : 0.08)));
  const variableHigh = Math.max(variableLow + 1, Math.round(high * (category === 'product' ? 0.2 : 0.1)));
  const bonusLow = Math.max(1, Math.round(low * 0.03));
  const bonusHigh = Math.max(bonusLow + 1, Math.round(high * 0.06));

  return {
    base: ctcRange(baseLow, baseHigh),
    rsu_per_year:
      category === 'product'
        ? ctcRange(variableLow, variableHigh)
        : `${ctcRange(variableLow, variableHigh)} (variable mix)`,
    joining_bonus: ctcRange(bonusLow, bonusHigh),
  };
}

function roleLevel(role, company) {
  const anchor = roleBase[role.key] * company.multiplier;
  const low = Math.max(4, Math.round(anchor * 0.78));
  const high = Math.max(low + 4, Math.round(anchor * 1.28));

  const level = company.category === 'service' ? 'Trainee/Associate' : 'Entry';

  return {
    level,
    label: `${role.role} - ${level}`,
    experience: '0-2 years',
    ctc_range: ctcRange(low, high),
    breakdown: makeBreakdown(low, high, company.category),
    interview_process: {
      rounds: 4,
      steps: company.category === 'service' ? role.stepsService : role.stepsProduct,
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
      levels: company.category === 'service' ? r.levelsService : r.levelsProduct,
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

writeFileSync('data/companies/companies_batch_5.json', `${JSON.stringify(batch, null, 2)}\n`, 'utf8');
console.log('Created data/companies/companies_batch_5.json with', batch.length, 'companies');
