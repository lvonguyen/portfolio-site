import { useState, useRef, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface DiagramViewerProps {
  src: string
  alt: string
  onClose: () => void
}

export function DiagramViewer({ src, alt, onClose }: DiagramViewerProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    setScale(prev => Math.min(Math.max(0.3, prev + delta), 5))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  function handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return
    dragging.current = true
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging.current) return
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    })
  }

  function handleMouseUp() {
    dragging.current = false
  }

  function zoomIn() {
    setScale(s => Math.min(s + 0.25, 5))
  }

  function zoomOut() {
    setScale(s => Math.max(s - 0.25, 0.3))
  }

  function resetView() {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/85">
      {/* Toolbar */}
      <div className="absolute top-4 right-4 flex items-center gap-1 z-10">
        <button
          onClick={zoomIn}
          className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-mono text-sm border border-white/20 transition-colors"
          aria-label="Zoom in"
        >
          +
        </button>
        <span className="px-2 text-white/70 font-mono text-xs min-w-[48px] text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={zoomOut}
          className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-mono text-sm border border-white/20 transition-colors"
          aria-label="Zoom out"
        >
          &minus;
        </button>
        <button
          onClick={resetView}
          className="h-8 px-3 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20 transition-colors ml-1"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-mono text-sm border border-white/20 transition-colors ml-1"
          aria-label="Close diagram"
        >
          &times;
        </button>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 font-mono text-xs z-10 pointer-events-none">
        Scroll to zoom &middot; Drag to pan &middot; Esc to close
      </div>

      {/* Pan/zoom area */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-w-none pointer-events-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        />
      </div>
    </div>,
    document.body,
  )
}
