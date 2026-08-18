# Krishsudharsun L — Portfolio

A cybersecurity × wizarding-aesthetic developer portfolio, built with React, TypeScript, Vite, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview it with `npm run preview`.

## Structure

- `src/data/content.ts` — the single source of truth for every fact on the site (resume-sourced). Edit this file to update text content; everything else reads from here.
- `src/context/ThemeContext.tsx` — NOX (dark) / LUMOS (light) theme, persisted to `localStorage`, respects system preference until you choose explicitly.
- `src/context/EasterEggContext.tsx` — the typed-command easter eggs (`LUMOS`, `NOX`, `ACCIO PROJECTS`, `REVELIO`) and the optional terminal.
- `src/components/` — one file per section (Hero, About, Experience, Skills, Projects, SecurityMindset, Education, Contact, Footer) plus shared pieces (`Navbar`, `SectionHeading`, `WardSeal`, `Terminal`).
- `src/components/WardSeal.tsx` — the site's signature glyph, a rune-dial built from a network graph. Reused at full size in the Hero and small elsewhere.

## Notes

- No fake stats, invented projects, or made-up dates — anything not in the resume renders as "Details coming soon" instead of being fabricated (see `content.ts`).
- The contact form opens the visitor's email client with the message pre-filled; it does not send email from a backend (none is configured).
- Resume link renders a "coming soon" state until you set `profile.resumeUrl` in `content.ts`.
