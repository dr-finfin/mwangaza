import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'

const AnimatedLogo = ({ size = 'md', onClick }) => {
  const { setLogoExpanded, logoExpanded } = useApp()
  const containerRef = useRef(null)
  const iconRef = useRef(null)
  const fullRef = useRef(null)
  const [iconWidth, setIconWidth] = useState(48)
  const [fullWidth, setFullWidth] = useState(120)
  const [height, setHeight] = useState(48)

  // Map size to tailwind responsive height classes
  const sizeClasses = {
    sm: 'h-9 sm:h-10',          // 36px mobile, 40px desktop
    md: 'h-10 sm:h-14',         // 40px mobile, 56px desktop
    lg: 'h-12 sm:h-16',         // 48px mobile, 64px desktop
    xl: 'h-14 sm:h-20',         // 56px mobile, 80px desktop
  }

  // Measure rendered height and image aspect ratios
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight
        setHeight(h)

        if (iconRef.current?.naturalWidth) {
          const ratio = iconRef.current.naturalWidth / iconRef.current.naturalHeight
          setIconWidth(h * ratio)
        }
        if (fullRef.current?.naturalWidth) {
          const ratio = fullRef.current.naturalWidth / fullRef.current.naturalHeight
          setFullWidth(h * ratio)
        }
      }
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const handleClick = (e) => {
    e.stopPropagation()
    setLogoExpanded(!logoExpanded)
    onClick?.(e)
  }

  return (
    <button
      ref={containerRef}
      onClick={handleClick}
      aria-label="Mwangaza"
      className={`relative inline-block overflow-hidden transition-all duration-500 ease-out ${sizeClasses[size] || sizeClasses.md}`}
      style={{
        width: `${logoExpanded ? fullWidth : iconWidth}px`,
      }}
    >
      <img
        ref={iconRef}
        src="/mwangaza_icon.png"
        alt=""
        className="absolute top-0 left-0 h-full w-auto transition-opacity duration-500"
        style={{ opacity: logoExpanded ? 0 : 1 }}
        onLoad={(e) => {
          if (containerRef.current) {
            const h = containerRef.current.offsetHeight
            const ratio = e.target.naturalWidth / e.target.naturalHeight
            setIconWidth(h * ratio)
            setHeight(h)
          }
        }}
      />

      <img
        ref={fullRef}
        src="/mwangaza_logo.png"
        alt=""
        className="absolute top-0 left-0 h-full w-auto transition-opacity duration-500"
        style={{ opacity: logoExpanded ? 1 : 0 }}
        onLoad={(e) => {
          if (containerRef.current) {
            const h = containerRef.current.offsetHeight
            const ratio = e.target.naturalWidth / e.target.naturalHeight
            setFullWidth(h * ratio)
          }
        }}
      />
    </button>
  )
}

export default AnimatedLogo