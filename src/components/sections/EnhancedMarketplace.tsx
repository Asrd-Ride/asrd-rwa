"use client"

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import EnhancedAssetCard from '@/components/ui/EnhancedAssetCard'
import InvestmentModal from '@/components/ui/InvestmentModal'
import AssetDetailsModal from '@/components/ui/AssetDetailsModal'
import { mockAssets } from '@/data/mockData'

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
    // Simulate investment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    alert(`🎉 Successfully invested $${amount.toLocaleString()} in ${selectedAsset?.title}!\n\n• ASRD Tokens: ${(amount / 32).toFixed(2)}\n• Asset: ${selectedAsset?.title}\n• ROI: ${selectedAsset?.roi}\n\nYour investment has been added to your portfolio.`)

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
            ASSET <span className="text-cyan-400">MARKETPLACE</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Discover and invest in exclusive real world assets with proven track records and exceptional returns.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-800/50 rounded-2xl border border-gray-700 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assets by name, location, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-600">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
              >
                {assetTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
              >
                <option value="roi">Highest ROI</option>
                <option value="value">Asset Value</option>
                <option value="minInvestment">Min Investment</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            Showing <span className="text-cyan-400 font-semibold">{filteredAssets.length}</span> of{' '}
            <span className="text-cyan-400 font-semibold">{enhancedAssets.length}</span> premium assets
          </p>
        </motion.div>

        {/* Assets Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }
        >
          {filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No assets found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </motion.div>
        )}
      </div>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => {
          setIsInvestmentModalOpen(false)
          setSelectedAsset(null)
        }}
        asset={selectedAsset}
        onInvest={handleConfirmInvest}
      />

      {/* Asset Details Modal */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedAsset(null)
        }}
        asset={selectedAsset}
        onInvest={handleInvest}
      />
    </div>
  )
}
