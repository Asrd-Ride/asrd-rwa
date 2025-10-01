'use client'
import { motion } from 'framer-motion'
import { Wallet, Coins, TrendingUp, Menu, X } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { platformStats } from '@/data/mockData'
import { useState } from 'react'

export default function Header() {
  const { asrdBalance, buyASRD } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Marketplace', href: '#marketplace' },
    { name: 'DAO', href: '#dao' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Treasury', href: '#treasury' }
  ]

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 glass-nav"
      >
        <div className="container-pro">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-accent-success to-accent-primary rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-financial-deep" />
              </div>
              <div>
                <span className="text-xl font-bold text-financial-success">Asset Ride</span>
                <div className="flex items-center space-x-1 text-xs text-neutral-mid">
                  <TrendingUp className="w-3 h-3 text-accent-success" />
                  <span>ASRD = ${platformStats.price}</span>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.1, color: '#00D4AA' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-neutral-light hover:text-accent-success transition-colors font-medium"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Wallet & Actions */}
            <div className="flex items-center space-x-4">
              {/* Buy ASRD Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => buyASRD(1000)}
                className="hidden sm:flex btn-financial px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Buy ASRD
              </motion.button>

              {/* Wallet Balance */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-xl px-4 py-2 border border-financial-success/20"
              >
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-accent-success" />
                  <div className="text-right">
                    <div className="text-sm font-semibold text-financial-success">
                      {asrdBalance.toLocaleString()} ASRD
                    </div>
                    <div className="text-xs text-neutral-mid">
                      ${(asrdBalance * platformStats.price).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-neutral-light hover:text-accent-success transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Supply Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-6 py-2 text-xs text-neutral-mid border-t border-financial-success/10"
          >
            <div className="flex items-center space-x-1">
              <Coins className="w-3 h-3 text-accent-success" />
              <span>Supply: {platformStats.totalSupply.toLocaleString()} ASRD</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-accent-success" />
              <span>Market Cap: ${(platformStats.marketCap / 1000000).toFixed(0)}M</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wallet className="w-3 h-3 text-accent-primary" />
              <span>TVL: ${(platformStats.totalValueLocked / 1000000).toFixed(0)}M</span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : '100%' }}
        className="fixed top-0 right-0 w-80 h-full z-40 glass-nav border-l border-financial-success/10 md:hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold text-financial-success">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-light hover:text-accent-success"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 text-neutral-light hover:text-accent-success hover:bg-accent-success/5 rounded-lg transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-financial-success/10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                buyASRD(1000)
                setMobileMenuOpen(false)
              }}
              className="w-full btn-financial py-3 rounded-lg font-semibold mb-4"
            >
              Buy ASRD
            </motion.button>
            
            <div className="text-center text-sm text-neutral-mid">
              Connected with {asrdBalance.toLocaleString()} ASRD
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
