'use client'

import { useEffect, useRef } from 'react'

export function Premium3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Enhanced particle system with 3D depth
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      life: number
    }> = []

    const colors = [
      '#00F5FF', '#4361EE', '#7209B7', '#F72585', '#FFD166', '#06D6A0'
    ]

    // Create particles with depth
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 100
      })
    }

    // 3D Animation with depth perception
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 11, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position with 3D depth
        particle.x += particle.vx * (particle.z / 50)
        particle.y += particle.vy * (particle.z / 50)
        particle.z += particle.vz
        particle.life += 0.1

        // Wrap around edges with depth consideration
        if (particle.x < -100) particle.x = canvas.width + 100
        if (particle.x > canvas.width + 100) particle.x = -100
        if (particle.y < -100) particle.y = canvas.height + 100
        if (particle.y > canvas.height + 100) particle.y = -100
        if (particle.z < 0) particle.z = 100
        if (particle.z > 100) particle.z = 0

        // Calculate size based on depth (parallax effect)
        const depthSize = particle.size * (particle.z / 50)
        const alpha = 0.4 + Math.sin(particle.life * 0.1) * 0.3

        // Draw particle with depth
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, depthSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = alpha * (particle.z / 100)
        ctx.fill()

        // Draw 3D connections between particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const dz = Math.abs(particle.z - otherParticle.z)
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Connect particles that are close in 3D space
          if (distance < 150 && dz < 30) {
            ctx.beginPath()
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = 0.1 * (1 - distance / 150) * (1 - dz / 30)
            ctx.lineWidth = 0.8
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #0A0B0F 0%, #0F1117 30%, #1A1D29 70%, #0A0B0F 100%)',
        opacity: 0.6
      }}
    />
  )
}
