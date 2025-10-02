'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { platformStats } from '@/data/mockData'
import TokenPurchaseModal from '../ui/TokenPurchaseModal'

export default function Hero() {
  const { buyASRD, isLoading } = useApp()
  const [showTokenModal, setShowTokenModal] = useState(false)

  const handleBuyASRD = async (usdAmount: number) => {
    const success = await buyASRD(usdAmount)
    if (success) {
      console.log(`Successfully purchased $${usdAmount} worth of ASRD tokens`)
    } else {
      alert('Purchase failed: Insufficient cash balance')
    }
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-32 section-py">
        <div className="container-pro text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Asset Ride
            </h1>
            <p className="text-xl md:text-2xl text-neutral-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Tokenizing the world's most exclusive real-world assets.
              <span className="text-financial-success"> Premium horses</span> and
              <span className="text-financial-primary"> luxury real estate</span> powered by ASRD.
            </p>
          </motion.div>

          {/* ASRD Price Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block glass-card rounded-2xl px-8 py-4 mb-8 border border-financial-success/30"
          >
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-financial-success">ASRD = ${platformStats.price}</div>
                <div className="text-sm text-neutral-mid">Utility Token</div>
              </div>
              <div className="h-12 w-px bg-financial-success/30"></div>
              <div>
                <div className="text-lg font-semibold text-financial-primary">
                  ${(platformStats.marketCap / 1000000).toFixed(0)}M Market Cap
                </div>
                <div className="text-sm text-neutral-mid">{platformStats.totalSupply.toLocaleString()} Total Supply</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.a
              href="#featured-assets"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-financial px-8 py-4 rounded-xl font-semibold text-lg glow-success"
            >
              Explore Premium Assets
            </motion.a>

            <motion.button
              onClick={() => setShowTokenModal(true)}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Buy ASRD Tokens'}
            </motion.button>
          </motion.div>

          {/* Platform Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: `${platformStats.totalAssets}+`, label: 'Premium Assets', color: 'text-financial-success' },
              { value: `$${(platformStats.totalValueLocked / 1000000).toFixed(0)}M`, label: 'Value Locked', color: 'text-financial-primary' },
              { value: `${platformStats.totalSupply.toLocaleString()}`, label: 'ASRD Supply', color: 'text-accent-secondary' },
              { value: `$${platformStats.marketCap / 1000000}M`, label: 'Market Cap', color: 'text-financial-success' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-xl p-6 border border-financial-success/20 card-hover"
              >
                <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-neutral-mid text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-financial-success/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-financial-success rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Token Purchase Modal */}
      <TokenPurchaseModal
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        onConfirm={handleBuyASRD}
      />
    </>
  )
}
