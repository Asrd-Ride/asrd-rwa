"use client";

import { motion } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Star, Users, TrendingUp, Shield } from 'lucide-react';

export default function EnhancedCTASection() {
  const router = useRouter();
  const { login } = useAuth();

  const handleCreateAccount = () => {
    // Login and redirect to dashboard
    login('/dashboard');
  };

  const benefits = [
    {
      icon: Star,
      title: "Premium Returns",
      description: "20-45% average returns on curated assets"
    },
    {
      icon: Shield,
      title: "Secure Investments", 
      description: "Fully collateralized real-world assets"
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "$15M+ in assets under management"
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Join 1,247+ successful investors"
    }
  ];

  return (
    <section className="premium-section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      
      <div className="premium-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="premium-heading-2 mb-6">
            Ready to Start Your <span className="text-cyan-400">Investment Journey</span>?
          </h2>
          <p className="premium-text max-w-2xl mx-auto mb-12">
            Join thousands of investors who are already earning premium returns from exclusive real-world assets. 
            Start with just $100 and build your wealth today.
          </p>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="premium-card text-center group hover:border-cyan-400/30"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="premium-heading-3 mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={handleCreateAccount}
              className="btn-premium flex items-center justify-center space-x-3 group"
            >
              <span>Create Your Account</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => router.push('/marketplace')}
              className="btn-premium-secondary group"
            >
              <span className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Browse Investments</span>
              </span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-gray-400 text-sm mb-4">Trusted by investors worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">$15M+</div>
                <div className="text-xs">Assets Under Management</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">1,247+</div>
                <div className="text-xs">Active Investors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">32.5%</div>
                <div className="text-xs">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-xs">Secure & Verified</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
