# Adithya U — Portfolio

A premium personal portfolio site built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion — featuring a custom cursor, loading screen, 3D tilt project cards, and a unified projects section.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's new in this version

- **Unified Projects section** — all projects now live in a single "Featured Projects" grid (no more Featured/More split).
- **Custom SVG illustrations per project** — `public/images/projects/*.svg`, one hand-drawn illustration per project reflecting what it actually does (no fake screenshots).
- **Premium loading screen** — animated "AU" mark, gradient ring, progress bar, fades into the site (`src/components/sections/loading-screen.tsx`).
- **Custom cursor** — ring + dot with magnetic pull toward buttons/icons, and distinct states for buttons, links, project cards, and social icons (`src/components/sections/custom-cursor.tsx`). Automatically disabled on touch devices.
- **Scroll progress bar** — thin gradient bar at the top of the viewport (`src/components/sections/scroll-progress.tsx`).
- **3D tilt on project cards** — cards tilt toward the cursor on hover using Framer Motion springs (hardware-accelerated transforms only).
- **Animated contact form** — floating-label inputs with gradient focus glow, submits via a generated `mailto:` link (no backend needed).
- **Terminal "plays once" behavior** — the hero terminal widget types out once per browser, then freezes in its completed state. On reload/revisit it renders the finished transcript instantly with no replay. This is tracked via `localStorage` key `adithya-portfolio:terminal-played`. Clear that key (or use a private window) to see the animation again.
- **Minimal footer** — "Designed & Developed by Adhxizz © `<year>`" with an animated underline on hover, no extra icons.

## Project Structure

- `src/lib/data.ts` — **all content lives here.** Name, bio, skills, experience, projects, certifications, achievements. Edit this file to update any text on the site.
- `src/components/sections/` — one component per page section (hero, about, skills, experience, projects, achievements, contact, footer, navbar, loading-screen, custom-cursor, scroll-progress, ambient-background).
- `src/components/ui/` — reusable UI primitives (button, with built-in ripple effect).
- `src/components/motion/` — scroll-reveal animation wrapper and page fade-in used across sections.
- `src/components/icons/` — custom GitHub/LinkedIn icon components (the installed lucide-react version doesn't ship brand icons).
- `public/images/projects/` — one custom SVG illustration per project.

## TODO: Add your project links

Every project in `src/lib/data.ts` currently has:

```ts
github: null,
live: null,
```

These render as `#` placeholder links in the Code / Live Demo buttons. As you deploy or push each project, open `src/lib/data.ts` and fill in the real URLs, e.g.:

```ts
github: "https://github.com/Adhxizz/city-portal-madurai",
live: "https://city-portal-madurai.vercel.app",
```

## Replacing the profile photo

Swap `public/images/profile.jpeg` with a new image of the same name, or update the `avatar` path in `src/lib/data.ts`.

## Replacing a project illustration

Swap the relevant SVG in `public/images/projects/`, or point a project's `image` field in `src/lib/data.ts` to a new file (SVG, PNG, JPG all work — the component uses `next/image` with `fill` + `object-cover`).

## Adding new projects, experience, or certifications

Each of `projects`, `experiences`, and `certifications` in `src/lib/data.ts` is a plain array — copy an existing object and edit its fields. No component code needs to change. New projects need an `image` field pointing to an illustration (any image format works).

## Resetting the terminal animation (for testing)

Open the browser console on the live site and run:

```js
localStorage.removeItem("adithya-portfolio:terminal-played");
```

then refresh. The typing animation will play once more and re-persist.

## Deployment

Standard Next.js app — deploy directly to Vercel by importing the repo, or run:

```bash
npm run build
npm start
```

## Tech Stack

Next.js 15 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide Icons
