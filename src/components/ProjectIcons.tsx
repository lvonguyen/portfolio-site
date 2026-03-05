const icons: Record<string, React.ReactElement> = {
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
