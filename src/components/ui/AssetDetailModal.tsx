'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, TrendingUp, Users, DollarSign, Building2, Trophy, Ship, Home, BarChart3, Shield, Zap } from 'lucide-react'
import RealAssetImage from './RealAssetImage'

interface Asset {
  id: number
  title: string
  category: string
  type: string
  location: string
  value: number
  currency: string
  status: string
  image: string
  description: string
  roi: string
  timeline: string
  minInvestment: number
  sharesAvailable?: number
  sharesSold?: number
  features?: string[]
}

interface AssetDetailModalProps {
  asset: Asset
  isOpen: boolean
  onClose: () => void
  onInvest: (assetId: number) => void
}

export default function AssetDetailModal({ asset, isOpen, onClose, onInvest }: AssetDetailModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
      case 'upcoming': return 'bg-blue-500/20 text-blue-300 border-blue-400/30'
      case 'auction': return 'bg-orange-500/20 text-orange-300 border-orange-400/30'
      default: return 'bg-gray-500/20 text-gray-200 border-gray-400/30'
    }
  }

  const getROIColor = (roi: string) => {
    const roiValue = parseFloat(roi)
    if (roiValue >= 40) return 'text-emerald-400'
    if (roiValue >= 30) return 'text-cyan-400'
    if (roiValue >= 20) return 'text-blue-400'
    return 'text-gray-400'
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'real-estate': return <Building2 className="w-6 h-6" />
      case 'thoroughbred': return <Trophy className="w-6 h-6" />
      case 'luxury-assets': return <Ship className="w-6 h-6" />
      default: return <Home className="w-6 h-6" />
    }
  }

  const handleInvest = () => {
    onInvest(asset.id)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass-cosmic max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 glass-cosmic border-b border-cyan-500/20 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <RealAssetImage type={asset.type} title={asset.title} size="md" />
                  <div>
                    <h2 className="text-3xl font-bold text-holographic">{asset.title}</h2>
                    <p className="text-premium-light mt-1">{asset.type} • {asset.location}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-premium-light hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image & Basic Info */}
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-gray-700">
                    <RealAssetImage
                      type={asset.type}
                      title={asset.title}
                      size="xl"
                      className="w-full h-full"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold border backdrop-blur-sm ${getStatusColor(asset.status)}`}>
                        {asset.status.replace('-', ' ').toUpperCase()}
                      </div>
                      <div className="px-3 py-1 rounded-full text-sm font-semibold border backdrop-blur-sm bg-amber-500/20 text-amber-300 border-amber-400/30">
                        ROI: {asset.roi}
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">${(asset.value / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-premium-light">Total Value</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{asset.sharesSold || 0}</div>
                      <div className="text-sm text-premium-light">Investors</div>
                    </div>
                  </div>

                  {/* Features */}
                  {asset.features && (
                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        Premium Features
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {asset.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-premium-light">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Details & Actions */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Asset Description</h3>
                    <p className="text-premium-light leading-relaxed">{asset.description}</p>
                  </div>

                  {/* Investment Details */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <h3 className="text-xl font-bold text-white mb-4">Investment Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-premium-light">Minimum Investment</span>
                        <span className="text-white font-semibold">${asset.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-premium-light">Projected ROI</span>
                        <span className={`font-bold ${getROIColor(asset.roi)}`}>{asset.roi}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-premium-light">Investment Timeline</span>
                        <span className="text-white font-semibold">{asset.timeline}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-premium-light">Shares Available</span>
                        <span className="text-white font-semibold">
                          {((asset.sharesAvailable || 0) - (asset.sharesSold || 0)).toLocaleString()} / {asset.sharesAvailable?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{asset.roi}</div>
                        <div className="text-sm text-emerald-300">Annual Return</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">A+</div>
                        <div className="text-sm text-cyan-300">Risk Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleInvest}
                      className="btn-quantum flex-1 text-center justify-center"
                    >
                      <DollarSign className="w-5 h-5 mr-2" />
                      Invest Now - ${asset.minInvestment.toLocaleString()}
                    </button>
                    <button className="btn-premium-outline flex items-center justify-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Analytics
                    </button>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-premium-light">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Secured by Blockchain • Fully Insured • Regulated Platform
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
