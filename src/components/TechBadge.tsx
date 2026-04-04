import type React from 'react'

const techIcons: Record<string, React.ReactElement> = {
  Go: (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
      <path d="M3.2 7.4c-.1 0-.1-.1 0-.1l.6-.5c0-.1.1-.1.2-.1h4c.1 0 .1.1.1.1l-.5.5c0 .1-.1.1-.2.1l-4.2-.0z" fill="#00ADD8"/>
      <path d="M1.1 8.6c-.1 0-.1-.1 0-.1l.6-.5c0-.1.1-.1.2-.1h5.1c.1 0 .1.1.1.1l-.2.5c0 .1-.1.1-.2.1l-5.6-.0z" fill="#00ADD8"/>
      <path d="M4.8 9.8c-.1 0-.1-.1 0-.2l.4-.5c0-.1.1-.1.2-.1h2.2c.1 0 .1.1.1.2l-.1.4c0 .1-.1.1-.2.1l-2.6.1z" fill="#00ADD8"/>
      <path d="M11.3 7.2c-1.1.3-1.8.5-2.9.8-.2.1-.3.1-.3.3.2.3.4.5.6.8.1.1.2.1.3.1l2.5-1c.1-.1.2-.1.1-.3l-.3-.7z" fill="#00ADD8"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
      <circle cx="8" cy="8" r="1.5" fill="#61DAFB"/>
      <ellipse cx="8" cy="8" rx="6" ry="2.5" fill="none" stroke="#61DAFB" strokeWidth="0.8"/>
      <ellipse cx="8" cy="8" rx="6" ry="2.5" fill="none" stroke="#61DAFB" strokeWidth="0.8" transform="rotate(60 8 8)"/>
      <ellipse cx="8" cy="8" rx="6" ry="2.5" fill="none" stroke="#61DAFB" strokeWidth="0.8" transform="rotate(120 8 8)"/>
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
      <path d="M5.5 9.2c0 .2 0 .4.1.5.1.1.2.3.3.4 0 .1.1.1.1.2s-.1.1-.2.2l-.7.5c-.1 0-.1.1-.2.1s-.1-.1-.2-.1c-.1-.1-.2-.3-.3-.4-.1-.2-.2-.3-.3-.5-.8.9-1.7 1.4-2.8 1.4-.8 0-1.4-.2-1.9-.7S0 9.9 0 9.2c0-.8.3-1.4.9-1.9.6-.5 1.3-.7 2.3-.7.3 0 .7 0 1 .1.4.1.7.1 1.1.2v-.7c0-.7-.1-1.2-.4-1.5-.3-.3-.8-.4-1.5-.4-.3 0-.7 0-1 .1-.4.1-.7.2-1 .4-.1.1-.2.1-.3.1-.1 0-.1-.1-.1-.2v-.6c0-.1 0-.2.1-.3.1-.1.1-.1.3-.2.3-.2.7-.3 1.2-.4.5-.1.9-.2 1.5-.2 1.1 0 1.9.3 2.5.8.5.5.8 1.3.8 2.3v3.1z" fill="#F59E0B"/>
      <path d="M2.3 10.3c.3 0 .6-.1.9-.2.3-.1.6-.4.9-.7.1-.2.2-.4.3-.6.1-.2.1-.5.1-.8v-.4c-.3-.1-.6-.1-.9-.2-.3 0-.6-.1-.9-.1-.6 0-1.1.1-1.4.4-.3.2-.5.6-.5 1.1 0 .4.1.7.3 1 .3.2.6.4 1.2.5z" fill="#F59E0B"/>
      <path d="M14.7 11.2c-.1 0-.2 0-.3-.1-.1-.1-.2-.2-.2-.4l-2.4-7.9c-.1-.2-.1-.3-.1-.3 0-.2.1-.3.3-.3h1.1c.2 0 .3 0 .3.1.1.1.1.2.2.4l1.7 6.7L16 3.2" fill="#F59E0B"/>
    </svg>
  ),
  Azure: (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
      <path d="M6.5 1.5L1.5 13h3.2l1-2.3h4.6l1 2.3h3.2L9.5 1.5H6.5zM6.7 8.7L8 5.4l1.3 3.3H6.7z" fill="#0078D4"/>
    </svg>
  ),
  GCP: (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
      <path d="M10.1 4.6l1.4-1.4.1-.6C10.5 1.5 9.3 1 8 1 5.7 1 3.8 2.5 3.2 4.5l.5.1 1.4-.2.3-.3c.7-1.2 2-2 3.5-1.8 1 .1 1.9.6 2.5 1.3l-1.3 1z" fill="#EA4335"/>
      <path d="M12.8 4.5c-.5-1.1-1.3-2-2.3-2.6l-1.9 1.9c.8.6 1.3 1.5 1.4 2.5v.3c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H8l-.3.3v1.8l.3.3h2c1.6 0 3-1.3 3-3 0-1-.5-2-1.2-2.5z" fill="#4285F4"/>
      <path d="M4 12h2l.3-.3V9.9l-.3-.3H4c-.3 0-.5-.1-.7-.2l-.5.2-1.4 1.4-.1.5C2 12 3 12.7 4 12.7" fill="#34A853"/>
      <path d="M4 5.3c-1.6 0-3 1.3-3 3 0 1 .5 1.9 1.3 2.5l2-2c-.4-.3-.5-.8-.3-1.3.2-.4.6-.7 1-.7h.1l2-2c-.6-.4-1.3-.6-2-.5z" fill="#FBBC05"/>
    </svg>
  ),
  Terraform: (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
      <path d="M5.9 3v3.5l3 1.7V4.7L5.9 3z" fill="#5C4EE5"/>
      <path d="M9.4 4.7v3.5l3 1.7V6.4L9.4 4.7z" fill="#5C4EE5"/>
      <path d="M2.4 1.3v3.5l3 1.7V3L2.4 1.3z" fill="#5C4EE5"/>
      <path d="M9.4 9.4v3.5l3 1.7v-3.5L9.4 9.4z" fill="#5C4EE5"/>
    </svg>
  ),
}

interface TechBadgeProps {
  name: string
}

export function TechBadge({ name }: TechBadgeProps) {
  const icon = techIcons[name]
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 border border-border text-muted">
      {icon}
      {name}
    </span>
  )
}
