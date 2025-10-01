'use client'
import { motion } from 'framer-motion'
import { platformStats } from '@/data/mockData'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark/90 to-black"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary-cyan via-primary-violet to-primary-cyan bg-clip-text text-transparent">
            Asset Ride
          </span>
          <br />
          <span className="text-white text-3xl md:text-5xl">Real World Asset Tokenization</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
        >
          Tokenized horses and premium real estate. Own fractional shares of high-value assets with ASRD.
        </motion.p>

        {/* ASRD Price Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-block bg-gradient-to-r from-primary-cyan/20 to-primary-violet/20 border border-primary-cyan/30 rounded-2xl px-6 py-3 mb-8"
        >
          <div className="text-2xl font-bold text-primary-cyan">ASRD = ${platformStats.price}</div>
          <div className="text-white/60 text-sm">Market Cap: ${(platformStats.marketCap / 1000000).toFixed(0)}M</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-cyan to-primary-violet text-white px-8 py-4 rounded-xl font-semibold text-lg glow-cyan"
          >
            Explore Marketplace
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-primary-cyan text-primary-cyan px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-cyan/10 transition-colors"
          >
            Buy ASRD
          </motion.button>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: `${platformStats.totalAssets}+`, label: 'Premium Assets' },
            { value: `$${(platformStats.totalValueLocked / 1000000).toFixed(0)}M`, label: 'Total Value Locked' },
            { value: `${platformStats.totalSupply.toLocaleString()}`, label: 'ASRD Total Supply' },
            { value: `$${platformStats.marketCap / 1000000}M`, label: 'Market Cap' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="glass rounded-xl p-4 border border-primary-cyan/20"
            >
              <div className="text-lg font-bold text-primary-cyan">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
