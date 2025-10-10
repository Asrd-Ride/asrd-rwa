"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { BarChart3, DollarSign, TrendingUp, Users, Building, Rocket, Zap, Crown, Target } from 'lucide-react';
import { mockAssets, ownedAssets, platformStats } from '@/data/mockData';

export default function EnhancedDashboard() {
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
    { label: "Portfolio Value", value: "$490,000", change: "+12.8%", icon: DollarSign, color: "from-emerald-400 to-teal-400" },
    { label: "Total Returns", value: "$156,400", change: "+8.2%", icon: TrendingUp, color: "from-cyan-400 to-blue-400" },
    { label: "Active Assets", value: "8", change: "+2", icon: Building, color: "from-purple-400 to-pink-400" },
    { label: "ASRD Tokens", value: "5,000", change: "+265", icon: Zap, color: "from-amber-400 to-orange-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <div className="container-enhanced py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-display-enhanced mb-4">
            Your <span className="text-enhanced-accent">Cosmic</span> Portfolio
          </h1>
          <p className="text-body-enhanced max-w-2xl mx-auto">
            Track your premium real-world asset investments with world-class analytics and insights
          </p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid-enhanced grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-enhanced-premium p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-enhanced-primary" />
                </div>
                <span className="text-enhanced-accent font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-subtitle-enhanced mb-2">{stat.value}</h3>
              <p className="text-enhanced-secondary text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-enhanced-ultra p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h2 className="text-title-enhanced mb-4 lg:mb-0">Performance Analytics</h2>
            <div className="flex gap-2">
              {['1m', '3m', '1y', 'all'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    timeframe === period
                      ? 'btn-enhanced-primary'
                      : 'bg-white/5 text-enhanced-secondary border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-enhanced-accent mx-auto mb-4" />
              <p className="text-enhanced-secondary">Enhanced 3D Performance Chart</p>
              <p className="text-enhanced-accent text-sm mt-2">Coming with next update</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
