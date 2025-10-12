// src/components/sections/ProblemSection.tsx - ENHANCED
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, X, Check, ArrowRight, Users, Building2, TrendingUp } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            The <span className="text-blue-600">$70 Trillion</span> Opportunity 
            <br />
            <span className="text-slate-700">That's Been Locked Away</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            For decades, the most lucrative investment opportunities were reserved for institutions 
            and ultra-wealthy individuals. We're changing that.
          </p>
        </motion.div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - The Barriers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">High Minimum Investments</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Traditional real estate and private equity require $50,000 - $1,000,000+ minimums, 
                    excluding 95% of potential investors.
                  </p>
                  <div className="mt-3 text-sm text-red-600 font-semibold">
                    Average Entry: $250,000+
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Exclusive Networks</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The best deals flow through private networks and family offices, completely 
                    inaccessible to the general public.
                  </p>
                  <div className="mt-3 text-sm text-amber-600 font-semibold">
                    Limited to 1% of Investors
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Complex Processes</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Months of due diligence, legal paperwork, and complex structures create 
                    insurmountable barriers for most investors.
                  </p>
                  <div className="mt-3 text-sm text-blue-600 font-semibold">
                    3-6 Month Process
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - The Divide */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* The 1% */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">The 1%</h3>
                <p className="text-blue-100">Institutional & Ultra-Wealthy</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Commercial Real Estate', return: '8-12%' },
                  { name: 'Private Equity', return: '15-25%' },
                  { name: 'Venture Capital', return: '20-40%' },
                  { name: 'Infrastructure', return: '9-14%' }
                ].map((asset, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-blue-500/30 last:border-b-0">
                    <span className="text-blue-100">{asset.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-emerald-300 font-semibold">{asset.return}</span>
                      <Check className="w-5 h-5 text-emerald-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The 99% */}
            <div className="bg-slate-100 rounded-2xl p-8 border border-slate-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">The 99%</h3>
                <p className="text-slate-600">Individual Investors</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Public Stocks', return: '7-10%' },
                  { name: 'Bonds', return: '2-4%' },
                  { name: 'ETFs', return: '6-9%' },
                  { name: 'Savings Accounts', return: '0-1%' }
                ].map((asset, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-slate-300 last:border-b-0">
                    <span className="text-slate-600">{asset.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 font-semibold">{asset.return}</span>
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-700 mb-6 max-w-2xl mx-auto">
            The wealth gap exists because the best investment opportunities aren't accessible to everyone. 
            We're building the bridge.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            onClick={() => {
              document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Discover the Solution</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;