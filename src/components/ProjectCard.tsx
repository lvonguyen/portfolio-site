import { useState } from 'react'
import type { Project } from '@/types'
import { TechBadge } from '@/components/TechBadge'
import { ProjectIcon } from '@/components/ProjectIcons'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function statusBadgeClass(status: Project['status'], tier: Project['tier']): string {
  if (status === 'live') return 'border border-green-600 text-green-700'
  if (tier === 'T1') return 'border border-accent text-accent'
  return 'border border-border text-muted'
}

function statusLabel(status: Project['status'], tier: Project['tier']): string {
  if (status === 'live') return 'Live'
  return tier
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  function toggle() {
    setExpanded((prev) => !prev)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') toggle()
  }

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className="border border-border bg-surface cursor-pointer select-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* Collapsed header — always visible */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="text-foreground shrink-0">
          <ProjectIcon name={project.icon} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm text-foreground">{project.name}</span>
            <span className={`font-mono text-xs px-1.5 py-0.5 ${statusBadgeClass(project.status, project.tier)}`}>
              {statusLabel(project.status, project.tier)}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5 truncate">{project.tagline}</p>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Expandable content */}
      <div
        className="grid transition-all duration-200"
        style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1 border-t border-border">
            <p className="text-sm text-muted leading-relaxed mb-3">{project.description}</p>

            {project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              <GitHubIcon />
              <span className="font-mono">View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
