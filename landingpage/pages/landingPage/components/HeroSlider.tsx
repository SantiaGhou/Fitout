'use client'

import { useRef, useState } from 'react'

export function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dividerX, setDividerX] = useState(50)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    if (!containerRef.current) return

    const bounds = containerRef.current.getBoundingClientRect()
    const x = clientX - bounds.left
    const percent = (x / bounds.width) * 100
    setDividerX(Math.max(0, Math.min(100, percent)))
  }

  const safeDividerX = Math.min(99.9, Math.max(0.1, dividerX))

  const showAntes = dividerX <= 5
  const showDepois = dividerX >= 95

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMove}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onTouchMove={handleMove}
      className="relative w-full max-w-[500px] h-[500px] overflow-hidden rounded-xl cursor-ew-resize select-none"
    >
      <img
        src="/assets/images/Antes.png"
        alt="Antes"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          clipPath: `inset(0 ${100 - safeDividerX}% 0 0)`,
        }}
        draggable={false}
      />

      <img
        src="/assets/images/Depois.png"
        alt="Depois"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          clipPath: `inset(0 0 0 ${safeDividerX}%)`,
        }}
        draggable={false}
      />

      <div
        className="absolute top-0 bottom-0 z-10"
        style={{
          left: `${dividerX}%`,
          transform: 'translateX(-50%)',
          backgroundColor: '#F74D00',
          width: '4px',
        }}
      />

      <span
        className={`absolute top-4 left-4 text-white font-bold text-xl transition-opacity duration-500 transform px-3 py-1 rounded ${
          showAntes ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        style={{ backgroundColor: '#3fbe3fff' }}
      >
        Depois
      </span>

      <span
        className={`absolute top-4 right-4 text-white font-bold text-xl transition-opacity duration-500 transform px-3 py-1 rounded ${
          showDepois ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        style={{ backgroundColor: '#E03C3C' }}
      >
        Antes
      </span>
    </div>
  )
}
