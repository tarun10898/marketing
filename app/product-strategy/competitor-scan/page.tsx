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
      <section className="mb-16">
          <StrategySectionTitle title="Global Competitors" accentClassName="bg-primary" />
          <div className="overflow-x-auto rounded-xl shadow-sm border border-border dark:border-border-dark">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-primary-soft/40 dark:bg-primary/15 text-left border-b border-primary/15 dark:border-primary-dark/30">
                  <th className="px-4 py-3 font-semibold text-primary dark:text-primary-dark w-12">#</th>
                  <th className="px-4 py-3 font-semibold text-primary dark:text-primary-dark">Platform</th>
                  <th className="px-4 py-3 font-semibold text-primary dark:text-primary-dark">What It Provides</th>
                  <th className="px-4 py-3 font-semibold text-primary dark:text-primary-dark">Pricing</th>
                  <th className="px-4 py-3 font-semibold text-primary dark:text-primary-dark">Learning Resources & Features</th>
                  <th className="px-4 py-3 font-semibold text-primary dark:text-primary-dark">Content Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 dark:divide-border-dark/50">
                {globalCompetitors.map((c) => (
                  <tr
                    key={c.rank}
                    className="odd:bg-white even:bg-surface-subtle/70 dark:odd:bg-surface-dark dark:even:bg-surface-dark-subtle/70 hover:bg-primary-soft/35 dark:hover:bg-primary/12 transition-colors"
                  >
                    <td className="px-4 py-3 text-ink-muted/75 dark:text-ink-dark-muted/70 font-mono text-xs">{c.rank}</td>
                    <td className="px-4 py-3 font-semibold text-ink dark:text-ink-dark whitespace-nowrap">{c.platform}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted max-w-[200px]">{c.provides}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted whitespace-nowrap">{c.pricing}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted max-w-[260px]">{c.features}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted max-w-[180px]">{c.model}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </section>

      <section className="mb-16">
          <StrategySectionTitle title="Indian Competitors" accentClassName="bg-secondary" />
          <div className="overflow-x-auto rounded-xl shadow-sm border border-border dark:border-border-dark">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-secondary-soft/40 dark:bg-secondary/15 text-left border-b border-secondary/15 dark:border-secondary-dark/30">
                  <th className="px-4 py-3 font-semibold text-secondary dark:text-secondary-dark w-12">#</th>
                  <th className="px-4 py-3 font-semibold text-secondary dark:text-secondary-dark">Platform</th>
                  <th className="px-4 py-3 font-semibold text-secondary dark:text-secondary-dark">What It Provides</th>
                  <th className="px-4 py-3 font-semibold text-secondary dark:text-secondary-dark">Pricing (2026)</th>
                  <th className="px-4 py-3 font-semibold text-secondary dark:text-secondary-dark">Features</th>
                  <th className="px-4 py-3 font-semibold text-secondary dark:text-secondary-dark">Content Model</th>
                  <th className="px-4 py-3 font-semibold text-secondary dark:text-secondary-dark">Access Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 dark:divide-border-dark/50">
                {indianCompetitors.map((c) => (
                  <tr
                    key={c.rank}
                    className="odd:bg-white even:bg-surface-subtle/70 dark:odd:bg-surface-dark dark:even:bg-surface-dark-subtle/70 hover:bg-secondary-soft/35 dark:hover:bg-secondary/12 transition-colors"
                  >
                    <td className="px-4 py-3 text-ink-muted/75 dark:text-ink-dark-muted/70 font-mono text-xs">{c.rank}</td>
                    <td className="px-4 py-3 font-semibold text-ink dark:text-ink-dark whitespace-nowrap">{c.platform}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted max-w-[180px]">{c.provides}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted max-w-[180px]">{c.pricing}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted max-w-[220px]">{c.features}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted max-w-[160px]">{c.model}</td>
                    <td className="px-4 py-3 text-ink-muted dark:text-ink-dark-muted whitespace-nowrap">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </section>

      <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-ink dark:text-ink-dark mb-5">
            Content Creation Model Glossary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contentModels.map((m) => (
              <div
                key={m.name}
                className="bg-white/80 dark:bg-surface-dark/70 rounded-xl p-4 border border-border/40 dark:border-border-dark/40 shadow-sm"
              >
                <p className="font-semibold text-ink dark:text-ink-dark text-sm mb-1">{m.name}</p>
                <p className="text-ink-muted dark:text-ink-dark-muted text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
      </section>
    </StrategyDetailPageShell>
  );
}
