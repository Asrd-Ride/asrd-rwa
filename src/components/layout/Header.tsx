'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useWallet } from '@/contexts/WalletContext'
import { useApp } from '@/contexts/AppContext'
import { Menu, X, Wallet, Coins, User, LogIn, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { cashBalance, asrdBalance, getUsdValue } = useWallet()
  const { platformStats } = useApp()
  const { user, login, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Dashboard', href: '/portfolio' },
    { label: 'DAO', href: '/dao' },
    { label: 'Treasury', href: '/treasury' }
  ]

  const asrdValueUSD = getUsdValue(asrdBalance)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => document.body.classList.remove('modal-open')
  }, [isMenuOpen])

  const handleDemoLogin = () => {
    login('0x742d35Cc6634C0532925a3b8D123')
  }

  return (
    <header className={`glass-nav fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-luxury-deep/95 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container-pro safe-area-inset">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-glow to-sapphire-glow rounded-lg" />
              <span className="text-xl font-bold text-white">Asset Ride</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-neutral-light hover:text-emerald-glow transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-white/5 focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-glow"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Wallet Info & Login - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Show ASRD Price when not logged in */}
            {!user && (
              <div className="flex items-center space-x-2 glass-3d rounded-xl px-4 py-2">
                <TrendingUp className="w-4 h-4 text-sapphire-glow" />
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">${platformStats.price} ASRD</div>
                  <div className="text-emerald-glow text-xs">Current Price</div>
                </div>
              </div>
            )}

            {/* Show Balances only when logged in */}
            {user && (
              <>
                <div className="flex items-center space-x-2 glass-3d rounded-xl px-4 py-2 min-w-[140px]">
                  <Wallet className="w-4 h-4 text-emerald-glow" />
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">${cashBalance.toLocaleString()}</div>
                    <div className="text-neutral-mid text-xs">Cash Balance</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 glass-3d rounded-xl px-4 py-2 min-w-[160px]">
                  <Coins className="w-4 h-4 text-sapphire-glow" />
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">{asrdBalance.toFixed(2)} ASRD</div>
                    <div className="text-emerald-glow text-xs">${asrdValueUSD.toLocaleString()} USD</div>
                  </div>
                </div>
              </>
            )}
            
            {/* Login/User Button */}
            {user ? (
              <Link href="/portfolio">
                <div className="flex items-center space-x-2 glass-3d rounded-xl px-4 py-2 cursor-pointer hover:bg-emerald-500/20 transition-all duration-300 group">
                  <User className="w-4 h-4 text-emerald-glow group-hover:text-white" />
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">Dashboard</div>
                    <div className="text-emerald-glow text-xs group-hover:text-white">Connected</div>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="/portfolio">
                <button
                  onClick={handleDemoLogin}
                  className="flex items-center space-x-2 glass-3d rounded-xl px-4 py-2 hover:bg-emerald-500/20 transition-all duration-300 group"
                >
                  <LogIn className="w-4 h-4 text-emerald-glow group-hover:text-white" />
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">Login</div>
                    <div className="text-emerald-glow text-xs group-hover:text-white">Access Dashboard</div>
                  </div>
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-glow mobile-menu-container"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-3d rounded-2xl mt-2 overflow-hidden mobile-menu-container"
            >
              <nav className="flex flex-col space-y-1 p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-neutral-light hover:text-emerald-glow transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-white/5 focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-glow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Wallet Info */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {/* Show ASRD Price when not logged in */}
                  {!user && (
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-neutral-mid">ASRD Price:</span>
                      <span className="text-emerald-glow font-semibold">${platformStats.price}</span>
                    </div>
                  )}

                  {/* Show Balances only when logged in */}
                  {user && (
                    <>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-neutral-mid">Cash Balance:</span>
                        <span className="text-white font-semibold">${cashBalance.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-neutral-mid">ASRD Balance:</span>
                        <span className="text-white font-semibold">{asrdBalance.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-neutral-mid">ASRD Value:</span>
                        <span className="text-emerald-glow font-semibold">${asrdValueUSD.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  
                  {/* Mobile Login Button */}
                  {!user && (
                    <Link href="/portfolio">
                      <button
                        onClick={() => {
                          handleDemoLogin()
                          setIsMenuOpen(false)
                        }}
                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 mt-4"
                      >
                        <LogIn className="w-5 h-5" />
                        <span>Login to Dashboard</span>
                      </button>
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
