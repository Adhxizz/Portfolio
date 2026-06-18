"use client";

import { Mail, Phone, MapPin, Code, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { personal, socials } from "@/lib/data";
import { Reveal, RevealGroup, itemVariants } from "@/components/motion/reveal";
import { motion } from "framer-motion";

const directContacts = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    sub: "Best way to reach me",
    href: socials.email,
    accent: "#3B82F6",
  },
  {
    icon: Phone,
    label: "Phone",
    value: personal.phone,
    sub: "Available on call",
    href: `tel:${personal.phone.replace(/\s/g, "")}`,
    accent: "#10D9C4",
  },
];

const socialLinks = [
  { icon: GithubIcon, label: "GitHub", href: socials.github },
  { icon: LinkedinIcon, label: "LinkedIn", href: socials.linkedin },
  { icon: Code, label: "LeetCode", href: socials.leetcode },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="glow-border relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-14">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
          />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-1.5 text-xs font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-tertiary" />
                Open to roles and freelance work
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s build something
                <span className="text-gradient"> great </span>
                together
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Have an idea, an opportunity, or just want to talk tech? Reach
                out directly — I read and reply to everything.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            staggerDelay={0.1}
            className="relative z-10 mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2"
          >
            {directContacts.map((contact) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                data-cursor="link"
                data-cursor-label={contact.label}
                data-magnetic
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-background/40 p-5 shadow-[0_0_0_0_rgba(59,130,246,0)] transition-[box-shadow,border-color] duration-300 hover:border-transparent"
                style={
                  {
                    "--accent": contact.accent,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 16px 50px -12px ${contact.accent}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 0 rgba(59,130,246,0)";
                }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                  style={{ background: contact.accent }}
                />

                <div
                  className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${contact.accent}1a`,
                    color: contact.accent,
                  }}
                >
                  <contact.icon className="h-5 w-5" />
                </div>

                <div className="relative z-10 min-w-0 flex-1 text-left">
                  <div className="text-xs text-muted">{contact.sub}</div>
                  <div className="truncate text-sm font-semibold text-foreground sm:text-base">
                    {contact.value}
                  </div>
                </div>

                <ArrowUpRight className="relative z-10 h-4 w-4 flex-shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </motion.a>
            ))}
          </RevealGroup>

          <Reveal delay={0.28}>
            <div
              data-cursor="link"
              className="relative z-10 mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm text-muted"
            >
              <MapPin className="h-4 w-4 text-primary" />
              {personal.location}
            </div>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="relative z-10 mt-8 flex justify-center gap-4 border-t border-border pt-8">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  aria-label={link.label}
                  data-cursor="social"
                  data-cursor-label={link.label}
                  data-magnetic
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <link.icon className="h-4.5 w-4.5" />
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
