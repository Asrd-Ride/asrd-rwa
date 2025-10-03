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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Immersive Hero Section */}
      <ImmersiveHero />

      {/* Auto-scrolling Sections with Enhanced Animations */}
      <HowItWorksSection />
      <FeaturedAssetsSection />
      <PlatformStatsSection />
      <CTASection />

      {/* Enhanced Professional Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-200 py-16 relative z-10">
        <div className="container-pro">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl" />
                <span className="text-2xl font-black text-gray-800">ASSET RIDE</span>
              </div>
              <p className="text-gray-600 text-lg">
                Revolutionizing real-world asset ownership through blockchain technology and fractional investing.
              </p>
            </div>

            <div>
              <h4 className="text-gray-800 font-bold text-xl mb-6">Platform</h4>
              <div className="space-y-3 text-lg">
                <a href="/marketplace" className="text-gray-600 hover:text-blue-600 transition-all duration-300 block hover:translate-x-2">Marketplace</a>
                {isAuthenticated && (
                  <a href="/portfolio" className="text-gray-600 hover:text-cyan-600 transition-all duration-300 block hover:translate-x-2">Portfolio</a>
                )}
                <a href="/dao" className="text-gray-600 hover:text-indigo-600 transition-all duration-300 block hover:translate-x-2">DAO Governance</a>
              </div>
            </div>

            <div>
              <h4 className="text-gray-800 font-bold text-xl mb-6">Resources</h4>
              <div className="space-y-3 text-lg">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 block hover:translate-x-2">Documentation</a>
                <a href="#" className="text-gray-600 hover:text-cyan-600 transition-all duration-300 block hover:translate-x-2">API</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-all duration-300 block hover:translate-x-2">Help Center</a>
              </div>
            </div>

            <div>
              <h4 className="text-gray-800 font-bold text-xl mb-6">Legal</h4>
              <div className="space-y-3 text-lg">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 block hover:translate-x-2">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-cyan-600 transition-all duration-300 block hover:translate-x-2">Terms of Service</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-all duration-300 block hover:translate-x-2">Compliance</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-gray-600 text-lg">
              © 2024 Asset Ride Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
