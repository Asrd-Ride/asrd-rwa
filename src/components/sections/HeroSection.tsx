'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { useNotification } from '@/contexts/NotificationContext'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  const { buyASRD, isLoading, platformStats } = useApp()
  const { getAsrdValue } = useWallet()
  const { showNotification } = useNotification()

  const handleBuyASRD = async (usdAmount: number) => {
    const asrdAmount = getAsrdValue(usdAmount)
    
    const success = await buyASRD(usdAmount)
    if (success) {
      showNotification({
        type: 'success',
        title: 'Purchase Successful!',
        message: `You have successfully purchased ${asrdAmount.toFixed(2)} ASRD tokens for $${usdAmount}.`
      })
    } else {
      showNotification({
        type: 'error',
        title: 'Insufficient Funds',
        message: 'You do not have enough cash balance to complete this purchase.'
      })
    }
  }

  const quickBuyAmounts = [100, 500, 1000]

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20 relative">
      <div className="container-pro">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-accent-success via-accent-primary to-accent-secondary bg-clip-text text-transparent">
                Tokenize
              </span>
              <br />
              <span className="text-white">Real World</span>
              <br />
              <span className="text-white">Assets</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-mid mb-8 leading-relaxed max-w-2xl"
            >
              Invest in premium horses and luxury real estate through blockchain technology. 
              Fractional ownership, instant liquidity, and proven returns.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link href="/marketplace">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-accent-success to-accent-primary text-financial-dark px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 glow-success hover:glow-primary transition-all duration-300"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                onClick={() => handleBuyASRD(1000)}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-accent-success text-accent-success px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-success hover:text-financial-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>{isLoading ? 'Processing...' : `Buy ${getAsrdValue(1000).toFixed(2)} ASRD`}</span>
                <Play className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { value: `$${(platformStats.marketCap / 1000000).toFixed(0)}M`, label: 'Market Cap' },
                { value: `${platformStats.totalAssets}+`, label: 'Assets' },
                { value: '2.4K+', label: 'Investors' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-accent-success mb-1">{stat.value}</div>
                  <div className="text-neutral-mid text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-8 border border-accent-success/20">
              <div className="grid grid-cols-2 gap-4">
                {/* Asset Previews */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-accent-success/20 to-accent-primary/20 rounded-2xl p-4 aspect-square flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">🐎</div>
                    <div className="text-white font-semibold">Premium Horses</div>
                    <div className="text-accent-success text-sm">From 120 ASRD</div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl p-4 aspect-square flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏠</div>
                    <div className="text-white font-semibold">Luxury Real Estate</div>
                    <div className="text-accent-primary text-sm">From 180 ASRD</div>
                  </div>
                </motion.div>
              </div>
              
              {/* ASRD Token Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-6 bg-gradient-to-r from-accent-success/10 to-accent-primary/10 rounded-2xl p-4 border border-accent-success/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">ASRD Token</div>
                    <div className="text-accent-success text-sm">${platformStats.price} per token</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{platformStats.circulatingSupply.toLocaleString()}</div>
                    <div className="text-neutral-mid text-sm">Circulating</div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Purchase Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-4 grid grid-cols-3 gap-2"
              >
                {quickBuyAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBuyASRD(amount)}
                    disabled={isLoading}
                    className="text-xs bg-white/5 hover:bg-accent-success/20 text-neutral-mid hover:text-white py-2 rounded-lg transition-all duration-200 border border-white/10 hover:border-accent-success/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ${amount}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
