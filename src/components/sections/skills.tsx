"use client";

import {
  Code2,
  LayoutTemplate,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skills } from "@/lib/data";
import { Reveal, RevealGroup, itemVariants } from "@/components/motion/reveal";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  LayoutTemplate,
  Server,
  Database,
  BrainCircuit,
  Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Code2 className="h-4 w-4" />
            Skills
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Tools I reach for to build things
          </h2>
        </Reveal>

        <RevealGroup
          staggerDelay={0.08}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((group) => {
            const Icon = iconMap[group.icon] ?? Code2;
            return (
              <motion.div
                key={group.category}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                data-cursor="project"
                className="glow-border group relative rounded-2xl border border-border bg-surface p-6 shadow-[0_0_0_0_rgba(59,130,246,0)] transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_16px_50px_-12px_rgba(59,130,246,0.3)]"
              >
                <div className="mb-5 flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="font-display text-base font-semibold">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                      whileHover={{ scale: 1.06 }}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
