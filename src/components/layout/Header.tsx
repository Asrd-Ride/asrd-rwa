'use client'
import { motion } from 'framer-motion'
import { Wallet, Coins } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'

export default function Header() {
  const { asrdBalance } = useWallet()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-primary-cyan/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-cyan to-primary-violet rounded-lg"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-cyan to-primary-violet bg-clip-text text-transparent">
              Asset Ride
            </span>
          </motion.div>

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

          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 glass border border-primary-cyan/30 rounded-lg px-3 py-2"
            >
              <Coins className="w-4 h-4 text-primary-cyan" />
              <span className="text-sm">1 ASRD = $32</span>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-cyan to-primary-violet rounded-lg px-4 py-2 text-white font-semibold glow-cyan"
            >
              <Wallet className="w-4 h-4" />
              <span>{asrdBalance.toLocaleString()} ASRD</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
