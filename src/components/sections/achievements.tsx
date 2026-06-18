"use client";

import { Award, Users, Trophy, GraduationCap, type LucideIcon } from "lucide-react";
import { achievements, certifications } from "@/lib/data";
import { Reveal, RevealGroup, itemVariants } from "@/components/motion/reveal";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = { Award, Users, Trophy };

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Trophy className="h-4 w-4" />
            Achievements
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Recognition along the way
          </h2>
        </Reveal>

        <RevealGroup
          staggerDelay={0.08}
          className="mt-14 grid gap-5 sm:grid-cols-3"
        >
          {achievements.map((a) => {
            const Icon = iconMap[a.icon] ?? Trophy;
            return (
              <motion.div
                key={a.title}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                data-cursor="project"
                className="glow-border rounded-2xl border border-border bg-surface p-6 shadow-[0_0_0_0_rgba(124,58,237,0)] transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_14px_40px_-10px_rgba(124,58,237,0.3)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-sm font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {a.description}
                </p>
              </motion.div>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-20 flex items-center gap-2 text-sm font-medium text-tertiary">
            <GraduationCap className="h-4 w-4" />
            Certifications
          </div>
        </Reveal>

        <RevealGroup
          staggerDelay={0.06}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              data-cursor="link"
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-primary/40"
            >
              <div>
                <div className="text-sm font-medium">{cert.name}</div>
                <div className="mt-0.5 text-xs text-muted">{cert.issuer}</div>
              </div>
              <span className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-tertiary">
                {cert.year}
              </span>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
