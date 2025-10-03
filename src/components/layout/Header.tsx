'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Home, Coins, Users, LogIn, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, login, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const baseMenuItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Marketplace', href: '/marketplace', icon: Coins },
    { label: 'DAO', href: '/dao', icon: Users },
  ]

  // Add Dashboard only when authenticated
  const menuItems = isAuthenticated 
    ? [...baseMenuItems, { label: 'Dashboard', href: '/portfolio', icon: User }]
    : baseMenuItems

  const handleLogin = () => {
    const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
    login(mockAddress)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled ? 'glass-nav border-b border-emerald-glow/20' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="container-pro">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 glass-3d rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-glow" />
                </div>
                <span className="text-2xl font-black text-white">ASSET RIDE</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="glass-3d px-4 py-2 rounded-xl flex items-center space-x-2 text-sm font-medium text-white/80 hover:text-emerald-glow transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
              
              {/* Auth Button */}
              {isAuthenticated ? (
                <motion.button
                  onClick={logout}
                  className="glass-3d px-4 py-2 rounded-xl flex items-center space-x-2 text-sm font-medium text-white/80 hover:text-ruby-glow transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleLogin}
                  className="glass-3d px-4 py-2 rounded-xl flex items-center space-x-2 text-sm font-medium text-white/80 hover:text-emerald-glow transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </motion.button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden glass-3d p-2 rounded-xl"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-emerald-glow" />
              ) : (
                <Menu className="w-6 h-6 text-emerald-glow" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full glass-nav border-l border-emerald-glow/20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-black text-white">NAVIGATION</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="glass-3d p-2 rounded-xl"
                  >
                    <X className="w-5 h-5 text-emerald-glow" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center space-x-3 glass-3d p-4 rounded-xl text-white/80 hover:text-emerald-glow transition-all duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                  
                  {/* Mobile Auth Button */}
                  {isAuthenticated ? (
                    <motion.button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 glass-3d p-4 rounded-xl text-white/80 hover:text-ruby-glow transition-all duration-300"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => {
                        handleLogin()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 glass-3d p-4 rounded-xl text-white/80 hover:text-emerald-glow transition-all duration-300"
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="font-medium">Login</span>
                    </motion.button>
                  )}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
