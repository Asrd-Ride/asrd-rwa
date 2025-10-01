'use client'
import { motion } from 'framer-motion'
import { Wallet, Coins, TrendingUp } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import { platformStats } from '@/data/mockData'

export default function Header() {
  const { asrdBalance } = useWallet()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-primary-cyan/20"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-cyan to-primary-violet rounded-lg"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-cyan to-primary-violet bg-clip-text text-transparent">
              Asset Ride
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Marketplace', 'DAO', 'Dashboard', 'Treasury'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.1 }}
                className="text-white/80 hover:text-primary-cyan transition-colors"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Wallet & Price Info */}
          <div className="flex items-center space-x-4">
            {/* ASRD Price Display */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 glass border border-primary-cyan/30 rounded-lg px-3 py-2"
            >
              <TrendingUp className="w-4 h-4 text-green-400" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary-cyan">ASRD = ${platformStats.price}</span>
                <span className="text-xs text-white/60">${(asrdBalance * platformStats.price).toLocaleString()} USD</span>
              </div>
            </motion.div>
            
            {/* Wallet Balance */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-cyan to-primary-violet rounded-lg px-4 py-2 text-white font-semibold glow-cyan"
            >
              <Wallet className="w-4 h-4" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">{asrdBalance.toLocaleString()} ASRD</span>
                <span className="text-xs opacity-80">${(asrdBalance * platformStats.price).toLocaleString()}</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Supply Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-6 mt-2 text-xs text-white/60"
        >
          <div className="flex items-center space-x-1">
            <Coins className="w-3 h-3 text-primary-cyan" />
            <span>Total Supply: {platformStats.totalSupply.toLocaleString()} ASRD</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span>Market Cap: ${(platformStats.marketCap / 1000000).toFixed(0)}M</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wallet className="w-3 h-3 text-primary-violet" />
            <span>TVL: ${(platformStats.totalValueLocked / 1000000).toFixed(0)}M</span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
