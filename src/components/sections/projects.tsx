"use client";

import { useRef } from "react";
import {
  Building2,
  Stethoscope,
  TrendingDown,
  Bot,
  Scissors,
  Leaf,
  ExternalLink,
  FolderGit2,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { projects, type Project } from "@/lib/data";
import { Reveal, RevealGroup, itemVariants } from "@/components/motion/reveal";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Stethoscope,
  TrendingDown,
  Bot,
  Scissors,
  Leaf,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = iconMap[project.icon] ?? FolderGit2;
  const [c1, c2] = project.gradient;
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 250,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 250,
    damping: 22,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      variants={itemVariants}
      data-cursor="project"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="glow-border group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_0_0_rgba(59,130,246,0)] transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.35)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.08), transparent 60%)`
            ),
          }}
        />

        <div className="relative h-44 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.name} illustration`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 50%, ${c1}1a 100%)`,
            }}
          />

          <motion.div
            whileHover={{ scale: 1.12, rotate: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ transform: "translateZ(40px)" }}
            className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 backdrop-blur-sm"
          >
            <div
              className="absolute inset-0 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            />
            <Icon className="relative z-10 h-5 w-5 text-white" strokeWidth={1.75} />
          </motion.div>

          <span className="absolute right-4 top-4 font-mono text-[11px] text-white/50">
            0{index + 1}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-display text-lg font-semibold">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-tertiary">
              Key Features
            </div>
            <ul className="space-y-1.5">
              {project.features.slice(0, 3).map((f) => (
                <li key={f} className="flex gap-2 text-xs leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-colors duration-200 group-hover:border-primary/30"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
            <a
              href={project.github ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="flex items-center gap-1.5 text-xs font-medium text-muted transition-all duration-200 hover:translate-x-0.5 hover:text-foreground"
              title={project.github ? "View code" : "Link coming soon"}
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Code
            </a>
            <a
              href={project.live ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="flex items-center gap-1.5 text-xs font-medium text-muted transition-all duration-200 hover:translate-x-0.5 hover:text-foreground"
              title={project.live ? "View live demo" : "Link coming soon"}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <FolderGit2 className="h-4 w-4" />
            Featured Projects
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Things I&apos;ve built and shipped
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
            From civic platforms to automated price trackers — a mix of web
            apps, AI experiments, and automation tools.
          </p>
        </Reveal>

        <RevealGroup
          staggerDelay={0.1}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-xs text-muted">
            GitHub and live links are being added — check back soon, or{" "}
            <a href="#contact" className="text-primary underline-offset-4 hover:underline">
              reach out
            </a>{" "}
            for early access to the code.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
