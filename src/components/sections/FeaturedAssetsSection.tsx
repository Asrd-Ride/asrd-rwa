'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { useAuth } from '@/contexts/AuthContext'
import { Star, MapPin, Coins, TrendingUp, Gem, Crown, Eye, LogIn } from 'lucide-react'
import Link from 'next/link'
import PurchaseModal from '@/components/ui/PurchaseModal'
import AssetDetailModal from '@/components/ui/AssetDetailModal'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function FeaturedAssetsSection() {
  const { assets, purchaseAsset, isLoading } = useApp()
  const { asrdBalance, getUsdValue, getAsrdValue } = useWallet()
  const { user } = useAuth()
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const featuredAssets = assets.filter(asset => asset.featured).slice(0, 3)

  const handlePurchaseClick = (asset: any) => {
    if (!user) {
      window.location.href = '/dashboard'
      return
    }
    setSelectedAsset(asset)
    setShowPurchaseModal(true)
  }

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset)
    setShowDetailModal(true)
  }

  const handlePurchaseFromDetail = () => {
    if (!user) {
      window.location.href = '/dashboard'
      return
    }
    setShowDetailModal(false)
    setShowPurchaseModal(true)
  }

  const confirmPurchase = async (investmentASRD: number) => {
    if (!selectedAsset) return

    const success = await purchaseAsset(selectedAsset.id, investmentASRD)
    if (success) {
      const investmentUSD = getUsdValue(investmentASRD)
      const ownershipPercentage = (investmentUSD / getUsdValue(selectedAsset.price)) * 100
      alert(`Success! You purchased ${ownershipPercentage.toFixed(2)}% of ${selectedAsset.name} for $${investmentUSD.toLocaleString()}`)
    } else {
      alert('Purchase failed. Please try again.')
    }
  }

  const getAssetTypeIcon = (type: string) => {
    return type === 'horse' ? Crown : Gem;
  };

  const getAssetTypeColor = (type: string) => {
    return type === 'horse'
      ? 'from-emerald-glow to-sapphire-glow text-emerald-glow'
      : 'from-sapphire-glow to-amethyst-glow text-sapphire-glow';
  };

  return (
    <section className="py-20 immersive-bg relative overflow-hidden">
      {/* Background Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              background: i % 3 === 0 ? 'var(--emerald-glow)' : i % 3 === 1 ? 'var(--sapphire-glow)' : 'var(--amethyst-glow)'
            }}
            animate={{
              y: [0, -500],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container-pro relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-3d mb-6">
            FEATURED <span className="text-glow text-emerald-glow">PREMIUM</span> ASSETS
          </h2>
          <p className="text-xl text-neutral-light max-w-3xl mx-auto">
            Exclusive investment opportunities in high-value real-world assets with
            <span className="text-emerald-glow font-semibold"> transparent returns</span> and
            <span className="text-sapphire-glow font-semibold"> blockchain security</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAssets.map((asset, index) => {
            const AssetTypeIcon = getAssetTypeIcon(asset.type);
            const gradientClass = getAssetTypeColor(asset.type);
            const minInvestmentASRD = getAsrdValue(50); // $50 USD minimum
            const { ref, isInView } = useScrollAnimation()

            return (
              <motion.div
                ref={ref}
                key={asset.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-3d group cursor-pointer"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {/* Asset Image with Overlay */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <OptimizedImage
                    src={asset.image}
                    alt={asset.name}
                    width={400}
                    height={256}
                    className="w-full h-64 group-hover:scale-110 transition-transform duration-500"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-deep/80 via-transparent to-transparent" />

                  {/* Asset Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`bg-gradient-to-r ${gradientClass} rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/20`}>
                      <AssetTypeIcon className="w-4 h-4 inline mr-2" />
                      <span className="text-sm font-bold">
                        {asset.type === 'horse' ? 'ELITE RACEHORSE' : 'LUXURY PROPERTY'}
                      </span>
                    </div>
                  </div>

                  {/* ROI Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-gold-glow to-ruby-glow rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-bold text-luxury-deep">{asset.roi}% ROI</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-16 right-4">
                    <button
                      onClick={() => handleViewDetails(asset)}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 hover:scale-110"
                    >
                      <Eye className="w-5 h-5 text-luxury-deep" />
                    </button>
                  </div>

                  {/* Asset Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white mb-2 text-glow">{asset.name}</h3>
                    <div className="flex items-center text-emerald-glow text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{asset.location}</span>
                    </div>
                  </div>
                </div>

                {/* Asset Details */}
                <div className="p-6">
                  <p className="text-neutral-light text-sm mb-6 leading-relaxed">
                    {asset.description}
                  </p>

                  {/* Investment Metrics */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-luxury-dark/30 rounded-xl border border-white/10">
                      <span className="text-neutral-mid">Total Value</span>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-glow">{asset.price.toLocaleString()} ASRD</div>
                        <div className="text-neutral-mid text-sm">${getUsdValue(asset.price).toLocaleString()} USD</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-luxury-dark/30 rounded-xl border border-white/10">
                        <div className="text-sapphire-glow text-lg font-black">100%</div>
                        <div className="text-neutral-mid text-xs">Available</div>
                      </div>
                      <div className="text-center p-3 bg-luxury-dark/30 rounded-xl border border-white/10">
                        <div className="text-amethyst-glow text-lg font-black">{asset.roi}%</div>
                        <div className="text-neutral-mid text-xs">Projected ROI</div>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Investment */}
                  <div className="bg-gradient-to-r from-emerald-glow/20 to-sapphire-glow/20 border border-emerald-glow/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-glow font-bold">Minimum Investment:</span>
                      <div className="text-right">
                        <div className="font-black text-white">{minInvestmentASRD.toFixed(2)} ASRD</div>
                        <div className="text-sapphire-glow">$50 USD</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewDetails(asset)}
                      className="flex-1 px-4 py-3 border border-emerald-glow text-emerald-glow font-bold rounded-xl hover:bg-emerald-glow hover:text-luxury-deep transition-all duration-300 text-sm"
                    >
                      View Details
                    </button>
                    {user ? (
                      <button
                        onClick={() => handlePurchaseClick(asset)}
                        disabled={isLoading || asrdBalance < minInvestmentASRD}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-glow to-sapphire-glow text-luxury-deep font-bold rounded-xl transition-all duration-300 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-glow/30"
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Invest Now
                      </button>
                    ) : (
                      <Link href="/dashboard">
                        <button
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-luxury-deep font-bold rounded-xl transition-all duration-300 flex items-center justify-center text-sm hover:shadow-lg hover:shadow-amber-500/30"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login to Purchase
                        </button>
                      </Link>
                    )}
                  </div>

                  {user && asrdBalance < minInvestmentASRD && (
                    <p className="text-ruby-glow text-xs text-center mt-3 font-semibold">
                      Need {minInvestmentASRD.toFixed(2)} ASRD minimum
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/marketplace"
            className="btn-3d text-lg px-12 py-6 inline-flex items-center"
          >
            EXPLORE ALL PREMIUM ASSETS
            <TrendingUp className="w-6 h-6 ml-3" />
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
        onPurchaseClick={handlePurchaseFromDetail}
      />
    </section>
  )
}
