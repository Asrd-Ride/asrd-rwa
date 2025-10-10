"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function FluidHero() {
  const { login } = useAuth();

  const features = [
    { icon: Shield, text: "Institutional-Grade Assets" },
    { icon: Zap, text: "Fractional Ownership" },
    { icon: TrendingUp, text: "Proven ROI Track Record" }
  ];

  return (
    <div className="fluid-section-lg">
      <div className="fluid-container">
        <div className="text-center fluid-scroll-item">
          <motion.h1 
            className="fluid-hero mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Democratizing <span className="text-fluid-gold">Elite</span> Asset Access
          </motion.h1>
          
          <motion.p 
            className="fluid-body max-w-3xl mx-auto mb-6 md:mb-8 mobile:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            With mere $100, own fractions of $50M elite asset classes. Institutional-grade real world assets 
            now accessible through fractional digital ownership and collective governance.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => login('/marketplace')}
              className="btn-fluid text-lg px-6 md:px-8 py-3 md:py-4 flex items-center justify-center mobile:w-full sm:w-auto"
            >
              Start Investing Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn-fluid-secondary text-lg px-6 md:px-8 py-3 md:py-4 mobile:w-full sm:w-auto">
              Explore Assets
            </button>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="fluid-grid fluid-grid-cols-1 md:fluid-grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <div key={index} className="fluid-card text-center mobile:p-3">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-fluid-gold mx-auto mb-2 md:mb-3" />
                <p className="text-white font-semibold text-sm md:text-base">{feature.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
