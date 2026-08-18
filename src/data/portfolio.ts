// ============================================================
// SOURCE OF TRUTH — every field here comes directly from
// Krishsudharsun L's resume. Nothing invented. Missing data
// is represented explicitly as `null` and rendered as a
// "Details coming soon" state by the consuming components.
// ============================================================

export const profile = {
  name: "Krishsudharsun L",
  title: "Computer Science Engineer",
  tagline: "I Build. I Secure. I Investigate.",
  subheading:
    "Computer Science Engineer crafting digital experiences at the intersection of development, cybersecurity, and curiosity.",
  email: "lkrishsudharsun08@gmail.com",
  phone: "7811950588",
  linkedin: "https://linkedin.com/in/krishsudharsun-l-483525277",
  github: "https://github.com/Krishsudharsun",
  resumeUrl: null as string | null, // no resume file URL provided
};

export type ExperienceRole = {
  role: string;
  org: string;
  period: string;
  current: boolean;
  summary: string | null;
};

// Founder & Team Manager is the primary, current role. The other three
// titles were also listed against UPFINITY without individual dates,
// so they're shown as concurrent functions under the same tenure.
export const experience: ExperienceRole[] = [
  {
    role: "Founder & Team Manager",
    org: "UPFINITY",
    period: "May 2025 — Present",
    current: true,
    summary:
      "Leads UPFINITY, directing the team across web development, database administration, and frontend delivery for client projects.",
  },
  {
    role: "Backend Developer",
    org: "UPFINITY",
    period: "May 2025 — Present",
    current: true,
    summary: null,
  },
  {
    role: "Database Administrator",
    org: "UPFINITY",
    period: "May 2025 — Present",
    current: true,
    summary: null,
  },
  {
    role: "Frontend Developer",
    org: "UPFINITY",
    period: "May 2025 — Present",
    current: true,
    summary: null,
  },
];

export type SkillGroup = {
  id: string;
  title: string;
  codename: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "recon",
    title: "Reconnaissance",
    codename: "recon.sys",
    skills: ["OSINT", "Maltego", "Networking"],
  },
  {
    id: "security",
    title: "Security",
    codename: "sec.core",
    skills: ["Linux", "Wireshark", "Burp Suite", "Reverse Engineering"],
  },
  {
    id: "development",
    title: "Development",
    codename: "dev.forge",
    skills: ["Python", "JavaScript", "HTML5", "CSS"],
  },
  {
    id: "data",
    title: "Backend & Data",
    codename: "data.vault",
    skills: ["Backend Development", "MongoDB", "MySQL"],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  details: string | null;
  tech: string[] | null;
};

export const projects: Project[] = [
  {
    id: "osint-case-study",
    title: "OSINT Investigation Case Study",
    description:
      "Open-source intelligence investigation applying reconnaissance and information-gathering techniques.",
    details:
      "A case study built around OSINT methodology — sourcing, correlating, and verifying open information as part of cybersecurity investigation practice.",
    tech: ["OSINT", "Maltego"],
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    description: "A personal portfolio site presenting projects and technical background.",
    details: null,
    tech: ["HTML5", "CSS", "JavaScript"],
  },
  {
    id: "vuln-research",
    title: "Vulnerability Research / Bug Bounty Practice",
    description:
      "Hands-on practice in vulnerability research and bug bounty methodology using industry-standard tooling.",
    details:
      "Applied practice with security testing tools as part of ongoing bug bounty and vulnerability research work.",
    tech: ["Burp Suite", "Reverse Engineering"],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website",
    description: "A full e-commerce website covering front-facing storefront and underlying data handling.",
    details: null,
    tech: ["Python", "JavaScript", "MySQL", "MongoDB"],
  },
  {
    id: "upfinity-sites",
    title: "Company Websites Development",
    description: "Client company websites delivered through UPFINITY.",
    details:
      "Web development for client companies, delivered under the UPFINITY team across frontend and backend work.",
    tech: ["JavaScript", "HTML5", "CSS"],
  },
];

export const education = {
  degree: "B.E. Computer Science Engineering",
  institution: "Misrimal Navajee Munoth Jain Engineering College",
  period: "2025 — 2029",
  status: "Pursuing",
  cgpa: "7.57 / 10",
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  { name: "Introduction to Cybersecurity", issuer: "Simplilearn", year: "2025" },
  { name: "HTML Fundamentals", issuer: "Sololearn", year: "2025" },
];

export const cyberFocus = [
  { id: "recon", label: "Reconnaissance" },
  { id: "network", label: "Network Analysis" },
  { id: "intel", label: "Threat Intelligence" },
  { id: "reverse", label: "Reverse Engineering" },
  { id: "testing", label: "Security Testing" },
  { id: "linux", label: "Linux Systems" },
];
