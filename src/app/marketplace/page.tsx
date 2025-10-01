'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { 
  Star, MapPin, Coins, TrendingUp, Eye, Filter,
  Clock, CheckCircle, XCircle, PieChart, Users
} from 'lucide-react'
import PurchaseModal from '@/components/ui/PurchaseModal'
import AssetDetailModal from '@/components/ui/AssetDetailModal'

export default function MarketplacePage() {
  const { assets, purchasedAssets, selectedAssetType, setSelectedAssetType, isLoading } = useApp()
  const { asrdBalance } = useWallet()
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold-out'>('all')

  // Mark some assets as sold-out for demonstration
  const enhancedAssets = assets.map((asset, index) => ({
    ...asset,
    // Mark first 2 assets as sold-out
    isSoldOut: index < 2,
    soldPercentage: index < 2 ? 100 : 0,
    investors: index < 2 ? Math.floor(Math.random() * 50) + 10 : 0
  }))

  const filteredAssets = enhancedAssets.filter(asset => {
    if (selectedAssetType !== 'all' && asset.category.toLowerCase() !== selectedAssetType) {
      return false
    }
    if (statusFilter === 'available' && asset.isSoldOut) {
      return false
    }
    if (statusFilter === 'sold-out' && !asset.isSoldOut) {
      return false
    }
    return true
  })

  const handlePurchaseClick = (asset: any) => {
    if (asset.isSoldOut) return
    setSelectedAsset(asset)
    setShowPurchaseModal(true)
  }

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset)
    setShowDetailModal(true)
  }

  const confirmPurchase = async (fraction: number) => {
    if (!selectedAsset) return
    
    // This would be handled by the AppContext
    alert(`Success! You purchased ${(fraction * 100).toFixed(0)}% of ${selectedAsset.name}`)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString()
  }

  const getInvestmentDetails = (asset: any) => {
    const minInvestmentASRD = asset.price * 0.1 // 10% minimum
    const minInvestmentUSD = minInvestmentASRD * 32
    return {
      minASRD: minInvestmentASRD,
      minUSD: minInvestmentUSD,
      projectedReturns: (minInvestmentASRD * asset.roi / 100).toFixed(0)
    }
  }

  const assetTypes = [
    { value: 'all', label: 'All Assets' },
    { value: 'horse', label: 'Equine Assets' },
    { value: 'real-estate', label: 'Real Estate' }
  ]

  const statusFilters = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'sold-out', label: 'Sold Out' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Asset Marketplace</h1>
              <p className="text-gray-600 text-lg">
                Discover and invest in premium real-world assets with fractional ownership
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{assets.length}</div>
                <div className="text-gray-600 text-sm">Total Assets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{purchasedAssets.length}</div>
                <div className="text-gray-600 text-sm">Your Investments</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Filters:</span>
            </div>
            
            {/* Asset Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
              <div className="flex space-x-2">
                {assetTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedAssetType(type.value as any)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedAssetType === type.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex space-x-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value as any)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      statusFilter === filter.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAssets.map((asset, index) => {
            const investment = getInvestmentDetails(asset)
            const isSoldOut = asset.isSoldOut
            
            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 ${
                  isSoldOut ? 'border-gray-300' : 'border-gray-100 hover:border-blue-300'
                }`}
              >
                {/* Sold Out Badge */}
                {isSoldOut && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Sold Out</span>
                    </div>
                  </div>
                )}

                {/* Asset Image with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={asset.image || '/images/placeholder-asset.jpg'}
                    alt={asset.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Asset Badges */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {!isSoldOut && (
                      <div className="bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                        {asset.roi}% ROI
                      </div>
                    )}
                    <div className="bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                      {asset.category}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      onClick={() => handleViewDetails(asset)}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Asset Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {asset.name}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {asset.location}
                    </div>
                  </div>

                  {/* Sold Out Overlay */}
                  {isSoldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                        <div className="font-bold text-lg">Fully Allocated</div>
                        <div className="text-sm">This asset has been fully sold to investors</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Asset Details */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {asset.description}
                  </p>

                  {/* Investment Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className={`text-2xl font-bold ${
                        isSoldOut ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        {formatPrice(asset.price)} ASRD
                      </div>
                      <div className="text-xs text-gray-500">Total Value</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {asset.roi}%
                      </div>
                      <div className="text-xs text-gray-500">Projected ROI</div>
                    </div>
                  </div>

                  {/* Investor Information for Sold Out Assets */}
                  {isSoldOut && (
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">{asset.investors} Investors</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <PieChart className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">100% Allocated</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Minimum Investment for Available Assets */}
                  {!isSoldOut && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700 font-medium">Minimum Investment:</span>
                        <div className="text-right">
                          <div className="font-semibold">{investment.minASRD.toFixed(0)} ASRD</div>
                          <div className="text-blue-600">${investment.minUSD.toLocaleString()} USD</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewDetails(asset)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      View Details
                    </button>
                    {!isSoldOut ? (
                      <button
                        onClick={() => handlePurchaseClick(asset)}
                        disabled={isLoading || asrdBalance < investment.minASRD}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center text-sm"
                      >
                        <Coins className="w-4 h-4 mr-1" />
                        Invest
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center text-sm cursor-not-allowed"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Sold Out
                      </button>
                    )}
                  </div>

                  {!isSoldOut && asrdBalance < investment.minASRD && (
                    <p className="text-red-500 text-xs text-center mt-2">
                      Need {investment.minASRD.toFixed(0)} ASRD minimum
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No assets found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more investment opportunities.
              </p>
              <button
                onClick={() => {
                  setSelectedAssetType('all')
                  setStatusFilter('all')
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onConfirm={confirmPurchase}
        asset={selectedAsset}
      />

      <AssetDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        asset={selectedAsset}
      />
    </div>
  )
}
