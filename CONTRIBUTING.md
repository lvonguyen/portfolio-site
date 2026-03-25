# Contributing

This is a personal portfolio site. Contributions are welcome for bug fixes and improvements.

## Prerequisites

- Node.js >= 18
- npm or pnpm

## Development Setup

```bash
git clone https://github.com/lvonguyen/portfolio-site.git
cd portfolio-site
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Pull Requests

1. Fork the repo and create a feature branch from `main`.
2. Keep changes focused -- one concern per PR.
3. Run `npm run lint` and `npm run build` before submitting.
4. Provide a clear description of what changed and why.

## Code Style

- TypeScript strict mode -- no `any` unless unavoidable.
- Use ESLint (`npm run lint`) for formatting and lint checks.
- Prefer named exports over default exports.
- Keep components small and single-purpose.
