import { writeFileSync } from 'node:fs';

const roles = [
  {
    key: 'swe',
    role: 'Software Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - OA with DSA and coding problem solving.',
      'Step 2 - Coding round on algorithms and implementation quality.',
      'Step 3 - System design round for reliability and scalability.',
      'Step 4 - Behavioral round on ownership and collaboration.'
    ],
    fintechSteps: [
      'Step 1 - OA with DSA and performance-aware coding.',
      'Step 2 - Coding round in Java or Python with correctness focus.',
      'Step 3 - System design for low-latency, high-throughput workflows.',
      'Step 4 - Behavioral round on controls, risk awareness, and delivery.'
    ]
  },
  {
    key: 'testing',
    role: 'Software Engineer in Test (SDET/QA)',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - Coding test with test-case design and debugging.',
      'Step 2 - Testing fundamentals: unit, integration, regression, performance.',
      'Step 3 - Automation framework design with CI quality gates.',
      'Step 4 - Behavioral round on release quality ownership.'
    ],
    fintechSteps: [
      'Step 1 - Coding plus defect analysis assessment.',
      'Step 2 - Testing round for transaction and reconciliation flows.',
      'Step 3 - API automation and CI controls design round.',
      'Step 4 - Behavioral round on defect prevention and audit readiness.'
    ]
  },
  {
    key: 'sre',
    role: 'Site Reliability Engineer (SRE)',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - Linux, networking, and scripting screen.',
      'Step 2 - Reliability debugging round with logs and metrics.',
      'Step 3 - SLO/SLI and incident response architecture round.',
      'Step 4 - Behavioral round on operational ownership.'
    ],
    fintechSteps: [
      'Step 1 - Linux and network troubleshooting screen.',
      'Step 2 - Automation scripting round for production operations.',
      'Step 3 - Reliability design for critical financial systems.',
      'Step 4 - Behavioral round on incident communication and controls.'
    ]
  },
  {
    key: 'devops',
    role: 'DevOps / Platform Reliability Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - CI/CD, container, and cloud fundamentals screen.',
      'Step 2 - IaC and orchestration round with rollback strategy.',
      'Step 3 - Pipeline architecture with observability and security gates.',
      'Step 4 - Behavioral round on release reliability and automation.'
    ],
    fintechSteps: [
      'Step 1 - CI/CD and environment control fundamentals.',
      'Step 2 - IaC and platform operations round with compliance checkpoints.',
      'Step 3 - Deployment architecture for resilience and auditability.',
      'Step 4 - Behavioral round on change governance.'
    ]
  },
  {
    key: 'aiml',
    role: 'AI/ML Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - Coding plus ML fundamentals screen.',
      'Step 2 - Feature engineering and model evaluation round.',
      'Step 3 - ML pipeline and serving architecture round.',
      'Step 4 - Behavioral round on experimentation and impact.'
    ],
    fintechSteps: [
      'Step 1 - Coding plus ML fundamentals for risk/fraud data.',
      'Step 2 - Model governance, explainability, and metric round.',
      'Step 3 - ML pipeline design with monitoring and controls.',
      'Step 4 - Behavioral round on model risk communication.'
    ]
  },
  {
    key: 'security',
    role: 'Security Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - Security fundamentals and secure coding screen.',
      'Step 2 - AppSec and infrastructure security round.',
      'Step 3 - Threat modeling and architecture controls round.',
      'Step 4 - Behavioral round on incident response and remediation.'
    ],
    fintechSteps: [
      'Step 1 - Security fundamentals and control awareness screen.',
      'Step 2 - Vulnerability triage and secure coding round.',
      'Step 3 - Threat modeling for regulated data environments.',
      'Step 4 - Behavioral round on security governance and response.'
    ]
  },
  {
    key: 'platform',
    role: 'Platform Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - API design and coding fundamentals round.',
      'Step 2 - Platform architecture and abstraction round.',
      'Step 3 - Reliability, performance, and observability round.',
      'Step 4 - Behavioral round on developer experience ownership.'
    ],
    fintechSteps: [
      'Step 1 - API and integration coding round.',
      'Step 2 - Secure platform architecture round.',
      'Step 3 - Performance and reliability round for critical flows.',
      'Step 4 - Behavioral round on cross-team execution.'
    ]
  },
  {
    key: 'data',
    role: 'Data Engineer',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - SQL and coding round.',
      'Step 2 - Data modeling and warehouse design round.',
      'Step 3 - ETL/ELT plus streaming architecture round.',
      'Step 4 - Behavioral round on data quality and lineage.'
    ],
    fintechSteps: [
      'Step 1 - SQL and coding for transactional datasets.',
      'Step 2 - Data modeling with reconciliation controls.',
      'Step 3 - Reporting and pipeline reliability architecture.',
      'Step 4 - Behavioral round on governance and reporting quality.'
    ]
  },
  {
    key: 'tpm',
    role: 'Technical Program Manager (TPM)',
    levelsProduct: ['Entry', 'Mid', 'Senior'],
    levelsFintech: ['Analyst', 'Associate', 'VP'],
    productSteps: [
      'Step 1 - Program planning and dependency management round.',
      'Step 2 - Technical depth and architecture literacy round.',
      'Step 3 - Risk planning and milestone execution round.',
      'Step 4 - Behavioral round on influence and communication.'
    ],
    fintechSteps: [
      'Step 1 - Program governance and planning round.',
      'Step 2 - Architecture literacy plus control awareness round.',
      'Step 3 - Delivery risk and escalation management round.',
      'Step 4 - Behavioral round on stakeholder alignment.'
    ]
  }
];

const roleBase = {
  swe: 34,
  testing: 28,
  sre: 31,
  devops: 30,
  aiml: 37,
  security: 33,
  platform: 33,
  data: 31,
  tpm: 29
};

const companies = [
  {
    company_name: 'Jane Street',
    headquarters: 'New York, USA',
    india_locations: ['Hong Kong (APAC hiring)', 'Remote APAC'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 2.1,
    preferred_skills: ['C++', 'Python', 'Math and Probability', 'Low-Latency Systems', 'DSA', 'Linux'],
    eligibility: 'Very high bar in problem solving, systems, and quantitative reasoning.',
    student_perception: 'Elite quant employer with exceptional compensation and highly selective hiring.'
  },
  {
    company_name: 'Tower Research Capital',
    headquarters: 'New York, USA',
    india_locations: ['Gurgaon', 'Bengaluru'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 1.9,
    preferred_skills: ['C++', 'Python', 'Distributed Systems', 'DSA', 'Linux', 'Latency Optimization'],
    eligibility: 'Strong systems depth and coding speed; ownership in performance-critical environments.',
    student_perception: 'Top HFT brand with very strong compensation and deep low-latency engineering work.'
  },
  {
    company_name: 'Graviton Research Capital',
    headquarters: 'Gurgaon, India',
    india_locations: ['Gurgaon'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 1.75,
    preferred_skills: ['C++', 'Python', 'Statistics', 'DSA', 'Systems Design', 'Optimization'],
    eligibility: 'Strong coding fundamentals and data-driven problem solving in trading contexts.',
    student_perception: 'High-paying India quant firm with strong engineering and research culture.'
  },
  {
    company_name: 'IMC Trading',
    headquarters: 'Amsterdam, Netherlands',
    india_locations: ['Mumbai'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 1.7,
    preferred_skills: ['Python', 'C++', 'DSA', 'Probability', 'System Design', 'Linux'],
    eligibility: 'Strong coding and quantitative aptitude with ability to operate in fast feedback loops.',
    student_perception: 'Strong quant employer with high standards and attractive total compensation.'
  },
  {
    company_name: 'Optiver',
    headquarters: 'Amsterdam, Netherlands',
    india_locations: ['Mumbai'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 1.68,
    preferred_skills: ['C++', 'Python', 'Math', 'Low-Latency Design', 'DSA', 'Concurrency'],
    eligibility: 'Excellent coding and quantitative reasoning; preference for high-performance systems work.',
    student_perception: 'Global quant firm with high pay and demanding engineering bar.'
  },
  {
    company_name: 'Atlassian',
    headquarters: 'Sydney, Australia',
    india_locations: ['Bengaluru'],
    type: 'Product',
    tier: 'Tier 1',
    sector: 'product',
    multiplier: 1.22,
    preferred_skills: ['Java', 'Kotlin', 'React', 'Distributed Systems', 'DSA', 'System Design'],
    eligibility: 'Strong coding and design fundamentals with product quality mindset.',
    student_perception: 'Highly respected product company with strong engineering culture in India.'
  },
  {
    company_name: 'Adobe',
    headquarters: 'San Jose, California, USA',
    india_locations: ['Noida', 'Bengaluru'],
    type: 'Product',
    tier: 'Tier 1',
    sector: 'product',
    multiplier: 1.18,
    preferred_skills: ['C++', 'Java', 'Python', 'DSA', 'System Design', 'Performance Engineering'],
    eligibility: 'Good coding depth with strong problem solving and product engineering fundamentals.',
    student_perception: 'Top product brand with strong compensation and mature engineering workflows.'
  },
  {
    company_name: 'Salesforce',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Hyderabad', 'Bengaluru'],
    type: 'Product',
    tier: 'Tier 1',
    sector: 'product',
    multiplier: 1.2,
    preferred_skills: ['Java', 'Apex', 'Cloud Platform Design', 'DSA', 'System Design', 'SQL'],
    eligibility: 'Strong software engineering baseline and cloud platform understanding.',
    student_perception: 'Leading SaaS company with stable growth and high-quality engineering roles.'
  },
  {
    company_name: 'Uber',
    headquarters: 'San Francisco, California, USA',
    india_locations: ['Bengaluru', 'Hyderabad'],
    type: 'Product',
    tier: 'Tier 1',
    sector: 'product',
    multiplier: 1.28,
    preferred_skills: ['Java', 'Go', 'Python', 'Distributed Systems', 'DSA', 'System Design'],
    eligibility: 'Strong coding and distributed systems fundamentals with production ownership mindset.',
    student_perception: 'Strong product engineering brand with competitive compensation and fast-paced teams.'
  },
  {
    company_name: 'ServiceNow',
    headquarters: 'Santa Clara, California, USA',
    india_locations: ['Hyderabad', 'Bengaluru'],
    type: 'Product',
    tier: 'Tier 2',
    sector: 'product',
    multiplier: 1.06,
    preferred_skills: ['Java', 'JavaScript', 'Platform Engineering', 'DSA', 'System Design', 'Automation'],
    eligibility: 'Solid engineering fundamentals and ability to ship reliable enterprise features.',
    student_perception: 'Strong enterprise product employer with stable growth and good role diversity.'
  }
];

function range(low, high) {
  return `INR ${low}-${high} LPA`;
}

function comp(low, high, sector) {
  const baseLow = Math.round(low * 0.62);
  const baseHigh = Math.round(high * 0.7);
  const varLow = Math.max(2, Math.round(low * (sector === 'product' ? 0.18 : 0.12)));
  const varHigh = Math.max(varLow + 1, Math.round(high * (sector === 'product' ? 0.24 : 0.16)));
  const bonusLow = Math.max(1, Math.round(low * 0.05));
  const bonusHigh = Math.max(bonusLow + 1, Math.round(high * 0.1));
  return {
    base: range(baseLow, baseHigh),
    rsu_per_year: sector === 'product' ? range(varLow, varHigh) : `${range(varLow, varHigh)} (variable/equity mix)`,
    joining_bonus: range(bonusLow, bonusHigh)
  };
}

function makeLevel(role, company) {
  const anchor = roleBase[role.key] * company.multiplier;
  const low = Math.max(14, Math.round(anchor * 0.82));
  const high = Math.max(low + 8, Math.round(anchor * 1.38));
  const isFintech = company.sector === 'fintech';
  const level = isFintech ? 'Analyst' : 'Entry';

  return {
    level,
    label: `${role.role} - ${level}`,
    experience: '0-2 years',
    ctc_range: range(low, high),
    breakdown: comp(low, high, company.sector),
    interview_process: {
      rounds: 4,
      steps: isFintech ? role.fintechSteps : role.productSteps
    }
  };
}

function buildCompany(c) {
  const isFintech = c.sector === 'fintech';

  return {
    company_name: c.company_name,
    headquarters: c.headquarters,
    india_locations: c.india_locations,
    titles: roles.map((r) => ({
      role: r.role,
      levels: isFintech ? r.levelsFintech : r.levelsProduct
    })),
    type: c.type,
    tier: c.tier,
    common_tech_roles: roles.map((r) => r.role),
    hiring_active: true,
    preferred_skills: c.preferred_skills,
    eligibility: c.eligibility,
    student_perception: c.student_perception,
    roles: roles.map((r) => ({
      title: r.role,
      levels: [makeLevel(r, c)]
    })),
    notes: `${c.company_name} batch entry includes full 9-team tech coverage; refine with role-specific advanced levels in later batches.`
  };
}

const batch3 = companies.map(buildCompany);

writeFileSync('data/companies/companies_batch_3.json', `${JSON.stringify(batch3, null, 2)}\n`, 'utf8');

console.log('Created data/companies/companies_batch_3.json with', batch3.length, 'companies');
