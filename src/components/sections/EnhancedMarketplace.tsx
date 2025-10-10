"use client"

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, TrendingUp, DollarSign, Clock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import EnhancedAssetCard from '@/components/ui/EnhancedAssetCard'
import InvestmentModal from '@/components/ui/InvestmentModal'
import AssetDetailsModal from '@/components/ui/AssetDetailsModal'
import { mockAssets } from '@/data/mockData'
import { useNotification } from '@/contexts/NotificationContext'

// Enhanced mock assets with proper structure for EnhancedAssetCard
const enhancedAssets = mockAssets.map(asset => ({
  ...asset,
  category: asset.type,
  currency: "USD",
  image: "",
  description: `Premium ${asset.type.toLowerCase()} investment located in ${asset.location} with ${asset.roi} ROI. Professional management and proven returns.`,
  sharesAvailable: 100,
  sharesSold: Math.floor(Math.random() * 100)
}))

export default function EnhancedMarketplace() {
  const { user, login } = useAuth()
  const { showNotification } = useNotification()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('roi')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const filteredAssets = useMemo(() => {
    return enhancedAssets.filter(asset => {
      const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        default:
          return 0
      }
    })
  }, [searchQuery, selectedType, sortBy])

  const handleInvest = (assetId: number) => {
    if (!user) {
      login('/marketplace')
      return
    }

    const asset = enhancedAssets.find(a => a.id === assetId)
    if (asset) {
      setSelectedAsset(asset)
      setIsInvestmentModalOpen(true)
    }
  }

  const handleConfirmInvest = async (assetId: number, amount: number) => {
    // Update ASRD balance through AuthContext
      if (user) {
        const asrdTokens = amount / 32;
        // This would call buyASRD in AuthContext
        console.log(`Purchased $${amount} worth of ASRD tokens: ${asrdTokens.toFixed(2)}`);
      }
    await new Promise(resolve => setTimeout(resolve, 2000))

    showNotification({
      type: 'premium',
      title: 'Investment Successful!',
      message: `Successfully invested $${amount.toLocaleString()} in ${selectedAsset?.title}!\n\n• ASRD Tokens: ${(amount / 32).toFixed(2)}\n• Asset: ${selectedAsset?.title}\n• ROI: ${selectedAsset?.roi}\n\nYour investment has been added to your portfolio.`,
      duration: 6000
    })

    setIsInvestmentModalOpen(false)
    setSelectedAsset(null)
  }

  const handleViewDetails = (assetId: number) => {
    const asset = enhancedAssets.find(a => a.id === assetId)
    if (asset) {
      setSelectedAsset(asset)
      setIsDetailsModalOpen(true)
    }
  }

  const assetTypes = ['all', ...new Set(enhancedAssets.map(asset => asset.type))]

  return (
    <div className="min-h-screen bg-3d-space">
      <div className="container-3d py-8">
        {/* 3D Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3d-hero mb-6">
            ASSET <span className="text-3d-glow">MARKETPLACE</span>
          </h1>
          <p className="text-3d-body max-w-2xl mx-auto">
            Discover and invest in premium real-world assets with institutional-grade returns
          </p>
        </motion.div>

        {/* 3D Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-3d p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              >
                {assetTypes.map(type => (
                  <option key={type} value={type} className="bg-gray-800">
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              >
                <option value="roi" className="bg-gray-800">Highest ROI</option>
                <option value="value" className="bg-gray-800">Highest Value</option>
                <option value="minInvestment" className="bg-gray-800">Lowest Minimum</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-gray-400">
              Showing {filteredAssets.length} assets
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3D Asset Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
          }
        >
          {filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 30, rotateY: viewMode === 'grid' ? 15 : 0 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ 
                y: viewMode === 'grid' ? -8 : -4,
                rotateY: viewMode === 'grid' ? 3 : 0,
                transition: { type: "spring", stiffness: 300 }
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              className="transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <EnhancedAssetCard
                {...asset}
                onInvest={handleInvest}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="card-3d p-12 max-w-md mx-auto">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Assets Found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedType('all')
                }}
                className="btn-3d-secondary"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
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
        onInvest={handleInvest}
      />
    </div>
  )
}
