// src/components/sections/FluidHero.tsx - ENHANCED TAGLINE
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Coins, Users, BarChart3, Sparkles, Gem } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const FluidHero = () => {
  const { login } = useAuth();

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const exploreAssets = () => {
    document.getElementById('featured-assets')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    login('/dashboard');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden pt-20"> {/* Added pt-20 for header spacing */}
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-10 md:left-20 w-3 h-3 bg-cyan-400 rounded-full opacity-40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-40 right-10 md:right-32 w-4 h-4 bg-blue-400 rounded-full opacity-40"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mt-8"> {/* Added mt-8 for spacing */}
        {/* ENHANCED Premium Badge with 3D Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-400/40 rounded-2xl px-6 py-4 mb-8 md:mb-12 mx-auto shadow-2xl shadow-cyan-500/20 relative overflow-hidden"
        >
          {/* Animated background shine */}
          <motion.div
            animate={{ x: [-100, 300, -100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />
          
          {/* Glowing dots */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-cyan-400 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-2 h-2 bg-blue-400 rounded-full"
          />
          
          {/* Text with glow effect */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-cyan-300 font-bold text-sm md:text-base tracking-wider relative z-10 text-shadow-lg shadow-cyan-500/50"
          >
            WE DON'T SELL DREAMS — WE TOKENIZE REALITY
          </motion.span>

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400/60 rounded-tl" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400/60 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400/60 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400/60 rounded-br" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
        >
          Institutional <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Real-World Assets</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl lg:text-3xl text-slate-300 font-light mb-6 md:mb-8 max-w-4xl mx-auto"
        >
          Now Accessible to Everyone
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-4"
        >
          Fractional ownership starting from $100. Invest in commercial real estate,
          private equity, and fine art with blockchain security and complete transparency.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 mb-8 md:mb-12 max-w-2xl mx-auto"
        >
          {[
            { icon: Shield, text: "Bank-Grade Security", value: "100%" },
            { icon: Users, text: "Active Investors", value: "2,500+" },
            { icon: Coins, text: "Assets Managed", value: "$85M+" },
            { icon: BarChart3, text: "Average ROI", value: "12.8%" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center p-3 md:p-0"
            >
              <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-cyan-500/10 rounded-lg md:rounded-xl mb-2 mx-auto">
                <item.icon className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
              </div>
              <div className="text-white font-bold text-sm md:text-lg">{item.value}</div>
              <div className="text-slate-400 text-xs md:text-sm">{item.text}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center max-w-md mx-auto"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={exploreAssets}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Coins className="w-5 h-5 md:w-6 md:h-6" />
            <span>Explore Investment Opportunities</span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToHowItWorks}
            className="w-full border-2 border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm"
          >
            <span>How It Works</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 md:mt-12 text-slate-400 text-sm"
        >
          <p>Trusted by institutional investors worldwide</p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 md:w-6 md:h-10 border-2 border-cyan-500/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 md:h-3 bg-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FluidHero;