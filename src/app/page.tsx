"use client"
import { useApp } from '@/contexts/AppContext'
import { useAuth } from '@/contexts/AuthContext'
import ImmersiveHero from '@/components/sections/ImmersiveHero'
import FeaturedAssetsSection from '@/components/sections/FeaturedAssetsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import PlatformStatsSection from '@/components/sections/PlatformStatsSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  const { isLoading } = useApp()
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-[#0A0F2C]">
      {/* Immersive Hero Section */}
      <ImmersiveHero />

      {/* Auto-scrolling Sections with Enhanced Animations */}
      <HowItWorksSection />
      <FeaturedAssetsSection />
      <PlatformStatsSection />
      <CTASection />

      {/* Enhanced Professional Footer */}
      <footer className="bg-[#0A0F2C] border-t border-[#00D1FF]/20 py-16 relative z-10 mt-20">
        <div className="container-pro">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00D1FF] to-[#7B61FF] rounded-xl" />
                <span className="text-2xl font-black text-white">ASSET RIDE</span>
              </div>
              <p className="text-gray-400 text-lg">
                Revolutionizing real-world asset ownership through blockchain technology and fractional investing.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-6">Platform</h4>
              <div className="space-y-3 text-lg">
                <a href="/marketplace" className="text-gray-400 hover:text-[#00D1FF] transition-all duration-300 block hover:translate-x-2">Marketplace</a>
                {isAuthenticated && (
                  <a href="/dashboard" className="text-gray-400 hover:text-[#7B61FF] transition-all duration-300 block hover:translate-x-2">Dashboard</a>
                )}
                <a href="/dao" className="text-gray-400 hover:text-[#00FF88] transition-all duration-300 block hover:translate-x-2">DAO Governance</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-6">Resources</h4>
              <div className="space-y-3 text-lg">
                <a href="#" className="text-gray-400 hover:text-[#00D1FF] transition-all duration-300 block hover:translate-x-2">Documentation</a>
                <a href="#" className="text-gray-400 hover:text-[#7B61FF] transition-all duration-300 block hover:translate-x-2">API</a>
                <a href="#" className="text-gray-400 hover:text-[#00FF88] transition-all duration-300 block hover:translate-x-2">Help Center</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-6">Legal</h4>
              <div className="space-y-3 text-lg">
                <a href="#" className="text-gray-400 hover:text-[#00D1FF] transition-all duration-300 block hover:translate-x-2">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-[#7B61FF] transition-all duration-300 block hover:translate-x-2">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-[#00FF88] transition-all duration-300 block hover:translate-x-2">Compliance</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              © 2024 Asset Ride Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
