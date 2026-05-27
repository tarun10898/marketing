import { writeFileSync } from 'node:fs';

const roles = [
  {
    key: 'swe',
    role: 'Software Engineer',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - OA with DSA and coding problem solving.',
        'Step 2 - Technical coding round on algorithms and edge cases.',
        'Step 3 - System design round for scale, reliability, and trade-offs.',
        'Step 4 - Behavioral round on ownership, delivery, and collaboration.'
      ],
      fintech: [
        'Step 1 - OA with DSA plus one transaction-processing style problem.',
        'Step 2 - Coding round in Java or Python with correctness and performance focus.',
        'Step 3 - System design for low-latency or high-throughput financial workflows.',
        'Step 4 - Behavioral round on risk, controls, and cross-team execution.'
      ]
    }
  },
  {
    key: 'sdet',
    role: 'Software Engineer in Test (SDET/QA)',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - Coding test with test-case design and debugging.',
        'Step 2 - Testing fundamentals: unit, integration, regression, and performance.',
        'Step 3 - Automation framework design using Selenium or Playwright with CI.',
        'Step 4 - Behavioral round on quality ownership and release discipline.'
      ],
      fintech: [
        'Step 1 - Coding plus defect-analysis assessment.',
        'Step 2 - Functional and non-functional testing for transaction systems.',
        'Step 3 - API and automation design with CI quality gates and auditability.',
        'Step 4 - Behavioral round on defect prevention and production quality controls.'
      ]
    }
  },
  {
    key: 'sre',
    role: 'Site Reliability Engineer (SRE)',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - Linux, networking, and scripting screening.',
        'Step 2 - Reliability debugging round with logs, metrics, and alerts.',
        'Step 3 - Design round with SLO, SLI, incident response, and failover.',
        'Step 4 - Behavioral round on on-call ownership and postmortem rigor.'
      ],
      fintech: [
        'Step 1 - Linux and network troubleshooting with service restoration focus.',
        'Step 2 - Scripting and automation for runbook-driven operations.',
        'Step 3 - Reliability design for regulated, high-availability transaction systems.',
        'Step 4 - Behavioral round on incident communication and control procedures.'
      ]
    }
  },
  {
    key: 'devops',
    role: 'DevOps / Platform Reliability Engineer',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - CI/CD, container, and cloud fundamentals screen.',
        'Step 2 - IaC and Kubernetes round with deployment and rollback strategy.',
        'Step 3 - Pipeline architecture design with security and observability gates.',
        'Step 4 - Behavioral round on automation and release reliability.'
      ],
      fintech: [
        'Step 1 - CI/CD and environment-management fundamentals for controlled releases.',
        'Step 2 - IaC and platform operations round with compliance checkpoints.',
        'Step 3 - Deployment design for resilience, rollback, and audit trails.',
        'Step 4 - Behavioral round on change management and production governance.'
      ]
    }
  },
  {
    key: 'aiml',
    role: 'AI/ML Engineer',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - Coding plus ML fundamentals (statistics, metrics, model selection).',
        'Step 2 - Feature engineering and model-evaluation round.',
        'Step 3 - ML system design with serving, monitoring, and drift controls.',
        'Step 4 - Project deep-dive and experimentation behavioral round.'
      ],
      fintech: [
        'Step 1 - Coding plus ML fundamentals for risk/fraud style datasets.',
        'Step 2 - Feature engineering, imbalance handling, and model governance.',
        'Step 3 - ML pipeline design with explainability and monitoring requirements.',
        'Step 4 - Behavioral round on model risk and stakeholder communication.'
      ]
    }
  },
  {
    key: 'security',
    role: 'Security Engineer',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - Security fundamentals and secure coding screen.',
        'Step 2 - AppSec and infra security round with vulnerability analysis.',
        'Step 3 - Threat-modeling architecture round.',
        'Step 4 - Behavioral round on incident response and risk reduction.'
      ],
      fintech: [
        'Step 1 - Security fundamentals with regulatory and control awareness.',
        'Step 2 - Secure coding and vulnerability triage round.',
        'Step 3 - Threat-modeling design with data-protection requirements.',
        'Step 4 - Behavioral round on incident handling and audit readiness.'
      ]
    }
  },
  {
    key: 'platform',
    role: 'Platform Engineer',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - API design and coding fundamentals round.',
        'Step 2 - Platform abstraction and service architecture round.',
        'Step 3 - Reliability, performance, and observability design round.',
        'Step 4 - Behavioral round on developer-experience and stakeholder alignment.'
      ],
      fintech: [
        'Step 1 - API and integration coding round.',
        'Step 2 - Platform architecture for secure internal services.',
        'Step 3 - Performance and reliability design for critical workflows.',
        'Step 4 - Behavioral round on cross-team delivery and governance.'
      ]
    }
  },
  {
    key: 'data',
    role: 'Data Engineer',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - SQL and coding screen with data transformations.',
        'Step 2 - Data modeling and warehouse design round.',
        'Step 3 - ETL/ELT plus streaming pipeline architecture round.',
        'Step 4 - Behavioral round on data quality, lineage, and governance.'
      ],
      fintech: [
        'Step 1 - SQL and coding round for transactional datasets.',
        'Step 2 - Data modeling with reconciliation and control requirements.',
        'Step 3 - Pipeline design for reporting, risk, and near-real-time analytics.',
        'Step 4 - Behavioral round on data quality controls and regulatory reporting.'
      ]
    }
  },
  {
    key: 'tpm',
    role: 'Technical Program Manager (TPM)',
    levelsEng: ['Entry', 'Mid', 'Senior'],
    levelsBank: ['Analyst', 'Associate', 'VP'],
    steps: {
      product: [
        'Step 1 - Program-planning and dependency-management round.',
        'Step 2 - Technical depth round on architecture and system constraints.',
        'Step 3 - Delivery risk and execution planning round.',
        'Step 4 - Behavioral round on influence, communication, and ownership.'
      ],
      fintech: [
        'Step 1 - Program governance and delivery planning round.',
        'Step 2 - Technical architecture and controls literacy round.',
        'Step 3 - Risk, milestone, and escalation management round.',
        'Step 4 - Behavioral round on stakeholder alignment and execution discipline.'
      ]
    }
  }
];

const roleBase = {
  swe: 34,
  sdet: 28,
  sre: 32,
  devops: 30,
  aiml: 38,
  security: 33,
  platform: 34,
  data: 31,
  tpm: 30
};

const companies = [
  {
    company_name: 'NVIDIA',
    headquarters: 'Santa Clara, California, USA',
    india_locations: ['Bengaluru', 'Pune', 'Hyderabad'],
    type: 'Product',
    tier: 'Tier 1',
    sector: 'product',
    multiplier: 1.45,
    preferred_skills: ['C++', 'CUDA basics', 'DSA', 'System Design', 'Python', 'Performance Profiling'],
    eligibility: 'Strong systems and coding fundamentals with project depth in performance-oriented engineering.',
    student_perception: 'Top hardware-software product company with strong compensation and deep engineering work.'
  },
  {
    company_name: 'Netflix',
    headquarters: 'Los Gatos, California, USA',
    india_locations: ['Mumbai', 'Bengaluru'],
    type: 'Product',
    tier: 'Tier 1',
    sector: 'product',
    multiplier: 2.2,
    preferred_skills: ['Distributed Systems', 'Java', 'Kotlin', 'Python', 'Cloud-Native Design', 'Observability'],
    eligibility: 'High ownership profile and strong system design; mostly lateral hiring with proven production impact.',
    student_perception: 'Very high pay benchmark and high ownership culture with rigorous engineering standards.'
  },
  {
    company_name: 'Goldman Sachs',
    headquarters: 'New York, USA',
    india_locations: ['Bengaluru', 'Hyderabad'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 1.1,
    preferred_skills: ['Java', 'Python', 'DSA', 'System Design', 'SQL', 'Low-Latency Design'],
    eligibility: 'Strong coding and analytical skills with good understanding of financial systems and controls.',
    student_perception: 'Top finance-tech brand in India with strong engineering teams and structured growth.'
  },
  {
    company_name: 'JPMorgan Chase',
    headquarters: 'New York, USA',
    india_locations: ['Bengaluru', 'Hyderabad', 'Mumbai'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 1.0,
    preferred_skills: ['Java', 'Spring Boot', 'Python', 'SQL', 'Microservices', 'Cloud'],
    eligibility: 'Good coding baseline plus enterprise engineering fundamentals and strong delivery discipline.',
    student_perception: 'Large-scale hiring and strong engineering ecosystem with solid long-term career paths.'
  },
  {
    company_name: 'Morgan Stanley',
    headquarters: 'New York, USA',
    india_locations: ['Mumbai', 'Bengaluru'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 1.02,
    preferred_skills: ['Java', 'Python', 'DSA', 'System Design', 'SQL', 'Distributed Systems'],
    eligibility: 'Strong coding and fundamentals with reliability mindset for critical market workflows.',
    student_perception: 'Strong finance-tech brand with high-quality engineering work and competitive pay.'
  },
  {
    company_name: 'Deutsche Bank',
    headquarters: 'Frankfurt, Germany',
    india_locations: ['Pune', 'Bengaluru', 'Mumbai'],
    type: 'FinTech',
    tier: 'Tier 1',
    sector: 'fintech',
    multiplier: 0.92,
    preferred_skills: ['Java', 'Python', 'SQL', 'Cloud', 'Data Engineering', 'Risk Systems'],
    eligibility: 'Consistent coding skills and strong understanding of enterprise software and data controls.',
    student_perception: 'Well-established finance engineering hub with good role diversity in India.'
  },
  {
    company_name: 'HSBC',
    headquarters: 'London, UK',
    india_locations: ['Pune', 'Hyderabad', 'Bengaluru'],
    type: 'FinTech',
    tier: 'Tier 2',
    sector: 'fintech',
    multiplier: 0.82,
    preferred_skills: ['Java', 'Python', 'SQL', 'Cloud Fundamentals', 'Testing', 'Security Controls'],
    eligibility: 'Solid coding ability and delivery focus with compliance-aware engineering practices.',
    student_perception: 'Stable global bank engineering setup with broad opportunities and balanced work profile.'
  },
  {
    company_name: 'Barclays',
    headquarters: 'London, UK',
    india_locations: ['Pune', 'Chennai', 'Noida'],
    type: 'FinTech',
    tier: 'Tier 2',
    sector: 'fintech',
    multiplier: 0.88,
    preferred_skills: ['Java', 'Python', 'SQL', 'DevOps', 'Automation Testing', 'Data Engineering'],
    eligibility: 'Strong foundational coding, SDLC understanding, and clear communication across teams.',
    student_perception: 'Strong UK bank technology presence in India with consistent hiring and growth tracks.'
  },
  {
    company_name: 'Bank of America',
    headquarters: 'Charlotte, North Carolina, USA',
    india_locations: ['Hyderabad', 'Mumbai', 'Chennai'],
    type: 'FinTech',
    tier: 'Tier 2',
    sector: 'fintech',
    multiplier: 0.85,
    preferred_skills: ['Java', 'Python', 'SQL', 'Microservices', 'Cloud Ops', 'Security Basics'],
    eligibility: 'Good coding profile and software engineering fundamentals with strong execution discipline.',
    student_perception: 'Large global banking technology organization with stable India engineering hiring.'
  },
  {
    company_name: 'Citi',
    headquarters: 'New York, USA',
    india_locations: ['Pune', 'Chennai', 'Mumbai', 'Bengaluru'],
    type: 'FinTech',
    tier: 'Tier 2',
    sector: 'fintech',
    multiplier: 0.84,
    preferred_skills: ['Java', 'Python', 'SQL', 'Distributed Systems', 'Data Engineering', 'Risk-Aware SDLC'],
    eligibility: 'Solid coding foundation and ability to build reliable enterprise systems at scale.',
    student_perception: 'Strong banking engineering footprint with broad domain exposure and global workflows.'
  }
];

function formatRange(low, high) {
  return `INR ${low}-${high} LPA`;
}

function makeBreakdown(low, high, sector) {
  const baseLow = Math.round(low * 0.62);
  const baseHigh = Math.round(high * 0.7);
  const varLow = Math.max(2, Math.round(low * (sector === 'product' ? 0.18 : 0.12)));
  const varHigh = Math.max(varLow + 1, Math.round(high * (sector === 'product' ? 0.24 : 0.16)));
  const bonusLow = Math.max(1, Math.round(low * 0.05));
  const bonusHigh = Math.max(bonusLow + 1, Math.round(high * 0.1));
  return {
    base: formatRange(baseLow, baseHigh),
    rsu_per_year: sector === 'product'
      ? formatRange(varLow, varHigh)
      : `${formatRange(varLow, varHigh)} (variable/equity mix)`,
    joining_bonus: formatRange(bonusLow, bonusHigh)
  };
}

function makeRoleLevel(role, company) {
  const base = roleBase[role.key] * company.multiplier;
  const low = Math.max(14, Math.round(base * 0.82));
  const high = Math.max(low + 8, Math.round(base * 1.38));
  const level = company.sector === 'fintech' ? 'Analyst' : 'Entry';
  const label = `${role.role} - ${level}`;
  return {
    level,
    label,
    experience: '0-2 years',
    ctc_range: formatRange(low, high),
    breakdown: makeBreakdown(low, high, company.sector),
    interview_process: {
      rounds: 4,
      steps: role.steps[company.sector]
    }
  };
}

function buildCompany(company) {
  const levelsModel = company.sector === 'fintech' ? 'levelsBank' : 'levelsEng';

  const titles = roles.map((r) => ({
    role: r.role,
    levels: r[levelsModel]
  }));

  const common_tech_roles = roles.map((r) => r.role);

  const roleEntries = roles.map((r) => ({
    title: r.role,
    levels: [makeRoleLevel(r, company)]
  }));

  return {
    company_name: company.company_name,
    headquarters: company.headquarters,
    india_locations: company.india_locations,
    titles,
    type: company.type,
    tier: company.tier,
    common_tech_roles,
    hiring_active: true,
    preferred_skills: company.preferred_skills,
    eligibility: company.eligibility,
    student_perception: company.student_perception,
    roles: roleEntries,
    notes: `${company.company_name} data in this batch is structured for entry-level benchmarking across all core tech teams; refine by team-specific bands in later batches.`
  };
}

const batch2 = companies.map(buildCompany);

writeFileSync(
  'data/companies/companies_batch_2.json',
  `${JSON.stringify(batch2, null, 2)}\n`,
  'utf8'
);

console.log('Created data/companies/companies_batch_2.json with', batch2.length, 'companies');
