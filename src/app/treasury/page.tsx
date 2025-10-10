"use client";

import React, { useState, useEffect } from 'react';
import EnhancedPageWrapper from '@/components/layout/EnhancedPageWrapper';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart, Building, Ship, Plane, Gem, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TreasuryPage() {
  const [treasuryData, setTreasuryData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<'1m' | '3m' | '1y' | 'all'>('1y');

  useEffect(() => {
    // Simulate API call
    const fetchTreasuryData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = {
        totalValue: 15420000,
        availableFunds: 3250000,
        allocatedFunds: 12170000,
        monthlyIncome: 425000,
        monthlyExpenses: 125000,
        netCashFlow: 300000,
        growth: '+12.8%',
        assets: [
          { name: 'Real Estate', value: 8500000, percentage: 55.2, icon: Building, color: 'from-blue-500 to-cyan-500' },
          { name: 'Thoroughbred', value: 3200000, percentage: 20.8, icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
          { name: 'Marine Assets', value: 2200000, percentage: 14.3, icon: Ship, color: 'from-cyan-500 to-blue-500' },
          { name: 'Aviation', value: 850000, percentage: 5.5, icon: Plane, color: 'from-slate-500 to-gray-500' },
          { name: 'Luxury Assets', value: 670000, percentage: 4.2, icon: Gem, color: 'from-purple-500 to-pink-500' }
        ],
        recentTransactions: [
          { id: 1, type: 'income', description: 'Dubai Villa Rental', amount: 42500, date: '2024-01-15', change: 'positive' },
          { id: 2, type: 'income', description: 'Race Winnings', amount: 85000, date: '2024-01-10', change: 'positive' },
          { id: 3, type: 'expense', description: 'Platform Maintenance', amount: 25000, date: '2024-01-08', change: 'negative' },
          { id: 4, type: 'income', description: 'Yacht Charter', amount: 32000, date: '2024-01-05', change: 'positive' }
        ]
      };
      
      setTreasuryData(data);
    };

    fetchTreasuryData();
  }, [timeframe]);

  const stats = [
    {
      label: "Total Treasury Value",
      value: treasuryData ? `$${(treasuryData.totalValue / 1000000).toFixed(1)}M` : '$15.4M',
      change: treasuryData?.growth || '+12.8%',
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      trend: "up" as const
    },
    {
      label: "Available Funds",
      value: treasuryData ? `$${(treasuryData.availableFunds / 1000000).toFixed(1)}M` : '$3.3M',
      change: '+5.2%',
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
      trend: "up" as const
    },
    {
      label: "Monthly Cash Flow",
      value: treasuryData ? `$${(treasuryData.netCashFlow / 1000).toFixed(0)}K` : '$300K',
      change: '+8.7%',
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500",
      trend: "up" as const
    },
    {
      label: "Active Assets",
      value: "24",
      change: '+3',
      icon: Building,
      color: "from-purple-500 to-pink-500",
      trend: "up" as const
    }
  ];

  if (!treasuryData) {
    return (
      <EnhancedPageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading treasury data...</p>
          </div>
        </div>
      </EnhancedPageWrapper>
    );
  }

  return (
    <EnhancedPageWrapper>
      <div className="min-h-screen">
        <div className="premium-container py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="premium-heading-1 mb-4">
              Platform <span className="text-cyan-400">Treasury</span>
            </h1>
            <p className="premium-text max-w-2xl mx-auto">
              Overview of platform treasury, asset allocation, and financial performance.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="premium-card group hover:border-cyan-400/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="premium-heading-3 mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Asset Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="premium-card mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h2 className="premium-heading-2 mb-2">Asset Allocation</h2>
                <p className="premium-text">Distribution of treasury assets across different categories</p>
              </div>
              <div className="flex items-center space-x-2 text-cyan-400 mt-4 lg:mt-0">
                <PieChart className="w-5 h-5" />
                <span className="font-semibold">Diversified Portfolio</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Asset List */}
              <div className="space-y-4">
                {treasuryData.assets.map((asset: any, index: number) => (
                  <motion.div
                    key={asset.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-400/30 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${asset.color} rounded-xl flex items-center justify-center`}>
                        <asset.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="premium-heading-3">{asset.name}</h3>
                        <p className="text-gray-400 text-sm">{asset.percentage}% of portfolio</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${(asset.value / 1000000).toFixed(1)}M</p>
                      <p className="text-cyan-400 text-sm">{asset.percentage}%</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                    <PieChart className="w-16 h-16 text-cyan-400" />
                  </div>
                  <p className="text-cyan-300 font-semibold">Asset Allocation Chart</p>
                  <p className="text-cyan-200 text-sm mt-2">Visual representation of portfolio distribution</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="premium-card"
          >
            <h2 className="premium-heading-2 mb-8">Recent Transactions</h2>
            
            <div className="space-y-4">
              {treasuryData.recentTransactions.map((transaction: any, index: number) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-400/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.change === 'positive' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {transaction.change === 'positive' ? 
                        <ArrowUpRight className="w-5 h-5" /> : 
                        <ArrowDownRight className="w-5 h-5" />
                      }
                    </div>
                    <div>
                      <h3 className="premium-heading-3">{transaction.description}</h3>
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`text-right ${
                    transaction.change === 'positive' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    <p className="font-semibold">
                      {transaction.change === 'positive' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm">{transaction.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </EnhancedPageWrapper>
  );
}
