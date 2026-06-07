import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'

const AnimatedLogo = ({ height = 64, onClick }) => {
  const { setLogoExpanded, logoExpanded } = useApp()
  const iconRef = useRef(null)
  const fullRef = useRef(null)
  const [iconWidth, setIconWidth] = useState(height)
  const [fullWidth, setFullWidth] = useState(height * 2.5)

  useEffect(() => {
    const measure = () => {
      if (iconRef.current?.naturalWidth) {
        const ratio = iconRef.current.naturalWidth / iconRef.current.naturalHeight
        setIconWidth(height * ratio)
      }
      if (fullRef.current?.naturalWidth) {
        const ratio = fullRef.current.naturalWidth / fullRef.current.naturalHeight
        setFullWidth(height * ratio)
      }
    }
    measure()
  }, [height])

  const handleClick = (e) => {
    e.stopPropagation()
    setLogoExpanded(!logoExpanded)
    onClick?.(e)
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Mwangaza"
      className="relative inline-block overflow-hidden transition-all duration-500 ease-out"
      style={{
        height: `${height}px`,
        width: `${logoExpanded ? fullWidth : iconWidth}px`,
      }}
    >
      <img
        ref={iconRef}
        src="/mwangaza_icon.png"
        alt=""
        className="absolute top-0 left-0 h-full w-auto transition-opacity duration-500"
        style={{ opacity: logoExpanded ? 0 : 1 }}
      />

      <img
        ref={fullRef}
        src="/mwangaza_logo.png"
        alt=""
        className="absolute top-0 left-0 h-full w-auto transition-opacity duration-500"
        style={{ opacity: logoExpanded ? 1 : 0 }}
      />
    </button>
  )
}

export default AnimatedLogo