"use client"
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/sections/Dashboard'

export default function PortfolioPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen immersive-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-glow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-light">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen immersive-bg">
      <Dashboard />
    </div>
  )
}
