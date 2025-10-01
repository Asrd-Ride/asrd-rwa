'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { Star, MapPin, Coins, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ConfirmationModal from '@/components/ui/ConfirmationModal'

export default function FeaturedAssetsSection() {
  const { assets, purchaseAsset, isLoading } = useApp()
  const { asrdBalance } = useWallet()
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const featuredAssets = assets.filter(asset => asset.featured).slice(0, 3)

  const handlePurchaseClick = (asset: any) => {
    setSelectedAsset(asset)
    setShowConfirmation(true)
  }

  const confirmPurchase = async () => {
    if (!selectedAsset) return
    await purchaseAsset(selectedAsset.id)
    setShowConfirmation(false)
    setSelectedAsset(null)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString()
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
            Featured <span className="text-blue-600">Assets</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exclusive real-world assets available for fractional ownership through NFT technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={asset.image || '/images/placeholder-asset.jpg'}
                  alt={asset.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900">
                    {asset.category}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                    {asset.roi}% ROI
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 flex-1 pr-4">
                    {asset.name}
                  </h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {asset.description}
                </p>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{asset.location}</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(asset.price)} ASRD
                    </div>
                    <div className="text-sm text-gray-500">
                      ${(asset.price * 32).toLocaleString()} USD
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Valuation</div>
                    <div className="font-semibold text-gray-900">
                      ${asset.valuation.toLocaleString()}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchaseClick(asset)}
                  disabled={isLoading || asrdBalance < asset.price}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
                >
                  <Coins className="w-5 h-5 mr-2" />
                  {isLoading ? 'Processing...' : 'Purchase Now'}
                </button>

                {asrdBalance < asset.price && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    Insufficient ASRD balance
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/marketplace"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg group"
          >
            View All Assets
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmPurchase}
        asset={selectedAsset}
      />
    </section>
  )
}
