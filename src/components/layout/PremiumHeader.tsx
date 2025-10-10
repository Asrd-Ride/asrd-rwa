"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, BarChart3, ShoppingCart, Users, Building2,
  Menu, X, LogOut, User, Zap, ChevronDown, Globe
} from 'lucide-react';
import PremiumLogo from '@/components/ui/PremiumLogo';

export default function PremiumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Enhanced navigation with fluid design
  const navigation = user ? [
    { name: 'Home', href: '/home', icon: Home, description: 'Platform Overview' },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, description: 'Your Portfolio' },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart, description: 'Invest Now' },
    { name: 'Our Journey', href: '/our-journey', icon: Globe, description: 'Protocol Story' },
    { name: 'Treasury', href: '/treasury', icon: Building2, description: 'Platform Funds' },
    { name: 'DAO', href: '/dao', icon: Users, description: 'Governance' },
  ] : [
    { name: 'Home', href: '/home', icon: Home, description: 'Get Started' },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart, description: 'Browse Assets' },
    { name: 'Our Journey', href: '/our-journey', icon: Globe, description: 'Learn Our Story' },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogin = () => {
    login('/dashboard');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'py-2 md:py-3 bg-fluid-charcoal/95 backdrop-blur-xl border-b border-fluid-gold/20 shadow-2xl shadow-fluid-gold/5'
        : 'py-3 md:py-5 bg-transparent'
    }`}>
      <div className="fluid-container">
        <div className="flex items-center justify-between">
          {/* Premium Logo with enhanced branding */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <PremiumLogo size={isMobile ? "sm" : "md"} showText={!isMobile} />

            {/* Desktop Navigation - Enhanced with Fluid Design */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative group px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-all duration-300 mobile-nav-item ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-fluid-gold/20 to-fluid-emerald/20 text-fluid-gold border border-fluid-gold/30'
                      : 'text-fluid-silver hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2 md:space-x-2.5">
                    <item.icon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>

                  {/* Enhanced active indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="premium-nav-indicator"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-fluid-gold to-fluid-emerald rounded-full"
                    />
                  )}

                  {/* Enhanced hover tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-fluid-charcoal border border-fluid-gold/30 rounded-lg text-xs text-fluid-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {item.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-fluid-gold/30"></div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Enhanced Auth Section */}
          <div className="hidden lg:flex items-center space-x-3 md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 md:space-x-4">
                {/* Enhanced User Info */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-fluid-gold/10 to-fluid-emerald/10 rounded-xl border border-fluid-gold/20 hover:border-fluid-gold/40 transition-all group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-fluid-gold to-fluid-emerald rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold text-sm">{user.name}</div>
                        <div className="text-fluid-gold text-xs">${user.portfolioValue.toLocaleString()}</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-fluid-gold transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Enhanced User Dropdown */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-56 md:w-64 bg-fluid-charcoal/95 backdrop-blur-xl border border-fluid-gold/20 rounded-2xl shadow-2xl shadow-fluid-gold/10 overflow-hidden"
                      >
                        <div className="p-3 md:p-4 border-b border-fluid-gold/10">
                          <div className="text-white font-semibold text-sm md:text-base">{user.name}</div>
                          <div className="text-fluid-gold text-xs md:text-sm">Premium Investor</div>
                        </div>

                        <div className="p-2 md:p-3">
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-center p-2 bg-fluid-gold/10 rounded-lg border border-fluid-gold/20">
                              <div className="text-fluid-gold font-bold text-sm">${user.portfolioValue.toLocaleString()}</div>
                              <div className="text-fluid-gold text-xs">Portfolio</div>
                            </div>
                            <div className="text-center p-2 bg-fluid-sapphire/10 rounded-lg border border-fluid-sapphire/20">
                              <div className="text-fluid-sapphire font-bold text-sm">{user.asrdBalance?.toLocaleString() || '5,000'}</div>
                              <div className="text-fluid-sapphire text-xs">ASRD Tokens</div>
                            </div>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-3 md:px-4 py-2 md:py-2.5 text-red-300 hover:text-red-100 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all text-sm"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="font-semibold">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-3">
                <button
                  onClick={handleLogin}
                  className="btn-fluid flex items-center space-x-2 text-sm px-4 md:px-6 py-2 md:py-2.5 group"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start Investing</span>
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-fluid-silver hover:text-white transition-colors bg-white/5 rounded-xl border border-white/10 hover:border-fluid-gold/30 mobile-nav-item"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-3 md:mt-4 bg-fluid-charcoal/95 backdrop-blur-xl rounded-2xl border border-fluid-gold/20 overflow-hidden"
            >
              <div className="p-3 md:p-4 space-y-1 md:space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 md:px-4 py-3 rounded-xl text-base font-medium transition-all mobile-nav-item ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-fluid-gold/20 to-fluid-emerald/20 text-fluid-gold border border-fluid-gold/30'
                        : 'text-fluid-silver hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm md:text-base">{item.name}</div>
                      <div className="text-xs text-fluid-gold opacity-80">{item.description}</div>
                    </div>
                  </Link>
                ))}

                {/* Enhanced Mobile Auth */}
                <div className="pt-3 md:pt-4 border-t border-fluid-gold/20">
                  {user ? (
                    <div className="space-y-2 md:space-y-3">
                      <div className="px-3 md:px-4 py-3 bg-gradient-to-r from-fluid-gold/10 to-fluid-emerald/10 rounded-xl border border-fluid-gold/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-fluid-gold" />
                          <span className="font-semibold text-white text-sm md:text-base">{user.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                          <div className="text-fluid-gold">${user.portfolioValue.toLocaleString()}</div>
                          <div className="text-fluid-sapphire">{user.asrdBalance?.toLocaleString() || '5,000'} ASRD</div>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-3 md:px-4 py-3 text-red-300 hover:text-red-100 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all text-sm md:text-base"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full btn-fluid flex items-center justify-center space-x-2 py-3 text-sm md:text-base mobile:w-full"
                    >
                      <Zap className="w-5 h-5" />
                      <span>Start Investing Now</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
