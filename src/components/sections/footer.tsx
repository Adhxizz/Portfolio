"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs text-muted">
          Designed &amp; Developed by{" "}
          <motion.a
            href="https://github.com/Adhxizz"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="relative font-medium text-foreground"
            whileHover="hover"
          >
            Adhxizz
            <motion.span
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-primary via-secondary to-tertiary"
              initial={{ scaleX: 0 }}
              variants={{ hover: { scaleX: 1 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.a>{" "}
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
