// FinalCTASection.tsx - "Start Your Journey"
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Star, Zap, CheckCircle } from 'lucide-react';

const FinalCTASection = () => {
  const benefits = [
    "Start with as little as $100",
    "Diversify across multiple asset classes",
    "Blockchain-secured transactions",
    "24/7 market access",
    "Professional asset management",
    "Regular dividend payments"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-sapphire-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Shield className="w-20 h-20 text-white" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Zap className="w-24 h-24 text-white" />
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-5">
        <Star className="w-16 h-16 text-white" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-fluid-3xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-emerald-400">Wealth Journey</span>?
          </h2>
          <p className="text-fluid-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join the revolution in asset ownership. Access elite investments, build your portfolio, 
            and secure your financial future—all starting from just $100.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Why Start Today?
            </h3>
            
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg text-slate-200">{benefit}</span>
              </motion.div>
            ))}

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">10K+</div>
                <div className="text-sm text-slate-400">Active Investors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sapphire-400">$50M+</div>
                <div className="text-sm text-slate-400">Assets Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">4.9★</div>
                <div className="text-sm text-slate-400">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-sapphire-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Begin in Minutes
              </h3>
              <p className="text-slate-600">
                Create your account and start investing today
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-600 to-sapphire-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-slate-300 text-slate-700 py-4 rounded-xl font-semibold text-lg hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </div>

            {/* Security Badge */}
            <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-slate-500">Bank-level security & encryption</span>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-sm font-semibold text-slate-900">$100</div>
                <div className="text-xs text-slate-500">Minimum</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-sm font-semibold text-slate-900">0%</div>
                <div className="text-xs text-slate-500">Account Fees</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 pt-12 border-t border-slate-700"
        >
          <p className="text-slate-400 uppercase tracking-wider text-sm mb-6">
            Trusted By Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-slate-300 font-semibold">Forbes</div>
            <div className="text-slate-300 font-semibold">TechCrunch</div>
            <div className="text-slate-300 font-semibold">Bloomberg</div>
            <div className="text-slate-300 font-semibold">WSJ</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;