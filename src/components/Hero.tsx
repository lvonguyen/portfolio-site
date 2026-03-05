import { useState, useEffect } from 'react'

const keywords = [
  'Zero Trust Architecture',
  'Hybrid Identity Federation',
  'Security Governance & Compliance',
  'Detection Engineering',
  'Cloud Security Posture Management',
  'Enterprise Platform Security',
]

function useTypingEffect(words: string[], typeSpeed = 80, deleteSpeed = 40, pause = 2000) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]

    if (!isDeleting && text === current) {
      const timeout = setTimeout(() => setIsDeleting(true), pause)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setText(
          isDeleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        )
      },
      isDeleting ? deleteSpeed : typeSpeed,
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] px-3 py-1.5 border border-[#2D6A2E] text-[#2D6A2E] bg-[#2D6A2E]/5 dark:text-[#5CB85C] dark:border-[#5CB85C] dark:bg-[#5CB85C]/10">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2D6A2E] opacity-75 dark:bg-[#5CB85C]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2D6A2E] dark:bg-[#5CB85C]" />
      </span>
      Status: Available
    </span>
  )
}

export function Hero() {
  const typed = useTypingEffect(keywords)

  return (
    <section className="max-w-4xl mx-auto px-6 pt-10 pb-10 sm:pt-14 sm:pb-12">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted mb-4">
        Portfolio / 2026
      </p>
      <h1 className="font-mono text-4xl sm:text-5xl font-bold tracking-tight uppercase mb-3">
        Liem Vo-Nguyen
      </h1>
      <hr className="border-border mb-4" />
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
        Senior Security Architect
        <span className="inline-block font-mono text-xs uppercase tracking-[0.15em] border border-border text-muted px-2 py-0.5 ml-3 align-middle">
          CISSP
        </span>
      </h2>
      <p className="text-muted text-base max-w-2xl leading-relaxed mb-2">
        Enterprise security strategy spanning cloud platforms, identity architecture, and governance.
      </p>
      <p className="font-mono text-sm text-foreground h-6 mb-6">
        {typed}
        <span className="animate-blink">|</span>
      </p>
      <div className="flex items-center gap-4 flex-wrap">
        <StatusBadge />
        <a
          href="#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] border border-foreground text-foreground px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors no-print-link"
        >
          View Projects
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
