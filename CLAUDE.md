# portfolio-site

Static portfolio landing page for portfolio.lvonguyen.com

## Stack
- Single `index.html` with Tailwind CSS (CDN — no build step)
- Cloudflare Pages deployment
- Security headers via `public/_headers`

## Deployment
- Platform: Cloudflare Pages
- Project name: `portfolio-site`
- Build: none (static HTML)
- Output: repo root (`/`)
- DNS: CNAME `portfolio` → `portfolio-site.pages.dev`

## Updating Content
Edit `index.html` directly. Project cards are `<article>` elements with consistent structure:
- Status badge (emerald=Production, blue=Active, slate=Supporting)
- Title + tier badge
- Description paragraph
- Tech badges (`.badge` class)
- Links section

## Files
```
index.html          main page
public/_headers     CF Pages security headers
CLAUDE.md           this file
```
