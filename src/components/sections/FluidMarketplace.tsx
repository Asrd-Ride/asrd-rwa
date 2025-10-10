"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import EnhancedAssetCard from '@/components/ui/EnhancedAssetCard';
import InvestmentModal from '@/components/ui/InvestmentModal';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { mockAssets } from '@/data/mockData';

const enhancedAssets = mockAssets.map(asset => ({
  ...asset,
  category: asset.type,
  currency: "USD",
  image: "",
  description: `Premium ${asset.type.toLowerCase()} investment located in ${asset.location} with ${asset.roi} ROI. Professional management and proven returns.`,
  sharesAvailable: 100,
  sharesSold: Math.floor(Math.random() * 100)
}))

export default function FluidMarketplace() {
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
    <div className="fluid-section">
      <div className="fluid-container">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 fluid-scroll-item mobile:text-center">
          <h1 className="fluid-hero">
            Asset <span className="text-fluid-gold">Marketplace</span>
          </h1>
          <p className="fluid-body max-w-2xl mx-auto mobile:px-4">
            Discover and invest in premium real-world assets with institutional-grade returns
          </p>
        </div>

        {/* Filters and Search */}
        <div className="fluid-card-panel mb-6 md:mb-8 fluid-scroll-item mobile:px-4 mobile:py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fluid-silver w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-3 bg-fluid-charcoal border border-fluid-slate rounded-xl text-white placeholder-fluid-silver focus:border-fluid-gold focus:outline-none transition-colors text-sm md:text-base"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 md:gap-3 items-center w-full lg:w-auto">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 lg:flex-none px-3 md:px-4 py-2 md:py-3 bg-fluid-charcoal border border-fluid-slate rounded-xl text-white focus:border-fluid-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                {assetTypes.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 lg:flex-none px-3 md:px-4 py-2 md:py-3 bg-fluid-charcoal border border-fluid-slate rounded-xl text-white focus:border-fluid-gold focus:outline-none transition-colors text-sm md:text-base"
              >
                <option value="roi">Highest ROI</option>
                <option value="value">Highest Value</option>
                <option value="minInvestment">Lowest Minimum</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-fluid-gold text-fluid-black'
                      : 'bg-fluid-charcoal text-fluid-silver border border-fluid-slate hover:border-fluid-gold'
                  }`}
                >
                  <Grid className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-fluid-gold text-fluid-black'
                      : 'bg-fluid-charcoal text-fluid-silver border border-fluid-slate hover:border-fluid-gold'
                  }`}
                >
                  <List className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Grid */}
        <div className={viewMode === 'grid' 
          ? "fluid-grid fluid-grid-cols-1 md:fluid-grid-cols-2 lg:fluid-grid-cols-3 gap-4 md:gap-6"
          : "space-y-3 md:space-y-4"
        }>
          {filteredAssets.map((asset, index) => (
            <div
              key={asset.id}
              className="fluid-scroll-item"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <EnhancedAssetCard
                {...asset}
                onInvest={handleInvest}
                onViewDetails={handleViewDetails}
                layout={viewMode}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-12 md:py-16 fluid-scroll-item">
            <div className="fluid-card-panel max-w-md mx-auto mobile:px-4 mobile:py-6">
              <Filter className="w-12 h-12 md:w-16 md:h-16 text-fluid-silver mx-auto mb-3 md:mb-4" />
              <h3 className="fluid-subheading mb-2 md:mb-2">No Assets Found</h3>
              <p className="fluid-caption mb-4 md:mb-6 mobile:px-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedType('all')
                }}
                className="btn-fluid mobile:w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
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
