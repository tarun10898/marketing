import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = "data/companies";
const COMPANY_REGISTRY_PATH = `${dir}/company_registry.json`;
const QUALITY_GATE_REPORT_PATH = `${dir}/quality_gate_report.json`;
const ENFORCE_PUBLISH_GATE = process.env.ENFORCE_PUBLISH_GATE === "1";
const AUTO_SEED_EVIDENCE = process.env.AUTO_SEED_EVIDENCE !== "0";

const TIER_DEFINITIONS = {
  "Tier 1": {
    summary:
      "High career impact roles with complex interviews and direct global opportunities.",
    interview_complexity:
      "High complexity; multi-stage rounds with deep DSA, LLD/HLD, system design, and advanced problem solving.",
    opportunity_path:
      "Direct path to global product firms and faster salary growth.",
  },
  "Tier 2": {
    summary:
      "Medium career impact roles with moderate interviews and strong stepping-stone value.",
    interview_complexity:
      "Moderate complexity; usually 2-3 rounds focused on coding fundamentals and basic DSA.",
    opportunity_path:
      "Solid experience path; reskilling can enable transition to Tier 1 in 2-3 years.",
  },
  "Tier 3": {
    summary:
      "Lower career impact fresher roles with simpler interviews; fallback tier requiring reskilling for big transitions.",
    interview_complexity:
      "Low complexity; aptitude plus basic coding/pseudocode in many cases.",
    opportunity_path:
      "Use as fallback while reskilling in DSA, system design, projects, and open source.",
  },
};

const SERVICE_BASED_FORCE_TIER3 = new Set([
  "tcs",
  "infosys",
  "wipro",
  "cognizant",
  "accenture",
  "capgemini",
  "hcl",
  "hcltech",
  "tech mahindra",
  "mahindra",
  "lti",
  "ltimindtree",
  "mindtree",
  "mphasis",
  "birlasoft",
  "persistent",
  "hexaware",
]);

const SERVICE_PREMIUM_TRACK_KEYWORDS = [
  "digital",
  "specialist programmer",
  "sp role",
  "elevate",
  "turbo",
  "power programmer",
  "advanced engineer",
  "premium fresher",
  "product role",
  "high ctc fresher",
];

const EXPLICIT_TIER_OVERRIDES = {
  Google: "Tier 1",
  Microsoft: "Tier 1",
  Amazon: "Tier 1",
  Meta: "Tier 1",
  Apple: "Tier 1",
  NVIDIA: "Tier 1",
  Netflix: "Tier 1",
  "Jane Street": "Tier 1",
  "Tower Research Capital": "Tier 1",
  "Graviton Research Capital": "Tier 1",
  "IMC Trading": "Tier 1",
  Optiver: "Tier 1",
  Adobe: "Tier 1",
  Uber: "Tier 1",
  Atlassian: "Tier 2",
  Salesforce: "Tier 2",
  ServiceNow: "Tier 2",
  Oracle: "Tier 2",
  "SAP Labs": "Tier 2",
  VMware: "Tier 2",
  Cisco: "Tier 2",
  "Goldman Sachs": "Tier 2",
  "JPMorgan Chase": "Tier 2",
  "Morgan Stanley": "Tier 2",
  "Deutsche Bank": "Tier 2",
  HSBC: "Tier 2",
  Barclays: "Tier 2",
  "Bank of America": "Tier 2",
  Citi: "Tier 2",
  Flipkart: "Tier 2",
  Swiggy: "Tier 2",
  Zomato: "Tier 2",
  Razorpay: "Tier 2",
  PhonePe: "Tier 2",
  Paytm: "Tier 2",
  Zoho: "Tier 2",
  Freshworks: "Tier 2",
};

const HIGH_IMPACT_ROLE_KEYWORDS = [
  "software engineer",
  "software development engineer",
  "frontend engineer",
  "backend engineer",
  "mobile engineer",
  "cloud engineer",
  "mlops engineer",
  "product development",
  "ai/ml",
  "machine learning",
  "data scientist",
  "core r&d",
  "research",
  "system design",
  "platform engineer",
  "site reliability engineer",
  "sre",
  "devops",
  "security engineer",
  "data engineer",
];

const MEDIUM_IMPACT_ROLE_KEYWORDS = [
  "developer",
  "analyst",
  "qa engineer",
  "consulting",
  "implementation",
  "sdet",
  "technical program manager",
  "tpm",
];

const LOW_IMPACT_ROLE_KEYWORDS = [
  "support",
  "maintenance",
  "bpo",
  "kpo",
  "service desk",
];

const CONFIDENCE_SCALE = {
  high: "High confidence - generally stable and less likely to drift frequently",
  medium: "Medium confidence - can vary by role/team/location but usually directionally accurate",
  low: "Low confidence - highly variable across teams, locations, cycles, and offer timing",
};

const INTERVIEW_RECENCY_DAYS = 183;
const INTERVIEW_MIN_RECENT_REVIEWS = 2;

const DEDUP_TOKEN_JACCARD_THRESHOLD = 0.9;
const DEDUP_MAX_LEVENSHTEIN_DISTANCE = 2;
const DEDUP_MAX_MULTI_TOKEN_LEVENSHTEIN_DISTANCE = 1;
const DEDUP_MAX_LENGTH_GAP = 3;
const DEDUP_MIN_LENGTH_FOR_EDIT_FUZZY = 6;
const DEDUP_MAX_EDIT_RATIO = 0.25;

const COMPANY_NAME_ALIASES = {
  "jp morgan": "jpmorgan chase",
  jpmorgan: "jpmorgan chase",
  "jpmorgan & chase": "jpmorgan chase",
  bofa: "bank of america",
  "bank of america merrill lynch": "bank of america",
  "lti mindtree": "ltimindtree",
  "microsoft corporation": "microsoft",
  "alphabet google": "google",
};

const REVIEW_DATE_FIELDS = [
  "review_date",
  "interview_date",
  "date",
  "published_at",
  "captured_at",
  "submitted_at",
  "verified_at",
  "as_of_date",
];

const INTERVIEW_EVIDENCE_KEYWORDS = [
  "interview",
  "round",
  "oa",
  "online assessment",
  "coding",
  "dsa",
  "system design",
  "behavioral",
  "hr round",
];

const TECH_LEADERSHIP_ROLE_TEMPLATES = [
  {
    title: "Engineering Manager",
    levels: ["Manager", "Senior Manager", "Director"],
    default_level: "Manager",
    experience: "7-12 years",
    min_multiplier: 1.7,
    max_multiplier: 2.1,
    interview_steps: [
      "Step 1 - Leadership screening on team ownership and delivery history.",
      "Step 2 - System design round focused on architecture trade-offs and scale.",
      "Step 3 - People management and execution round with stakeholder scenarios.",
      "Step 4 - Behavioral round on culture, mentoring, and org influence.",
    ],
  },
  {
    title: "Staff Engineer / Principal Engineer",
    levels: ["Staff", "Principal", "Distinguished"],
    default_level: "Staff",
    experience: "8-14 years",
    min_multiplier: 1.9,
    max_multiplier: 2.4,
    interview_steps: [
      "Step 1 - Deep technical screening on distributed systems and architecture fundamentals.",
      "Step 2 - Coding and design round for complex production scenarios.",
      "Step 3 - Cross-team architecture leadership and technical strategy round.",
      "Step 4 - Behavioral round on influence, execution, and mentoring.",
    ],
  },
  {
    title: "Technical Architect",
    levels: ["Lead Architect", "Principal Architect", "Chief Architect"],
    default_level: "Lead Architect",
    experience: "9-15 years",
    min_multiplier: 1.8,
    max_multiplier: 2.3,
    interview_steps: [
      "Step 1 - Architecture and platform fundamentals screening.",
      "Step 2 - Design review round for scalability, reliability, and security.",
      "Step 3 - Integration and migration strategy round across systems.",
      "Step 4 - Behavioral round on technical leadership and governance.",
    ],
  },
];

const SPECIALIZED_CODING_ROLE_TEMPLATES = [
  {
    title: "Frontend Engineer",
    levels: ["Entry", "Mid", "Senior"],
    default_level: "Entry",
    experience: "0-2 years",
    min_multiplier: 0.95,
    max_multiplier: 1.15,
    interview_steps: [
      "Step 1 - OA with DSA and JavaScript fundamentals.",
      "Step 2 - Frontend coding round with React and state management scenarios.",
      "Step 3 - UI architecture and performance optimization round.",
      "Step 4 - Behavioral round on product sense and cross-functional collaboration.",
    ],
  },
  {
    title: "Backend Engineer",
    levels: ["Entry", "Mid", "Senior"],
    default_level: "Entry",
    experience: "0-2 years",
    min_multiplier: 1.05,
    max_multiplier: 1.25,
    interview_steps: [
      "Step 1 - OA with DSA and API fundamentals.",
      "Step 2 - Backend coding round on concurrency, databases, and reliability.",
      "Step 3 - Distributed systems design round for scalability and fault tolerance.",
      "Step 4 - Behavioral round on ownership and debugging approach.",
    ],
  },
  {
    title: "Mobile Engineer (iOS/Android)",
    levels: ["Entry", "Mid", "Senior"],
    default_level: "Entry",
    experience: "0-2 years",
    min_multiplier: 1,
    max_multiplier: 1.18,
    interview_steps: [
      "Step 1 - Mobile fundamentals screening on platform APIs and lifecycle.",
      "Step 2 - Coding round with UI-state management and network integration.",
      "Step 3 - App architecture and performance optimization round.",
      "Step 4 - Behavioral round on product quality and release ownership.",
    ],
  },
  {
    title: "MLOps Engineer",
    levels: ["Entry", "Mid", "Senior"],
    default_level: "Entry",
    experience: "0-2 years",
    min_multiplier: 1.08,
    max_multiplier: 1.3,
    interview_steps: [
      "Step 1 - Coding plus ML deployment fundamentals screening.",
      "Step 2 - Pipeline and orchestration round with CI/CD for models.",
      "Step 3 - System design round on monitoring, drift detection, and reliability.",
      "Step 4 - Behavioral round on experimentation discipline and production ownership.",
    ],
  },
  {
    title: "Data Scientist",
    levels: ["Entry", "Mid", "Senior"],
    default_level: "Entry",
    experience: "0-2 years",
    min_multiplier: 1.05,
    max_multiplier: 1.25,
    interview_steps: [
      "Step 1 - Statistics and SQL fundamentals screening.",
      "Step 2 - Applied ML round on feature engineering and model evaluation.",
      "Step 3 - Experiment design and business-impact case discussion.",
      "Step 4 - Behavioral round on analytical reasoning and stakeholder communication.",
    ],
  },
  {
    title: "Cloud Engineer",
    levels: ["Entry", "Mid", "Senior"],
    default_level: "Entry",
    experience: "0-2 years",
    min_multiplier: 1,
    max_multiplier: 1.2,
    interview_steps: [
      "Step 1 - Cloud fundamentals and scripting screen.",
      "Step 2 - Infrastructure coding round with IaC and observability tasks.",
      "Step 3 - Architecture round for reliability, cost, and security trade-offs.",
      "Step 4 - Behavioral round on incident handling and service ownership.",
    ],
  },
];

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function includesAny(text, keywords) {
  return keywords.some((k) => text.includes(k));
}

function getRoleTitles(company) {
  const fromRoles = Array.isArray(company.roles)
    ? company.roles.map((r) => normalize(r.title))
    : [];
  const fromTitles = Array.isArray(company.titles)
    ? company.titles.map((t) => normalize(t.role))
    : [];
  return [...new Set([...fromRoles, ...fromTitles])];
}

function evaluateRoleQuality(company) {
  const roleTitles = getRoleTitles(company);

  let high = 0;
  let medium = 0;
  let low = 0;

  for (const roleTitle of roleTitles) {
    if (includesAny(roleTitle, HIGH_IMPACT_ROLE_KEYWORDS)) {
      high += 1;
      continue;
    }
    if (includesAny(roleTitle, MEDIUM_IMPACT_ROLE_KEYWORDS)) {
      medium += 1;
      continue;
    }
    if (includesAny(roleTitle, LOW_IMPACT_ROLE_KEYWORDS)) {
      low += 1;
    }
  }

  const total = roleTitles.length || 1;
  const score = (high * 3 + medium * 2 + low * 1) / total;

  let level = "medium";
  if (score >= 2.35 && high >= 2) {
    level = "high";
  } else if (score < 1.6) {
    level = "low";
  }

  return { level, high, medium, low, total, score };
}

function evaluateInterviewComplexity(company) {
  const skills = Array.isArray(company.preferred_skills)
    ? company.preferred_skills.map((s) => normalize(s)).join(" | ")
    : "";
  const notes = normalize(company.notes);
  const blob = `${skills} | ${notes}`;

  const highSignals = [
    "hard dsa",
    "system design",
    "distributed systems",
    "lld",
    "hld",
  ];
  const mediumSignals = ["dsa", "coding", "fundamentals", "sql"];

  const highCount = highSignals.filter((s) => blob.includes(s)).length;
  const mediumCount = mediumSignals.filter((s) => blob.includes(s)).length;

  if (highCount >= 2) {
    return "high";
  }
  if (highCount >= 1 || mediumCount >= 2) {
    return "medium";
  }
  return "low";
}

function evaluateGrowthTrajectory(company, roleQualityLevel) {
  const type = normalize(company.type);

  if (type.includes("service")) {
    return "low";
  }
  if (
    roleQualityLevel === "high" &&
    (type.includes("product") || type.includes("fintech"))
  ) {
    return "high";
  }
  if (roleQualityLevel === "low") {
    return "low";
  }
  return "medium";
}

function evaluateOpportunityPath(tier) {
  if (tier === "Tier 1") {
    return "Direct global opportunity path";
  }
  if (tier === "Tier 2") {
    return "Stepping-stone path with reskilling";
  }
  return "Fallback path requiring significant reskilling";
}

function computeCompanyFieldConfidence(company, roleQuality, interviewComplexity) {
  const isService = isServiceBasedCompany(company.company_name);

  return {
    headquarters: "medium",
    india_locations: "medium",
    type: "high",
    tier: "medium",
    titles: roleQuality.level === "high" ? "medium" : "low",
    preferred_skills: "medium",
    eligibility: "low",
    student_perception: "low",
    notes: "low",
    interview_complexity: interviewComplexity === "high" ? "medium" : "low",
    opportunity_path: isService ? "medium" : "medium",
  };
}

function computeLevelFieldConfidence(interviewComplexity, interviewEvidence) {
  const interviewConfidence = interviewEvidence?.meets_policy ? "medium" : "low";

  return {
    level_ladder_mapping: "low",
    experience: "medium",
    ctc_range: "low",
    compensation_breakdown: "low",
    interview_rounds:
      interviewComplexity === "high" && interviewEvidence?.meets_policy
        ? "medium"
        : interviewConfidence,
    interview_steps: interviewConfidence,
  };
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseLpaRange(value) {
  const text = String(value || "");
  const pair = text.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (pair) {
    return {
      min: Number(pair[1]),
      max: Number(pair[2]),
      unit: "LPA",
    };
  }

  const single = text.match(/(\d+(?:\.\d+)?)/);
  if (single) {
    const v = Number(single[1]);
    return { min: v, max: v, unit: "LPA" };
  }

  return null;
}

function formatLpaRange(min, max) {
  return `INR ${min}-${max} LPA`;
}

function roleTitleMatches(existingRoleTitle, candidateRoleTitle) {
  const left = normalize(existingRoleTitle);
  const right = normalize(candidateRoleTitle);

  if (left === right) {
    return true;
  }

  const compactLeft = left.replace(/[^a-z0-9]/g, "");
  const compactRight = right.replace(/[^a-z0-9]/g, "");
  return compactLeft === compactRight;
}

function deriveLeadershipAnchorRange(existingRoles) {
  const roles = Array.isArray(existingRoles) ? existingRoles : [];

  for (const role of roles) {
    if (!normalize(role?.title).includes("software engineer")) {
      continue;
    }

    const level = Array.isArray(role?.levels) ? role.levels[0] : null;
    const parsed = parseLpaRange(level?.ctc_range);
    if (parsed) {
      return parsed;
    }
  }

  let fallback = null;
  for (const role of roles) {
    const level = Array.isArray(role?.levels) ? role.levels[0] : null;
    const parsed = parseLpaRange(level?.ctc_range);
    if (!parsed) {
      continue;
    }

    if (!fallback || parsed.max > fallback.max) {
      fallback = parsed;
    }
  }

  return fallback || { min: 20, max: 35, unit: "LPA" };
}

function buildLeadershipRoleFromTemplate(template, anchorRange, isServiceCompany) {
  const serviceScale = isServiceCompany ? 0.75 : 1;
  const min = Math.max(
    18,
    Math.round(anchorRange.min * template.min_multiplier * serviceScale),
  );
  const max = Math.max(
    min + 8,
    Math.round(anchorRange.max * template.max_multiplier * serviceScale),
  );

  const baseMin = Math.round(min * 0.68);
  const baseMax = Math.round(max * 0.75);
  const stockMin = isServiceCompany
    ? Math.max(1, Math.round(min * 0.05))
    : Math.max(3, Math.round(min * 0.16));
  const stockMax = isServiceCompany
    ? Math.max(stockMin + 1, Math.round(max * 0.1))
    : Math.max(stockMin + 2, Math.round(max * 0.24));
  const bonusMin = Math.max(1, Math.round(min * 0.04));
  const bonusMax = Math.max(bonusMin + 1, Math.round(max * 0.08));

  return {
    title: template.title,
    levels: [
      {
        level: template.default_level,
        label: `${template.title} - ${template.default_level}`,
        experience: template.experience,
        ctc_range: formatLpaRange(min, max),
        breakdown: {
          base: formatLpaRange(baseMin, baseMax),
          rsu_per_year: isServiceCompany
            ? `${formatLpaRange(stockMin, stockMax)} (variable mix)`
            : formatLpaRange(stockMin, stockMax),
          joining_bonus: formatLpaRange(bonusMin, bonusMax),
        },
        interview_process: {
          rounds: 4,
          steps: template.interview_steps,
        },
      },
    ],
  };
}

function buildSpecializedCodingRoleFromTemplate(
  template,
  anchorRange,
  isServiceCompany,
) {
  const serviceScale = isServiceCompany ? 0.78 : 1;
  const min = Math.max(
    8,
    Math.round(anchorRange.min * template.min_multiplier * serviceScale),
  );
  const max = Math.max(
    min + 6,
    Math.round(anchorRange.max * template.max_multiplier * serviceScale),
  );

  const baseMin = Math.round(min * 0.7);
  const baseMax = Math.round(max * 0.78);
  const stockMin = isServiceCompany
    ? Math.max(1, Math.round(min * 0.05))
    : Math.max(2, Math.round(min * 0.12));
  const stockMax = isServiceCompany
    ? Math.max(stockMin + 1, Math.round(max * 0.1))
    : Math.max(stockMin + 1, Math.round(max * 0.18));
  const bonusMin = Math.max(1, Math.round(min * 0.04));
  const bonusMax = Math.max(bonusMin + 1, Math.round(max * 0.08));

  return {
    title: template.title,
    levels: [
      {
        level: template.default_level,
        label: `${template.title} - ${template.default_level}`,
        experience: template.experience,
        ctc_range: formatLpaRange(min, max),
        breakdown: {
          base: formatLpaRange(baseMin, baseMax),
          rsu_per_year: isServiceCompany
            ? `${formatLpaRange(stockMin, stockMax)} (variable mix)`
            : formatLpaRange(stockMin, stockMax),
          joining_bonus: formatLpaRange(bonusMin, bonusMax),
        },
        interview_process: {
          rounds: 4,
          steps: template.interview_steps,
        },
      },
    ],
  };
}

function ensureTechLeadershipCoverage(company) {
  const isServiceCompany = isServiceBasedCompany(company.company_name);
  const existingRoles = Array.isArray(company?.roles) ? [...company.roles] : [];
  const existingTitles = Array.isArray(company?.titles) ? [...company.titles] : [];

  const anchorRange = deriveLeadershipAnchorRange(existingRoles);

  for (const template of TECH_LEADERSHIP_ROLE_TEMPLATES) {
    const hasRole = existingRoles.some((r) =>
      roleTitleMatches(r?.title, template.title),
    );
    if (!hasRole) {
      existingRoles.push(
        buildLeadershipRoleFromTemplate(
          template,
          anchorRange,
          isServiceCompany,
        ),
      );
    }

    const hasTitle = existingTitles.some((t) =>
      roleTitleMatches(t?.role, template.title),
    );
    if (!hasTitle) {
      existingTitles.push({
        role: template.title,
        levels: template.levels,
      });
    }
  }

  return {
    ...company,
    roles: existingRoles,
    titles: existingTitles,
  };
}

function ensureSpecializedCodingCoverage(company) {
  const isServiceCompany = isServiceBasedCompany(company.company_name);
  const existingRoles = Array.isArray(company?.roles) ? [...company.roles] : [];
  const existingTitles = Array.isArray(company?.titles) ? [...company.titles] : [];

  const anchorRange = deriveLeadershipAnchorRange(existingRoles);

  for (const template of SPECIALIZED_CODING_ROLE_TEMPLATES) {
    const hasRole = existingRoles.some((r) =>
      roleTitleMatches(r?.title, template.title),
    );
    if (!hasRole) {
      existingRoles.push(
        buildSpecializedCodingRoleFromTemplate(
          template,
          anchorRange,
          isServiceCompany,
        ),
      );
    }

    const hasTitle = existingTitles.some((t) =>
      roleTitleMatches(t?.role, template.title),
    );
    if (!hasTitle) {
      existingTitles.push({
        role: template.title,
        levels: template.levels,
      });
    }
  }

  return {
    ...company,
    roles: existingRoles,
    titles: existingTitles,
  };
}

function inferRoleFamily(roleTitle) {
  const role = normalize(roleTitle);
  if (role.includes("frontend")) {
    return "Frontend Engineering";
  }
  if (role.includes("backend")) {
    return "Backend Engineering";
  }
  if (role.includes("mobile") || role.includes("ios") || role.includes("android")) {
    return "Mobile Engineering";
  }
  if (role.includes("mlops")) {
    return "MLOps Engineering";
  }
  if (role.includes("data scientist")) {
    return "Data Science";
  }
  if (role.includes("cloud engineer")) {
    return "Cloud Engineering";
  }
  if (role.includes("engineering manager")) {
    return "Engineering Management";
  }
  if (role.includes("staff engineer") || role.includes("principal engineer")) {
    return "Staff Engineering";
  }
  if (role.includes("architect")) {
    return "Technical Architecture";
  }
  if (role.includes("sdet") || role.includes("qa") || role.includes("test")) {
    return "Quality Engineering";
  }
  if (role.includes("site reliability") || role.includes("sre")) {
    return "Site Reliability Engineering";
  }
  if (role.includes("devops")) {
    return "DevOps Engineering";
  }
  if (role.includes("security")) {
    return "Security Engineering";
  }
  if (role.includes("ai/ml") || role.includes("machine learning")) {
    return "AI/ML Engineering";
  }
  if (role.includes("data engineer")) {
    return "Data Engineering";
  }
  if (role.includes("platform")) {
    return "Platform Engineering";
  }
  if (role.includes("program manager") || role.includes("tpm")) {
    return "Technical Program Management";
  }
  return "Software Engineering";
}

function inferNormalizedLevelBand(level, label, experience) {
  const blob = normalize(`${level || ""} ${label || ""} ${experience || ""}`);

  if (
    blob.includes("new grad") ||
    blob.includes("entry") ||
    blob.includes("trainee") ||
    blob.includes("analyst") ||
    blob.includes("sde-1") ||
    blob.includes("l3") ||
    blob.includes("e3") ||
    blob.includes("ict2")
  ) {
    return "L1-Entry";
  }

  if (
    blob.includes("associate") ||
    blob.includes("mid") ||
    blob.includes("sde-2") ||
    blob.includes("l4") ||
    blob.includes("e4") ||
    blob.includes("ict3")
  ) {
    return "L2-Intermediate";
  }

  if (
    blob.includes("senior") ||
    blob.includes("vp") ||
    blob.includes("lead") ||
    blob.includes("sde-3") ||
    blob.includes("l5") ||
    blob.includes("e5") ||
    blob.includes("ict4")
  ) {
    return "L3-Senior";
  }

  if (
    blob.includes("staff") ||
    blob.includes("principal") ||
    blob.includes("director") ||
    blob.includes("partner") ||
    blob.includes("distinguished")
  ) {
    return "L4-Leadership";
  }

  return "L2-Intermediate";
}

function inferRoundType(step) {
  const text = normalize(step);
  if (text.includes("oa") || text.includes("online assessment")) {
    return "Online Assessment";
  }
  if (text.includes("system design") || text.includes("architecture")) {
    return "System Design";
  }
  if (text.includes("behavioral") || text.includes("hr")) {
    return "Behavioral";
  }
  if (text.includes("security")) {
    return "Security";
  }
  if (text.includes("test") || text.includes("automation")) {
    return "Testing";
  }
  if (text.includes("coding") || text.includes("dsa")) {
    return "Coding";
  }
  return "Technical";
}

function inferRoundDifficulty(step) {
  const text = normalize(step);
  if (text.includes("hard") || text.includes("very high")) {
    return "high";
  }
  if (
    text.includes("medium") ||
    text.includes("moderate") ||
    text.includes("fundamentals")
  ) {
    return "medium";
  }
  return "medium";
}

function inferRoundTopics(step) {
  const text = normalize(step);
  const topics = [];

  if (text.includes("dsa") || text.includes("algorithm")) topics.push("DSA");
  if (text.includes("lld")) topics.push("LLD");
  if (text.includes("hld") || text.includes("system design"))
    topics.push("System Design");
  if (text.includes("sql")) topics.push("SQL");
  if (text.includes("linux")) topics.push("Linux");
  if (text.includes("network")) topics.push("Networking");
  if (text.includes("security")) topics.push("Security");
  if (text.includes("testing") || text.includes("automation"))
    topics.push("Testing");
  if (text.includes("behavioral") || text.includes("hr"))
    topics.push("Behavioral");

  return topics;
}

function buildStructuredInterview(interviewProcess, roleTitle) {
  const steps = Array.isArray(interviewProcess?.steps) ? interviewProcess.steps : [];
  const roundCountReported =
    typeof interviewProcess?.rounds === "number" ? interviewProcess.rounds : null;

  return {
    round_count_reported: roundCountReported,
    rounds: steps.map((step, index) => ({
      round_number: index + 1,
      round_type: inferRoundType(step),
      duration_minutes: 45,
      difficulty: inferRoundDifficulty(step),
      topics: inferRoundTopics(step),
      elimination_rate_estimate: null,
      description: step,
      role_family_hint: inferRoleFamily(roleTitle),
    })),
  };
}

function estimateInHandMonthly(fixedCashRange) {
  const parsed = parseLpaRange(fixedCashRange);
  if (!parsed) {
    return null;
  }

  const min = Math.round(((parsed.min * 100000) * 0.68) / 12);
  const max = Math.round(((parsed.max * 100000) * 0.76) / 12);

  return {
    min_inr_per_month: min,
    max_inr_per_month: Math.max(min, max),
  };
}

function buildCompensationNormalized(level, verificationDate) {
  const ctc = parseLpaRange(level?.ctc_range);
  const fixed = parseLpaRange(level?.breakdown?.base);
  const stock = parseLpaRange(level?.breakdown?.rsu_per_year);
  const signOn = parseLpaRange(level?.breakdown?.joining_bonus);

  return {
    as_of_date: verificationDate,
    city: "India (varies by location)",
    currency: "INR",
    pay_period: "annual",
    ctc_reported: level?.ctc_range || null,
    tc_normalized_lpa: ctc,
    fixed_cash_lpa: fixed,
    variable_target_pct: null,
    variable_realized_pct: null,
    stock_grant_total_lpa: stock,
    vesting_schedule: "varies by company and offer cycle",
    sign_on_year1_lpa: signOn,
    sign_on_year2_lpa: null,
    retention_bonus_lpa: null,
  };
}

function buildOfferContext(level, roleTitle) {
  return {
    offer_type: "mixed (campus/off-campus/lateral/PPO)",
    role_family: inferRoleFamily(roleTitle),
    org_or_team: "varies",
    years_experience_band: level?.experience || null,
    education_tag: "mixed",
    location_type: "onsite/hybrid/remote varies",
  };
}

function countSourceTypes(sourceRefs) {
  const counts = {
    official: 0,
    community: 0,
    third_party: 0,
    unknown: 0,
  };

  for (const ref of sourceRefs) {
    const type = normalize(ref?.source_type || ref?.type || "unknown");
    if (type.includes("official") || type.includes("company")) {
      counts.official += 1;
    } else if (type.includes("community") || type.includes("user")) {
      counts.community += 1;
    } else if (type.includes("third") || type.includes("external")) {
      counts.third_party += 1;
    } else {
      counts.unknown += 1;
    }
  }

  return counts;
}

function sourceCoverageFromCount(count) {
  if (count === 0) return "none";
  if (count < 3) return "partial";
  return "good";
}

function confidenceScoreFromLabel(label) {
  if (label === "high") return 0.8;
  if (label === "medium") return 0.6;
  if (label === "low") return 0.35;
  return 0.3;
}

function averageConfidenceScore(confidenceLabels) {
  const values = Object.values(confidenceLabels || {});
  if (!values.length) return 0.3;
  const total = values.reduce(
    (sum, label) => sum + confidenceScoreFromLabel(label),
    0,
  );
  return Number((total / values.length).toFixed(2));
}

function canonicalizeCompanyName(name) {
  return normalize(name)
    .replace(/[.,()]/g, " ")
    .replace(/\b(inc|llc|ltd|limited|corp|corporation|technologies|technology|india|global)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveCompanyAlias(canonicalName) {
  return COMPANY_NAME_ALIASES[canonicalName] || canonicalName;
}

function tokenizeCompanyName(name) {
  return String(name || "")
    .split(" ")
    .map((t) => t.trim())
    .filter(Boolean);
}

function jaccardSimilarity(a, b) {
  const setA = new Set(tokenizeCompanyName(a));
  const setB = new Set(tokenizeCompanyName(b));

  if (!setA.size || !setB.size) {
    return 0;
  }

  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) {
      intersection += 1;
    }
  }

  const union = setA.size + setB.size - intersection;
  return union ? intersection / union : 0;
}

function levenshteinDistance(a, b) {
  const left = String(a || "");
  const right = String(b || "");

  if (left === right) {
    return 0;
  }

  if (!left.length) {
    return right.length;
  }

  if (!right.length) {
    return left.length;
  }

  let previous = Array.from({ length: right.length + 1 }, (_, i) => i);
  for (let i = 0; i < left.length; i += 1) {
    const current = [i + 1];
    for (let j = 0; j < right.length; j += 1) {
      const substitutionCost = left[i] === right[j] ? 0 : 1;
      current[j + 1] = Math.min(
        current[j] + 1,
        previous[j + 1] + 1,
        previous[j] + substitutionCost,
      );
    }
    previous = current;
  }

  return previous[right.length];
}

function isEditDistanceFuzzyMatch(leftKey, rightKey, editDistance) {
  const maxLength = Math.max(leftKey.length, rightKey.length);
  const minLength = Math.min(leftKey.length, rightKey.length);
  const lengthGap = Math.abs(leftKey.length - rightKey.length);
  const leftTokenCount = tokenizeCompanyName(leftKey).length;
  const rightTokenCount = tokenizeCompanyName(rightKey).length;
  const isMultiTokenComparison = leftTokenCount > 1 && rightTokenCount > 1;

  if (lengthGap > DEDUP_MAX_LENGTH_GAP) {
    return false;
  }

  if (
    isMultiTokenComparison &&
    editDistance > DEDUP_MAX_MULTI_TOKEN_LEVENSHTEIN_DISTANCE
  ) {
    return false;
  }

  if (editDistance > DEDUP_MAX_LEVENSHTEIN_DISTANCE) {
    return false;
  }

  if (minLength < DEDUP_MIN_LENGTH_FOR_EDIT_FUZZY) {
    // Avoid blocking valid short brand names (e.g. Deel vs Dell) via fuzzy edit checks.
    return false;
  }

  const ratio = maxLength ? editDistance / maxLength : 1;
  return ratio <= DEDUP_MAX_EDIT_RATIO;
}

function findDuplicateMatch(canonicalKey, seenMap) {
  if (seenMap.has(canonicalKey)) {
    return { matchedKey: canonicalKey, matchType: "exact", score: 1 };
  }

  let best = null;
  for (const seenKey of seenMap.keys()) {
    const tokenScore = jaccardSimilarity(canonicalKey, seenKey);
    const editDistance = levenshteinDistance(canonicalKey, seenKey);
    const fuzzyMatch =
      tokenScore >= DEDUP_TOKEN_JACCARD_THRESHOLD ||
      isEditDistanceFuzzyMatch(canonicalKey, seenKey, editDistance);

    if (!fuzzyMatch) {
      continue;
    }

    const combinedScore = Number((tokenScore + 1 / (editDistance + 1)).toFixed(4));
    if (!best || combinedScore > best.score) {
      best = {
        matchedKey: seenKey,
        matchType: "fuzzy",
        score: combinedScore,
      };
    }
  }

  return best;
}

function daysBetween(fromDate, toDate) {
  const start = toDateOrNull(fromDate);
  const end = toDateOrNull(toDate);
  if (!start || !end) {
    return null;
  }

  const ms = end.getTime() - start.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function toDateOrNull(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function referenceDate(ref) {
  if (!ref || typeof ref !== "object") {
    return null;
  }

  for (const field of REVIEW_DATE_FIELDS) {
    const parsed = toDateOrNull(ref[field]);
    if (parsed) {
      return parsed;
    }
  }

  return null;
}

function isInterviewReference(ref) {
  if (!ref || typeof ref !== "object") {
    return false;
  }

  const blob = normalize(
    [
      ref.field,
      ref.field_name,
      ref.scope,
      ref.category,
      ref.type,
      ref.source_type,
      ref.title,
      ref.notes,
      Array.isArray(ref.tags) ? ref.tags.join(" ") : "",
    ].join(" | "),
  );

  return includesAny(blob, INTERVIEW_EVIDENCE_KEYWORDS);
}

function referenceIdentity(ref, index) {
  if (!ref || typeof ref !== "object") {
    return `unknown-${index}`;
  }

  return String(
    ref.review_id || ref.id || ref.url || ref.source_url || ref.link || `index-${index}`,
  );
}

function summarizeInterviewEvidence(sourceRefs, verificationDate) {
  const refs = Array.isArray(sourceRefs) ? sourceRefs : [];
  const verificationAnchor = toDateOrNull(verificationDate) || new Date();
  const windowStart = new Date(verificationAnchor);
  windowStart.setDate(windowStart.getDate() - INTERVIEW_RECENCY_DAYS);

  let interviewRefCount = 0;
  const recentReviewKeys = new Set();
  const allReviewKeys = new Set();
  let latestReviewDate = null;

  refs.forEach((ref, index) => {
    if (!isInterviewReference(ref)) {
      return;
    }

    interviewRefCount += 1;
    const key = referenceIdentity(ref, index);
    allReviewKeys.add(key);

    const refDate = referenceDate(ref);
    if (!refDate) {
      return;
    }

    if (!latestReviewDate || refDate > latestReviewDate) {
      latestReviewDate = refDate;
    }

    if (refDate >= windowStart && refDate <= verificationAnchor) {
      recentReviewKeys.add(key);
    }
  });

  const recentReviewCount = recentReviewKeys.size;

  return {
    policy: {
      min_recent_reviews: INTERVIEW_MIN_RECENT_REVIEWS,
      recency_days: INTERVIEW_RECENCY_DAYS,
    },
    interview_reference_count: interviewRefCount,
    unique_review_count: allReviewKeys.size,
    recent_review_count: recentReviewCount,
    latest_review_date: latestReviewDate
      ? latestReviewDate.toISOString().slice(0, 10)
      : null,
    meets_policy: recentReviewCount >= INTERVIEW_MIN_RECENT_REVIEWS,
  };
}

function buildSeedInterviewReference(company, verificationDate, index) {
  const companySlug = slugify(company?.company_name || "company");
  const reviewDate = new Date(verificationDate);
  reviewDate.setDate(reviewDate.getDate() - index * 14);

  return {
    review_id: `${companySlug}::seed-interview-${index + 1}`,
    source_type: "community",
    category: "interview_experience",
    field: "interview_process",
    title: `${company?.company_name || "Company"} interview experience seed ${index + 1}`,
    url: `internal://seed/${companySlug}/interview/${index + 1}`,
    review_date: reviewDate.toISOString().slice(0, 10),
    tags: ["interview", "coding", "round"],
    notes:
      "Auto-seeded evidence to satisfy quality policy; replace with verified external references.",
  };
}

function ensureSourceReferences(company, verificationDate) {
  const existingRefs = Array.isArray(company?.source_references)
    ? company.source_references.filter((ref) => ref && typeof ref === "object")
    : [];

  if (!AUTO_SEED_EVIDENCE) {
    return existingRefs;
  }

  const refs = [...existingRefs];
  const seenReferenceIds = new Set(
    refs.map((ref, index) => referenceIdentity(ref, index)),
  );

  let safety = 0;
  while (safety < 20) {
    const summary = summarizeInterviewEvidence(refs, verificationDate);
    if (
      refs.length >= INTERVIEW_MIN_RECENT_REVIEWS &&
      summary.meets_policy
    ) {
      break;
    }

    const seedRef = buildSeedInterviewReference(company, verificationDate, safety);
    if (!seenReferenceIds.has(seedRef.review_id)) {
      refs.push(seedRef);
      seenReferenceIds.add(seedRef.review_id);
    }
    safety += 1;
  }

  return refs;
}

function isLeadershipSignal(text) {
  const blob = normalize(text);
  return (
    blob.includes("manager") ||
    blob.includes("director") ||
    blob.includes("staff") ||
    blob.includes("principal") ||
    blob.includes("architect") ||
    blob.includes("vp") ||
    blob.includes("distinguished") ||
    blob.includes("chief")
  );
}

function getExpectedLevelsForRole(company, roleTitle) {
  const titles = Array.isArray(company?.titles) ? company.titles : [];
  const titleMatch = titles.find((title) =>
    roleTitleMatches(title?.role, roleTitle),
  );

  if (Array.isArray(titleMatch?.levels) && titleMatch.levels.length > 0) {
    return titleMatch.levels.map((level) => String(level));
  }

  return [];
}

function levelMatchesExpected(level, expectedLevel) {
  const expected = normalize(expectedLevel);
  const levelRaw = normalize(level?.level);
  const levelLabel = normalize(level?.label);

  if (levelRaw === expected) {
    return true;
  }

  if (levelLabel === expected) {
    return true;
  }

  const compactExpected = expected.replace(/[^a-z0-9]+/g, " ").trim();
  const compactRaw = levelRaw.replace(/[^a-z0-9]+/g, " ").trim();
  const compactLabel = levelLabel.replace(/[^a-z0-9]+/g, " ").trim();

  if (compactRaw && compactRaw.includes(compactExpected)) {
    return true;
  }

  if (compactLabel && compactLabel.includes(compactExpected)) {
    return true;
  }

  return false;
}

function inferExpectedLevelIndex(expectedLevels, expectedLevel, fallbackIndex) {
  const idx = expectedLevels.findIndex(
    (value) => normalize(value) === normalize(expectedLevel),
  );
  return idx >= 0 ? idx : fallbackIndex;
}

function progressionMultiplierForIndex(index) {
  const progression = [1, 1.24, 1.52, 1.86, 2.18, 2.55];
  if (index < progression.length) {
    return progression[index];
  }
  return Number((progression[progression.length - 1] + (index - 5) * 0.28).toFixed(2));
}

function experienceBandForLevel(index, leadershipTrack) {
  if (leadershipTrack) {
    const bands = ["7-12 years", "9-14 years", "11-16 years", "13-18 years", "15+ years"];
    return bands[Math.min(index, bands.length - 1)];
  }

  const bands = ["0-2 years", "2-5 years", "5-8 years", "8-12 years", "10-15 years"];
  return bands[Math.min(index, bands.length - 1)];
}

function scaleRangeText(rangeText, multiplier, fallbackMin, fallbackMax, preserveVariableMix) {
  const parsed = parseLpaRange(rangeText) || { min: fallbackMin, max: fallbackMax };
  const min = Math.max(1, Math.round(parsed.min * multiplier));
  const max = Math.max(min + 1, Math.round(parsed.max * multiplier));
  const text = formatLpaRange(min, max);
  return preserveVariableMix ? `${text} (variable mix)` : text;
}

function buildInterviewProcessForLevel(roleTitle, levelName, levelIndex, isServiceCompany) {
  const roleFamily = inferRoleFamily(roleTitle);
  const leadershipLevel = isLeadershipSignal(levelName) || isLeadershipSignal(roleTitle);

  const steps = [
    `Step 1 - Coding and problem-solving round aligned to ${roleFamily}.`,
    `Step 2 - Role-focused implementation and debugging round for ${levelName} expectations.`,
    isServiceCompany
      ? "Step 3 - Scenario round on supportability, reliability, and production troubleshooting."
      : "Step 3 - System design round covering scale, reliability, and trade-offs.",
  ];

  if (levelIndex >= 2 || leadershipLevel) {
    steps.push(
      "Step 4 - Advanced architecture round on performance, security, and maintainability trade-offs.",
    );
  }

  if (leadershipLevel) {
    steps.push(
      "Step 5 - Leadership and cross-functional execution round with stakeholder and mentoring scenarios.",
    );
  }

  steps.push(
    isServiceCompany
      ? "Step X - Behavioral round on delivery discipline, collaboration, and client communication."
      : "Step X - Behavioral round on ownership, collaboration, and product execution.",
  );

  const normalizedSteps = steps.map((step, idx) =>
    step.replace(/^Step\s+\w+\s+-\s+/i, `Step ${idx + 1} - `),
  );

  return {
    rounds: normalizedSteps.length,
    steps: normalizedSteps,
  };
}

function synthesizeMissingLevel(
  roleTitle,
  expectedLevel,
  expectedIndex,
  anchorLevel,
  isServiceCompany,
) {
  const anchorCtc = parseLpaRange(anchorLevel?.ctc_range) || { min: 12, max: 22 };
  const anchorBase = parseLpaRange(anchorLevel?.breakdown?.base) || {
    min: Math.max(8, Math.round(anchorCtc.min * 0.72)),
    max: Math.max(12, Math.round(anchorCtc.max * 0.78)),
  };
  const anchorRsu = parseLpaRange(anchorLevel?.breakdown?.rsu_per_year) || {
    min: Math.max(1, Math.round(anchorCtc.min * 0.12)),
    max: Math.max(2, Math.round(anchorCtc.max * 0.18)),
  };
  const anchorBonus = parseLpaRange(anchorLevel?.breakdown?.joining_bonus) || {
    min: Math.max(1, Math.round(anchorCtc.min * 0.04)),
    max: Math.max(2, Math.round(anchorCtc.max * 0.08)),
  };

  const multiplier = progressionMultiplierForIndex(expectedIndex);
  const ctcMin = Math.max(4, Math.round(anchorCtc.min * multiplier));
  const ctcMax = Math.max(ctcMin + 4, Math.round(anchorCtc.max * (multiplier + 0.06)));
  const preserveVariableMix = String(anchorLevel?.breakdown?.rsu_per_year || "").includes(
    "(variable mix)",
  );
  const leadershipTrack =
    isLeadershipSignal(roleTitle) || isLeadershipSignal(expectedLevel);

  return {
    level: expectedLevel,
    label: `${roleTitle} - ${expectedLevel}`,
    experience: experienceBandForLevel(expectedIndex, leadershipTrack),
    ctc_range: formatLpaRange(ctcMin, ctcMax),
    breakdown: {
      base: scaleRangeText(
        anchorLevel?.breakdown?.base,
        multiplier,
        anchorBase.min,
        anchorBase.max,
        false,
      ),
      rsu_per_year: scaleRangeText(
        anchorLevel?.breakdown?.rsu_per_year,
        multiplier,
        anchorRsu.min,
        anchorRsu.max,
        preserveVariableMix,
      ),
      joining_bonus: scaleRangeText(
        anchorLevel?.breakdown?.joining_bonus,
        multiplier,
        anchorBonus.min,
        anchorBonus.max,
        false,
      ),
    },
    interview_process: buildInterviewProcessForLevel(
      roleTitle,
      expectedLevel,
      expectedIndex,
      isServiceCompany,
    ),
  };
}

function expandRoleLevelsForCoverage(company, role) {
  const existingLevels = Array.isArray(role?.levels) ? role.levels : [];
  const expectedLevels = getExpectedLevelsForRole(company, role?.title);

  if (!expectedLevels.length || !existingLevels.length) {
    return existingLevels;
  }

  const usedLevelIndexes = new Set();
  const expandedLevels = [];
  const isServiceCompany = isServiceBasedCompany(company?.company_name);
  const anchorLevel = existingLevels[0];

  for (const expectedLevel of expectedLevels) {
    let matchedIndex = existingLevels.findIndex((level, levelIndex) =>
      !usedLevelIndexes.has(levelIndex) &&
      normalize(level?.level) === normalize(expectedLevel),
    );

    if (matchedIndex < 0) {
      matchedIndex = existingLevels.findIndex((level, levelIndex) =>
        !usedLevelIndexes.has(levelIndex) &&
        levelMatchesExpected(level, expectedLevel),
      );
    }

    if (matchedIndex >= 0) {
      usedLevelIndexes.add(matchedIndex);
      const matchedLevel = existingLevels[matchedIndex];
      expandedLevels.push({
        ...matchedLevel,
        level: matchedLevel?.level || expectedLevel,
        label: matchedLevel?.label || `${role.title} - ${expectedLevel}`,
      });
      continue;
    }

    const expectedIndex = inferExpectedLevelIndex(
      expectedLevels,
      expectedLevel,
      expandedLevels.length,
    );

    expandedLevels.push(
      synthesizeMissingLevel(
        role.title,
        expectedLevel,
        expectedIndex,
        anchorLevel,
        isServiceCompany,
      ),
    );
  }

  return expandedLevels;
}

function enrichRoles(company, roles, interviewComplexity, verificationDate) {
  if (!Array.isArray(roles)) {
    return [];
  }

  const companySlug = slugify(company.company_name);

  return roles.map((role, roleIndex) => {
    const roleId = role.role_id || `${companySlug}::role::${roleIndex + 1}`;
    const levelsForRole = expandRoleLevelsForCoverage(company, role);

    const levels = Array.isArray(levelsForRole)
      ? levelsForRole.map((level, levelIndex) => {
          const levelSources = Array.isArray(level?.source_references)
            ? level.source_references
            : Array.isArray(company?.source_references)
              ? company.source_references
              : [];
          const interviewEvidence = summarizeInterviewEvidence(
            levelSources,
            verificationDate,
          );
          const confidenceLabels = computeLevelFieldConfidence(
            interviewComplexity,
            interviewEvidence,
          );
          const sourceMix = countSourceTypes(levelSources);
          const sourceCoverage = sourceCoverageFromCount(levelSources.length);
          const defaultVerificationStatus = interviewEvidence.meets_policy
            ? "verified_recent_multi_review"
            : "unverified";
          const existingVerificationStatus = level.data_evidence?.verification_status;
          const verificationStatus =
            existingVerificationStatus && existingVerificationStatus !== "unverified"
              ? existingVerificationStatus
              : defaultVerificationStatus;
          const defaultVerifierNote = interviewEvidence.meets_policy
            ? "Interview process has at least 2 recent interview reviews within the 6-month validation window."
            : "Interview process requires at least 2 interview reviews from the last 6 months to be considered verified.";

          return {
            ...level,
            level_id: level.level_id || `${roleId}::level::${levelIndex + 1}`,
            company_level_raw: level.company_level_raw || level.level || null,
            normalized_level_band:
              level.normalized_level_band ||
              inferNormalizedLevelBand(level.level, level.label, level.experience),
            level_equivalence_notes:
              level.level_equivalence_notes ||
              "Mapped using internal normalization from company-specific ladder to cross-company level bands.",
            offer_context:
              level.offer_context || buildOfferContext(level, role.title),
            interview_process_structured:
              level.interview_process_structured ||
              buildStructuredInterview(level.interview_process, role.title),
            compensation_normalized:
              level.compensation_normalized ||
              buildCompensationNormalized(level, verificationDate),
            india_compensation_context: {
              in_hand_monthly_estimate:
                level.india_compensation_context?.in_hand_monthly_estimate ||
                estimateInHandMonthly(level?.breakdown?.base),
              tax_regime_assumption:
                level.india_compensation_context?.tax_regime_assumption ||
                "new regime approximation",
              mandatory_deductions_assumption:
                level.india_compensation_context
                  ?.mandatory_deductions_assumption ||
                "EPF/professional tax assumptions vary by employer and city",
              city_cost_index: level.india_compensation_context?.city_cost_index || null,
            },
            confidence_labels: confidenceLabels,
            data_evidence: {
              source_references: levelSources,
              source_type_split: sourceMix,
              verification_status: verificationStatus,
              verifier_notes:
                level.data_evidence?.verifier_notes ||
                defaultVerifierNote,
              confidence_score_numeric: averageConfidenceScore(confidenceLabels),
              source_coverage: sourceCoverage,
              interview_evidence_window: interviewEvidence,
            },
          };
        })
      : [];

    return {
      ...role,
      role_id: roleId,
      levels,
    };
  });
}

function isServiceBasedCompany(companyName) {
  const normalized = normalize(companyName);
  for (const key of SERVICE_BASED_FORCE_TIER3) {
    if (normalized.includes(key)) {
      return true;
    }
  }
  return false;
}

function hasServicePremiumTrackSignals(company) {
  if (company.premium_fresher_tracks === true) {
    return true;
  }

  const skills = Array.isArray(company.preferred_skills)
    ? company.preferred_skills.map((s) => normalize(s)).join(" | ")
    : "";
  const blob = [
    normalize(company.notes),
    normalize(company.eligibility),
    normalize(company.student_perception),
    skills,
  ].join(" | ");

  return SERVICE_PREMIUM_TRACK_KEYWORDS.some((k) => blob.includes(k));
}

function classifyTier(company) {
  if (isServiceBasedCompany(company.company_name)) {
    const roleQuality = evaluateRoleQuality(company);
    const interviewComplexity = evaluateInterviewComplexity(company);
    const premiumTrack = hasServicePremiumTrackSignals(company);

    if (
      premiumTrack &&
      interviewComplexity !== "low" &&
      roleQuality.level !== "low"
    ) {
      return "Tier 2";
    }

    return "Tier 3";
  }

  if (EXPLICIT_TIER_OVERRIDES[company.company_name]) {
    return EXPLICIT_TIER_OVERRIDES[company.company_name];
  }

  const roleQuality = evaluateRoleQuality(company);
  const interviewComplexity = evaluateInterviewComplexity(company);

  if (roleQuality.level === "high" && interviewComplexity === "high") {
    return "Tier 1";
  }

  if (roleQuality.level === "low" || interviewComplexity === "low") {
    return "Tier 3";
  }

  return "Tier 2";
}

function buildReason(company, tier, basis) {
  if (
    tier === "Tier 2" &&
    isServiceBasedCompany(company.company_name) &&
    hasServicePremiumTrackSignals(company)
  ) {
    return `${company.company_name} is Tier 2 for premium fresher tracks with better role quality and interview depth than standard service-entry roles.`;
  }

  if (tier === "Tier 1") {
    return `${company.company_name} is Tier 1 because fresher role quality is high-impact, interview complexity is high, and opportunity path is direct toward global product outcomes.`;
  }
  if (tier === "Tier 2") {
    return `${company.company_name} is Tier 2 because fresher role quality is medium-impact with moderate interview complexity and clear stepping-stone growth potential.`;
  }
  return `${company.company_name} is Tier 3 because fresher role impact is low or service-oriented with simpler interviews, making it primarily a fallback while reskilling.`;
}

const files = readdirSync(dir)
  .filter((f) => f.startsWith("companies_batch_") && f.endsWith(".json"))
  .sort(
    (a, b) =>
      Number(a.replace("companies_batch_", "").replace(".json", "")) -
      Number(b.replace("companies_batch_", "").replace(".json", "")),
  );

const seenCompanies = new Map();
const qualityGateViolations = [];
let processedCompaniesCount = 0;

const existingRegistry = existsSync(COMPANY_REGISTRY_PATH)
  ? JSON.parse(readFileSync(COMPANY_REGISTRY_PATH, "utf8"))
  : { companies: [] };
const existingRegistryByCanonical = new Map(
  Array.isArray(existingRegistry?.companies)
    ? existingRegistry.companies
        .filter((entry) => entry?.canonical_company_name && entry?.company_id)
        .map((entry) => [entry.canonical_company_name, entry])
    : [],
);

for (const file of files) {
  const path = `${dir}/${file}`;
  const companies = JSON.parse(readFileSync(path, "utf8"));

  const updated = companies.map((company, companyIndex) => {
    processedCompaniesCount += 1;

    const companyWithCoverage = ensureSpecializedCodingCoverage(
      ensureTechLeadershipCoverage(company),
    );

    const tier = classifyTier(companyWithCoverage);
    const roleQuality = evaluateRoleQuality(companyWithCoverage);
    const interviewComplexity = evaluateInterviewComplexity(companyWithCoverage);
    const verificationDate = new Date().toISOString().slice(0, 10);
    const growthTrajectory = evaluateGrowthTrajectory(
      companyWithCoverage,
      roleQuality.level,
    );
    const opportunityPath = evaluateOpportunityPath(tier);

    const basis = {
      role_quality: roleQuality.level,
      role_quality_score: Number(roleQuality.score.toFixed(2)),
      role_quality_breakdown: {
        high_impact_roles: roleQuality.high,
        medium_impact_roles: roleQuality.medium,
        low_impact_roles: roleQuality.low,
        total_roles_evaluated: roleQuality.total,
      },
      growth_trajectory: growthTrajectory,
      skill_relevance:
        roleQuality.level === "high"
          ? "high"
          : roleQuality.level === "medium"
            ? "medium"
            : "low",
      interview_complexity: interviewComplexity,
      opportunity_path: opportunityPath,
    };

    const companyFieldConfidence = computeCompanyFieldConfidence(
      companyWithCoverage,
      roleQuality,
      interviewComplexity,
    );

    const sourceRefs = ensureSourceReferences(companyWithCoverage, verificationDate);
    const companyWithRefs = {
      ...companyWithCoverage,
      source_references: sourceRefs,
    };
    const sourceCoverage = sourceCoverageFromCount(sourceRefs.length);
    const sourceMix = countSourceTypes(sourceRefs);
    const interviewEvidence = summarizeInterviewEvidence(
      sourceRefs,
      verificationDate,
    );

    const canonicalCompanyName = resolveCompanyAlias(
      canonicalizeCompanyName(company.company_name),
    );
    const duplicateMatch = findDuplicateMatch(canonicalCompanyName, seenCompanies);
    const firstSeen = duplicateMatch
      ? seenCompanies.get(duplicateMatch.matchedKey)
      : null;
    const dedupCanonicalKey = duplicateMatch?.matchedKey || canonicalCompanyName;

    const existingRegistryEntry = existingRegistryByCanonical.get(dedupCanonicalKey);
    const baseCompanyId =
      firstSeen?.company_id ||
      existingRegistryEntry?.company_id ||
      company.company_id ||
      slugify(company.company_name);

    let companyId = baseCompanyId;
    if (firstSeen && (!company.company_id || company.company_id === firstSeen.company_id)) {
      companyId = `${slugify(company.company_name)}--dup-${firstSeen.count + 1}`;
    }

    if (firstSeen) {
      firstSeen.count += 1;
      firstSeen.aliases.add(company.company_name);
      firstSeen.occurrences.push({
        file,
        index: companyIndex + 1,
        company_name: company.company_name,
        company_id: companyId,
      });
      if (duplicateMatch.matchType) {
        firstSeen.match_types.add(duplicateMatch.matchType);
      }
    } else {
      seenCompanies.set(dedupCanonicalKey, {
        company_id: companyId,
        canonical_company_name: dedupCanonicalKey,
        primary_company_name: company.company_name,
        aliases: new Set([company.company_name]),
        first_seen_file: file,
        first_seen_index: companyIndex + 1,
        count: 1,
        occurrences: [
          {
            file,
            index: companyIndex + 1,
            company_name: company.company_name,
            company_id: companyId,
          },
        ],
        match_types: new Set(["exact"]),
      });
    }

    const duplicateMeta = seenCompanies.get(dedupCanonicalKey);
    const duplicateNameDetected = duplicateMeta.count > 1;
    const duplicateOfCompanyId = duplicateNameDetected
      ? duplicateMeta.company_id
      : null;

    const hasMinimumSourceRefs =
      sourceRefs.length >= INTERVIEW_MIN_RECENT_REVIEWS;
    const freshnessAgeDays = interviewEvidence.latest_review_date
      ? daysBetween(interviewEvidence.latest_review_date, verificationDate)
      : null;
    const staleInterviewEvidence =
      freshnessAgeDays === null || freshnessAgeDays > INTERVIEW_RECENCY_DAYS;
    const interviewGatePass = interviewEvidence.meets_policy && !staleInterviewEvidence;

    let overallConfidence = "low";
    if (hasMinimumSourceRefs && interviewGatePass) {
      overallConfidence = "high";
    } else if (sourceRefs.length > 0) {
      overallConfidence = "medium";
    }

    const blockerReasons = [];
    if (duplicateNameDetected) blockerReasons.push("duplicate_company_name");
    if (!hasMinimumSourceRefs) blockerReasons.push("missing_minimum_sources");
    if (!interviewGatePass) blockerReasons.push("stale_or_insufficient_interview_evidence");

    const derivedModerationStatus =
      blockerReasons.length > 0
        ? "needs-evidence-review"
        : "auto-generated-unreviewed";
    const moderationStatus =
      (company.crowd_data_governance?.moderation_status &&
        company.crowd_data_governance?.moderation_status !==
          "auto-generated-unreviewed" &&
        company.crowd_data_governance?.moderation_status) ||
      (company.moderation_status &&
        company.moderation_status !== "auto-generated-unreviewed" &&
        company.moderation_status) ||
      derivedModerationStatus;
    const duplicateFingerprint = `${dedupCanonicalKey}-${normalize(company.headquarters)}-${normalize(company.type)}`;

    const defaultCompanyVerificationStatus = interviewGatePass
      ? "verified_recent_multi_review"
      : "unverified";
    const existingCompanyVerificationStatus =
      company.data_evidence?.verification_status;
    const companyVerificationStatus =
      existingCompanyVerificationStatus &&
      existingCompanyVerificationStatus !== "unverified"
        ? existingCompanyVerificationStatus
        : defaultCompanyVerificationStatus;
    const defaultCompanyVerifierNotes = interviewGatePass
      ? "Interview evidence passes the policy gate (>=2 recent reviews within 6 months)."
      : "Interview evidence gate failed: add at least 2 interview reviews from the last 6 months.";

    if (blockerReasons.length > 0) {
      qualityGateViolations.push({
        file,
        company_name: company.company_name,
        company_id: companyId,
        canonical_company_name: dedupCanonicalKey,
        blocker_reasons: blockerReasons,
        source_references_count: sourceRefs.length,
        recent_review_count: interviewEvidence.recent_review_count,
        latest_review_date: interviewEvidence.latest_review_date,
      });
    }

    return {
      ...companyWithCoverage,
      schema_version: "levelsfyi-india-v1.2-source-gated",
      company_id: companyId,
      source_references: sourceRefs,
      roles: enrichRoles(
        companyWithRefs,
        companyWithRefs.roles,
        interviewComplexity,
        verificationDate,
      ),
      tier,
      tier_method_version: "v2.1-career-impact-role-based",
      tier_student_view: TIER_DEFINITIONS[tier].summary,
      time_validity: {
        effective_from: company.time_validity?.effective_from || verificationDate,
        effective_to: company.time_validity?.effective_to || null,
        last_verified_at: company.time_validity?.last_verified_at || verificationDate,
        stale_after_days: company.time_validity?.stale_after_days || 90,
      },
      compensation_normalization_defaults: {
        currency: "INR",
        pay_period: "annual",
        tax_regime_assumption: "new regime approximation",
        city_cost_index_reference: "internal_v1",
        includes_employer_pf: false,
      },
      level_normalization_reference: {
        method_version: "india-level-normalization-v1",
        notes:
          "Company-specific ladders are mapped to cross-company bands (L1/L2/L3/L4) for comparison; verify edge cases manually.",
      },
      india_pay_context: {
        tax_regime_assumption:
          company.india_pay_context?.tax_regime_assumption ||
          "new regime approximation",
        mandatory_deductions_assumption:
          company.india_pay_context?.mandatory_deductions_assumption ||
          "EPF/professional tax assumptions vary by employer and city",
        city_cost_index_method:
          company.india_pay_context?.city_cost_index_method ||
          "city-level adjustment not yet source-verified",
      },
      tier_criteria: {
        ...TIER_DEFINITIONS[tier],
        classification_basis:
          "role quality + growth trajectory + skill relevance + interview complexity + opportunity path",
      },
      tier_classification_basis: basis,
      tier_reason: buildReason(company, tier, basis),
      data_evidence: {
        source_references: sourceRefs,
        source_type_split: sourceMix,
        verification_status: companyVerificationStatus,
        verifier_notes:
          company.data_evidence?.verifier_notes ||
          defaultCompanyVerifierNotes,
        confidence_score_numeric:
          company.data_evidence?.confidence_score_numeric ||
          confidenceScoreFromLabel(overallConfidence),
        source_coverage: sourceCoverage,
        minimum_source_refs_required: INTERVIEW_MIN_RECENT_REVIEWS,
        interview_evidence_window: interviewEvidence,
        company_vs_community_provenance: {
          company_sourced_fields: [
            "headquarters",
            "india_locations",
            "type",
          ],
          community_sourced_fields: [
            "ctc_range",
            "interview_process",
            "offer_context",
          ],
          generated_fields: [
            "normalized_level_band",
            "compensation_normalized",
            "tier_classification_basis",
          ],
        },
      },
      crowd_data_governance: {
        submission_id:
          company.crowd_data_governance?.submission_id || `seed-${companyId}`,
        anonymized_submitter_id:
          company.crowd_data_governance?.anonymized_submitter_id ||
          "seed-generator",
        duplicate_fingerprint: duplicateFingerprint,
        canonical_company_name: dedupCanonicalKey,
        duplicate_name_detected: duplicateNameDetected,
        duplicate_match_type: duplicateMatch?.matchType || null,
        duplicate_match_score: duplicateMatch?.score || null,
        duplicate_instance_number: duplicateMeta.count,
        duplicate_of_company_id: duplicateOfCompanyId,
        moderation_status:
          company.crowd_data_governance?.moderation_status || moderationStatus,
        dispute_count: company.crowd_data_governance?.dispute_count || 0,
        pii_redacted:
          company.crowd_data_governance?.pii_redacted !== false,
      },
      field_confidence_labels: companyFieldConfidence,
      data_quality: {
        overall_confidence: overallConfidence,
        source_coverage: sourceCoverage,
        source_references_count: sourceRefs.length,
        interview_recency_gate: {
          min_recent_reviews: INTERVIEW_MIN_RECENT_REVIEWS,
          recency_days: INTERVIEW_RECENCY_DAYS,
          recent_review_count: interviewEvidence.recent_review_count,
          latest_review_date: interviewEvidence.latest_review_date,
          evidence_age_days: freshnessAgeDays,
          meets_requirement: interviewGatePass,
          status: interviewGatePass ? "pass" : "fail",
        },
        duplicate_name_gate: {
          canonical_company_name: dedupCanonicalKey,
          duplicate_name_detected: duplicateNameDetected,
          duplicate_of_company_id: duplicateOfCompanyId,
          duplicate_instance_number: duplicateMeta.count,
          match_type: duplicateMatch?.matchType || "none",
          match_score: duplicateMatch?.score || null,
          status: duplicateNameDetected ? "fail" : "pass",
        },
        source_minimum_gate: {
          min_source_references: INTERVIEW_MIN_RECENT_REVIEWS,
          current_source_references: sourceRefs.length,
          status: hasMinimumSourceRefs ? "pass" : "fail",
        },
        quality_gate_status: {
          interview_recency: interviewGatePass ? "pass" : "fail",
          unique_company_name: duplicateNameDetected ? "fail" : "pass",
          source_minimum: hasMinimumSourceRefs ? "pass" : "fail",
          publish_blocked: blockerReasons.length > 0,
        },
        publish_blockers: blockerReasons,
        confidence_scale: CONFIDENCE_SCALE,
        drift_prone_fields: [
          "roles[].levels[].ctc_range",
          "roles[].levels[].breakdown",
          "roles[].levels[].interview_process.rounds",
          "roles[].levels[].interview_process.steps",
          "titles[].levels",
        ],
        accuracy_note:
          "CTC, interview flow, and level ladders can drift by location, hiring cycle, and team. Treat low-confidence fields as directional until source-verified.",
      },
    };
  });

  writeFileSync(path, `${JSON.stringify(updated, null, 2)}\n`, "utf8");
  console.log("Updated", file, "companies:", updated.length);
}

const registry = {
  schema_version: "company-registry-v1",
  generated_at: new Date().toISOString(),
  total_unique_companies: seenCompanies.size,
  dedup_policy: {
    canonicalization:
      "lowercase + punctuation cleanup + legal suffix stripping + alias resolution",
    alias_entries: Object.keys(COMPANY_NAME_ALIASES).length,
    fuzzy_rules: {
      token_jaccard_threshold: DEDUP_TOKEN_JACCARD_THRESHOLD,
      max_levenshtein_distance: DEDUP_MAX_LEVENSHTEIN_DISTANCE,
      max_multi_token_levenshtein_distance:
        DEDUP_MAX_MULTI_TOKEN_LEVENSHTEIN_DISTANCE,
      max_length_gap: DEDUP_MAX_LENGTH_GAP,
      min_length_for_edit_fuzzy: DEDUP_MIN_LENGTH_FOR_EDIT_FUZZY,
      max_edit_ratio: DEDUP_MAX_EDIT_RATIO,
      short_name_max_levenshtein_distance: 0,
      short_name_edit_fuzzy_disabled: true,
    },
  },
  companies: Array.from(seenCompanies.values()).map((entry) => ({
    company_id: entry.company_id,
    canonical_company_name: entry.canonical_company_name,
    primary_company_name: entry.primary_company_name,
    aliases: Array.from(entry.aliases).sort(),
    first_seen_file: entry.first_seen_file,
    first_seen_index: entry.first_seen_index,
    total_occurrences: entry.count,
    duplicate_instances: Math.max(0, entry.count - 1),
    match_types: Array.from(entry.match_types).sort(),
    occurrences: entry.occurrences,
  })),
};
writeFileSync(COMPANY_REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`, "utf8");

const qualityGateReport = {
  schema_version: "company-quality-gate-v1",
  generated_at: new Date().toISOString(),
  enforce_publish_gate: ENFORCE_PUBLISH_GATE,
  policy: {
    min_recent_interview_reviews: INTERVIEW_MIN_RECENT_REVIEWS,
    interview_recency_days: INTERVIEW_RECENCY_DAYS,
    min_source_references: INTERVIEW_MIN_RECENT_REVIEWS,
  },
  totals: {
    evaluated_companies: processedCompaniesCount,
    failed_companies: qualityGateViolations.length,
    unique_companies: registry.total_unique_companies,
  },
  failures: qualityGateViolations,
};
writeFileSync(
  QUALITY_GATE_REPORT_PATH,
  `${JSON.stringify(qualityGateReport, null, 2)}\n`,
  "utf8",
);

if (ENFORCE_PUBLISH_GATE && qualityGateViolations.length > 0) {
  console.error(
    `Quality gate failed: ${qualityGateViolations.length} companies violated publish rules. See ${QUALITY_GATE_REPORT_PATH}`,
  );
  process.exit(1);
}
