import React from 'react'

const AnimatedCounter = ({ target = 0, suffix = '', prefix = '', className = '' }) => (
  <span className={className}>{prefix}{target}{suffix}</span>
)

export default AnimatedCounter