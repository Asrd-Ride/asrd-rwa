// src/components/layout/PremiumHeader.tsx - ENHANCED
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, BarChart3, ShoppingCart, Users, Building2,
  Menu, X, LogOut, User, Zap, ChevronDown, Globe,
  Shield, TrendingUp
} from 'lucide-react';

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

  // Professional financial navigation
  const navigation = user ? [
    { name: 'Home', href: '/home', icon: Home, description: 'Platform Overview' },
    { name: 'Portfolio', href: '/dashboard', icon: BarChart3, description: 'Your Investments' },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart, description: 'Browse Assets' },
    { name: 'Treasury', href: '/treasury', icon: Building2, description: 'Platform Funds' },
    { name: 'DAO', href: '/dao', icon: Users, description: 'Governance' },
  ] : [
    { name: 'Home', href: '/home', icon: Home, description: 'Get Started' },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart, description: 'Browse Assets' },
    { name: 'Our Story', href: '/our-journey', icon: Globe, description: 'Learn About Us' },
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
        ? 'py-3 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg'
        : 'py-4 bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <Link href="/home" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900">ASRD</span>
                <span className="text-xs text-slate-500 -mt-1">Real World Assets</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative group px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-slate-900 font-semibold text-sm">{user.name}</div>
                        <div className="text-slate-500 text-xs">${user.portfolioValue?.toLocaleString() || '0'}</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-slate-100">
                          <div className="text-slate-900 font-semibold">{user.name}</div>
                          <div className="text-slate-500 text-sm">Premium Investor</div>
                        </div>

                        <div className="p-3">
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="text-blue-700 font-bold">${user.portfolioValue?.toLocaleString() || '0'}</div>
                              <div className="text-blue-600 text-xs">Portfolio</div>
                            </div>
                            <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                              <div className="text-emerald-700 font-bold">{user.asrdBalance?.toLocaleString() || '5,000'}</div>
                              <div className="text-emerald-600 text-xs">ASRD Tokens</div>
                            </div>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all text-sm"
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
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-2 group"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start Investing</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 rounded-lg border border-slate-200 hover:border-blue-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.description}</div>
                    </div>
                  </Link>
                ))}

                {/* Mobile Auth */}
                <div className="pt-4 border-t border-slate-200">
                  {user ? (
                    <div className="space-y-3">
                      <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-slate-900">{user.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-blue-600">${user.portfolioValue?.toLocaleString() || '0'}</div>
                          <div className="text-emerald-600">{user.asrdBalance?.toLocaleString() || '5,000'} ASRD</div>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
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