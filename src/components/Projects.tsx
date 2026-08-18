import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { projects } from "../data/portfolio";

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-28 md:py-36 bg-panel/30">
      <div className="container-page">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Projects</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink text-balance">Mission Archives</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const open = activeId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="rounded-xl border border-line glass-panel overflow-hidden"
              >
                <button
                  onClick={() => setActiveId(open ? null : project.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                  aria-expanded={open}
                >
                  <div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-wide text-ink-faint">
                      File {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl text-ink mt-1.5 mb-2">{project.title}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{project.description}</p>
                  </div>
                  <span
                    className={`shrink-0 mt-1 w-8 h-8 rounded-full border border-line-bright flex items-center justify-center text-ink-soft transition-all duration-300 ${
                      open ? "rotate-45 border-accent text-accent" : ""
                    }`}
                  >
                    <Plus size={15} />
                  </span>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-line mb-4" />
                        <p className="text-sm text-ink-soft leading-relaxed mb-4">
                          {project.details ?? "Case-study write-up coming soon."}
                        </p>
                        {project.tech && (
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[0.68rem] uppercase tracking-wide text-accent border border-accent/30 rounded-full px-2.5 py-1"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
