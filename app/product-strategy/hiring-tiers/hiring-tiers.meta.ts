export type TierSummary = {
  id: string;
  label: string;
  range: string;
  supportingLabel: string;
};

export const tierSummaries: TierSummary[] = [
  {
    id: 'tier1',
    label: 'Tier‑1',
    range: '≥ ₹10 LPA',
    supportingLabel: 'Expand to load companies',
  },
  {
    id: 'tier2',
    label: 'Tier‑2',
    range: '₹4.5–10 LPA',
    supportingLabel: 'Expand to load companies',
  },
  {
    id: 'tier3',
    label: 'Tier‑3',
    range: '≤ ₹4.5 LPA',
    supportingLabel: 'Expand to load companies',
  },
];

export const tierColors: Record<string, {
  header: string; dot: string; chevron: string;
  companyBase: string; companyHover: string; companyOpen: string;
  buttonHover: string; openIndicator: string; detailBorder: string; detailBg: string;
}> = {
  tier1: {
    header: 'bg-emerald-50/70 dark:bg-emerald-900/25 border-emerald-200 dark:border-emerald-700',
    dot: 'bg-emerald-500',
    chevron: 'text-emerald-600 dark:text-emerald-400',
    companyBase: 'bg-white/75 dark:bg-gray-800/60 backdrop-blur-sm border-gray-100 dark:border-gray-700/60',
    companyHover: 'hover:bg-emerald-50/90 dark:hover:bg-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-200/40 dark:hover:shadow-emerald-900/30 hover:-translate-y-px',
    companyOpen: 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-600 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/40',
    buttonHover: 'hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20',
    openIndicator: 'bg-emerald-500',
    detailBorder: 'border-emerald-200/70 dark:border-emerald-700/50',
    detailBg: 'bg-emerald-50/60 dark:bg-emerald-950/30',
  },
  tier2: {
    header: 'bg-blue-50/70 dark:bg-blue-900/25 border-blue-200 dark:border-blue-700',
    dot: 'bg-blue-500',
    chevron: 'text-blue-600 dark:text-blue-400',
    companyBase: 'bg-white/75 dark:bg-gray-800/60 backdrop-blur-sm border-gray-100 dark:border-gray-700/60',
    companyHover: 'hover:bg-blue-50/90 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-200/40 dark:hover:shadow-blue-900/30 hover:-translate-y-px',
    companyOpen: 'bg-blue-50 dark:bg-blue-900/40 border-blue-300 dark:border-blue-600 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/40',
    buttonHover: 'hover:bg-blue-100/50 dark:hover:bg-blue-900/20',
    openIndicator: 'bg-blue-500',
    detailBorder: 'border-blue-200/70 dark:border-blue-700/50',
    detailBg: 'bg-blue-50/60 dark:bg-blue-950/30',
  },
  tier3: {
    header: 'bg-slate-100/70 dark:bg-slate-800/30 border-slate-200 dark:border-slate-600',
    dot: 'bg-slate-400',
    chevron: 'text-slate-500 dark:text-slate-400',
    companyBase: 'bg-white/75 dark:bg-gray-800/60 backdrop-blur-sm border-gray-100 dark:border-gray-700/60',
    companyHover: 'hover:bg-slate-100/90 dark:hover:bg-slate-700/40 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-slate-900/30 hover:-translate-y-px',
    companyOpen: 'bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-500 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/40',
    buttonHover: 'hover:bg-slate-200/50 dark:hover:bg-slate-700/30',
    openIndicator: 'bg-slate-500',
    detailBorder: 'border-slate-200/70 dark:border-slate-600/50',
    detailBg: 'bg-slate-50/60 dark:bg-slate-800/40',
  },
};

export type HiringCoreModule = {
  icon: string;
  title: string;
  detail: string;
};

export const coreModules: HiringCoreModule[] = [
  {
    icon: '📐',
    title: 'Aptitude Foundation',
    detail: 'Quants (Percentages, Time/Work, Profit/Loss), Logical (Puzzles, Seating), Verbal/Grammar/Essay',
  },
  {
    icon: '💻',
    title: 'Technical Basics',
    detail: 'Pseudo Code, C/C++/Java/Python fundamentals, OOPS, DBMS, OS, CN, SQL',
  },
  {
    icon: '🧩',
    title: 'Coding / DSA',
    detail: 'Easy-Medium (Arrays to Graphs); company-specific sets',
  },
  {
    icon: '🎮',
    title: 'Advanced / Gamified',
    detail: 'Games (Capgemini/Accenture), Behavioral/Psychometric',
  },
  {
    icon: '🎤',
    title: 'Interviews',
    detail: 'Technical (Projects + CS) + HR/MR + Mock sessions',
  },
  {
    icon: '🏢',
    title: 'Company-Specific Tracks',
    detail: 'TCS/Infosys mocks, Product DSA, etc.',
  },
];

export const eligibilitySummary =
  'Eligibility commonalities: 60-70%+ academics, no active backlogs, CSE/IT/ECE preferred. Drives peak Aug-March.';