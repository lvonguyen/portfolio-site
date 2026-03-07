import { useRef, useState, useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { ProjectCard } from '@/components/ProjectCard'
import { Footer } from '@/components/Footer'
import { projects } from '@/data/projects'

function AnimatedCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-foreground focus:text-background focus:px-4 focus:py-2 font-mono text-sm no-print-link"
      >
        Skip to content
      </a>
      <Nav />
      <Hero />
      <main id="main-content" className="max-w-4xl mx-auto px-6 pb-16 w-full flex-1">
        <div id="projects" className="mb-6 scroll-mt-4">
          <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-muted">
            // Projects
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {projects.map((project, i) => (
            <AnimatedCard key={project.id} delay={i * 100}>
              <ProjectCard project={project} />
            </AnimatedCard>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
