// src/components/sections/FluidHero.tsx - ENHANCED
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Coins, Users, BarChart3 } from 'lucide-react';

const FluidHero = () => {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const exploreAssets = () => {
    document.getElementById('featured-assets')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/40" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Animated Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-20 w-4 h-4 bg-emerald-400 rounded-full opacity-20"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-40 right-32 w-6 h-6 bg-blue-400 rounded-full opacity-20"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-white font-semibold text-sm tracking-wide">
            WE DON'T SELL DREAMS — WE TOKENIZE REALITY
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Institutional <span className="text-emerald-400">Real-World Assets</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl text-slate-300 font-light">
            Now Accessible to Everyone
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto mb-8 leading-relaxed"
        >
          Fractional ownership starting from $100. Invest in commercial real estate, 
          private equity, and fine art with blockchain security and complete transparency.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { icon: Shield, text: "Bank-Grade Security", value: "100%" },
            { icon: Users, text: "Active Investors", value: "2,500+" },
            { icon: Coins, text: "Assets Managed", value: "$85M+" },
            { icon: BarChart3, text: "Average ROI", value: "12.8%" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-2 mx-auto">
                <item.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-white font-bold text-lg">{item.value}</div>
              <div className="text-slate-400 text-sm">{item.text}</div>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exploreAssets}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
          >
            <Coins className="w-6 h-6" />
            <span>Explore Investment Opportunities</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToHowItWorks}
            className="border-2 border-white/30 text-white hover:border-emerald-400 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
          >
            <span>How It Works</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-slate-400 text-sm"
        >
          <p>Trusted by institutional investors and individuals worldwide</p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FluidHero;