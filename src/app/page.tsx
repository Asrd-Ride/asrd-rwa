'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import FeaturedAssets from '@/components/sections/FeaturedAssets'
import DAO from '@/components/sections/DAO'
import Dashboard from '@/components/sections/Dashboard'
import Treasury from '@/components/sections/Treasury'

export default function Home() {
  const { isLoading } = useApp()

  return (
    <main className="min-h-screen bg-gradient-to-br from-financial-deep to-black text-white overflow-x-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-accent-success border-t-transparent rounded-full"
          />
        </motion.div>
      )}

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-success/10 via-financial-dark to-black"></div>

      <Header />
      <Hero />
      <FeaturedAssets />
      <DAO />
      <Dashboard />
      <Treasury />

      <footer className="glass-nav border-t border-accent-success/20 py-8">
        <div className="container-pro text-center">
          <p className="text-neutral-mid">© 2024 Asset Ride. All rights reserved.</p>
          <p className="text-neutral-mid text-sm mt-2">
            Built with Next.js 14 • Deployed on Vercel
          </p>
        </div>
      </footer>
    </main>
  )
}
