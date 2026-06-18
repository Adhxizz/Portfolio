# Adithya U — Portfolio

A premium personal portfolio site built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion — featuring a custom cursor, loading screen, 3D tilt project cards, and a unified projects section.

## Project Structure

- `src/lib/data.ts` — **all content lives here.** Name, bio, skills, experience, projects, certifications, achievements. Edit this file to update any text on the site.
- `src/components/sections/` — one component per page section (hero, about, skills, experience, projects, achievements, contact, footer, navbar, loading-screen, custom-cursor, scroll-progress, ambient-background).
- `src/components/ui/` — reusable UI primitives (button, with built-in ripple effect).
- `src/components/motion/` — scroll-reveal animation wrapper and page fade-in used across sections.
- `src/components/icons/` — custom GitHub/LinkedIn icon components (the installed lucide-react version doesn't ship brand icons).
- `public/images/projects/` — one custom SVG illustration per project.
