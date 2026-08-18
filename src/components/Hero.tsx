import { motion } from "framer-motion";
import { FileText, ArrowDown } from "lucide-react";
import { profile } from "../data/portfolio";
import RuneCircle from "./RuneCircle";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Ambient background layer */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 80% -10%, color-mix(in srgb, var(--accent-2) 16%, transparent), transparent), radial-gradient(900px 500px at 10% 110%, color-mix(in srgb, var(--accent) 12%, transparent), transparent)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M42 0H0V42" fill="none" stroke="var(--ink)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-page grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow mb-5">Computer Science Engineer · Dev + Security</p>

          <h1 className="font-display text-[2.6rem] leading-[1.08] sm:text-6xl md:text-[3.6rem] font-medium text-ink text-balance">
            I Build. <span className="text-gradient italic">I Secure.</span> I Investigate.
          </h1>

          <p className="mt-6 max-w-xl text-ink-soft text-base md:text-lg leading-relaxed">
            {profile.subheading}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-md bg-accent text-void font-mono text-sm uppercase tracking-wide font-medium hover:opacity-90 transition-opacity"
              style={{ color: "var(--bg-void)", boxShadow: "var(--glow-cyan)" }}
            >
              Explore My Work
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-md border border-line-bright text-ink font-mono text-sm uppercase tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              Contact Me
            </button>
          </div>

          <div className="mt-8 flex items-center gap-5 text-ink-soft">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors text-sm"
            >
              <GithubIcon size={17} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors text-sm"
            >
              <LinkedinIcon size={17} /> LinkedIn
            </a>
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} className="flex items-center gap-2 hover:text-accent transition-colors text-sm">
                <FileText size={17} /> Resume
              </a>
            ) : (
              <span className="flex items-center gap-2 text-ink-faint text-sm cursor-default" title="Resume link coming soon">
                <FileText size={17} /> Resume soon
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="hidden md:flex justify-center"
        >
          <RuneCircle size={440} />
        </motion.div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint hover:text-accent transition-colors animate-bounce"
        style={{ animationDuration: "2.4s" }}
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
