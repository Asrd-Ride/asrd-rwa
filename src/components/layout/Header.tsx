'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWallet } from '@/contexts/WalletContext'
import { Menu, X, Wallet, Coins } from 'lucide-react'

export default function Header() {
  const { balance, asrdBalance } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Marketplace', href: '#marketplace' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'DAO', href: '#dao' },
    { label: 'Treasury', href: '#treasury' }
  ]

  return (
    <header className="glass-nav fixed top-0 w-full z-40">
      <div className="container-pro">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-accent-success to-accent-primary rounded-lg" />
            <span className="text-xl font-bold text-white">Asset Ride</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-neutral-light hover:text-accent-success transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Wallet Info - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass-card rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4 text-accent-success" />
              <span className="text-white font-semibold">${balance.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 glass-card rounded-lg px-3 py-2">
              <Coins className="w-4 h-4 text-accent-primary" />
              <span className="text-white font-semibold">{asrdBalance.toLocaleString()} ASRD</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card rounded-lg mt-2 p-4"
          >
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-neutral-light hover:text-accent-success transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Wallet Info */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-mid">Balance:</span>
                  <span className="text-white font-semibold">${balance.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-mid">ASRD:</span>
                  <span className="text-white font-semibold">{asrdBalance.toLocaleString()}</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
