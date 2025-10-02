'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import ImmersiveHero from '@/components/sections/ImmersiveHero'
import FeaturedAssetsSection from '@/components/sections/FeaturedAssetsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import PlatformStatsSection from '@/components/sections/PlatformStatsSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  const { isLoading } = useApp()

  return (
    <main className="min-h-screen bg-luxury-deep text-white overflow-x-hidden">
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
            className="w-16 h-16 border-4 border-emerald-glow border-t-transparent rounded-full"
          />
        </motion.div>
      )}

      <Header />
      
      {/* Immersive Hero Section */}
      <ImmersiveHero />

      {/* Other Sections */}
      <HowItWorksSection />
      <FeaturedAssetsSection />
      <PlatformStatsSection />
      <CTASection />

      {/* Enhanced Professional Footer */}
      <footer className="glass-nav border-t border-emerald-glow/20 py-16 relative z-10">
        <div className="container-pro">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-glow to-sapphire-glow rounded-xl" />
                <span className="text-2xl font-black text-white">ASSET RIDE</span>
              </div>
              <p className="text-neutral-mid text-lg">
                Revolutionizing real-world asset ownership through blockchain technology and fractional investing.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-6">Platform</h4>
              <div className="space-y-3 text-lg">
                <a href="/marketplace" className="text-neutral-mid hover:text-emerald-glow transition-all duration-300 block hover:translate-x-2">Marketplace</a>
                <a href="/portfolio" className="text-neutral-mid hover:text-sapphire-glow transition-all duration-300 block hover:translate-x-2">Portfolio</a>
                <a href="/dao" className="text-neutral-mid hover:text-amethyst-glow transition-all duration-300 block hover:translate-x-2">DAO Governance</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-6">Resources</h4>
              <div className="space-y-3 text-lg">
                <a href="#" className="text-neutral-mid hover:text-emerald-glow transition-all duration-300 block hover:translate-x-2">Documentation</a>
                <a href="#" className="text-neutral-mid hover:text-sapphire-glow transition-all duration-300 block hover:translate-x-2">API</a>
                <a href="#" className="text-neutral-mid hover:text-amethyst-glow transition-all duration-300 block hover:translate-x-2">Help Center</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-6">Legal</h4>
              <div className="space-y-3 text-lg">
                <a href="#" className="text-neutral-mid hover:text-emerald-glow transition-all duration-300 block hover:translate-x-2">Privacy Policy</a>
                <a href="#" className="text-neutral-mid hover:text-sapphire-glow transition-all duration-300 block hover:translate-x-2">Terms of Service</a>
                <a href="#" className="text-neutral-mid hover:text-amethyst-glow transition-all duration-300 block hover:translate-x-2">Compliance</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-neutral-mid text-lg">
              © 2024 Asset Ride Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
