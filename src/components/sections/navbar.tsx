"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((i) => document.querySelector(i.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300",
              scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
            )}
          >
            <a
              href="#hero"
              data-cursor="link"
              className="font-display text-lg font-semibold tracking-tight"
            >
              Adithya<span className="text-primary">.</span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === item.href
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-1 left-4 right-4 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button size="sm" onClick={() => (window.location.href = "#contact")}>
                Let&apos;s Talk
              </Button>
            </div>

            <button
              className="rounded-full p-2 text-foreground md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              data-cursor="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg font-semibold">
                Adithya<span className="text-primary">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2"
                aria-label="Close menu"
                data-cursor="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-2 px-6 pt-12">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  data-cursor="link"
                  className="w-full rounded-2xl px-6 py-4 text-center font-display text-2xl font-medium text-foreground hover:bg-surface-2"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
