"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[95] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #3B82F6, #7C3AED, #10D9C4)",
      }}
    />
  );
}
