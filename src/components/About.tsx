import { motion } from "framer-motion";
import { Shield, Code2, Users } from "lucide-react";
import { profile } from "../data/portfolio";

const pillars = [
  {
    icon: Shield,
    title: "Cybersecurity",
    body: "Drawn to reconnaissance, network analysis, and reverse engineering — the discipline of understanding systems well enough to test them.",
  },
  {
    icon: Code2,
    title: "Development",
    body: "Builds across the stack with Python and JavaScript, from interface to database, treating code as the instrument for everything else.",
  },
  {
    icon: Users,
    title: "Founder, UPFINITY",
    body: "Leads a team spanning frontend, backend, and database work — directing delivery for real client projects since May 2025.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36 relative">
      <div className="container-page">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-6 text-balance">
              The Wizard Behind the Code
            </h2>

            {/* Abstract cyber-magical avatar — generated shape, never a fabricated portrait */}
            <div
              className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden glass-panel rune-border"
              aria-hidden="true"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="avatar-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <rect width="200" height="200" fill="var(--bg-panel-raised)" />
                <circle cx="100" cy="82" r="46" fill="url(#avatar-grad)" />
                <path d="M40 190 Q100 120 160 190 Z" fill="url(#avatar-grad)" opacity="0.8" />
                <circle cx="100" cy="82" r="46" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
                {Array.from({ length: 6 }).map((_, i) => {
                  const a = (i / 6) * Math.PI * 2;
                  return (
                    <circle
                      key={i}
                      cx={100 + 70 * Math.cos(a)}
                      cy={100 + 70 * Math.sin(a)}
                      r="2"
                      fill="var(--gold)"
                      opacity="0.7"
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-ink-soft text-lg leading-relaxed">
              {profile.name} is a {profile.title.toLowerCase()} working at the intersection of software
              development and cybersecurity — building with Python and JavaScript while practicing
              reconnaissance, network analysis, and reverse engineering on the security side.
            </p>
            <p className="text-ink-soft text-lg leading-relaxed">
              Since May 2025, {profile.name.split(" ")[0]} has founded and led{" "}
              <span className="text-ink font-medium">UPFINITY</span>, directing a team across frontend,
              backend, and database work for client projects.
            </p>

            <div className="grid sm:grid-cols-1 gap-4 pt-2">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 p-5 rounded-xl glass-panel border border-line hover:border-accent/50 transition-colors duration-300"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-panel-raised text-accent">
                    <p.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-ink mb-1">{p.title}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
