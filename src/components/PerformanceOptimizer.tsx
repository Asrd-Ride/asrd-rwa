'use client'
import { useEffect, useState } from 'react'

interface PerformanceOptimizerProps {
  children: React.ReactNode
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [isSlowDevice, setIsSlowDevice] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    // Check for slow devices
    const isSlow = !window.matchMedia('(min-width: 1024px)').matches && 
                  navigator.hardwareConcurrency <= 4
    
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(motionQuery.matches)

    setIsSlowDevice(isSlow)

    // Listen for changes in motion preference
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches)
    }
    
    motionQuery.addEventListener('change', handleMotionChange)
    return () => motionQuery.removeEventListener('change', handleMotionChange)
  }, [])

  return (
    <div className={`performance-optimized ${isSlowDevice ? 'reduced-animations' : ''} ${reduceMotion ? 'no-animations' : ''}`}>
      {children}
    </div>
  )
}
