'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import FeaturedAssets from '@/components/sections/FeaturedAssets'
import PlatformStats from '@/components/sections/PlatformStats'

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

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-financial-deep via-financial-dark to-black"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-success rounded-full"
              initial={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
              }}
              animate={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-accent-success/10 to-accent-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <Header />
      <Hero />
      <FeaturedAssets />
      <PlatformStats />

      <footer className="glass-nav border-t border-accent-success/20 py-8 relative z-10">
        <div className="container-pro text-center">
          <p className="text-neutral-mid">© 2024 Asset Ride. All rights reserved.</p>
          <p className="text-neutral-mid text-sm mt-2">
            Tokenizing Real World Assets • Built with Next.js 14
          </p>
        </div>
      </footer>
    </main>
  )
}
