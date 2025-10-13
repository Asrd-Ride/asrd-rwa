"use client";

import React from 'react';
import {
  DollarSign, TrendingUp, PieChart, Building, Ship, Zap,
  ArrowUpRight, Users, Calendar, Shield, Target, Coins
} from 'lucide-react';
import { treasuryData } from '@/data/mockData';
import { useUniversal } from '@/lib/universal';
import { motion } from 'framer-motion';

export default function FluidTreasury() {
  const { universalAttributes } = useUniversal();

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Value',
      value: `$${(treasuryData.totalValue / 1000000).toFixed(0)}M`,
      change: treasuryData.growth.monthly,
      color: 'emerald'
    },
    {
      icon: Coins,
      label: 'Available Funds',
      value: `$${(treasuryData.availableFunds / 1000000).toFixed(0)}M`,
      change: '+5.2%',
      color: 'cyan'
    },
    {
      icon: TrendingUp,
      label: 'Monthly Income',
      value: `$${(treasuryData.monthlyIncome / 1000).toFixed(0)}K`,
      change: treasuryData.growth.monthly,
      color: 'amber'
    },
    {
      icon: PieChart,
      label: 'Net Cash Flow',
      value: `$${(treasuryData.netCashFlow / 1000).toFixed(0)}K`,
      change: treasuryData.growth.quarterly,
      color: 'blue'
    }
  ];

  const getAssetIcon = (assetName: string) => {
    if (assetName.includes('Real Estate')) return Building;
    if (assetName.includes('Horse')) return Zap;
    if (assetName.includes('Commercial')) return Building;
    return DollarSign;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'from-emerald-500 to-green-500',
      amber: 'from-amber-500 to-orange-500',
      blue: 'from-blue-500 to-cyan-500',
      cyan: 'from-cyan-500 to-blue-500'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-cyan-500 to-blue-500';
  };

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      {...universalAttributes}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Platform <span className="text-cyan-400">Treasury</span> Overview
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Transparent view of our platform's financial health, asset allocation, and performance metrics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(stat.color)}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-green-400 text-sm font-semibold">{stat.change}</div>
                  <div className="text-slate-400 text-xs">This month</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Asset Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Asset Allocation</h3>
            <div className="text-slate-400">
              Total: <span className="text-white font-semibold">${(treasuryData.totalValue / 1000000).toFixed(0)}M</span>
            </div>
          </div>

          <div className="space-y-6">
            {treasuryData.assets.map((asset, index) => {
              const IconComponent = getAssetIcon(asset.name);
              return (
                <motion.div
                  key={asset.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(asset.color)}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{asset.name}</h4>
                      <p className="text-slate-400 text-sm">${(asset.value / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{asset.percentage}%</div>
                    <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getColorClasses(asset.color)}`}
                        style={{ width: `${asset.percentage}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 text-center">
            <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{treasuryData.growth.monthly}</div>
            <div className="text-slate-400">Monthly Growth</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 text-center">
            <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{treasuryData.growth.quarterly}</div>
            <div className="text-slate-400">Quarterly Growth</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 text-center">
            <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{treasuryData.growth.yearly}</div>
            <div className="text-slate-400">Yearly Growth</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}