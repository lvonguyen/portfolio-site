# Portfolio Landing Page v2 — Design Doc

**Date:** 2026-03-04
**Domain:** `lvonguyen.com` (root)
**Status:** Approved — ready for implementation

---

## Summary

Rebuild the portfolio landing page from static HTML to React + Vite + Tailwind. Warm light industrial aesthetic derived from Synthetic/Factory brand system. Collapsible project cards with geometric SVG icons. Public, no auth.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Stack | React 19 + Vite + Tailwind v4 | Match CF frontend stack |
| Aesthetic | Warm light industrial (Synthetic palette) | Stand out from dark dev portfolios |
| Sections | Hero + project cards + footer only | Linked from resume/LI, no bio duplication |
| Card behavior | Collapsible accordion | Scannable collapsed, detailed expanded |
| Card links | GitHub repo link only | Keep focused on code |
| Icons | Geometric SVG per project | Low maintenance, industrial feel |
| Domain | `lvonguyen.com` (root, CNAME flattening) | Shortest memorable URL for resumes |
| Auth | None (public) | Portfolio should be publicly accessible |

## Color Palette (Synthetic-derived)

| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| `bg` | `#E7E7E6` | `bg-t100` | Page background |
| `surface` | `#CFCBBF` | `bg-t200` | Card backgrounds |
| `subtle` | `#B8B19C` | `border-t300` | Borders, dividers |
| `muted` | `#4E4A3E` | `text-t400` | Secondary text |
| `text` | `#1F2822` | `text-t500` | Primary text |
| `accent` | `#F5D288` | `text-y100` | Highlights, badges |
| `status` | `#4ADE80` | `text-green-400` | Live indicators |

## Typography

- **Display/headings:** JetBrains Mono, uppercase, wide tracking
- **Body:** Inter, regular weight
- **Labels:** JetBrains Mono, xs, uppercase, tracking-widest

## Layout

### Hero
- Name (large display)
- Horizontal rule
- Title: "Cloud Security Engineering" (large bold)
- One-liner tagline
- Status badge: `STATUS: AVAILABLE / 2026`

### Nav (minimal)
- `LV` initials / logo mark (left)
- GitHub + LinkedIn icon links (right)

### Project Cards (collapsible)
- **Collapsed:** geometric icon + project name + one-liner + tier badge + chevron
- **Expanded:** 2-3 sentence capability overview + tech stack badges + GitHub link
- Full-width stacked layout
- T-200 background with T-300 border

### Footer
- `lvonguyen.io / cloud security / (c) 2026`

## Project Data

| Project | Tier | Status | Icon Concept |
|---------|------|--------|-------------|
| CloudForge | T1 | Active | Shield + gear |
| ThreatForge | T1 | Active | Radar / crosshair |
| Opportunity Tracker | - | Live | Pipeline / kanban |
| Multi-Cloud Observability | T2 | Supporting | Telescope / graph |
| CSPM Aggregator | T2 | Supporting | Layers / scanner |

## File Structure

```
portfolio-site/
  src/
    components/
      Nav.tsx
      Hero.tsx
      ProjectCard.tsx
      TechBadge.tsx
      Footer.tsx
    data/
      projects.ts
    App.tsx
    main.tsx
    index.css
  public/
    _headers
    favicon.svg
  index.html
  package.json
  vite.config.ts
  tailwind.config.ts
```

## Deployment

- Platform: Cloudflare Pages
- CF Pages project name: `portfolio-landing`
- Build command: `npm run build`
- Build output: `dist`
- DNS: CNAME `@` (root) -> `portfolio-landing.pages.dev` (CF CNAME flattening)
- Also add: CNAME `portfolio` -> `portfolio-landing.pages.dev` (redirect for old refs)
- Runbook: `env-config/shared/dev-profile/docs/cloudflare-pages-runbook.md`

## Out of Scope

- About/bio section (resume + LinkedIn cover this)
- Live demo links (GitHub only)
- Dark mode toggle
- Blog/writing section
- Contact form
