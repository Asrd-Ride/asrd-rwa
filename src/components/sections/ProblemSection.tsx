"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Check, ArrowRight, Users, Building2, TrendingUp, Zap, Gem, Crown, Shield, Coins, Sparkles } from 'lucide-react';

const ProblemSection = () => {
  const [hoveredBarrier, setHoveredBarrier] = useState<number | null>(null);
  const [activeComparison, setActiveComparison] = useState<'wealthy' | 'individual'>('wealthy');

  const barriers = [
    {
      id: 1,
      icon: Lock,
      title: "High Minimum Investments",
      description: "Traditional real estate and private equity require $50,000 - $1,000,000+ minimums, excluding 95% of potential investors.",
      stat: "Average Entry: $250,000+",
      color: "red",
      gradient: "from-red-500 to-pink-500",
      impact: "95% Excluded"
    },
    {
      id: 2,
      icon: Building2,
      title: "Exclusive Networks",
      description: "The best deals flow through private networks and family offices, completely inaccessible to the general public.",
      stat: "Limited to 1% of Investors",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      impact: "1% Access"
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Complex Processes",
      description: "Months of due diligence, legal paperwork, and complex structures create insurmountable barriers for most investors.",
      stat: "3-6 Month Process",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      impact: "90 Days+"
    }
  ];

  const wealthyAssets = [
    { name: 'Commercial Real Estate', return: '8-12%', premium: true, trend: 'up' },
    { name: 'Private Equity', return: '15-25%', premium: true, trend: 'up' },
    { name: 'Venture Capital', return: '20-40%', premium: true, trend: 'up' },
    { name: 'Infrastructure Funds', return: '9-14%', premium: true, trend: 'up' }
  ];

  const individualAssets = [
    { name: 'Public Stocks', return: '7-10%', premium: false, trend: 'volatile' },
    { name: 'Bonds & Treasuries', return: '2-4%', premium: false, trend: 'down' },
    { name: 'ETFs & Mutual Funds', return: '6-9%', premium: false, trend: 'neutral' },
    { name: 'Savings Accounts', return: '0-1%', premium: false, trend: 'down' }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-amber-500/20 backdrop-blur-lg border border-red-400/40 rounded-2xl px-6 py-4 mb-8 shadow-2xl shadow-red-500/20"
          >
            <Zap className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-bold text-sm tracking-wider">
              THE $70 TRILLION PROBLEM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight"
          >
            The{' '}
            <span className="bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Wealth Gap
            </span>
            <br />
            <span className="text-slate-700 text-3xl md:text-4xl lg:text-5xl">
              That's Been Engineered
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
          >
            For decades, the most lucrative investment opportunities were systematically reserved for institutions 
            and ultra-wealthy individuals. <span className="text-red-500 font-semibold">We're dismantling these barriers.</span>
          </motion.p>
        </motion.div>

        {/* Enhanced Problem Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Side - The Barriers with Enhanced Visuals */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {barriers.map((barrier, index) => (
              <motion.div
                key={barrier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredBarrier(barrier.id)}
                onMouseLeave={() => setHoveredBarrier(null)}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${barrier.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Main Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 group-hover:border-red-300/50 p-8 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl">
                  
                  {/* Shine Overlay */}
                  <motion.div
                    animate={{ x: hoveredBarrier === barrier.id ? '100%' : '-100%' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                  />

                  <div className="flex items-start space-x-6">
                    {/* Icon Container */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${barrier.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <barrier.icon className="w-8 h-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-slate-900 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-900">{barrier.id}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                        {barrier.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {barrier.description}
                      </p>
                      
                      {/* Stats Row */}
                      <div className="flex items-center justify-between">
                        <div className={`px-4 py-2 bg-${barrier.color}-100 rounded-full border border-${barrier.color}-200`}>
                          <span className={`text-${barrier.color}-700 font-semibold text-sm`}>
                            {barrier.stat}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">{barrier.impact}</div>
                          <div className="text-xs text-slate-500">Impact</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Enhanced Wealth Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Comparison Toggle */}
            <div className="flex bg-slate-200 rounded-2xl p-2 max-w-md mx-auto">
              {[
                { id: 'wealthy', label: 'The 1%', icon: Crown },
                { id: 'individual', label: 'The 99%', icon: Users }
              ].map((option) => {
                const OptionIcon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setActiveComparison(option.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      activeComparison === option.id
                        ? 'bg-white text-slate-900 shadow-lg'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <OptionIcon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Comparison Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComparison}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* The 1% - Premium Card */}
                {activeComparison === 'wealthy' && (
                  <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                        <Crown className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">The 1%</h3>
                      <p className="text-amber-100 text-lg">Institutional & Ultra-Wealthy</p>
                      <div className="mt-2 text-amber-200 text-sm">
                        Exclusive Access • Premium Returns
                      </div>
                    </div>

                    {/* Assets List */}
                    <div className="space-y-4">
                      {wealthyAssets.map((asset, index) => (
                        <motion.div
                          key={asset.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center justify-between py-4 px-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm"
                        >
                          <div className="flex items-center space-x-3">
                            <Gem className="w-5 h-5 text-amber-300" />
                            <span className="font-semibold">{asset.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-emerald-300 font-bold text-lg">{asset.return}</span>
                            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-emerald-300" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Performance Indicator */}
                    <div className="mt-6 pt-6 border-t border-amber-400/30 text-center">
                      <div className="text-amber-200 text-sm">Average Portfolio Performance</div>
                      <div className="text-2xl font-bold text-white">18.5% ROI</div>
                    </div>
                  </div>
                )}

                {/* The 99% - Standard Card */}
                {activeComparison === 'individual' && (
                  <div className="bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-3xl p-8 text-white shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">The 99%</h3>
                      <p className="text-slate-200 text-lg">Individual Investors</p>
                      <div className="mt-2 text-slate-300 text-sm">
                        Limited Options • Average Returns
                      </div>
                    </div>

                    {/* Assets List */}
                    <div className="space-y-4">
                      {individualAssets.map((asset, index) => (
                        <motion.div
                          key={asset.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center justify-between py-4 px-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                        >
                          <div className="flex items-center space-x-3">
                            <Coins className="w-5 h-5 text-slate-300" />
                            <span className="font-semibold">{asset.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-slate-300 font-bold text-lg">{asset.return}</span>
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                              <X className="w-4 h-4 text-red-300" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Performance Indicator */}
                    <div className="mt-6 pt-6 border-t border-slate-400/30 text-center">
                      <div className="text-slate-300 text-sm">Average Portfolio Performance</div>
                      <div className="text-2xl font-bold text-white">4.2% ROI</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Gap Visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg"
            >
              <div className="text-center mb-4">
                <div className="text-slate-900 font-bold text-lg mb-2">The Performance Gap</div>
                <div className="text-3xl font-bold text-red-600">14.3%</div>
                <div className="text-slate-600 text-sm">Difference in Average Returns</div>
              </div>
              
              {/* Visual Gap Bar */}
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 origin-left"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-slate-600 mt-2">
                <span>The 99%</span>
                <span>The 1%</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              This Inequality Ends Now
            </h3>
            <p className="text-slate-600 mb-6 text-lg">
              The wealth gap exists because the system was designed this way. 
              <span className="text-red-500 font-semibold"> We're building the bridge to close it.</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl"
              onClick={() => {
                document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Discover The Solution</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;