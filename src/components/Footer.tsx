export function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-mono text-xs text-t300 uppercase tracking-wider">
          vonguyen.io / cloud security / {new Date().getFullYear()}
        </p>
        <a
          href="https://github.com/lvonguyen"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-t300 hover:text-foreground transition-colors"
        >
          github.com/lvonguyen
        </a>
      </div>
    </footer>
  )
}
