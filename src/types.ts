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
  icon: string
  metrics?: string[]
  liveUrl?: string
  diagramUrl?: string
}
