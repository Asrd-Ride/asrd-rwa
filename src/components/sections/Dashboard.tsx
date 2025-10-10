"use client";

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { BarChart3, DollarSign, TrendingUp, Users, Building, Zap, Crown, Target, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { platformStats, ownedAssets } from '@/data/mockData';
import RealAssetImage from '@/components/ui/RealAssetImage';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';

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
      duration: 0.5
    }
  }
};

const stats = [
  {
    label: "Total Value",
    value: `$${(platformStats.totalValue / 1000000).toFixed(1)}M`,
    icon: DollarSign,
    color: "from-emerald-400 to-teal-400"
  },
  {
    label: "Total Investors",
    value: platformStats.totalInvestors.toLocaleString(),
    icon: Users,
    color: "from-blue-400 to-cyan-400"
  },
  {
    label: "Total Assets",
    value: platformStats.totalAssets.toString(),
    icon: Building,
    color: "from-blue-400 to-cyan-400"
  },
  {
    label: "Average ROI",
    value: `${platformStats.averageRoi}%`,
    icon: TrendingUp,
    color: "from-amber-400 to-orange-400"
  },
  {
    label: "Active Assets",
    value: platformStats.activeAssets.toString(),
    icon: Zap,
    color: "from-purple-400 to-pink-400"
  },
  {
    label: "Monthly Returns",
    value: `$${(platformStats.monthlyReturns / 1000).toFixed(0)}K`,
    icon: BarChart3,
    color: "from-green-400 to-emerald-400"
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  const handleInvest = (assetId: number) => {
    console.log('Invest in asset:', assetId);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            WELCOME BACK, <span className="text-cyan-400">{user?.name || 'INVESTOR'}</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Track your investments, monitor performance, and discover new opportunities in premium real world assets.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-slate-800/50 rounded-2xl border border-gray-700 p-6 group hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                  <div className="flex items-center text-emerald-400 text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+12.5% this month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Assets */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 rounded-2xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Assets</h2>
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <div className="space-y-4">
              {ownedAssets.map((asset) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <RealAssetImage type={asset.type} title={asset.title} size="sm" />
                    <div>
                      <h3 className="font-semibold text-white text-sm">{asset.title}</h3>
                      <p className="text-gray-400 text-xs">{asset.type}</p>
                      <p className="text-cyan-400 text-xs">${asset.investment.toLocaleString()} invested</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewDetails(asset)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 rounded-2xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Performance</h2>
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <p className="text-cyan-300 font-bold text-2xl">${user?.portfolioValue?.toLocaleString() || '490,000'}</p>
                  <p className="text-cyan-200 text-sm">Portfolio Value</p>
                </div>
                <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <p className="text-purple-300 font-bold text-2xl">{user?.asrdBalance?.toLocaleString() || '5,000'}</p>
                  <p className="text-purple-200 text-sm">ASRD Tokens</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-300 text-sm">Monthly Income</span>
                  <span className="text-emerald-400 text-sm">+$12,500</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-amber-300 text-sm">Annual ROI Target</span>
                  <span className="text-amber-400 text-sm">+35.2%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Asset Details Modal */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
        onInvest={handleInvest}
      />
    </div>
  );
}
