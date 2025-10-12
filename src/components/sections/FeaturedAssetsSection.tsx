"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, TrendingUp, Coins, Crown, Zap, Users, Gem } from 'lucide-react';

const FluidHero = () => {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const exploreAssets = () => {
    document.getElementById('featured-assets')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl" />

      {/* Enhanced 3D Globe Effect */}
      <div className="absolute top-1/4 right-10 w-96 h-96 opacity-20">
        <div className="relative w-full h-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-emerald-400/20"
          />
          <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-cyan-400/30" />
        </div>
      </div>

      {/* Enhanced Floating Asset Cards */}
      <motion.div
        initial={{ y: 0, x: -20 }}
        animate={{ y: [0, -40, 0], x: [-20, 0, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 opacity-60"
      >
        <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-cyan-400/30 shadow-2xl">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-white">Commercial Real Estate</span>
          </div>
          <div className="mt-2 text-xs text-cyan-300">From $100 • 12.4% ROI</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 0, x: 20 }}
        animate={{ y: [0, 30, 0], x: [20, 0, 20] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-32 opacity-60"
      >
        <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-amber-400/30 shadow-2xl">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-white">Fine Art Collection</span>
          </div>
          <div className="mt-2 text-xs text-amber-300">From $150 • 18.7% ROI</div>
        </div>
      </motion.div>

      {/* Third Floating Card */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-1/4 opacity-50"
      >
        <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-400/30 shadow-2xl">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white">Private Equity</span>
          </div>
          <div className="mt-2 text-xs text-emerald-300">From $200 • 22.3% ROI</div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* POWERFUL TAGLINE BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
        >
          <Gem className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400 font-semibold text-sm">
            We Don't Sell Dreams — We Tokenize Reality.
          </span>
        </motion.div>

        {/* Compelling Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Invest in Real-World Assets{" "}
          <span className="bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Like the 1%
          </span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl text-slate-300 font-light">
            — Without Being One
          </span>
        </motion.h1>

        {/* Powerful Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed"
        >
          We're redefining access.{" "}
          <span className="text-cyan-400 font-semibold">Fractional ownership starting from $100</span> – 
          powered by blockchain security and institutional-grade asset selection.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Shield, text: "Bank-Level Security", color: "emerald" },
            { icon: Zap, text: "Instant Settlements", color: "cyan" },
            { icon: Users, text: "2,500+ Investors", color: "amber" },
            { icon: Coins, text: "$85M+ Assets", color: "emerald" }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-slate-400">
              <item.icon className={`w-5 h-5 text-${item.color}-400`} />
              <span className="text-sm font-medium">{item.text}</span>
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
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={exploreAssets}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-2xl"
          >
            <Coins className="w-6 h-6" />
            <span>Explore Premium Assets</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToHowItWorks}
            className="border-2 border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
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
          <p>Join 2,500+ investors building wealth through real-world assets</p>
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
          className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-slate-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FluidHero;