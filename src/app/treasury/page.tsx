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
          { name: 'Real Estate', value: 8500000, percentage: 55.2, icon: Building, gradient: 'gradient-3d-cyber' },
          { name: 'Thoroughbred', value: 3200000, percentage: 20.8, icon: TrendingUp, gradient: 'gradient-3d-cosmic' },
          { name: 'Marine Assets', value: 2200000, percentage: 14.3, icon: Ship, gradient: 'gradient-3d-matrix' },
          { name: 'Aviation', value: 850000, percentage: 5.5, icon: Plane, gradient: 'bg-gradient-to-r from-slate-500 to-gray-500' },
          { name: 'Luxury Assets', value: 670000, percentage: 4.2, icon: Gem, gradient: 'gradient-3d-holographic' }
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
      gradient: "gradient-3d-cyber",
      trend: "up" as const
    },
    {
      label: "Available Funds",
      value: treasuryData ? `$${(treasuryData.availableFunds / 1000000).toFixed(1)}M` : '$3.3M',
      change: '+5.2%',
      icon: Zap,
      gradient: "gradient-3d-matrix",
      trend: "up" as const
    },
    {
      label: "Monthly Cash Flow",
      value: treasuryData ? `$${(treasuryData.netCashFlow / 1000).toFixed(0)}K` : '$300K',
      change: '+8.7%',
      icon: TrendingUp,
      gradient: "gradient-3d-cosmic",
      trend: "up" as const
    },
    {
      label: "Active Assets",
      value: "24",
      change: '+3',
      icon: Building,
      gradient: "gradient-3d-holographic",
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
      <div className="min-h-screen bg-3d-space">
        <div className="container-3d py-8">
          {/* 3D Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3d-hero mb-6">
              PLATFORM <span className="text-3d-glow">TREASURY</span>
            </h1>
            <p className="text-3d-body max-w-2xl mx-auto">
              Comprehensive overview of platform treasury, asset allocation, and institutional-grade financial performance
            </p>
          </motion.div>

          {/* 3D Stats Grid */}
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
                className="stats-card-3d group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.gradient}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${
                    stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Asset Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-3d mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h2 className="text-3d-heading mb-2">Asset Allocation</h2>
                <p className="text-3d-body">Strategic distribution of treasury assets across premium real-world asset classes</p>
              </div>
              <div className="flex items-center space-x-2 text-cyan-400 mt-4 lg:mt-0">
                <PieChart className="w-5 h-5" />
                <span className="font-semibold">Diversified Institutional Portfolio</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 3D Asset List */}
              <div className="space-y-4">
                {treasuryData.assets.map((asset: any, index: number) => (
                  <motion.div
                    key={asset.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="asset-card-3d p-4 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${asset.gradient} rounded-xl flex items-center justify-center`}>
                          <asset.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{asset.name}</h3>
                          <p className="text-gray-400 text-sm">{asset.percentage}% of portfolio</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${(asset.value / 1000000).toFixed(1)}M</p>
                        <p className="text-cyan-400 text-sm">{asset.percentage}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 3D Chart Visualization */}
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <div className="w-48 h-48 gradient-3d-cyber rounded-full flex items-center justify-center mx-auto mb-4 border-3d-glow animate-float-3d">
                    <PieChart className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-cyan-300 font-semibold text-lg">Asset Allocation Visualization</p>
                  <p className="text-cyan-200 text-sm mt-2">Interactive 3D portfolio distribution</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <button className="btn-3d-secondary text-xs px-3 py-1">View Details</button>
                    <button className="btn-3d-secondary text-xs px-3 py-1">Export Data</button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 3D Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card-3d"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3d-heading">Recent Transactions</h2>
              <div className="flex items-center space-x-2">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as any)}
                  className="bg-black/30 border border-gray-600 rounded-xl text-white px-3 py-2 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="1m">Last Month</option>
                  <option value="3m">Last 3 Months</option>
                  <option value="1y">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {treasuryData.recentTransactions.map((transaction: any, index: number) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="asset-card-3d p-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        transaction.change === 'positive'
                          ? 'gradient-3d-matrix border-3d-glow'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {transaction.change === 'positive' ?
                          <ArrowUpRight className="w-5 h-5 text-white" /> :
                          <ArrowDownRight className="w-5 h-5 text-white" />
                        }
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{transaction.description}</h3>
                        <p className="text-gray-400 text-sm">{transaction.date} • {transaction.type}</p>
                      </div>
                    </div>
                    <div className={`text-right ${
                      transaction.change === 'positive' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      <p className="font-semibold text-lg">
                        {transaction.change === 'positive' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm">{transaction.change === 'positive' ? 'Income' : 'Expense'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 3D Summary Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-6 p-4 gradient-3d-cyber rounded-xl border-3d-glow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-cyan-300 font-semibold">Net Treasury Flow</p>
                  <p className="text-white text-sm">Last 30 days</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">+${(treasuryData.netCashFlow).toLocaleString()}</p>
                  <p className="text-emerald-400 text-sm">Positive Growth</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </EnhancedPageWrapper>
  );
}
