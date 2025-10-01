'use client'
import { motion } from 'framer-motion'
import { Star, MapPin, Coins, Heart } from 'lucide-react'
import { mockAssets } from '@/data/mockData'

export default function Marketplace() {
  return (
    <section id="marketplace" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-primary-cyan to-primary-violet bg-clip-text text-transparent">
            Premium Marketplace
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-white/60 text-center mb-12"
        >
          Discover exclusive tokenized assets with proven track records
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-primary-cyan/50 transition-all duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-cyan/20 to-primary-violet/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                <div className="absolute top-4 right-4 bg-primary-cyan text-primary-dark px-3 py-1 rounded-full text-sm font-semibold">
                  {asset.type === 'horse' ? '🐎 Horse' : '🏠 Real Estate'}
                </div>
                <div className="absolute top-4 left-4">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-black/50 text-white/80 hover:text-red-400 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{asset.name}</h3>
                </div>
                
                <div className="flex items-center text-white/60 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{asset.location}</span>
                </div>
                
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {asset.description}
                </p>
                
                {asset.type === 'horse' && (
                  <div className="mb-4">
                    <div className="text-primary-cyan text-sm font-semibold">
                      Upcoming: {asset.upcomingRace}
                    </div>
                    <div className="text-white/60 text-sm">
                      Record: {asset.stats.wins}W {asset.stats.places}P
                    </div>
                  </div>
                )}
                
                {asset.type === 'real-estate' && (
                  <div className="mb-4">
                    <div className="text-primary-cyan text-sm font-semibold">
                      Rent: {asset.projectedRent}
                    </div>
                    <div className="text-white/60 text-sm">
                      Yield: {asset.stats.yield}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-primary-cyan" />
                    <span className="text-primary-cyan font-bold text-lg">{asset.price.toLocaleString()} ASRD</span>
                  </div>
                  <span className="text-white/60 text-sm">${(asset.price * 32).toLocaleString()}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-gradient-to-r from-primary-cyan to-primary-violet text-white py-3 rounded-xl font-semibold glow-cyan hover:glow-violet transition-all"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
