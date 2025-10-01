'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import FeaturedAssets from '@/components/sections/FeaturedAssets'
import PlatformStats from '@/components/sections/PlatformStats'
import AuctionBar from '@/components/sections/AuctionBar'
import ValueProposition from '@/components/sections/ValueProposition'

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

      {/* Super Professional Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-financial-deep via-financial-dark to-financial-deep"></div>
        
        {/* Animated Mesh Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            backgroundPosition: 'center center'
          }}
        ></div>

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-success/10 to-accent-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-accent-success/30 to-transparent"
              style={{
                top: `${20 + i * 30}%`,
                left: '0%',
                right: '0%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-success/40 rounded-full"
              initial={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
                scale: 0,
              }}
              animate={{
                x: Math.random() * 100 + 'vw',
                y: Math.random() * 100 + 'vh',
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Pulse Rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-success rounded-full"
          animate={{
            scale: [1, 100, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </div>

      <Header />
      
      {/* Professional Auction Bar */}
      <AuctionBar />
      
      <Hero />
      <ValueProposition />
      <FeaturedAssets />
      <PlatformStats />

      <footer className="glass-nav border-t border-accent-success/20 py-12 relative z-10 mt-20">
        <div className="container-pro">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-accent-success to-accent-primary rounded-lg" />
                <span className="text-xl font-bold text-white">Asset Ride</span>
              </div>
              <p className="text-neutral-mid text-sm">Tokenizing the future of real-world assets</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors text-sm">Documentation</a>
              <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors text-sm">Contact Support</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-6 pt-6 text-center">
            <p className="text-neutral-mid text-sm">
              © 2024 Asset Ride Technologies. All rights reserved. Built with Next.js 14
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
