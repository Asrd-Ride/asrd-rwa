"use client";

import { motion } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Shield, Zap, TrendingUp, Eye, Star, Gem, Crown } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function PremiumHero() {
  const router = useRouter();
  const { login, user } = useAuth();

  const features = [
    { 
      icon: TrendingUp, 
      text: "20-45% Premium Returns", 
      color: "from-emerald-400 to-teal-400",
      description: "Industry-leading returns on curated premium assets"
    },
    { 
      icon: Shield, 
      text: "Secure Real World Assets", 
      color: "from-blue-400 to-cyan-400",
      description: "Fully collateralized real estate and thoroughbred assets"
    },
    { 
      icon: Zap, 
      text: "$100 Minimum Investment", 
      color: "from-purple-400 to-pink-400",
      description: "Low barrier entry to high-value investment opportunities"
    }
  ];

  const handleExploreInvestments = () => {
    router.push('/marketplace');
  };

  const handleStartInvesting = () => {
    if (user) {
      router.push('/marketplace');
    } else {
      login('/marketplace');
    }
  };

  const handleImmersiveDemo = () => {
    const demoSection = document.getElementById('platform-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container-premium relative z-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* Premium Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-3 px-6 py-3 glass-ultimate mb-8 border border-cyan-500/30"
        >
          <Crown className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
            PREMIUM REAL WORLD ASSETS
          </span>
          <Gem className="w-5 h-5 text-purple-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="heading-responsive text-gradient-premium mb-8 leading-tight"
        >
          Access Elite
          <span className="block mt-2">Investment Opportunities</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-responsive text-premium-light max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Democratizing exclusive real-world assets with 20-45% returns. 
          <span className="text-cyan-400 font-semibold"> Start your journey with just $100</span> and join the future of intelligent wealth creation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={handleStartInvesting}
            className="btn-premium flex items-center justify-center space-x-3 group"
          >
            <Star className="w-5 h-5" />
            <span className="font-bold">Start Investing Now</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleExploreInvestments}
            className="btn-premium-outline group flex items-center justify-center space-x-2 px-8 py-4"
          >
            <Eye className="w-5 h-5" />
            <span>Explore All Opportunities</span>
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              className="card-premium text-center group hover:border-cyan-400/30"
            >
              <div className="card-premium-content">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 animate-glow-premium`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="premium-heading-3 mb-4 text-premium-white group-hover:text-cyan-300 transition-colors">
                  {feature.text}
                </h3>
                <p className="text-premium-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-premium-muted text-sm mb-6">Trusted by sophisticated investors worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">$15.4M+</div>
              <div className="text-xs text-premium-muted">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">1,247+</div>
              <div className="text-xs text-premium-muted">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">32.5%</div>
              <div className="text-xs text-premium-muted">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-xs text-premium-muted">Secure & Verified</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
