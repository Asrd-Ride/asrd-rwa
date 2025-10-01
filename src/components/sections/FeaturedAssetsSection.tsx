'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { Star, MapPin, Coins, TrendingUp, PieChart, Eye } from 'lucide-react'
import Link from 'next/link'
import PurchaseModal from '@/components/ui/PurchaseModal'
import AssetDetailModal from '@/components/ui/AssetDetailModal'

export default function FeaturedAssetsSection() {
  const { assets, purchaseAsset, isLoading } = useApp()
  const { asrdBalance } = useWallet()
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const featuredAssets = assets.filter(asset => asset.featured).slice(0, 3)

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
    
    const success = await purchaseAsset(selectedAsset.id, fraction)
    if (success) {
      alert(`Success! You purchased ${(fraction * 100).toFixed(0)}% of ${selectedAsset.name}`)
    } else {
      alert('Purchase failed. Please try again.')
    }
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

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium <span className="text-blue-600">Investment Opportunities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fractional ownership in high-value real-world assets with transparent returns and blockchain security
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAssets.map((asset, index) => {
            const investment = getInvestmentDetails(asset)
            const isSoldOut = asset.isSoldOut
            
            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Asset Image with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Asset Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                      {asset.roi}% ROI
                    </div>
                    <div className="bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                      {asset.category}
                    </div>
                  </div>
                  
                  {/* Sold Out Badge */}
                  {isSoldOut && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gray-600 text-white rounded-full px-3 py-1 text-xs font-semibold flex items-center space-x-1">
                        <span>Sold Out</span>
                      </div>
                    </div>
                  )}

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

                  {/* Minimum Investment */}
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
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/marketplace"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Explore All Investment Opportunities
            <TrendingUp className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
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
    </section>
  )
}
