"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = "ADHXIZZ";
const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%@&01";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

function useParticles(count: number): Particle[] {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#3B82F6", "#7C3AED", "#10D9C4"];
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 1,
        duration: 2 + Math.random() * 1.4,
        color: colors[i % colors.length],
      }))
    );
  }, [count]);

  return particles;
}

function useDecodeText(
  target: string,
  active: boolean,
  durationMs: number
): string {
  const [display, setDisplay] = useState(() => " ".repeat(target.length));

  useEffect(() => {
    if (!active) return;

    let raf: number;
    const start = performance.now();
    const perCharLock = durationMs / (target.length + 4);

    function tick(now: number) {
      const elapsed = now - start;
      const lockedCount = Math.min(
        target.length,
        Math.floor(elapsed / perCharLock)
      );

      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < lockedCount) {
          out += target[i];
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);

      if (lockedCount < target.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);

  return display;
}

export function LoadingScreen() {
  const [stage, setStage] = useState<"decode" | "hold" | "exit" | "hidden">("decode");
  const [progress, setProgress] = useState(0);
  const particles = useParticles(16);
  const decoded = useDecodeText(BRAND, stage === "decode" || stage === "hold", 750);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let raf: number;
    const start = performance.now();
    const progressDuration = 1500;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / progressDuration) * 100);
      setProgress(100 * (1 - Math.pow(1 - pct / 100, 3)));
      if (pct < 100) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setStage("hold"), 900);
    const t2 = setTimeout(() => setStage("exit"), 1550);
    const t3 = setTimeout(() => {
      setStage("hidden");
      document.body.style.overflow = "";
    }, 2050);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {stage !== "hidden" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "exit" ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: stage === "exit" ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.16), transparent 65%)",
            }}
          />

          <motion.div
            className="pointer-events-none absolute h-[460px] w-[460px] rounded-full opacity-25"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "conic-gradient(from 0deg, #3B82F6, #7C3AED, #10D9C4, #3B82F6)",
              filter: "blur(70px)",
            }}
          />

          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: stage === "exit" ? 0 : [0, 0.8, 0.3, 0.8],
                scale: stage === "exit" ? 0 : 1,
                y: [0, -14, 0],
              }}
              transition={{
                opacity: { duration: p.duration, repeat: Infinity, delay: p.delay },
                scale: { duration: 0.35, delay: p.delay },
                y: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center px-6">
            <div className="relative overflow-hidden" style={{ perspective: 600 }}>
              <motion.div
                className="font-display whitespace-nowrap text-4xl font-semibold tracking-[0.08em] sm:text-6xl"
                animate={{ opacity: stage === "exit" ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  color: "#E6E9F2",
                  textShadow:
                    "0 0 22px rgba(59,130,246,0.5), 0 0 44px rgba(124,58,237,0.3)",
                }}
              >
                {decoded}
              </motion.div>

              <motion.div
                className="pointer-events-none absolute inset-y-0 w-20 sm:w-28"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(124,237,255,0.35) 45%, rgba(255,255,255,0.65) 50%, rgba(124,237,255,0.35) 55%, transparent 100%)",
                  mixBlendMode: "screen",
                  filter: "blur(1px)",
                }}
                initial={{ left: "-20%" }}
                animate={
                  stage === "hold"
                    ? { left: "120%" }
                    : {}
                }
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                  repeat: stage === "hold" ? Infinity : 0,
                  repeatDelay: 0.4,
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: stage === "exit" ? 0 : 1,
                scaleX: stage === "exit" ? 0 : 1,
              }}
              transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
              className="mt-5 h-px w-40 origin-center sm:w-56"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #3B82F6, #7C3AED, #10D9C4, transparent)",
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === "exit" ? 0 : 1 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="font-mono mt-4 text-[11px] uppercase tracking-[0.25em] text-muted"
            >
              Full Stack Developer
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === "exit" ? 0 : 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="mt-7 h-[2px] w-32 overflow-hidden rounded-full bg-surface-2 sm:w-40"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #3B82F6, #7C3AED, #10D9C4)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
