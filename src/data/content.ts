// ============================================================
// SOURCE OF TRUTH
// Every fact below comes directly from the resume provided.
// Nothing here is invented — gaps are marked explicitly so the
// UI can render a tasteful "Details coming soon" state instead
// of fabricating information.
// ============================================================

export const profile = {
  name: 'Krishsudharsun L',
  role: 'Computer Science Engineer',
  tagline: 'I Build. I Secure. I Investigate.',
  subheading:
    'Computer Science Engineer crafting digital experiences at the intersection of development, cybersecurity, and curiosity.',
  email: 'lkrishsudharsun08@gmail.com',
  phone: '7811950588',
  linkedin: 'https://linkedin.com/in/krishsudharsun-l-483525277',
  github: 'https://github.com/Krishsudharsun',
  resumeUrl: null as string | null, // no file provided yet — CTA renders a "coming soon" state
};

export const about = {
  title: 'The Wizard Behind the Code',
  paragraphs: [
    'A Computer Science Engineering student building a career at the crossing point of software development and cybersecurity — where writing systems and probing them for weakness are two halves of the same discipline.',
    'On the security side: Linux, networking, reverse engineering, OSINT, and threat intelligence — using tools like Maltego, Burp Suite, and Wireshark to investigate, and bug bounty practice to keep the edge sharp.',
    'On the development side: building with Python and JavaScript across the frontend and backend, backed by MongoDB and MySQL — and leading that work as Founder & Team Manager at UPFINITY.',
  ],
};

export type ExperienceRole = {
  title: string;
  org: string;
  period: string;
  current: boolean;
  responsibilities: string[];
};

export const experience: ExperienceRole[] = [
  {
    title: 'Founder & Team Manager',
    org: 'UPFINITY',
    period: 'May 2025 — Present',
    current: true,
    responsibilities: [
      'Founded and manages UPFINITY.',
      'Leads the team\u2019s direction across development delivery.',
    ],
  },
  {
    title: 'Backend Developer',
    org: 'UPFINITY',
    period: 'Details coming soon',
    current: false,
    responsibilities: ['Backend development work at UPFINITY.'],
  },
  {
    title: 'Database Administrator',
    org: 'UPFINITY',
    period: 'Details coming soon',
    current: false,
    responsibilities: ['Database administration at UPFINITY.'],
  },
  {
    title: 'Frontend Developer',
    org: 'UPFINITY',
    period: 'Details coming soon',
    current: false,
    responsibilities: ['Frontend development work at UPFINITY.'],
  },
];

export type SkillGroup = {
  id: string;
  title: string;
  focus: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'reconnaissance',
    title: 'Reconnaissance',
    focus: 'Gathering & mapping',
    skills: ['OSINT', 'Maltego', 'Networking'],
  },
  {
    id: 'security',
    title: 'Security',
    focus: 'Testing & analysis',
    skills: ['Linux', 'Wireshark', 'Burp Suite', 'Reverse Engineering'],
  },
  {
    id: 'development',
    title: 'Development',
    focus: 'Building',
    skills: ['Python', 'JavaScript', 'HTML5', 'CSS'],
  },
  {
    id: 'backend-data',
    title: 'Backend & Data',
    focus: 'Storing & serving',
    skills: ['Backend Development', 'MongoDB', 'MySQL'],
  },
];

export const securityMindset = {
  title: 'Security Mindset',
  intro:
    'Cybersecurity is a way of looking at systems, not a section of a resume. It shows up in how projects get built and how they get tested.',
  pillars: [
    { label: 'Reconnaissance', detail: 'OSINT and Maltego for mapping what\u2019s exposed.' },
    { label: 'Network Analysis', detail: 'Reading traffic and behavior with Wireshark.' },
    { label: 'Threat Intelligence', detail: 'Tracking indicators and context, not just alerts.' },
    { label: 'Reverse Engineering', detail: 'Taking things apart to understand how they work.' },
    { label: 'Security Testing', detail: 'Burp Suite and bug bounty practice.' },
    { label: 'Linux Systems', detail: 'The operating environment for all of the above.' },
  ],
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'osint-case-study',
    title: 'OSINT Investigation Case Study',
    summary: 'Open-source intelligence investigation and analysis.',
    details: ['Details coming soon.'],
    tags: ['OSINT', 'Maltego'],
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    summary: 'This site — a developer portfolio built to present the work above.',
    details: ['Built with React, TypeScript, Vite, and Tailwind CSS.'],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
  },
  {
    id: 'vuln-research',
    title: 'Vulnerability Research / Bug Bounty Practice',
    summary: 'Hands-on practice in vulnerability research and bug bounty methodology.',
    details: ['Details coming soon.'],
    tags: ['Burp Suite', 'Security Testing'],
  },
  {
    id: 'ecommerce-website',
    title: 'E-Commerce Website',
    summary: 'An e-commerce website build.',
    details: ['Details coming soon.'],
    tags: ['Frontend', 'Backend'],
  },
  {
    id: 'upfinity-company-sites',
    title: 'Company Websites Development',
    summary: 'Business websites developed through UPFINITY for consulting companies.',
    details: ['Details coming soon.'],
    tags: ['UPFINITY', 'Web Development'],
  },
];

export const education = {
  degree: 'B.E. Computer Science Engineering',
  institution: 'Misrimal Navajee Munoth Jain Engineering College',
  period: '2025 — 2029 (Pursuing)',
  cgpa: '7.57 / 10',
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  { name: 'Introduction to Cybersecurity', issuer: 'Simplilearn', year: '2025' },
  { name: 'HTML Fundamentals', issuer: 'Sololearn', year: '2025' },
];

export const nav = [
  { id: 'hero', label: 'Hero', shortLabel: 'Home' },
  { id: 'about', label: 'About', shortLabel: 'About' },
  { id: 'experience', label: 'Experience', shortLabel: 'Exp' },
  { id: 'skills', label: 'Skills', shortLabel: 'Skills' },
  { id: 'projects', label: 'Projects', shortLabel: 'Work' },
  { id: 'security', label: 'Security Mindset', shortLabel: 'Security' },
  { id: 'education', label: 'Education', shortLabel: 'Edu' },
  { id: 'contact', label: 'Contact', shortLabel: 'Contact' },
];
