'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, TrendingUp, Eye, DollarSign } from 'lucide-react'
import RealAssetImage from './RealAssetImage'

interface AssetCardProps {
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
  onInvest: (assetId: number) => void
  onViewDetails: (assetId: number) => void
}

export default function AssetCard({
  id,
  title,
  category,
  type,
  location,
  value,
  currency,
  status,
  image,
  description,
  roi,
  timeline,
  minInvestment,
  sharesAvailable = 0,
  sharesSold = 0,
  onInvest,
  onViewDetails
}: AssetCardProps) {
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

  const handleInvestClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onInvest(id)
  }

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onViewDetails(id)
  }

  const progressPercentage = sharesAvailable > 0 ? (sharesSold / sharesAvailable) * 100 : 0

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group glass-cosmic rounded-3xl border border-white/10 p-6 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden h-full flex flex-col cursor-pointer"
      onClick={handleDetailsClick}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Real Asset Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-gray-700">
        <RealAssetImage
          type={type}
          title={title}
          size="xl"
          className="w-full h-full"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(status)}`}>
            {status.replace('-', ' ').toUpperCase()}
          </div>
        </div>

        {/* ROI Badge */}
        <div className="absolute top-3 right-3">
          <div className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30 backdrop-blur-sm">
            {roi} ROI
          </div>
        </div>

        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-white font-semibold">View Details</span>
          </div>
        </div>
      </div>

      {/* Asset Info */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-premium-light mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        <p className="text-premium-light text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Investment Progress */}
        {sharesAvailable > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-premium-light">Funding Progress</span>
              <span className="text-cyan-400 font-semibold">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-white/5">
            <div className="text-lg font-bold text-white">${(value / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-premium-light">Value</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <div className="text-lg font-bold text-emerald-400">{roi}</div>
            <div className="text-xs text-premium-light">ROI</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-white/10">
        <button
          onClick={handleInvestClick}
          className="btn-quantum flex-1 text-sm py-3"
        >
          <DollarSign className="w-4 h-4 mr-1" />
          Invest
        </button>
        <button
          onClick={handleDetailsClick}
          className="btn-premium-outline text-sm py-3 px-4"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Minimum Investment */}
      <div className="text-center mt-3">
        <div className="text-xs text-premium-light">
          Minimum: <span className="text-cyan-400 font-semibold">${minInvestment.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  )
}
