import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "../data/portfolio";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-28 md:py-36 relative bg-panel/30">
      <div className="container-page">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Experience</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink text-balance">Chronicles &amp; Missions</h2>
        </div>

        <div className="relative pl-8 md:pl-10">
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-line-bright" aria-hidden="true" />

          <ol className="space-y-6">
            {experience.map((role, i) => {
              const open = openIndex === i;
              return (
                <motion.li
                  key={`${role.role}-${i}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative"
                >
                  <span
                    className="absolute -left-8 md:-left-10 top-2 w-3.5 h-3.5 rounded-full border-2"
                    style={{
                      background: role.current ? "var(--accent)" : "var(--bg-panel)",
                      borderColor: "var(--accent)",
                      boxShadow: role.current ? "var(--glow-cyan)" : "none",
                    }}
                    aria-hidden="true"
                  />
                  <div className="rounded-xl border border-line glass-panel overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={open}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-display text-xl text-ink">{role.role}</h3>
                          {role.current && (
                            <span className="font-mono text-[0.65rem] uppercase tracking-wide text-emerald border border-emerald/40 rounded-full px-2 py-0.5">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-ink-soft text-sm mt-1 font-mono">
                          {role.org} · {role.period}
                        </p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-ink-faint transition-transform duration-300 ${open ? "rotate-180 text-accent" : ""}`}
                      />
                    </button>
                    {open && (
                      <div className="px-5 pb-5 -mt-1">
                        <div className="h-px bg-line mb-4" />
                        <p className="text-ink-soft text-sm leading-relaxed">
                          {role.summary ?? "Details coming soon."}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
