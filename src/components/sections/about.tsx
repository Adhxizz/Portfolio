"use client";

import {
  Lightbulb,
  Zap,
  Shuffle,
  Users,
  Eye,
  Sparkles,
} from "lucide-react";
import { about } from "@/lib/data";
import { Reveal, RevealGroup, itemVariants } from "@/components/motion/reveal";
import { motion } from "framer-motion";

const strengthIcons = [Lightbulb, Zap, Shuffle, Users, Eye];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            About Me
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The story behind the code
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {about.bio.map((para, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mb-5 text-base leading-relaxed text-muted sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
                <div className="mb-2 text-sm font-semibold text-tertiary">
                  Where I&apos;m headed
                </div>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {about.goal}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8">
                <div className="mb-4 text-sm font-semibold text-foreground">
                  What keeps me curious
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-4 self-start sm:grid-cols-2">
            {about.strengths.map((strength, i) => {
              const Icon = strengthIcons[i % strengthIcons.length];
              return (
                <motion.div
                  key={strength.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  data-cursor="project"
                  className="glow-border group rounded-2xl border border-border bg-surface p-5 shadow-[0_0_0_0_rgba(59,130,246,0)] transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_14px_40px_-10px_rgba(59,130,246,0.28)]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 font-display text-sm font-semibold">
                    {strength.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted">
                    {strength.description}
                  </p>
                </motion.div>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
