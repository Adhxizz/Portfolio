"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { personal, socials } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const terminalLines = [
  { prompt: "whoami", output: "adithya_u" },
  { prompt: "cat role.txt", output: "Full Stack Developer · AI Enthusiast" },
  { prompt: "stack --active", output: "Java · Python · PHP · JavaScript · MySQL" },
  { prompt: "status", output: "Building smart digital solutions ✓" },
];

const TERMINAL_PLAYED_KEY = "adithya-portfolio:terminal-played";

function TerminalTyper() {
  const [hasMounted, setHasMounted] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "pause" | "done">("typing");
  const [history, setHistory] = useState<{ prompt: string; output: string }[]>([]);

  useEffect(() => {
    let played = false;
    try {
      played = window.localStorage.getItem(TERMINAL_PLAYED_KEY) === "true";
    } catch {
      played = false;
    }
    setAlreadyPlayed(played);
    if (played) {
      setHistory(terminalLines);
      setLineIndex(terminalLines.length);
      setPhase("done");
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || alreadyPlayed) return;

    if (lineIndex >= terminalLines.length) {
      if (phase !== "done") {
        setPhase("done");
        try {
          window.localStorage.setItem(TERMINAL_PLAYED_KEY, "true");
        } catch {
          // localStorage unavailable (private mode, etc.) — animation will simply replay next visit
        }
      }
      return;
    }

    const current = terminalLines[lineIndex];

    if (phase === "typing") {
      if (charIndex < current.prompt.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("output"), 250);
        return () => clearTimeout(t);
      }
    }

    if (phase === "output") {
      const t = setTimeout(() => {
        setHistory((h) => [...h, current]);
        setPhase("pause");
      }, 180);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
        setPhase("typing");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [hasMounted, alreadyPlayed, lineIndex, charIndex, phase]);

  const current = terminalLines[lineIndex];
  const showCursorLine = hasMounted && !alreadyPlayed && lineIndex < terminalLines.length;
  const isFullyDone = hasMounted && (alreadyPlayed || phase === "done");

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5 font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/40 sm:p-6 sm:text-sm">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        animate={isFullyDone ? { opacity: [0, 0.5, 0] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.12), transparent 60%)",
        }}
      />

      <div className="relative mb-4 flex items-center gap-2">
        <motion.span
          className="h-3 w-3 rounded-full bg-[#ff5f56]"
          animate={isFullyDone ? { opacity: [1, 0.55, 1] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="h-3 w-3 rounded-full bg-[#ffbd2e]"
          animate={isFullyDone ? { opacity: [1, 0.55, 1] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
        />
        <motion.span
          className="h-3 w-3 rounded-full bg-[#27c93f]"
          animate={isFullyDone ? { opacity: [1, 0.55, 1] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <span className="ml-2 text-xs text-muted">adithya@portfolio</span>
        {isFullyDone && (
          <motion.span
            className="ml-auto flex items-center gap-1.5 text-[10px] text-tertiary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-tertiary"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            online
          </motion.span>
        )}
      </div>
      <div className="relative min-h-[140px] space-y-2">
        {history.map((line, i) => (
          <div key={i}>
            <div className="text-tertiary">
              <span className="text-primary">➜</span> ~ {line.prompt}
            </div>
            <div className="pl-4 text-muted">{line.output}</div>
          </div>
        ))}
        {showCursorLine && (
          <div className="text-tertiary">
            <span className="text-primary">➜</span> ~{" "}
            {current.prompt.slice(0, charIndex)}
            <span className="animate-pulse">▍</span>
          </div>
        )}
        {isFullyDone && (
          <motion.div
            className="text-tertiary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <span className="text-primary">➜</span> ~{" "}
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
              className="inline-block"
            >
              ▍
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100vh] items-center overflow-hidden pt-32 pb-20"
    >
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[18%] h-16 w-16 rounded-2xl border border-primary/20 bg-primary/5"
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[12%] h-10 w-10 rounded-full border border-tertiary/30 bg-tertiary/5"
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[18%] left-[6%] h-12 w-12 rounded-full border border-secondary/25 bg-secondary/5"
        animate={{ y: [0, -14, 0], x: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute right-[18%] bottom-[10%] h-8 w-8 rotate-45 border border-primary/20 bg-primary/5"
        animate={{ rotate: [45, 90, 45], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tertiary" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6 }}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="text-gradient">{personal.firstName}</span>
            <br />I build smart digital
            <br />solutions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.72 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {personal.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.82 }}
            className="mt-5 flex items-center gap-2 text-sm text-muted"
          >
            <MapPin className="h-4 w-4 text-primary" />
            {personal.location}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Code2 className="h-4 w-4" />
              View My Work
            </Button>
            <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Resume
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.0 }}
            className="mt-10 flex items-center gap-4"
          >
            {[
              { icon: GithubIcon, href: socials.github, label: "GitHub" },
              { icon: LinkedinIcon, href: socials.linkedin, label: "LinkedIn" },
              { icon: Mail, href: socials.email, label: "Email" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                data-cursor="social"
                data-cursor-label={item.label}
                data-magnetic
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <item.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.65 }}
            className="relative mx-auto mb-6 h-48 w-48 sm:h-56 sm:w-56"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-tertiary opacity-60 blur-2xl" />
            <div className="glow-border relative h-full w-full overflow-hidden rounded-full border-2 border-border">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative h-full w-full"
              >
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, 224px"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
          >
            <TerminalTyper />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
