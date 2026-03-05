import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { ProjectCard } from '@/components/ProjectCard'
import { Footer } from '@/components/Footer'
import { projects } from '@/data/projects'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <Hero />
      <main className="max-w-4xl mx-auto px-6 pb-16 w-full flex-1">
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
      <Footer />
    </div>
  )
}

export default App
