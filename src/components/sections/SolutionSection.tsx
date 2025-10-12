// src/components/sections/SolutionSection.tsx - ENHANCED
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, BarChart3, Coins, Globe } from 'lucide-react';

const SolutionSection = () => {
  const features = [
    {
      icon: Coins,
      title: "Fractional Ownership",
      description: "Start with as little as $100. Own a piece of institutional-grade assets previously requiring $250,000+.",
      stat: "From $100"
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Every investment is tokenized and secured on blockchain with transparent ownership records.",
      stat: "100% Secure"
    },
    {
      icon: Zap,
      title: "Instant Liquidity",
      description: "Trade your asset tokens on our secondary market. No more waiting years for returns.",
      stat: "24/7 Trading"
    },
    {
      icon: BarChart3,
      title: "Professional Management",
      description: "Our team of experts manages the assets while you enjoy passive returns.",
      stat: "12.8% Avg ROI"
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Vote on platform decisions and asset acquisitions through our DAO structure.",
      stat: "1 Token = 1 Vote"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Invest in assets worldwide from your phone. No geographic restrictions.",
      stat: "100+ Countries"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Democratizing <span className="text-emerald-600">Wealth Creation</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We're breaking down the barriers that have kept 99% of investors from accessing 
            the world's best investment opportunities.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">{feature.stat}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 border border-slate-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Start Your Investment Journey?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join thousands of investors who are already building wealth through real-world assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Browse Investment Opportunities
              </button>
              <button className="border-2 border-slate-300 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;