"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { BarChart3, DollarSign, TrendingUp, Users, Building, Zap, Crown, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockAssets, ownedAssets, platformStats } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function CleanDashboard() {
  const [performanceData, setPerformanceData] = useState<number[]>([]);
  const [timeframe, setTimeframe] = useState<'1m' | '3m' | '1y' | 'all'>('1y');

  useEffect(() => {
    const generateData = () => {
      const base = [100];
      const points = timeframe === '1m' ? 30 : timeframe === '3m' ? 90 : timeframe === '1y' ? 365 : 730;
      for (let i = 1; i < points; i++) {
        const change = (Math.random() - 0.4) * 4;
        base.push(Math.max(50, base[i - 1] + change));
      }
      return base;
    };
    setPerformanceData(generateData());
  }, [timeframe]);

  const stats = [
    { 
      label: "Portfolio Value", 
      value: "$490,000", 
      change: "+12.8%", 
      icon: DollarSign, 
      color: "from-emerald-400 to-teal-400",
      trend: "up" 
    },
    { 
      label: "Total Returns", 
      value: "$156,400", 
      change: "+8.2%", 
      icon: TrendingUp, 
      color: "from-cyan-400 to-blue-400",
      trend: "up" 
    },
    { 
      label: "Active Assets", 
      value: "8", 
      change: "+2", 
      icon: Building, 
      color: "from-purple-400 to-pink-400",
      trend: "up" 
    },
    { 
      label: "ASRD Tokens", 
      value: "5,000", 
      change: "+265", 
      icon: Zap, 
      color: "from-amber-400 to-orange-400",
      trend: "up" 
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="clean-container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="clean-heading-1 mb-4">
            Your Investment Dashboard
          </h1>
          <p className="clean-text max-w-2xl mx-auto">
            Track your premium real-world asset investments with clean, intuitive analytics and insights designed for clarity.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="clean-grid clean-grid-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="clean-card group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="clean-heading-3 mb-2">{stat.value}</h3>
              <p className="clean-text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="clean-card clean-card-large mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="clean-heading-2 mb-2">Performance Analytics</h2>
              <p className="clean-text-sm">Track your portfolio growth over time</p>
            </div>
            <div className="flex gap-2 mt-4 lg:mt-0">
              {['1m', '3m', '1y', 'all'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    timeframe === period
                      ? 'btn-clean-primary'
                      : 'btn-clean-secondary'
                  }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Enhanced Chart Container */}
          <div className="h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl border border-cyan-500/10 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <p className="clean-text-sm mb-2">Interactive Performance Chart</p>
              <p className="text-cyan-400 text-sm">Visualizing {timeframe} performance data</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Assets Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="clean-card clean-card-large"
        >
          <h2 className="clean-heading-2 mb-8">Your Assets</h2>
          <div className="clean-grid clean-grid-2">
            {ownedAssets.slice(0, 4).map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="clean-card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-400 font-semibold">{asset.roi}</span>
                </div>
                <h3 className="clean-heading-3 mb-2">{asset.title}</h3>
                <p className="clean-text-sm mb-4">{asset.location}</p>
                <div className="flex justify-between items-center">
                  <span className="clean-text-sm">Value: ${asset.value.toLocaleString()}</span>
                  <button className="btn-clean-secondary text-sm">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
