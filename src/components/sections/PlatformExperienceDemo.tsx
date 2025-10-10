'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Sparkles,
  DollarSign,
  Users,
  Rocket,
  BarChart2,
  Trophy,
  Building2,
  Coins,
} from 'lucide-react';

const demoSteps = [
  {
    id: 0,
    title: 'Marketplace Overview',
    description:
      'Discover premium real-world assets tokenized into fractional shares for global investors.',
    icon: Building2,
    stats: ['300K+ Users', '$4.8B Total Assets', '50+ Countries'],
  },
  {
    id: 1,
    title: 'Investment Dashboard',
    description:
      'Track your holdings, yields, and ownership history with next-gen analytics.',
    icon: BarChart2,
    stats: ['$32 ASRD Token Price', 'Portfolio Growth 12%', 'Yield History'],
  },
  {
    id: 2,
    title: 'Rental & Yield Earnings',
    description:
      'Earn passive income through asset rentals and claim your rewards seamlessly.',
    icon: Coins,
    stats: ['$120M Claimed', 'Avg ROI 8%', 'Instant Withdrawals'],
  },
  {
    id: 3,
    title: 'DAO Governance',
    description:
      'Participate in community governance and shape the future of AssetRide ecosystem.',
    icon: Users,
    stats: ['100K+ Votes', 'Governance Proposals', 'Community Decisions'],
  },
  {
    id: 4,
    title: 'Claim Winnings',
    description:
      'Instantly withdraw your rental income and competition winnings directly to your wallet.',
    icon: Trophy,
    stats: ['Top Rewards 5 ETH', 'Monthly Contests', 'Instant Claim'],
  },
];

export default function PlatformExperienceDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = demoSteps[currentStep];
  const StepIcon = step.icon;

  const renderVisualization = () => (
    <div className="h-full w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-xl border border-cyan-500/20 hover:scale-[1.02] transform transition-all duration-500 perspective-3d">
      <StepIcon className="w-16 h-16 mb-4 text-cyan-400 animate-bounce" />
      <h3 className="text-3xl font-extrabold mb-2">{step.title}</h3>
      <p className="text-center text-sm max-w-md opacity-80 mb-4">{step.description}</p>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {step.stats.map((stat, idx) => (
          <div
            key={idx}
            className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 border border-cyan-400/30 backdrop-blur-sm hover:bg-cyan-500/30 hover:scale-105 transition-all"
          >
            {stat}
          </div>
        ))}
      </div>
      {/* Floating tokens */}
      <motion.div
        className="absolute w-6 h-6 bg-cyan-400 rounded-full top-8 left-8 shadow-xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-4 h-4 bg-amber-400 rounded-full bottom-10 right-10 shadow-lg"
        animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );

  return (
    <section
      id="platform-demo"
      className="section-premium relative overflow-hidden min-h-screen flex items-center py-16"
    >
      {/* Dynamic background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-cyan-900/30"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-ultimate mb-6 border border-cyan-500/30">
            <Crown className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
              IMMERSIVE PLATFORM EXPERIENCE
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-ping" />
          </div>
          <h2 className="heading-responsive text-gradient-premium mb-6">
            Experience the Future of
            <span className="block">Asset Investing</span>
          </h2>
          <p className="text-responsive text-premium-light max-w-2xl mx-auto leading-relaxed">
            Discover how AssetRide transforms real-world asset investing with cutting-edge technology,
            <span className="text-cyan-400 font-semibold">3D floating assets, token animations, and seamless Web3 experience.</span>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-ultimate rounded-3xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-400/50 shadow-2xl transition-all duration-500">
              {/* Demo Header */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-white font-bold">AssetRide Platform</span>
                      <div className="text-cyan-300 text-xs">Live Demo • Ultra Premium</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Demo Content */}
              <div className="h-96 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="h-full w-full"
                  >
                    {renderVisualization()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step Controls */}
              <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 flex justify-between items-center">
                <button
                  onClick={() =>
                    setCurrentStep((currentStep - 1 + demoSteps.length) % demoSteps.length)
                  }
                  className="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Prev
                </button>
                <button
                  onClick={() => setCurrentStep((currentStep + 1) % demoSteps.length)}
                  className="px-4 py-2 text-sm rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
