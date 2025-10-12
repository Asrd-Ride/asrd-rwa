"use client";

import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, Building, Zap,
  ArrowUpRight, Download, Eye, Coins, CalendarDays,
  BadgeCheck, Users, Clock, Star, Shield, Target
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ownedAssets, platformStats } from '@/data/mockData';
import RealAssetImage from '@/components/ui/RealAssetImage';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { useNotification } from '@/contexts/NotificationContext';
import { motion } from 'framer-motion';

export default function FluidDashboard() {
  const { user, claimRental, claimWinnings } = useAuth();
  const { showNotification } = useNotification();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [claimedRent, setClaimedRent] = useState(false);
  const [claimedWinnings, setClaimedWinnings] = useState(false);

  const totalMonthlyIncome = ownedAssets.reduce((sum, asset) => sum + asset.payoutAmount, 0);
  const totalPortfolioValue = ownedAssets.reduce((sum, asset) => sum + (asset.value * asset.shares / 100), 0);

  // Claim functionality (unchanged)
  const handleClaimRent = () => {
    claimRental(1);
    setClaimedRent(true);
    showNotification({
      type: 'premium',
      title: 'Rent Income Claimed!',
      message: '$4,250 rent successfully claimed! +132 ASRD tokens added to your balance.',
      duration: 5000
    });
  };

  const handleClaimWinnings = () => {
    claimWinnings(2);
    setClaimedWinnings(true);
    showNotification({
      type: 'premium',
      title: 'Investment Winnings Claimed!',
      message: '$8,500 winnings successfully claimed! +265 ASRD tokens added to your balance.',
      duration: 5000
    });
  };

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  // Enhanced stats with better data
  const stats = [
    {
      label: "Portfolio Value",
      value: `$${totalPortfolioValue.toLocaleString()}`,
      change: "+12.8%",
      icon: DollarSign,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      description: "Total value of your investments"
    },
    {
      label: "Monthly Income",
      value: `$${totalMonthlyIncome.toLocaleString()}`,
      change: "+15.2%",
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      description: "Expected monthly returns"
    },
    {
      label: "Active Assets",
      value: ownedAssets.length.toString(),
      change: "+2",
      icon: Building,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      description: "Diversified investments"
    },
    {
      label: "ASRD Tokens",
      value: user?.asrdBalance?.toLocaleString() || "15,642",
      change: "+265",
      icon: Zap,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      description: "Platform rewards balance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <BadgeCheck className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-semibold">Premium Portfolio</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Investment <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Track your elite real-world asset investments with comprehensive analytics and real-time performance metrics.
          </p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 hover:border-amber-400/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1 text-sm font-semibold text-emerald-400">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {stat.value}
              </h3>
              
              <p className="text-slate-300 font-medium mb-1">{stat.label}</p>
              <p className="text-slate-400 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Income & Performance */}
          <div className="lg:col-span-2 space-y-8">
            {/* Claimable Income - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Claimable Income</h2>
                <div className="flex items-center space-x-2 text-amber-400">
                  <Coins className="w-5 h-5" />
                  <span className="font-semibold">Ready to Claim</span>
                </div>
              </div>

              {/* Rent Income Card */}
              <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl border border-amber-500/20 p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Rental Income</h3>
                    <p className="text-slate-300 text-sm">From premium real estate assets</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-400">$4,250</p>
                    <p className="text-amber-300 text-sm">+132 ASRD Tokens</p>
                  </div>
                </div>
                <button
                  onClick={handleClaimRent}
                  disabled={claimedRent}
                  className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    claimedRent ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                  }`}
                >
                  <Coins className="w-5 h-5" />
                  <span>{claimedRent ? 'Claimed Successfully!' : 'Claim Rent Income'}</span>
                </button>
              </div>

              {/* Winnings Income Card */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-xl border border-emerald-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Investment Winnings</h3>
                    <p className="text-slate-300 text-sm">From thoroughbred and venture assets</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-400">$8,500</p>
                    <p className="text-emerald-300 text-sm">+265 ASRD Tokens</p>
                  </div>
                </div>
                <button
                  onClick={handleClaimWinnings}
                  disabled={claimedWinnings}
                  className={`w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    claimedWinnings ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  <span>{claimedWinnings ? 'Claimed Successfully!' : 'Claim Winnings'}</span>
                </button>
              </div>
            </motion.div>

            {/* Income History - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Income History</h2>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="space-y-4">
                {ownedAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-slate-500 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleViewDetails(asset)}
                  >
                    <div className="flex items-center space-x-4">
                      <RealAssetImage type={asset.type} title={asset.title} size="sm" />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                          {asset.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-slate-400 text-sm mt-1">
                          <CalendarDays className="w-4 h-4" />
                          <span>Next payout: {asset.nextPayout}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-400">${asset.payoutAmount.toLocaleString()}</p>
                      <p className="text-blue-300 text-sm">+{(asset.payoutAmount / 32).toFixed(0)} ASRD</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Your Assets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Assets</h2>
              <div className="flex items-center space-x-2 text-emerald-400">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-semibold">Secured</span>
              </div>
            </div>

            <div className="space-y-4">
              {ownedAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-slate-700/30 rounded-xl border border-slate-600 p-4 hover:border-amber-400/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleViewDetails(asset)}
                >
                  <div className="flex items-start space-x-4">
                    <RealAssetImage type={asset.type} title={asset.title} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                            {asset.title}
                          </h3>
                          <p className="text-slate-300 text-sm mb-2">{asset.location}</p>
                          
                          {/* Enhanced badges */}
                          {asset.badges && asset.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {asset.badges.slice(0, 2).map((badge, badgeIndex) => (
                                <span
                                  key={badgeIndex}
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                    badge.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                                    badge.color === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                                    'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                  }`}
                                >
                                  {badge.label}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-500/30">
                          {asset.roi}
                        </span>
                      </div>

                      {/* Enhanced metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-slate-400 text-sm">Investment</p>
                          <p className="text-white font-semibold">${asset.investment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Shares</p>
                          <p className="text-blue-400 font-semibold">{asset.shares}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-slate-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{asset.investorCount} investors</span>
                          </div>
                          {asset.performance && (
                            <div className="flex items-center space-x-1 text-emerald-400">
                              <TrendingUp className="w-4 h-4" />
                              <span>{asset.performance}</span>
                            </div>
                          )}
                        </div>
                        <button
                          className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-1 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(asset);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal (unchanged functionality) */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset}
        onInvest={() => {}}
      />
    </div>
  );
}