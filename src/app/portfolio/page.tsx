"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useWallet } from '@/contexts/WalletContext';
import { TrendingUp, PieChart, DollarSign, Calendar, MapPin, Trophy, Home, Coins } from 'lucide-react';

export default function Portfolio() {
  const { ownedAssets, claimEarnings } = useApp();
  const { cashBalance, asrdBalance, getUsdValue } = useWallet();

  // Safe calculations with fallbacks - use purchasePrice if available, otherwise use price
  const totalPortfolioValueASRD = ownedAssets.reduce((total, asset) => {
    const assetValue = asset.purchasePrice || asset.price || 0;
    return total + assetValue;
  }, 0);
  
  const totalPortfolioValueUSD = getUsdValue(totalPortfolioValueASRD);
  
  const totalUnclaimedEarnings = ownedAssets.reduce((total, asset) => {
    const earnings = asset.unclaimedWinnings || asset.unclaimedRent || 0;
    return total + earnings;
  }, 0);

  const portfolioStats = [
    {
      label: 'Total Portfolio Value',
      value: `$${totalPortfolioValueUSD.toLocaleString()}`,
      subvalue: `${totalPortfolioValueASRD.toLocaleString()} ASRD`,
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      label: 'Cash Balance',
      value: `$${cashBalance.toLocaleString()}`,
      subvalue: 'Available to invest',
      icon: Coins,
      color: 'text-blue-400'
    },
    {
      label: 'ASRD Balance',
      value: `${asrdBalance.toFixed(2)} ASRD`,
      subvalue: `$${getUsdValue(asrdBalance).toLocaleString()} USD`,
      icon: TrendingUp,
      color: 'text-purple-400'
    },
    {
      label: 'Unclaimed Earnings',
      value: `${totalUnclaimedEarnings} ASRD`,
      subvalue: `$${getUsdValue(totalUnclaimedEarnings).toLocaleString()} USD`,
      icon: Trophy,
      color: 'text-yellow-400'
    }
  ];

  const getAssetTypeIcon = (type: string) => {
    return type === 'horse' ? Trophy : Home;
  };

  const getAssetTypeColor = (type: string) => {
    return type === 'horse' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-green-500/20 text-green-300 border-green-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Investment Portfolio
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Track your real-world asset investments, monitor performance, and manage your earnings
          </p>
        </motion.div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {portfolioStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-2xl p-6 border border-slate-600/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                    <p className="text-slate-500 text-sm mt-1">{stat.subvalue}</p>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-xl">
                    <Icon className="w-6 h-6 text-slate-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Asset Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Assets</h2>
            <span className="text-slate-400">{ownedAssets.length} asset{ownedAssets.length !== 1 ? 's' : ''}</span>
          </div>

          {ownedAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedAssets.map((asset, index) => {
                const AssetTypeIcon = getAssetTypeIcon(asset.type);
                // Use purchasePrice if available (user purchases), otherwise use price (mock data)
                const currentValueASRD = asset.purchasePrice || asset.price || 0;
                const currentValueUSD = getUsdValue(currentValueASRD);
                const hasUnclaimedEarnings = (asset.unclaimedWinnings || asset.unclaimedRent || 0) > 0;
                
                return (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-2xl overflow-hidden border border-slate-600/30 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="relative">
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAssetTypeColor(asset.type)} border`}>
                          <AssetTypeIcon className="w-3 h-3 inline mr-1" />
                          {asset.type === 'horse' ? 'Racehorse' : 'Real Estate'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{asset.name}</h3>
                      <div className="flex items-center text-slate-400 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {asset.location}
                      </div>
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{asset.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Your Investment</span>
                          <div className="text-right">
                            <div className="text-white font-semibold">{currentValueASRD.toLocaleString()} ASRD</div>
                            <div className="text-slate-500 text-sm">${currentValueUSD.toLocaleString()} USD</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Ownership</span>
                          <span className="text-green-400 font-semibold">
                            {asset.fractionOwned ? `${(asset.fractionOwned * 100).toFixed(1)}%` : '100%'}
                          </span>
                        </div>
                        {hasUnclaimedEarnings && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Unclaimed</span>
                            <span className="text-yellow-400 font-semibold">
                              {(asset.unclaimedWinnings || asset.unclaimedRent || 0)} ASRD
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => claimEarnings(asset.id)}
                          disabled={!hasUnclaimedEarnings}
                          className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all duration-200 ${
                            hasUnclaimedEarnings
                              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                              : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Claim Earnings
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-600/30"
            >
              <PieChart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No assets yet</h3>
              <p className="text-slate-500 mb-6">Start building your portfolio in the marketplace</p>
              <a
                href="/marketplace"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
              >
                Explore Marketplace
              </a>
            </motion.div>
          )}
        </div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-6">Portfolio Performance</h3>
          <div className="flex items-center justify-center h-64 bg-slate-700/30 rounded-xl border border-slate-600/30">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Performance charts coming soon</p>
              <p className="text-slate-500 text-sm mt-2">Track your investment growth over time</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
