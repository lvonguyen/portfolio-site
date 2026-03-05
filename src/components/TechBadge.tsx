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
