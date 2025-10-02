"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, PieChart, DollarSign, Calendar, MapPin, Trophy, Home, Coins, Sparkles, Filter, Search, BarChart3, Target, Users, Zap, Crown, Gem, LogIn, Wallet, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import EnhancedAnalytics from '@/components/ui/EnhancedAnalytics';

export default function Dashboard() {
  const { ownedAssets, claimEarnings, claimAllEarnings } = useApp();
  const { cashBalance, asrdBalance, getUsdValue } = useWallet();
  const { user, login, isLoading } = useAuth();
  const [claimingAsset, setClaimingAsset] = useState<number | null>(null);
  const [showClaimSuccess, setShowClaimSuccess] = useState(false);
  const [lastClaimAmount, setLastClaimAmount] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'performance'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [assetTypeFilter, setAssetTypeFilter] = useState<'all' | 'horse' | 'real-estate'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'earnings' | 'roi'>('value');

  // Auto-login for demo
  useEffect(() => {
    if (!user && !isLoading) {
      login('0x742d35Cc6634C0532925a3b8D123');
    }
  }, [user, isLoading, login]);

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

  // Filter and sort assets
  const filteredAssets = useMemo(() => {
    let filtered = ownedAssets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           asset.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = assetTypeFilter === 'all' || asset.type === assetTypeFilter;
      return matchesSearch && matchesType;
    });

    // Sort assets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'value':
          return (b.purchasePrice || b.price) - (a.purchasePrice || a.price);
        case 'earnings':
          return ((b.unclaimedWinnings || b.unclaimedRent) || 0) - ((a.unclaimedWinnings || a.unclaimedRent) || 0);
        case 'roi':
          return (b.roi || 0) - (a.roi || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [ownedAssets, searchQuery, assetTypeFilter, sortBy]);

  const handleClaimEarnings = async (assetId: number) => {
    setClaimingAsset(assetId);
    const result = await claimEarnings(assetId);
    setClaimingAsset(null);

    if (result.success && result.amount > 0) {
      setLastClaimAmount(result.amount);
      setShowClaimSuccess(true);
      setTimeout(() => setShowClaimSuccess(false), 3000);
    }
  };

  const handleClaimAllEarnings = async () => {
    setClaimingAsset(-1); // -1 indicates "claim all"
    const result = await claimAllEarnings();
    setClaimingAsset(null);

    if (result.success && result.totalAmount > 0) {
      setLastClaimAmount(result.totalAmount);
      setShowClaimSuccess(true);
      setTimeout(() => setShowClaimSuccess(false), 3000);
    }
  };

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
    return type === 'horse' ? Crown : Gem;
  };

  const getAssetTypeColor = (type: string) => {
    return type === 'horse' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-green-500/20 text-green-300 border-green-500/30';
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen immersive-bg flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-glow border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Show dashboard content when user is logged in
  return (
    <div className="min-h-screen immersive-bg">
      <Header />

      {/* Claim Success Animation */}
      {showClaimSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          className="fixed top-20 right-4 z-50 glass-3d p-4 rounded-2xl border border-emerald-500/50"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles className="w-6 h-6 text-emerald-200" />
              </motion.div>
            </div>
            <div>
              <p className="text-white font-semibold">Earnings Claimed!</p>
              <p className="text-emerald-300 text-sm">+{lastClaimAmount} ASRD added to your wallet</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-3d">
              Investment Dashboard
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
                  className="glass-3d p-6 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color} mt-1 text-glow`}>{stat.value}</p>
                      <p className="text-slate-500 text-sm mt-1">{stat.subvalue}</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-xl">
                      <Icon className="w-6 h-6 text-slate-300" />
                    </div>
                  </div>

                  {/* Animated background effect */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-sapphire-500/10 rounded-full blur-xl"></div>
                </motion.div>
              );
            })}
          </div>

          {/* Claim All Button */}
          {totalUnclaimedEarnings > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-8"
            >
              <button
                onClick={handleClaimAllEarnings}
                disabled={claimingAsset === -1}
                className="btn-3d relative overflow-hidden group"
              >
                <div className="flex items-center space-x-2">
                  {claimingAsset === -1 ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  <span>
                    {claimingAsset === -1 ? 'Claiming...' : `Claim All Earnings (${totalUnclaimedEarnings} ASRD)`}
                  </span>
                </div>

                {/* Particle effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="absolute top-0 right-1/4 w-2 h-2 bg-sapphire-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-amethyst-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </button>
            </motion.div>
          )}

          {/* Advanced Filtering Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-3d p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <h3 className="text-xl font-bold text-white">Your Assets</h3>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-1 lg:flex-none lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {/* Asset Type Filter */}
                <select
                  value={assetTypeFilter}
                  onChange={(e) => setAssetTypeFilter(e.target.value as any)}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Assets</option>
                  <option value="horse">Racehorses</option>
                  <option value="real-estate">Real Estate</option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="value">Sort by Value</option>
                  <option value="name">Sort by Name</option>
                  <option value="earnings">Sort by Earnings</option>
                  <option value="roi">Sort by ROI</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="glass-3d p-1 rounded-2xl mb-8">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 flex-1 justify-center ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <PieChart className="w-4 h-4" />
                <span>Asset Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 flex-1 justify-center ${
                  activeTab === 'analytics'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Advanced Analytics</span>
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 flex-1 justify-center ${
                  activeTab === 'performance'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Performance</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Your Assets ({filteredAssets.length})
                  <span className="text-slate-400 text-lg ml-2">
                    {assetTypeFilter !== 'all' && `• ${assetTypeFilter === 'horse' ? 'Racehorses' : 'Real Estate'}`}
                  </span>
                </h2>
              </div>

              {filteredAssets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAssets.map((asset, index) => {
                    const AssetTypeIcon = getAssetTypeIcon(asset.type);
                    // Use purchasePrice if available (user purchases), otherwise use price (mock data)
                    const currentValueASRD = asset.purchasePrice || asset.price || 0;
                    const currentValueUSD = getUsdValue(currentValueASRD);
                    const unclaimedEarnings = asset.unclaimedWinnings || asset.unclaimedRent || 0;
                    const hasUnclaimedEarnings = unclaimedEarnings > 0;

                    return (
                      <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass-3d group relative overflow-hidden"
                      >
                        {/* Earning pulse effect */}
                        {hasUnclaimedEarnings && (
                          <div className="absolute top-4 left-4 z-10">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-3 h-3 bg-emerald-400 rounded-full"
                            ></motion.div>
                          </div>
                        )}

                        <div className="relative">
                          <img
                            src={asset.image}
                            alt={asset.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAssetTypeColor(asset.type)} border backdrop-blur-sm`}>
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
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Projected ROI</span>
                              <span className="text-amber-400 font-semibold">
                                {asset.roi}%
                              </span>
                            </div>
                            {hasUnclaimedEarnings && (
                              <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                              >
                                <span className="text-emerald-300">Ready to Claim</span>
                                <span className="text-emerald-300 font-semibold text-lg">
                                  +{unclaimedEarnings} ASRD
                                </span>
                              </motion.div>
                            )}
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleClaimEarnings(asset.id)}
                              disabled={!hasUnclaimedEarnings || claimingAsset === asset.id}
                              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 relative overflow-hidden ${
                                hasUnclaimedEarnings
                                  ? 'btn-3d bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              {claimingAsset === asset.id ? (
                                <div className="flex items-center justify-center space-x-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Claiming...</span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center space-x-2">
                                  <Coins className="w-4 h-4" />
                                  <span>Claim Earnings</span>
                                </div>
                              )}
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
                  className="text-center py-16 glass-3d rounded-2xl"
                >
                  <PieChart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No assets found</h3>
                  <p className="text-slate-500 mb-6">
                    {searchQuery || assetTypeFilter !== 'all'
                      ? 'Try adjusting your search criteria'
                      : 'Start building your portfolio in the marketplace'
                    }
                  </p>
                  <a
                    href="/marketplace"
                    className="btn-3d inline-flex items-center px-6 py-3"
                  >
                    Explore Marketplace
                  </a>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && <EnhancedAnalytics />}

          {activeTab === 'performance' && (
            <div className="glass-3d p-8 text-center">
              <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Performance Analytics</h3>
              <p className="text-slate-400">Advanced performance tracking coming soon</p>
              <p className="text-slate-500 text-sm mt-2">Track your investment growth with detailed analytics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
