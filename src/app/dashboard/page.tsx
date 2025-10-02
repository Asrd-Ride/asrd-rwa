"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { WalletContext } from '@/contexts/WalletContext';
import { AppContext } from '@/contexts/AppContext';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Clock,
  Shield,
  Award,
  BarChart3
} from 'lucide-react';

export default function DashboardPage() {
  const walletContext = React.useContext(WalletContext);
  const appContext = React.useContext(AppContext);

  if (!walletContext || !appContext) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const { asrdBalance, usdBalance, portfolio, claimDividend } = walletContext;
  const { assets } = appContext;

  const userAssets = assets.filter(asset => 
    portfolio.some(p => p.assetId === asset.id && p.percentage > 0)
  );

  const totalPortfolioValue = userAssets.reduce((total, asset) => {
    const portfolioItem = portfolio.find(p => p.assetId === asset.id);
    return total + (asset.price * (portfolioItem?.percentage || 0) / 100);
  }, 0);

  const availableClaims = userAssets.filter(asset => 
    asset.dividends && asset.dividends > 0
  );

  const totalAvailableDividends = availableClaims.reduce((total, asset) => 
    total + (asset.dividends || 0), 0
  );

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Investment Dashboard
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Manage your real-world asset portfolio and track your earnings
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Portfolio Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">ASRD Balance</p>
                    <p className="text-3xl font-bold text-white mt-2">{asrdBalance.toLocaleString()} ASRD</p>
                    <p className="text-blue-300 text-sm mt-1">
                      ${(asrdBalance * 32).toLocaleString()} USD
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <DollarSign className="w-8 h-8 text-blue-300" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">USD Balance</p>
                    <p className="text-3xl font-bold text-white mt-2">${usdBalance.toLocaleString()}</p>
                    <p className="text-green-300 text-sm mt-1">
                      {(usdBalance / 32).toFixed(2)} ASRD
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-green-300" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Portfolio Value & Claims */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Portfolio Value</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      ${totalPortfolioValue.toLocaleString()}
                    </p>
                    <p className="text-purple-300 text-sm mt-1">
                      {(totalPortfolioValue / 32).toFixed(2)} ASRD
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <PieChart className="w-8 h-8 text-purple-300" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-200 text-sm">Available Dividends</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      ${totalAvailableDividends.toLocaleString()}
                    </p>
                    <p className="text-orange-300 text-sm mt-1">
                      {availableClaims.length} assets
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500/20 rounded-xl">
                    <Award className="w-8 h-8 text-orange-300" />
                  </div>
                </div>
                {totalAvailableDividends > 0 && (
                  <button
                    onClick={() => claimDividend()}
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl transition-colors"
                  >
                    Claim All Dividends
                  </button>
                )}
              </div>
            </motion.div>

            {/* Your Assets */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-blue-400" />
                Your Assets
              </h2>
              <div className="space-y-4">
                {userAssets.length > 0 ? (
                  userAssets.map((asset) => {
                    const portfolioItem = portfolio.find(p => p.assetId === asset.id);
                    const ownershipPercentage = portfolioItem?.percentage || 0;
                    const value = (asset.price * ownershipPercentage) / 100;

                    return (
                      <div
                        key={asset.id}
                        className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={asset.imageUrl}
                            alt={asset.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-white">{asset.name}</h3>
                            <p className="text-slate-300 text-sm">{asset.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{ownershipPercentage}%</p>
                          <p className="text-slate-300 text-sm">${value.toLocaleString()}</p>
                          {asset.dividends && asset.dividends > 0 && (
                            <p className="text-green-400 text-sm">${asset.dividends} dividends</p>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <PieChart className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No assets in your portfolio yet</p>
                    <p className="text-slate-500 text-sm mt-2">
                      Start investing in the marketplace
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Portfolio Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Assets</span>
                  <span className="text-white font-semibold">{userAssets.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Active Investments</span>
                  <span className="text-white font-semibold">{userAssets.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Avg. Return</span>
                  <span className="text-green-400 font-semibold">8.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Risk Level</span>
                  <span className="text-yellow-400 font-semibold">Medium</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {portfolio.slice(0, 3).map((item, index) => {
                  const asset = assets.find(a => a.id === item.assetId);
                  return asset ? (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="text-white text-sm font-medium">{asset.name}</p>
                        <p className="text-slate-400 text-xs">Purchased {item.percentage}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 text-sm">+${((asset.price * item.percentage) / 100).toLocaleString()}</p>
                        <p className="text-slate-400 text-xs">Investment</p>
                      </div>
                    </div>
                  ) : null;
                })}
                {portfolio.length === 0 && (
                  <p className="text-slate-400 text-center py-4">No recent activity</p>
                )}
              </div>
            </motion.div>

            {/* Security Status */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Security Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">2FA</span>
                  <span className="text-green-400 font-semibold">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Wallet</span>
                  <span className="text-green-400 font-semibold">Secure</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Last Login</span>
                  <span className="text-slate-300 text-sm">Today</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
