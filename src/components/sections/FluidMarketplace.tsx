"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, BadgeCheck, TrendingUp, Zap, Shield, Users, Clock, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import EnhancedAssetCard from '@/components/ui/EnhancedAssetCard';
import InvestmentModal from '@/components/ui/InvestmentModal';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { mockAssets } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Asset } from '@/types/asset';

// Enhanced asset data with all new features
const enhancedAssets: Asset[] = mockAssets.map((asset, index) => ({
  ...asset,
  category: asset.type,
  currency: "USD",
  image: "",
  description: asset.description || `Premium ${asset.type.toLowerCase()} investment located in ${asset.location} with ${asset.roi} ROI. Professional management and proven returns.`,
  sharesAvailable: 100,
  sharesSold: (index * 13) % 100,
  // Enhanced features
  badges: [
    { label: "Blockchain Verified", color: "emerald" },
    { label: "High Demand", color: "rose" },
    { label: "Featured", color: "amber" },
    { label: "Exclusive Access", color: "violet" },
    { label: "Limited Time", color: "sapphire" },
    { label: "Top Performer", color: "cyan" }
  ].slice(0, 2 + (index % 3)),
  performance: `+${(10 + (index * 2) % 10).toFixed(1)}%`,
  timeLeft: `${3 + (index % 7)} days`,
  investorCount: 150 + (index * 23) % 200,
  enhanced: true
}))

export default function FluidMarketplace() {
  const { user, login, invest } = useAuth()
  const { showNotification } = useNotification()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('roi')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Filter and sort logic
  const filteredAssets = useMemo(() => {
    return enhancedAssets.filter(asset => {
      const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (asset.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = selectedType === 'all' || asset.type === selectedType

      return matchesSearch && matchesType
    }).sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return parseFloat(b.roi) - parseFloat(a.roi)
        case 'value':
          return b.value - a.value
        case 'minInvestment':
          return a.minInvestment - b.minInvestment
        case 'performance':
          return parseFloat(b.performance || '0') - parseFloat(a.performance || '0')
        default:
          return 0
      }
    })
  }, [searchQuery, selectedType, sortBy])

  // UPDATED HANDLERS - Accept Asset objects
  const handleInvest = (asset: Asset) => {
    if (!user) {
      login('/marketplace')
      showNotification({
        title: 'Authentication Required',
        message: 'Please sign in to invest in assets',
        type: 'info'
      })
      return
    }
    setSelectedAsset(asset)
    setIsInvestmentModalOpen(true)
  }

  const handleConfirmInvest = async (assetId: number, amount: number) => {
    if (!user || !selectedAsset) return;

    const success = invest(amount, selectedAsset.title);
    if (!success) return;

    await new Promise(resolve => setTimeout(resolve, 2000));

    showNotification({
      type: 'premium',
      title: 'Investment Successful!',
      message: `Successfully invested $${amount.toLocaleString()} in ${selectedAsset?.title}!\n\n• ASRD Tokens Deducted: ${(amount / 32).toFixed(2)}\n• Asset: ${selectedAsset?.title}\n• ROI: ${selectedAsset?.roi}\n\nYour investment has been added to your portfolio.`,
      duration: 6000
    });

    setIsInvestmentModalOpen(false);
    setSelectedAsset(null);
  }

  // UPDATED HANDLER - Accepts Asset object
  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset)
    setIsDetailsModalOpen(true)
  }

  const assetTypes = ['all', ...new Set(enhancedAssets.map(asset => asset.type))]

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
            <span className="text-amber-400 font-semibold">Premium Investment Marketplace</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Elite Asset <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">Marketplace</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover institutional-grade real-world assets with fractional ownership. 
            Start investing from $100 with blockchain-secured transactions.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { icon: Users, value: '2.5K+', label: 'Active Investors' },
              { icon: TrendingUp, value: '$85M+', label: 'Assets Managed' },
              { icon: Shield, value: '100%', label: 'Secure' },
              { icon: Star, value: '4.9/5', label: 'Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm"
              >
                <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 mb-8 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assets by name, location, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none transition-all duration-300 text-lg backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Filters Group */}
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
              {/* Asset Type Filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:border-amber-400 focus:outline-none transition-all duration-300 appearance-none backdrop-blur-sm"
                >
                  {assetTypes.map(type => (
                    <option key={type} value={type} className="capitalize bg-slate-800">
                      {type === 'all' ? 'All Asset Types' : type}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:border-amber-400 focus:outline-none transition-all duration-300 appearance-none backdrop-blur-sm"
                >
                  <option value="roi">Highest ROI</option>
                  <option value="performance">Best Performance</option>
                  <option value="value">Highest Value</option>
                  <option value="minInvestment">Lowest Minimum</option>
                </select>
                <TrendingUp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-slate-900/50 rounded-xl p-2 border border-slate-600 backdrop-blur-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="text-slate-300">
            Showing <span className="text-white font-semibold">{filteredAssets.length}</span> of{' '}
            <span className="text-white font-semibold">{enhancedAssets.length}</span> assets
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Live Market Data</span>
          </div>
        </motion.div>

        {/* Asset Grid/List */}
        <AnimatePresence mode="wait">
          {filteredAssets.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
              }
            >
              {filteredAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* UPDATED: Pass asset object instead of spreading */}
                  <EnhancedAssetCard
                    asset={asset}
                    onInvest={handleInvest}
                    onViewDetails={handleViewDetails}
                    enhanced={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Assets Found</h3>
                <p className="text-slate-300 mb-6">
                  Try adjusting your search criteria or filters to find more investment opportunities.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedType('all')
                  }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        asset={selectedAsset}
        onInvest={handleConfirmInvest}
      />

      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset}
        onInvest={() => selectedAsset && handleInvest(selectedAsset)}
      />
    </div>
  )
}