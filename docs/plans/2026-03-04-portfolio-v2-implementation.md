# Portfolio Landing Page v2 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild portfolio-site from static HTML to React + Vite + Tailwind v4 with warm industrial Synthetic palette, collapsible project cards, and geometric SVG icons. Deploy to `lvonguyen.com` via CF Pages.

**Architecture:** Single-page React app with zero routing (one page). Project data lives in a typed array (`projects.ts`). Collapsible cards use React state — no external UI library needed. Tailwind v4 with custom `@theme` tokens for the Synthetic palette.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, `@tailwindcss/vite`, TypeScript

**Design Doc:** `docs/plans/2026-03-04-portfolio-v2-design.md`

---

## Task 0: Manual CF Console + GitHub Setup (Human)

These steps must be done by the human in browser before code deployment works.

### Step 0a: Create GitHub Repo

```bash
cd /Users/lvonguyen/repos/remote/gh/portfolio/portfolio-site
gh repo create lvonguyen/portfolio-site --public --source=. --remote=origin --push
```

Verify: `gh repo view lvonguyen/portfolio-site --json url`

### Step 0b: CF Pages Project (dash.cloudflare.com)

1. Go to **Workers & Pages** > **Create** > **Pages** > **Connect to Git**
2. Select **GitHub** > select repo `lvonguyen/portfolio-site`
3. Click **Begin setup**
4. Fill in project settings:
   - **Project name:** `portfolio-landing`
   - **Production branch:** `main`
   - **Root directory:** `/` (leave blank)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Under **Environment variables**, add:
   - `NODE_VERSION` = `22`
6. Click **Save and Deploy** (first deploy will fail until code is pushed — that's fine)

### Step 0c: DNS Records (lvonguyen.com zone)

1. Go to **lvonguyen.com** zone > **DNS** > **Records**
2. Add record:
   - **Type:** `CNAME`
   - **Name:** `@` (root)
   - **Target:** `portfolio-landing.pages.dev`
   - **Proxy status:** Proxied (orange cloud ON)
3. Add record (optional redirect):
   - **Type:** `CNAME`
   - **Name:** `portfolio`
   - **Target:** `portfolio-landing.pages.dev`
   - **Proxy status:** Proxied (orange cloud ON)

### Step 0d: Custom Domain in CF Pages

1. In **Workers & Pages** > `portfolio-landing` > **Custom domains** > **Set up a custom domain**
2. Enter `lvonguyen.com` > **Continue** > **Activate domain**
3. Repeat for `portfolio.lvonguyen.com`
4. Wait for SSL certificate provisioning (~1-2 min)

### Step 0e: Verify DNS

```bash
dig lvonguyen.com CNAME +short
# Expected: portfolio-landing.pages.dev (or CF proxy IP)

curl -sI https://lvonguyen.com | head -5
# Expected: HTTP/2 200 (or 522 until first successful deploy)
```

---

## Task 1: Scaffold Vite + React + Tailwind

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `index.html` (replace existing)
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Keep: `public/_headers`
- Delete: old `index.html` (root level, replaced by Vite entry)

**Step 1: Initialize project**

```bash
cd /Users/lvonguyen/repos/remote/gh/portfolio/portfolio-site
npm create vite@latest . -- --template react-ts
```

If prompted about existing files, allow overwrite of `index.html` (we'll rebuild it).

**Step 2: Install Tailwind v4**

```bash
npm install
npm install tailwindcss @tailwindcss/vite
```

**Step 3: Configure Vite**

Write `vite.config.ts`:

```typescript
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Step 4: Configure Tailwind theme tokens in `src/index.css`**

```css
@import "tailwindcss";

@theme {
  /* Synthetic palette */
  --color-t100: #E7E7E6;
  --color-t200: #CFCBBF;
  --color-t300: #B8B19C;
  --color-t400: #4E4A3E;
  --color-t500: #1F2822;
  --color-y100: #F5D288;

  /* Semantic aliases */
  --color-background: #E7E7E6;
  --color-surface: #CFCBBF;
  --color-foreground: #1F2822;
  --color-muted: #4E4A3E;
  --color-border: #B8B19C;
  --color-accent: #F5D288;

  /* Fonts */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;
}

@layer base {
  body {
    background-color: theme(colors.background);
    color: theme(colors.foreground);
    font-family: theme(fontFamily.sans);
  }
}
```

**Step 5: Update `index.html` with Google Fonts**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Liem Vo-Nguyen — Cloud Security Engineering Portfolio" />
    <meta property="og:title" content="Liem Vo-Nguyen — Cloud Security Engineering" />
    <meta property="og:description" content="Detection engines, governance platforms, and observability stacks across AWS, Azure & GCP." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://lvonguyen.com" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <title>Liem Vo-Nguyen — Cloud Security Engineering</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 6: Write minimal `src/App.tsx`**

```tsx
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <p className="p-8 font-mono text-2xl">Portfolio v2 — scaffold working</p>
    </div>
  )
}

export default App
```

**Step 7: Verify build**

```bash
npm run dev
# Expected: opens localhost, shows "Portfolio v2 — scaffold working"
# with warm cream background (#E7E7E6) and dark text (#1F2822)
```

```bash
npm run build
# Expected: builds to dist/ with no errors
```

**Step 8: Move `public/_headers` and create favicon**

Ensure `public/_headers` exists (already does). Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#1F2822"/>
  <text x="4" y="24" font-family="monospace" font-weight="700" font-size="22" fill="#F5D288">LV</text>
</svg>
```

Update `public/_headers` CSP to remove the old CDN Tailwind allowance:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; frame-ancestors 'none'
  Cache-Control: public, max-age=3600

/*.html
  Cache-Control: no-cache, no-store, must-revalidate
```

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold React + Vite + Tailwind v4 with Synthetic palette"
```

---

## Task 2: Project Data + Types

**Files:**
- Create: `src/types.ts`
- Create: `src/data/projects.ts`

**Step 1: Define types in `src/types.ts`**

```typescript
export type ProjectStatus = 'active' | 'live' | 'supporting'
export type ProjectTier = 'T1' | 'T2'

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  tier: ProjectTier
  status: ProjectStatus
  techStack: string[]
  githubUrl: string
  icon: string // SVG path data for geometric icon
}
```

**Step 2: Create `src/data/projects.ts`**

```typescript
import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'cloudforge',
    name: 'CloudForge',
    tagline: 'Cloud Governance Platform',
    description:
      'Self-service provisioning with OPA policy enforcement, AI-powered risk scoring, and multi-cloud drift detection. Unified compliance engine mapping findings to NIST, CIS, and ISO frameworks.',
    tier: 'T1',
    status: 'active',
    techStack: ['Go', 'React', 'OPA', 'Terraform', 'OpenTelemetry'],
    githubUrl: 'https://github.com/lvonguyen/cloudforge',
    icon: 'shield-gear',
  },
  {
    id: 'threatforge',
    name: 'ThreatForge',
    tagline: 'Threat Detection Engine',
    description:
      'Real-time threat detection and intelligence correlation engine. Ingests multi-cloud audit logs via Kafka, evaluates against Sigma rules, and routes enriched alerts to Splunk HEC.',
    tier: 'T1',
    status: 'active',
    techStack: ['Go', 'Kafka', 'Redis', 'Sigma Rules', 'Splunk HEC'],
    githubUrl: 'https://github.com/lvonguyen/threatforge',
    icon: 'radar',
  },
  {
    id: 'opportunity-tracker',
    name: 'Opportunity Tracker',
    tagline: 'Career Pipeline Management',
    description:
      'Full-stack career pipeline manager with AI-powered insights. Tracks applications, interviews, and offers with automated status transitions and analytics dashboards.',
    tier: 'T1',
    status: 'live',
    techStack: ['React', 'FastAPI', 'Firestore', 'CF Pages'],
    githubUrl: 'https://github.com/lvonguyen/opportunity-tracker',
    icon: 'pipeline',
  },
  {
    id: 'mco',
    name: 'Multi-Cloud Observability',
    tagline: 'Unified Observability Stack',
    description:
      'Unified observability across AWS, Azure, and GCP. OpenTelemetry collector pipelines feeding Prometheus metrics, Grafana dashboards, and Loki log aggregation.',
    tier: 'T2',
    status: 'supporting',
    techStack: ['Go', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Loki'],
    githubUrl: 'https://github.com/lvonguyen/multi-cloud-observability',
    icon: 'telescope',
  },
  {
    id: 'cspm',
    name: 'CSPM Aggregator',
    tagline: 'Security Posture Scoring',
    description:
      'Cross-cloud security posture normalization with AI-powered risk scoring. Aggregates findings from AWS, Azure, and GCP CSPMs into a unified priority model with contextual meta-patterns.',
    tier: 'T2',
    status: 'supporting',
    techStack: ['Go', 'Claude API', 'AWS', 'Azure', 'GCP'],
    githubUrl: 'https://github.com/lvonguyen/cspm-aggregator',
    icon: 'layers',
  },
]
```

**Step 3: Verify types**

```bash
npx tsc --noEmit
# Expected: no type errors
```

**Step 4: Commit**

```bash
git add src/types.ts src/data/projects.ts
git commit -m "feat: add project data model and typed project array"
```

---

## Task 3: Nav + Hero Components

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

**Step 1: Create `src/components/Nav.tsx`**

```tsx
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
      <span className="font-mono font-bold text-lg tracking-wider">LV</span>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/lvonguyen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <GithubIcon />
        </a>
        <a
          href="https://linkedin.com/in/lvonguyen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
      </div>
    </nav>
  )
}
```

**Step 2: Create `src/components/Hero.tsx`**

```tsx
export function Hero() {
  return (
    <header className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted mb-6">
        Portfolio / 2026
      </p>
      <h1 className="font-mono text-4xl sm:text-5xl font-bold tracking-tight uppercase mb-4">
        Liem Vo-Nguyen
      </h1>
      <hr className="border-border mb-6" />
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
        Cloud Security Engineering
      </h2>
      <p className="text-muted text-base max-w-2xl leading-relaxed mb-6">
        Detection engines, governance platforms, and observability stacks
        across AWS, Azure & GCP.
      </p>
      <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] border border-accent text-accent px-3 py-1.5">
        Status: Available
      </span>
    </header>
  )
}
```

**Step 3: Wire into `src/App.tsx`**

```tsx
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
    </div>
  )
}

export default App
```

**Step 4: Verify**

```bash
npm run dev
# Expected: warm cream page with nav bar (LV + icons),
# hero with name, title, tagline, amber "STATUS: AVAILABLE" badge
```

**Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Hero.tsx src/App.tsx
git commit -m "feat: add Nav and Hero components with Synthetic palette"
```

---

## Task 4: ProjectCard + TechBadge Components

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/TechBadge.tsx`
- Create: `src/components/ProjectIcons.tsx`
- Modify: `src/App.tsx`

**Step 1: Create `src/components/TechBadge.tsx`**

```tsx
interface TechBadgeProps {
  name: string
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="font-mono text-xs px-2 py-0.5 border border-border text-muted">
      {name}
    </span>
  )
}
```

**Step 2: Create `src/components/ProjectIcons.tsx`**

Geometric SVG icons for each project. Each is a simple 24x24 viewBox.

```tsx
const icons: Record<string, JSX.Element> = {
  'shield-gear': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 7v2M12 15v2M7 12h2M15 12h2" />
    </svg>
  ),
  radar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v10" />
      <path d="M12 12l7 7" />
    </svg>
  ),
  pipeline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="2" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <rect x="16" y="15" width="6" height="6" rx="1" />
      <path d="M8 6h4M15 12h4" />
    </svg>
  ),
  telescope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M6 21l6-12 6 12" />
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v1" />
      <path d="M2 12h4M18 12h4" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  ),
}

export function ProjectIcon({ name }: { name: string }) {
  return icons[name] ?? null
}
```

**Step 3: Create `src/components/ProjectCard.tsx`**

```tsx
import { useState } from 'react'
import type { Project } from '@/types'
import { TechBadge } from '@/components/TechBadge'
import { ProjectIcon } from '@/components/ProjectIcons'

const statusLabel: Record<string, string> = {
  active: 'Active Development',
  live: 'Production',
  supporting: 'Supporting',
}

const tierColor: Record<string, string> = {
  T1: 'border-accent text-accent',
  T2: 'border-border text-muted',
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className="bg-surface border border-border cursor-pointer transition-all duration-200"
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => e.key === 'Enter' && setExpanded(!expanded)}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      {/* Collapsed header — always visible */}
      <div className="flex items-center gap-4 px-6 py-5">
        <div className="text-muted">
          <ProjectIcon name={project.icon} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-lg font-semibold uppercase tracking-wide">
              {project.name}
            </h3>
            <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 ${
              project.status === 'live'
                ? 'border-green-600 text-green-700'
                : tierColor[project.tier]
            }`}>
              {project.status === 'live' ? 'Live' : project.tier}
            </span>
          </div>
          <p className="text-sm text-muted mt-0.5">{project.tagline}</p>
        </div>
        <svg
          className={`w-5 h-5 text-muted transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 pt-0 border-t border-border">
          <p className="text-sm text-muted leading-relaxed mt-4 mb-4 max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      )}
    </article>
  )
}
```

**Step 4: Wire projects into `src/App.tsx`**

```tsx
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { ProjectCard } from '@/components/ProjectCard'
import { Footer } from '@/components/Footer'
import { projects } from '@/data/projects'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <main className="max-w-4xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-muted">
            // Projects
          </h2>
          <span className="font-mono text-xs text-t300">
            {projects.length} Projects
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
```

**Step 5: Verify**

```bash
npm run dev
# Expected: project cards render in stacked list
# Click a card — expands to show description, tech badges, GitHub link
# Click again — collapses
# Chevron rotates on expand/collapse
```

**Step 6: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/TechBadge.tsx src/components/ProjectIcons.tsx src/App.tsx
git commit -m "feat: add collapsible ProjectCard with geometric icons and tech badges"
```

---

## Task 5: Footer + Final Assembly

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx` (add Footer import)

**Step 1: Create `src/components/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-mono text-xs text-t300 uppercase tracking-wider">
          vonguyen.io / cloud security / {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/lvonguyen"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-t300 hover:text-foreground transition-colors"
          >
            github.com/lvonguyen
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Add Footer to `src/App.tsx`**

Add import and render `<Footer />` after `</main>`.

**Step 3: Full build verification**

```bash
npm run build
# Expected: clean build, no warnings

npx tsc --noEmit
# Expected: no type errors

ls dist/
# Expected: index.html, assets/
```

**Step 4: Commit**

```bash
git add src/components/Footer.tsx src/App.tsx
git commit -m "feat: add Footer, complete page assembly"
```

---

## Task 6: Polish + Responsive + a11y

**Files:**
- Modify: `src/components/ProjectCard.tsx` (smooth animation)
- Modify: `src/index.css` (add transition utilities if needed)
- Modify: `src/App.tsx` (any final spacing tweaks)

**Step 1: Add smooth expand/collapse animation**

Replace the `{expanded && (...)}` conditional in `ProjectCard.tsx` with a height-transition wrapper using a `<div>` with `overflow-hidden` and CSS `max-height` transition, or use the simpler `grid-rows` animation pattern:

```css
/* Add to src/index.css */
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease;
}
.accordion-content[data-expanded="true"] {
  grid-template-rows: 1fr;
}
.accordion-inner {
  overflow: hidden;
}
```

Update `ProjectCard.tsx` expanded section to use the accordion classes instead of conditional rendering.

**Step 2: Test responsive**

```bash
npm run dev
# Test at 320px, 640px, 768px, 1024px widths
# Hero text should scale down gracefully
# Cards should be full-width at all sizes
# Nav should not wrap
```

**Step 3: Test keyboard navigation**

- Tab through all cards — focus ring should be visible
- Enter key should toggle expand/collapse
- GitHub links inside expanded cards should be tabbable

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: smooth accordion animation, responsive + a11y polish"
```

---

## Task 7: Update CLAUDE.md + Push

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Update CLAUDE.md to reflect new stack**

```markdown
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
- DNS: CNAME `@` (root) → `portfolio-landing.pages.dev`

## Development
```bash
npm run dev    # local dev server
npm run build  # production build
```

## Design
- Design doc: `docs/plans/2026-03-04-portfolio-v2-design.md`
- Palette: Synthetic/Factory warm grays (T-100 through T-500) + amber accent (Y-100)
- Typography: JetBrains Mono (headings/labels), Inter (body)

## Components
- `Nav.tsx` — minimal nav with initials + social links
- `Hero.tsx` — name, title, tagline, status badge
- `ProjectCard.tsx` — collapsible accordion card with icon, metadata, expanded content
- `TechBadge.tsx` — tech stack pill
- `Footer.tsx` — copyright line

## Project Data
Edit `src/data/projects.ts` to add/update project cards.
```

**Step 2: Push to GitHub**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for React + Vite stack"
git push origin main
```

**Step 3: Verify CF Pages deployment**

```bash
# Wait 1-2 min for CF Pages to build
gh api repos/lvonguyen/portfolio-site/actions/runs --jq '.workflow_runs[0] | {status, conclusion}' 2>/dev/null || echo "No GH Actions (CF Pages builds independently)"

# Check CF Pages build (manual — open dash.cloudflare.com > Workers & Pages > portfolio-landing)
# Or:
curl -sI https://lvonguyen.com | head -5
# Expected: HTTP/2 200 (after DNS + CF Pages are configured per Task 0)
```

---

## Task Summary

| Task | Description | Estimated |
|------|-------------|-----------|
| 0 | Manual: GH repo + CF Pages + DNS (human) | 15 min |
| 1 | Scaffold Vite + React + Tailwind + palette | 10 min |
| 2 | Project data model + typed array | 5 min |
| 3 | Nav + Hero components | 10 min |
| 4 | ProjectCard + TechBadge + icons | 15 min |
| 5 | Footer + final assembly | 5 min |
| 6 | Polish: animation, responsive, a11y | 10 min |
| 7 | Update CLAUDE.md + push + verify deploy | 5 min |

**Total implementation: ~75 min** (excludes Task 0 manual steps)
