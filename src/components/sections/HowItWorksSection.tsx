"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Wallet, TrendingUp, RefreshCw, Zap, Shield, Coins, Sparkles } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover Elite Assets",
      description: "Browse our curated collection of institutional-grade real-world assets with proven performance",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
      features: ["Commercial Real Estate", "Fine Art Collections", "Marine Assets", "Thoroughbreds"]
    },
    {
      icon: Wallet,
      title: "Invest Fractionally",
      description: "Start with as little as $100 and own a verified piece of multi-million dollar assets",
      color: "blue", 
      gradient: "from-blue-500 to-purple-500",
      features: ["$100 Minimum", "Blockchain Verified", "Instant Ownership", "Full Transparency"]
    },
    {
      icon: TrendingUp,
      title: "Grow Your Wealth",
      description: "Earn regular passive income and benefit from long-term asset appreciation",
      color: "emerald",
      gradient: "from-emerald-500 to-cyan-500",
      features: ["Monthly Dividends", "Asset Appreciation", "Tax Benefits", "Compound Growth"]
    },
    {
      icon: RefreshCw,
      title: "Trade & Manage",
      description: "Securely trade your fractions on our regulated platform with real-time tracking",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      features: ["24/7 Trading", "Instant Settlements", "Portfolio Analytics", "Mobile Access"]
    }
  ];

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-400/40 rounded-2xl px-6 py-4 mb-8 shadow-2xl shadow-cyan-500/20"
          >
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-bold text-sm tracking-wider">
              SIMPLE & POWERFUL PROCESS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Start Building Wealth in{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
          >
            From discovery to dividends - our streamlined platform makes elite asset investment 
            <span className="text-cyan-400 font-semibold"> accessible, secure, and profitable</span>
          </motion.p>
        </motion.div>

        {/* Enhanced Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 group-hover:border-cyan-400/30 p-8 transition-all duration-500 overflow-hidden">
                
                {/* Step Number */}
                <div className="absolute top-6 right-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                </div>

                {/* Icon Container */}
                <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white text-center mb-4 group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>

                <p className="text-slate-300 text-center mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) + (featureIndex * 0.05) }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2 text-slate-400 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Connector Line (for desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform translate-x-full">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="w-2 h-2 bg-cyan-400 rounded-full absolute -right-1 -top-1"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Progress Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center flex-1">
                  <div className={`text-sm font-semibold text-${step.color}-400 mb-2`}>
                    Step {index + 1}
                  </div>
                  <div className="text-xs text-slate-400">{step.title.split(' ')[0]}</div>
                </div>
              ))}
            </div>
            
            {/* Animated Progress Bar */}
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 relative"
              >
                {/* Moving Shine */}
                <motion.div
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                />
              </motion.div>
            </div>

            {/* Stats Footer */}
            <div className="flex justify-center mt-8 pt-6 border-t border-slate-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { icon: Shield, value: "100%", label: "Secure" },
                  { icon: Coins, value: "$100", label: "Minimum" },
                  { icon: Zap, value: "Instant", label: "Settlement" },
                  { icon: Sparkles, value: "2,500+", label: "Investors" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center space-x-2 text-slate-400">
                    <stat.icon className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-white font-semibold text-sm">{stat.value}</div>
                      <div className="text-xs">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Investment Journey?
            </h3>
            <p className="text-slate-300 mb-6">
              Join thousands of investors already building wealth through real-world assets
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/marketplace'}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl"
            >
              <Wallet className="w-5 h-5" />
              <span>Explore Investment Opportunities</span>
              <Sparkles className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;