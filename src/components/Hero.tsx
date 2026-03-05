export function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted mb-6">
        Portfolio / 2026
      </p>
      <h1 className="font-mono text-4xl sm:text-5xl font-bold tracking-tight uppercase mb-4">
        Liem Vo-Nguyen
      </h1>
      <hr className="border-border mb-6" />
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
        Senior Security Architect
      </h2>
      <p className="text-muted text-base max-w-2xl leading-relaxed mb-6">
        Enterprise security architecture across AWS, Azure, and GCP. Zero Trust design, cross-cloud identity federation, and security governance frameworks.
      </p>
      <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] border border-accent text-accent px-3 py-1.5">
        Status: Available
      </span>
    </section>
  )
}
