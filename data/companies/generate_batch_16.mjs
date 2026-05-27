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
    company_name: 'HubSpot India',
    headquarters: 'Cambridge, Massachusetts, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.12,
    preferred_skills: ['DSA', 'System Design', 'Backend Engineering', 'SaaS Platforms', 'Cloud', 'Java/TypeScript'],
    eligibility: 'Strong coding and product-platform fundamentals for customer and growth-focused SaaS systems.',
    student_perception: 'Mature SaaS engineering culture with strong backend and platform ownership opportunities.',
  },
  {
    company_name: 'Twilio India',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.14,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'APIs', 'Cloud', 'Java/Go'],
    eligibility: 'Strong coding and reliability fundamentals for high-scale communication APIs and platform systems.',
    student_perception: 'Strong API-first product company with robust backend and distributed systems scope.',
  },
  {
    company_name: 'Outreach India',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.06,
    preferred_skills: ['DSA', 'System Design', 'Backend Engineering', 'Cloud', 'Java', 'SQL'],
    eligibility: 'Strong coding and SaaS backend fundamentals for workflow and automation product engineering.',
    student_perception: 'Good B2B SaaS engineering environment with practical ownership and growth potential.',
  },
  {
    company_name: 'Braze India',
    headquarters: 'New York, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.08,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'Data Pipelines', 'Cloud', 'Java'],
    eligibility: 'Strong coding and messaging-platform fundamentals for customer engagement infrastructure.',
    student_perception: 'Modern customer-engagement platform with strong backend systems engineering scope.',
  },
  {
    company_name: 'Klaviyo India',
    headquarters: 'Boston, Massachusetts, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.06,
    preferred_skills: ['DSA', 'System Design', 'Backend Engineering', 'Data Platforms', 'Cloud', 'Python/Java'],
    eligibility: 'Strong coding and data-centric product engineering fundamentals for marketing automation systems.',
    student_perception: 'Strong growth-SaaS platform with practical backend and product engineering opportunities.',
  },
  {
    company_name: 'Contentful India',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.08,
    preferred_skills: ['DSA', 'System Design', 'API Design', 'Cloud', 'TypeScript', 'Distributed Systems'],
    eligibility: 'Strong backend and API-platform fundamentals for headless CMS and content infrastructure products.',
    student_perception: 'Developer-focused content platform with practical API and backend engineering depth.',
  },
  {
    company_name: 'Intercom India',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.08,
    preferred_skills: ['DSA', 'System Design', 'Backend Engineering', 'Cloud', 'Java', 'Data Modeling'],
    eligibility: 'Strong coding and product-platform fundamentals for customer messaging and support systems.',
    student_perception: 'Strong product company with balanced backend and customer-facing engineering scope.',
  },
  {
    company_name: 'Segment India',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.1,
    preferred_skills: ['DSA', 'System Design', 'Data Pipelines', 'Distributed Systems', 'Cloud', 'Go'],
    eligibility: 'Strong backend and data-platform fundamentals for customer data infrastructure products.',
    student_perception: 'Strong data infrastructure product with practical distributed systems exposure.',
  },
  {
    company_name: 'Algolia India',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.1,
    preferred_skills: ['DSA', 'System Design', 'Search Systems', 'Distributed Systems', 'Cloud', 'Java'],
    eligibility: 'Strong coding and search-platform fundamentals for high-performance developer-facing APIs.',
    student_perception: 'Strong search-infrastructure company with deep backend and performance engineering work.',
  },
  {
    company_name: 'SendGrid India',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    category: 'product',
    multiplier: 1.08,
    preferred_skills: ['DSA', 'System Design', 'Distributed Systems', 'Email Infrastructure', 'Cloud', 'Go'],
    eligibility: 'Strong backend and reliability engineering fundamentals for communication infrastructure products.',
    student_perception: 'Reliable messaging infrastructure company with strong production-scale backend exposure.',
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

writeFileSync('data/companies/companies_batch_16.json', `${JSON.stringify(batch, null, 2)}\n`, 'utf8');
console.log('Created data/companies/companies_batch_16.json with', batch.length, 'companies');
