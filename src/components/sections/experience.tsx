"use client";

import { Briefcase, Calendar, Globe } from "lucide-react";
import { experiences } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Briefcase className="h-4 w-4" />
            Experience
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Where I&apos;ve put it into practice
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border sm:left-[22px]" />
          <motion.div
            className="absolute left-[18px] top-2 w-px origin-top bg-gradient-to-b from-primary via-secondary to-tertiary sm:left-[22px]"
            initial={{ scaleY: 0, height: "100%" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 0.12} direction="right">
                <div className="relative flex gap-6 sm:gap-8">
                  <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background sm:h-11 sm:w-11">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      className="h-2.5 w-2.5 rounded-full bg-primary"
                    />
                  </div>

                  <motion.div
                    whileHover={{ y: -4, scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="glow-border flex-1 rounded-2xl border border-border bg-surface p-6 shadow-[0_0_0_0_rgba(59,130,246,0)] transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_16px_50px_-12px_rgba(59,130,246,0.25)] sm:p-7"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold sm:text-xl">
                          {exp.role}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 text-xs text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5" />
                          {exp.mode}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {exp.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-tertiary" />
                          {r}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
