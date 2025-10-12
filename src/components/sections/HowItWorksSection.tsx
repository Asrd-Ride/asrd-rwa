// HowItWorksSection.tsx - "Simple Steps to Invest"
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Wallet, TrendingUp, RefreshCw } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Explore Assets",
      description: "Browse curated real-world assets from commercial real estate to fine art",
      color: "emerald"
    },
    {
      icon: Wallet,
      title: "Invest Fractionally",
      description: "Start with as little as $100 and own a piece of elite assets",
      color: "sapphire"
    },
    {
      icon: TrendingUp,
      title: "Earn Returns",
      description: "Receive regular dividends and benefit from asset appreciation",
      color: "amber"
    },
    {
      icon: RefreshCw,
      title: "Trade Securely",
      description: "Buy and sell your fractions on our secure blockchain platform",
      color: "violet"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-3xl font-bold text-slate-900 mb-4">
            Simple Steps to <span className="text-emerald-600">Start Investing</span>
          </h2>
          <p className="text-fluid-lg text-slate-600 max-w-2xl mx-auto">
            From exploration to ownership - our streamlined process makes elite asset investment accessible to everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Step Number */}
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-${step.color}-100 flex items-center justify-center`}>
                  <span className={`text-${step.color}-600 font-bold text-lg`}>{index + 1}</span>
                </div>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-${step.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <step.icon className={`w-8 h-8 text-${step.color}-600`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center flex-1">
                <div className={`text-sm font-medium text-${step.color}-600`}>
                  Step {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 via-sapphire-500 to-amber-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;