'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { Star, MapPin, Coins, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedAssets() {
  const { assets, purchaseAsset, isLoading } = useApp()
  const { asrdBalance } = useWallet()
  
  const featuredAssets = assets.filter(asset => asset.featured).slice(0, 3)

  const handlePurchase = (assetId: number) => {
    const asset = assets.find(a => a.id === assetId)
    if (asset && asrdBalance >= asset.price) {
      purchaseAsset(assetId)
    } else {
      alert('Insufficient ASRD balance to purchase this asset')
    }
  }

  return (
    <section id="featured-assets" className="py-20 relative">
      <div className="container-pro">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-success to-accent-primary bg-clip-text text-transparent">
              Featured Assets
            </span>
          </h2>
          <p className="text-xl text-neutral-mid max-w-2xl mx-auto">
            Discover our most exclusive tokenized real-world assets with proven performance records
          </p>
        </motion.div>

        {/* Featured Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer card-hover border border-white/10"
            >
              {/* Asset Image */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={asset.image} 
                  alt={asset.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
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
                      Record: {asset.stats.wins}W {asset.stats.places}P
                    </div>
                  </div>
                )}

                {asset.type === 'real-estate' && (
                  <div className="mb-4">
                    <div className="text-accent-primary text-sm font-semibold mb-1">
                      Rent: {asset.projectedRent}
                    </div>
                    <div className="text-neutral-mid text-sm">
                      Yield: {asset.stats.yield}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-accent-success" />
                    <span className="text-accent-success font-bold text-lg">
                      {asset.price.toLocaleString()} ASRD
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link href="/marketplace">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 btn-outline px-8 py-4 rounded-xl font-semibold text-lg border-2 border-accent-success text-accent-success hover:bg-accent-success hover:text-financial-dark transition-all duration-300"
            >
              <span>Explore All Assets</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
