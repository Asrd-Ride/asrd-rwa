'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedAssetsSection from '@/components/sections/FeaturedAssetsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import PlatformStatsSection from '@/components/sections/PlatformStatsSection'
import CTASection from '@/components/sections/CTASection'

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

      {/* Professional Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-financial-deep via-financial-dark to-financial-deep"></div>
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-accent-success/10 to-accent-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <Header />
      
      {/* Main Sections */}
      <HeroSection />
      <HowItWorksSection />
      <FeaturedAssetsSection />
      <PlatformStatsSection />
      <CTASection />

      {/* Professional Footer */}
      <footer className="glass-nav border-t border-accent-success/20 py-12 relative z-10">
        <div className="container-pro">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-accent-success to-accent-primary rounded-lg" />
                <span className="text-xl font-bold text-white">Asset Ride</span>
              </div>
              <p className="text-neutral-mid text-sm">
                Tokenizing premium real-world assets through blockchain technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm">
                <a href="/marketplace" className="text-neutral-mid hover:text-accent-success transition-colors block">Marketplace</a>
                <a href="/dashboard" className="text-neutral-mid hover:text-accent-success transition-colors block">Dashboard</a>
                <a href="/dao" className="text-neutral-mid hover:text-accent-success transition-colors block">DAO Governance</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors block">Documentation</a>
                <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors block">API</a>
                <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors block">Help Center</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors block">Privacy Policy</a>
                <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors block">Terms of Service</a>
                <a href="#" className="text-neutral-mid hover:text-accent-success transition-colors block">Compliance</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-neutral-mid text-sm">
              © 2024 Asset Ride Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
