"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageFadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
