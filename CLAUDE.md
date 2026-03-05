# portfolio-site

Portfolio landing page at lvonguyen.com

## Stack
- React 19 + Vite + TypeScript
- Tailwind CSS v4 (Synthetic warm palette)
- Cloudflare Pages deployment

## Deployment
- Platform: Cloudflare Pages
- Project name: `portfolio-landing`
- Build command: `npm run build`
- Build output: `dist`
- DNS: CNAME `@` (root) -> `portfolio-landing.pages.dev`

## Development

npm run dev    # local dev server
npm run build  # production build

## Design
- Design doc: `docs/plans/2026-03-04-portfolio-v2-design.md`
- Palette: Synthetic/Factory warm grays (T-100 through T-500) + amber accent (Y-100)
- Typography: JetBrains Mono (headings/labels), Inter (body)

## Components
- `Nav.tsx` — minimal nav with initials + social links
- `Hero.tsx` — name, title, tagline, status badge
- `ProjectCard.tsx` — collapsible accordion card with icon, metadata, expanded content
- `TechBadge.tsx` — tech stack pill
- `ProjectIcons.tsx` — geometric SVG icons per project
- `Footer.tsx` — copyright line

## Project Data
Edit `src/data/projects.ts` to add/update project cards.
