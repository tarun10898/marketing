'use client';

import React, { useState } from 'react';
import { strategyPageThemes } from '@/app/config-layout/theme';
import {
  StrategyDetailPageShell,
  StrategySectionTitle,
} from '@/shared/components/strategy-page';


const globalCompetitors = [
  { rank: 1, platform: 'Coursera', provides: 'University courses, Professional Certificates, Degrees', pricing: 'Free audit; Plus: ~$59/mo or $399/yr', features: 'High-quality videos, readings, quizzes, peer assignments, personal notes, progress tracking', model: 'Institution + Company Partnership' },
  { rank: 2, platform: 'Udemy', provides: '250,000+ practical courses', pricing: 'Pay-per-course ($10–$20 on sale); Lifetime', features: 'Videos, downloadable resources, quizzes, personal note-taking, Q&A', model: 'Marketplace' },
  { rank: 3, platform: 'edX', provides: 'Top university courses (Harvard, MIT)', pricing: 'Free to audit; Certificates $50–$300', features: 'Videos, readings, quizzes, assignments, forums, limited notes', model: 'University-led' },
  { rank: 4, platform: 'LinkedIn Learning', provides: 'Professional & business skills', pricing: '~$30–$40/mo', features: 'Videos, course notes, quizzes, bookmarks, certificates', model: 'Expert-curated' },
  { rank: 5, platform: 'Khan Academy', provides: 'K-12 & foundational subjects', pricing: 'Completely Free', features: 'Videos, articles, interactive exercises, mastery quizzes', model: 'Non-profit team + Volunteers' },
  { rank: 6, platform: 'Skillshare', provides: 'Creative, design, marketing classes', pricing: '~$32/mo or $168/yr', features: 'Short videos, project files, community feedback', model: 'Marketplace (Independent creators)' },
  { rank: 7, platform: 'MasterClass', provides: 'Celebrity & expert-led classes', pricing: '$15–$180/yr', features: 'Premium videos, workbooks/PDF notes, class guides', model: 'Celebrity/Expert Studio Production' },
  { rank: 8, platform: 'Pluralsight', provides: 'Tech, IT, software & creative training', pricing: '~$29–$49/mo', features: 'Videos, skill assessments, path quizzes, note-taking', model: 'Expert instructors (Curated tech professionals)' },
  { rank: 9, platform: 'Udacity', provides: 'Nanodegrees in AI, tech, data', pricing: '$200–$400+/mo', features: 'Videos, projects, quizzes, code workspaces, mentor support', model: 'Company + Expert team' },
  { rank: 10, platform: 'Thinkific', provides: 'Course creation & selling platform', pricing: 'Free; from $49/mo (for creators)', features: 'Videos, quizzes, downloads, note-taking (creator dependent)', model: 'Creator platform' },
  { rank: 11, platform: 'Teachable', provides: 'Easy online course creation & sales', pricing: 'Free; from $39–$59/mo', features: 'Videos, quizzes, downloads (creator dependent)', model: 'Creator platform' },
  { rank: 12, platform: 'FutureLearn', provides: 'University courses (mainly UK/Europe)', pricing: 'Free; Certificates paid', features: 'Videos, articles, quizzes, discussions, note-taking', model: 'University & Organisation Partnership' },
  { rank: 13, platform: 'Codecademy', provides: 'Interactive coding & programming', pricing: '~$20–$40/mo', features: 'Interactive lessons, code exercises, quizzes, projects', model: 'In-house curriculum team' },
  { rank: 14, platform: 'DataCamp', provides: 'Data science, analytics, programming', pricing: '~$25–$35/mo', features: 'Videos + interactive coding, quizzes, projects, flashcards', model: 'In-house + Expert instructors' },
  { rank: 15, platform: 'Domestika', provides: 'Creative skills (design, arts)', pricing: 'Pay-per-course or subscription', features: 'Videos, resource files, community projects', model: 'Marketplace (Independent creative professionals)' },
  { rank: 16, platform: 'Alison', provides: 'Free certificate & diploma courses', pricing: 'Free; Premium low cost', features: 'Videos, quizzes, assessments', model: 'In-house + Partner organizations' },
  { rank: 17, platform: 'Google Career Certificates', provides: 'Job-ready certs (IT, Data, UX)', pricing: 'Included in Coursera Plus', features: 'Videos, quizzes, hands-on projects, notes', model: 'Company-created (Google)' },
  { rank: 18, platform: 'MIT OpenCourseWare', provides: 'Free full MIT course materials', pricing: 'Completely Free', features: 'Lecture videos, PDF notes, assignments, exams', model: 'University Open Resources (MIT faculty)' },
  { rank: 19, platform: 'Harvard Online / HarvardX', provides: 'Harvard courses & programs', pricing: 'Varies (mostly via edX/Coursera)', features: 'Videos, readings, quizzes, assignments', model: 'University-led (Harvard faculty)' },
  { rank: 20, platform: 'LearnWorlds', provides: 'All-in-one course creation & school platform', pricing: 'From $24–$29/mo', features: 'Videos, interactive eBooks, quizzes, flashcards, notes', model: 'Creator platform' },
  { rank: 21, platform: 'Kajabi', provides: 'All-in-one for creators (courses + marketing)', pricing: 'From ~$89–$149+/mo', features: 'Videos, quizzes, downloads (creator dependent)', model: 'Creator platform' },
  { rank: 22, platform: 'Podia', provides: 'Simple courses, downloads, memberships', pricing: 'From $33–$39/mo', features: 'Videos, downloads, basic quizzes', model: 'Creator platform' },
  { rank: 23, platform: 'Moodle', provides: 'Open-source LMS', pricing: 'Free (self-hosted)', features: 'Highly customizable: videos, quizzes, forums, notes', model: 'Self-hosted / Institutional' },
  { rank: 24, platform: 'Canvas', provides: 'LMS for schools & universities', pricing: 'Institutional', features: 'Videos, quizzes, assignments, discussion', model: 'Institutional' },
  { rank: 25, platform: 'TalentLMS', provides: 'Corporate training & small business LMS', pricing: 'Free plan; from ~$69/mo', features: 'Videos, quizzes, SCORM, gamification', model: 'Company / Admin-created' },
  { rank: 26, platform: 'Blackboard', provides: 'Enterprise LMS for higher education', pricing: 'Institutional', features: 'Videos, quizzes, assignments, gradebook', model: 'Institutional' },
  { rank: 27, platform: 'Docebo', provides: 'AI-powered corporate LMS', pricing: 'Custom enterprise', features: 'Videos, quizzes, AI features', model: 'Enterprise / Corporate-created' },
  { rank: 28, platform: 'iSpring Learn', provides: 'Corporate e-learning & authoring', pricing: 'From ~$6–$7/user/mo', features: 'Videos, quizzes, interactive content', model: 'Corporate authoring' },
  { rank: 29, platform: 'Mindvalley', provides: 'Personal growth & wellness', pricing: 'Subscription (varies)', features: 'Videos, quests, community', model: 'Curated expert teachers' },
  { rank: 30, platform: 'FreeCodeCamp', provides: 'Free coding & web development', pricing: 'Completely Free', features: 'Interactive lessons, projects, certifications', model: 'Non-profit + Community contributors' },
  { rank: 31, platform: 'Coursera for Business', provides: 'Enterprise upskilling', pricing: 'Custom', features: 'Same as Coursera + admin tools', model: 'Institution + Company' },
  { rank: 32, platform: 'Udemy Business', provides: 'Curated business library', pricing: 'From ~$360/user/yr', features: 'Same as Udemy + analytics', model: 'Marketplace + Curated' },
  { rank: 33, platform: 'LinkedIn Learning for Teams', provides: 'Professional development for organizations', pricing: 'Custom', features: 'Same as LinkedIn Learning + team features', model: 'Expert-curated' },
  { rank: 34, platform: 'Simplilearn', provides: 'Bootcamps & certifications', pricing: 'Varies per program', features: 'Videos, live classes, projects', model: 'Company-led bootcamps' },
  { rank: 35, platform: 'Great Learning', provides: 'Tech & management programs (India)', pricing: 'Varies', features: 'Videos, projects, mentorship', model: 'Company + University tie-ups' },
  { rank: 36, platform: 'Scaler', provides: 'Tech career tracks & mentorship (India)', pricing: 'Paid programs', features: 'Live classes, 1:1 mentorship, projects', model: 'Company-led with mentors' },
  { rank: 37, platform: 'upGrad', provides: 'University-backed degrees & certifications', pricing: 'Varies per program', features: 'Videos, live sessions, projects', model: 'University + Company Partnership' },
  { rank: 38, platform: "BYJU'S", provides: 'K-12 & test prep (India)', pricing: 'Subscription-based', features: 'Videos, animations, quizzes, adaptive learning', model: 'In-house content team' },
  { rank: 39, platform: 'Unacademy', provides: 'Live classes & test prep (India)', pricing: 'Subscription', features: 'Live + recorded classes, tests', model: 'Educator + Company' },
  { rank: 40, platform: 'Class Central', provides: 'Aggregator for MOOCs', pricing: 'Free', features: 'Search & links only', model: 'Aggregator (No own content)' },
  { rank: 41, platform: 'edX for Business', provides: 'Enterprise university content', pricing: 'Custom', features: 'Same as edX', model: 'University Partnership' },
  { rank: 42, platform: 'Skillsoft', provides: 'Compliance & business skills', pricing: 'Enterprise pricing', features: 'Videos, courses, books', model: 'Curated corporate content' },
  { rank: 43, platform: 'Cornerstone OnDemand', provides: 'Enterprise talent & learning management', pricing: 'Custom', features: 'Full LMS features', model: 'Enterprise' },
  { rank: 44, platform: 'Saba Cloud', provides: 'Modern cloud LMS', pricing: 'Custom', features: 'Videos, learning paths', model: 'Enterprise' },
  { rank: 45, platform: '360Learning', provides: 'Collaborative & employee-generated learning', pricing: 'Custom', features: 'User-generated + admin content', model: 'Collaborative / Enterprise' },
  { rank: 46, platform: 'Litmos', provides: 'Salesforce LMS for sales & compliance', pricing: 'Custom', features: 'Videos, quizzes', model: 'Enterprise' },
  { rank: 47, platform: 'Absorb LMS', provides: 'Modern corporate LMS', pricing: 'Custom', features: 'Videos, gamification', model: 'Enterprise' },
  { rank: 48, platform: 'Articulate 360', provides: 'E-learning authoring tool', pricing: '~$1,400/yr', features: 'Authoring tool (you create courses)', model: 'Authoring tool for creators' },
  { rank: 49, platform: 'ProProfs Training Maker', provides: 'Easy training & quiz platform', pricing: 'From ~$2/user/mo', features: 'Quizzes, videos, training', model: 'Creator / Corporate' },
  { rank: 50, platform: 'LearnDash (WordPress)', provides: 'WordPress LMS plugin', pricing: 'One-time ~$199+', features: 'Videos, quizzes, drip content (you control)', model: 'Self-hosted Creator' },
];

const indianCompetitors = [
  { rank: 1, platform: 'Scaler', provides: 'Full Stack, DSA, System Design', pricing: '₹3,69,000 – ₹4,00,000', features: 'Live classes, 1:1 mentorship, projects, mock interviews', model: 'Company-led with mentors', duration: '1 Year (extendable)' },
  { rank: 2, platform: 'Coding Ninjas', provides: 'Full Stack, DSA, Competitive Programming', pricing: '₹75,000 – ₹1,25,000', features: 'Videos, live classes, contests, doubt support', model: 'Company + Expert instructors', duration: '1 Year' },
  { rank: 3, platform: 'Masai School', provides: 'Full Stack, Backend, Software Engineering', pricing: '₹0 upfront (Pay After Placement) → ₹2.5L – ₹4.5L', features: 'Intensive live cohort, projects, job guarantee', model: 'Company-led bootcamp', duration: 'Program duration + Placement' },
  { rank: 4, platform: 'Newton School', provides: 'Full Stack + DSA', pricing: '₹1,50,000 – ₹3,00,000 or ISA', features: 'Live classes, projects, placement focus', model: 'Company-led with mentors', duration: '1 Year' },
  { rank: 5, platform: 'AlmaBetter', provides: 'Full Stack Web Dev, Data Science', pricing: '₹1,50,000 – ₹2,80,000 or ISA', features: 'Project-based, mentorship', model: 'Company + Expert instructors', duration: '1 Year' },
  { rank: 6, platform: 'GUVI', provides: 'Full Stack, MERN, Java, Python', pricing: '₹15,000 – ₹80,000', features: 'Videos, live sessions, projects', model: 'Company + Expert instructors', duration: '1 Year' },
  { rank: 7, platform: 'upGrad', provides: 'Full Stack, DevOps, Cloud', pricing: '₹1,80,000 – ₹4,50,000', features: 'Videos, live classes, university cert', model: 'University + Company Partnership', duration: '1 – 2 Years' },
  { rank: 8, platform: 'Simplilearn', provides: 'Full Stack, Java, Python, DevOps', pricing: '₹40,000 – ₹2,00,000', features: 'Videos, live classes, labs', model: 'Company-led bootcamps', duration: '1 Year' },
  { rank: 9, platform: 'Great Learning', provides: 'Software Engineering, Full Stack', pricing: '₹1,80,000 – ₹4,00,000', features: 'Videos, projects, mentorship', model: 'Company + University tie-ups', duration: '1 Year' },
  { rank: 10, platform: 'NxtWave (CCBP)', provides: 'MERN / Java Full Stack', pricing: '₹49,000 – ₹90,000 (Prepaid / Postpaid)', features: 'Intensive curriculum, projects', model: 'Company-led', duration: '1 Year' },
  { rank: 11, platform: 'Apna College', provides: 'Java, DSA, MERN', pricing: '₹6,000 – ₹15,000', features: 'Live classes, notes, doubt support', model: 'Educator-led + Company', duration: '1 Year' },
  { rank: 12, platform: 'Coding Blocks', provides: 'DSA, Web Development', pricing: '₹20,000 – ₹1,20,000', features: 'Live + recorded, projects', model: 'Company + Expert instructors', duration: '1 Year' },
  { rank: 13, platform: 'Tutedude', provides: 'MERN, Python, DSA, Full Stack', pricing: '₹699 per course (100% Refund on completion)', features: 'Videos, projects, assignments', model: 'Company + Expert instructors', duration: 'Lifetime' },
  { rank: 14, platform: 'Pepcoding', provides: 'Java DSA, Web Development', pricing: '₹20,000 – ₹85,000', features: 'Live classes, strong DSA focus', model: 'Educator-led', duration: '1 Year' },
  { rank: 15, platform: 'PW Skills', provides: 'MERN Full Stack, DSA', pricing: '₹7,000 – ₹40,000', features: 'Videos, live classes', model: 'Educator + Company', duration: '1 – 2 Years' },
  { rank: 16, platform: 'NIIT', provides: 'Full Stack with GenAI', pricing: '₹60,000 – ₹3,00,000', features: 'Structured programs, certifications', model: 'Institutional + Company', duration: '1 Year' },
  { rank: 17, platform: 'Learnbay', provides: 'Full Stack, AI', pricing: '₹90,000 – ₹2,80,000', features: 'Live classes, domain-specialized', model: 'Company-led', duration: '1 – 2 Years' },
  { rank: 18, platform: 'Intellipaat', provides: 'Full Stack MERN, DevOps', pricing: '₹35,000 – ₹1,60,000', features: 'Videos, live sessions, projects', model: 'Company-led bootcamps', duration: '1 Year (Lifetime in some)' },
  { rank: 19, platform: 'Edureka', provides: 'Full Stack, Java, Python', pricing: '₹25,000 – ₹1,30,000', features: 'Live classes, certifications', model: 'Company + Expert instructors', duration: '1 Year' },
  { rank: 20, platform: 'Hero Vired', provides: 'Full Stack, Software Engineering', pricing: '₹1,80,000 – ₹3,50,000', features: 'High-quality projects', model: 'Company-led (Hero Group)', duration: '1 Year' },
  { rank: 21, platform: 'Internshala Trainings', provides: 'Full Stack Development', pricing: '₹35,000 – ₹50,000', features: 'Placement-oriented, structured', model: 'Company + Expert instructors', duration: '1 Year' },
  { rank: 22, platform: 'WebStack Academy', provides: 'Full Stack MERN', pricing: '₹80,000 – ₹2,00,000', features: 'Immersive training', model: 'Company-led', duration: '1 Year' },
  { rank: 23, platform: 'Sharpener Tech', provides: 'Full Stack Development', pricing: 'Pay After Placement', features: 'Live, job-focused', model: 'Company-led bootcamp', duration: 'Program duration' },
  { rank: 24, platform: 'InterviewBit', provides: 'DSA + Full Stack', pricing: '₹10,000 – ₹60,000', features: 'Coding practice', model: 'Company-led', duration: '1 Year' },
  { rank: 25, platform: 'GeeksforGeeks', provides: 'DSA Self-Paced, Full Stack', pricing: '₹4,000 – ₹25,000', features: 'Videos + heavy practice', model: 'Company + Expert content', duration: '1 Year' },
  { rank: 26, platform: 'Logicmojo', provides: 'DSA + System Design', pricing: '₹40,000 – ₹1,20,000', features: 'Live, interview-focused', model: 'Expert-led', duration: '1 Year' },
  { rank: 27, platform: 'Naresh IT', provides: 'Full Stack Java/.NET', pricing: '₹25,000 – ₹80,000', features: 'Classroom + Online', model: 'Institutional', duration: '1 Year' },
  { rank: 28, platform: 'Besant Technologies', provides: 'Full Stack, Java, Python', pricing: '₹30,000 – ₹90,000', features: 'Live training', model: 'Company-led', duration: '1 Year' },
  { rank: 29, platform: 'Codegnan', provides: 'Full Stack Developer', pricing: '₹40,000 – ₹80,000', features: '100-day intensive', model: 'Company-led', duration: '1 Year' },
  { rank: 30, platform: 'Imarticus Learning', provides: 'Full Stack', pricing: '₹1,00,000 – ₹2,50,000', features: 'Blended learning', model: 'Company-led', duration: '1 Year' },
  { rank: 31, platform: 'Cynohub', provides: 'Full Stack, Java, Python', pricing: '₹30,000 – ₹90,000', features: 'Project-based', model: 'Company-led', duration: '1 Year' },
  { rank: 32, platform: 'WsCube Tech', provides: 'Full Stack Web Development', pricing: '₹12,000 – ₹45,000', features: 'Practical courses', model: 'Company + Expert instructors', duration: 'Lifetime' },
  { rank: 33, platform: 'The Hacking School', provides: 'Full Stack Web & App Dev', pricing: '₹80,000 – ₹2,00,000', features: 'Bootcamp style', model: 'Company-led bootcamp', duration: '1 Year' },
  { rank: 34, platform: 'FunctionUp', provides: 'Full Stack, DSA', pricing: '₹60,000 – ₹1,50,000', features: 'Placement-focused', model: 'Company-led', duration: '1 Year' },
  { rank: 35, platform: 'DataFlair', provides: 'Full Stack', pricing: '₹25,000 – ₹80,000', features: 'Bootcamps', model: 'Company-led', duration: '1 Year' },
  { rank: 36, platform: 'Groot Academy', provides: 'Full Stack, Python, Java', pricing: '₹20,000 – ₹70,000', features: 'Practical training', model: 'Company-led', duration: '1 Year' },
  { rank: 37, platform: 'Mindmajix', provides: 'Full Stack', pricing: '₹25,000 – ₹1,00,000', features: 'Live training', model: 'Company-led', duration: '1 Year (Lifetime in some)' },
  { rank: 38, platform: 'Credo Systemz', provides: 'MERN / MEAN Full Stack', pricing: '₹35,000 – ₹90,000', features: 'Certifications', model: 'Company-led', duration: '1 Year' },
  { rank: 39, platform: 'Uncodemy', provides: 'Full Stack Development', pricing: '₹15,000 – ₹60,000', features: 'Practical + projects', model: 'Company-led', duration: '1 Year' },
  { rank: 40, platform: 'Tech Altum', provides: 'Full Stack, Java, Python', pricing: '₹25,000 – ₹75,000', features: 'Classroom & online', model: 'Company-led', duration: '1 Year' },
  { rank: 41, platform: 'IT Training Hub', provides: 'Full Stack', pricing: '₹20,000 – ₹60,000', features: 'Hands-on training', model: 'Company-led', duration: '1 Year' },
  { rank: 42, platform: 'Aptech', provides: 'Software Engineering', pricing: '₹50,000 – ₹1,50,000', features: 'Structured programs', model: 'Institutional', duration: '1 Year' },
  { rank: 43, platform: 'Jetking', provides: 'Full Stack', pricing: '₹40,000 – ₹1,20,000', features: 'Blended learning', model: 'Company-led', duration: '1 Year' },
  { rank: 44, platform: 'IIHT', provides: 'Full Stack Development', pricing: '₹35,000 – ₹1,00,000', features: 'Job-oriented', model: 'Institutional', duration: '1 Year' },
  { rank: 45, platform: 'L&T EduTech', provides: 'Software Engineering', pricing: '₹1,50,000 – ₹4,00,000', features: 'Industry-backed', model: 'Corporate + Company', duration: '1 – 2 Years' },
  { rank: 46, platform: 'Jaro Education', provides: 'Full Stack (University tie-up)', pricing: '₹1,00,000 – ₹3,50,000', features: 'Online + certifications', model: 'University Partnership', duration: '1 – 2 Years' },
  { rank: 47, platform: 'Skill-Lync', provides: 'Software Development', pricing: '₹80,000 – ₹2,50,000', features: 'Project-heavy', model: 'Company-led', duration: '1 Year' },
  { rank: 48, platform: 'Entri', provides: 'Full Stack (Kerala focus)', pricing: '₹20,000 – ₹80,000', features: 'Live + recorded', model: 'Company-led', duration: '1 Year' },
  { rank: 49, platform: 'Pantech e-Learning', provides: 'Full Stack + Embedded', pricing: '₹15,000 – ₹60,000', features: 'Technical courses', model: 'Company-led', duration: '1 Year' },
  { rank: 50, platform: 'Ekeeda', provides: 'Programming courses', pricing: '₹8,000 – ₹40,000', features: 'Video-based', model: 'Company + Educator', duration: '1 Year' },
];

const contentModels = [
  { name: 'Marketplace', desc: 'Anyone (independent instructors) can create and sell their own courses. Example: Udemy, Skillshare.' },
  { name: 'University-led', desc: 'Courses are created by professors and universities. High academic quality.' },
  { name: 'Institution + Company Partnership', desc: 'Universities and big companies (like Google, IBM) jointly create the courses.' },
  { name: 'Expert-curated', desc: 'Platform selects experienced professionals/experts to create high-quality courses.' },
  { name: 'In-house curriculum team', desc: 'The company itself hires a team to create all the courses.' },
  { name: 'Company-created', desc: 'A single company (e.g. Google) creates all the courses.' },
  { name: 'Creator platform', desc: 'Platform gives tools so that you can create and sell your own courses (for teachers/creators).' },
  { name: 'University Open Resources', desc: 'Free course materials directly released by the university (no certificate usually).' },
  { name: 'Non-profit team + Volunteers', desc: 'Created by a non-profit organization with help from volunteers.' },
  { name: 'Celebrity/Expert Studio Production', desc: 'High-production courses taught by famous celebrities or top experts.' },
  { name: 'Company-led bootcamps', desc: 'Company designs intensive job-oriented training programs.' },
  { name: 'Aggregator', desc: 'Does not create any content. Only collects and shows courses from other platforms.' },
  { name: 'Self-hosted Creator', desc: 'You install the software on your own website and fully control content creation.' },
  { name: 'Enterprise / Corporate', desc: 'Designed for companies to create and manage training for their employees.' },
  { name: 'Collaborative / Enterprise', desc: 'Employees or users inside a company can also create and share learning content.' },
  { name: 'Authoring tool for creators', desc: 'Software/tool used to build courses (not a learning platform itself).' },
];

export default function CompetitorScanPage() {
  const pageTheme = strategyPageThemes.competitorScan;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'global' | 'indian' | 'glossary'>('global');
  const [expandedGlobal, setExpandedGlobal] = useState<number | null>(null);
  const [expandedIndian, setExpandedIndian] = useState<number | null>(null);

  const filteredGlobal = globalCompetitors.filter((c) =>
    c.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.features.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.provides.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIndian = indianCompetitors.filter((c) =>
    c.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.features.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.provides.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGlossary = contentModels.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (tab: 'global' | 'indian' | 'glossary') => {
    setActiveTab(tab);
  };

  return (
    <StrategyDetailPageShell
      current="Competitor Scan"
      badge="Stage 1"
      title="Competitor Scan"
      description="50 global and 50 Indian learning platforms analysed across pricing, features, and content-creation models to identify where EasyLoops can lead."
      breadcrumbLinkClassName={pageTheme.breadcrumbLinkClassName}
      introBadgeClassName={pageTheme.introBadgeClassName}
      navLinkClassName={pageTheme.navLinkClassName}
      leftNav={{ href: '/product-strategy', label: '← Back to Strategy Overview' }}
      rightNav={{ href: '/product-strategy/positioning', label: 'Position · Promotion · Price →' }}
      footerMessage="EasyLoops. Internal strategy document."
      mainClassName="max-w-7xl"
      introDescriptionClassName="max-w-2xl"
    >
      {/* Search Input */}
      <div className="relative mb-8 max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted/80 dark:text-ink-dark-muted/70">
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search platform name, features, model..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-10 py-2.5 border border-white/60 dark:border-border-dark/40 rounded-xl bg-white/40 dark:bg-surface-dark/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-primary/60 dark:focus:ring-primary-dark/60 focus:border-transparent text-sm text-ink dark:text-ink-dark placeholder-ink-muted/60 dark:placeholder-ink-dark-muted/60 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-muted/60 hover:text-ink dark:text-ink-dark-muted/65 dark:hover:text-ink-dark transition-colors"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Modern Tabs Bar */}
      <div className="flex border-b border-border/40 dark:border-border-dark/40 mb-8 gap-2 overflow-x-auto pb-px scrollbar-none">
        <button
          onClick={() => handleTabChange('global')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
            activeTab === 'global'
              ? 'border-primary text-primary dark:border-primary-dark dark:text-primary-dark bg-primary-soft/10 dark:bg-primary-dark/5'
              : 'border-transparent text-ink-muted dark:text-ink-dark-muted hover:text-ink dark:hover:text-ink-dark'
          }`}
        >
          Global Platforms ({filteredGlobal.length})
        </button>
        <button
          onClick={() => handleTabChange('indian')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
            activeTab === 'indian'
              ? 'border-secondary text-secondary dark:border-secondary-dark dark:text-secondary-dark bg-secondary-soft/10 dark:bg-secondary-dark/5'
              : 'border-transparent text-ink-muted dark:text-ink-dark-muted hover:text-ink dark:hover:text-ink-dark'
          }`}
        >
          Indian Platforms ({filteredIndian.length})
        </button>
        <button
          onClick={() => handleTabChange('glossary')}
          className={`px-4 py-2 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
            activeTab === 'glossary'
              ? 'border-primary-soft text-ink dark:text-ink-dark bg-surface/20 dark:bg-surface-dark-subtle/20'
              : 'border-transparent text-ink-muted dark:text-ink-dark-muted hover:text-ink dark:hover:text-ink-dark'
          }`}
        >
          Content Models Glossary ({filteredGlossary.length})
        </button>
      </div>

      {/* Global Competitors Tab Content */}
      <section className={`mb-16 ${activeTab === 'global' ? '' : 'hidden'}`}>
        <StrategySectionTitle title="Global Competitors" accentClassName="bg-primary" />
        <div className="overflow-hidden rounded-2xl shadow-md border border-white/60 dark:border-border-dark/45 bg-white/35 dark:bg-surface-dark/35 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-border/20 dark:divide-border-dark/20">
              <thead>
                <tr className="bg-primary-soft/45 dark:bg-primary/15 text-left">
                  <th className="px-4 py-3.5 font-bold text-primary dark:text-primary-dark w-12 text-center">#</th>
                  <th className="px-4 py-3.5 font-bold text-primary dark:text-primary-dark">Platform</th>
                  <th className="px-4 py-3.5 font-bold text-primary dark:text-primary-dark">Pricing</th>
                  <th className="px-4 py-3.5 font-bold text-primary dark:text-primary-dark hidden md:table-cell">Content Model</th>
                  <th className="px-4 py-3.5 font-bold text-primary dark:text-primary-dark text-right w-24">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 dark:divide-border-dark/20">
                {filteredGlobal.map((c) => {
                  const isExpanded = expandedGlobal === c.rank;
                  return (
                    <React.Fragment key={`g-${c.rank}`}>
                      <tr
                        onClick={() => setExpandedGlobal(isExpanded ? null : c.rank)}
                        className={`cursor-pointer transition-colors duration-150 ${
                          isExpanded 
                            ? 'bg-primary-soft/20 dark:bg-primary-dark/10' 
                            : 'odd:bg-white/40 even:bg-surface-subtle/40 dark:odd:bg-surface-dark/25 dark:even:bg-surface-dark-subtle/25 hover:bg-primary-soft/10 dark:hover:bg-primary/8'
                        }`}
                      >
                        <td className="px-4 py-3.5 text-center text-ink-muted/70 dark:text-ink-dark-muted/60 font-mono text-xs">{c.rank}</td>
                        <td className="px-4 py-3.5 font-bold text-ink dark:text-ink-dark whitespace-nowrap">{c.platform}</td>
                        <td className="px-4 py-3.5 text-ink-muted dark:text-ink-dark-muted font-medium">{c.pricing}</td>
                        <td className="px-4 py-3.5 text-ink-muted dark:text-ink-dark-muted hidden md:table-cell">{c.model}</td>
                        <td className="px-4 py-3.5 text-right">
                          <button 
                            className="inline-flex items-center justify-center p-1 rounded-lg hover:bg-white/70 dark:hover:bg-surface-dark/50 text-primary dark:text-primary-dark transition-all duration-200"
                            aria-label="Toggle details"
                          >
                            <svg 
                              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-primary-soft/10 dark:bg-primary-dark/5">
                          <td colSpan={5} className="px-6 py-4 border-t border-border/20 dark:border-border-dark/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white/50 dark:bg-surface-dark-subtle/40 p-3 rounded-xl border border-white/50 dark:border-border-dark/30">
                                <span className="text-[10px] font-bold text-primary dark:text-primary-dark uppercase tracking-wider block mb-1">What It Provides</span>
                                <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{c.provides}</p>
                              </div>
                              <div className="bg-white/50 dark:bg-surface-dark-subtle/40 p-3 rounded-xl border border-white/50 dark:border-border-dark/30">
                                <span className="text-[10px] font-bold text-primary dark:text-primary-dark uppercase tracking-wider block mb-1">Learning Resources & Features</span>
                                <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{c.features}</p>
                              </div>
                              <div className="md:col-span-2 md:hidden bg-white/50 dark:bg-surface-dark-subtle/40 p-3 rounded-xl border border-white/50 dark:border-border-dark/30">
                                <span className="text-[10px] font-bold text-primary dark:text-primary-dark uppercase tracking-wider block mb-1">Content Model</span>
                                <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{c.model}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredGlobal.length === 0 && (
            <div className="text-center py-12 bg-white/10">
              <p className="text-ink-muted dark:text-ink-dark-muted text-sm">No global platforms match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Indian Competitors Tab Content */}
      <section className={`mb-16 ${activeTab === 'indian' ? '' : 'hidden'}`}>
        <StrategySectionTitle title="Indian Competitors" accentClassName="bg-secondary" />
        <div className="overflow-hidden rounded-2xl shadow-md border border-white/60 dark:border-border-dark/45 bg-white/35 dark:bg-surface-dark/35 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-border/20 dark:divide-border-dark/20">
              <thead>
                <tr className="bg-secondary-soft/45 dark:bg-secondary/15 text-left">
                  <th className="px-4 py-3.5 font-bold text-secondary dark:text-secondary-dark w-12 text-center">#</th>
                  <th className="px-4 py-3.5 font-bold text-secondary dark:text-secondary-dark">Platform</th>
                  <th className="px-4 py-3.5 font-bold text-secondary dark:text-secondary-dark">Pricing (2026)</th>
                  <th className="px-4 py-3.5 font-bold text-secondary dark:text-secondary-dark hidden sm:table-cell">Duration</th>
                  <th className="px-4 py-3.5 font-bold text-secondary dark:text-secondary-dark text-right w-24">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 dark:divide-border-dark/20">
                {filteredIndian.map((c) => {
                  const isExpanded = expandedIndian === c.rank;
                  return (
                    <React.Fragment key={`i-${c.rank}`}>
                      <tr
                        onClick={() => setExpandedIndian(isExpanded ? null : c.rank)}
                        className={`cursor-pointer transition-colors duration-150 ${
                          isExpanded 
                            ? 'bg-secondary-soft/20 dark:bg-secondary-dark/10' 
                            : 'odd:bg-white/40 even:bg-surface-subtle/40 dark:odd:bg-surface-dark/25 dark:even:bg-surface-dark-subtle/25 hover:bg-secondary-soft/10 dark:hover:bg-secondary/8'
                        }`}
                      >
                        <td className="px-4 py-3.5 text-center text-ink-muted/70 dark:text-ink-dark-muted/60 font-mono text-xs">{c.rank}</td>
                        <td className="px-4 py-3.5 font-bold text-ink dark:text-ink-dark whitespace-nowrap">{c.platform}</td>
                        <td className="px-4 py-3.5 text-ink-muted dark:text-ink-dark-muted font-medium">{c.pricing}</td>
                        <td className="px-4 py-3.5 text-ink-muted dark:text-ink-dark-muted hidden sm:table-cell">{c.duration}</td>
                        <td className="px-4 py-3.5 text-right">
                          <button 
                            className="inline-flex items-center justify-center p-1 rounded-lg hover:bg-white/70 dark:hover:bg-surface-dark/50 text-secondary dark:text-secondary-dark transition-all duration-200"
                            aria-label="Toggle details"
                          >
                            <svg 
                              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-secondary-soft/10 dark:bg-secondary-dark/5">
                          <td colSpan={5} className="px-6 py-4 border-t border-border/20 dark:border-border-dark/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white/50 dark:bg-surface-dark-subtle/40 p-3 rounded-xl border border-white/50 dark:border-border-dark/30">
                                <span className="text-[10px] font-bold text-secondary dark:text-secondary-dark uppercase tracking-wider block mb-1">What It Provides</span>
                                <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{c.provides}</p>
                              </div>
                              <div className="bg-white/50 dark:bg-surface-dark-subtle/40 p-3 rounded-xl border border-white/50 dark:border-border-dark/30">
                                <span className="text-[10px] font-bold text-secondary dark:text-secondary-dark uppercase tracking-wider block mb-1">Features</span>
                                <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{c.features}</p>
                              </div>
                              <div className="bg-white/50 dark:bg-surface-dark-subtle/40 p-3 rounded-xl border border-white/50 dark:border-border-dark/30">
                                <span className="text-[10px] font-bold text-secondary dark:text-secondary-dark uppercase tracking-wider block mb-1">Content Model</span>
                                <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{c.model}</p>
                              </div>
                              <div className="sm:hidden bg-white/50 dark:bg-surface-dark-subtle/40 p-3 rounded-xl border border-white/50 dark:border-border-dark/30">
                                <span className="text-[10px] font-bold text-secondary dark:text-secondary-dark uppercase tracking-wider block mb-1">Access Duration</span>
                                <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{c.duration}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredIndian.length === 0 && (
            <div className="text-center py-12 bg-white/10">
              <p className="text-ink-muted dark:text-ink-dark-muted text-sm">No Indian platforms match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Content Creation Model Glossary Tab Content */}
      <section className={`mb-12 ${activeTab === 'glossary' ? '' : 'hidden'}`}>
        <h2 className="font-display text-xl font-bold text-ink dark:text-ink-dark mb-6">
          Content Creation Model Glossary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGlossary.map((m) => (
            <div
              key={m.name}
              className="bg-white/45 dark:bg-surface-dark/35 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-border-dark/45 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <p className="font-bold text-primary dark:text-primary-dark text-sm mb-2">{m.name}</p>
              <p className="text-ink-muted dark:text-ink-dark-muted text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
        {filteredGlossary.length === 0 && (
          <div className="text-center py-12 bg-white/10 rounded-2xl">
            <p className="text-ink-muted dark:text-ink-dark-muted text-sm">No glossary models match your search.</p>
          </div>
        )}
      </section>
    </StrategyDetailPageShell>
  );
}
