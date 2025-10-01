'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import FeaturedAssets from '@/components/sections/FeaturedAssets'
import PlatformStats from '@/components/sections/PlatformStats'
import AuctionBar from '@/components/sections/AuctionBar'

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

      {/* Elegant Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-financial-deep via-financial-dark to-black"></div>
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent-success/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-accent-primary/10 to-transparent"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-success/30 rounded-full"
              initial={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
              }}
              animate={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
              }}
              transition={{
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        {/* Animated Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-accent-success/5 to-accent-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <Header />
      
      {/* Professional Auction Bar */}
      <AuctionBar />
      
      <Hero />
      <FeaturedAssets />
      <PlatformStats />

      <footer className="glass-nav border-t border-accent-success/20 py-8 relative z-10">
        <div className="container-pro">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-neutral-mid">© 2024 Asset Ride. All rights reserved.</p>
              <p className="text-neutral-mid text-sm mt-1">
                Tokenizing Real World Assets • Built with Next.js 14
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors text-sm">Terms</a>
              <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors text-sm">Privacy</a>
              <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
