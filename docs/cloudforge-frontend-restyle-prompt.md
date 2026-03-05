# CloudForge Frontend — Restyle to Portfolio Design System

## Context

The CloudForge frontend (`frontend/`) is already a fully functional React 19 + Vite + TypeScript + Tailwind v4 app with:
- **3 role-based views** (admin, operator, requester) with complete routing
- **Sidebar navigation** that changes per role with collapsible sections
- **Role switcher** dropdown in the nav (admin/operator/requester)
- **Mock data** in `src/lib/mock/` (findings, agents, costs, frameworks, traces)
- **Auth context** using Cloudflare Access JWT (prod) + local dev role switcher
- **API client** (`src/lib/api.ts`) using TanStack Query, pointed at `/api/v1`
- **shadcn/ui components** (Radix primitives): badge, button, card, dialog, dropdown-menu, input, label, select, separator, sheet, table, tabs
- **Domain components**: FindingCard, SeverityBadge, ComplianceScore, FrameworkGrid, AgentCard, CostSummaryCard, SpendChart, RemediationTierBadge, DryRunPreview, etc.

### Existing Pages
| View | Route | Page | Description |
|------|-------|------|-------------|
| Admin | `/admin` | Dashboard | Platform overview |
| Admin | `/admin/policies` | Policies | OPA policy management |
| Admin | `/admin/ai-agents` | AI Agents | AI governance agents list |
| Admin | `/admin/ai-agents/:id` | AI Agent Detail | Individual agent view |
| Admin | `/admin/users` | Users | User management |
| Admin | `/admin/audit-log` | Audit Log | Activity trail |
| Admin | `/admin/system` | System Health | Platform metrics |
| Operator | `/ops` | Command Center | Ops dashboard |
| Operator | `/ops/findings` | Findings | Findings explorer with filters |
| Operator | `/ops/findings/:id` | Finding Detail | Individual finding |
| Operator | `/ops/remediation` | Remediation Queue | Remediation pipeline |
| Operator | `/ops/costs` | Costs | FinOps dashboard |
| Operator | `/ops/compliance` | Compliance | Compliance framework status |
| Requester | `/portal` | Dashboard | User's posture overview |
| Requester | `/portal/request` | Request | New provisioning request |
| Requester | `/portal/requests` | My Requests | Request history |
| Requester | `/portal/requests/:id` | Request Detail | Individual request |
| Requester | `/portal/catalog` | Catalog | Resource catalog browser |

### Existing Layout
- `AppShell.tsx`: flex container with TopNav + Sidebar + main content (Outlet)
- `Sidebar.tsx`: role-aware nav with collapsible sections, Lucide icons
- `TopNav.tsx`: top navigation bar
- `RoleSwitcher.tsx`: dropdown to switch between admin/operator/requester roles

## Task: Restyle to Match Portfolio Landing Page

The current design uses the default shadcn/ui cool-gray HSL palette. Replace it entirely with the portfolio site's warm industrial design system.

### Design Tokens — Replace in `src/index.css`

**Light mode (default):**
```css
@theme {
  --color-background: #E7E7E6;
  --color-surface: #CFCBBF;
  --color-foreground: #1F2822;
  --color-muted: #4E4A3E;
  --color-border: #B8B19C;
  --color-accent: #F5D288;

  /* Map shadcn semantic tokens to portfolio palette */
  --color-card: #CFCBBF;
  --color-card-foreground: #1F2822;
  --color-popover: #CFCBBF;
  --color-popover-foreground: #1F2822;
  --color-primary: #1F2822;
  --color-primary-foreground: #E7E7E6;
  --color-secondary: #CFCBBF;
  --color-secondary-foreground: #1F2822;
  --color-muted-foreground: #4E4A3E;
  --color-accent-foreground: #1F2822;
  --color-destructive: #B91C1C;
  --color-destructive-foreground: #E7E7E6;
  --color-input: #B8B19C;
  --color-ring: #F5D288;
  --color-sidebar-background: #CFCBBF;
  --color-sidebar-foreground: #4E4A3E;
  --color-sidebar-primary: #1F2822;
  --color-sidebar-primary-foreground: #E7E7E6;
  --color-sidebar-accent: #B8B19C;
  --color-sidebar-accent-foreground: #1F2822;
  --color-sidebar-border: #B8B19C;
  --color-sidebar-ring: #F5D288;
  --radius: 0;  /* Sharp corners — industrial aesthetic */

  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

**Dark mode (add `.dark` override in `@layer base`):**
```css
.dark {
  --color-background: #1A1D1A;
  --color-surface: #252A25;
  --color-foreground: #E7E7E6;
  --color-muted: #9B9588;
  --color-border: #3D3B34;
  --color-accent: #F5D288;
  --color-card: #252A25;
  --color-card-foreground: #E7E7E6;
  --color-popover: #252A25;
  --color-popover-foreground: #E7E7E6;
  --color-primary: #E7E7E6;
  --color-primary-foreground: #1A1D1A;
  --color-secondary: #252A25;
  --color-secondary-foreground: #E7E7E6;
  --color-muted-foreground: #9B9588;
  --color-accent-foreground: #1A1D1A;
  --color-destructive: #EF4444;
  --color-destructive-foreground: #E7E7E6;
  --color-input: #3D3B34;
  --color-ring: #F5D288;
  --color-sidebar-background: #252A25;
  --color-sidebar-foreground: #9B9588;
  --color-sidebar-primary: #E7E7E6;
  --color-sidebar-primary-foreground: #1A1D1A;
  --color-sidebar-accent: #3D3B34;
  --color-sidebar-accent-foreground: #E7E7E6;
  --color-sidebar-border: #3D3B34;
  --color-sidebar-ring: #F5D288;
}
```

### Typography
Add Google Fonts to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

### Style Conventions to Apply
- **No rounded corners** — set `--radius: 0`. The portfolio uses sharp edges throughout.
- **Borders**: 1px solid, border color from palette. No shadows except subtle hover states.
- **Hover states**: `hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]`
- **Focus**: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent`
- **Section headers**: font-mono, text-sm, uppercase, tracking-[0.25em], text-muted (e.g., `// FINDINGS`)
- **Badges/pills**: font-mono, text-xs, uppercase, tracking-wide, border outline style
- **Transitions**: duration-200 for interactions, duration-500 for entrance animations

### Dark Mode Toggle
Add a dark mode toggle to `TopNav.tsx`:
- Sun/moon icon button
- Persists to `localStorage` key `'theme'`
- Respects `prefers-color-scheme` on first visit
- Add inline `<script>` in `index.html` to set `.dark` class before render:
```html
<script>
  (function() {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

### Landing Page Update
The current `src/pages/Landing.tsx` should become the entry point visitors see. Update it to:
- Show a brief CloudForge product overview in the portfolio's visual style
- Include a prominent "Enter Demo" button that navigates to `/ops` (the most visually impressive view)
- Show the role switcher concept — explain the 3 personas
- Keep it clean and minimal, matching lvonguyen.com's aesthetic

### Deployment
- Platform: Cloudflare Pages
- Project name: `cloudforge-demo`
- Root directory: `frontend`
- Build command: `npm run build`
- Build output: `dist`
- No backend needed — all data comes from `src/lib/mock/` JSON files

### Scope
1. **Restyle only** — do NOT restructure the routing, component architecture, or data fetching patterns. The existing architecture is good.
2. **Replace the color palette** in `src/index.css` with the tokens above
3. **Update all shadcn/ui components** in `src/components/ui/` to use sharp corners (remove all `rounded-*` classes, replace with sharp edges)
4. **Apply JetBrains Mono** to headings, labels, nav items, badges, and monospace elements
5. **Apply Inter** as the body font
6. **Add dark mode** toggle and CSS variable overrides
7. **Update the Landing page** to match portfolio aesthetic with demo entry CTA
8. **Verify** all 3 views render correctly with the new palette by running `npm run dev` and checking each role

### Do NOT Change
- Router structure or routes
- Auth context or role switching logic
- API client or TanStack Query setup
- Mock data files
- Domain component logic (only restyle them)
- Any backend code
