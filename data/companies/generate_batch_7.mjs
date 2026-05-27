import { writeFileSync } from 'node:fs';

const roles = [
  {
    key: 'swe',
    role: 'Software Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Trainee', 'Associate', 'Senior Associate'],
    stepsProduct: [
      'Step 1 - OA with DSA and coding.',
      'Step 2 - Coding round with algorithmic depth.',
      'Step 3 - System design round for scalability and reliability.',
      'Step 4 - Behavioral round on ownership and collaboration.',
    ],
    stepsService: [
      'Step 1 - Aptitude and basic coding round.',
      'Step 2 - Fundamentals and language basics round.',
      'Step 3 - Scenario or project discussion round.',
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
      'Step 3 - Automation framework and CI quality-gate round.',
      'Step 4 - Behavioral round on quality ownership.',
    ],
    stepsService: [
      'Step 1 - Basic testing and aptitude screen.',
      'Step 2 - Manual testing and basic automation concepts.',
      'Step 3 - QA scenario round.',
      'Step 4 - HR/behavioral fit round.',
    ],
  },
  {
    key: 'sre',
    role: 'Site Reliability Engineer (SRE)',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsService: ['Associate', 'Senior Associate', 'Lead'],
    stepsProduct: [
      'Step 1 - Linux and networking fundamentals round.',
      'Step 2 - Reliability troubleshooting round.',
      'Step 3 - SLO/SLI and incident response design round.',
      'Step 4 - Behavioral round on operational ownership.',
    ],
    stepsService: [
      'Step 1 - Basic operations and scripting screen.',
      'Step 2 - Monitoring and support workflow round.',
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
      'Step 2 - Environment management and deployment basics round.',
      'Step 3 - Supportability and release operations scenario round.',
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
      'Step 3 - ML pipeline design and monitoring round.',
      'Step 4 - Project deep-dive and behavioral round.',
    ],
    stepsService: [
      'Step 1 - Basic ML and coding screening.',
      'Step 2 - ML pipeline fundamentals round.',
      'Step 3 - Use-case implementation discussion round.',
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
      'Step 4 - Behavioral on incident response and governance.',
    ],
    stepsService: [
      'Step 1 - Security basics screening.',
      'Step 2 - Vulnerability checklist and controls round.',
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
      'Step 3 - Reliability and observability design round.',
      'Step 4 - Behavioral on platform ownership.',
    ],
    stepsService: [
      'Step 1 - Basic API and coding screen.',
      'Step 2 - Integration and platform operations round.',
      'Step 3 - Performance/supportability basics round.',
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
      'Step 4 - Behavioral on data quality and ownership.',
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
      'Step 4 - Behavioral on communication and influence.',
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
    company_name: 'IBM India Software Labs',
    headquarters: 'Bengaluru, India',
    india_locations: ['Bengaluru', 'Pune', 'Hyderabad'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.02,
    preferred_skills: ['DSA', 'System Design', 'Java', 'Cloud', 'Distributed Systems', 'SQL'],
    eligibility: 'Strong coding fundamentals and enterprise product engineering aptitude.',
    student_perception: 'Stable global engineering brand with decent growth and platform exposure.',
  },
  {
    company_name: 'Dell Technologies',
    headquarters: 'Round Rock, Texas, USA',
    india_locations: ['Bengaluru', 'Hyderabad', 'Chennai'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.04,
    preferred_skills: ['DSA', 'System Design', 'C++', 'Java', 'Cloud', 'Linux'],
    eligibility: 'Strong fundamentals in systems and scalable software design.',
    student_perception: 'Strong product-plus-infra engineering profile with stable learning curve.',
  },
  {
    company_name: 'Nutanix',
    headquarters: 'San Jose, California, USA',
    india_locations: ['Bengaluru', 'Pune'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.18,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'C++', 'Python', 'Linux'],
    eligibility: 'Strong systems-level coding and distributed architecture fundamentals.',
    student_perception: 'Strong infra-product engineering company with high technical depth.',
  },
  {
    company_name: 'InMobi',
    headquarters: 'Bengaluru, India',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.1,
    preferred_skills: ['DSA', 'System Design', 'Java', 'Data Engineering', 'Distributed Systems', 'SQL'],
    eligibility: 'Strong coding with data and platform engineering fundamentals.',
    student_perception: 'Respected ad-tech product company with ownership-driven engineering roles.',
  },
  {
    company_name: 'BrowserStack',
    headquarters: 'Dublin, Ireland',
    india_locations: ['Mumbai', 'Remote India'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.08,
    preferred_skills: ['DSA', 'System Design', 'Testing Infrastructure', 'JavaScript', 'Java', 'Cloud'],
    eligibility: 'Strong coding fundamentals and quality/platform engineering orientation.',
    student_perception: 'Good product engineering environment with strong testing-platform exposure.',
  },
  {
    company_name: 'Postman',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.12,
    preferred_skills: ['DSA', 'System Design', 'API Platforms', 'JavaScript', 'Node.js', 'Cloud'],
    eligibility: 'Strong coding and API/platform fundamentals for product engineering roles.',
    student_perception: 'Popular developer-tooling company with meaningful product ownership paths.',
  },
  {
    company_name: 'Gojek India',
    headquarters: 'Jakarta, Indonesia',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.1,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'Java', 'Go', 'SQL'],
    eligibility: 'Strong backend and distributed-system fundamentals with ownership mindset.',
    student_perception: 'Strong mobility-tech engineering culture with high ownership and impact.',
  },
  {
    company_name: 'CitiusTech',
    headquarters: 'Princeton, New Jersey, USA',
    india_locations: ['Mumbai', 'Pune', 'Bengaluru'],
    type: 'Service',
    tier: 'Tier 3',
    category: 'service',
    multiplier: 0.72,
    preferred_skills: ['Programming Basics', 'Aptitude', 'Healthcare Domain Basics', 'SQL', 'Communication'],
    eligibility: 'Fresher pipeline with coding fundamentals and aptitude evaluation.',
    student_perception: 'Generally a fallback route; trajectory depends on project quality and upskilling.',
  },
  {
    company_name: 'Birlasoft',
    headquarters: 'Pune, India',
    india_locations: ['Pan-India'],
    type: 'Service',
    tier: 'Tier 3',
    category: 'service',
    multiplier: 0.64,
    preferred_skills: ['Programming Basics', 'Aptitude', 'Fundamentals', 'Communication'],
    eligibility: 'Entry-level service hiring with basic coding and aptitude checks.',
    student_perception: 'Fallback option where long-term growth depends on continuous reskilling.',
  },
  {
    company_name: 'Hexaware',
    headquarters: 'Mumbai, India',
    india_locations: ['Pan-India'],
    type: 'Service',
    tier: 'Tier 3',
    category: 'service',
    multiplier: 0.63,
    preferred_skills: ['Programming Basics', 'Aptitude', 'Fundamentals', 'Communication'],
    eligibility: 'Mass hiring model with baseline coding and aptitude rounds.',
    student_perception: 'Fallback path where strong upskilling is needed for Tier 1/2 transitions.',
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

writeFileSync('data/companies/companies_batch_7.json', `${JSON.stringify(batch, null, 2)}\n`, 'utf8');
console.log('Created data/companies/companies_batch_7.json with', batch.length, 'companies');
