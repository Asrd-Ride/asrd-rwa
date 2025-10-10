"use client";

import { motion } from 'framer-motion';
import React from 'react';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function CleanHero() {
  const features = [
    { icon: Star, text: "20-45% Premium Returns" },
    { icon: Shield, text: "Secure Real World Assets" },
    { icon: Zap, text: "$100 Minimum Investment" }
  ];

  return (
    <section className="clean-section">
      <div className="clean-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="clean-heading-1 mb-6"
          >
            Democratizing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Premium Investments
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="clean-text max-w-2xl mx-auto mb-8"
          >
            Access exclusive real-world assets with returns of 20-45% starting from just $100. 
            Join the future of intelligent investing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="btn-clean-primary flex items-center justify-center space-x-2">
              <span>Start Investing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-clean-secondary">
              Explore Marketplace
            </button>
          </motion.div>

          {/* Features */}
          <motion.div 
            variants={itemVariants}
            className="clean-grid clean-grid-3 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 glow-cyan">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <p className="clean-text-sm font-semibold">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
