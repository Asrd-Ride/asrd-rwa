'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { Star, MapPin, Coins, Heart, Clock, Filter, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Marketplace() {
  const { assets, selectedAssetType, setSelectedAssetType, auctionTimeLeft, purchaseAsset, isLoading } = useApp()
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'location'>('price')

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const sortedAssets = [...assets].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'location':
        return a.location.localeCompare(b.location)
      default:
        return 0
    }
  })

  const assetTypes = [
    { value: 'all', label: 'All Assets' },
    { value: 'horse', label: 'Horses', emoji: '🐎' },
    { value: 'real-estate', label: 'Real Estate', emoji: '🏠' }
  ]

  const handlePurchase = async (assetId: number) => {
    const asset = assets.find(a => a.id === assetId)
    if (asset) {
      // FIXED: Now passing 2 arguments - assetId and investment amount (full price)
      await purchaseAsset(assetId, asset.price)
    }
  }

  return (
    <section id="marketplace" className="py-20 relative">
      <div className="container-pro">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-accent-success hover:text-accent-success-light transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.div>
          </Link>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-accent-success to-accent-primary bg-clip-text text-transparent">
            Premium Marketplace
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-neutral-mid text-center mb-8"
        >
          Discover all our exclusive tokenized assets with proven track records
        </motion.p>

        {/* Auction Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="auction-timer mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-4">
            <Clock className="w-5 h-5 text-warning" />
            <span className="text-warning font-semibold">Live Auction Ending In:</span>
            <span className="text-white font-mono text-lg">{formatTime(auctionTimeLeft)}</span>
            <span className="text-neutral-mid text-sm">Minimum Investment: $10</span>
          </div>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
        >
          {/* Asset Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-neutral-mid" />
            <div className="flex space-x-2">
              {assetTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedAssetType(type.value as any)}
                  className={`filter-pill ${selectedAssetType === type.value ? 'active' : ''}`}
                >
                  {type.emoji && <span className="mr-1">{type.emoji}</span>}
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-neutral-mid text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-financial-dark border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-success"
            >
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="location">Location</option>
            </select>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer card-hover"
            >
              {/* Asset Image/Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-accent-success/20 to-accent-primary/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />

                {/* Asset Type Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  asset.type === 'horse'
                    ? 'bg-accent-success/20 text-accent-success'
                    : 'bg-accent-primary/20 text-accent-primary'
                }`}>
                  {asset.type === 'horse' ? '🐎 Horse' : '🏠 Real Estate'}
                </div>

                {/* Favorite Button */}
                <div className="absolute top-4 left-4">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-black/50 text-white/80 hover:text-red-400 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-1 text-warning">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold text-white">4.8</span>
                  </div>
                </div>

                {/* Auction Tag for first asset */}
                {index === 0 && (
                  <div className="absolute bottom-4 right-4 bg-warning/20 text-warning px-2 py-1 rounded text-xs font-semibold">
                    🔥 Live Auction
                  </div>
                )}
              </div>

              {/* Asset Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{asset.name}</h3>
                </div>

                <div className="flex items-center text-neutral-mid mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{asset.location}</span>
                </div>

                <p className="text-neutral-mid text-sm mb-4 line-clamp-2">
                  {asset.description}
                </p>

                {/* Asset Specific Details */}
                {asset.type === 'horse' && (
                  <div className="mb-4">
                    <div className="text-accent-success text-sm font-semibold mb-1">
                      Upcoming: {asset.upcomingRace}
                    </div>
                    <div className="text-neutral-mid text-sm">
                      Record: {asset.stats.wins}W {asset.stats.places}P • {asset.stats.pedigree}
                    </div>
                  </div>
                )}

                {asset.type === 'real-estate' && (
                  <div className="mb-4">
                    <div className="text-accent-primary text-sm font-semibold mb-1">
                      Projected Rent: {asset.projectedRent}
                    </div>
                    <div className="text-neutral-mid text-sm">
                      Yield: {asset.stats.yield} • Value: {asset.stats.value}
                    </div>
                  </div>
                )}

                {/* Price and Action */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-accent-success" />
                    <span className="text-accent-success font-bold text-lg">
                      {asset.price} ASRD
                    </span>
                  </div>
                  <span className="text-neutral-mid text-sm">
                    ${(asset.price * 32).toLocaleString()}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePurchase(asset.id)}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-accent-success to-accent-primary text-financial-dark py-3 rounded-xl font-semibold glow-success hover:glow-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Purchase Asset'}
                </motion.button>

                {/* Minimum Investment Notice */}
                <div className="text-center mt-3">
                  <span className="text-neutral-mid text-xs">
                    Minimum investment: $10 (0.3125 ASRD)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Assets Message */}
        {sortedAssets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-neutral-mid text-lg">
              No assets found matching your criteria.
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
